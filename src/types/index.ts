// 제품 카테고리 타입
export type ProductCategory = 'coffee' | 'health_supplement' | 'processed_food' | 'beverage';

// 제품 카테고리 상수 배열
export const PRODUCT_CATEGORIES: readonly ProductCategory[] = ['coffee', 'health_supplement', 'processed_food', 'beverage'] as const;

// 템플릿 스타일 타입
export type TemplateStyle = 'modern' | 'classic' | 'premium';

// 가격 포지셔닝
export type PricePositioning = 'premium' | 'mid-range' | 'budget';

// 브랜드 보이스
export type BrandVoice = 'professional' | 'friendly' | 'luxury' | 'natural';

// 컬러 스킴 인터페이스
export interface ColorScheme {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  heroGradient: string;
  heroBgBefore: string;
  cream: string;        // 배경 보조색
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  ctaGradient: string;
  ctaShadow: string;
}

// 제품 분석 결과 타입
export interface ProductAnalysis {
  productName: string;
  category: ProductCategory;
  mainFeatures: string[];
  benefits: string[];
  targetAudience: string;
  priceRange?: string;
  pricePositioning?: PricePositioning;
  brandVoice?: BrandVoice;
  suggestedStyle?: TemplateStyle;
  packageSize?: string;        // 패키지 크기/중량
  origin?: string;
  certifications?: string[];
  ingredients?: string[];
  tastingNotes?: string[];     // 커피 특화
  roastingLevel?: string;      // 커피 특화
  functionalClaims?: string[]; // 건기식 특화
  cautionNotes?: string[];     // 건기식 특화
  allergenInfo?: string[];     // 알레르기 정보
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
  category: ProductCategory;
  style: TemplateStyle;
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

// 사용자 프로필 타입
export interface UserProfile {
  id: string;
  email: string;
  company_name?: string;
  created_at: string;
  updated_at: string;
}

// 인증 상태 타입
export interface AuthState {
  user: import('@supabase/supabase-js').User | null;
  profile: UserProfile | null;
  session: import('@supabase/supabase-js').Session | null;
  isLoading: boolean;
}

// === Project Persistence Types (Phase 2-2) ===

// 저장된 이미지 레코드
export interface ProjectImage {
  id: string;
  productId: string;
  storagePath: string;
  publicUrl: string;
  isMain: boolean;
  orderIndex: number;
  createdAt: string;
}

// 프로젝트 전체 뷰 (product + generated_page + images)
export interface Project {
  id: string;
  userId: string;
  name: string;
  displayName: string | null;
  category: ProductCategory | null;
  analysis: ProductAnalysis | null;
  createdAt: string;
  updatedAt: string;
  // joined from generated_pages
  page: {
    id: string;
    templateId: string;
    copywriting: CopywritingResult | null;
    htmlContent: string | null;
    status: 'draft' | 'published' | 'archived';
    createdAt: string;
    updatedAt: string;
  } | null;
  // joined from product_images
  images: ProjectImage[];
}

// 프로젝트 목록 아이템 (HTML blob 제외)
export interface ProjectListItem {
  id: string;
  name: string;
  displayName: string | null;
  category: ProductCategory | null;
  status: 'draft' | 'published' | 'archived' | null;
  thumbnailUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

// 프로젝트 생성 입력
export interface CreateProjectInput {
  name: string;
  displayName?: string;
  category: ProductCategory;
  analysis: ProductAnalysis;
}

// 생성 결과 저장 입력
export interface SaveGenerationInput {
  templateId: string;
  copywriting: CopywritingResult;
  htmlContent: string;
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
