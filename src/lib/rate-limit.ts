/**
 * 인메모리 IP 기반 슬라이딩 윈도우 레이트 리미터.
 * 프로덕션 환경에서는 Redis 기반(예: @upstash/ratelimit)으로 교체를 권장합니다.
 */

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
}

// IP별 요청 타임스탬프 저장
const requestMap = new Map<string, number[]>();

// 오래된 엔트리를 주기적으로 정리 (메모리 누수 방지)
const CLEANUP_INTERVAL_MS = 60_000;
let lastCleanup = Date.now();

function cleanup(windowMs: number): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [ip, timestamps] of requestMap.entries()) {
    const valid = timestamps.filter(t => now - t < windowMs);
    if (valid.length === 0) {
      requestMap.delete(ip);
    } else {
      requestMap.set(ip, valid);
    }
  }
}

export function checkRateLimit(
  ip: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  cleanup(config.windowMs);

  const timestamps = requestMap.get(ip) || [];
  const windowStart = now - config.windowMs;
  const recentRequests = timestamps.filter(t => t > windowStart);

  if (recentRequests.length >= config.maxRequests) {
    const oldestInWindow = recentRequests[0];
    const resetMs = oldestInWindow + config.windowMs - now;
    return {
      allowed: false,
      remaining: 0,
      resetMs: Math.max(0, resetMs),
    };
  }

  recentRequests.push(now);
  requestMap.set(ip, recentRequests);

  return {
    allowed: true,
    remaining: config.maxRequests - recentRequests.length,
    resetMs: config.windowMs,
  };
}
