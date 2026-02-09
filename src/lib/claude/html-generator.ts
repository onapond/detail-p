import { createAnthropicClient, CLAUDE_MODEL } from './client';
import { TEMPLATE_CONTENT_PROMPT } from './prompts';
import { extractJson } from './json-parser';
import { getTemplateHtml, getIconSvg } from '@/lib/templates';
import { withRetry } from '@/lib/retry';
import { trackUsage } from '@/lib/usage-tracker';
import { escapeHtml } from '@/lib/utils';
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
  // 커피 카테고리
  tastingNotes?: string[];
  roastLevel?: number;
  roastName?: string;
  roastDescription?: string;
  originInfo?: Array<{ label: string; value: string }>;
  beanInfo?: Array<{ label: string; value: string }>;
  flavorProfile?: Array<{ name: string; value: number }>;
  grindOptions?: Array<{ name: string; desc: string }>;
  brewingGuide?: { temp: string; ratio: string; time: string };
  featuredReview?: { stars: number; quote: string; author: string };
  certifications?: string[];
  functionalClaim?: string;
  ingredients?: Array<{ amount: string; name: string }>;
  benefitsTitle?: string;
  benefitsText?: string;
  benefitsList?: string[];
  dosageItems?: Array<{ time: string; icon: string; text: string }>;
  cautionNotes?: string;
  allergenWarning?: string;
  clinicalEvidence?: string;
  tasteTags?: string[];
  // 가공식품 카테고리
  recipeSuggestions?: Array<{ title: string; description: string }>;
  nutritionHighlights?: Array<{ label: string; value: string; unit?: string }>;
  allergenInfo?: string;
  cookingProcess?: Array<{ step: string; description: string }>;
  servingSuggestion?: string;
  // 음료 카테고리
  servingTemp?: string;
  pairings?: string[];
  servingSuggestions?: Array<{ title: string; description: string }>;
  seasonTpo?: string;
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
  return withRetry(async () => {
    const client = createAnthropicClient();

    // 1. AI에게 템플릿 콘텐츠 생성 요청
    const prompt = TEMPLATE_CONTENT_PROMPT
      .replace('{PRODUCT_DATA}', JSON.stringify(analysis, null, 2))
      .replace('{COPYWRITING_DATA}', JSON.stringify(copywriting, null, 2))
      .replace('{CATEGORY}', analysis.category)
      .replace('{STYLE}', template.style || 'modern');

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

    // Track usage
    if (response.usage) {
      trackUsage('/api/generate-html', CLAUDE_MODEL, response.usage.input_tokens, response.usage.output_tokens);
    }

    const textContent = response.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    // JSON 파싱 (안정적인 파서 사용)
    const content = extractJson<TemplateContent>(textContent.text);

    // 2. HTML 템플릿 가져오기 (새 레지스트리 기반)
    let html = await getTemplateHtml(template.id);

    // 3. placeholder 교체
    html = replacePlaceholders(html, content, analysis, copywriting, imageCount);

    return html;
  });
}

/**
 * 모든 placeholder를 콘텐츠로 교체
 */
