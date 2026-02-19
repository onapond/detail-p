# Phase 2 Infrastructure Design Document

## Feature: phase2-infra
## Date: 2026-02-11
## References: [Plan](../../01-plan/features/phase2-infra.plan.md)

---

## 1. Architecture Overview

```
Before:
  middleware.ts → rate-limit.ts (Map<string, number[]>)
  API routes → usage-tracker.ts (globalThis.usageRecords[])

After:
  middleware.ts → rate-limit.ts → Upstash Redis (distributed)
  API routes → usage-tracker.ts → Supabase api_usage table
```

### System Context

```
[Client Browser]
  │
  ▼
[Middleware] ──→ [Upstash Redis] (rate limit check)
  │
  ▼
[API Route] ──→ [Claude API] ──→ [usage-tracker] ──→ [Supabase api_usage]
  │
  ▼
[/api/usage] ──→ [Supabase api_usage] (aggregate query)
```

---

## 2. Database Design

### 2.1 New Table: `api_usage`

```sql
CREATE TABLE api_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  endpoint TEXT NOT NULL,
  model TEXT NOT NULL,
  input_tokens INTEGER NOT NULL DEFAULT 0,
  output_tokens INTEGER NOT NULL DEFAULT 0,
  cost_usd NUMERIC(10, 6) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.2 Indexes

```sql
CREATE INDEX idx_api_usage_user_id ON api_usage(user_id);
CREATE INDEX idx_api_usage_created_at ON api_usage(created_at);
-- Composite index for monthly aggregation queries
CREATE INDEX idx_api_usage_user_month ON api_usage(user_id, created_at DESC);
```

### 2.3 RLS Policies

```sql
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

-- Users can read their own usage
CREATE POLICY "Users can view own usage"
  ON api_usage FOR SELECT
  USING (auth.uid() = user_id);

-- Server-side insert (service role bypasses RLS, or use permissive INSERT)
CREATE POLICY "Authenticated users can insert own usage"
  ON api_usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 2.4 Schema File Update

Append to `src/lib/supabase/schema.sql`:
```sql
-- Phase 2-3 Migration: API Usage Tracking
CREATE TABLE IF NOT EXISTS api_usage ( ... );
-- indexes + RLS as above
```

---

## 3. Module Design: Usage Tracker

### 3.1 File: `src/lib/usage-tracker.ts` (Rewrite)

**Exports** (interface preserved, signatures change to async):

```typescript
// Types (unchanged)
export interface UsageRecord { ... }
export interface UsageSummary { ... }

// Functions (sync → async)
export function calculateCost(model: string, inputTokens: number, outputTokens: number): number;
export async function trackUsage(userId: string, endpoint: string, model: string, inputTokens: number, outputTokens: number): Promise<void>;
export async function getUsageSummary(userId: string, period?: 'day' | 'month' | 'all'): Promise<UsageSummary>;
```

### 3.2 trackUsage() Implementation

```typescript
export async function trackUsage(
  userId: string,
  endpoint: string,
  model: string,
  inputTokens: number,
  outputTokens: number
): Promise<void> {
  const costUsd = calculateCost(model, inputTokens, outputTokens);

  // Fire-and-forget: don't block the generation pipeline
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from('api_usage').insert({
    user_id: userId,
    endpoint,
    model,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    cost_usd: costUsd,
  });

  if (error) {
    console.error('[Usage] Failed to track:', error.message);
    // Don't throw - usage tracking failure should not break generation
  }

  console.log(`[Usage] ${endpoint}: ${inputTokens} in / ${outputTokens} out = $${costUsd.toFixed(4)}`);
}
```

**Key decisions:**
- `userId` parameter added (was missing before)
- Fire-and-forget pattern: log error but don't throw
- `calculateCost()` remains synchronous (pure function)
- `resetUsage()` removed (no admin reset via API)

### 3.3 getUsageSummary() Implementation

```typescript
export async function getUsageSummary(
  userId: string,
  period: 'day' | 'month' | 'all' = 'month'
): Promise<UsageSummary> {
  const supabase = await createServerSupabaseClient();

  // Date filter
  let fromDate: string | undefined;
  const now = new Date();
  if (period === 'day') {
    fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  } else if (period === 'month') {
    fromDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  }

  let query = supabase
    .from('api_usage')
    .select('endpoint, model, input_tokens, output_tokens, cost_usd, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (fromDate) {
    query = query.gte('created_at', fromDate);
  }

  const { data: records, error } = await query;

  if (error) {
    console.error('[Usage] Failed to fetch summary:', error.message);
    return emptyUsageSummary();
  }

  // Aggregate in application layer
  return aggregateRecords(records || []);
}
```

### 3.4 Caller Changes (7 locations)

All callers must pass `userId` and `await` the call:

| File | Line(s) | Change |
|------|---------|--------|
| `src/lib/claude/analysis.ts` | ~62, ~130 | Add userId param, add await |
| `src/lib/claude/copywriting.ts` | ~43, ~86 | Add userId param, add await |
| `src/lib/claude/html-generator.ts` | ~100, ~555 | Add userId param, add await |
| `src/lib/claude/streaming.ts` | ~53 | Add userId param, add await |

**Pattern** (all 7 locations):
```typescript
// Before
trackUsage('/api/analyze', CLAUDE_MODEL, response.usage.input_tokens, response.usage.output_tokens);

// After
await trackUsage(userId, '/api/analyze', CLAUDE_MODEL, response.usage.input_tokens, response.usage.output_tokens);
```

**userId propagation**: Each service function already receives data from the API route where `getAuthUser()` provides the user. The `userId` needs to be threaded through:
- API route → service function params → trackUsage()
- For streaming.ts: userId added to `createAnalysisStream()` / `createCopywritingStream()` params

---

