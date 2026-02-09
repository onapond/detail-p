'use client';

import { useState, useCallback, useRef } from 'react';
import { extractJson } from '@/lib/claude/json-parser';
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
  streamingText: string;
  generate: (images: UploadedImage[], template: Template) => Promise<boolean>;
  updateCopywriting: (copywriting: CopywritingResult) => void;
  refineCopy: (feedback: string) => Promise<void>;
  refineHtml: (feedback: string) => Promise<void>;
  reset: () => void;
}

// SSE event type (mirrored from streaming.ts for client use)
type SSEEvent =
  | { type: 'text'; data: string }
  | { type: 'result'; data: string }
  | { type: 'error'; data: string }
  | { type: 'usage'; data: { inputTokens: number; outputTokens: number } };

/**
 * Read SSE stream from a fetch response
 */
async function readSSEStream(
  response: Response,
  callbacks: {
    onText?: (text: string) => void;
    onResult?: (result: string) => void;
    onError?: (error: string) => void;
  }
): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';
  let fullResult = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;

      try {
        const event: SSEEvent = JSON.parse(line.slice(6));
        switch (event.type) {
          case 'text':
            callbacks.onText?.(event.data);
            break;
          case 'result':
            fullResult = event.data;
            callbacks.onResult?.(event.data);
            break;
          case 'error':
            callbacks.onError?.(event.data);
            break;
        }
      } catch {
        // Skip malformed events
      }
    }
  }

  return fullResult;
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
  const [streamingText, setStreamingText] = useState('');
  const streamingTextRef = useRef('');

  const generate = useCallback(async (images: UploadedImage[], template: Template): Promise<boolean> => {
    if (images.length === 0) {
      setState({
        step: 'error',
        progress: 0,
        message: '이미지를 업로드해주세요.',
        error: '이미지가 없습니다.',
      });
      return false;
    }

    try {
      // Step 1: Analyze images (streaming)
      setState({
        step: 'analyzing',
        progress: 10,
        message: '제품 이미지를 분석하고 있습니다...',
      });
      setStreamingText('');
      streamingTextRef.current = '';

      const imagePayload = await Promise.all(
        images.map(async (img) => ({
          base64: img.preview.split(',')[1],
          mimeType: img.file.type,
        }))
      );

      const analyzeResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: imagePayload,
          stream: true,
        }),
      });

      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json();
        throw new Error(errorData.error || '이미지 분석에 실패했습니다.');
      }

      // Check if SSE response
      const contentType = analyzeResponse.headers.get('content-type') || '';
      let analysisResult: ProductAnalysis;

      if (contentType.includes('text/event-stream')) {
        const resultText = await readSSEStream(analyzeResponse, {
          onText: (text) => {
            streamingTextRef.current += text;
            setStreamingText(streamingTextRef.current);
            setState(prev => ({
              ...prev,
              progress: Math.min(prev.progress + 1, 40),
            }));
          },
          onError: (error) => {
            throw new Error(error);
          },
        });

        // Parse the complete result
        analysisResult = extractJson<ProductAnalysis>(resultText);

        // Validate category
        const validCategories = ['coffee', 'health_supplement', 'processed_food', 'beverage'];
        if (!validCategories.includes(analysisResult.category)) {
          analysisResult.category = 'processed_food' as ProductAnalysis['category'];
        }
      } else {
        // Non-streaming fallback
        const data = await analyzeResponse.json();
        if (!data.success) throw new Error(data.error);
        analysisResult = data.data;
      }

      setAnalysis(analysisResult);

      // Step 2: Generate copywriting (streaming)
      setState({
        step: 'generating_copy',
        progress: 45,
        message: '마케팅 카피를 생성하고 있습니다...',
      });
      setStreamingText('');
      streamingTextRef.current = '';

      const copyResponse = await fetch('/api/copywriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysis: analysisResult,
          stream: true,
        }),
      });

      if (!copyResponse.ok) {
        const errorData = await copyResponse.json();
        throw new Error(errorData.error || '카피라이팅 생성에 실패했습니다.');
      }

      const copyContentType = copyResponse.headers.get('content-type') || '';
      let copyResult: CopywritingResult;

      if (copyContentType.includes('text/event-stream')) {
        const resultText = await readSSEStream(copyResponse, {
          onText: (text) => {
            streamingTextRef.current += text;
            setStreamingText(streamingTextRef.current);
            setState(prev => ({
              ...prev,
              progress: Math.min(prev.progress + 1, 70),
            }));
          },
          onError: (error) => {
            throw new Error(error);
          },
        });

        copyResult = extractJson<CopywritingResult>(resultText);
      } else {
        const data = await copyResponse.json();
        if (!data.success) throw new Error(data.error);
        copyResult = data.data;
      }

      setCopywriting(copyResult);

      // Step 3: Generate HTML (non-streaming - needs complete template)
      setState({
        step: 'generating_layout',
        progress: 75,
        message: '상세페이지 레이아웃을 생성하고 있습니다...',
      });
      setStreamingText('');

      const htmlResponse = await fetch('/api/generate-html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysis: analysisResult,
          copywriting: copyResult,
          imageCount: images.length,
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
      setStreamingText('');
      return true;
    } catch (error) {
      setState({
        step: 'error',
        progress: 0,
        message: error instanceof Error ? error.message : '오류가 발생했습니다.',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      });
      setStreamingText('');
      return false;
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
    setStreamingText('');
    streamingTextRef.current = '';
  }, []);

  return {
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
  };
}
