/**
 * SSE streaming utilities for Claude API responses (server-side only)
 * Creates ReadableStream from Anthropic stream with usage tracking.
 */

import { createAnthropicClient, CLAUDE_MODEL, MAX_TOKENS, prepareImageForVision } from './client';
import { trackUsage } from '@/lib/usage-tracker';
import type Anthropic from '@anthropic-ai/sdk';
import type { SSEEvent } from './streaming-client';

// Re-export client-safe types for server-side consumers
export type { SSEEvent } from './streaming-client';

/**
 * Create an SSE ReadableStream from a Claude streaming response.
 * Sends partial text tokens as 'text' events and the complete text as 'result' at the end.
 */
export function createStreamingResponse(
  messages: Anthropic.MessageCreateParams['messages'],
  options?: {
    maxTokens?: number;
    usageEndpoint?: string;
    userId?: string;
  }
): ReadableStream {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const client = createAnthropicClient();
        let fullText = '';

        const stream = client.messages.stream({
          model: CLAUDE_MODEL,
          max_tokens: options?.maxTokens || MAX_TOKENS,
          messages,
        });

        stream.on('text', (text) => {
          fullText += text;
          const event: SSEEvent = { type: 'text', data: text };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        });

        const finalMessage = await stream.finalMessage();

        // Track usage
        if (finalMessage.usage && options?.usageEndpoint && options?.userId) {
          await trackUsage(
            options.userId,
            options.usageEndpoint,
            CLAUDE_MODEL,
            finalMessage.usage.input_tokens,
            finalMessage.usage.output_tokens
          );

          const usageEvent: SSEEvent = {
            type: 'usage',
            data: {
              inputTokens: finalMessage.usage.input_tokens,
              outputTokens: finalMessage.usage.output_tokens,
            },
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(usageEvent)}\n\n`));
        }

        // Send complete result
        const resultEvent: SSEEvent = { type: 'result', data: fullText };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(resultEvent)}\n\n`));

        controller.close();
      } catch (error) {
        const errorEvent: SSEEvent = {
          type: 'error',
          data: error instanceof Error ? error.message : '스트리밍 오류가 발생했습니다.',
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorEvent)}\n\n`));
        controller.close();
      }
    },
  });
}

/**
 * Create SSE response with vision (image) input
 */
export function createVisionStreamingResponse(
  images: Array<{ base64: string; mimeType: string }>,
  textPrompt: string,
  options?: {
    maxTokens?: number;
    usageEndpoint?: string;
    userId?: string;
  }
): ReadableStream {
  const imageBlocks = images.map(({ base64, mimeType }) =>
    prepareImageForVision(base64, mimeType)
  );

  const messages: Anthropic.MessageCreateParams['messages'] = [
    {
      role: 'user',
      content: [
        ...imageBlocks,
        { type: 'text', text: textPrompt },
      ],
    },
  ];

  return createStreamingResponse(messages, options);
}

/**
 * SSE Response headers
 */
export const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
} as const;