## 4. Module Design: Rate Limiting

### 4.1 File: `src/lib/rate-limit.ts` (Rewrite)

**Exports** (interface changes to async):

```typescript
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
}

export type RateLimitType = 'ai' | 'general';

export async function checkRateLimit(
  identifier: string,
  type: RateLimitType
): Promise<RateLimitResult>;
```

### 4.2 Upstash Implementation

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Lazy initialization with fallback
let aiLimiter: Ratelimit | null = null;
let generalLimiter: Ratelimit | null = null;

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function initLimiters(): boolean {
  const redis = getRedis();
  if (!redis) return false;

  aiLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '60 s'),
    prefix: 'rl:ai',
  });

  generalLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '60 s'),
    prefix: 'rl:gen',
  });

  return true;
}
```

### 4.3 Fallback Strategy

```typescript
// In-memory fallback for local development (when Upstash not configured)
const inMemoryMap = new Map<string, number[]>();

export async function checkRateLimit(
  identifier: string,
  type: RateLimitType
): Promise<RateLimitResult> {
  // Try Upstash first
  if (aiLimiter || initLimiters()) {
    const limiter = type === 'ai' ? aiLimiter! : generalLimiter!;
    const result = await limiter.limit(identifier);
    return {
      allowed: result.success,
      remaining: result.remaining,
      resetMs: Math.max(0, result.reset - Date.now()),
    };
  }

  // Fallback: in-memory (development only)
  return checkInMemoryRateLimit(identifier, type);
}
```

### 4.4 Middleware Changes

**File**: `src/middleware.ts`

```typescript
// Before (sync)
const result = checkRateLimit(rateLimitKey, config);

// After (async, simplified)
const rateLimitId = user?.id || getClientIp(request);
const rateLimitType: RateLimitType = isAiEndpoint ? 'ai' : 'general';
const result = await checkRateLimit(rateLimitId, rateLimitType);
```

**Removals from middleware.ts:**
- `AI_RATE_LIMIT` config constant (moved into rate-limit.ts)
- `DEFAULT_RATE_LIMIT` config constant (moved into rate-limit.ts)
- `RateLimitConfig` import (no longer needed)

---

## 5. API Route Design

### 5.1 `/api/usage` (GET) — Updated

```typescript
export async function GET() {
  const user = await getAuthUser();
  if (!user) return 401;

  const period = /* from searchParams */ 'month';
  const summary = await getUsageSummary(user.id, period);

  return { success: true, data: summary };
}
```

**Response shape** (unchanged):
```json
{
  "success": true,
  "data": {
    "totalCalls": 15,
    "totalInputTokens": 45000,
    "totalOutputTokens": 12000,
    "totalCostUsd": 0.2340,
    "totalCostKrw": 315.9,
    "byEndpoint": { "/api/analyze": { "calls": 5, ... } },
    "recentCalls": [...]
  }
}
```

### 5.2 `/api/usage` (DELETE) — Removed

The DELETE endpoint is removed entirely. Usage data is immutable audit log.

---

## 6. Environment Variables

### 6.1 New Variables

```env
# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxxxx...
```

### 6.2 `.env.example` Update

Append:
```env
# Rate Limiting (Upstash Redis) - Optional for local dev
# UPSTASH_REDIS_REST_URL=
# UPSTASH_REDIS_REST_TOKEN=
```

---

## 7. File Change Summary

| File | Action | Size |
|------|--------|------|
| `src/lib/supabase/schema.sql` | APPEND | +20 lines (table + indexes + RLS) |
| `src/lib/usage-tracker.ts` | REWRITE | 154 → ~120 lines |
| `src/lib/rate-limit.ts` | REWRITE | 69 → ~80 lines |
| `src/middleware.ts` | MODIFY | Remove config constants, async checkRateLimit |
| `src/app/api/usage/route.ts` | MODIFY | Use getUsageSummary(userId), remove DELETE |
| `src/lib/claude/analysis.ts` | MODIFY | 2 trackUsage calls: add userId + await |
| `src/lib/claude/copywriting.ts` | MODIFY | 2 trackUsage calls: add userId + await |
| `src/lib/claude/html-generator.ts` | MODIFY | 2 trackUsage calls: add userId + await |
| `src/lib/claude/streaming.ts` | MODIFY | 1 trackUsage call: add userId + await |
| `.env.example` | APPEND | +3 lines |
| `package.json` | MODIFY | +2 deps (@upstash/ratelimit, @upstash/redis) |

**Total**: 11 files, ~2 rewrites + 9 modifications

---

## 8. Implementation Order

```
Step 1: Schema (schema.sql)                    [S] - No code dependency
Step 2: Install packages                        [S] - npm install
Step 3: usage-tracker.ts rewrite               [M] - Core change
Step 4: Caller updates (7 files)               [M] - Propagate userId + await
Step 5: /api/usage route update                [S] - Remove DELETE, use new summary
Step 6: rate-limit.ts rewrite                  [M] - Core change
Step 7: middleware.ts update                   [S] - Use new async API
Step 8: .env.example update                    [S] - Documentation
Step 9: Build verification                     [S] - npx next build
```

---

## 9. Testing Checklist

- [ ] `npx next build` passes with 0 TypeScript errors
- [ ] Without Upstash env vars: rate limiting falls back to in-memory (no crash)
- [ ] With Upstash env vars: Redis rate limit creates keys correctly
- [ ] trackUsage() inserts row into api_usage table
- [ ] trackUsage() failure does not break generation pipeline
- [ ] GET /api/usage returns current user's monthly summary
- [ ] GET /api/usage does not return other users' data (RLS)
- [ ] DELETE /api/usage returns 404 or 405

---

*Created: 2026-02-11*
*Plan reference: docs/01-plan/features/phase2-infra.plan.md*
