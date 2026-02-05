import { NextResponse } from 'next/server';
import {
  generateProductScene,
  generateProductSceneWithComposite,
  type ImageStyle
} from '@/lib/openai';
import type { ApiResponse, ProductAnalysis } from '@/types';

interface GenerateImageResponse {
  imageBase64: string;
  method: 'composite' | 'fallback';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      productImageBase64,
      productName,
      category,
      style,
      customPrompt,
      useComposite = true,  // 기본값: 합성 방식 사용
    } = body as {
      productImageBase64: string;
      productName: string;
      category: ProductAnalysis['category'];
      style?: ImageStyle;
      customPrompt?: string;
      useComposite?: boolean;
    };

    if (!productImageBase64) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: '제품 이미지가 필요합니다.' },
        { status: 400 }
      );
    }

    if (!productName) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: '제품명이 필요합니다.' },
        { status: 400 }
      );
    }

    if (!style && !customPrompt) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: 'style 또는 customPrompt가 필요합니다.' },
        { status: 400 }
      );
    }

    let result: GenerateImageResponse;

    if (useComposite) {
      // 배경 제거 + 합성 방식 (기본)
      console.log('Using composite method (background removal + compositing)');
      result = await generateProductSceneWithComposite({
        productImageBase64,
        productName,
        category: category || 'other',
        style: style || 'lifestyle',
        customPrompt,
      });
    } else {
      // 기존 방식 (DALL-E가 제품 재생성)
      console.log('Using original method (DALL-E recreation)');
      const imageBase64 = await generateProductScene({
        productImageBase64,
        productName,
        category: category || 'other',
        style: style || 'lifestyle',
        customPrompt,
      });
      result = { imageBase64, method: 'fallback' };
    }

    return NextResponse.json<ApiResponse<GenerateImageResponse>>({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : '이미지 생성 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
