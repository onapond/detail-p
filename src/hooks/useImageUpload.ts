'use client';

import { useState, useCallback } from 'react';
import type { UploadedImage } from '@/types';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGES = 10;

// 리사이즈 설정 - API 토큰 사용량 최적화
const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;
const JPEG_QUALITY = 0.8;

interface UseImageUploadReturn {
  images: UploadedImage[];
  isUploading: boolean;
  error: string | null;
  addImages: (files: FileList | File[]) => Promise<void>;
  removeImage: (id: string) => void;
  setMainImage: (id: string) => void;
  reorderImages: (fromIndex: number, toIndex: number) => void;
  clearImages: () => void;
}

export function useImageUpload(): UseImageUploadReturn {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `${file.name}: 지원하지 않는 파일 형식입니다. (JPEG, PNG, WebP, GIF만 가능)`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: 파일 크기가 10MB를 초과합니다.`;
    }
    return null;
  };

  // 이미지 리사이즈 함수
  const resizeImage = (file: File): Promise<{ file: File; preview: string }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = () => {
        let { width, height } = img;

        // 리사이즈 필요 여부 확인
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;

        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // 이미지 그리기
        ctx.drawImage(img, 0, 0, width, height);

        // JPEG로 변환 (더 작은 파일 크기)
        const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);

        // DataURL을 File로 변환
        fetch(dataUrl)
          .then(res => res.blob())
          .then(blob => {
            const resizedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
              type: 'image/jpeg',
            });
            resolve({
              file: resizedFile,
              preview: dataUrl,
            });
          })
          .catch(reject);
      };

      img.onerror = () => reject(new Error('이미지 로드 실패'));

      // File을 DataURL로 읽기
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const addImages = useCallback(async (files: FileList | File[]) => {
    setError(null);
    setIsUploading(true);

    try {
      const fileArray = Array.from(files);

      // Check total count limit
      if (images.length + fileArray.length > MAX_IMAGES) {
        throw new Error(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
      }

      // Validate all files
      const validationErrors: string[] = [];
      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          validationErrors.push(validationError);
        }
      }

      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('\n'));
      }

      // 이미지 리사이즈 및 프리뷰 생성
      const newImages: UploadedImage[] = await Promise.all(
        fileArray.map(async (file, index) => {
          const { file: resizedFile, preview } = await resizeImage(file);
          return {
            id: `${Date.now()}-${index}`,
            file: resizedFile,
            preview,
            isMain: images.length === 0 && index === 0, // First image is main
          };
        })
      );

      setImages((prev) => [...prev, ...newImages]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  }, [images.length]);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      // If removed image was main, set first remaining as main
      if (filtered.length > 0 && !filtered.some((img) => img.isMain)) {
        filtered[0].isMain = true;
      }
      return filtered;
    });
  }, []);

  const setMainImage = useCallback((id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isMain: img.id === id,
      }))
    );
  }, []);

  const reorderImages = useCallback((fromIndex: number, toIndex: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      return newImages;
    });
  }, []);

  const clearImages = useCallback(() => {
    setImages([]);
    setError(null);
  }, []);

  return {
    images,
    isUploading,
    error,
    addImages,
    removeImage,
    setMainImage,
    reorderImages,
    clearImages,
  };
}
