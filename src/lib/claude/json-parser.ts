/**
 * 안정적인 JSON 파싱 모듈
 * Claude 응답에서 JSON을 추출하는 3단계 전략:
 * 1. 코드블록 추출 (```json ... ```)
 * 2. 균형 잡힌 브레이스 매칭 (중첩 { } 추적)
 * 3. 직접 파싱 (전체 텍스트가 JSON인 경우)
 */

/**
 * 텍스트에서 JSON 객체를 안전하게 추출합니다.
 * greedy regex 대신 3단계 전략으로 안정적 파싱.
 */
export function extractJson<T>(text: string): T {
  const trimmed = text.trim();

  // 1단계: 코드블록에서 추출
  const codeBlockResult = extractFromCodeBlock(trimmed);
  if (codeBlockResult !== null) {
    try {
      return JSON.parse(codeBlockResult) as T;
    } catch {
      // 코드블록 내용이 유효한 JSON이 아니면 다음 단계로
    }
  }

  // 2단계: 균형 잡힌 브레이스 매칭
  const braceResult = extractBalancedBraces(trimmed);
  if (braceResult !== null) {
    try {
      return JSON.parse(braceResult) as T;
    } catch {
      // 브레이스 매칭 결과가 유효한 JSON이 아니면 다음 단계로
    }
  }

  // 3단계: 전체 텍스트 직접 파싱
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    throw new Error(`JSON 파싱 실패: 유효한 JSON을 찾을 수 없습니다.\n응답 시작: ${trimmed.substring(0, 200)}...`);
  }
}

/**
 * 마크다운 코드블록에서 JSON 콘텐츠를 추출합니다.
 * ```json ... ``` 또는 ``` ... ``` 패턴 지원
 */
function extractFromCodeBlock(text: string): string | null {
  // ```json ... ``` 패턴
  const jsonBlockMatch = text.match(/```json\s*\n?([\s\S]*?)\n?\s*```/i);
  if (jsonBlockMatch) {
    return jsonBlockMatch[1].trim();
  }

  // ``` ... ``` 일반 코드블록
  const codeBlockMatch = text.match(/```\s*\n?([\s\S]*?)\n?\s*```/);
  if (codeBlockMatch) {
    const content = codeBlockMatch[1].trim();
    // 내용이 { 또는 [ 로 시작하는지 확인
    if (content.startsWith('{') || content.startsWith('[')) {
      return content;
    }
  }

  return null;
}

/**
 * 균형 잡힌 중괄호 매칭으로 첫 번째 완전한 JSON 객체를 추출합니다.
 * 문자열 내부의 중괄호는 무시합니다.
 */
function extractBalancedBraces(text: string): string | null {
  const startIdx = text.indexOf('{');
  if (startIdx === -1) return null;

  let depth = 0;
  let inString = false;
  let escapeNext = false;

  for (let i = startIdx; i < text.length; i++) {
    const char = text[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === '\\' && inString) {
      escapeNext = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (char === '{') {
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0) {
        return text.substring(startIdx, i + 1);
      }
    }
  }

  return null;
}
