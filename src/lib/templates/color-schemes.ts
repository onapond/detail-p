import type { ColorScheme } from '@/types';

export const COLOR_SCHEMES: Record<string, ColorScheme> = {
  // ── Coffee ────────────────────────────────────────────────────────────
  coffee_modern: {
    primary: '#8b5a2b',
    primaryLight: '#d4a574',
    primaryDark: '#5c3d1e',
    accent: '#d4a574',
    cream: '#f5f0e8',
    heroGradient:
      'linear-gradient(135deg, #5c3d1e 0%, #8b5a2b 50%, #d4a574 100%)',
    heroBgBefore:
      'radial-gradient(ellipse at 30% 50%, rgba(212,165,116,0.25) 0%, transparent 70%)',
    badgeBg: 'rgba(212,165,116,0.15)',
    badgeBorder: 'rgba(139,90,43,0.3)',
    badgeText: '#8b5a2b',
    ctaGradient: 'linear-gradient(135deg, #8b5a2b 0%, #d4a574 100%)',
    ctaShadow: '0 4px 15px rgba(139,90,43,0.4)',
  },

  coffee_classic: {
    primary: '#6b4423',
    primaryLight: '#c9986a',
    primaryDark: '#4a2e16',
    accent: '#c9986a',
    cream: '#f3ebe0',
    heroGradient:
      'linear-gradient(135deg, #4a2e16 0%, #6b4423 50%, #c9986a 100%)',
    heroBgBefore:
      'radial-gradient(ellipse at 30% 50%, rgba(201,152,106,0.25) 0%, transparent 70%)',
    badgeBg: 'rgba(201,152,106,0.15)',
    badgeBorder: 'rgba(107,68,35,0.3)',
    badgeText: '#6b4423',
    ctaGradient: 'linear-gradient(135deg, #6b4423 0%, #c9986a 100%)',
    ctaShadow: '0 4px 15px rgba(107,68,35,0.4)',
  },

  coffee_premium: {
    primary: '#3d2815',
    primaryLight: '#a67b4e',
    primaryDark: '#2a1b0e',
    accent: '#a67b4e',
    cream: '#f0e9de',
    heroGradient:
      'linear-gradient(135deg, #2a1b0e 0%, #3d2815 50%, #a67b4e 100%)',
    heroBgBefore:
      'radial-gradient(ellipse at 30% 50%, rgba(166,123,78,0.25) 0%, transparent 70%)',
    badgeBg: 'rgba(166,123,78,0.15)',
    badgeBorder: 'rgba(61,40,21,0.3)',
    badgeText: '#a67b4e',
    ctaGradient: 'linear-gradient(135deg, #3d2815 0%, #a67b4e 100%)',
    ctaShadow: '0 4px 15px rgba(61,40,21,0.5)',
  },

  // ── Health ────────────────────────────────────────────────────────────
  health_modern: {
    primary: '#059669',
    primaryLight: '#10b981',
    primaryDark: '#047857',
    accent: '#10b981',
    cream: '#ecfdf5',
    heroGradient:
      'linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)',
    heroBgBefore:
      'radial-gradient(ellipse at 30% 50%, rgba(16,185,129,0.25) 0%, transparent 70%)',
    badgeBg: 'rgba(16,185,129,0.15)',
    badgeBorder: 'rgba(5,150,105,0.3)',
    badgeText: '#059669',
    ctaGradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    ctaShadow: '0 4px 15px rgba(5,150,105,0.4)',
  },

  health_classic: {
    primary: '#0d9488',
    primaryLight: '#14b8a6',
    primaryDark: '#0f766e',
    accent: '#14b8a6',
    cream: '#f0fdfa',
    heroGradient:
      'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)',
    heroBgBefore:
      'radial-gradient(ellipse at 30% 50%, rgba(20,184,166,0.25) 0%, transparent 70%)',
    badgeBg: 'rgba(20,184,166,0.15)',
    badgeBorder: 'rgba(13,148,136,0.3)',
    badgeText: '#0d9488',
    ctaGradient: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
    ctaShadow: '0 4px 15px rgba(13,148,136,0.4)',
  },

  health_premium: {
    primary: '#4d7c6f',
    primaryLight: '#7fb3a4',
    primaryDark: '#3d6459',
    accent: '#7fb3a4',
    cream: '#f0f7f4',
    heroGradient:
      'linear-gradient(135deg, #3d6459 0%, #4d7c6f 50%, #7fb3a4 100%)',
    heroBgBefore:
      'radial-gradient(ellipse at 30% 50%, rgba(127,179,164,0.25) 0%, transparent 70%)',
    badgeBg: 'rgba(127,179,164,0.15)',
    badgeBorder: 'rgba(77,124,111,0.3)',
    badgeText: '#4d7c6f',
    ctaGradient: 'linear-gradient(135deg, #4d7c6f 0%, #7fb3a4 100%)',
    ctaShadow: '0 4px 15px rgba(77,124,111,0.4)',
  },

  // ── Food ──────────────────────────────────────────────────────────────
  food_modern: {
    primary: '#e85d26',
    primaryLight: '#f08c5a',
    primaryDark: '#c44d1e',
    accent: '#f08c5a',
    cream: '#fff7ed',
    heroGradient:
      'linear-gradient(135deg, #c44d1e 0%, #e85d26 50%, #f08c5a 100%)',
    heroBgBefore:
      'radial-gradient(ellipse at 30% 50%, rgba(240,140,90,0.25) 0%, transparent 70%)',
    badgeBg: 'rgba(240,140,90,0.15)',
    badgeBorder: 'rgba(232,93,38,0.3)',
    badgeText: '#e85d26',
    ctaGradient: 'linear-gradient(135deg, #e85d26 0%, #f08c5a 100%)',
    ctaShadow: '0 4px 15px rgba(232,93,38,0.4)',
  },

  food_classic: {
    primary: '#d4722e',
    primaryLight: '#e8a06a',
    primaryDark: '#b45e24',
    accent: '#e8a06a',
    cream: '#fef6ee',
    heroGradient:
      'linear-gradient(135deg, #b45e24 0%, #d4722e 50%, #e8a06a 100%)',
    heroBgBefore:
      'radial-gradient(ellipse at 30% 50%, rgba(232,160,106,0.25) 0%, transparent 70%)',
    badgeBg: 'rgba(232,160,106,0.15)',
    badgeBorder: 'rgba(212,114,46,0.3)',
    badgeText: '#d4722e',
    ctaGradient: 'linear-gradient(135deg, #d4722e 0%, #e8a06a 100%)',
    ctaShadow: '0 4px 15px rgba(212,114,46,0.4)',
  },

  food_premium: {
    primary: '#8b4513',
    primaryLight: '#c67d47',
    primaryDark: '#6d360f',
    accent: '#c67d47',
    cream: '#faf4ed',
    heroGradient:
      'linear-gradient(135deg, #6d360f 0%, #8b4513 50%, #c67d47 100%)',
    heroBgBefore:
      'radial-gradient(ellipse at 30% 50%, rgba(198,125,71,0.25) 0%, transparent 70%)',
    badgeBg: 'rgba(198,125,71,0.15)',
    badgeBorder: 'rgba(139,69,19,0.3)',
    badgeText: '#8b4513',
    ctaGradient: 'linear-gradient(135deg, #8b4513 0%, #c67d47 100%)',
    ctaShadow: '0 4px 15px rgba(139,69,19,0.4)',
  },

  // ── Beverage ──────────────────────────────────────────────────────────
  beverage_modern: {
    primary: '#0891b2',
    primaryLight: '#22d3ee',
    primaryDark: '#0e7490',
    accent: '#22d3ee',
    cream: '#ecfeff',
    heroGradient:
      'linear-gradient(135deg, #0e7490 0%, #0891b2 50%, #22d3ee 100%)',
    heroBgBefore:
      'radial-gradient(ellipse at 30% 50%, rgba(34,211,238,0.25) 0%, transparent 70%)',
    badgeBg: 'rgba(34,211,238,0.15)',
    badgeBorder: 'rgba(8,145,178,0.3)',
    badgeText: '#0891b2',
    ctaGradient: 'linear-gradient(135deg, #0891b2 0%, #22d3ee 100%)',
    ctaShadow: '0 4px 15px rgba(8,145,178,0.4)',
  },

  beverage_classic: {
    primary: '#1e6f8f',
    primaryLight: '#4da6c4',
    primaryDark: '#175873',
    accent: '#4da6c4',
    cream: '#eef8fc',
    heroGradient:
      'linear-gradient(135deg, #175873 0%, #1e6f8f 50%, #4da6c4 100%)',
    heroBgBefore:
      'radial-gradient(ellipse at 30% 50%, rgba(77,166,196,0.25) 0%, transparent 70%)',
    badgeBg: 'rgba(77,166,196,0.15)',
    badgeBorder: 'rgba(30,111,143,0.3)',
    badgeText: '#1e6f8f',
    ctaGradient: 'linear-gradient(135deg, #1e6f8f 0%, #4da6c4 100%)',
    ctaShadow: '0 4px 15px rgba(30,111,143,0.4)',
  },

  beverage_premium: {
    primary: '#1a1a2e',
    primaryLight: '#4a90d9',
    primaryDark: '#0f0f1e',
    accent: '#4a90d9',
    cream: '#f0f4fa',
    heroGradient:
      'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #4a90d9 100%)',
    heroBgBefore:
      'radial-gradient(ellipse at 30% 50%, rgba(74,144,217,0.25) 0%, transparent 70%)',
    badgeBg: 'rgba(74,144,217,0.15)',
    badgeBorder: 'rgba(26,26,46,0.3)',
    badgeText: '#4a90d9',
    ctaGradient: 'linear-gradient(135deg, #1a1a2e 0%, #4a90d9 100%)',
    ctaShadow: '0 4px 15px rgba(26,26,46,0.5)',
  },
};

/**
 * Retrieve the color scheme for a given category and style.
 * Falls back to coffee_modern if the combination is not found.
 */
export function getColorScheme(category: string, style: string): ColorScheme {
  // Normalize: strip common suffixes / aliases so the lookup key matches
  const normalizedCategory = category
    .replace(/[-\s]/g, '_')
    .replace(/_supplement$/i, '')
    .replace(/^processed_/i, '')
    .toLowerCase();

  const normalizedStyle = style.replace(/[-\s]/g, '_').toLowerCase();

  const key = `${normalizedCategory}_${normalizedStyle}`;

  if (COLOR_SCHEMES[key]) {
    return COLOR_SCHEMES[key];
  }

  // Try a broader match — iterate keys that start with the category prefix
  const fallbackByCategory = Object.keys(COLOR_SCHEMES).find((k) =>
    k.startsWith(`${normalizedCategory}_`),
  );

  if (fallbackByCategory) {
    return COLOR_SCHEMES[fallbackByCategory];
  }

  // Ultimate fallback
  return COLOR_SCHEMES.coffee_modern;
}
