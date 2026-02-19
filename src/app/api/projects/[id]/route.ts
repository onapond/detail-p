import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/supabase/auth';
import { getProjectById, updateProduct, softDeleteProduct } from '@/lib/supabase/projects';

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET /api/projects/[id] — Get full project details
 */
export async function GET(_request: NextRequest, context: RouteContext) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: '인증이 필요합니다.' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const project = await getProjectById(id);

    if (!project) {
      return NextResponse.json({ success: false, error: '프로젝트를 찾을 수 없습니다.' }, { status: 404 });
    }

    // RLS handles authorization, but double-check ownership
    if (project.userId !== user.id) {
      return NextResponse.json({ success: false, error: '권한이 없습니다.' }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('GET /api/projects/[id] error:', error);
    return NextResponse.json(
      { success: false, error: '프로젝트를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/projects/[id] — Update project
 * Body: { displayName?: string, analysis?: object }
 */
export async function PUT(request: NextRequest, context: RouteContext) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: '인증이 필요합니다.' }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    // Verify ownership
    const project = await getProjectById(id);
    if (!project || project.userId !== user.id) {
      return NextResponse.json({ success: false, error: '프로젝트를 찾을 수 없습니다.' }, { status: 404 });
    }

    const body = await request.json();
    await updateProduct(id, {
      displayName: body.displayName,
      analysis: body.analysis,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT /api/projects/[id] error:', error);
    return NextResponse.json(
      { success: false, error: '프로젝트 업데이트에 실패했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/projects/[id] — Soft delete project
 */
export async function DELETE(_request: NextRequest, context: RouteContext) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: '인증이 필요합니다.' }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    // Verify ownership
    const project = await getProjectById(id);
    if (!project || project.userId !== user.id) {
      return NextResponse.json({ success: false, error: '프로젝트를 찾을 수 없습니다.' }, { status: 404 });
    }

    await softDeleteProduct(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/projects/[id] error:', error);
    return NextResponse.json(
      { success: false, error: '프로젝트 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}
