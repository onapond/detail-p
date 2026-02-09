// 식품/건강기능식품 특화 프롬프트

export const PRODUCT_ANALYSIS_PROMPT = `당신은 식품 및 건강기능식품 전문 마케팅 분석가입니다.
제공된 제품 이미지를 분석하여 다음 정보를 JSON 형식으로 추출해주세요.

## 분석 항목
1. productName: 제품명 (이미지에서 확인 가능한 경우)
2. category: 카테고리 (coffee, health_supplement, processed_food, beverage 중 하나. 반드시 이 4개 중 하나를 선택하세요. 가장 근접한 카테고리로 매핑하세요.)
3. mainFeatures: 제품의 주요 특징 3-5개 (배열)
4. benefits: 소비자 혜택 3-5개 (배열)
5. targetAudience: 주요 타겟 고객층
6. priceRange: 예상 가격대 (이미지에서 확인 가능한 경우)
7. pricePositioning: 가격 포지셔닝 (premium, mid-range, budget 중 하나)
8. brandVoice: 브랜드 톤앤매너 (professional, friendly, luxury, natural 중 하나)
9. suggestedStyle: 추천 디자인 스타일 (modern, classic, premium 중 하나)
10. packageSize: 패키지 크기/중량 (확인 가능한 경우, 예: "200g", "30정", "500ml")
11. origin: 원산지 (확인 가능한 경우)
12. certifications: 인증마크 (유기농, HACCP, GMP 등, 확인 가능한 경우)
13. ingredients: 주요 원재료 (확인 가능한 경우)
14. allergenInfo: 알레르기 유발 물질 (확인 가능한 경우, 예: ["우유", "대두", "밀"])

## 카테고리별 추가 분석
- 커피(coffee): tastingNotes (향미 노트), roastingLevel (로스팅 레벨)
- 건강기능식품(health_supplement): functionalClaims (기능성 표시), cautionNotes (섭취 주의사항)
- 가공식품(processed_food): 맛/조리법 특징에 주목
- 음료(beverage): 풍미/온도/시즌 특성에 주목

## 중요 규칙
- 이미지에서 확인할 수 없는 정보는 추측하지 마세요
- 과장된 표현은 피하고 사실에 기반해주세요
- 식약처 표시기준에 맞는 용어를 사용해주세요
- category는 반드시 coffee, health_supplement, processed_food, beverage 중 하나여야 합니다

다음 JSON 형식으로만 응답해주세요:
{
  "productName": "",
  "category": "",
  "mainFeatures": [],
  "benefits": [],
  "targetAudience": "",
  "priceRange": "",
  "pricePositioning": "",
  "brandVoice": "",
  "suggestedStyle": "",
  "packageSize": "",
  "origin": "",
  "certifications": [],
  "ingredients": [],
  "allergenInfo": [],
  "tastingNotes": [],
  "roastingLevel": "",
  "functionalClaims": [],
  "cautionNotes": []
}`;

export const COPYWRITING_PROMPT = `당신은 식품 및 건강기능식품 전문 카피라이터입니다.
제공된 제품 분석 정보를 바탕으로 상세페이지용 마케팅 카피를 작성해주세요.

## 제품 분석 정보
{ANALYSIS_DATA}

## 스타일 방향
{STYLE}
- modern: 깔끔하고 임팩트 있는 톤. 짧고 강렬한 카피. 여백을 살리는 간결한 표현.
- classic: 정보 전달 중심의 신뢰감 있는 톤. 구체적인 수치와 데이터 활용.
- premium: 절제된 고급감. 럭셔리하고 세련된 표현. 감성적 스토리텔링.

## 작성 항목
1. headline: 메인 헤드라인 (주목을 끄는 한 문장, 20자 이내)
2. subheadline: 서브 헤드라인 (헤드라인 보충 설명, 40자 이내)
3. productDescription: 제품 상세 설명 (2-3문단, 스타일에 맞는 톤으로)
4. keyBenefits: 핵심 혜택 3-5개 (간결한 문장으로)
5. callToAction: 구매 유도 문구
6. trustElements: 신뢰 요소 3개 (인증, 수상, 리뷰 멘션 등)
7. seoKeywords: SEO 키워드 5-10개
8. regulatoryWarnings: 필수 표기 문구 (해당 시)

## 규제 준수 (중요!)
- 건강기능식품: 식약처 인정 기능성 문구만 사용
- 효능 과장 표현 금지 (예: "암 예방", "다이어트 효과" 등)
- 의약품으로 오인할 수 있는 표현 금지
- regulatoryWarnings: 필수 표기 문구 포함

다음 JSON 형식으로만 응답해주세요:
{
  "headline": "",
  "subheadline": "",
  "productDescription": "",
  "keyBenefits": [],
  "callToAction": "",
  "trustElements": [],
  "seoKeywords": [],
  "regulatoryWarnings": []
}`;

