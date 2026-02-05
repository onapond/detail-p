import { createAnthropicClient, CLAUDE_MODEL, MAX_TOKENS, prepareImageForVision } from './client';
import { PRODUCT_ANALYSIS_PROMPT } from './prompts';
import type { ProductAnalysis } from '@/types';

export async function analyzeProductImage(
  imageBase64: string,
  mimeType: string
): Promise<ProductAnalysis> {
  const client = createAnthropicClient();

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: MAX_TOKENS,
    messages: [
      {
        role: 'user',
        content: [
          prepareImageForVision(imageBase64, mimeType),
          {
            type: 'text',
            text: PRODUCT_ANALYSIS_PROMPT,
          },
        ],
      },
    ],
  });

  // Extract text content from response
  const textContent = response.content.find((block) => block.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  // Parse JSON from response
  const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from response');
  }

  const analysis: ProductAnalysis = JSON.parse(jsonMatch[0]);
  return analysis;
}

export async function analyzeMultipleImages(
  images: Array<{ base64: string; mimeType: string }>
): Promise<ProductAnalysis> {
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

  const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from response');
  }

  const analysis: ProductAnalysis = JSON.parse(jsonMatch[0]);
  return analysis;
}
