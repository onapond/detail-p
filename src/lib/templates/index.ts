import type { Template } from '@/types';

export const templates: Template[] = [
  {
    id: 'modern',
    name: '모던 스타일',
    description: '깔끔하고 현대적인 디자인. 여백을 활용한 세련된 레이아웃.',
    thumbnail: '/templates/modern-thumb.png',
    category: 'modern',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'features', type: 'features', layout: 'grid', order: 2 },
      { id: 'description', type: 'benefits', layout: 'split', order: 3 },
      { id: 'gallery', type: 'gallery', layout: 'grid', order: 4 },
      { id: 'trust', type: 'trust', layout: 'full', order: 5 },
      { id: 'cta', type: 'cta', layout: 'full', order: 6 },
    ],
  },
  {
    id: 'classic',
    name: '클래식 스타일',
    description: '전통적인 상세페이지 스타일. 정보 전달에 최적화.',
    thumbnail: '/templates/classic-thumb.png',
    category: 'classic',
    sections: [
      { id: 'hero', type: 'hero', layout: 'split', order: 1 },
      { id: 'benefits', type: 'benefits', layout: 'full', order: 2 },
      { id: 'features', type: 'features', layout: 'split', order: 3 },
      { id: 'gallery', type: 'gallery', layout: 'full', order: 4 },
      { id: 'trust', type: 'trust', layout: 'grid', order: 5 },
      { id: 'cta', type: 'cta', layout: 'full', order: 6 },
    ],
  },
  {
    id: 'minimal',
    name: '미니멀 스타일',
    description: '심플하고 간결한 디자인. 제품 이미지 중심 레이아웃.',
    thumbnail: '/templates/minimal-thumb.png',
    category: 'minimal',
    sections: [
      { id: 'hero', type: 'hero', layout: 'full', order: 1 },
      { id: 'description', type: 'benefits', layout: 'full', order: 2 },
      { id: 'gallery', type: 'gallery', layout: 'grid', order: 3 },
      { id: 'cta', type: 'cta', layout: 'full', order: 4 },
    ],
  },
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: 'modern' | 'classic' | 'minimal'): Template[] {
  return templates.filter((t) => t.category === category);
}
