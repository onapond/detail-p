# Detail-P Plan Document (Retroactive)

## Feature: AI 기반 식품 상세페이지 자동 생성 SaaS

### Overview
MVP(64/100) 수준의 AI 상세페이지 생성기를 상업 품질로 고도화하는 프로젝트.

### Goals
1. **Phase 1**: 생성 품질 극대화 (타입 재설계, JSON 파서, 12개 템플릿, 스트리밍, 캐싱)
2. **Phase 2-1**: Supabase 인증 통합 (이메일+Google, 미들웨어 보호)
3. **Phase 2-2**: 데이터 영속성 (프로젝트 저장/불러오기, 이미지 스토리지)

### Scope
- 4 카테고리: coffee, health_supplement, processed_food, beverage
- 3 스타일: modern, classic, premium (12개 조합)
- AI Pipeline: Image → Claude Vision Analysis → Copywriting → HTML Generation
- Auth: Email/Password + Google OAuth via Supabase
- Storage: Supabase DB + product-images bucket

### Tech Stack
- Next.js 16.1.6 + React 19.2.3 + TailwindCSS 4
- Claude API (claude-sonnet-4-20250514)
- Supabase (Auth + DB + Storage)
- TypeScript strict mode

### Success Criteria
- 12개 카테고리x스타일 조합 모두 상업 품질 HTML 생성
- JSON 파싱 실패율 < 1%
- SSE 스트리밍으로 실시간 진행 표시
- 인증된 사용자만 API 접근 가능
- 프로젝트 저장/불러오기 정상 동작

### Reference
- Original plan: `.claude/plans/structured-popping-eagle.md`
- Work log: `WORK_LOG.md`

---
*Created retroactively: 2026-02-11 (original work: 2026-02-09 ~ 2026-02-10)*
