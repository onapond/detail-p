/**
 * 인메모리 LRU 캐시
 * 동일 이미지 재분석 방지를 위한 분석 결과 캐싱
 * Phase 2에서 Redis로 교체 예정
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const DEFAULT_TTL_MS = 30 * 60 * 1000; // 30분
const DEFAULT_MAX_SIZE = 100;

export class LRUCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private readonly maxSize: number;
  private readonly ttlMs: number;

  constructor(maxSize = DEFAULT_MAX_SIZE, ttlMs = DEFAULT_TTL_MS) {
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    // LRU: 접근된 항목을 맨 뒤로 이동
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key: string, value: T): void {
    // 이미 존재하면 삭제 후 재삽입 (순서 갱신)
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // 최대 크기 초과 시 가장 오래된 항목 제거
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + this.ttlMs,
    });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

/**
 * 문자열의 간단한 해시를 생성합니다.
 * base64 이미지 데이터 캐시 키 생성용
 */
export async function hashString(str: string): Promise<string> {
  // Node.js 환경에서 SHA-256 해시 생성
  const { createHash } = await import('crypto');
  return createHash('sha256').update(str).digest('hex');
}

// 전역 분석 캐시 인스턴스
declare global {
  // eslint-disable-next-line no-var
  var analysisCache: LRUCache<unknown> | undefined;
}

export function getAnalysisCache(): LRUCache<unknown> {
  if (!globalThis.analysisCache) {
    globalThis.analysisCache = new LRUCache<unknown>();
  }
  return globalThis.analysisCache;
}
