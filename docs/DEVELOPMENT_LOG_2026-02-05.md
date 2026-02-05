# Detail_P 개발 일지

**작성일:** 2026년 2월 5일
**버전:** 0.1.0
**저장소:** https://github.com/onapond/detail-p

---

## 1. 프로젝트 개요

### Detail_P란?
AI 기반 상품 상세페이지 자동 생성 서비스입니다. 제품 이미지를 업로드하면 Claude AI가 이미지를 분석하고, 마케팅 카피를 작성하며, 전문적인 HTML 상세페이지를 생성합니다.

### 주요 기능
- **이미지 분석**: 제품 이미지에서 특징, 카테고리, 원산지 등 정보 추출
- **카피라이팅**: 마케팅 헤드라인, 제품 설명, CTA 문구 자동 생성
- **HTML 생성**: 카테고리별 최적화된 상세페이지 템플릿 적용
- **이미지 다운로드**: 완성된 상세페이지를 PNG 이미지로 변환
- **비용 추적**: API 사용량 및 비용 실시간 모니터링

### 지원 카테고리
| 카테고리 | 특화 기능 |
|---------|----------|
| 커피 (coffee) | 테이스팅 노트, 로스팅 레벨, 분쇄 옵션, 추출 가이드 |
| 건강기능식품 (health_supplement) | 인증 배지, 성분 카드, 섭취 방법, 주의사항 |
| 일반 식품 (processed_food) | 맛 태그, 제품 특징 |

---

## 2. 기술 스택

### Frontend
| 기술 | 버전 | 용도 |
|-----|------|-----|
| Next.js | 16.1.6 | React 프레임워크 (App Router) |
| React | 19.x | UI 라이브러리 |
| TypeScript | 5.x | 타입 안전성 |
| Tailwind CSS | 4.x | 스타일링 |
| shadcn/ui | - | UI 컴포넌트 |
| Lucide React | - | 아이콘 |

### Backend
| 기술 | 용도 |
|-----|-----|
| Next.js API Routes | REST API 엔드포인트 |
| Anthropic SDK | Claude AI 연동 |
| Puppeteer | HTML → PNG 변환 |

### AI 모델
| 모델 | 용도 | 비용 (per 1M tokens) |
|-----|------|---------------------|
| Claude Sonnet 4 | 이미지 분석, 카피라이팅, HTML 생성 | 입력 $3, 출력 $15 |

### 개발 도구
- **Turbopack**: 빌드 도구
- **ESLint**: 코드 품질
- **Git/GitHub**: 버전 관리

---

## 3. 프로젝트 구조

```
detail-p/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analyze/          # 이미지 분석 API
│   │   │   ├── copywriting/      # 카피라이팅 생성 API
│   │   │   ├── generate-html/    # HTML 생성 API
│   │   │   ├── capture-image/    # 이미지 캡처 API
│   │   │   └── usage/            # 사용량 조회 API
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                   # shadcn 컴포넌트
│   │   ├── upload/               # 이미지 업로드
│   │   ├── preview/              # 미리보기
│   │   └── download/             # 다운로드 패널
│   ├── lib/
│   │   ├── claude/
│   │   │   ├── client.ts         # Anthropic 클라이언트
│   │   │   ├── analysis.ts       # 이미지 분석 로직
│   │   │   ├── copywriting.ts    # 카피라이팅 로직
│   │   │   ├── html-generator.ts # HTML 생성 로직
│   │   │   └── prompts.ts        # AI 프롬프트
│   │   ├── templates/
│   │   │   └── html-templates.ts # 카테고리별 HTML 템플릿
│   │   └── usage-tracker.ts      # API 사용량 추적
│   └── types/
│       └── index.ts
├── docs/
│   └── DEVELOPMENT_LOG_2026-02-05.md
└── package.json
```

---

## 4. 오늘의 변경 사항 (2026-02-05)

### 커밋 히스토리

```
d309556 feat: add API usage tracking and cost estimation
49e988e feat: enhance coffee template with category-specific sections
0ec0191 feat: add full-page image capture for detail page download
f3a2b3e feat: implement commercial quality design system for detail pages
```

### 4.1 상업적 품질 디자인 시스템 구현 (f3a2b3e)

**목표**: 품질 점수 30점 → 70-80점 개선

**변경 내용:**
- 이모지 → Lucide SVG 아이콘 전환 (60개+ 아이콘)
- CSS 변수 시스템 도입 (색상, 간격, 타이포그래피)
- max-width 860px → 1200px 확대
- 8px 그리드 기반 간격 표준화
- 그라데이션 3개로 제한 (dark, light, accent)
- 반응형 브레이크포인트 추가 (1280, 1024, 768, 480px)

**CSS 변수 예시:**
```css
:root {
  --color-primary: #2563eb;
  --space-1: 8px;
  --space-12: 96px;
  --max-width: 1200px;
  --gradient-dark: linear-gradient(180deg, #111827, #1f2937);
}
```

