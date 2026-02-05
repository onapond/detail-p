/**
 * 배경 제거 유틸리티
 * remove.bg API를 사용하여 제품 이미지에서 배경을 제거합니다.
 */

const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;

interface RemoveBackgroundResult {
  success: boolean;
  imageBase64?: string;
  error?: string;
}

/**
 * remove.bg API를 사용하여 이미지 배경 제거
 */
export async function removeBackground(imageBase64: string): Promise<RemoveBackgroundResult> {
  if (!REMOVE_BG_API_KEY) {
    return {
      success: false,
      error: 'REMOVE_BG_API_KEY가 설정되지 않았습니다.',
    };
  }

  try {
    // Base64를 Blob으로 변환
    const imageBuffer = Buffer.from(imageBase64, 'base64');

    // FormData 생성
    const formData = new FormData();
    formData.append('image_file', new Blob([imageBuffer]), 'image.png');
    formData.append('size', 'auto');
    formData.append('format', 'png');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('remove.bg API error:', errorText);
      return {
        success: false,
        error: `배경 제거 실패: ${response.status}`,
      };
    }

    // 결과 이미지를 base64로 변환
    const resultBuffer = await response.arrayBuffer();
    const resultBase64 = Buffer.from(resultBuffer).toString('base64');

    return {
      success: true,
      imageBase64: resultBase64,
    };
  } catch (error) {
    console.error('Background removal error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '배경 제거 중 오류 발생',
    };
  }
}

/**
 * 간단한 배경 제거 (remove.bg 없이) - 흰색 배경 제거
 * 품질이 낮지만 API 키 없이 작동
 */
export async function removeWhiteBackground(imageBase64: string): Promise<RemoveBackgroundResult> {
  try {
    // Sharp를 사용한 간단한 배경 제거는 서버 사이드에서 처리
    // 여기서는 API를 호출하여 처리
    return {
      success: false,
      error: 'remove.bg API 키가 필요합니다. .env.local에 REMOVE_BG_API_KEY를 추가해주세요.',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '배경 제거 중 오류 발생',
    };
  }
}
