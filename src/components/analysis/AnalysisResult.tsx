'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { ProductAnalysis } from '@/types';

interface AnalysisResultProps {
  analysis: ProductAnalysis;
}

const categoryLabels: Record<ProductAnalysis['category'], string> = {
  coffee: '커피',
  health_supplement: '건강기능식품',
  processed_food: '가공식품',
  beverage: '음료',
};

export function AnalysisResult({ analysis }: AnalysisResultProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>제품 분석 결과</span>
          <Badge variant="secondary">
            {categoryLabels[analysis.category] || analysis.category}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Product Name */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">제품명</h4>
          <p className="text-lg font-semibold">{analysis.productName || '알 수 없음'}</p>
        </div>

        <Separator />

        {/* Main Features */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">주요 특징</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.mainFeatures?.map((feature, index) => (
              <Badge key={index} variant="outline">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">소비자 혜택</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {analysis.benefits?.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        {/* Target Audience */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">타겟 고객</h4>
          <p className="text-sm">{analysis.targetAudience || '미확인'}</p>
        </div>

        <Separator />

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {analysis.origin && (
            <div>
              <h4 className="font-medium text-muted-foreground">원산지</h4>
              <p>{analysis.origin}</p>
            </div>
          )}
          {analysis.certifications && analysis.certifications.length > 0 && (
            <div>
              <h4 className="font-medium text-muted-foreground">인증</h4>
              <p>{analysis.certifications.join(', ')}</p>
            </div>
          )}
        </div>

        {/* Category-specific info */}
        {analysis.category === 'coffee' && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">커피 정보</h4>
              {analysis.roastingLevel && (
                <p className="text-sm">로스팅: {analysis.roastingLevel}</p>
              )}
              {analysis.tastingNotes && analysis.tastingNotes.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {analysis.tastingNotes.map((note, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {note}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {analysis.category === 'health_supplement' && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">건강기능식품 정보</h4>
              {analysis.functionalClaims && analysis.functionalClaims.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">기능성 표시</p>
                  <ul className="list-disc list-inside text-sm">
                    {analysis.functionalClaims.map((claim, index) => (
                      <li key={index}>{claim}</li>
                    ))}
                  </ul>
                </div>
              )}
              {analysis.cautionNotes && analysis.cautionNotes.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md">
                  <p className="text-xs font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                    주의사항
                  </p>
                  <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300">
                    {analysis.cautionNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
