import { createOpenAIClient } from './client';
import { removeBackground } from '@/lib/image/background-removal';
import { compositeWithShadow } from '@/lib/image/composite';
import type { ProductAnalysis } from '@/types';

export type ImageStyle = 'lifestyle' | 'studio' | 'premium' | 'natural';

interface GenerateProductSceneOptions {
  productImageBase64: string;
  productName: string;
  category: ProductAnalysis['category'];
  style: ImageStyle;
  customPrompt?: string;
}

// 배경 제거 + 합성 방식 옵션
interface GenerateWithCompositeOptions extends GenerateProductSceneOptions {
  /** 배경 제거된 제품 이미지 (이미 제거된 경우) */
  transparentProductBase64?: string;
}

// 카테고리별 기본 장면 프롬프트 - 전문 제품 사진 촬영 기법 반영
const CATEGORY_SCENE_PROMPTS: Record<ProductAnalysis['category'], Record<ImageStyle, string>> = {
  coffee: {
    lifestyle: `모던 카페 인테리어 배경, 따뜻한 톤의 원목 테이블 위에 제품 배치.
옆에는 갓 내린 커피 한 잔(스팀이 살짝 피어오르는), 커피 원두 몇 알이 자연스럽게 흩어져 있음.
조명: 오전 10시경의 부드러운 자연광이 45도 각도로 들어오는 느낌, 따뜻한 색온도(3200K).
분위기: 아늑하고 편안한 브런치 카페, 인스타그래머블한 감성.
카메라: 약간 위에서 내려다보는 45도 앵글, f/2.8 정도의 아웃포커스로 배경 살짝 흐림.`,

    studio: `순백색 무광 배경(인피니티 월), 제품을 정중앙에 배치.
조명: 메인 조명은 제품 우측 상단 45도에서, 필 라이트로 그림자 부드럽게, 림 라이트로 제품 윤곽 강조.
바닥에 미세한 그림자로 공간감 부여, 반사판 사용한 듯한 깔끔한 하이라이트.
카메라: 제품과 수평, 정면 또는 3/4 앵글, 제품 전체가 선명하게 보이는 조리개.
스타일: 아마존/쿠팡 대표이미지 스타일의 깔끔한 제품컷.`,

    premium: `고급 대리석(캘커타 골드 또는 네로 마르퀴나) 테이블 위에 제품 배치.
옆에는 골드 또는 로즈골드 악센트의 커피 도구(드리퍼, 스푼), 고급 도자기 커피잔.
뒤편에 흐릿하게 보이는 고급 인테리어 요소(화병, 아트북 등).
조명: 스튜디오 조명 세팅, 메인라이트 + 악센트 조명으로 금속 소재 반짝임 연출.
분위기: 5성급 호텔 라운지, 럭셔리 라이프스타일 매거진 화보 느낌.
카메라: 낮은 앵글에서 살짝 올려다보는 구도, 광각으로 공간감 연출.`,

    natural: `러스틱한 원목 도마 또는 빈티지 나무 테이블 위에 제품 배치.
주변에 로스팅 전 생두, 볶은 원두, 황마 자루 등 원재료 요소 배치.
뒤편에 커피 체리 가지나 커피 농장을 연상시키는 식물 요소.
조명: 창가에서 들어오는 자연광, 따뜻한 오후 햇살 느낌.
분위기: 산지 직송, 크래프트, 장인정신을 강조하는 내추럴 무드.
카메라: 45도 탑뷰 또는 아이레벨, 따뜻한 색감의 필름 톤.`,
  },

  health_supplement: {
    lifestyle: `밝고 깨끗한 모던 주방 또는 다이닝 테이블 위에 제품 배치.
옆에는 신선한 과일/채소, 요거트 볼, 건강한 아침식사 요소들.
큰 창문으로 들어오는 밝은 아침 햇살, 깨끗하고 청량한 분위기.
조명: 자연광 느낌의 밝고 균일한 조명, 차가운 색온도(5500K).
분위기: 건강하고 활기찬 아침, 웰니스 라이프스타일.
카메라: 밝고 선명한 톤, 클린한 느낌의 하이키 촬영.`,

    studio: `순백색 또는 연한 그레이 배경, 의료/과학적 신뢰감을 주는 깔끔한 세팅.
제품을 중앙에, 필요시 캡슐/정제를 예쁘게 배열하여 함께 촬영.
조명: 소프트박스를 사용한 균일하고 부드러운 조명, 그림자 최소화.
스타일: 제약회사 공식 제품 사진 느낌, 신뢰감과 전문성 강조.
카메라: 정면 또는 약간 측면, 제품 라벨이 선명하게 보이는 앵글.`,

    premium: `고급 스파/웰니스 센터를 연상시키는 세팅.
대리석 또는 테라조 소재 위에 제품 배치, 주변에 자연 소재(나무, 돌) 악센트.
뒤편에 녹색 식물, 아로마 캔들, 고급 타월 등 웰니스 요소.
조명: 부드럽고 고급스러운 스파 조명 느낌.
분위기: 프리미엄 웰니스, 셀프케어, 럭셔리 건강관리.
카메라: 우아한 구도, 차분한 색감.`,

    natural: `자연 원료를 강조하는 세팅.
나무 또는 돌 소재 위에 제품, 주변에 제품 원료가 되는 허브/식물/열매 배치.
싱싱한 녹색 잎사귀, 꽃, 자연 요소들로 둘러싸인 구성.
조명: 부드러운 자연광, 그린 톤이 살아나는 색감.
분위기: 자연에서 온 건강함, 유기농, 클린뷰티 느낌.
카메라: 탑뷰 플랫레이 또는 45도 앵글.`,
  },

  processed_food: {
    lifestyle: `따뜻한 가정집 주방 또는 다이닝 테이블 세팅.
제품과 함께 조리된 음식, 요리 재료, 주방 도구들이 자연스럽게 배치.
가족이 함께하는 식탁을 연상시키는 따뜻한 분위기.
조명: 따뜻한 텅스텐 조명 느낌, 식욕을 돋우는 색감.
분위기: 집밥, 홈쿠킹, 가족의 행복한 식사시간.
카메라: 음식이 맛있어 보이는 앵글, 스팀이나 신선함 강조.`,

    studio: `깔끔한 단색 배경(흰색 또는 파스텔톤) 위에 제품과 요리된 음식 함께 배치.
전문 푸드 스타일링: 재료 단면, 소스 드리즐, 가니쉬 등으로 비주얼 강조.
조명: 푸드 포토그래피 전문 조명, 음식의 질감과 색감이 살아나는 세팅.
스타일: 배달의민족/요기요 메뉴 사진 느낌의 먹음직스러운 연출.
카메라: 45도 또는 탑뷰, 음식 클로즈업도 함께.`,

    premium: `파인다이닝 레스토랑 스타일의 플레이팅.
고급 그릇/접시 위에 제품을 활용한 요리를 미슐랭 스타일로 연출.
뒤편에 와인글라스, 고급 커트러리 등 다이닝 요소.
조명: 무드있는 레스토랑 조명, 음식에 포커스.
분위기: 미식, 파인다이닝, 셰프의 요리.
카메라: 예술적인 구도, 음식의 디테일 강조.`,

    natural: `팜투테이블(Farm to Table) 컨셉.
나무 도마, 바구니 등 자연 소재 위에 제품과 신선한 재료들.
갓 수확한 듯한 채소, 허브 등이 흙이 살짝 묻은 채로 배치.
조명: 자연광, 시골 농가의 아침 느낌.
분위기: 신선함, 자연 그대로, 건강한 식재료.
카메라: 풍성하고 자연스러운 구도.`,
  },

  beverage: {
    lifestyle: `시원한 여름날 야외 테라스 또는 카페 세팅.
제품과 함께 얼음이 담긴 시원한 음료, 물방울이 맺힌 글라스.
뒤편에 흐릿하게 보이는 야외 풍경, 파라솔, 선베드 등.
조명: 밝은 자연광, 청량감 있는 색감.
분위기: 시원함, 상쾌함, 여름 바캉스 무드.
카메라: 음료의 청량감이 느껴지는 앵글, 물방울/얼음 디테일.`,

    studio: `깔끔한 배경(그라데이션 또는 단색) 위에 제품과 음료 배치.
글라스에 담긴 음료, 얼음, 가니쉬 등으로 음료 스타일링.
조명: 음료가 투명하게 빛나는 백라이트 + 정면 조명.
스타일: 음료 광고/메뉴판 사진 느낌.
카메라: 음료의 색감과 투명도가 살아나는 앵글.`,

    premium: `고급 바/라운지 세팅.
바 카운터 위에 제품, 옆에 크리스탈 글라스에 담긴 음료.
뒤편에 흐릿하게 보이는 바 인테리어, 조명, 술병들.
조명: 무드있는 바 조명, 따뜻한 암버톤.
분위기: 럭셔리 나이트라이프, 프리미엄 음료.
카메라: 시네마틱한 분위기의 구도.`,

    natural: `야외 피크닉 또는 자연 속 세팅.
잔디밭, 나무 그늘 아래 피크닉 매트 위에 제품과 음료.
신선한 과일, 꽃, 자연 요소들과 함께.
조명: 나무 사이로 들어오는 자연광, 따뜻한 오후 햇살.
분위기: 소풍, 힐링, 자연 속 휴식.
카메라: 편안하고 자연스러운 구도.`,
  },
};

