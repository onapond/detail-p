import { NextResponse } from 'next/server';
import { analyzeMultipleImages } from '@/lib/claude/analysis';
import { createVisionStreamingResponse, SSE_HEADERS } from '@/lib/claude/streaming';
import { PRODUCT_ANALYSIS_PROMPT } from '@/lib/claude/prompts';
import { getAuthUser } from '@/lib/supabase/auth';
import type { ApiResponse, ProductAnalysis } from '@/types';

export const maxDuration = 60;

const MAX_IMAGES = 10;
const MAX_BASE64_LENGTH = 15_000_000;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

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
    const { images, stream: useStreaming } = body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: '이미지가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    if (images.length > MAX_IMAGES) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: `이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있습니다.` },
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

      if (!ALLOWED_MIME_TYPES.includes(img.mimeType)) {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: `지원하지 않는 이미지 형식입니다. (허용: ${ALLOWED_MIME_TYPES.join(', ')})` },
          { status: 400 }
        );
      }

      if (img.base64.length > MAX_BASE64_LENGTH) {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: '이미지 크기가 너무 큽니다. 이미지당 최대 10MB까지 업로드할 수 있습니다.' },
          { status: 400 }
        );
      }
    }

    // Streaming mode
    if (useStreaming) {
      const textPrompt = images.length > 1
        ? `다음 ${images.length}개의 제품 이미지를 종합적으로 분석해주세요.\n\n${PRODUCT_ANALYSIS_PROMPT}`
        : PRODUCT_ANALYSIS_PROMPT;

      const stream = createVisionStreamingResponse(
        images,
        textPrompt,
        { usageEndpoint: '/api/analyze', userId: user.id }
      );

      return new Response(stream, { headers: SSE_HEADERS });
    }

    // Non-streaming mode (backward compatible)
    const result = await analyzeMultipleImages(images, user.id);

    return NextResponse.json<ApiResponse<ProductAnalysis>>({
      success: true,
      data: result.analysis,
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
