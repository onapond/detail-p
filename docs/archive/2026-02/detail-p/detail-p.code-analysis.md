# Code Analysis Results - Detail_P

## Analysis Target
- **Path**: `C:\dev\detail_p\detail-p\src\`
- **File count**: 30+ source files analyzed
- **Analysis date**: 2026-02-11
- **Analyzer**: bkit-code-analyzer (claude-opus-4-6)
- **Scope**: Security, Code Quality, Performance, Architecture

---

## Quality Score: 72 / 100

| Category        | Score | Weight | Weighted |
|-----------------|-------|--------|----------|
| Security        | 65    | 30%    | 19.5     |
| Code Quality    | 78    | 25%    | 19.5     |
| Performance     | 72    | 20%    | 14.4     |
| Architecture    | 80    | 15%    | 12.0     |
| Maintainability | 68    | 10%    | 6.8      |
| **Total**       |       |        | **72.2** |

---

## Issues Found

### CRITICAL - Immediate Fix Required

| # | File | Line | Issue | Category |
|---|------|------|-------|----------|
| C-1 | `src/app/api/projects/route.ts` | 4, 44 | **Server-side import of `'use client'` module** | Architecture / Runtime |
| C-2 | `src/app/api/analyze/route.ts` | 17-35 | **No request body size limit for base64 image payloads** | Security / DoS |
| C-3 | `src/components/auth/AuthProvider.tsx` | 50 | **`getSession()` used instead of `getUser()` for auth initialization** | Security / Auth |
| C-4 | `src/app/api/projects/route.ts` | 37 | **Unbounded `Buffer.from()` on user-supplied base64 data** | Security / DoS |

#### C-1: Server-side import of `'use client'` module

**File**: `src/app/api/projects/route.ts:4`
```typescript
import { uploadProductImages } from '@/lib/supabase/client';
```

`src/lib/supabase/client.ts` starts with `'use client'` and imports `createBrowserClient` from `@supabase/ssr`. This file is imported in a server-side API route (`src/app/api/projects/route.ts`). While Next.js may not always error on this at build time, `createBrowserClient()` inside `uploadProductImages` creates a browser-oriented Supabase client on the server. This is architecturally wrong -- the browser client relies on browser cookie handling that does not exist in the API route context. The upload may silently fail or use unauthenticated access.

**Recommended Action**: Create a server-side `uploadProductImages` function in `src/lib/supabase/server.ts` (or a new `server-storage.ts`) that uses `createServerSupabaseClient()` for storage operations.

---

#### C-2: No request body size limit for base64 image payloads

**File**: `src/app/api/analyze/route.ts:17-35`
```typescript
const body = await request.json();
const { images } = body;
```

The `/api/analyze` endpoint accepts an array of base64-encoded images with no size limit. A malicious user could send a payload with many large images (each base64 image is ~33% larger than the binary), potentially causing out-of-memory conditions. The same issue exists in `/api/projects` (POST) at line 18.

**Recommended Action**:
- Add `bodyParser` config to limit request size (Next.js `export const config = { api: { bodyParser: { sizeLimit: '20mb' } } }` or equivalent for App Router).
- Validate `images.length` with an upper bound (e.g., max 10).
- Validate individual image base64 string length.

---

#### C-3: `getSession()` used instead of `getUser()` for auth initialization

**File**: `src/components/auth/AuthProvider.tsx:50`
```typescript
const { data: { session: currentSession } } = await supabase.auth.getSession();
```

Per Supabase documentation, `getSession()` reads from local storage and does NOT validate the JWT with the Supabase Auth server. A user could modify their local storage JWT claims. The `getUser()` method should be used for server-validated auth. While `onAuthStateChange` provides subsequent updates, the initial check is vulnerable.

**Recommended Action**: Replace with `supabase.auth.getUser()` for the initial auth check, or use `getSession()` only for display purposes while ensuring all security-critical operations go through server-side `getAuthUser()` (which correctly uses `getUser()`).

---

#### C-4: Unbounded `Buffer.from()` on user-supplied base64 data

**File**: `src/app/api/projects/route.ts:37`
```typescript
const binary = Buffer.from(img.base64, 'base64');
```

Each image's base64 string is decoded into a `Buffer` without any size validation. Combined with C-2, an attacker could force the server to allocate very large buffers. If multiple large images are submitted, this creates a multiplicative memory allocation problem.

**Recommended Action**: Validate `img.base64.length` before `Buffer.from()`. A 10MB image produces ~13.3MB of base64 text. Set a maximum per-image size (e.g., 15MB base64 = ~10MB binary).

---

### MAJOR - Fix Recommended Before Production

| # | File | Line | Issue | Category |
|---|------|------|-------|----------|
| M-1 | `src/lib/rate-limit.ts` | All | **In-memory rate limiter resets on server restart / per-instance** | Security |
| M-2 | `src/hooks/useGeneration.ts` | 41-89 | **Duplicate `readSSEStream` implementation** | Code Quality / DRY |
| M-3 | `src/lib/claude/analysis.ts` | 15-78, 80-145 | **Near-identical duplicate functions** | Code Quality / DRY |
| M-4 | `src/lib/usage-tracker.ts` | All | **In-memory usage tracking lost on restart** | Reliability |
| M-5 | `src/lib/claude/prompts.ts` | 303-337 | **Dead code: `HTML_GENERATION_PROMPT` is never used** | Code Quality |
| M-6 | `src/lib/templates/html-templates.ts` | All | **Dead code: 1826-line file with no imports** | Code Quality |
| M-7 | `src/lib/claude/analysis.ts` | 55, 124 | **`validCategories` array duplicated 3 times across codebase** | Code Quality / DRY |
| M-8 | `src/app/api/projects/[id]/route.ts` | 17, 53, 87 | **Redundant `getProjectById` calls for ownership check** | Performance |
| M-9 | `src/lib/supabase/projects.ts` | 40-57 | **N+1 query pattern in `getProjectById`** | Performance |
| M-10 | `src/app/api/analyze/route.ts` | 28-35 | **No mimeType validation against allowed types** | Security |

#### M-1: In-memory rate limiter resets on server restart

**File**: `src/lib/rate-limit.ts`

The rate limiter uses a `Map` stored in module scope. In a serverless deployment (Vercel), each function invocation may get a fresh instance, making the rate limit ineffective. Even with persistent instances, a deployment resets all limits.

**Recommended Action**: Replace with a distributed rate limiter (e.g., `@upstash/ratelimit` with Redis). The code already notes this: "Redis 기반으로 교체를 권장합니다."

---

#### M-2: Duplicate `readSSEStream` implementation

**File**: `src/hooks/useGeneration.ts:41-89` vs `src/lib/claude/streaming.ts:127-180`

Two nearly identical `readSSEStream` functions exist. The hook version omits the `onUsage` callback but is otherwise the same logic.

**Recommended Action**: Import and use the shared `readSSEStream` from `src/lib/claude/streaming.ts` in the hook. The `streaming.ts` version already supports optional `onUsage`.

---

#### M-3: Near-identical `analyzeProductImage` and `analyzeMultipleImages`

**File**: `src/lib/claude/analysis.ts:15-78` and `80-145`

These two functions share ~90% of their code. The only differences are: (1) cache key generation, (2) constructing image blocks, and (3) the text prompt wording.

**Recommended Action**: Refactor into a single function that accepts `images: Array<{base64, mimeType}>` (single image = array of one), eliminating ~60 lines of duplication.

---

#### M-7: `validCategories` array duplicated 3 times

**Files**:
- `src/lib/claude/analysis.ts:55`
- `src/lib/claude/analysis.ts:124`
- `src/hooks/useGeneration.ts:173`

The same `['coffee', 'health_supplement', 'processed_food', 'beverage']` array is hardcoded in 3 places.

**Recommended Action**: Extract to `src/types/index.ts` as `export const PRODUCT_CATEGORIES: ProductCategory[] = [...]` or derive from the `ProductCategory` type.

---

#### M-9: N+1 query pattern in `getProjectById`

**File**: `src/lib/supabase/projects.ts:40-57`

```typescript
// Query 1: Get product
const { data: product } = await supabase.from('products').select('*')...
// Query 2: Get page
const { data: page } = await supabase.from('generated_pages').select('*')...
// Query 3: Get images
const { data: images } = await supabase.from('product_images').select('*')...
```

Three sequential queries are made where Supabase's relation joining could combine them into one.

**Recommended Action**: Use Supabase's nested select:
```typescript
const { data } = await supabase
  .from('products')
  .select(`*, generated_pages(*), product_images(*)`)
  .eq('id', projectId)
  .single();
