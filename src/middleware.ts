import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, type RateLimitConfig } from '@/lib/rate-limit';

// AI 생성 엔드포인트 (비용이 높으므로 더 엄격한 제한)
const AI_ENDPOINTS = [
  '/api/analyze',
  '/api/copywriting',
  '/api/generate-html',
  '/api/generate-image',
];

// 엔드포인트별 레이트 리밋 설정
const AI_RATE_LIMIT: RateLimitConfig = {
  windowMs: 60_000,     // 1분
  maxRequests: 5,       // 1분에 5회
};

const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  windowMs: 60_000,     // 1분
  maxRequests: 30,      // 1분에 30회
};

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API 라우트에만 적용
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const ip = getClientIp(request);
  const isAiEndpoint = AI_ENDPOINTS.some(ep => pathname.startsWith(ep));
  const config = isAiEndpoint ? AI_RATE_LIMIT : DEFAULT_RATE_LIMIT;

  // IP + 경로 그룹으로 레이트 리밋 키 생성
  const rateLimitKey = isAiEndpoint ? `${ip}:ai` : `${ip}:general`;
  const result = checkRateLimit(rateLimitKey, config);

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

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Remaining', String(result.remaining));
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