function replacePlaceholders(
  html: string,
  content: TemplateContent,
  analysis: ProductAnalysis,
  copywriting: CopywritingResult,
  imageCount: number
): string {
  // 기본 placeholder 교체 (XSS 방지를 위해 escapeHtml 적용)
  html = html.replace(/\{\{PRODUCT_NAME\}\}/g, escapeHtml(analysis.productName || '제품명'));
  html = html.replace(/\{\{BADGE_TEXT\}\}/g, escapeHtml(content.badgeText || 'PREMIUM'));
  html = html.replace(/\{\{HEADLINE\}\}/g, escapeHtml(content.headline || copywriting.headline));
  html = html.replace(/\{\{SUBHEADLINE\}\}/g, escapeHtml(content.subheadline || copywriting.subheadline));
  html = html.replace(/\{\{BADGE_LABEL\}\}/g, escapeHtml(content.badgeLabel || 'BEST'));
  html = html.replace(/\{\{BADGE_VALUE\}\}/g, escapeHtml(content.badgeValue || '#1'));

  // 특징 섹션
  html = html.replace(/\{\{FEATURES_TITLE\}\}/g, escapeHtml(content.featuresTitle || '이런 점이 특별해요'));
  const featureCards = (content.features || []).map(f => {
    const iconSvg = getIconSvg(f.icon, 32, '#ffffff');
    return `
    <div class="feature-card">
      <div class="feature-icon">${iconSvg}</div>
      <h3 class="feature-title">${escapeHtml(f.title)}</h3>
      <p class="feature-desc">${escapeHtml(f.description)}</p>
    </div>
  `;
  }).join('');
  html = html.replace(/\{\{FEATURE_CARDS\}\}/g, featureCards);

  // 스토리 섹션
  html = html.replace(/\{\{STORY_LABEL\}\}/g, escapeHtml(content.storyLabel || 'OUR STORY'));
  html = html.replace(/\{\{STORY_TITLE\}\}/g, escapeHtml(content.storyTitle || '특별한 이야기'));
  html = html.replace(/\{\{STORY_TITLE_1\}\}/g, escapeHtml(content.storyTitle || '특별한 이야기'));
  html = html.replace(/\{\{STORY_TEXT\}\}/g, escapeHtml(content.storyText || ''));
  html = html.replace(/\{\{STORY_TEXT_1\}\}/g, escapeHtml(content.storyText || ''));

  // Stats
  const statsItems = (content.stats || []).map(s => `
    <div class="stat-item">
      <div class="stat-number">${escapeHtml(s.number)}</div>
      <div class="stat-label">${escapeHtml(s.label)}</div>
    </div>
  `).join('');
  html = html.replace(/\{\{STATS_ITEMS\}\}/g, statsItems);

  // 신뢰 섹션
  html = html.replace(/\{\{TRUST_TITLE\}\}/g, escapeHtml(content.trustTitle || '믿을 수 있는 이유'));
  const trustBadges = (content.trustBadges || []).map(t => {
    const iconSvg = getIconSvg(t.icon, 36, 'currentColor');
    return `
    <div class="trust-badge">
      <div class="trust-badge-icon">${iconSvg}</div>
      <span class="trust-badge-text">${escapeHtml(t.text)}</span>
    </div>
  `;
  }).join('');
  html = html.replace(/\{\{TRUST_BADGES\}\}/g, trustBadges);

  // 리뷰 섹션
  const reviewCards = (content.reviews || []).map(r => {
    const safeStars = Math.max(0, Math.min(5, Math.floor(r.stars)));
    return `
    <div class="review-card">
      <div class="review-stars">${'★'.repeat(safeStars)}${'☆'.repeat(5 - safeStars)}</div>
      <p class="review-text">"${escapeHtml(r.text)}"</p>
      <p class="review-author">- ${escapeHtml(r.author)}</p>
    </div>
  `;
  }).join('');
  html = html.replace(/\{\{REVIEW_CARDS\}\}/g, reviewCards);

  // CTA 섹션
  html = html.replace(/\{\{CTA_TITLE\}\}/g, escapeHtml(content.ctaTitle || '지금 바로 시작하세요'));
  html = html.replace(/\{\{CTA_SUBTITLE\}\}/g, escapeHtml(content.ctaSubtitle || ''));
  html = html.replace(/\{\{CTA_BUTTON\}\}/g, escapeHtml(content.ctaButton || '구매하기'));
  html = html.replace(/\{\{CTA_NOTE\}\}/g, escapeHtml(content.ctaNote || ''));

  // 제품 정보 테이블
  const productInfoRows = (content.productInfo || []).map(p => `
    <tr>
      <th>${escapeHtml(p.label)}</th>
      <td>${escapeHtml(p.value)}</td>
    </tr>
  `).join('');
  html = html.replace(/\{\{PRODUCT_INFO_TABLE\}\}/g, productInfoRows);

  // 카테고리별 특화 콘텐츠
  html = replaceCoffeePlaceholders(html, content, analysis);
  html = replaceHealthPlaceholders(html, content, analysis);
  html = replaceFoodPlaceholders(html, content, analysis);
  html = replaceBeveragePlaceholders(html, content, analysis);

  // 공통 맛 태그
  const tasteTags = (content.tasteTags || []).map(t =>
    `<span class="taste-tag">${escapeHtml(t)}</span>`
  ).join('');
  html = html.replace(/\{\{TASTE_TAGS\}\}/g, tasteTags);

  // Static icon replacements
  html = html.replace(/\{\{ICON_THERMOMETER\}\}/g, getIconSvg('thermometer', 32, '#ffffff'));
  html = html.replace(/\{\{ICON_SCALE\}\}/g, getIconSvg('scale', 32, '#ffffff'));
  html = html.replace(/\{\{ICON_TIMER\}\}/g, getIconSvg('timer', 32, '#ffffff'));
  html = html.replace(/\{\{ICON_ARROW_RIGHT\}\}/g, getIconSvg('arrow-right', 20, '#ffffff'));
  html = html.replace(/\{\{ICON_ALERT_TRIANGLE\}\}/g, getIconSvg('alert-triangle', 24, 'currentColor'));
  html = html.replace(/\{\{ICON_MAP_PIN\}\}/g, getIconSvg('map-pin', 24, '#ffffff'));
  html = html.replace(/\{\{ICON_BEAN\}\}/g, getIconSvg('bean', 24, '#ffffff'));
  html = html.replace(/\{\{ICON_UTENSILS\}\}/g, getIconSvg('utensils', 24, '#ffffff'));
  html = html.replace(/\{\{ICON_DROPLETS\}\}/g, getIconSvg('droplets', 24, '#ffffff'));
  html = html.replace(/\{\{ICON_CHERRY\}\}/g, getIconSvg('cherry', 24, '#ffffff'));
  html = html.replace(/\{\{ICON_LEAF\}\}/g, getIconSvg('leaf', 24, '#ffffff'));
  html = html.replace(/\{\{ICON_SHIELD_CHECK\}\}/g, getIconSvg('shield-check', 24, '#ffffff'));
  html = html.replace(/\{\{ICON_CHECK\}\}/g, getIconSvg('check', 20, 'currentColor'));
  html = html.replace(/\{\{ICON_CHECK_CIRCLE\}\}/g, getIconSvg('check-circle', 16, 'currentColor'));
  html = html.replace(/\{\{ICON_COFFEE\}\}/g, getIconSvg('coffee', 24, '#ffffff'));

  // 이미지 placeholder (나중에 실제 URL로 교체)
  for (let i = 1; i <= Math.max(imageCount, 3); i++) {
    html = html.replace(new RegExp(`\\{\\{IMAGE_${i}\\}\\}`, 'g'), `{{IMAGE_${i}}}`);
  }

  return html;
}

