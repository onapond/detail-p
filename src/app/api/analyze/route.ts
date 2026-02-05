import { NextResponse } from 'next/server';
import { analyzeMultipleImages } from '@/lib/claude/analysis';
import type { ApiResponse, ProductAnalysis } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { images } = body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: '이미지가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    // Validate image data
    for (const img of images) {
      if (!img.base64 || !img.mimeType) {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: '잘못된 이미지 형식입니다.' },
          { status: 400 }
        );
      }
    }

    const analysis = await analyzeMultipleImages(images);

    return NextResponse.json<ApiResponse<ProductAnalysis>>({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : '분석 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
