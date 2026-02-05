import { createAnthropicClient, CLAUDE_MODEL, MAX_TOKENS } from './client';
import { COPYWRITING_PROMPT, CATEGORY_PROMPTS } from './prompts';
import { trackUsage } from '@/lib/usage-tracker';
import type { ProductAnalysis, CopywritingResult } from '@/types';

export async function generateCopywriting(
  analysis: ProductAnalysis
): Promise<CopywritingResult> {
  const client = createAnthropicClient();

  // Get category-specific prompt additions
  const categoryPrompt = CATEGORY_PROMPTS[analysis.category] || '';

  // Replace placeholder with actual analysis data
  const prompt = COPYWRITING_PROMPT.replace(
    '{ANALYSIS_DATA}',
    JSON.stringify(analysis, null, 2)
  ) + categoryPrompt;

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: MAX_TOKENS,
    messages: [
      {
        role: 'user',
        content: prompt,
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

  const copywriting: CopywritingResult = JSON.parse(jsonMatch[0]);

  // Track usage
  if (response.usage) {
    trackUsage('/api/copywriting', CLAUDE_MODEL, response.usage.input_tokens, response.usage.output_tokens);
  }

  return copywriting;
}

export async function refineCopywriting(
  copywriting: CopywritingResult,
  feedback: string
): Promise<CopywritingResult> {
  const client = createAnthropicClient();

  const prompt = `다음은 현재 작성된 마케팅 카피입니다:

${JSON.stringify(copywriting, null, 2)}

사용자 피드백:
${feedback}

피드백을 반영하여 카피를 수정해주세요.
동일한 JSON 형식으로 응답해주세요.`;

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: MAX_TOKENS,
    messages: [
      {
        role: 'user',
        content: prompt,
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

  const refinedCopywriting: CopywritingResult = JSON.parse(jsonMatch[0]);

  // Track usage
  if (response.usage) {
    trackUsage('/api/copywriting/refine', CLAUDE_MODEL, response.usage.input_tokens, response.usage.output_tokens);
  }

  return refinedCopywriting;
}