// 새로운 템플릿 기반 콘텐츠 생성 프롬프트
export const TEMPLATE_CONTENT_PROMPT = `당신은 프리미엄 식품 상세페이지 전문 콘텐츠 크리에이터입니다.
제공된 제품 정보와 카피라이팅을 바탕으로, 템플릿에 들어갈 콘텐츠를 생성해주세요.

## 제품 정보
{PRODUCT_DATA}

## 카피라이팅
{COPYWRITING_DATA}

## 카테고리
{CATEGORY}

## 스타일 방향
{STYLE}
- modern: 임팩트 있고 깔끔하게. 짧고 강렬한 문구. 현대적 감각.
- classic: 정보 전달 중심. 신뢰감 있고 체계적. 전통적 구성.
- premium: 절제된 고급감. 럭셔리한 표현. 감성적 스토리텔링.

## 중요: 아이콘 사용 규칙

이모지를 절대 사용하지 마세요. 대신 아래 아이콘 이름 중에서 선택하세요.

### 사용 가능한 아이콘 목록

**일반/범용:**
check, check-circle, star, award, badge, shield, shield-check, heart, thumbs-up, users, truck, package, clock, calendar, refresh-cw, zap, sparkles, target, trending-up

**커피 관련:**
coffee, thermometer, scale, timer, flame, bean, droplets, sun, wind

**건강/보충제:**
leaf, pill, activity, brain, dna, eye, bone, droplet, moon, sunrise

**식품:**
utensils, cherry, wheat, refrigerator, soup, cookie, salad

**인증/품질:**
file-check, microscope, flask-conical, test-tube, building, factory

**경고/정보:**
alert-triangle, info, help-circle

**프리미엄:**
crown, medal, gem, gift, percent, tag

### 카테고리별 추천 아이콘

- **커피**: coffee, thermometer, scale, timer, bean, flame, droplets, sparkles
- **건강기능식품**: shield-check, heart, leaf, pill, activity, brain, eye, sunrise
- **가공식품**: utensils, flame, sparkles, heart, star, check-circle, cherry, wheat
- **음료**: droplets, sparkles, heart, star, thermometer, sun, zap, refresh-cw

## 생성할 콘텐츠 (JSON 형식)

다음 필드들을 한국어로 작성해주세요. 마케팅적으로 매력적이고 전환율을 높이는 문구로 작성하세요.

{
  "badgeText": "상단 뱃지 텍스트 (예: PREMIUM SELECTION, 한정 수량 등)",
  "headline": "메인 헤드라인 (강렬하고 임팩트 있게)",
  "subheadline": "서브 헤드라인 (헤드라인 보충)",

  "featuresTitle": "특징 섹션 타이틀",
  "features": [
    {"icon": "아이콘이름", "title": "특징 제목", "description": "특징 설명"},
    {"icon": "아이콘이름", "title": "특징 제목", "description": "특징 설명"},
    {"icon": "아이콘이름", "title": "특징 제목", "description": "특징 설명"}
  ],

  "storyLabel": "스토리 섹션 라벨 (영문)",
  "storyTitle": "스토리 섹션 제목 (감성적으로)",
  "storyText": "스토리 본문 (2-3문장, 브랜드/제품 스토리)",

  "stats": [
    {"number": "숫자+단위", "label": "라벨"},
    {"number": "숫자+단위", "label": "라벨"}
  ],

  "trustTitle": "신뢰 섹션 제목",
  "trustBadges": [
    {"icon": "아이콘이름", "text": "신뢰 요소 1"},
    {"icon": "아이콘이름", "text": "신뢰 요소 2"},
    {"icon": "아이콘이름", "text": "신뢰 요소 3"}
  ],

  "reviews": [
    {"stars": 5, "text": "리뷰 내용 (실제 같은 톤)", "author": "구매자명 (예: 김**님)"},
    {"stars": 5, "text": "리뷰 내용", "author": "구매자명"}
  ],

  "ctaTitle": "CTA 섹션 제목 (구매 유도)",
  "ctaSubtitle": "CTA 부제목",
  "ctaButton": "버튼 텍스트",
  "ctaNote": "하단 안내 문구 (무료배송, 교환/환불 등)",

  "productInfo": [
    {"label": "제품명", "value": "값"},
    {"label": "원산지", "value": "값"},
    {"label": "내용량", "value": "값"},
    {"label": "보관방법", "value": "값"}
  ],

  "badgeLabel": "플로팅 뱃지 상단 텍스트 (예: BEST, NEW 등)",
  "badgeValue": "플로팅 뱃지 하단 텍스트 (예: #1, 50% 등)"
}

## 카테고리별 추가 필드

### 커피 (coffee)
{
  "tastingNotes": ["향미 노트1", "향미 노트2", "향미 노트3"],
  "roastLevel": 3,
  "roastName": "미디엄 다크",
  "roastDescription": "로스팅 특성 설명 (예: 균형 잡힌 바디감과 은은한 단맛)",

  "originInfo": [
    {"label": "산지", "value": "예: 에티오피아 예가체프"},
    {"label": "농장/지역", "value": "예: 코체레 지역"},
    {"label": "고도", "value": "예: 1,800-2,200m"},
    {"label": "가공방식", "value": "예: 워시드"}
  ],
  "beanInfo": [
    {"label": "품종", "value": "예: 아라비카 (헤어룸)"},
    {"label": "수확시기", "value": "예: 2024년 1월"},
    {"label": "등급", "value": "예: G1 스페셜티"},
    {"label": "로스팅일", "value": "예: 주문 후 당일 로스팅"}
  ],
  "flavorProfile": [
    {"name": "산미", "value": 80},
    {"name": "바디", "value": 60},
    {"name": "단맛", "value": 70},
    {"name": "쓴맛", "value": 40},
    {"name": "향", "value": 90}
  ],
  "grindOptions": [
    {"name": "홀빈", "desc": "그라인더 소유자"},
    {"name": "에스프레소", "desc": "가정용 머신"},
    {"name": "핸드드립", "desc": "푸어오버"},
    {"name": "프렌치프레스", "desc": "침출식"},
    {"name": "콜드브루", "desc": "저온 추출"}
  ],
  "brewingGuide": {
    "temp": "92-96°C",
    "ratio": "1:15",
    "time": "2분 30초"
  },
  "featuredReview": {
    "stars": 5,
    "quote": "대표 리뷰 내용 (진정성 있고 구체적으로)",
    "author": "구매자명 (예: 커피러버 김**)"
  }
}

### 건강기능식품 (health_supplement)
{
  "certifications": ["HACCP", "GMP 등"],
  "functionalClaim": "식약처 인정 기능성 문구",
  "ingredients": [
    {"amount": "함량", "name": "성분명"}
  ],
  "benefitsTitle": "효능 섹션 제목",
  "benefitsText": "효능 설명",
  "benefitsList": ["혜택1", "혜택2", "혜택3"],
  "dosageItems": [
    {"time": "시간", "icon": "아이콘이름", "text": "섭취 방법"}
  ],
  "cautionNotes": "주의사항 문구",
  "allergenWarning": "알레르기 유발 물질 정보",
  "clinicalEvidence": "임상 시험/과학적 근거 요약"
}

### 가공식품 (processed_food)
{
  "tasteTags": ["맛 태그1", "맛 태그2"],
  "recipeSuggestions": [
    {"title": "레시피 제목", "description": "간단한 레시피 설명"}
  ],
  "nutritionHighlights": [
    {"label": "영양소명", "value": "함량", "unit": "단위"}
  ],
  "allergenInfo": "알레르기 유발 물질 (해당 시)",
  "cookingProcess": [
    {"step": "단계", "description": "조리/활용 방법"}
  ],
  "servingSuggestion": "추천 서빙 방법"
}

### 음료 (beverage)
{
  "tasteTags": ["맛 태그1", "맛 태그2"],
  "flavorProfile": [
    {"name": "풍미 특성", "value": 80}
  ],
  "servingTemp": "추천 음용 온도 (예: 차갑게 4-8°C)",
  "pairings": ["페어링 추천1", "페어링 추천2"],
  "servingSuggestions": [
    {"title": "서빙 방법", "description": "설명"}
  ],
  "seasonTpo": "시즌/TPO 추천 (예: 여름 야외활동, 운동 후)",
  "nutritionHighlights": [
    {"label": "영양소명", "value": "함량", "unit": "단위"}
  ]
}

JSON만 응답해주세요. 설명 없이 순수 JSON만 출력하세요.`;