const STYLE_LABELS: Record<ImageStyle, string> = {
  lifestyle: '라이프스타일',
  studio: '스튜디오',
  premium: '프리미엄',
  natural: '내추럴',
};

export { STYLE_LABELS };

// GPT-4o에게 제품 분석 및 DALL-E 프롬프트 생성을 요청하는 시스템 프롬프트 (기존 방식)
const ANALYSIS_SYSTEM_PROMPT = `You are an expert product photographer and creative director specializing in commercial product photography for e-commerce and advertising.

Your task:
1. Carefully analyze the provided product image
2. Extract ALL visual details of the product (exact colors with hex codes if possible, shape, dimensions ratio, packaging material, typography, logos, brand elements, any distinctive features)
3. Create a detailed DALL-E 3 prompt that will generate a professional product photo

CRITICAL RULES for the DALL-E prompt:
- The product in the generated image must look EXACTLY like the original (same colors, same design, same proportions)
- Describe the product in extreme detail so DALL-E can recreate it accurately
- Include specific photography terms (lighting setup, camera angle, lens, depth of field)
- Describe the scene/background in detail
- Specify the mood and color grading
- The prompt should be in English for best DALL-E results
- Keep the prompt under 900 characters (DALL-E limit)

Output ONLY the DALL-E prompt, nothing else.`;