/**
 * 커피 카테고리 placeholder
 */
function replaceCoffeePlaceholders(
  html: string,
  content: TemplateContent,
  analysis: ProductAnalysis
): string {
  if (analysis.category !== 'coffee') return html;

  // 테이스팅 노트
  const tastingNotes = (content.tastingNotes || []).map(n =>
    `<span class="tasting-note">${escapeHtml(n)}</span>`
  ).join('');
  html = html.replace(/\{\{TASTING_NOTES\}\}/g, tastingNotes);
  html = html.replace(/\{\{ROAST_NAME\}\}/g, escapeHtml(content.roastName || '미디엄'));
  html = html.replace(/\{\{ROAST_DESCRIPTION\}\}/g, escapeHtml(content.roastDescription || '균형 잡힌 풍미'));

  // 원산지 정보 리스트
  const originInfoList = (content.originInfo || []).map(item => `
    <li class="bean-info-item">
      <span class="bean-info-label">${escapeHtml(item.label)}</span>
      <span class="bean-info-value">${escapeHtml(item.value)}</span>
    </li>
  `).join('');
  html = html.replace(/\{\{ORIGIN_INFO_LIST\}\}/g, originInfoList);

  // 원두 정보 리스트
  const beanInfoList = (content.beanInfo || []).map(item => `
    <li class="bean-info-item">
      <span class="bean-info-label">${escapeHtml(item.label)}</span>
      <span class="bean-info-value">${escapeHtml(item.value)}</span>
    </li>
  `).join('');
  html = html.replace(/\{\{BEAN_INFO_LIST\}\}/g, beanInfoList);

  // 플레이버 프로필 바
  const flavorBars = (content.flavorProfile || []).map(f => {
    const safeValue = Math.max(0, Math.min(100, Math.floor(Number(f.value) || 0)));
    return `
    <div class="flavor-bar-item">
      <span class="flavor-bar-label">${escapeHtml(f.name)}</span>
      <div class="flavor-bar-track">
        <div class="flavor-bar-fill" style="width: ${safeValue}%;"></div>
      </div>
      <span class="flavor-bar-value">${safeValue}</span>
    </div>
  `;
  }).join('');
  html = html.replace(/\{\{FLAVOR_BARS\}\}/g, flavorBars);

  // 로스팅 레벨 빈 디스플레이 (1-5)
  const roastLevel = content.roastLevel || 3;
  const roastBeans = [1, 2, 3, 4, 5].map(level => {
    const isActive = level === roastLevel;
    const levelClass = level === 1 ? 'light' : level === 2 ? 'medium-light' : level === 3 ? 'medium' : level === 4 ? 'medium-dark' : 'dark';
    const stateClass = isActive ? 'active' : 'inactive';
    return `<div class="roast-bean ${levelClass} ${stateClass}"></div>`;
  }).join('');
  html = html.replace(/\{\{ROAST_BEANS\}\}/g, roastBeans);

  // 분쇄 옵션
  const coffeeIconSvg = getIconSvg('coffee', 24, '#ffffff');
  const grindOptions = (content.grindOptions || [
    { name: '홀빈', desc: '그라인더 소유자' },
    { name: '에스프레소', desc: '가정용 머신' },
    { name: '핸드드립', desc: '푸어오버' },
    { name: '프렌치프레스', desc: '침출식' },
    { name: '콜드브루', desc: '저온 추출' }
  ]).map(opt => `
    <div class="grind-card">
      <div class="grind-icon">${coffeeIconSvg}</div>
      <div class="grind-name">${escapeHtml(opt.name)}</div>
      <div class="grind-desc">${escapeHtml(opt.desc)}</div>
    </div>
  `).join('');
  html = html.replace(/\{\{GRIND_OPTIONS\}\}/g, grindOptions);

  // 추출 가이드
  const brew = content.brewingGuide || { temp: '92-96°C', ratio: '1:15', time: '2분 30초' };
  html = html.replace(/\{\{BREW_TEMP\}\}/g, escapeHtml(brew.temp));
  html = html.replace(/\{\{BREW_RATIO\}\}/g, escapeHtml(brew.ratio));
  html = html.replace(/\{\{BREW_TIME\}\}/g, escapeHtml(brew.time));

  // 대표 리뷰
  const review = content.featuredReview || { stars: 5, quote: '정말 맛있는 커피입니다!', author: '커피러버 김**' };
  const safeReviewStars = Math.max(0, Math.min(5, Math.floor(review.stars)));
  html = html.replace(/\{\{REVIEW_STARS\}\}/g, '★'.repeat(safeReviewStars) + '☆'.repeat(5 - safeReviewStars));
  html = html.replace(/\{\{REVIEW_QUOTE\}\}/g, escapeHtml(review.quote));
  html = html.replace(/\{\{REVIEW_AUTHOR\}\}/g, escapeHtml(review.author));

  return html;
}