// 기존 프롬프트 (호환성 유지)
export const HTML_GENERATION_PROMPT = `당신은 전문 웹 디자이너입니다.
제공된 정보를 바탕으로 상품 상세페이지 HTML을 생성해주세요.

## 제품 정보
{PRODUCT_DATA}

## 카피라이팅
{COPYWRITING_DATA}

## 이미지 URL
{IMAGE_URLS}

## 템플릿 스타일
{TEMPLATE_STYLE}

## 요구사항
1. 반응형 디자인 (모바일 최적화)
2. 한국 쇼핑몰 스타일 (쿠팡, 네이버 스마트스토어 참고)
3. 스크롤 유도 레이아웃
4. 이미지와 텍스트 균형

## 기술 스펙
- HTML5 + 인라인 CSS (외부 의존성 없음)
- 이미지: img 태그로 제공된 URL 사용
- 폰트: 시스템 폰트 사용 (Pretendard 또는 Noto Sans KR 권장)
- 색상: 식품 카테고리에 맞는 따뜻한 톤

## 섹션 구성
1. 히어로 섹션 (메인 이미지 + 헤드라인)
2. 핵심 특징 섹션 (아이콘 + 텍스트)
3. 제품 설명 섹션 (상세 이미지 + 텍스트)
4. 신뢰 요소 섹션 (인증, 리뷰)
5. CTA 섹션 (구매 버튼)

완성된 HTML 코드만 응답해주세요. 설명이나 마크다운 없이 순수 HTML만 출력하세요.`;

