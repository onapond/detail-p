'use client';

import { useCallback } from 'react';
import { Upload, X, Star, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { UploadedImage } from '@/types';

interface ImageUploaderProps {
  images: UploadedImage[];
  isUploading: boolean;
  error: string | null;
  onAddImages: (files: FileList | File[]) => Promise<void>;
  onRemoveImage: (id: string) => void;
  onSetMainImage: (id: string) => void;
}

export function ImageUploader({
  images,
  isUploading,
  error,
  onAddImages,
  onRemoveImage,
  onSetMainImage,
}: ImageUploaderProps) {
  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        await onAddImages(files);
      }
    },
    [onAddImages]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        await onAddImages(files);
      }
      // Reset input
      e.target.value = '';
    },
    [onAddImages]
  );

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
      >
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
          disabled={isUploading}
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="text-lg font-medium">
              {isUploading ? '업로드 중...' : '이미지를 드래그하거나 클릭하여 업로드'}
            </p>
            <p className="text-sm text-muted-foreground">
              JPEG, PNG, WebP, GIF (최대 10MB, 10장까지)
            </p>
          </div>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <Card
              key={image.id}
              className="relative group overflow-hidden aspect-square"
            >
              {/* Main Badge */}
              {image.isMain && (
                <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  대표
                </div>
              )}

              {/* Image */}
              <img
                src={image.preview}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onRemoveImage(image.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                {!image.isMain && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onSetMainImage(image.id)}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Order Indicator */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Image Count */}
      {images.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          {images.length}개 이미지 업로드됨
        </p>
      )}
    </div>
  );
}
