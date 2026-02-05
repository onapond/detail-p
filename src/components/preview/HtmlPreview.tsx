'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Monitor, Smartphone, Code, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HtmlPreviewProps {
  html: string;
  onRefine: (feedback: string) => Promise<void>;
  isRefining: boolean;
}

export function HtmlPreview({ html, onRefine, isRefining }: HtmlPreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showCode, setShowCode] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleRefine = async () => {
    if (!feedback.trim()) return;
    await onRefine(feedback);
    setFeedback('');
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>미리보기</span>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'desktop' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
            <Button
              variant={showCode ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setShowCode(!showCode)}
            >
              <Code className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI Refine */}
        <div className="bg-muted/50 p-3 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            AI 수정 요청
          </div>
          <Textarea
            placeholder="예: 히어로 섹션을 더 크게 만들어주세요. 색상을 따뜻한 톤으로 바꿔주세요."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={2}
          />
          <Button
            onClick={handleRefine}
            disabled={!feedback.trim() || isRefining}
            size="sm"
            className="w-full"
          >
            {isRefining ? '수정 중...' : 'HTML 수정하기'}
          </Button>
        </div>

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="preview" className="flex-1">미리보기</TabsTrigger>
            <TabsTrigger value="code" className="flex-1">HTML 코드</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4">
            <div
              className={cn(
                'border rounded-lg overflow-hidden mx-auto transition-all bg-white',
                viewMode === 'mobile' ? 'max-w-[375px]' : 'w-full'
              )}
              style={{ minHeight: '500px' }}
            >
              <iframe
                srcDoc={html}
                title="Preview"
                className="w-full h-[600px] border-0"
                sandbox="allow-same-origin"
              />
            </div>
          </TabsContent>
          <TabsContent value="code" className="mt-4">
            <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[600px] text-xs">
              <code>{html}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