/**
 * 건강기능식품 카테고리 placeholder
 */
function replaceHealthPlaceholders(
  html: string,
  content: TemplateContent,
  analysis: ProductAnalysis
): string {
  if (analysis.category !== 'health_supplement') return html;

  // 인증 배지
  const checkIconSvg = getIconSvg('check-circle', 16, 'currentColor');
  const certBadges = (content.certifications || []).map(c =>
    `<span class="certification-badge">${checkIconSvg} ${escapeHtml(c)}</span>`
  ).join(' ');
  html = html.replace(/\{\{CERTIFICATION_BADGES\}\}/g, certBadges);
  html = html.replace(/\{\{FUNCTIONAL_CLAIM\}\}/g, escapeHtml(content.functionalClaim || ''));

  // 성분 카드
  const ingredientCards = (content.ingredients || []).map(i => `
    <div class="ingredient-card">
      <div class="ingredient-amount">${escapeHtml(i.amount)}</div>
      <div class="ingredient-name">${escapeHtml(i.name)}</div>
    </div>
  `).join('');
  html = html.replace(/\{\{INGREDIENT_CARDS\}\}/g, ingredientCards);
  html = html.replace(/\{\{INGREDIENTS_TITLE\}\}/g, '핵심 성분');

  // 효능
  html = html.replace(/\{\{BENEFITS_TITLE\}\}/g, escapeHtml(content.benefitsTitle || '기대 효과'));
  html = html.replace(/\{\{BENEFITS_TEXT\}\}/g, escapeHtml(content.benefitsText || ''));
  const benefitCheckIcon = getIconSvg('check', 20, 'currentColor');
  const benefitsList = (content.benefitsList || []).map(b =>
    `<li class="benefits-list-item">${benefitCheckIcon} ${escapeHtml(b)}</li>`
  ).join('');
  html = html.replace(/\{\{BENEFITS_LIST\}\}/g, benefitsList);

  // 섭취 방법
  const dosageItems = (content.dosageItems || []).map(d => {
    const dosageIconSvg = getIconSvg(d.icon || 'pill', 32, '#ffffff');
    return `
    <div class="dosage-item">
      <div class="dosage-time">${escapeHtml(d.time)}</div>
      <div class="dosage-icon">${dosageIconSvg}</div>
      <div class="dosage-text">${escapeHtml(d.text)}</div>
    </div>
  `;
  }).join('');
  html = html.replace(/\{\{DOSAGE_ITEMS\}\}/g, dosageItems);
  html = html.replace(/\{\{CAUTION_NOTES\}\}/g, escapeHtml(content.cautionNotes || ''));

  // 알레르기 경고
  html = html.replace(/\{\{ALLERGEN_WARNING\}\}/g, escapeHtml(content.allergenWarning || ''));

  // 임상 근거
  html = html.replace(/\{\{CLINICAL_EVIDENCE\}\}/g, escapeHtml(content.clinicalEvidence || ''));

  return html;
}