```

---

#### M-8: Redundant `getProjectById` calls in `[id]/route.ts`

**File**: `src/app/api/projects/[id]/route.ts`

The `PUT` and `DELETE` handlers each call `getProjectById(id)` solely to verify ownership. This function itself makes 3 DB queries (see M-9). A simpler ownership check would be a single-column SELECT.

**Recommended Action**: Create a lightweight `verifyProjectOwnership(projectId, userId)` function that does a single `SELECT user_id FROM products WHERE id = $1` query.

---

#### M-10: No mimeType validation against allowed types

**File**: `src/app/api/analyze/route.ts:28-35`

```typescript
if (!img.base64 || !img.mimeType) { ... }
```

The code checks that `mimeType` exists but does not validate it against allowed types (`image/jpeg`, `image/png`, `image/webp`, `image/gif`). The value is passed directly to the Claude API. A malicious value could cause unexpected behavior.

**Recommended Action**: Add validation:
```typescript
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
if (!ALLOWED_MIME.includes(img.mimeType)) { return 400; }
```

---

### MINOR - Improvement Recommended

| # | File | Line | Issue | Category |
|---|------|------|-------|----------|
| m-1 | `src/lib/supabase/client.ts:5-6` | 5-6 | Non-null assertion (`!`) on env vars with no runtime check | Robustness |
| m-2 | `src/lib/supabase/server.ts:4-5` | 4-5 | Same non-null assertion pattern for env vars | Robustness |
| m-3 | `src/lib/supabase/middleware.ts:4-5` | 4-5 | Same non-null assertion pattern for env vars | Robustness |
| m-4 | `src/lib/claude/client.ts:6` | 6 | Same non-null assertion for `ANTHROPIC_API_KEY` | Robustness |
| m-5 | `src/lib/claude/html-generator.ts` | 1-507 | 507-line file exceeds recommended 300-line limit | Code Quality |
| m-6 | `src/hooks/useGeneration.ts` | 1-519 | 519-line file exceeds recommended 300-line limit | Code Quality |
| m-7 | `src/lib/cache.ts:20` | 20 | Cache key from first 1000 chars of base64 may collide | Correctness |
| m-8 | `src/app/api/usage/route.ts:39` | 39 | `DELETE /api/usage` can reset all usage data without admin check | Security |
| m-9 | `src/lib/usage-tracker.ts:67` | 67 | Hardcoded `USD_TO_KRW = 1350` exchange rate | Maintainability |
| m-10 | `src/hooks/useGeneration.ts:128` | 128 | `img.preview.split(',')[1]` may fail if preview is not a data URL | Robustness |
| m-11 | `src/lib/claude/html-generator.ts:240-242` | 240 | No-op regex replacement that replaces placeholder with itself | Code Quality |
| m-12 | `src/components/auth/AuthProvider.tsx:30` | 30 | `createBrowserSupabaseClient()` called on every render (not memoized) | Performance |
| m-13 | `src/app/api/projects/[id]/route.ts:54` | 54 | PUT returns 404 for both "not found" and "not owned" cases | Security / Obfuscation |
| m-14 | Multiple API routes | - | Error messages expose `error.message` which may leak internal details | Security |

#### m-1 through m-4: Non-null assertions on environment variables

**Files**: `client.ts:5-6`, `server.ts:4-5`, `middleware.ts:4-5`, `claude/client.ts:6`

```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
```

The `!` assertion silently produces `undefined` at runtime if the env var is missing, leading to cryptic errors later.

**Recommended Action**: Add a startup validation module (e.g., `src/lib/env.ts`) that throws clear errors at application start if required env vars are missing. Consider using `zod` for env validation:
```typescript
import { z } from 'zod';
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1),
});
export const env = envSchema.parse(process.env);
```

---

#### m-7: Cache key collision risk

**File**: `src/lib/cache.ts:20` and `src/lib/claude/analysis.ts:20`

```typescript
const cacheKey = await hashString(imageBase64.substring(0, 1000) + mimeType);
```

Only the first 1000 characters of the base64 string are used for the cache key. Two different images with the same header bytes (e.g., same camera, similar subject) could produce the same first 1000 base64 characters, leading to cache collisions.

**Recommended Action**: Use the full base64 string for hashing, or use a larger substring (e.g., 10000 chars), or hash in chunks using streaming hash.

---

#### m-11: No-op regex replacement for images

**File**: `src/lib/claude/html-generator.ts:240-242`
```typescript
for (let i = 1; i <= Math.max(imageCount, 3); i++) {
    html = html.replace(new RegExp(`\\{\\{IMAGE_${i}\\}\\}`, 'g'), `{{IMAGE_${i}}}`);
}
```

This replaces `{{IMAGE_N}}` with `{{IMAGE_N}}` -- the exact same string. This is a no-op that wastes CPU cycles on regex execution.

**Recommended Action**: Remove this loop entirely or add a comment explaining the intended purpose.

---

#### m-12: Supabase client recreated on every render

**File**: `src/components/auth/AuthProvider.tsx:30`
```typescript
const supabase = createBrowserSupabaseClient();
```

This is called inside the component body (outside useMemo/useRef), creating a new Supabase client instance on every render cycle.

**Recommended Action**: Memoize with `useMemo` or use a module-level singleton:
```typescript
const supabase = useMemo(() => createBrowserSupabaseClient(), []);
```

---

### INFO - Reference

| # | Observation | Assessment |
|---|-------------|------------|
| I-1 | XSS protection in HTML generator via `escapeHtml()` | Good -- consistently applied to all user/AI-generated content |
| I-2 | Authentication: defense-in-depth (middleware + route handler) | Good -- double auth check pattern |
| I-3 | RLS policies on all Supabase tables | Good -- server-side authorization |
| I-4 | Ownership check in `[id]` routes beyond RLS | Good -- explicit ownership verification |
| I-5 | SSE streaming implementation | Good -- proper encoder/decoder, buffer management |
| I-6 | Retry with exponential backoff + jitter | Good -- only retries rate-limit errors |
| I-7 | Image resize before upload (1024x1024, JPEG 0.8) | Good -- reduces Claude API token usage |
| I-8 | Soft delete pattern for products | Good -- data recovery possible |
| I-9 | `.gitignore` covers `.env*` files | Good -- secrets not tracked |
| I-10 | `.env.example` exists with placeholder values | Good -- team onboarding |
| I-11 | No `dangerouslySetInnerHTML` or `innerHTML` in React components | Good -- no client-side XSS vectors |
| I-12 | No `localStorage`/`sessionStorage` for sensitive data | Good -- uses httpOnly cookies via Supabase |
| I-13 | JSON parser 3-stage extraction is robust | Good -- handles varied Claude response formats |
| I-14 | TypeScript strict mode with well-defined types | Good -- 0 TS errors at build time |
| I-15 | `schema.sql` category CHECK constraint includes 'other' but app types only allow 4 | Minor inconsistency -- could cause issues if DB allows 'other' |

---

## Architecture Compliance

### Clean Architecture Dependency Direction

```
Presentation (pages, components, hooks)
    |
    v
