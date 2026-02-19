import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/supabase/auth';
import { getProjectById, saveGeneratedPage, logGenerationAction } from '@/lib/supabase/projects';
import type { SaveGenerationInput } from '@/types';

type RouteContext = { params: Promise<{ id: string }> };

/**
 * POST /api/projects/[id]/save-generation — Save generation results to existing project
 * Body: SaveGenerationInput { templateId, copywriting, htmlContent }
 */
export async function POST(request: NextRequest, context: RouteContext) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: '인증이 필요합니다.' }, { status: 401 });
  }

  try {
    const { id: projectId } = await context.params;

    // Verify ownership
    const project = await getProjectById(projectId);
    if (!project || project.userId !== user.id) {
      return NextResponse.json({ success: false, error: '프로젝트를 찾을 수 없습니다.' }, { status: 404 });
    }

    const body = await request.json() as SaveGenerationInput;

    if (!body.templateId || !body.copywriting || !body.htmlContent) {
      return NextResponse.json(
        { success: false, error: '필수 생성 데이터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const { id: pageId } = await saveGeneratedPage(user.id, projectId, body);

    await logGenerationAction(
      user.id,
      'generation_saved',
      { templateId: body.templateId },
      projectId,
      pageId
    );

    return NextResponse.json({ success: true, data: { pageId } });
  } catch (error) {
    console.error('POST /api/projects/[id]/save-generation error:', error);
    return NextResponse.json(
      { success: false, error: '생성 결과 저장에 실패했습니다.' },
      { status: 500 }
    );
  }
}
