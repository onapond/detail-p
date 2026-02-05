/**
 * 이미지 합성 유틸리티
 * 배경 제거된 제품 이미지를 새 배경 위에 합성합니다.
 */

import sharp from 'sharp';

interface CompositeOptions {
  /** 배경 제거된 제품 이미지 (PNG, base64) */
  productBase64: string;
  /** 배경 이미지 (base64) */
  backgroundBase64: string;
  /** 제품 위치 (0-1 범위, 기본값: 중앙) */
  position?: {
    x: number;
    y: number;
  };
  /** 제품 크기 비율 (0-1, 기본값: 0.6) */
  scale?: number;
}

interface CompositeResult {
  success: boolean;
  imageBase64?: string;
  error?: string;
}

/**
 * 제품 이미지를 배경 위에 합성
 */
export async function compositeProductOnBackground(
  options: CompositeOptions
): Promise<CompositeResult> {
  const {
    productBase64,
    backgroundBase64,
    position = { x: 0.5, y: 0.55 },  // 약간 아래쪽 중앙
    scale = 0.55,  // 배경 대비 55% 크기
  } = options;

  try {
    // Base64를 Buffer로 변환
    const productBuffer = Buffer.from(productBase64, 'base64');
    const backgroundBuffer = Buffer.from(backgroundBase64, 'base64');

    // 배경 이미지 정보 가져오기
    const backgroundMeta = await sharp(backgroundBuffer).metadata();
    const bgWidth = backgroundMeta.width || 1024;
    const bgHeight = backgroundMeta.height || 1024;

    // 제품 이미지 정보 가져오기
    const productMeta = await sharp(productBuffer).metadata();
    const prodWidth = productMeta.width || 512;
    const prodHeight = productMeta.height || 512;

    // 제품 크기 계산 (배경 대비 비율)
    const maxProductSize = Math.min(bgWidth, bgHeight) * scale;
    const productAspect = prodWidth / prodHeight;

    let newWidth: number;
    let newHeight: number;

    if (productAspect > 1) {
      // 가로가 더 긴 경우
      newWidth = Math.round(maxProductSize);
      newHeight = Math.round(maxProductSize / productAspect);
    } else {
      // 세로가 더 긴 경우
      newHeight = Math.round(maxProductSize);
      newWidth = Math.round(maxProductSize * productAspect);
    }

    // 제품 이미지 리사이즈
    const resizedProduct = await sharp(productBuffer)
      .resize(newWidth, newHeight, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    // 합성 위치 계산
    const left = Math.round((bgWidth - newWidth) * position.x);
    const top = Math.round((bgHeight - newHeight) * position.y);

    // 합성 실행
    const composited = await sharp(backgroundBuffer)
      .composite([
        {
          input: resizedProduct,
          top: Math.max(0, top),
          left: Math.max(0, left),
          blend: 'over',
        },
      ])
      .jpeg({ quality: 90 })
      .toBuffer();

    return {
      success: true,
      imageBase64: composited.toString('base64'),
    };
  } catch (error) {
    console.error('Composite error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '이미지 합성 중 오류 발생',
    };
  }
}

/**
 * 그림자 효과를 추가한 합성 (더 자연스러운 결과)
 */
export async function compositeWithShadow(
  options: CompositeOptions
): Promise<CompositeResult> {
  const {
    productBase64,
    backgroundBase64,
    position = { x: 0.5, y: 0.55 },
    scale = 0.55,
  } = options;

  try {
    const productBuffer = Buffer.from(productBase64, 'base64');
    const backgroundBuffer = Buffer.from(backgroundBase64, 'base64');

    const backgroundMeta = await sharp(backgroundBuffer).metadata();
    const bgWidth = backgroundMeta.width || 1024;
    const bgHeight = backgroundMeta.height || 1024;

    const productMeta = await sharp(productBuffer).metadata();
    const prodWidth = productMeta.width || 512;
    const prodHeight = productMeta.height || 512;

    const maxProductSize = Math.min(bgWidth, bgHeight) * scale;
    const productAspect = prodWidth / prodHeight;

    let newWidth: number;
    let newHeight: number;

    if (productAspect > 1) {
      newWidth = Math.round(maxProductSize);
      newHeight = Math.round(maxProductSize / productAspect);
    } else {
      newHeight = Math.round(maxProductSize);
      newWidth = Math.round(maxProductSize * productAspect);
    }

    // 제품 이미지 리사이즈
    const resizedProduct = await sharp(productBuffer)
      .resize(newWidth, newHeight, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    // 그림자 생성 (제품 이미지 기반)
    const shadowOffset = Math.round(newHeight * 0.02);
    const shadowBlur = Math.round(newWidth * 0.03);

    const shadow = await sharp(productBuffer)
      .resize(newWidth, newHeight, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .modulate({ brightness: 0 })  // 검은색으로
      .blur(shadowBlur > 0.3 ? shadowBlur : 1)  // 블러 (최소값 필요)
      .png()
      .toBuffer();

    // 그림자 투명도 조절
    const shadowWithOpacity = await sharp(shadow)
      .ensureAlpha()
      .linear(0.3)  // 투명도 30%
      .toBuffer();

    const left = Math.round((bgWidth - newWidth) * position.x);
    const top = Math.round((bgHeight - newHeight) * position.y);

    // 합성 (그림자 먼저, 그 위에 제품)
    const composited = await sharp(backgroundBuffer)
      .composite([
        {
          input: shadowWithOpacity,
          top: Math.max(0, top + shadowOffset),
          left: Math.max(0, left + shadowOffset),
          blend: 'multiply',
        },
        {
          input: resizedProduct,
          top: Math.max(0, top),
          left: Math.max(0, left),
          blend: 'over',
        },
      ])
      .jpeg({ quality: 90 })
      .toBuffer();

    return {
      success: true,
      imageBase64: composited.toString('base64'),
    };
  } catch (error) {
    console.error('Composite with shadow error:', error);
    // 그림자 실패 시 기본 합성으로 폴백
    return compositeProductOnBackground(options);
  }
}
