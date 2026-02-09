'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ImageUploader } from '@/components/upload/ImageUploader';
import { AnalysisResult } from '@/components/analysis/AnalysisResult';
import { CopywritingEditor } from '@/components/copywriting/CopywritingEditor';
import { TemplateSelector } from '@/components/template/TemplateSelector';
import { HtmlPreview } from '@/components/preview/HtmlPreview';
import { DownloadPanel } from '@/components/download/DownloadPanel';
import { GenerationProgress } from '@/components/GenerationProgress';
import { ImageGenerator } from '@/components/image-generator/ImageGenerator';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useGeneration } from '@/hooks/useGeneration';
import { templates, getDefaultTemplate } from '@/lib/templates';
import type { Template } from '@/types';
import { Sparkles, Upload, Wand2, Eye, Download, Coffee, RefreshCw } from 'lucide-react';

export default function Home() {
  const {
    images,
    isUploading,
    error: uploadError,
    addImages,
    removeImage,
    setMainImage,
    clearImages,
  } = useImageUpload();

  const {
    state,
    analysis,
    copywriting,
    generatedHtml,
    streamingText,
    generate,
    updateCopywriting,
    refineCopy,
    refineHtml,
    reset,
  } = useGeneration();

  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [activeTab, setActiveTab] = useState('upload');

  const handleGenerate = async () => {
    const success = await generate(images, selectedTemplate);
    if (success) {
      setActiveTab('result');
    }
  };

  const handleReset = () => {
    clearImages();
    reset();
    setActiveTab('upload');
  };

  const isGenerating = ['analyzing', 'generating_copy', 'generating_layout'].includes(state.step);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Detail_P</h1>
            <span className="text-sm text-muted-foreground">AI 상세페이지 생성기</span>
          </div>
          <div className="flex items-center gap-2">
            {state.step === 'complete' && (
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                새로 만들기
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section - Only show before generation */}
        {state.step === 'idle' && images.length === 0 && (
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="py-12 text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">
                AI가 만드는 식품 상세페이지
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                제품 이미지만 업로드하면 AI가 분석하고, 마케팅 카피를 작성하고,
                쇼핑몰에 바로 사용할 수 있는 상세페이지를 생성합니다.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Generation Progress */}
        {isGenerating && (
          <div className="mb-8">
            <GenerationProgress state={state} streamingText={streamingText} />
          </div>
        )}

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">이미지 업로드</span>
            </TabsTrigger>
            <TabsTrigger value="template" className="flex items-center gap-2">
              <Wand2 className="h-4 w-4" />
              <span className="hidden sm:inline">템플릿 선택</span>
            </TabsTrigger>
            <TabsTrigger
              value="result"
              disabled={!analysis}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">결과 확인</span>
            </TabsTrigger>
            <TabsTrigger
              value="download"
              disabled={!generatedHtml}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">다운로드</span>
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>제품 이미지 업로드</CardTitle>
                <CardDescription>
                  제품 사진을 업로드해주세요. 대표 이미지는 별표로 표시됩니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUploader
                  images={images}
                  isUploading={isUploading}
                  error={uploadError}
                  onAddImages={addImages}
                  onRemoveImage={removeImage}
                  onSetMainImage={setMainImage}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Template Tab */}
          <TabsContent value="template">
            <div className="space-y-8">
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
                suggestedCategory={analysis?.category}
              />

              <Separator />

              {/* Generate Button */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={handleGenerate}
                  disabled={images.length === 0 || isGenerating}
                  className="px-8"
                >
                  {isGenerating ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      생성 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      상세페이지 생성하기
                    </>
                  )}
                </Button>
              </div>

              {images.length === 0 && (
                <p className="text-center text-muted-foreground">
                  먼저 이미지를 업로드해주세요.
                </p>
              )}
            </div>
          </TabsContent>

          {/* Result Tab */}
          <TabsContent value="result">
            {state.step === 'error' && (
              <Card className="mb-8 border-destructive">
                <CardContent className="py-6">
                  <p className="text-destructive">{state.error}</p>
                  <Button variant="outline" className="mt-4" onClick={handleReset}>
                    다시 시도
                  </Button>
                </CardContent>
              </Card>
            )}

            {analysis && copywriting && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Analysis & Copywriting & Image Generator */}
                <div className="space-y-8">
                  <AnalysisResult analysis={analysis} />
                  <CopywritingEditor
                    copywriting={copywriting}
                    onUpdate={updateCopywriting}
                    onRefine={refineCopy}
                    isRefining={state.step === 'generating_copy'}
                  />
                  <ImageGenerator analysis={analysis} uploadedImages={images} />
                </div>

                {/* Right Column - Preview */}
                <div>
                  {generatedHtml ? (
                    <HtmlPreview
                      html={generatedHtml}
                      onRefine={refineHtml}
                      isRefining={state.step === 'generating_layout'}
                    />
                  ) : (
                    <Card className="h-[400px] flex items-center justify-center">
                      <p className="text-muted-foreground">
                        HTML 생성 중...
                      </p>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Download Tab */}
          <TabsContent value="download">
            {generatedHtml && (
              <div className="space-y-8">
                <DownloadPanel
                  html={generatedHtml}
                  images={images}
                  productName={analysis?.productName}
                />

                <Card>
                  <CardHeader>
                    <CardTitle>최종 미리보기</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg overflow-hidden bg-white">
                      <iframe
                        srcDoc={generatedHtml}
                        title="Final Preview"
                        className="w-full h-[800px] border-0"
                        sandbox="allow-same-origin"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Detail_P - AI 상세페이지 생성기 | 식품/건강기능식품 특화</p>
        </div>
      </footer>
    </main>
  );
}
