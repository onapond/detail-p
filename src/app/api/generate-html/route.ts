import { NextResponse } from 'next/server';
import { generateDetailPageHTML } from '@/lib/claude/html-generator';
import { getAuthUser } from '@/lib/supabase/auth';
import type { ApiResponse, ProductAnalysis, CopywritingResult, Template } from '@/types';

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { analysis, copywriting, imageCount, template } = body as {
      analysis: ProductAnalysis;
      copywriting: CopywritingResult;
      imageCount: number;
      template: Template;
    };

    if (!analysis || !copywriting || !template) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: '필수 데이터가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    const html = await generateDetailPageHTML(analysis, copywriting, imageCount || 0, template, user.id);

    return NextResponse.json<ApiResponse<string>>({
      success: true,
      data: html,
    });
  } catch (error) {
    console.error('HTML generation error:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'HTML 생성 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
