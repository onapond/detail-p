'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { templates, getTemplatesForCategory } from '@/lib/templates';
import type { Template, ProductCategory, TemplateStyle } from '@/types';
import { Layout, Palette, Crown, Coffee, Leaf, UtensilsCrossed, GlassWater } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: Template | null;
  onSelectTemplate: (template: Template) => void;
  suggestedCategory?: ProductCategory;
}

const categoryConfig: Record<ProductCategory, { label: string; icon: React.ReactNode; color: string }> = {
  coffee: { label: '커피', icon: <Coffee className="h-4 w-4" />, color: 'bg-amber-100 text-amber-800 hover:bg-amber-200' },
  health_supplement: { label: '건강기능식품', icon: <Leaf className="h-4 w-4" />, color: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' },
  processed_food: { label: '가공식품', icon: <UtensilsCrossed className="h-4 w-4" />, color: 'bg-orange-100 text-orange-800 hover:bg-orange-200' },
  beverage: { label: '음료', icon: <GlassWater className="h-4 w-4" />, color: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200' },
};

const styleConfig: Record<TemplateStyle, { label: string; icon: React.ReactNode; description: string }> = {
  modern: { label: '모던', icon: <Palette className="h-8 w-8" />, description: '깔끔하고 현대적인 디자인' },
  classic: { label: '클래식', icon: <Layout className="h-8 w-8" />, description: '전통적이고 신뢰감 있는 디자인' },
  premium: { label: '프리미엄', icon: <Crown className="h-8 w-8" />, description: '럭셔리하고 고급스러운 디자인' },
};

export function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
  suggestedCategory,
}: TemplateSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(
    suggestedCategory || 'all'
  );

  const filteredTemplates = useMemo(() => {
    if (activeCategory === 'all') return templates;
    return getTemplatesForCategory(activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">템플릿 선택</h3>
        <p className="text-sm text-muted-foreground">
          제품 카테고리와 스타일을 선택하세요. AI 분석 결과에 따라 자동 추천됩니다.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={cn(
            'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
            activeCategory === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          전체
        </button>
        {(Object.entries(categoryConfig) as [ProductCategory, typeof categoryConfig[ProductCategory]][]).map(
          ([category, config]) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5',
                activeCategory === category
                  ? config.color.replace('hover:', '')
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {config.icon}
              {config.label}
              {suggestedCategory === category && (
                <span className="text-xs opacity-70">(추천)</span>
              )}
            </button>
          )
        )}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => {
          const style = styleConfig[template.style];
          const category = categoryConfig[template.category];

          return (
            <Card
              key={template.id}
              className={cn(
                'cursor-pointer transition-all hover:shadow-md',
                selectedTemplate?.id === template.id
                  ? 'ring-2 ring-primary'
                  : 'hover:border-primary/50'
              )}
              onClick={() => onSelectTemplate(template)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div
                    className={cn(
                      'p-4 rounded-full',
                      selectedTemplate?.id === template.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {style.icon}
                  </div>
                  <h4 className="font-semibold">{template.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <Badge
                      variant="outline"
                      className={cn('text-xs', category.color)}
                    >
                      {category.icon}
                      <span className="ml-1">{category.label}</span>
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {style.label}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {template.sections.slice(0, 3).map((section) => (
                      <Badge key={section.id} variant="secondary" className="text-xs">
                        {section.type}
                      </Badge>
                    ))}
                    {template.sections.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.sections.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
