/**
 * Client-safe SSE streaming utilities.
 * This file has NO server-side imports and is safe to use in client components.
 */

// SSE event types
export type SSEEvent =
  | { type: 'text'; data: string }          // Partial text token
  | { type: 'result'; data: string }         // Final JSON result
  | { type: 'error'; data: string }          // Error message
  | { type: 'usage'; data: { inputTokens: number; outputTokens: number } };

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
