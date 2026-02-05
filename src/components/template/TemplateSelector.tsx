'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { templates } from '@/lib/templates';
import type { Template } from '@/types';
import { Layout, Palette, Minimize } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: Template | null;
  onSelectTemplate: (template: Template) => void;
}

const templateIcons = {
  modern: <Palette className="h-8 w-8" />,
  classic: <Layout className="h-8 w-8" />,
  minimal: <Minimize className="h-8 w-8" />,
};

export function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">템플릿 선택</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
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
                  {templateIcons[template.category]}
                </div>
                <h4 className="font-semibold">{template.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
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
        ))}
      </div>
    </div>
  );
}
