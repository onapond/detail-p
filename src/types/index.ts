// 제품 분석 결과 타입
export interface ProductAnalysis {
  productName: string;
  category: 'coffee' | 'health_supplement' | 'processed_food' | 'beverage' | 'other';
  mainFeatures: string[];
  benefits: string[];
  targetAudience: string;
  priceRange?: string;
  origin?: string;
  certifications?: string[];
  ingredients?: string[];
  tastingNotes?: string[];  // 커피 특화
  roastingLevel?: string;   // 커피 특화
  functionalClaims?: string[];  // 건기식 특화
  cautionNotes?: string[];  // 건기식 특화
}

// 카피라이팅 결과 타입
export interface CopywritingResult {
  headline: string;
  subheadline: string;
  productDescription: string;
  keyBenefits: string[];
  callToAction: string;
  trustElements: string[];
  seoKeywords: string[];
  regulatoryWarnings?: string[];  // 식품/건기식 규제 문구
}

// 업로드된 이미지 타입
export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  url?: string;  // Supabase Storage URL
  isMain: boolean;
}

// 템플릿 타입
export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'modern' | 'classic' | 'minimal';
  sections: TemplateSection[];
}

export interface TemplateSection {
  id: string;
  type: 'hero' | 'features' | 'benefits' | 'gallery' | 'trust' | 'cta';
  layout: 'full' | 'split' | 'grid';
  order: number;
}

// 생성된 상세페이지 타입
export interface GeneratedPage {
  id: string;
  templateId: string;
  analysis: ProductAnalysis;
  copywriting: CopywritingResult;
  images: UploadedImage[];
  html: string;
  createdAt: Date;
}

// 생성 상태 타입
export interface GenerationState {
  step: 'idle' | 'uploading' | 'analyzing' | 'generating_copy' | 'generating_layout' | 'complete' | 'error';
  progress: number;
  message: string;
  error?: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// AI 생성 이미지 타입
export type ImageStyle = 'lifestyle' | 'studio' | 'premium' | 'natural';

export interface GeneratedImage {
  id: string;
  base64: string;  // base64 이미지 데이터
  style: ImageStyle;
  customPrompt?: string;
  method?: 'composite' | 'fallback';  // 생성 방식
  createdAt: Date;
}
