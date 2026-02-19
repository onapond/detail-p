# Phase 2 Infrastructure Completion Plan

## Feature: phase2-infra
## Date: 2026-02-11

---

## 1. Overview

Phase 2-1(인증)과 2-2(데이터 영속성) 완료 후 남은 인프라 작업 2건을 마무리한다.
프로덕션 배포 전 필수 요건으로, 현재 In-memory 기반의 사용량 추적과 Rate Limiting을 DB/Redis 기반으로 전환한다.

## 2. Problem Statement

### 2-1. 사용량 추적 (usage-tracker.ts)
- **현재**: `globalThis.usageRecords` (In-memory 배열)
- **문제점**:
  - 서버 재시작 시 모든 사용량 데이터 소실
  - Vercel 같은 serverless 환경에서 인스턴스 간 데이터 격리
  - 사용자별 사용량 분리 안됨 (전체 합산만 존재)
  - DELETE /api/usage 로 누구나 전체 데이터 초기화 가능
- **호출 위치**: analysis.ts (2곳), copywriting.ts (2곳), html-generator.ts (2곳), streaming.ts (1곳) — 총 7곳에서 `trackUsage()` 호출

### 2-2. Rate Limiting (rate-limit.ts)
- **현재**: In-memory `Map<string, number[]>` (슬라이딩 윈도우)
- **문제점**:
  - serverless 환경에서 인스턴스별 독립 카운트 → 사실상 무효
  - 배포마다 리셋됨
  - 사용자 등급별 차등 제한 미지원
- **호출 위치**: middleware.ts에서 `checkRateLimit()` 호출

## 3. Goals

### Must Have
- [ ] 사용량 데이터를 Supabase `api_usage` 테이블에 영속 저장
- [ ] 사용자별(user_id) 사용량 분리
- [ ] Rate Limiting을 Upstash Redis 기반으로 전환
- [ ] 기존 인터페이스(trackUsage, checkRateLimit) 호환 유지

### Should Have
- [ ] /api/usage GET: 현재 사용자의 월간/일간 사용량 반환
- [ ] /api/usage DELETE: admin만 가능 또는 제거
- [ ] Rate limit 헤더 표준화 (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset)

### Could Have
- [ ] 사용자 등급별 Rate Limit 차등 (Free: 5/min, Pro: 20/min)
- [ ] 월간 사용량 한도 체크 (Free: 3건/월, Pro: 50건/월)
- [ ] 사용량 초과 시 429 + 업그레이드 안내

## 4. Technical Approach

### 4-1. 사용량 추적 DB 이관

**새 테이블**: `api_usage`
```sql
CREATE TABLE api_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  model TEXT NOT NULL,
  input_tokens INTEGER NOT NULL DEFAULT 0,
  output_tokens INTEGER NOT NULL DEFAULT 0,
  cost_usd NUMERIC(10, 6) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_api_usage_user_id ON api_usage(user_id);
CREATE INDEX idx_api_usage_created_at ON api_usage(created_at);
CREATE INDEX idx_api_usage_user_month ON api_usage(user_id, created_at);
```

**RLS 정책**:
```sql
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own usage" ON api_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Server can insert usage" ON api_usage FOR INSERT WITH CHECK (true);
```

**수정 파일**:
| 파일 | 변경 내용 |
|------|----------|
| `src/lib/usage-tracker.ts` | globalThis → Supabase INSERT, 집계 쿼리 |
| `src/app/api/usage/route.ts` | 사용자별 월간 집계 반환, DELETE 제거 또는 admin 체크 |
| `src/lib/supabase/schema.sql` | api_usage 테이블 + RLS + 인덱스 추가 |

**핵심 변경**:
- `trackUsage()` → `async trackUsage()` (Supabase INSERT)
- 호출부 7곳 모두 await 필요 (이미 async 컨텍스트)
- `getUsageSummary()` → Supabase 집계 쿼리 (SUM, COUNT, GROUP BY)
- `resetUsage()` → 제거 또는 admin-only soft delete

### 4-2. 분산 Rate Limiting

**새 패키지**: `@upstash/ratelimit`, `@upstash/redis`

**수정 파일**:
| 파일 | 변경 내용 |
|------|----------|
| `src/lib/rate-limit.ts` | In-memory Map → Upstash Redis 슬라이딩 윈도우 |
| `src/middleware.ts` | checkRateLimit() async 변환 |
| `.env.example` | UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN 추가 |

**핵심 변경**:
```typescript
// Before
const requestMap = new Map<string, number[]>();
export function checkRateLimit(ip, config): RateLimitResult

// After
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });
const aiLimiter = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, '60 s') });
export async function checkRateLimit(identifier, type): Promise<RateLimitResult>
```

**Fallback**: Upstash env vars 미설정 시 기존 in-memory 유지 (개발 환경)

## 5. Implementation Order

```
1. DB 스키마 추가 (api_usage 테이블)              [S]
2. usage-tracker.ts 리팩터링 (async + Supabase)    [M]
3. 호출부 7곳 await 추가                            [S]
4. /api/usage 라우트 리팩터링                        [S]
5. @upstash/ratelimit 설치 + rate-limit.ts 교체     [M]
6. middleware.ts async checkRateLimit 적용           [S]
7. .env.example 업데이트                            [S]
8. 빌드 검증                                        [S]
```

## 6. Dependencies

### 새 패키지
- `@upstash/ratelimit` — Redis 기반 분산 Rate Limiting
- `@upstash/redis` — Upstash Redis REST client

### 외부 서비스 (수동 설정 필요)
- **Upstash Console**: Redis 데이터베이스 생성, REST URL/Token 획득
- **Supabase Dashboard**: `api_usage` 테이블 SQL 실행

## 7. Risks & Mitigations

| 리스크 | 영향 | 완화 방안 |
|--------|------|----------|
| trackUsage async 전환 시 호출부 누락 | 토큰 추적 누수 | TypeScript 반환 타입 `Promise<>` 로 컴파일 에러 유도 |
| Upstash 연결 실패 | Rate limiting 무효화 | Fallback: env vars 없으면 in-memory 유지 |
| api_usage INSERT 실패 | 사용량 기록 누수 | fire-and-forget + 에러 로깅 (생성 플로우 차단 안함) |
| Supabase RLS가 서버 INSERT 차단 | 사용량 기록 안됨 | service_role key 사용 또는 INSERT policy `WITH CHECK (true)` |

## 8. Success Criteria

- [ ] 서버 재시작 후에도 사용량 데이터 유지
- [ ] 사용자별 사용량 분리 확인 (다른 사용자 데이터 접근 불가)
- [ ] 분산 환경에서 Rate Limit 정상 동작 (동일 키에 대해 글로벌 카운트)
- [ ] 기존 기능 영향 없음 (생성 파이프라인 정상 동작)
- [ ] `npx next build` 0 에러

---
*Created: 2026-02-11*
