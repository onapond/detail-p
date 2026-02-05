'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Download, Loader2, ImagePlus, X, Wand2 } from 'lucide-react';
import type { ProductAnalysis, ImageStyle, GeneratedImage, UploadedImage } from '@/types';

interface ImageGeneratorProps {
  analysis: ProductAnalysis;
  uploadedImages: UploadedImage[];
  onImageGenerated?: (image: GeneratedImage) => void;
}

const styleOptions: { value: ImageStyle; label: string; description: string }[] = [
  { value: 'lifestyle', label: '라이프스타일', description: '실제 사용 장면 연출' },
  { value: 'studio', label: '스튜디오', description: '깔끔한 전문 촬영' },
  { value: 'premium', label: '프리미엄', description: '고급스러운 분위기' },
  { value: 'natural', label: '내추럴', description: '자연스러운 감성' },
];

export function ImageGenerator({ analysis, uploadedImages, onImageGenerated }: ImageGeneratorProps) {
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>('lifestyle');
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedImageId, setSelectedImageId] = useState<string>(
    uploadedImages.find(img => img.isMain)?.id || uploadedImages[0]?.id || ''
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'style' | 'custom'>('style');

  const selectedImage = uploadedImages.find(img => img.id === selectedImageId);

  const handleGenerate = async () => {
    if (!selectedImage) {
      setError('제품 이미지를 선택해주세요.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // base64 데이터 추출 (data:image/...;base64, 부분 제거)
      const base64Data = selectedImage.preview.split(',')[1];

      const requestBody: Record<string, unknown> = {
        productImageBase64: base64Data,
        productName: analysis.productName,
        category: analysis.category,
      };

      if (mode === 'custom' && customPrompt.trim()) {
        requestBody.customPrompt = customPrompt.trim();
      } else {
        requestBody.style = selectedStyle;
      }

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '이미지 생성에 실패했습니다.');
      }

      const result = await response.json();
      // API returns { imageBase64, method } now
      const imageData = result.data;
      const newImage: GeneratedImage = {
        id: `${Date.now()}`,
        base64: typeof imageData === 'string' ? imageData : imageData.imageBase64,
        style: selectedStyle,
        customPrompt: mode === 'custom' ? customPrompt : undefined,
        createdAt: new Date(),
      };

      // 사용된 방법 로깅 (개발용)
      if (typeof imageData === 'object' && imageData.method) {
        console.log(`Image generated using ${imageData.method} method`);
      }

      setGeneratedImages((prev) => [newImage, ...prev]);
      onImageGenerated?.(newImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : '이미지 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (image: GeneratedImage) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${image.base64}`;
    link.download = `${analysis.productName || 'product'}_${image.style}_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemove = (id: string) => {
    setGeneratedImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImagePlus className="h-5 w-5" />
          AI 제품 이미지 생성
        </CardTitle>
        <CardDescription>
          원본 제품 이미지의 배경을 제거하고, AI가 생성한 새로운 배경에 합성합니다.
          제품 외관이 그대로 유지됩니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 원본 이미지 선택 */}
        {uploadedImages.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">원본 제품 이미지 선택</label>
            <div className="flex gap-2 flex-wrap">
              {uploadedImages.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImageId(img.id)}
                  className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImageId === img.id
                      ? 'border-primary ring-2 ring-primary/50'
                      : 'border-muted hover:border-muted-foreground'
                  }`}
                >
                  <img
                    src={img.preview}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                  {img.isMain && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] px-1">
                      대표
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 생성 모드 선택 */}
        <Tabs value={mode} onValueChange={(v) => setMode(v as 'style' | 'custom')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="style">스타일 선택</TabsTrigger>
            <TabsTrigger value="custom">직접 입력</TabsTrigger>
          </TabsList>

          <TabsContent value="style" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-2">
              {styleOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedStyle(option.value)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedStyle === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-muted hover:border-muted-foreground'
                  }`}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                원하는 장면 설명
              </label>
              <Textarea
                placeholder="예: 모던한 카페 안에 테이블 위 커피 한잔과 함께 있는 제품 사진"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                제품이 배치될 장면을 자세히 설명해주세요. 배경, 조명, 분위기 등을 포함하면 좋습니다.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !selectedImage || (mode === 'custom' && !customPrompt.trim())}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              이미지 생성 중... (약 30초-1분)
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              제품 이미지 생성하기
            </>
          )}
        </Button>

        {/* Error */}
        {error && (
          <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Generated Images */}
        {generatedImages.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">생성된 이미지</h4>
            <div className="grid grid-cols-2 gap-4">
              {generatedImages.map((image) => (
                <div
                  key={image.id}
                  className="relative group rounded-lg overflow-hidden border"
                >
                  <img
                    src={`data:image/png;base64,${image.base64}`}
                    alt={`Generated ${image.style}`}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDownload(image)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleRemove(image.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="text-xs">
                      {image.customPrompt
                        ? '커스텀'
                        : styleOptions.find((s) => s.value === image.style)?.label}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
