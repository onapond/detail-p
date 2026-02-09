import { BASE_STYLES } from '../../base-styles';
import { getIconSvg } from '../../icons';
import { getColorScheme } from '../../color-schemes';

/**
 * Coffee Modern Template
 *
 * The flagship coffee template with a contemporary, clean aesthetic.
 * Features 13 specialized sections covering every aspect of specialty coffee
 * presentation: hero with tasting notes, bean info, flavor profile, roast level,
 * features grid, grind options, story, brewing guide, review highlight,
 * trust badges, CTA, and product info table.
 *
 * Uses CSS custom properties driven by the coffee_modern color scheme.
 */
export function getCoffeeModernTemplate(): string {
  const colors = getColorScheme('coffee', 'modern');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  \${BASE_STYLES}
  <style>
    /* ── Coffee Modern: color-scheme overrides ─────────────────── */
    :root {
      --color-primary: ${colors.primary};
      --color-primary-dark: ${colors.primaryDark};
      --color-primary-light: ${colors.primaryLight};
      --coffee-accent: ${colors.primary};
      --coffee-accent-light: ${colors.accent};
      --coffee-accent-dark: ${colors.primaryDark};
      --coffee-cream: ${colors.cream};
    }

    /* ── Hero ──────────────────────────────────────────────────── */
    .coffee-hero-bg {
      background: ${colors.heroGradient};
    }
    .coffee-hero-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      ${colors.heroBgBefore ? `background: ${colors.heroBgBefore};` : ''}
    }

    .hero-badge {
      background: ${colors.badgeBg};
      border-color: ${colors.badgeBorder};
      color: ${colors.accent};
    }

    .hero-floating-badge {
      background: ${colors.ctaGradient};
      box-shadow: ${colors.ctaShadow};
    }

    /* ── Accent mapping ───────────────────────────────────────── */
    .story-label { color: ${colors.primary}; }
    .stat-number { color: ${colors.primary}; }
    .feature-icon {
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
    }
    .story-image-accent {
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
    }
    .text-accent { color: ${colors.primary}; }

    /* ── Tasting notes tags ───────────────────────────────────── */
    .tasting-wheel {
      display: flex;
      justify-content: center;
      gap: var(--space-2);
      flex-wrap: wrap;
      margin-top: var(--space-4);
    }
    .tasting-note {
      padding: var(--space-1) var(--space-3);
      background: ${colors.badgeBg};
      border: 1px solid ${colors.badgeBorder};
      border-radius: var(--radius-full);
      font-size: var(--text-sm);
      font-weight: 600;
      color: ${colors.accent};
    }

    /* ── Bean info section ────────────────────────────────────── */
    .bean-info-section {
      background: ${colors.cream};
      padding: var(--space-10) var(--space-6);
    }
    .bean-info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-6);
      max-width: 900px;
      margin: 0 auto;
    }
    .bean-info-card {
      background: #ffffff;
      border-radius: var(--radius-xl);
      padding: var(--space-5);
      box-shadow: var(--shadow-md);
    }
    .bean-info-header {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 2px solid ${colors.cream};
    }
    .bean-info-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }
    .bean-info-icon svg { width: 24px; height: 24px; }
    .bean-info-title {
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--color-gray-900);
    }
    .bean-info-list { list-style: none; padding: 0; margin: 0; }
    .bean-info-item {
      display: flex;
      justify-content: space-between;
      padding: var(--space-2) 0;
      border-bottom: 1px solid var(--color-gray-100);
    }
    .bean-info-item:last-child { border-bottom: none; }
    .bean-info-label { color: var(--color-gray-500); font-size: var(--text-sm); }
    .bean-info-value { color: var(--color-gray-900); font-weight: 600; font-size: var(--text-sm); }

    /* ── Flavor profile bars ──────────────────────────────────── */
    .flavor-profile {
      background: #ffffff;
      border-radius: var(--radius-xl);
      padding: var(--space-6);
      box-shadow: var(--shadow-lg);
      max-width: 600px;
      margin: var(--space-8) auto 0;
    }
    .flavor-profile-title {
      text-align: center;
      font-size: var(--text-xl);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: var(--space-5);
    }
    .flavor-bar-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
    }
    .flavor-bar-item:last-child { margin-bottom: 0; }
    .flavor-bar-label {
      width: 60px;
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-gray-700);
      text-align: right;
    }
    .flavor-bar-track {
      flex: 1;
      height: 12px;
      background: var(--color-gray-100);
      border-radius: var(--radius-full);
      overflow: hidden;
    }
    .flavor-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, ${colors.accent} 0%, ${colors.primary} 100%);
      border-radius: var(--radius-full);
      transition: width 0.5s ease;
    }
    .flavor-bar-value {
      width: 30px;
      font-size: var(--text-sm);
      font-weight: 700;
      color: ${colors.primary};
    }

    /* ── Roast level ──────────────────────────────────────────── */
    .roast-section {
      background: linear-gradient(135deg, ${colors.primaryDark} 0%, #1a1410 100%);
      padding: var(--space-10) var(--space-6);
      color: #ffffff;
    }
    .roast-content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    .roast-level-display {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--space-1);
      margin: var(--space-6) 0;
    }
    .roast-bean {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    .roast-bean.light        { background: #d4a574; }
    .roast-bean.medium-light { background: #b8864a; }
    .roast-bean.medium       { background: #8b5a2b; }
    .roast-bean.medium-dark  { background: #5c3d1e; }
    .roast-bean.dark         { background: #3d2815; }
    .roast-bean.active {
      transform: scale(1.3);
      box-shadow: 0 0 20px rgba(212,165,116,0.6);
    }
    .roast-bean.inactive { opacity: 0.3; }
    .roast-labels {
      display: flex;
      justify-content: space-between;
      max-width: 300px;
      margin: 0 auto;
      font-size: var(--text-xs);
      color: rgba(255,255,255,0.6);
    }
    .roast-name-display {
      font-size: var(--text-3xl);
      font-weight: 800;
      color: ${colors.accent};
      margin-top: var(--space-4);
    }
    .roast-description {
      color: rgba(255,255,255,0.7);
      margin-top: var(--space-2);
      font-size: var(--text-base);
    }

    /* ── Grind options ────────────────────────────────────────── */
    .grind-section {
      padding: var(--space-10) var(--space-6);
      background: #ffffff;
    }
    .grind-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--space-3);
      max-width: 900px;
      margin: var(--space-6) auto 0;
    }
    .grind-card {
      background: ${colors.cream};
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      text-align: center;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    .grind-card:hover {
      border-color: ${colors.primary};
      transform: translateY(-4px);
    }
    .grind-icon {
      width: 48px;
      height: 48px;
      margin: 0 auto var(--space-2);
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }
    .grind-icon svg { width: 24px; height: 24px; }
    .grind-name {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: 4px;
    }
    .grind-desc {
      font-size: var(--text-xs);
      color: var(--color-gray-500);
    }

    /* ── Brewing guide ────────────────────────────────────────── */
    .brewing-section {
      padding: var(--space-10) var(--space-6);
      background: ${colors.cream};
    }
    .brewing-tabs {
      display: flex;
      justify-content: center;
      gap: var(--space-2);
      margin-bottom: var(--space-6);
      flex-wrap: wrap;
    }
    .brewing-tab {
      padding: var(--space-2) var(--space-4);
      background: #ffffff;
      border: 2px solid var(--color-gray-200);
      border-radius: var(--radius-full);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-gray-600);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .brewing-tab.active {
      background: ${colors.primary};
      border-color: ${colors.primary};
      color: #ffffff;
    }
    .brewing-card {
      background: #ffffff;
      border-radius: var(--radius-lg);
      padding: var(--space-5);
      text-align: center;
      box-shadow: var(--shadow-md);
    }
    .brewing-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto var(--space-3);
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }
    .brewing-icon svg { width: 32px; height: 32px; }
    .brewing-value {
      font-size: var(--text-2xl);
      font-weight: 800;
      color: ${colors.primary};
    }
    .brewing-label {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      margin-top: var(--space-1);
    }

    /* ── Review highlight ─────────────────────────────────────── */
    .review-highlight {
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
      color: #ffffff;
      padding: var(--space-10) var(--space-6);
      text-align: center;
    }
    .review-quote {
      font-size: var(--text-2xl);
      font-weight: 600;
      max-width: 700px;
      margin: 0 auto var(--space-4);
      line-height: 1.5;
    }
    .review-author {
      font-size: var(--text-base);
      opacity: 0.9;
    }
    .review-stars {
      color: #ffc107;
      font-size: var(--text-xl);
      margin-bottom: var(--space-3);
    }

    /* ── CTA ──────────────────────────────────────────────────── */
    .cta-button {
      background: ${colors.ctaGradient};
      box-shadow: ${colors.ctaShadow};
    }
    .cta-button:hover {
      box-shadow: 0 15px 40px rgba(139,90,43,0.5);
    }

    .trust-badge-icon {
      color: ${colors.primary};
    }

    /* ── Responsive ───────────────────────────────────────────── */
    @media (max-width: 768px) {
      .bean-info-grid { grid-template-columns: 1fr; }
      .grind-grid { grid-template-columns: repeat(3, 1fr); }
      .roast-bean { width: 30px; height: 30px; }
    }
    @media (max-width: 480px) {
      .grind-grid { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
<body>
  <div class="detail-page">

    <!-- ① Hero with tasting notes -->
    <section class="hero coffee-hero-bg">
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-badge">{{BADGE_TEXT}}</span>
          <h1 class="hero-title">{{HEADLINE}}</h1>
          <p class="hero-subtitle">{{SUBHEADLINE}}</p>
          <div class="tasting-wheel">
            {{TASTING_NOTES}}
          </div>
        </div>
        <div class="hero-image-wrap">
          <img src="{{IMAGE_1}}" alt="{{PRODUCT_NAME}}" class="hero-image">
          <div class="hero-floating-badge">
            <span style="font-size: var(--text-sm);">{{BADGE_LABEL}}</span>
            <span style="font-size: var(--text-2xl);">{{BADGE_VALUE}}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ② Bean info section (origin + bean cards) -->
    <section class="bean-info-section">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">BEAN INFORMATION</span>
        <h2 class="headline-lg">원두 상세 정보</h2>
      </div>
      <div class="bean-info-grid">
        <div class="bean-info-card">
          <div class="bean-info-header">
            <div class="bean-info-icon">{{ICON_MAP_PIN}}</div>
            <span class="bean-info-title">원산지 정보</span>
          </div>
          <ul class="bean-info-list">
            {{ORIGIN_INFO_LIST}}
          </ul>
        </div>
        <div class="bean-info-card">
          <div class="bean-info-header">
            <div class="bean-info-icon">{{ICON_BEAN}}</div>
            <span class="bean-info-title">원두 특성</span>
          </div>
          <ul class="bean-info-list">
            {{BEAN_INFO_LIST}}
          </ul>
        </div>
      </div>

      <!-- ③ Flavor profile bars -->
      <div class="flavor-profile">
        <h3 class="flavor-profile-title">Flavor Profile</h3>
        {{FLAVOR_BARS}}
      </div>
    </section>

    <!-- ④ Roast level display -->
    <section class="roast-section">
      <div class="roast-content">
        <span class="story-label" style="color: ${colors.accent};">ROASTING LEVEL</span>
        <h2 class="headline-lg" style="color: #ffffff;">로스팅 레벨</h2>
        <div class="roast-level-display">
          {{ROAST_BEANS}}
        </div>
        <div class="roast-labels">
          <span>라이트</span>
          <span>다크</span>
        </div>
        <div class="roast-name-display">{{ROAST_NAME}}</div>
        <p class="roast-description">{{ROAST_DESCRIPTION}}</p>
      </div>
    </section>

    <!-- ⑤ Features grid -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">SPECIAL FEATURES</span>
        <h2 class="headline-lg">{{FEATURES_TITLE}}</h2>
      </div>
      <div class="features-grid">
        {{FEATURE_CARDS}}
      </div>
    </section>

    <!-- ⑥ Grind options -->
    <section class="grind-section">
      <div style="text-align: center; margin-bottom: var(--space-4);">
        <span class="story-label">GRIND OPTIONS</span>
        <h2 class="headline-lg">분쇄 옵션 선택</h2>
        <p class="body-md" style="margin-top: var(--space-2);">추출 방식에 맞는 분쇄도를 선택하세요</p>
      </div>
      <div class="grind-grid">
        {{GRIND_OPTIONS}}
      </div>
    </section>

    <!-- ⑦ Story section -->
    <section class="section section-gray">
      <div class="story-section">
        <div class="story-image-wrap">
          <div class="story-image-accent"></div>
          <img src="{{IMAGE_2}}" alt="원두 스토리" class="story-image">
        </div>
        <div class="story-content">
          <span class="story-label">OUR STORY</span>
          <h2 class="story-title">{{STORY_TITLE_1}}</h2>
          <p class="story-text">{{STORY_TEXT_1}}</p>
        </div>
      </div>
    </section>

    <!-- ⑧ Brewing guide -->
    <section class="brewing-section">
      <div style="text-align: center; margin-bottom: var(--space-6);">
        <span class="story-label">BREWING GUIDE</span>
        <h2 class="headline-lg">완벽한 한 잔을 위한 추출 가이드</h2>
      </div>
      <div class="brewing-tabs">
        <span class="brewing-tab active">핸드드립</span>
        <span class="brewing-tab">에스프레소</span>
        <span class="brewing-tab">프렌치프레스</span>
        <span class="brewing-tab">콜드브루</span>
      </div>
      <div class="features-grid">
        <div class="brewing-card">
          <div class="brewing-icon">{{ICON_THERMOMETER}}</div>
          <div class="brewing-value">{{BREW_TEMP}}</div>
          <div class="brewing-label">추출 온도</div>
        </div>
        <div class="brewing-card">
          <div class="brewing-icon">{{ICON_SCALE}}</div>
          <div class="brewing-value">{{BREW_RATIO}}</div>
          <div class="brewing-label">커피 : 물 비율</div>
        </div>
        <div class="brewing-card">
          <div class="brewing-icon">{{ICON_TIMER}}</div>
          <div class="brewing-value">{{BREW_TIME}}</div>
          <div class="brewing-label">추출 시간</div>
        </div>
      </div>
    </section>

    <!-- ⑨ Review highlight -->
    <section class="review-highlight">
      <div class="review-stars">{{REVIEW_STARS}}</div>
      <p class="review-quote">"{{REVIEW_QUOTE}}"</p>
      <p class="review-author">- {{REVIEW_AUTHOR}}</p>
    </section>

    <!-- ⑩ Trust badges -->
    <section class="trust-section">
      <span class="story-label">WHY CHOOSE US</span>
      <h2 class="headline-lg">{{TRUST_TITLE}}</h2>
      <div class="trust-badges">
        {{TRUST_BADGES}}
      </div>
    </section>

    <!-- ⑪ CTA section -->
    <section class="cta-section" style="background: linear-gradient(135deg, ${colors.primaryDark} 0%, #1a1410 100%);">
      <h2 class="cta-title">{{CTA_TITLE}}</h2>
      <p class="cta-subtitle">{{CTA_SUBTITLE}}</p>
      <a href="#" class="cta-button">
        <span>{{CTA_BUTTON}}</span>
        {{ICON_ARROW_RIGHT}}
      </a>
      <p class="cta-note">{{CTA_NOTE}}</p>
    </section>

    <!-- ⑫ Product info table -->
    <section class="section section-light">
      <h2 class="headline-md" style="margin-bottom: var(--space-4);">제품 상세 정보</h2>
      <table class="info-table">
        {{PRODUCT_INFO_TABLE}}
      </table>
    </section>

  </div>
</body>
</html>`;
}