### 4.2 전체 이미지 다운로드 기능 (0ec0191)

**문제**: 네이버 스마트스토어 등 CSS 제한 플랫폼에서 HTML 적용 불가

**해결책:**
- Puppeteer 기반 서버사이드 스크린샷
- `/api/capture-image` 엔드포인트 추가
- 2x 해상도 (deviceScaleFactor: 2)
- 전체 페이지 캡처 지원

**사용법:**
```typescript
POST /api/capture-image
Body: { html: "...", width: 1200 }
Response: image/png (binary)
```

### 4.3 커피 템플릿 카테고리 특화 (49e988e)

**참고**: 콩볶는사람들 등 실제 커피 상세페이지 분석

**추가된 섹션:**
| 섹션 | 설명 |
|-----|------|
| 원두 상세 정보 | 원산지, 농장, 고도, 가공방식 / 품종, 수확시기, 등급 |
| Flavor Profile | 산미, 바디, 단맛, 쓴맛, 향 시각화 바 |
| 로스팅 레벨 | 5단계 빈 아이콘으로 시각화 |
| 분쇄 옵션 | 홀빈, 에스프레소, 핸드드립, 프렌치프레스, 콜드브루 |
| 추출 가이드 | 온도, 비율, 시간 카드 |
| 대표 리뷰 | 별점과 함께 하이라이트 리뷰 |

**새 아이콘 추가:**
- map-pin (원산지)
- globe (글로벌)
- mountain (고산지대)

### 4.4 API 사용량 추적 기능 (d309556)

**파일 추가:**
- `src/lib/usage-tracker.ts` - 추적 모듈
- `src/app/api/usage/route.ts` - API 엔드포인트

**추적 항목:**
- API 호출 횟수
- 입력/출력 토큰 수
- 비용 (USD, KRW)
- 엔드포인트별 통계
- 최근 20개 호출 기록

---

## 5. API 사용량 추적 기능 사용법

### 5.1 사용량 조회

```bash
# 전체 사용량 요약
curl http://localhost:3000/api/usage
```

**응답 예시:**
```json
{
  "success": true,
  "data": {
    "totalCalls": 5,
    "totalInputTokens": 15000,
    "totalOutputTokens": 8000,
    "totalCostUsd": 0.165,
    "totalCostKrw": 222.75,
    "byEndpoint": {
      "/api/analyze": { "calls": 1, "costUsd": 0.035 },
      "/api/copywriting": { "calls": 1, "costUsd": 0.045 },
      "/api/generate-html": { "calls": 3, "costUsd": 0.085 }
    },
    "recentCalls": [...]
  }
}
```

### 5.2 사용량 초기화

```bash
curl -X DELETE http://localhost:3000/api/usage
```

### 5.3 비용 계산 방식

```
입력 비용 = (입력 토큰 / 1,000,000) × $3
출력 비용 = (출력 토큰 / 1,000,000) × $15
총 비용(USD) = 입력 비용 + 출력 비용
총 비용(KRW) = 총 비용(USD) × 1,350
```

### 5.4 주의사항

- 서버 재시작 시 데이터 초기화됨 (in-memory 저장)
- 프로덕션 환경에서는 DB 저장 권장
- `globalThis` 사용으로 개발 모드 hot reload 시에도 유지

---

## 6. 현재까지 API 사용량

**측정 기간:** 2026-02-05 (오늘)

| 항목 | 값 |
|-----|-----|
| 총 API 호출 | 1회 |
| 입력 토큰 | 2,897 |
| 출력 토큰 | 1,914 |
| **총 비용 (USD)** | **$0.0374** |
| **총 비용 (KRW)** | **약 50원** |

### 엔드포인트별 사용량

| 엔드포인트 | 호출 수 | 비용 |
|-----------|--------|------|
| /api/generate-html | 1회 | $0.0374 |

> **참고**: 이 수치는 개발/테스트 중 사용량이며, 서버 재시작 전까지의 기록입니다.

---

## 7. 실행 방법

### 개발 서버 시작

```bash
cd detail-p
npm run dev
```

### 접속 주소

- Local: http://localhost:3000
- Network: http://172.30.1.92:3000

### 환경 변수 설정

`.env.local` 파일 생성:
```
ANTHROPIC_API_KEY=your_api_key_here
```

---

## 8. 향후 계획

- [ ] 사용량 데이터 영구 저장 (DB 연동)
- [ ] 대시보드 UI 구현
- [ ] 일별/월별 비용 리포트
- [ ] 카테고리별 템플릿 추가 (화장품, 전자제품 등)
- [ ] 다국어 지원

---

## 9. 참고 자료

- [Anthropic API 문서](https://docs.anthropic.com/)
- [Next.js 문서](https://nextjs.org/docs)
- [Lucide Icons](https://lucide.dev/)
