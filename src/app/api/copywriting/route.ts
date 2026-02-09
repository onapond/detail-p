import { NextResponse } from 'next/server';
import { generateCopywriting } from '@/lib/claude/copywriting';
import { createStreamingResponse, SSE_HEADERS } from '@/lib/claude/streaming';
import { COPYWRITING_PROMPT, CATEGORY_PROMPTS } from '@/lib/claude/prompts';
import type { ApiResponse, CopywritingResult, ProductAnalysis } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { analysis, stream: useStreaming } = body as {
      analysis: ProductAnalysis;
      stream?: boolean;
    };

    if (!analysis) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: '제품 분석 데이터가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    // Streaming mode
    if (useStreaming) {
      const categoryPrompt = CATEGORY_PROMPTS[analysis.category] || '';
      const prompt = COPYWRITING_PROMPT.replace(
        '{ANALYSIS_DATA}',
        JSON.stringify(analysis, null, 2)
      ).replace(
        '{STYLE}',
        analysis.suggestedStyle || 'modern'
      ) + categoryPrompt;

      const stream = createStreamingResponse(
        [{ role: 'user', content: prompt }],
        { usageEndpoint: '/api/copywriting' }
      );

      return new Response(stream, { headers: SSE_HEADERS });
    }

    // Non-streaming mode (backward compatible)
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
