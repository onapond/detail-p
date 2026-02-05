import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
export function createAnthropicClient() {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  });
}

// Model configuration
export const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
export const MAX_TOKENS = 4096;

// Helper to convert base64 image for Claude Vision
export function prepareImageForVision(base64Data: string, mimeType: string): Anthropic.ImageBlockParam {
  return {
    type: 'image',
    source: {
      type: 'base64',
      media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
      data: base64Data,
    },
  };
}