// 배경만 생성하는 프롬프트 (제품은 합성할 것이므로 배경만)
const BACKGROUND_ONLY_SYSTEM_PROMPT = `You are an expert product photographer and set designer specializing in creating beautiful scenes for product photography.

Your task:
1. Analyze the scene requirements provided
2. Create a DALL-E 3 prompt that generates ONLY the background/scene - WITHOUT any product
3. The scene should have a clear central area where a product will be composited later

CRITICAL RULES for the DALL-E prompt:
- DO NOT include any product in the prompt
- Create an empty scene/surface where a product would naturally be placed
- Include a clear, uncluttered area in the center-bottom of the frame for product placement
- Describe lighting, textures, props around the edges, and atmosphere
- Use professional photography terminology
- The prompt should be in English
- Keep the prompt under 800 characters

Example good prompt structure:
"A warm wooden table surface in a modern cafe interior. Morning sunlight streaming through a window on the left. A cup of coffee and scattered beans visible at the right edge of frame. Soft bokeh background showing cafe shelves. Clean central area on the table for product placement. Shot at f/2.8, warm color temperature 3200K."

Output ONLY the DALL-E prompt, nothing else.`;

function buildUserPrompt(options: GenerateProductSceneOptions): string {
  const { productName, category, style, customPrompt } = options;

  const scenePrompt = customPrompt ||
    CATEGORY_SCENE_PROMPTS[category]?.[style] ||
    CATEGORY_SCENE_PROMPTS.processed_food[style];

  return `Product Name: ${productName}
Category: ${category}

SCENE REQUIREMENTS:
${scenePrompt}

Create a DALL-E 3 prompt for this product photo. Remember:
1. Describe the product's appearance in EXACT detail first
2. Then describe the scene, lighting, and composition
3. Use professional photography terminology
4. The final image should look like a real commercial product photo`;
}

