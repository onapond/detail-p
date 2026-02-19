/**
 * Distributed rate limiting with Upstash Redis.
 * Falls back to in-memory sliding window when Upstash env vars are not set.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
}

export type RateLimitType = 'ai' | 'general';

// Rate limit configs
const RATE_LIMITS = {
  ai: { maxRequests: 5, windowMs: 60_000 },       // 5 req / 60s
  general: { maxRequests: 30, windowMs: 60_000 },  // 30 req / 60s
} as const;

// --- Upstash Redis limiters (lazy init) ---
let aiLimiter: Ratelimit | null = null;
let generalLimiter: Ratelimit | null = null;
let upstashInitialized = false;

function initUpstash(): boolean {
  if (upstashInitialized) return aiLimiter !== null;

  upstashInitialized = true;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false;

  try {
    const redis = new Redis({ url, token });

    aiLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_LIMITS.ai.maxRequests, '60 s'),
      prefix: 'rl:ai',
    });

    generalLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_LIMITS.general.maxRequests, '60 s'),
      prefix: 'rl:gen',
    });

    return true;
  } catch (err) {
    console.error('[RateLimit] Failed to initialize Upstash:', err);
    return false;
  }
}

// --- In-memory fallback (development) ---
const inMemoryMap = new Map<string, number[]>();
const CLEANUP_INTERVAL_MS = 60_000;
let lastCleanup = Date.now();

function cleanupInMemory(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, timestamps] of inMemoryMap.entries()) {
    const valid = timestamps.filter(t => now - t < 60_000);
    if (valid.length === 0) {
      inMemoryMap.delete(key);
    } else {
      inMemoryMap.set(key, valid);
    }
  }
}

function checkInMemoryRateLimit(
  identifier: string,
  type: RateLimitType
): RateLimitResult {
  const now = Date.now();
  cleanupInMemory();

  const config = RATE_LIMITS[type];
  const key = `${type}:${identifier}`;
  const timestamps = inMemoryMap.get(key) || [];
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
  inMemoryMap.set(key, recentRequests);

  return {
    allowed: true,
    remaining: config.maxRequests - recentRequests.length,
    resetMs: config.windowMs,
  };
}

// --- Public API ---

export async function checkRateLimit(
  identifier: string,
  type: RateLimitType
): Promise<RateLimitResult> {
  // Try Upstash first
  if (initUpstash()) {
    try {
      const limiter = type === 'ai' ? aiLimiter! : generalLimiter!;
      const result = await limiter.limit(identifier);
      return {
        allowed: result.success,
        remaining: result.remaining,
        resetMs: Math.max(0, result.reset - Date.now()),
      };
    } catch (err) {
      console.error('[RateLimit] Upstash error, falling back to in-memory:', err);
    }
  }

  // Fallback: in-memory (development or Upstash failure)
  return checkInMemoryRateLimit(identifier, type);
}
