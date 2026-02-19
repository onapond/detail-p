import { NextRequest, NextResponse } from 'next/server';
import { getUsageSummary } from '@/lib/usage-tracker';
import { getAuthUser } from '@/lib/supabase/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const period = (request.nextUrl.searchParams.get('period') || 'month') as 'day' | 'month' | 'all';
    const summary = await getUsageSummary(user.id, period);

    return NextResponse.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error('Usage fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch usage data' },
      { status: 500 }
    );
  }
}
