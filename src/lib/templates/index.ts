import type { Template, ProductCategory, TemplateStyle } from '@/types';
export { getTemplateHtml, buildTemplateId, getRegisteredTemplateIds } from './registry';
export { getIconSvg, ICON_SVG_MAP } from './icons';
export { getColorScheme } from './color-schemes';
export { BASE_STYLES } from './base-styles';

/**
 * 12 templates: 4 categories × 3 styles
 */
export const templates: Template[] = [
  // ── Coffee ─────────────────────────────────────────────
  {
    id: 'coffee_modern',
    name: '커피 모던',
    description: '깔끔한 현대적 감성. 스페셜티 커피 제품에 최적화.',
    thumbnail: '/templates/coffee-modern-thumb.png',
    category: 'coffee',
    style: 'modern',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'tasting', type: 'features', layout: 'grid', order: 2 },
      { id: 'origin', type: 'features', layout: 'split', order: 3 },
      { id: 'flavor', type: 'features', layout: 'full', order: 4 },
      { id: 'features', type: 'features', layout: 'grid', order: 5 },
      { id: 'grind', type: 'features', layout: 'grid', order: 6 },
      { id: 'story', type: 'benefits', layout: 'split', order: 7 },
      { id: 'brewing', type: 'features', layout: 'grid', order: 8 },
      { id: 'review', type: 'trust', layout: 'full', order: 9 },
      { id: 'trust', type: 'trust', layout: 'grid', order: 10 },
      { id: 'cta', type: 'cta', layout: 'full', order: 11 },
      { id: 'info', type: 'features', layout: 'full', order: 12 },
    ],
  },
  {
    id: 'coffee_classic',
    name: '커피 클래식',
    description: '따뜻하고 전통적인 레이아웃. 로스터리/원두 브랜드에 적합.',
    thumbnail: '/templates/coffee-classic-thumb.png',
    category: 'coffee',
    style: 'classic',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'features', type: 'features', layout: 'grid', order: 2 },
      { id: 'origin', type: 'benefits', layout: 'split', order: 3 },
      { id: 'flavor', type: 'features', layout: 'full', order: 4 },
      { id: 'story', type: 'benefits', layout: 'full', order: 5 },
      { id: 'trust', type: 'trust', layout: 'grid', order: 6 },
      { id: 'cta', type: 'cta', layout: 'full', order: 7 },
    ],
  },
  {
    id: 'coffee_premium',
    name: '커피 프리미엄',
    description: '럭셔리 감성의 고급 디자인. 프리미엄 원두에 최적.',
    thumbnail: '/templates/coffee-premium-thumb.png',
    category: 'coffee',
    style: 'premium',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'tasting', type: 'features', layout: 'grid', order: 2 },
      { id: 'origin', type: 'benefits', layout: 'split', order: 3 },
      { id: 'flavor', type: 'features', layout: 'full', order: 4 },
      { id: 'brewing', type: 'features', layout: 'grid', order: 5 },
      { id: 'story', type: 'benefits', layout: 'full', order: 6 },
      { id: 'trust', type: 'trust', layout: 'grid', order: 7 },
      { id: 'cta', type: 'cta', layout: 'full', order: 8 },
    ],
  },

  // ── Health Supplement ──────────────────────────────────
  {
    id: 'health_supplement_modern',
    name: '건강기능식품 모던',
    description: '신뢰감 있는 현대적 디자인. 건강기능식품에 최적화.',
    thumbnail: '/templates/health-modern-thumb.png',
    category: 'health_supplement',
    style: 'modern',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'certifications', type: 'trust', layout: 'grid', order: 2 },
      { id: 'ingredients', type: 'features', layout: 'grid', order: 3 },
      { id: 'benefits', type: 'benefits', layout: 'split', order: 4 },
      { id: 'dosage', type: 'features', layout: 'grid', order: 5 },
      { id: 'trust', type: 'trust', layout: 'grid', order: 6 },
      { id: 'caution', type: 'features', layout: 'full', order: 7 },
      { id: 'cta', type: 'cta', layout: 'full', order: 8 },
    ],
  },
  {
    id: 'health_supplement_classic',
    name: '건강기능식품 클래식',
    description: '클리닉/신뢰 중심 레이아웃. 의약외품·건기식에 적합.',
    thumbnail: '/templates/health-classic-thumb.png',
    category: 'health_supplement',
    style: 'classic',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'certifications', type: 'trust', layout: 'grid', order: 2 },
      { id: 'ingredients', type: 'features', layout: 'grid', order: 3 },
      { id: 'benefits', type: 'benefits', layout: 'full', order: 4 },
      { id: 'dosage', type: 'features', layout: 'grid', order: 5 },
      { id: 'clinical', type: 'trust', layout: 'full', order: 6 },
      { id: 'trust', type: 'trust', layout: 'grid', order: 7 },
      { id: 'cta', type: 'cta', layout: 'full', order: 8 },
    ],
  },
  {
    id: 'health_supplement_premium',
    name: '건강기능식품 프리미엄',
    description: '스파/웰니스 감성의 고급 디자인. 프리미엄 건강식품에 적합.',
    thumbnail: '/templates/health-premium-thumb.png',
    category: 'health_supplement',
    style: 'premium',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'ingredients', type: 'features', layout: 'grid', order: 2 },
      { id: 'benefits', type: 'benefits', layout: 'split', order: 3 },
      { id: 'clinical', type: 'trust', layout: 'full', order: 4 },
      { id: 'dosage', type: 'features', layout: 'grid', order: 5 },
      { id: 'trust', type: 'trust', layout: 'grid', order: 6 },
      { id: 'cta', type: 'cta', layout: 'full', order: 7 },
    ],
  },

  // ── Processed Food ────────────────────────────────────
  {
    id: 'processed_food_modern',
    name: '가공식품 모던',
    description: '식욕을 자극하는 현대적 디자인. 식품 마케팅에 최적화.',
    thumbnail: '/templates/food-modern-thumb.png',
    category: 'processed_food',
    style: 'modern',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'taste', type: 'features', layout: 'grid', order: 2 },
      { id: 'features', type: 'features', layout: 'grid', order: 3 },
      { id: 'recipe', type: 'features', layout: 'grid', order: 4 },
      { id: 'nutrition', type: 'features', layout: 'full', order: 5 },
      { id: 'allergen', type: 'features', layout: 'full', order: 6 },
      { id: 'story', type: 'benefits', layout: 'split', order: 7 },
      { id: 'trust', type: 'trust', layout: 'grid', order: 8 },
      { id: 'cta', type: 'cta', layout: 'full', order: 9 },
    ],
  },
  {
    id: 'processed_food_classic',
    name: '가공식품 클래식',
    description: '가정식·편안함을 강조하는 따뜻한 디자인.',
    thumbnail: '/templates/food-classic-thumb.png',
    category: 'processed_food',
    style: 'classic',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'taste', type: 'features', layout: 'grid', order: 2 },
      { id: 'features', type: 'features', layout: 'grid', order: 3 },
      { id: 'recipe', type: 'features', layout: 'full', order: 4 },
      { id: 'nutrition', type: 'features', layout: 'full', order: 5 },
      { id: 'trust', type: 'trust', layout: 'grid', order: 6 },
      { id: 'cta', type: 'cta', layout: 'full', order: 7 },
    ],
  },
  {
    id: 'processed_food_premium',
    name: '가공식품 프리미엄',
    description: '미식/셰프 감성의 고급 디자인. 프리미엄 식품에 적합.',
    thumbnail: '/templates/food-premium-thumb.png',
    category: 'processed_food',
    style: 'premium',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'taste', type: 'features', layout: 'grid', order: 2 },
      { id: 'features', type: 'features', layout: 'grid', order: 3 },
      { id: 'recipe', type: 'features', layout: 'grid', order: 4 },
      { id: 'nutrition', type: 'features', layout: 'full', order: 5 },
      { id: 'story', type: 'benefits', layout: 'split', order: 6 },
      { id: 'trust', type: 'trust', layout: 'grid', order: 7 },
      { id: 'cta', type: 'cta', layout: 'full', order: 8 },
    ],
  },

  // ── Beverage ──────────────────────────────────────────
  {
    id: 'beverage_modern',
    name: '음료 모던',
    description: '시원하고 청량한 현대적 디자인. 음료 마케팅에 최적화.',
    thumbnail: '/templates/beverage-modern-thumb.png',
    category: 'beverage',
    style: 'modern',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'flavor', type: 'features', layout: 'full', order: 2 },
      { id: 'features', type: 'features', layout: 'grid', order: 3 },
      { id: 'serving', type: 'features', layout: 'grid', order: 4 },
      { id: 'pairing', type: 'features', layout: 'grid', order: 5 },
      { id: 'nutrition', type: 'features', layout: 'full', order: 6 },
      { id: 'story', type: 'benefits', layout: 'split', order: 7 },
      { id: 'trust', type: 'trust', layout: 'grid', order: 8 },
      { id: 'cta', type: 'cta', layout: 'full', order: 9 },
    ],
  },
  {
    id: 'beverage_classic',
    name: '음료 클래식',
    description: '전통 음료 감성의 따뜻한 디자인.',
    thumbnail: '/templates/beverage-classic-thumb.png',
    category: 'beverage',
    style: 'classic',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'flavor', type: 'features', layout: 'full', order: 2 },
      { id: 'features', type: 'features', layout: 'grid', order: 3 },
      { id: 'serving', type: 'features', layout: 'grid', order: 4 },
      { id: 'story', type: 'benefits', layout: 'full', order: 5 },
      { id: 'trust', type: 'trust', layout: 'grid', order: 6 },
      { id: 'cta', type: 'cta', layout: 'full', order: 7 },
    ],
  },
  {
    id: 'beverage_premium',
    name: '음료 프리미엄',
    description: '바/라운지 감성의 고급 디자인. 프리미엄 음료에 적합.',
    thumbnail: '/templates/beverage-premium-thumb.png',
    category: 'beverage',
    style: 'premium',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'flavor', type: 'features', layout: 'full', order: 2 },
      { id: 'features', type: 'features', layout: 'grid', order: 3 },
      { id: 'pairing', type: 'features', layout: 'grid', order: 4 },
      { id: 'serving', type: 'features', layout: 'grid', order: 5 },
      { id: 'story', type: 'benefits', layout: 'split', order: 6 },
      { id: 'trust', type: 'trust', layout: 'grid', order: 7 },
      { id: 'cta', type: 'cta', layout: 'full', order: 8 },
    ],
  },
];

/**
 * Get template metadata by ID
 */
export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

/**
 * Get all templates for a specific product category
 */
export function getTemplatesForCategory(category: ProductCategory): Template[] {
  return templates.filter((t) => t.category === category);
}

/**
 * Get all templates for a specific style
 */
export function getTemplatesByStyle(style: TemplateStyle): Template[] {
  return templates.filter((t) => t.style === style);
}

/**
 * Get the default template for a category (modern style)
 */
export function getDefaultTemplate(category: ProductCategory): Template {
  const modernTemplate = templates.find(
    (t) => t.category === category && t.style === 'modern'
  );
  return modernTemplate || templates[0];
}
