'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Save } from 'lucide-react';
import type { CopywritingResult } from '@/types';

interface CopywritingEditorProps {
  copywriting: CopywritingResult;
  onUpdate: (copywriting: CopywritingResult) => void;
  onRefine: (feedback: string) => Promise<void>;
  isRefining: boolean;
}

export function CopywritingEditor({
  copywriting,
  onUpdate,
  onRefine,
  isRefining,
}: CopywritingEditorProps) {
  const [feedback, setFeedback] = useState('');
  const [editedCopy, setEditedCopy] = useState(copywriting);

  const handleFieldChange = (
    field: keyof CopywritingResult,
    value: string | string[]
  ) => {
    setEditedCopy((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(editedCopy);
  };

  const handleRefine = async () => {
    if (!feedback.trim()) return;
    await onRefine(feedback);
    setFeedback('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>마케팅 카피</span>
          <Button size="sm" onClick={handleSave} disabled={isRefining}>
            <Save className="h-4 w-4 mr-2" />
            저장
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Refine */}
        <div className="bg-muted/50 p-4 rounded-lg space-y-3">
          <Label className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI 수정 요청
          </Label>
          <Textarea
            placeholder="예: 더 강조하고 싶은 부분이 있어요. 가격 대비 품질을 더 부각해주세요."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={2}
          />
          <Button
            onClick={handleRefine}
            disabled={!feedback.trim() || isRefining}
            className="w-full"
          >
            {isRefining ? '수정 중...' : 'AI로 카피 수정하기'}
          </Button>
        </div>

        <Separator />

        {/* Headline */}
        <div className="space-y-2">
          <Label htmlFor="headline">헤드라인</Label>
          <Input
            id="headline"
            value={editedCopy.headline}
            onChange={(e) => handleFieldChange('headline', e.target.value)}
            placeholder="주목을 끄는 헤드라인"
          />
        </div>

        {/* Subheadline */}
        <div className="space-y-2">
          <Label htmlFor="subheadline">서브 헤드라인</Label>
          <Input
            id="subheadline"
            value={editedCopy.subheadline}
            onChange={(e) => handleFieldChange('subheadline', e.target.value)}
            placeholder="헤드라인 보충 설명"
          />
        </div>

        {/* Product Description */}
        <div className="space-y-2">
          <Label htmlFor="description">제품 설명</Label>
          <Textarea
            id="description"
            value={editedCopy.productDescription}
            onChange={(e) => handleFieldChange('productDescription', e.target.value)}
            placeholder="제품 상세 설명"
            rows={5}
          />
        </div>

        {/* Key Benefits */}
        <div className="space-y-2">
          <Label>핵심 혜택</Label>
          <div className="space-y-2">
            {editedCopy.keyBenefits.map((benefit, index) => (
              <Input
                key={index}
                value={benefit}
                onChange={(e) => {
                  const newBenefits = [...editedCopy.keyBenefits];
                  newBenefits[index] = e.target.value;
                  handleFieldChange('keyBenefits', newBenefits);
                }}
                placeholder={`혜택 ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-2">
          <Label htmlFor="cta">구매 유도 문구 (CTA)</Label>
          <Input
            id="cta"
            value={editedCopy.callToAction}
            onChange={(e) => handleFieldChange('callToAction', e.target.value)}
            placeholder="지금 바로 구매하세요!"
          />
        </div>

        {/* Trust Elements */}
        <div className="space-y-2">
          <Label>신뢰 요소</Label>
          <div className="flex flex-wrap gap-2">
            {editedCopy.trustElements.map((element, index) => (
              <Badge key={index} variant="secondary">
                {element}
              </Badge>
            ))}
          </div>
        </div>

        {/* SEO Keywords */}
        <div className="space-y-2">
          <Label>SEO 키워드</Label>
          <div className="flex flex-wrap gap-1">
            {editedCopy.seoKeywords.map((keyword, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        {/* Regulatory Warnings */}
        {editedCopy.regulatoryWarnings && editedCopy.regulatoryWarnings.length > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <Label className="text-yellow-800 dark:text-yellow-200">규제 관련 문구</Label>
            <ul className="mt-2 space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
              {editedCopy.regulatoryWarnings.map((warning, index) => (
                <li key={index}>• {warning}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
