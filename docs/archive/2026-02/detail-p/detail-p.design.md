# Detail-P Design Document (Retroactive)

## Feature: AI 기반 식품 상세페이지 자동 생성 SaaS

---

## 1. Architecture Overview

```
[Client Browser]
  ├── page.tsx (Main UI)
  ├── AuthProvider (Supabase Auth Context)
  ├── useGeneration (SSE streaming hook)
  ├── useImageUpload (File upload hook)
  ├── useProjects (CRUD hook)
  │
  ├── /api/analyze (POST) → Claude Vision API → SSE stream
  ├── /api/copywriting (POST) → Claude Text API → SSE stream
  ├── /api/generate-html (POST) → Template + Claude → JSON response
  ├── /api/projects (POST/GET) → Supabase CRUD
  ├── /api/projects/[id] (GET/PUT/DELETE) → Supabase CRUD
  └── /api/projects/[id]/save-generation (POST) → Save HTML result
```

## 2. Type System Design

### Core Types (src/types/index.ts)
- `ProductCategory`: `'coffee' | 'health_supplement' | 'processed_food' | 'beverage'`
- `TemplateStyle`: `'modern' | 'classic' | 'premium'`
- `ColorScheme`: 12 properties (primary/light/dark, accent, heroGradient, etc.)
- `Template`: id, name, description, category (ProductCategory), style (TemplateStyle), thumbnail
- `ProductAnalysis`: category (4 types, no 'other'), pricePositioning, brandVoice, suggestedStyle, allergenInfo
- `UserProfile`: id, email, full_name, company_name, created_at
- `AuthState`: user, profile, isLoading, isAuthenticated
- `Project`: id, user_id, product_name, display_name, category, style, analysis_result, copywriting_result, generated_html, images
- `ProjectListItem`: id, display_name, product_name, category, style, thumbnail_url, created_at, updated_at

## 3. Template System Design

### File Structure (12 templates)
```
src/lib/templates/
  base-styles.ts          (1,106 lines) - Common CSS with animations, print, a11y
  icons.ts                (113 lines) - 65 inline SVGs + getIconSvg()
  color-schemes.ts        (244 lines) - 12 category×style color schemes
  registry.ts             (119 lines) - Template ID → async dynamic import mapping
  index.ts                (267 lines) - 12 template metadata + public API
  categories/
    coffee/{modern,classic,premium}.ts    (~580-767 lines each)
    health/{modern,classic,premium}.ts    (~705-856 lines each)
    food/{modern,classic,premium}.ts      (~742-964 lines each)
    beverage/{modern,classic,premium}.ts  (~632-848 lines each)
```

### Template Features per Category
| Category | Unique Sections |
|----------|----------------|
| Coffee | Tasting notes, roasting profile, brewing guide, specialty origin story |
| Health Supplement | Clinical evidence, allergen warnings, dosage timing, certifications |
| Processed Food | Recipe cards, nutrition grid, allergen info, cooking process |
| Beverage | Flavor profile, serving temperature, pairing, season/TPO |

### Color Scheme Normalization
- `getColorScheme(category, style)` normalizes: `health_supplement` → `health`, `processed_food` → `food`

## 4. AI Pipeline Design

### Step 1: Image Analysis (SSE Streaming)
- Input: Product image (base64)
- API: Claude Vision (claude-sonnet-4-20250514)
- Output: ProductAnalysis JSON (category, features, ingredients, etc.)
- Streaming: SSE events for real-time progress

### Step 2: Copywriting (SSE Streaming)
- Input: ProductAnalysis + selected style
- API: Claude Text with category-specific prompts
- Output: CopywritingResult JSON (headline, subheadline, descriptions, CTAs)
- Category prompts: coffee (origin story), health (scientific), food (taste/family), beverage (refreshing/TPO)

### Step 3: HTML Generation (Non-streaming)
- Input: Template HTML + CopywritingResult + ProductAnalysis
- Process: Placeholder replacement via category-specific functions
- Functions: replaceCoffeePlaceholders(), replaceHealthPlaceholders(), replaceFoodPlaceholders(), replaceBeveragePlaceholders()
- Output: Complete HTML string

### Caching
- LRU cache with SHA-256 hash of base64 image
- TTL: 30 minutes
- Streaming mode bypasses cache (known limitation)

### Retry
- `withRetry<T>(fn, maxRetries=2)`: Exponential backoff
- Only retries rate limit errors

## 5. Authentication Design (Phase 2-1)

### Supabase Client Factories
- Browser: `src/lib/supabase/client.ts` - createBrowserClient()
- Server: `src/lib/supabase/server.ts` - createServerClient()
- Middleware: `src/lib/supabase/middleware.ts` - createMiddlewareClient()

### Auth Flow
- Email/Password signup with company_name
- Google OAuth via Supabase
- Auth callback at `/auth/callback`
- JWT session management via @supabase/ssr

### Route Protection
- Middleware: `/` requires auth (redirect to `/login`)
- API routes: 8 protected routes with defense-in-depth `getAuthUser()` checks
- 401 handling in all 5 fetch calls in useGeneration

### Database Trigger
- `handle_new_user()` → auto-create profile on signup

## 6. Data Persistence Design (Phase 2-2)

### Data Layer (src/lib/supabase/projects.ts)
9 CRUD functions:
1. `createProject(input)` - Create new project
2. `getProject(id)` - Get single project with images
3. `listProjects(userId, options)` - Paginated list
4. `updateProject(id, updates)` - Update project
5. `softDeleteProject(id)` - Soft delete (is_deleted flag)
6. `saveGeneratedPage(projectId, html)` - Save generation result
7. `saveProductImages(projectId, images)` - Save image metadata
8. `deleteProductImages(projectId)` - Delete image records
9. `logGenerationAction(projectId, action, metadata)` - Audit log

### Storage
- Bucket: `product-images` (public, authenticated uploads)
- Path: `{userId}/{projectId}/{filename}`
- Upload via presigned URL pattern

### API Routes
- `POST /api/projects` - Create project
- `GET /api/projects` - List user's projects
- `GET /api/projects/[id]` - Get project detail
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Soft delete project
- `POST /api/projects/[id]/save-generation` - Save generated HTML

### UI Components
- `SaveProjectDialog` - Modal with name input
- `ProjectList` - Grid cards with thumbnail, category badge, delete

## 7. Known Limitations & Technical Debt
1. `html-templates.ts` (1,826 lines) still exists but unused - should be deleted
2. Some template placeholders (ALLERGEN_TAGS, CLINICAL_CARDS) not in html-generator.ts
3. Streaming mode bypasses analysis cache
4. Template placeholder names may mismatch between templates and generator
5. Phase 2-3 (usage tracking DB migration) not yet implemented
6. Phase 2-4 (distributed rate limiting) not yet implemented

---
*Created retroactively: 2026-02-11 (original work: 2026-02-09 ~ 2026-02-10)*
