/**
 * SSE streaming utilities for Claude API responses
 * Server: creates ReadableStream from Anthropic stream
 * Client: reads SSE events from fetch response
 */

import { createAnthropicClient, CLAUDE_MODEL, MAX_TOKENS, prepareImageForVision } from './client';
import { trackUsage } from '@/lib/usage-tracker';
import type Anthropic from '@anthropic-ai/sdk';

// SSE event types
export type SSEEvent =
  | { type: 'text'; data: string }          // Partial text token
  | { type: 'result'; data: string }         // Final JSON result
  | { type: 'error'; data: string }          // Error message
  | { type: 'usage'; data: { inputTokens: number; outputTokens: number } };

/**
 * Create an SSE ReadableStream from a Claude streaming response.
 * Sends partial text tokens as 'text' events and the complete text as 'result' at the end.
 */
export function createStreamingResponse(
  messages: Anthropic.MessageCreateParams['messages'],
  options?: {
    maxTokens?: number;
    usageEndpoint?: string;
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
        if (finalMessage.usage && options?.usageEndpoint) {
          trackUsage(
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

/**
 * Client-side: Read SSE events from a fetch response
 */
export async function readSSEStream(
  response: Response,
  callbacks: {
    onText?: (text: string) => void;
    onResult?: (result: string) => void;
    onError?: (error: string) => void;
    onUsage?: (usage: { inputTokens: number; outputTokens: number }) => void;
  }
): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';
  let fullResult = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Process complete SSE events
    const lines = buffer.split('\n\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;

      try {
        const event: SSEEvent = JSON.parse(line.slice(6));
        switch (event.type) {
          case 'text':
            callbacks.onText?.(event.data);
            break;
          case 'result':
            fullResult = event.data;
            callbacks.onResult?.(event.data);
            break;
          case 'error':
            callbacks.onError?.(event.data);
            break;
          case 'usage':
            callbacks.onUsage?.(event.data as { inputTokens: number; outputTokens: number });
            break;
        }
      } catch {
        // Skip malformed events
      }
    }
  }

  return fullResult;
}
