'use client';

import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileCode, Image, Archive, Check } from 'lucide-react';
import type { UploadedImage } from '@/types';

interface DownloadPanelProps {
  html: string;
  images: UploadedImage[];
  productName?: string;
}

export function DownloadPanel({ html, images, productName }: DownloadPanelProps) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const safeName = (productName || 'product')
    .replace(/[^a-zA-Z0-9가-힣]/g, '_')
    .substring(0, 50);

  const handleDownloadHtml = async () => {
    setDownloading('html');
    try {
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      saveAs(blob, `${safeName}_detail.html`);
      setDownloaded((prev) => new Set(prev).add('html'));
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadImages = async () => {
    setDownloading('images');
    try {
      const zip = new JSZip();
      const imgFolder = zip.folder('images');

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        // Extract base64 data and convert to blob
        const base64Data = image.preview.split(',')[1];
        const mimeType = image.file.type;
        const extension = mimeType.split('/')[1] || 'jpg';
        const filename = `image_${i + 1}${image.isMain ? '_main' : ''}.${extension}`;

        imgFolder?.file(filename, base64Data, { base64: true });
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${safeName}_images.zip`);
      setDownloaded((prev) => new Set(prev).add('images'));
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadAll = async () => {
    setDownloading('all');
    try {
      const zip = new JSZip();

      // Add HTML
      zip.file('detail.html', html);

      // Add images
      const imgFolder = zip.folder('images');
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const base64Data = image.preview.split(',')[1];
        const mimeType = image.file.type;
        const extension = mimeType.split('/')[1] || 'jpg';
        const filename = `image_${i + 1}${image.isMain ? '_main' : ''}.${extension}`;

        imgFolder?.file(filename, base64Data, { base64: true });
      }

      // Add readme
      const readme = `# ${productName || 'Product'} 상세페이지

## 파일 구성
- detail.html: 상세페이지 HTML 파일
- images/: 제품 이미지 폴더

## 사용 방법
1. HTML 파일을 쇼핑몰 상세페이지 에디터에 붙여넣기
2. 이미지는 쇼핑몰에 업로드 후 URL 교체 필요

## 생성 정보
- 생성일: ${new Date().toLocaleDateString('ko-KR')}
- 생성 도구: Detail_P AI
`;
      zip.file('README.md', readme);

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${safeName}_complete.zip`);
      setDownloaded((prev) => new Set(prev).add('all'));
    } finally {
      setDownloading(null);
    }
  };

  const DownloadButton = ({
    id,
    icon: Icon,
    label,
    description,
    onClick,
  }: {
    id: string;
    icon: React.ElementType;
    label: string;
    description: string;
    onClick: () => Promise<void>;
  }) => (
    <Button
      variant="outline"
      className="h-auto p-4 flex flex-col items-center gap-2 w-full"
      onClick={onClick}
      disabled={downloading !== null}
    >
      {downloaded.has(id) ? (
        <Check className="h-6 w-6 text-green-500" />
      ) : downloading === id ? (
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      ) : (
        <Icon className="h-6 w-6" />
      )}
      <span className="font-medium">{label}</span>
      <span className="text-xs text-muted-foreground">{description}</span>
    </Button>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          다운로드
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DownloadButton
            id="html"
            icon={FileCode}
            label="HTML만"
            description="상세페이지 HTML 파일"
            onClick={handleDownloadHtml}
          />
          <DownloadButton
            id="images"
            icon={Image}
            label="이미지만"
            description={`${images.length}개 이미지 ZIP`}
            onClick={handleDownloadImages}
          />
          <DownloadButton
            id="all"
            icon={Archive}
            label="전체 다운로드"
            description="HTML + 이미지 + README"
            onClick={handleDownloadAll}
          />
        </div>
      </CardContent>
    </Card>
  );
}
