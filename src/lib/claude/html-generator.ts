import { createAnthropicClient, CLAUDE_MODEL } from './client';
import { TEMPLATE_CONTENT_PROMPT } from './prompts';
import { getHtmlTemplate, getIconSvg, ICON_SVG_MAP } from '@/lib/templates/html-templates';
import type { ProductAnalysis, CopywritingResult, Template } from '@/types';

// 템플릿 콘텐츠 타입
interface TemplateContent {
  badgeText: string;
  headline: string;
  subheadline: string;
  featuresTitle: string;
  features: Array<{ icon: string; title: string; description: string }>;
  storyLabel: string;
  storyTitle: string;
  storyText: string;
  stats: Array<{ number: string; label: string }>;
  trustTitle: string;
  trustBadges: Array<{ icon: string; text: string }>;
  reviews: Array<{ stars: number; text: string; author: string }>;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  ctaNote: string;
  productInfo: Array<{ label: string; value: string }>;
  badgeLabel: string;
  badgeValue: string;
  // 카테고리별
  tastingNotes?: string[];
  roastLevel?: number;
  roastName?: string;
  certifications?: string[];
  functionalClaim?: string;
  ingredients?: Array<{ amount: string; name: string }>;
  benefitsTitle?: string;
  benefitsText?: string;
  benefitsList?: string[];
  dosageItems?: Array<{ time: string; icon: string; text: string }>;
  cautionNotes?: string;
  tasteTags?: string[];
}

/**
 * 템플릿 기반 상세페이지 HTML 생성
 * 1. AI가 템플릿용 콘텐츠 JSON 생성
 * 2. 미리 디자인된 HTML 템플릿에 콘텐츠 삽입
 */