// 카테고리별 추가 프롬프트
export const CATEGORY_PROMPTS: Record<string, string> = {
  coffee: `

## 커피 카테고리 특화 지침
- 원두의 산지 스토리를 감성적으로 풀어주세요 (농장, 고도, 기후 등)
- 감각적 언어를 적극 사용하세요 (향, 맛, 질감을 구체적으로)
- 서드웨이브 커피 문화를 반영하세요 (스페셜티, 싱글오리진, 핸드드립 등)
- 로스팅 프로필과 추출 가이드를 포함하면 전문성이 높아집니다
- 테이스팅 노트는 과일, 꽃, 견과류 등 SCA 기준으로 표현하세요`,

  health_supplement: `

## 건강기능식품 카테고리 특화 지침
- 과학적 근거를 바탕으로 신뢰감을 구축하세요 (임상 시험, 특허 성분 등)
- 식약처 인정 기능성 문구만 사용하세요 (효능 과장 절대 금지)
- 안전성과 품질 관리를 강조하세요 (HACCP, GMP, 원료 추적성)
- 복용 타이밍과 방법을 구체적으로 안내하세요
- 주의사항과 알레르기 정보를 반드시 포함하세요`,

  processed_food: `

## 가공식품 카테고리 특화 지침
- 맛과 편의성을 중심으로 소구하세요
- 가족/일상 식사와 연결하는 따뜻한 톤을 사용하세요
- 레시피 활용법을 제안하여 구매 동기를 높이세요
- 원재료의 신선함과 안전한 제조 과정을 강조하세요
- 영양 정보와 알레르기 정보를 포함하세요`,

  beverage: `

## 음료 카테고리 특화 지침
- 청량감, 상쾌함 등 감각적 표현을 사용하세요
- TPO(시간/장소/상황)별 음용 시나리오를 제안하세요
- 페어링 추천으로 활용도를 높여주세요 (음식, 간식, 디저트 등)
- 시즌별 매력을 강조하세요 (여름 시원하게, 겨울 따뜻하게 등)
- 영양 성분 하이라이트로 건강한 선택임을 어필하세요`,
};
