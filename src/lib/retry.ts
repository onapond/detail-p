/**
 * 지수 백오프 재시도 유틸리티
 * Rate limit 에러에 대해서만 재시도, 기타 에러는 즉시 throw
 */

interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
}

function isRateLimitError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (message.includes('rate limit') || message.includes('429') || message.includes('too many requests')) {
      return true;
    }
  }

  // Anthropic SDK 에러 체크
  if (typeof error === 'object' && error !== null && 'status' in error) {
    return (error as { status: number }).status === 429;
  }

  return false;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { maxRetries = 2, baseDelayMs = 1000, maxDelayMs = 10000 } = options;

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Rate limit 에러가 아니면 즉시 throw
      if (!isRateLimitError(error)) {
        throw error;
      }

      // 마지막 시도였으면 throw
      if (attempt === maxRetries) {
        throw error;
      }

      // 지수 백오프 대기
      const delay = Math.min(baseDelayMs * Math.pow(2, attempt), maxDelayMs);
      const jitter = delay * (0.5 + Math.random() * 0.5);
      console.log(`[Retry] Rate limit hit, retrying in ${Math.round(jitter)}ms (attempt ${attempt + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, jitter));
    }
  }

  throw lastError;
}
