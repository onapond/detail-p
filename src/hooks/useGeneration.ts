'use client';

import { useState, useCallback, useRef } from 'react';
import { extractJson } from '@/lib/claude/json-parser';
import { readSSEStream } from '@/lib/claude/streaming-client';
import type {
  UploadedImage,
  ProductAnalysis,
  CopywritingResult,
  GenerationState,
  Template,
  Project,
} from '@/types';
import { PRODUCT_CATEGORIES } from '@/types';

interface UseGenerationReturn {
  state: GenerationState;
  analysis: ProductAnalysis | null;
  copywriting: CopywritingResult | null;
  generatedHtml: string | null;
  streamingText: string;
  projectId: string | null;
  isSaving: boolean;
  generate: (images: UploadedImage[], template: Template) => Promise<boolean>;
  updateCopywriting: (copywriting: CopywritingResult) => void;
  refineCopy: (feedback: string) => Promise<void>;
  refineHtml: (feedback: string) => Promise<void>;
  reset: () => void;
  saveProject: (images: UploadedImage[], template: Template, displayName?: string) => Promise<string | null>;
  loadProject: (project: Project) => void;
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
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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
        if (analyzeResponse.status === 401) {
          throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
        }
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
        if (!PRODUCT_CATEGORIES.includes(analysisResult.category)) {
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
        if (copyResponse.status === 401) {
          throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
        }
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
        if (htmlResponse.status === 401) {
          throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
        }
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
        if (response.status === 401) {
          throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
        }
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
        if (response.status === 401) {
          throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
        }
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

  const saveProject = useCallback(async (
    images: UploadedImage[],
    template: Template,
    displayName?: string
  ): Promise<string | null> => {
    if (!analysis || !copywriting || !generatedHtml || isSaving) return null;

    setIsSaving(true);
    try {
      // 1. Create project + upload images
      const imagePayload = await Promise.all(
        images.map(async (img, index) => {
          // Extract base64 from preview data URL
          const base64 = img.preview.split(',')[1];
          return {
            base64,
            filename: img.file?.name || `image_${index}.jpg`,
            isMain: img.isMain,
          };
        })
      );

      const createRes = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: {
            name: analysis.productName,
            displayName: displayName || analysis.productName,
            category: analysis.category,
            analysis,
          },
          images: imagePayload,
        }),
      });

      if (!createRes.ok) {
        if (createRes.status === 401) throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
        const err = await createRes.json();
        throw new Error(err.error || '프로젝트 생성에 실패했습니다.');
      }

      const { data: createData } = await createRes.json();
      const newProjectId = createData.projectId;

      // 2. Save generation results
      const saveRes = await fetch(`/api/projects/${newProjectId}/save-generation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: template.id,
          copywriting,
          htmlContent: generatedHtml,
        }),
      });

      if (!saveRes.ok) {
        const err = await saveRes.json();
        throw new Error(err.error || '생성 결과 저장에 실패했습니다.');
      }

      setProjectId(newProjectId);
      return newProjectId;
    } catch (error) {
      console.error('Save project error:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [analysis, copywriting, generatedHtml, isSaving]);

  const loadProject = useCallback((project: Project) => {
    if (project.analysis) {
      setAnalysis(project.analysis);
    }
    if (project.page?.copywriting) {
      setCopywriting(project.page.copywriting);
    }
    if (project.page?.htmlContent) {
      // Replace base64 image URLs with Supabase public URLs if images exist
      let html = project.page.htmlContent;
      if (project.images.length > 0) {
        project.images
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .forEach((img, index) => {
            html = html.replace(
              new RegExp(`\\{\\{IMAGE_${index + 1}\\}\\}`, 'g'),
              img.publicUrl
            );
          });
      }
      setGeneratedHtml(html);
    }
    setProjectId(project.id);
    setState({
      step: 'complete',
      progress: 100,
      message: '저장된 프로젝트를 불러왔습니다.',
    });
    setStreamingText('');
    streamingTextRef.current = '';
  }, []);

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
    setProjectId(null);
    setIsSaving(false);
  }, []);

  return {
    state,
    analysis,
    copywriting,
    generatedHtml,
    streamingText,
    projectId,
    isSaving,
    generate,
    updateCopywriting,
    refineCopy,
    refineHtml,
    reset,
    saveProject,
    loadProject,
  };
}
