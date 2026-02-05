'use client';

import { useState, useCallback } from 'react';
import type {
  UploadedImage,
  ProductAnalysis,
  CopywritingResult,
  GenerationState,
  Template
} from '@/types';

interface UseGenerationReturn {
  state: GenerationState;
  analysis: ProductAnalysis | null;
  copywriting: CopywritingResult | null;
  generatedHtml: string | null;
  generate: (images: UploadedImage[], template: Template) => Promise<void>;
  updateCopywriting: (copywriting: CopywritingResult) => void;
  refineCopy: (feedback: string) => Promise<void>;
  refineHtml: (feedback: string) => Promise<void>;
  reset: () => void;
}

export function useGeneration(): UseGenerationReturn {
  const [state, setState] = useState<GenerationState>({
    step: 'idle',
    progress: 0,
    message: '',
  });
  const [analysis, setAnalysis] = useState<ProductAnalysis | null>(null);
  const [copywriting, setCopywriting] = useState<CopywritingResult | null>(null);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);

  const generate = useCallback(async (images: UploadedImage[], template: Template) => {
    if (images.length === 0) {
      setState({
        step: 'error',
        progress: 0,
        message: '이미지를 업로드해주세요.',
        error: '이미지가 없습니다.',
      });
      return;
    }

    try {
      // Step 1: Analyze images
      setState({
        step: 'analyzing',
        progress: 20,
        message: '제품 이미지를 분석하고 있습니다...',
      });

      const analyzeResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: await Promise.all(
            images.map(async (img) => ({
              base64: img.preview.split(',')[1],
              mimeType: img.file.type,
            }))
          ),
        }),
      });

      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json();
        throw new Error(errorData.error || '이미지 분석에 실패했습니다.');
      }

      const analysisResult = await analyzeResponse.json();
      setAnalysis(analysisResult.data);

      // Step 2: Generate copywriting
      setState({
        step: 'generating_copy',
        progress: 50,
        message: '마케팅 카피를 생성하고 있습니다...',
      });

      const copyResponse = await fetch('/api/copywriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysis: analysisResult.data }),
      });

      if (!copyResponse.ok) {
        const errorData = await copyResponse.json();
        throw new Error(errorData.error || '카피라이팅 생성에 실패했습니다.');
      }

      const copyResult = await copyResponse.json();
      setCopywriting(copyResult.data);

      // Step 3: Generate HTML
      setState({
        step: 'generating_layout',
        progress: 80,
        message: '상세페이지 레이아웃을 생성하고 있습니다...',
      });

      const htmlResponse = await fetch('/api/generate-html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysis: analysisResult.data,
          copywriting: copyResult.data,
          imageCount: images.length,  // base64 대신 이미지 개수만 전송
          template,
        }),
      });

      if (!htmlResponse.ok) {
        const errorData = await htmlResponse.json();
        throw new Error(errorData.error || 'HTML 생성에 실패했습니다.');
      }

      const htmlResult = await htmlResponse.json();

      // placeholder를 실제 이미지 URL로 교체
      let finalHtml = htmlResult.data as string;
      const imageUrls = images.map((img) => img.preview);
      imageUrls.forEach((url, index) => {
        finalHtml = finalHtml.replace(new RegExp(`\\{\\{IMAGE_${index + 1}\\}\\}`, 'g'), url);
      });

      setGeneratedHtml(finalHtml);

      // Complete
      setState({
        step: 'complete',
        progress: 100,
        message: '상세페이지 생성이 완료되었습니다!',
      });
    } catch (error) {
      setState({
        step: 'error',
        progress: 0,
        message: error instanceof Error ? error.message : '오류가 발생했습니다.',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      });
    }
  }, []);

  const updateCopywriting = useCallback((newCopywriting: CopywritingResult) => {
    setCopywriting(newCopywriting);
  }, []);

  const refineCopy = useCallback(async (feedback: string) => {
    if (!copywriting) return;

    setState({
      step: 'generating_copy',
      progress: 50,
      message: '카피를 수정하고 있습니다...',
    });

    try {
      const response = await fetch('/api/copywriting/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ copywriting, feedback }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '카피 수정에 실패했습니다.');
      }

      const result = await response.json();
      setCopywriting(result.data);

      setState({
        step: 'complete',
        progress: 100,
        message: '카피 수정이 완료되었습니다!',
      });
    } catch (error) {
      setState({
        step: 'error',
        progress: 0,
        message: error instanceof Error ? error.message : '오류가 발생했습니다.',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      });
    }
  }, [copywriting]);

  const refineHtml = useCallback(async (feedback: string) => {
    if (!generatedHtml) return;

    setState({
      step: 'generating_layout',
      progress: 80,
      message: 'HTML을 수정하고 있습니다...',
    });

    try {
      const response = await fetch('/api/generate-html/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: generatedHtml, feedback }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'HTML 수정에 실패했습니다.');
      }

      const result = await response.json();
      setGeneratedHtml(result.data);

      setState({
        step: 'complete',
        progress: 100,
        message: 'HTML 수정이 완료되었습니다!',
      });
    } catch (error) {
      setState({
        step: 'error',
        progress: 0,
        message: error instanceof Error ? error.message : '오류가 발생했습니다.',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      });
    }
  }, [generatedHtml]);

  const reset = useCallback(() => {
    setState({
      step: 'idle',
      progress: 0,
      message: '',
    });
    setAnalysis(null);
    setCopywriting(null);
    setGeneratedHtml(null);
  }, []);

  return {
    state,
    analysis,
    copywriting,
    generatedHtml,
    generate,
    updateCopywriting,
    refineCopy,
    refineHtml,
    reset,
  };
}