/**
 * 가공식품 카테고리 placeholder
 */
function replaceFoodPlaceholders(
  html: string,
  content: TemplateContent,
  analysis: ProductAnalysis
): string {
  if (analysis.category !== 'processed_food') return html;

  // 레시피 제안 카드
  const recipeCards = (content.recipeSuggestions || []).map((r, i) => `
    <div class="recipe-card">
      <div class="recipe-number">${i + 1}</div>
      <h4 class="recipe-title">${escapeHtml(r.title)}</h4>
      <p class="recipe-desc">${escapeHtml(r.description)}</p>
    </div>
  `).join('');
  html = html.replace(/\{\{RECIPE_CARDS\}\}/g, recipeCards);

  // 영양 정보 그리드
  const nutritionItems = (content.nutritionHighlights || []).map(n => `
    <div class="nutrition-item">
      <div class="nutrition-value">${escapeHtml(n.value)}${n.unit ? `<span class="nutrition-unit">${escapeHtml(n.unit)}</span>` : ''}</div>
      <div class="nutrition-label">${escapeHtml(n.label)}</div>
    </div>
  `).join('');
  html = html.replace(/\{\{NUTRITION_ITEMS\}\}/g, nutritionItems);

  // 알레르기 정보
  html = html.replace(/\{\{ALLERGEN_INFO\}\}/g, escapeHtml(content.allergenInfo || ''));

  // 조리 프로세스
  const cookingSteps = (content.cookingProcess || []).map((step, i) => `
    <div class="cooking-step">
      <div class="step-number">${i + 1}</div>
      <div class="step-content">
        <h4 class="step-title">${escapeHtml(step.step)}</h4>
        <p class="step-desc">${escapeHtml(step.description)}</p>
      </div>
    </div>
  `).join('');
  html = html.replace(/\{\{COOKING_STEPS\}\}/g, cookingSteps);

  // 서빙 제안
  html = html.replace(/\{\{SERVING_SUGGESTION\}\}/g, escapeHtml(content.servingSuggestion || ''));

  return html;
}

