import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareSupabaseClient } from '@/lib/supabase/middleware';
import { checkRateLimit, type RateLimitType } from '@/lib/rate-limit';

// AI 생성 엔드포인트 (비용이 높으므로 더 엄격한 제한)
const AI_ENDPOINTS = [
  '/api/analyze',
  '/api/copywriting',
  '/api/generate-html',
  '/api/generate-image',
];

// 인증이 필요한 API 라우트
const PROTECTED_API_ROUTES = [
  '/api/analyze',
  '/api/copywriting',
  '/api/generate-html',
  '/api/generate-image',
  '/api/capture-image',
  '/api/usage',
  '/api/projects',
];

// 인증 페이지 (로그인한 사용자는 접근 불가)
const AUTH_PAGES = ['/login', '/signup'];

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  return '127.0.0.1';
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Supabase 세션 갱신 (모든 요청에서)
  const supabase = await createMiddlewareSupabaseClient(request, response);
  const { data: { user } } = await supabase.auth.getUser();

  // 페이지 보호: 메인 페이지는 인증 필요
  if (pathname === '/') {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // 인증 페이지: 로그인 상태면 메인으로 리다이렉트
  if (AUTH_PAGES.includes(pathname)) {
    if (user) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  // API 라우트 인증 체크
  if (pathname.startsWith('/api/')) {
    const isProtected = PROTECTED_API_ROUTES.some(route =>
      pathname.startsWith(route)
    );

    if (isProtected && !user) {
      return NextResponse.json(
        { success: false, error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 레이트 리밋
    const isAiEndpoint = AI_ENDPOINTS.some(ep => pathname.startsWith(ep));
    const rateLimitId = user?.id || getClientIp(request);
    const rateLimitType: RateLimitType = isAiEndpoint ? 'ai' : 'general';
    const result = await checkRateLimit(rateLimitId, rateLimitType);

    if (!result.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(result.resetMs / 1000)),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    response.headers.set('X-RateLimit-Remaining', String(result.remaining));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