export async function generateProductScene(options: GenerateProductSceneOptions): Promise<string> {
  const client = createOpenAIClient();

  // Step 1: GPT-4o analyzes product and creates optimized DALL-E prompt
  const analysisResponse = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: ANALYSIS_SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${options.productImageBase64}`,
              detail: 'high',
            },
          },
          {
            type: 'text',
            text: buildUserPrompt(options),
          },
        ],
      },
    ],
    max_tokens: 1000,
    temperature: 0.7,
  });

  const dallePrompt = analysisResponse.choices[0]?.message?.content;
  if (!dallePrompt) {
    throw new Error('Failed to generate image prompt');
  }

  console.log('Generated DALL-E prompt:', dallePrompt);

  // Step 2: Generate image with DALL-E 3
  const imageResponse = await client.images.generate({
    model: 'dall-e-3',
    prompt: dallePrompt,
    n: 1,
    size: '1024x1024',
    quality: 'hd',
    style: options.style === 'natural' ? 'natural' : 'vivid',
    response_format: 'b64_json',
  });

  const imageData = imageResponse.data?.[0]?.b64_json;
  if (!imageData) {
    throw new Error('이미지 생성에 실패했습니다.');
  }

  return imageData;
}

// 여러 스타일로 한번에 생성
export async function generateMultipleScenes(
  productImageBase64: string,
  productName: string,
  category: ProductAnalysis['category'],
  styles: ImageStyle[]
): Promise<{ style: ImageStyle; imageBase64: string }[]> {
  const results = await Promise.all(
    styles.map(async (style) => {
      const imageBase64 = await generateProductScene({
        productImageBase64,
        productName,
        category,
        style,
      });
      return { style, imageBase64 };
    })
  );

  return results;
}

// 커스텀 프롬프트로 생성
export async function generateCustomScene(
  productImageBase64: string,
  productName: string,
  category: ProductAnalysis['category'],
  customPrompt: string
): Promise<string> {
  return generateProductScene({
    productImageBase64,
    productName,
    category,
    style: 'lifestyle',
    customPrompt,
  });
}

// ============================================
// 배경 제거 + 합성 방식 (제품 원본 유지)
// ============================================

function buildBackgroundPrompt(category: ProductAnalysis['category'], style: ImageStyle, customPrompt?: string): string {
  const scenePrompt = customPrompt ||
    CATEGORY_SCENE_PROMPTS[category]?.[style] ||
    CATEGORY_SCENE_PROMPTS.processed_food[style];

  return `Create a background scene for ${category} product photography.

SCENE REQUIREMENTS:
${scenePrompt}

IMPORTANT:
- Generate ONLY the background/scene
- Leave a clear, empty space in the center-bottom area where a product will be placed
- Do not include any product or packaging in the image
- Focus on creating an atmospheric, professional photo background`;
}

/**
 * 배경만 생성 (제품 없음)
 */
export async function generateBackgroundOnly(
  category: ProductAnalysis['category'],
  style: ImageStyle,
  customPrompt?: string
): Promise<string> {
  const client = createOpenAIClient();

  // GPT-4o로 배경 프롬프트 최적화
  const promptResponse = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: BACKGROUND_ONLY_SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: buildBackgroundPrompt(category, style, customPrompt),
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  const dallePrompt = promptResponse.choices[0]?.message?.content;
  if (!dallePrompt) {
    throw new Error('Failed to generate background prompt');
  }

  console.log('Generated background-only DALL-E prompt:', dallePrompt);

  // DALL-E로 배경 생성
  const imageResponse = await client.images.generate({
    model: 'dall-e-3',
    prompt: dallePrompt,
    n: 1,
    size: '1024x1024',
    quality: 'hd',
    style: style === 'natural' ? 'natural' : 'vivid',
    response_format: 'b64_json',
  });

  const imageData = imageResponse.data?.[0]?.b64_json;
  if (!imageData) {
    throw new Error('배경 이미지 생성에 실패했습니다.');
  }

  return imageData;
}

/**
 * 배경 제거 + 합성 방식으로 제품 이미지 생성
 * 원본 제품 이미지를 유지하면서 새로운 배경에 합성
 */
export async function generateProductSceneWithComposite(
  options: GenerateWithCompositeOptions
): Promise<{ imageBase64: string; method: 'composite' | 'fallback' }> {
  const {
    productImageBase64,
    category,
    style,
    customPrompt,
    transparentProductBase64,
  } = options;

  try {
    // Step 1: 배경 제거 (이미 제거된 경우 스킵)
    let productWithoutBg: string;

    if (transparentProductBase64) {
      productWithoutBg = transparentProductBase64;
      console.log('Using pre-removed background image');
    } else {
      console.log('Removing background from product image...');
      const bgRemovalResult = await removeBackground(productImageBase64);

      if (!bgRemovalResult.success || !bgRemovalResult.imageBase64) {
        console.warn('Background removal failed:', bgRemovalResult.error);
        // 배경 제거 실패 시 기존 방식으로 폴백
        console.log('Falling back to original generation method...');
        const fallbackImage = await generateProductScene(options);
        return { imageBase64: fallbackImage, method: 'fallback' };
      }

      productWithoutBg = bgRemovalResult.imageBase64;
      console.log('Background removed successfully');
    }

    // Step 2: 배경 생성
    console.log('Generating background scene...');
    const backgroundBase64 = await generateBackgroundOnly(category, style, customPrompt);
    console.log('Background generated successfully');

    // Step 3: 합성
    console.log('Compositing product onto background...');
    const compositeResult = await compositeWithShadow({
      productBase64: productWithoutBg,
      backgroundBase64,
      position: { x: 0.5, y: 0.55 },  // 중앙 약간 아래
      scale: 0.55,  // 배경 대비 55% 크기
    });

    if (!compositeResult.success || !compositeResult.imageBase64) {
      throw new Error(compositeResult.error || '이미지 합성에 실패했습니다.');
    }

    console.log('Composite completed successfully');
    return { imageBase64: compositeResult.imageBase64, method: 'composite' };

  } catch (error) {
    console.error('Composite generation failed, falling back to original method:', error);
    // 에러 발생 시 기존 방식으로 폴백
    const fallbackImage = await generateProductScene(options);
    return { imageBase64: fallbackImage, method: 'fallback' };
  }
}

/**
 * 여러 스타일로 합성 방식 생성
 */
export async function generateMultipleScenesWithComposite(
  productImageBase64: string,
  productName: string,
  category: ProductAnalysis['category'],
  styles: ImageStyle[]
): Promise<{ style: ImageStyle; imageBase64: string; method: 'composite' | 'fallback' }[]> {
  // 먼저 배경 제거 한 번만 수행
  console.log('Removing background once for all styles...');
  const bgRemovalResult = await removeBackground(productImageBase64);

  const transparentProductBase64 = bgRemovalResult.success
    ? bgRemovalResult.imageBase64
    : undefined;

  // 각 스타일별로 생성
  const results = await Promise.all(
    styles.map(async (style) => {
      const result = await generateProductSceneWithComposite({
        productImageBase64,
        productName,
        category,
        style,
        transparentProductBase64,
      });
      return { style, ...result };
    })
  );

  return results;
}
