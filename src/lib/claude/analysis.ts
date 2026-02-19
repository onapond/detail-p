import { createAnthropicClient, CLAUDE_MODEL, MAX_TOKENS, prepareImageForVision } from './client';
import { PRODUCT_ANALYSIS_PROMPT } from './prompts';
import { extractJson } from './json-parser';
import { withRetry } from '@/lib/retry';
import { getAnalysisCache, hashString } from '@/lib/cache';
import { trackUsage } from '@/lib/usage-tracker';
import type { ProductAnalysis } from '@/types';

export interface AnalysisResult {
  analysis: ProductAnalysis;
  usage?: { inputTokens: number; outputTokens: number };
  cached?: boolean;
}

export async function analyzeMultipleImages(
  images: Array<{ base64: string; mimeType: string }>,
  userId: string
): Promise<AnalysisResult> {
  // 다중 이미지 캐시 키 생성
  const combinedKey = images.map(img => img.base64.substring(0, 500)).join('|');
  const cacheKey = await hashString(combinedKey);
  const cache = getAnalysisCache();
  const cached = cache.get(cacheKey);
  if (cached) {
    return { analysis: cached as ProductAnalysis, cached: true };
  }

  const result = await withRetry(async () => {
    const client = createAnthropicClient();

    const imageBlocks = images.map(({ base64, mimeType }) =>
      prepareImageForVision(base64, mimeType)
    );

    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: MAX_TOKENS,
      messages: [
        {
          role: 'user',
          content: [
            ...imageBlocks,
            {
              type: 'text',
              text: `다음 ${images.length}개의 제품 이미지를 종합적으로 분석해주세요.\n\n${PRODUCT_ANALYSIS_PROMPT}`,
            },
          ],
        },
      ],
    });

    const textContent = response.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    const analysis = extractJson<ProductAnalysis>(textContent.text);

    // 카테고리 유효성 검증
    const validCategories = ['coffee', 'health_supplement', 'processed_food', 'beverage'];
    if (!validCategories.includes(analysis.category)) {
      analysis.category = 'processed_food';
    }

    if (response.usage) {
      await trackUsage(userId, '/api/analyze', CLAUDE_MODEL, response.usage.input_tokens, response.usage.output_tokens);
    }

    return {
      analysis,
      usage: response.usage ? {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      } : undefined,
    };
  });

  cache.set(cacheKey, result.analysis);

  return result;
}
