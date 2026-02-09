import { BASE_STYLES } from '../../base-styles';
import { getIconSvg } from '../../icons';
import { getColorScheme } from '../../color-schemes';

/**
 * Coffee Classic Template
 *
 * A warm, traditional layout that evokes the cozy atmosphere of an
 * established coffee house. Deeper brown tones, rounded shapes, serif-style
 * heading accents, and a more text-heavy narrative approach distinguish it
 * from the modern variant.
 *
 * Section order:
 *   Hero -> Origin Story -> Bean Info -> Roast Level -> Flavor Profile
 *   -> Features -> Brewing Guide -> Reviews Grid -> Trust -> CTA -> Product Info
 *
 * Reviews are shown as a 2-column card grid rather than a single highlight.
 */
export function getCoffeeClassicTemplate(): string {
  const colors = getColorScheme('coffee', 'classic');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  \${BASE_STYLES}
  <style>
    /* ── Coffee Classic: color-scheme overrides ────────────────── */
    :root {
      --color-primary: ${colors.primary};
      --color-primary-dark: ${colors.primaryDark};
      --color-primary-light: ${colors.primaryLight};
      --coffee-accent: ${colors.primary};
      --coffee-accent-light: ${colors.accent};
      --coffee-accent-dark: ${colors.primaryDark};
      --coffee-cream: ${colors.cream};
    }

    /* ── Typography: serif accents for headings ───────────────── */
    .headline-lg,
    .headline-md,
    .headline-xl,
    .hero-title,
    .story-title,
    .classic-section-title {
      font-family: 'Georgia', 'Noto Serif KR', 'Times New Roman', serif;
    }

    /* ── Hero ──────────────────────────────────────────────────── */
    .coffee-hero-bg {
      background: ${colors.heroGradient};
      border-radius: 0 0 var(--radius-2xl) var(--radius-2xl);
    }
    .coffee-hero-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      ${colors.heroBgBefore ? `background: ${colors.heroBgBefore};` : ''}
      border-radius: 0 0 var(--radius-2xl) var(--radius-2xl);
    }

    .hero-badge {
      background: ${colors.badgeBg};
      border-color: ${colors.badgeBorder};
      color: ${colors.accent};
      border-radius: var(--radius-sm);
    }

    .hero-floating-badge {
      background: ${colors.ctaGradient};
      box-shadow: ${colors.ctaShadow};
      border-radius: var(--radius-lg);
    }

    .hero-image {
      border-radius: var(--radius-2xl);
      transform: none;
    }
    .hero-image:hover {
      transform: scale(1.02);
    }

    /* ── Tasting notes ────────────────────────────────────────── */
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
      border-radius: var(--radius-sm);
      font-size: var(--text-sm);
      font-weight: 600;
      color: ${colors.accent};
      font-style: italic;
    }

    /* ── Accent mapping ───────────────────────────────────────── */
    .story-label { color: ${colors.primary}; font-family: 'Georgia', serif; letter-spacing: 0.15em; }
    .stat-number { color: ${colors.primary}; }
    .feature-icon {
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
      border-radius: var(--radius-2xl);
    }
    .story-image-accent {
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
      border-radius: var(--radius-2xl);
    }
    .text-accent { color: ${colors.primary}; }

    /* ── Classic section divider ──────────────────────────────── */
    .classic-divider {
      width: 60px;
      height: 3px;
      background: ${colors.accent};
      margin: var(--space-3) auto var(--space-6);
      border-radius: var(--radius-full);
    }

    /* ── Origin story (text-heavy) ────────────────────────────── */
    .origin-story-section {
      padding: var(--space-12) var(--space-6);
      background: ${colors.cream};
    }
    .origin-story-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-10);
      align-items: center;
      max-width: 1000px;
      margin: 0 auto;
    }
    .origin-story-text { padding: var(--space-3) 0; }
    .origin-story-text .story-label { margin-bottom: var(--space-2); display: block; }
    .origin-story-text h2 {
      font-size: var(--text-4xl);
      font-weight: 700;
      line-height: 1.25;
      margin-bottom: var(--space-4);
      color: var(--color-gray-900);
      font-family: 'Georgia', 'Noto Serif KR', serif;
    }
    .origin-story-text p {
      font-size: var(--text-lg);
      line-height: 2;
      color: var(--color-gray-600);
      margin-bottom: var(--space-3);
    }
    .origin-story-text p:last-child { margin-bottom: 0; }
    .origin-image-wrap {
      position: relative;
    }
    .origin-image-wrap img {
      width: 100%;
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-xl);
    }
    .origin-image-wrap::after {
      content: '';
      position: absolute;
      inset: 12px;
      border: 2px solid ${colors.accent};
      border-radius: var(--radius-2xl);
      pointer-events: none;
      opacity: 0.3;
    }

    /* ── Bean info ────────────────────────────────────────────── */
    .bean-info-section {
      background: #ffffff;
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
      background: ${colors.cream};
      border-radius: var(--radius-2xl);
      padding: var(--space-5);
      box-shadow: var(--shadow-sm);
      border: 1px solid rgba(107,68,35,0.08);
    }
    .bean-info-header {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 2px solid rgba(107,68,35,0.1);
    }
    .bean-info-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
      border-radius: var(--radius-lg);
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
      font-family: 'Georgia', serif;
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

    /* ── Roast level ──────────────────────────────────────────── */
    .roast-section {
      background: linear-gradient(135deg, ${colors.primaryDark} 0%, #2a1b0e 100%);
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
      gap: var(--space-2);
      margin: var(--space-6) 0;
    }
    .roast-bean {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-lg);
      transition: all 0.3s ease;
    }
    .roast-bean.light        { background: #d4a574; }
    .roast-bean.medium-light { background: #b8864a; }
    .roast-bean.medium       { background: #8b5a2b; }
    .roast-bean.medium-dark  { background: #5c3d1e; }
    .roast-bean.dark         { background: #3d2815; }
    .roast-bean.active {
      transform: scale(1.25);
      box-shadow: 0 0 24px rgba(201,152,106,0.5);
      border: 2px solid ${colors.accent};
    }
    .roast-bean.inactive { opacity: 0.25; }
    .roast-labels {
      display: flex;
      justify-content: space-between;
      max-width: 340px;
      margin: 0 auto;
      font-size: var(--text-xs);
      color: rgba(255,255,255,0.5);
      font-family: 'Georgia', serif;
      font-style: italic;
    }
    .roast-name-display {
      font-size: var(--text-3xl);
      font-weight: 700;
      color: ${colors.accent};
      margin-top: var(--space-4);
      font-family: 'Georgia', serif;
    }
    .roast-description {
      color: rgba(255,255,255,0.65);
      margin-top: var(--space-2);
      font-size: var(--text-base);
      line-height: 1.8;
    }

    /* ── Flavor profile bars ──────────────────────────────────── */
    .flavor-profile-section {
      padding: var(--space-10) var(--space-6);
      background: ${colors.cream};
    }
    .flavor-profile {
      background: #ffffff;
      border-radius: var(--radius-2xl);
      padding: var(--space-6);
      box-shadow: var(--shadow-md);
      max-width: 650px;
      margin: 0 auto;
      border: 1px solid rgba(107,68,35,0.06);
    }
    .flavor-profile-title {
      text-align: center;
      font-size: var(--text-xl);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: var(--space-5);
      font-family: 'Georgia', serif;
    }
    .flavor-bar-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
    }
    .flavor-bar-item:last-child { margin-bottom: 0; }
    .flavor-bar-label {
      width: 70px;
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-gray-700);
      text-align: right;
    }
    .flavor-bar-track {
      flex: 1;
      height: 10px;
      background: var(--color-gray-100);
      border-radius: var(--radius-full);
      overflow: hidden;
    }
    .flavor-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, ${colors.accent} 0%, ${colors.primary} 100%);
      border-radius: var(--radius-full);
      transition: width 0.6s ease;
    }
    .flavor-bar-value {
      width: 30px;
      font-size: var(--text-sm);
      font-weight: 700;
      color: ${colors.primary};
    }

    /* ── Features grid ────────────────────────────────────────── */
    .feature-card {
      border-radius: var(--radius-2xl);
      border: 1px solid rgba(107,68,35,0.06);
    }
    .feature-card:hover {
      border-color: ${colors.accent};
    }

    /* ── Brewing guide ────────────────────────────────────────── */
    .brewing-section {
      padding: var(--space-10) var(--space-6);
      background: #ffffff;
    }
    .brewing-cards-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-4);
      max-width: 900px;
      margin: var(--space-6) auto 0;
    }
    .brewing-card {
      background: ${colors.cream};
      border-radius: var(--radius-2xl);
      padding: var(--space-5);
      text-align: center;
      box-shadow: var(--shadow-sm);
      border: 1px solid rgba(107,68,35,0.06);
    }
    .brewing-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto var(--space-3);
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
      border-radius: var(--radius-xl);
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
      font-family: 'Georgia', serif;
    }
    .brewing-label {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      margin-top: var(--space-1);
    }

    /* ── Reviews grid (2-column cards) ────────────────────────── */
    .reviews-section {
      padding: var(--space-10) var(--space-6);
      background: ${colors.cream};
    }
    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);
      max-width: 900px;
      margin: var(--space-6) auto 0;
    }
    .review-card {
      background: #ffffff;
      border-radius: var(--radius-2xl);
      padding: var(--space-5);
      box-shadow: var(--shadow-md);
      border: 1px solid rgba(107,68,35,0.06);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .review-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
    }
    .review-stars {
      color: #f59e0b;
      font-size: var(--text-lg);
      margin-bottom: var(--space-2);
    }
    .review-text {
      font-size: var(--text-base);
      line-height: 1.8;
      color: var(--color-gray-700);
      margin-bottom: var(--space-3);
      font-style: italic;
    }
    .review-author-name {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      font-weight: 600;
    }

    /* ── CTA ──────────────────────────────────────────────────── */
    .cta-button {
      background: ${colors.ctaGradient};
      box-shadow: ${colors.ctaShadow};
      border-radius: var(--radius-lg);
    }
    .cta-button:hover {
      box-shadow: 0 15px 40px rgba(107,68,35,0.5);
    }

    .trust-badge-icon { color: ${colors.primary}; }

    /* ── Grind options ────────────────────────────────────────── */
    .grind-section {
      padding: var(--space-10) var(--space-6);
      background: ${colors.cream};
    }
    .grind-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--space-3);
      max-width: 900px;
      margin: var(--space-6) auto 0;
    }
    .grind-card {
      background: #ffffff;
      border-radius: var(--radius-2xl);
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
      border-radius: var(--radius-lg);
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

    /* ── Responsive ───────────────────────────────────────────── */
    @media (max-width: 768px) {
      .origin-story-inner { grid-template-columns: 1fr; }
      .bean-info-grid { grid-template-columns: 1fr; }
      .brewing-cards-row { grid-template-columns: 1fr; }
      .reviews-grid { grid-template-columns: 1fr; }
      .grind-grid { grid-template-columns: repeat(3, 1fr); }
      .roast-bean { width: 34px; height: 34px; }
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

    <!-- ② Origin Story (text-heavy) -->
    <section class="origin-story-section">
      <div class="origin-story-inner">
        <div class="origin-story-text">
          <span class="story-label">{{STORY_LABEL}}</span>
          <h2>{{STORY_TITLE}}</h2>
          <div class="classic-divider" style="margin-left:0;"></div>
          <p>{{STORY_TEXT}}</p>
          <p>{{STORY_TEXT_1}}</p>
          <div style="display: flex; gap: var(--space-5); margin-top: var(--space-5); padding-top: var(--space-4); border-top: 1px solid rgba(107,68,35,0.12);">
            {{STATS_ITEMS}}
          </div>
        </div>
        <div class="origin-image-wrap">
          <img src="{{IMAGE_2}}" alt="원두 스토리" />
        </div>
      </div>
    </section>

    <!-- ③ Bean info section -->
    <section class="bean-info-section">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">BEAN INFORMATION</span>
        <h2 class="headline-lg">원두 상세 정보</h2>
        <div class="classic-divider"></div>
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
    </section>

    <!-- ④ Roast level -->
    <section class="roast-section">
      <div class="roast-content">
        <span class="story-label" style="color: ${colors.accent};">ROASTING LEVEL</span>
        <h2 class="headline-lg" style="color: #ffffff;">로스팅 레벨</h2>
        <div class="classic-divider" style="background: ${colors.accent};"></div>
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

    <!-- ⑤ Flavor profile -->
    <section class="flavor-profile-section">
      <div style="text-align: center; margin-bottom: var(--space-6);">
        <span class="story-label">FLAVOR PROFILE</span>
        <h2 class="headline-lg">맛의 프로필</h2>
        <div class="classic-divider"></div>
      </div>
      <div class="flavor-profile">
        <h3 class="flavor-profile-title">Flavor Profile</h3>
        {{FLAVOR_BARS}}
      </div>
    </section>

    <!-- ⑥ Features grid -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">SPECIAL FEATURES</span>
        <h2 class="headline-lg">{{FEATURES_TITLE}}</h2>
        <div class="classic-divider"></div>
      </div>
      <div class="features-grid">
        {{FEATURE_CARDS}}
      </div>
    </section>

    <!-- ⑦ Brewing guide -->
    <section class="brewing-section">
      <div style="text-align: center; margin-bottom: var(--space-6);">
        <span class="story-label">BREWING GUIDE</span>
        <h2 class="headline-lg">완벽한 한 잔을 위한 추출 가이드</h2>
        <div class="classic-divider"></div>
      </div>
      <div class="brewing-cards-row">
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

    <!-- ⑧ Reviews grid (2-column) -->
    <section class="reviews-section">
      <div style="text-align: center; margin-bottom: var(--space-2);">
        <span class="story-label">CUSTOMER REVIEWS</span>
        <h2 class="headline-lg">고객 리뷰</h2>
        <div class="classic-divider"></div>
      </div>
      <div class="reviews-grid">
        <div class="review-card">
          <div class="review-stars">{{REVIEW_STARS}}</div>
          <p class="review-text">"{{REVIEW_QUOTE}}"</p>
          <p class="review-author-name">- {{REVIEW_AUTHOR}}</p>
        </div>
        <div class="review-card">
          <div class="review-stars">{{REVIEW_STARS}}</div>
          <p class="review-text">"{{REVIEW_QUOTE}}"</p>
          <p class="review-author-name">- {{REVIEW_AUTHOR}}</p>
        </div>
      </div>
    </section>

    <!-- ⑨ Trust badges -->
    <section class="trust-section">
      <span class="story-label">WHY CHOOSE US</span>
      <h2 class="headline-lg">{{TRUST_TITLE}}</h2>
      <div class="classic-divider"></div>
      <div class="trust-badges">
        {{TRUST_BADGES}}
      </div>
    </section>

    <!-- ⑩ CTA section -->
    <section class="cta-section" style="background: linear-gradient(135deg, ${colors.primaryDark} 0%, #2a1b0e 100%); border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;">
      <h2 class="cta-title" style="font-family: 'Georgia', serif;">{{CTA_TITLE}}</h2>
      <p class="cta-subtitle">{{CTA_SUBTITLE}}</p>
      <a href="#" class="cta-button">
        <span>{{CTA_BUTTON}}</span>
        {{ICON_ARROW_RIGHT}}
      </a>
      <p class="cta-note">{{CTA_NOTE}}</p>
    </section>

    <!-- ⑪ Product info table -->
    <section class="section section-light">
      <h2 class="headline-md" style="margin-bottom: var(--space-4); font-family: 'Georgia', serif;">제품 상세 정보</h2>
      <table class="info-table">
        {{PRODUCT_INFO_TABLE}}
      </table>
    </section>

  </div>
</body>
</html>`;
}