/**
 * 음료 카테고리 placeholder
 */
function replaceBeveragePlaceholders(
  html: string,
  content: TemplateContent,
  analysis: ProductAnalysis
): string {
  if (analysis.category !== 'beverage') return html;

  // 풍미 프로필 바 (커피와 공유하는 구조)
  const flavorBars = (content.flavorProfile || []).map(f => {
    const safeValue = Math.max(0, Math.min(100, Math.floor(Number(f.value) || 0)));
    return `
    <div class="flavor-bar-item">
      <span class="flavor-bar-label">${escapeHtml(f.name)}</span>
      <div class="flavor-bar-track">
        <div class="flavor-bar-fill" style="width: ${safeValue}%;"></div>
      </div>
      <span class="flavor-bar-value">${safeValue}</span>
    </div>
  `;
  }).join('');
  html = html.replace(/\{\{FLAVOR_BARS\}\}/g, flavorBars);

  // 서빙 온도
  html = html.replace(/\{\{SERVING_TEMP\}\}/g, escapeHtml(content.servingTemp || ''));

  // 페어링 추천
  const pairingTags = (content.pairings || []).map(p =>
    `<span class="pairing-tag">${escapeHtml(p)}</span>`
  ).join('');
  html = html.replace(/\{\{PAIRING_TAGS\}\}/g, pairingTags);

  // 서빙 제안 카드
  const servingCards = (content.servingSuggestions || []).map(s => `
    <div class="serving-card">
      <h4 class="serving-title">${escapeHtml(s.title)}</h4>
      <p class="serving-desc">${escapeHtml(s.description)}</p>
    </div>
  `).join('');
  html = html.replace(/\{\{SERVING_CARDS\}\}/g, servingCards);

  // 시즌/TPO
  html = html.replace(/\{\{SEASON_TPO\}\}/g, escapeHtml(content.seasonTpo || ''));

  // 영양 성분 하이라이트
  const nutritionItems = (content.nutritionHighlights || []).map(n => `
    <div class="nutrition-item">
      <div class="nutrition-value">${escapeHtml(n.value)}${n.unit ? `<span class="nutrition-unit">${escapeHtml(n.unit)}</span>` : ''}</div>
      <div class="nutrition-label">${escapeHtml(n.label)}</div>
    </div>
  `).join('');
  html = html.replace(/\{\{NUTRITION_ITEMS\}\}/g, nutritionItems);

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
  return withRetry(async () => {
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

    // Track usage
    if (response.usage) {
      trackUsage('/api/generate-html/refine', CLAUDE_MODEL, response.usage.input_tokens, response.usage.output_tokens);
    }

    const textContent = response.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    let html = textContent.text;
    html = html.replace(/^```html\s*/i, '').replace(/^```\s*/i, '');
    html = html.replace(/\s*```$/i, '');

    return html;
  });
}