export async function generateDetailPageHTML(
  analysis: ProductAnalysis,
  copywriting: CopywritingResult,
  imageCount: number,
  template: Template
): Promise<string> {
  const client = createAnthropicClient();

  // 1. AI에게 템플릿 콘텐츠 생성 요청
  const prompt = TEMPLATE_CONTENT_PROMPT
    .replace('{PRODUCT_DATA}', JSON.stringify(analysis, null, 2))
    .replace('{COPYWRITING_DATA}', JSON.stringify(copywriting, null, 2))
    .replace('{CATEGORY}', analysis.category);

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const textContent = response.content.find((block) => block.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  // JSON 파싱
  let contentJson = textContent.text.trim();
  // 마크다운 코드블록 제거
  contentJson = contentJson.replace(/^```json\s*/i, '').replace(/^```\s*/i, '');
  contentJson = contentJson.replace(/\s*```$/i, '');

  let content: TemplateContent;
  try {
    content = JSON.parse(contentJson);
  } catch (e) {
    console.error('Failed to parse content JSON:', contentJson);
    throw new Error('템플릿 콘텐츠 생성 실패');
  }

  // 2. HTML 템플릿 가져오기
  let html = getHtmlTemplate(analysis.category);

  // 3. 기본 placeholder 교체
  html = html.replace(/\{\{PRODUCT_NAME\}\}/g, analysis.productName || '제품명');
  html = html.replace(/\{\{BADGE_TEXT\}\}/g, content.badgeText || 'PREMIUM');
  html = html.replace(/\{\{HEADLINE\}\}/g, content.headline || copywriting.headline);
  html = html.replace(/\{\{SUBHEADLINE\}\}/g, content.subheadline || copywriting.subheadline);
  html = html.replace(/\{\{BADGE_LABEL\}\}/g, content.badgeLabel || 'BEST');
  html = html.replace(/\{\{BADGE_VALUE\}\}/g, content.badgeValue || '#1');

  // 특징 섹션
  html = html.replace(/\{\{FEATURES_TITLE\}\}/g, content.featuresTitle || '이런 점이 특별해요');
  const featureCards = (content.features || []).map(f => {
    const iconSvg = getIconSvg(f.icon, 32, '#ffffff');
    return `
    <div class="feature-card">
      <div class="feature-icon">${iconSvg}</div>
      <h3 class="feature-title">${f.title}</h3>
      <p class="feature-desc">${f.description}</p>
    </div>
  `;
  }).join('');
  html = html.replace(/\{\{FEATURE_CARDS\}\}/g, featureCards);

  // 스토리 섹션
  html = html.replace(/\{\{STORY_LABEL\}\}/g, content.storyLabel || 'OUR STORY');
  html = html.replace(/\{\{STORY_TITLE\}\}/g, content.storyTitle || '특별한 이야기');
  html = html.replace(/\{\{STORY_TITLE_1\}\}/g, content.storyTitle || '특별한 이야기');
  html = html.replace(/\{\{STORY_TEXT\}\}/g, content.storyText || '');
  html = html.replace(/\{\{STORY_TEXT_1\}\}/g, content.storyText || '');

  // Stats
  const statsItems = (content.stats || []).map(s => `
    <div class="stat-item">
      <div class="stat-number">${s.number}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
  html = html.replace(/\{\{STATS_ITEMS\}\}/g, statsItems);

  // 신뢰 섹션
  html = html.replace(/\{\{TRUST_TITLE\}\}/g, content.trustTitle || '믿을 수 있는 이유');
  const trustBadges = (content.trustBadges || []).map(t => {
    const iconSvg = getIconSvg(t.icon, 36, 'currentColor');
    return `
    <div class="trust-badge">
      <div class="trust-badge-icon">${iconSvg}</div>
      <span class="trust-badge-text">${t.text}</span>
    </div>
  `;
  }).join('');
  html = html.replace(/\{\{TRUST_BADGES\}\}/g, trustBadges);

  // 리뷰 섹션
  const reviewCards = (content.reviews || []).map(r => `
    <div class="review-card">
      <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      <p class="review-text">"${r.text}"</p>
      <p class="review-author">- ${r.author}</p>
    </div>
  `).join('');
  html = html.replace(/\{\{REVIEW_CARDS\}\}/g, reviewCards);

  // CTA 섹션
  html = html.replace(/\{\{CTA_TITLE\}\}/g, content.ctaTitle || '지금 바로 시작하세요');
  html = html.replace(/\{\{CTA_SUBTITLE\}\}/g, content.ctaSubtitle || '');
  html = html.replace(/\{\{CTA_BUTTON\}\}/g, content.ctaButton || '구매하기');
  html = html.replace(/\{\{CTA_NOTE\}\}/g, content.ctaNote || '');

  // 제품 정보 테이블
  const productInfoRows = (content.productInfo || []).map(p => `
    <tr>
      <th>${p.label}</th>
      <td>${p.value}</td>
    </tr>
  `).join('');
  html = html.replace(/\{\{PRODUCT_INFO_TABLE\}\}/g, productInfoRows);

  // 카테고리별 특화 콘텐츠
  if (analysis.category === 'coffee') {
    // 테이스팅 노트
    const tastingNotes = (content.tastingNotes || []).map(n =>
      `<span class="tasting-note">${n}</span>`
    ).join('');
    html = html.replace(/\{\{TASTING_NOTES\}\}/g, tastingNotes);
    html = html.replace(/\{\{ROAST_LEVEL\}\}/g, String(content.roastLevel || 50));
    html = html.replace(/\{\{ROAST_NAME\}\}/g, content.roastName || '미디엄');
  }

  if (analysis.category === 'health_supplement') {
    // 인증 배지 with check icon
    const checkIconSvg = getIconSvg('check-circle', 16, 'currentColor');
    const certBadges = (content.certifications || []).map(c =>
      `<span class="certification-badge">${checkIconSvg} ${c}</span>`
    ).join(' ');
    html = html.replace(/\{\{CERTIFICATION_BADGES\}\}/g, certBadges);
    html = html.replace(/\{\{FUNCTIONAL_CLAIM\}\}/g, content.functionalClaim || '');

    // 성분 카드
    const ingredientCards = (content.ingredients || []).map(i => `
      <div class="ingredient-card">
        <div class="ingredient-amount">${i.amount}</div>
        <div class="ingredient-name">${i.name}</div>
      </div>
    `).join('');
    html = html.replace(/\{\{INGREDIENT_CARDS\}\}/g, ingredientCards);
    html = html.replace(/\{\{INGREDIENTS_TITLE\}\}/g, '핵심 성분');

    // 효능
    html = html.replace(/\{\{BENEFITS_TITLE\}\}/g, content.benefitsTitle || '기대 효과');
    html = html.replace(/\{\{BENEFITS_TEXT\}\}/g, content.benefitsText || '');
    const benefitCheckIcon = getIconSvg('check', 20, 'currentColor');
    const benefitsList = (content.benefitsList || []).map(b =>
      `<li class="benefits-list-item">${benefitCheckIcon} ${b}</li>`
    ).join('');
    html = html.replace(/\{\{BENEFITS_LIST\}\}/g, benefitsList);

    // 섭취 방법 - use icon name from AI response
    const dosageItems = (content.dosageItems || []).map(d => {
      const dosageIconSvg = getIconSvg(d.icon || 'pill', 32, '#ffffff');
      return `
      <div class="dosage-item">
        <div class="dosage-time">${d.time}</div>
        <div class="dosage-icon">${dosageIconSvg}</div>
        <div class="dosage-text">${d.text}</div>
      </div>
    `;
    }).join('');
    html = html.replace(/\{\{DOSAGE_ITEMS\}\}/g, dosageItems);
    html = html.replace(/\{\{CAUTION_NOTES\}\}/g, content.cautionNotes || '');

    // Warning icon for caution section
    const alertTriangleIcon = getIconSvg('alert-triangle', 24, 'currentColor');
    html = html.replace(/\{\{ICON_ALERT_TRIANGLE\}\}/g, alertTriangleIcon);
  }

  // 일반 식품 태그
  const tasteTags = (content.tasteTags || []).map(t =>
    `<span class="taste-tag">${t}</span>`
  ).join('');
  html = html.replace(/\{\{TASTE_TAGS\}\}/g, tasteTags);

  // Static icon replacements for templates
  // Coffee template - brewing guide icons
  html = html.replace(/\{\{ICON_THERMOMETER\}\}/g, getIconSvg('thermometer', 32, '#ffffff'));
  html = html.replace(/\{\{ICON_SCALE\}\}/g, getIconSvg('scale', 32, '#ffffff'));
  html = html.replace(/\{\{ICON_TIMER\}\}/g, getIconSvg('timer', 32, '#ffffff'));

  // CTA arrow icon
  html = html.replace(/\{\{ICON_ARROW_RIGHT\}\}/g, getIconSvg('arrow-right', 20, '#ffffff'));

  // Health template - alert icon (if not already replaced)
  if (!html.includes('ICON_ALERT_TRIANGLE')) {
    html = html.replace(/\{\{ICON_ALERT_TRIANGLE\}\}/g, getIconSvg('alert-triangle', 24, 'currentColor'));
  }

  // 이미지 placeholder (나중에 실제 URL로 교체)
  for (let i = 1; i <= Math.max(imageCount, 3); i++) {
    html = html.replace(new RegExp(`\\{\\{IMAGE_${i}\\}\\}`, 'g'), `{{IMAGE_${i}}}`);
  }

  return html;
}

// HTML에서 placeholder를 실제 이미지로 교체
export function replaceImagePlaceholders(html: string, imageUrls: string[]): string {
  let result = html;
  imageUrls.forEach((url, index) => {
    result = result.replace(new RegExp(`\\{\\{IMAGE_${index + 1}\\}\\}`, 'g'), url);
  });
  // 남은 placeholder는 첫 번째 이미지로 대체
  if (imageUrls.length > 0) {
    result = result.replace(/\{\{IMAGE_\d+\}\}/g, imageUrls[0]);
  }
  return result;
}

// Generate HTML with specific modifications
export async function refineHTML(
  currentHtml: string,
  feedback: string
): Promise<string> {
  const client = createAnthropicClient();

  const truncatedHtml = currentHtml.length > 50000
    ? currentHtml.substring(0, 50000) + '\n... (truncated)'
    : currentHtml;

  const prompt = `다음은 현재 상세페이지 HTML입니다:

\`\`\`html
${truncatedHtml}
\`\`\`

사용자 피드백:
${feedback}

피드백을 반영하여 HTML을 수정해주세요.
기존 디자인 시스템(색상, 그라데이션, 그림자, 폰트 등)을 유지하면서 수정하세요.
완성된 HTML 코드만 응답해주세요. 설명이나 마크다운 없이 순수 HTML만 출력하세요.`;

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 8192,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const textContent = response.content.find((block) => block.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  let html = textContent.text;
  html = html.replace(/^```html\s*/i, '').replace(/^```\s*/i, '');
  html = html.replace(/\s*```$/i, '');

  return html;
}