Application (API routes)
    |
    v
Domain (types, prompts, templates)
    |
    v
Infrastructure (supabase, claude client, cache)
```

| Check | Status | Notes |
|-------|--------|-------|
| Presentation does not directly access Infrastructure | PASS (with exception) | Hooks call API routes, not DB directly |
| API routes use service functions | PASS | Routes delegate to `analysis.ts`, `projects.ts`, etc. |
| Domain types are independent | PASS | `src/types/index.ts` has no infrastructure imports |
| Infrastructure depends only on Domain | PASS | `projects.ts` imports from `@/types` |
| **Exception**: `client.ts` ('use client') imported in API route | FAIL | C-1 above -- violates layering |

### API Consistency

| Check | Status | Notes |
|-------|--------|-------|
| Consistent response format `{success, data?, error?}` | PASS | All routes use `ApiResponse<T>` |
| HTTP methods match semantics | PASS | GET=read, POST=create, PUT=update, DELETE=delete |
| Status codes consistent | PASS | 400, 401, 403, 404, 429, 500 used appropriately |
| Rate limiting applied | PARTIAL | Applied in middleware but in-memory only (M-1) |
| Input validation on all endpoints | PARTIAL | Basic null checks present; no schema validation |

---

## Duplicate Code Analysis

### Exact/Near Duplicates Found

| Type | Location 1 | Location 2 | Similarity | Recommended Action |
|------|-----------|-----------|------------|-------------------|
| Structural | `analysis.ts:15-78` (`analyzeProductImage`) | `analysis.ts:80-145` (`analyzeMultipleImages`) | ~90% | Merge into single function |
| Exact | `useGeneration.ts:41-89` (`readSSEStream`) | `streaming.ts:127-180` (`readSSEStream`) | ~85% | Import shared version |
| Exact | `analysis.ts:55` | `analysis.ts:124` and `useGeneration.ts:173` | 100% | Extract `VALID_CATEGORIES` constant |
| Structural | Auth check boilerplate in all 9 API route handlers | - | 100% pattern | Consider middleware or wrapper function |
| Structural | Error handling pattern in all API routes | - | ~95% | Extract `withErrorHandler` HOF |

### Dead Code

| File | Size | Imported By | Action |
|------|------|-------------|--------|
| `src/lib/templates/html-templates.ts` | ~1826 lines | None | DELETE -- confirmed zero imports |
| `src/lib/claude/prompts.ts:303-337` (`HTML_GENERATION_PROMPT`) | 35 lines | None | DELETE -- unused prompt constant |

---

## Extensibility Analysis

### Hardcoding Found

| File | Line | Code | Suggestion |
|------|------|------|------------|
| `src/lib/usage-tracker.ts:67` | 67 | `USD_TO_KRW = 1350` | Move to env variable or fetch from API |
| `src/lib/cache.ts:12` | 12 | `DEFAULT_TTL_MS = 30 * 60 * 1000` | Move to config |
| `src/lib/cache.ts:13` | 13 | `DEFAULT_MAX_SIZE = 100` | Move to config |
| `src/hooks/useImageUpload.ts:6-8` | 6-8 | `MAX_FILE_SIZE = 10MB`, `MAX_IMAGES = 10` | Acceptable -- documented constants |
| `src/lib/claude/client.ts:11` | 11 | `CLAUDE_MODEL = 'claude-sonnet-4-20250514'` | Move to env variable for model flexibility |
| `src/middleware.ts:29-36` | 29-36 | Rate limit values (`5/min`, `30/min`) | Move to config |

---

## Security Summary

### OWASP Top 10 Coverage

| Risk | Status | Notes |
|------|--------|-------|
| A01: Broken Access Control | GOOD | RLS + ownership checks + middleware auth |
| A02: Cryptographic Failures | GOOD | API keys in env vars, not hardcoded |
| A03: Injection (SQL/XSS) | GOOD | Supabase parameterized queries, `escapeHtml()` on output |
| A04: Insecure Design | MODERATE | No body size limits (C-2, C-4) |
| A05: Security Misconfiguration | MODERATE | In-memory rate limiting (M-1) |
| A06: Vulnerable Components | N/A | Not assessed (requires `npm audit`) |
| A07: Auth Failures | MODERATE | `getSession()` vs `getUser()` (C-3) |
| A08: Software/Data Integrity | GOOD | No `eval()`, proper JSON parsing |
| A09: Security Logging/Monitoring | GOOD | `generation_history` table, console logging |
| A10: SSRF | LOW RISK | External calls only to Anthropic API (trusted) |

### Environment Variable Audit

| Variable | Location | Exposure Risk | Status |
|----------|----------|---------------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Public (expected) | OK |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Public (expected) | OK |
| `ANTHROPIC_API_KEY` | Server only | No client exposure | OK |
| `OPENAI_API_KEY` | Server only | No client exposure | OK |
| `REMOVE_BG_API_KEY` | Server only | No client exposure | OK |

---

## Improvement Recommendations (Priority Order)

### Immediate (Before Production)

1. **Fix C-1**: Move `uploadProductImages` to a server-side module using `createServerSupabaseClient()`.
2. **Fix C-2 + C-4**: Add request body size validation to `/api/analyze` and `/api/projects`.
3. **Fix C-3**: Replace `getSession()` with `getUser()` in `AuthProvider.tsx`.
4. **Fix M-1**: Replace in-memory rate limiter with `@upstash/ratelimit` or similar distributed solution.

### Short-term (Next Sprint)

5. **Fix M-2**: Remove duplicate `readSSEStream` from `useGeneration.ts`, import from `streaming.ts`.
6. **Fix M-3**: Merge `analyzeProductImage` and `analyzeMultipleImages` into one function.
7. **Fix M-7**: Extract `VALID_CATEGORIES` constant and reuse across codebase.
8. **Fix M-6 + M-5**: Delete `html-templates.ts` (1826 lines) and unused `HTML_GENERATION_PROMPT`.
9. **Fix M-9**: Combine 3 sequential queries in `getProjectById` into a single join query.
10. **Fix m-1 to m-4**: Add env validation module with startup checks.

### Medium-term (Tech Debt)

11. **Fix M-10**: Add mimeType validation on `/api/analyze` endpoint.
12. **Fix m-5 + m-6**: Split large files (`html-generator.ts`, `useGeneration.ts`) into smaller modules.
13. **Fix m-12**: Memoize Supabase client in `AuthProvider`.
14. Add schema validation (zod) for API request bodies instead of manual null checks.
15. Extract auth check boilerplate into a reusable API route wrapper.
16. Move `CLAUDE_MODEL` to env variable for easier model switching.
17. Add comprehensive error codes enum for client-side error handling.

---

## Post-Analysis Verdict

```
CRITICAL ISSUES FOUND: 4
STATUS: Fix required before production deployment
```

The codebase demonstrates good security foundations (RLS, XSS protection, defense-in-depth auth, no dangerous DOM operations). The main concerns are:

1. **Architecture violation** (client module in server route) that could cause runtime failures
2. **Missing input validation** (body size, mimeType) that enables DoS attacks
3. **Auth initialization** using unvalidated session data
4. **Significant dead code** (~1860 lines) and duplicate code (~200 lines) that increase maintenance burden

After fixing the 4 critical issues, the codebase would be suitable for staging deployment with the major issues tracked for resolution.
