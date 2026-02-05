import { NextResponse } from 'next/server';
import { getUsageSummary, resetUsage } from '@/lib/usage-tracker';

export async function GET() {
  try {
    const summary = getUsageSummary();
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

export async function DELETE() {
  try {
    resetUsage();
    return NextResponse.json({
      success: true,
      message: 'Usage data reset successfully',
    });
  } catch (error) {
    console.error('Usage reset error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset usage data' },
      { status: 500 }
    );
  }
}
