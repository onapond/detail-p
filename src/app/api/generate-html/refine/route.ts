import { NextResponse } from 'next/server';
import { refineHTML } from '@/lib/claude/html-generator';
import type { ApiResponse } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { html, feedback } = body as {
      html: string;
      feedback: string;
    };

    if (!html) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: 'HTML 데이터가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    if (!feedback || feedback.trim().length === 0) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: '수정 피드백을 입력해주세요.' },
        { status: 400 }
      );
    }

    const refined = await refineHTML(html, feedback);

    return NextResponse.json<ApiResponse<string>>({
      success: true,
      data: refined,
    });
  } catch (error) {
    console.error('HTML refine error:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'HTML 수정 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
