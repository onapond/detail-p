import { NextResponse } from 'next/server';
import { refineCopywriting } from '@/lib/claude/copywriting';
import { getAuthUser } from '@/lib/supabase/auth';
import type { ApiResponse, CopywritingResult } from '@/types';

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
    const { copywriting, feedback } = body as {
      copywriting: CopywritingResult;
      feedback: string;
    };

    if (!copywriting) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: '카피라이팅 데이터가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    if (!feedback || feedback.trim().length === 0) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: '수정 피드백을 입력해주세요.' },
        { status: 400 }
      );
    }

    const refined = await refineCopywriting(copywriting, feedback, user.id);

    return NextResponse.json<ApiResponse<CopywritingResult>>({
      success: true,
      data: refined,
    });
  } catch (error) {
    console.error('Copywriting refine error:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : '카피 수정 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
