/**
 * Template Registry
 * Maps template IDs (category_style) to their HTML generation functions.
 * Templates are lazily imported to avoid loading all templates at once.
 */

import type { ProductCategory, TemplateStyle } from '@/types';

type TemplateGenerator = () => string;

// Registry of template ID → HTML generator function
const registry = new Map<string, () => Promise<TemplateGenerator>>();

// Helper to build template ID
export function buildTemplateId(category: ProductCategory, style: TemplateStyle): string {
  return `${category}_${style}`;
}

// ── Coffee templates ─────────────────────────────────────────────────
registry.set('coffee_modern', async () => {
  const { getCoffeeModernTemplate } = await import('./categories/coffee/modern');
  return getCoffeeModernTemplate;
});
registry.set('coffee_classic', async () => {
  const { getCoffeeClassicTemplate } = await import('./categories/coffee/classic');
  return getCoffeeClassicTemplate;
});
registry.set('coffee_premium', async () => {
  const { getCoffeePremiumTemplate } = await import('./categories/coffee/premium');
  return getCoffeePremiumTemplate;
});

// ── Health Supplement templates ──────────────────────────────────────
registry.set('health_supplement_modern', async () => {
  const { getHealthModernTemplate } = await import('./categories/health/modern');
  return getHealthModernTemplate;
});
registry.set('health_supplement_classic', async () => {
  const { getHealthClassicTemplate } = await import('./categories/health/classic');
  return getHealthClassicTemplate;
});
registry.set('health_supplement_premium', async () => {
  const { getHealthPremiumTemplate } = await import('./categories/health/premium');
  return getHealthPremiumTemplate;
});

// ── Processed Food templates ────────────────────────────────────────
registry.set('processed_food_modern', async () => {
  const { getFoodModernTemplate } = await import('./categories/food/modern');
  return getFoodModernTemplate;
});
registry.set('processed_food_classic', async () => {
  const { getFoodClassicTemplate } = await import('./categories/food/classic');
  return getFoodClassicTemplate;
});
registry.set('processed_food_premium', async () => {
  const { getFoodPremiumTemplate } = await import('./categories/food/premium');
  return getFoodPremiumTemplate;
});

// ── Beverage templates ──────────────────────────────────────────────
registry.set('beverage_modern', async () => {
  const { getBeverageModernTemplate } = await import('./categories/beverage/modern');
  return getBeverageModernTemplate;
});
registry.set('beverage_classic', async () => {
  const { getBeverageClassicTemplate } = await import('./categories/beverage/classic');
  return getBeverageClassicTemplate;
});
registry.set('beverage_premium', async () => {
  const { getBeveragePremiumTemplate } = await import('./categories/beverage/premium');
  return getBeveragePremiumTemplate;
});

/**
 * Get template HTML by template ID.
 * Falls back to the category's modern template, then coffee_modern.
 */
export async function getTemplateHtml(templateId: string): Promise<string> {
  const loader = registry.get(templateId);
  if (loader) {
    const generator = await loader();
    return generator();
  }

  // Fallback: try modern style for the same category
  const parts = templateId.split('_');
  const style = parts.pop();
  const category = parts.join('_');
  if (style !== 'modern') {
    const modernId = `${category}_modern`;
    const modernLoader = registry.get(modernId);
    if (modernLoader) {
      console.warn(`[Template] "${templateId}" not found, falling back to "${modernId}"`);
      const generator = await modernLoader();
      return generator();
    }
  }

  // Ultimate fallback: coffee_modern
  console.warn(`[Template] "${templateId}" not found, falling back to "coffee_modern"`);
  const fallbackLoader = registry.get('coffee_modern')!;
  const generator = await fallbackLoader();
  return generator();
}

/**
 * Get all registered template IDs
 */
export function getRegisteredTemplateIds(): string[] {
  return Array.from(registry.keys());
}

/**
 * Check if a template ID is registered
 */
export function isTemplateRegistered(templateId: string): boolean {
  return registry.has(templateId);
}
