# Detail_P - AI 상세페이지 생성기

식품/건강기능식품 특화 AI 상세페이지 생성 서비스

## 주요 기능

- **이미지 분석**: Claude Vision API를 활용한 제품 이미지 자동 분석
- **카피라이팅**: 식품 규제 준수 마케팅 카피 자동 생성
- **AI 이미지 생성**: DALL-E 3를 활용한 제품 배경/무드 이미지 생성
- **HTML 생성**: 쇼핑몰에 바로 사용 가능한 상세페이지 HTML 생성
- **템플릿 시스템**: 모던/클래식/미니멀 3종 템플릿
- **다운로드**: HTML + 이미지 ZIP 일괄 다운로드

## 기술 스택

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes, Supabase (Auth, Storage, DB)
- **AI**: Anthropic Claude API (Vision + Text), OpenAI DALL-E 3 (Image Generation)
- **Utilities**: JSZip, file-saver, lucide-react

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 값들을 설정:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Anthropic Claude API
ANTHROPIC_API_KEY=your-anthropic-api-key

# OpenAI API (for DALL-E 3 image generation)
OPENAI_API_KEY=your-openai-api-key
```

### 3. Supabase 설정

1. [Supabase](https://supabase.com) 프로젝트 생성
2. `src/lib/supabase/schema.sql` 파일의 SQL을 실행
3. Storage에서 `product-images` 버킷 생성 (Public 설정)

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인

## 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/         # 이미지 분석 API
│   │   ├── copywriting/     # 카피라이팅 생성 API
│   │   ├── generate-html/   # HTML 생성 API
│   │   └── generate-image/  # AI 이미지 생성 API
│   ├── page.tsx             # 메인 페이지
│   └── layout.tsx
├── components/
│   ├── ui/                  # shadcn/ui 컴포넌트
│   ├── upload/              # 이미지 업로드
│   ├── analysis/            # 분석 결과 표시
│   ├── copywriting/         # 카피 에디터
│   ├── template/            # 템플릿 선택
│   ├── preview/             # HTML 미리보기
│   └── download/            # 다운로드 패널
├── hooks/
│   ├── useImageUpload.ts    # 이미지 업로드 훅
│   └── useGeneration.ts     # 생성 프로세스 훅
├── lib/
│   ├── claude/              # Claude API 연동
│   ├── openai/              # OpenAI DALL-E 연동
│   ├── supabase/            # Supabase 클라이언트
│   └── templates/           # 템플릿 정의
└── types/
    └── index.ts             # TypeScript 타입
```

## API 사용량 추정

월 100명 사용자 기준:
- Claude Vision: ~$100
- Claude Text: ~$100
- DALL-E 3: ~$200 (사용자당 5회 기준)
- 총계: ~$400/월

## 배포

### Vercel 배포

```bash
npm run build
vercel --prod
```

### 환경 변수

Vercel 대시보드에서 다음 환경 변수 설정 필요:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY`

## 라이선스

MIT
