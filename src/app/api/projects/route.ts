import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/supabase/auth';
import { createProduct, listProjects, saveProductImages, logGenerationAction } from '@/lib/supabase/projects';
import { uploadProductImages } from '@/lib/supabase/server';
import type { CreateProjectInput } from '@/types';

const MAX_IMAGES = 10;
const MAX_BASE64_LENGTH = 15_000_000;

/**
 * POST /api/projects — Create a new project with images
 * Body: { project: CreateProjectInput, images: Array<{ base64: string, filename: string, isMain: boolean }> }
 */
export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: '인증이 필요합니다.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { project, images } = body as {
      project: CreateProjectInput;
      images?: Array<{ base64: string; filename: string; isMain: boolean }>;
    };

    if (!project?.name || !project?.category || !project?.analysis) {
      return NextResponse.json(
        { success: false, error: '필수 프로젝트 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 1. Create product record
    const { id: productId } = await createProduct(user.id, project);

    // 2. Upload images to Storage + save metadata
    if (images && images.length > 0) {
      if (images.length > MAX_IMAGES) {
        return NextResponse.json(
          { success: false, error: `이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있습니다.` },
          { status: 400 }
        );
      }

      for (const img of images) {
        if (!img.base64 || img.base64.length > MAX_BASE64_LENGTH) {
          return NextResponse.json(
            { success: false, error: '이미지 크기가 너무 큽니다. 이미지당 최대 10MB까지 업로드할 수 있습니다.' },
            { status: 400 }
          );
        }
      }

      const files = images.map((img, index) => {
        const binary = Buffer.from(img.base64, 'base64');
        const file = new File([binary], img.filename || `image_${index}.jpg`, {
          type: 'image/jpeg',
        });
        return { file, isMain: img.isMain, orderIndex: index };
      });

      const uploadedImages = await uploadProductImages(user.id, productId, files);
      await saveProductImages(productId, uploadedImages);
    }

    // 3. Log action
    await logGenerationAction(user.id, 'project_created', { category: project.category }, productId);

    return NextResponse.json({ success: true, data: { projectId: productId } });
  } catch (error) {
    console.error('POST /api/projects error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : '프로젝트 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/projects — List user's projects (paginated)
 * Query: ?page=1&limit=12
 */
export async function GET(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: '인증이 필요합니다.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12', 10)));

    const result = await listProjects(user.id, page, limit);

    return NextResponse.json({
      success: true,
      data: result.items,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/projects error:', error);
    return NextResponse.json(
      { success: false, error: '프로젝트 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
