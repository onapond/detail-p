import { NextResponse } from 'next/server';
import { generateCopywriting } from '@/lib/claude/copywriting';
import type { ApiResponse, CopywritingResult, ProductAnalysis } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { analysis } = body as { analysis: ProductAnalysis };

    if (!analysis) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: '제품 분석 데이터가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    const copywriting = await generateCopywriting(analysis);

    return NextResponse.json<ApiResponse<CopywritingResult>>({
      success: true,
      data: copywriting,
    });
  } catch (error) {
    console.error('Copywriting generation error:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : '카피라이팅 생성 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
