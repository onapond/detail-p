import { BASE_STYLES } from '../../base-styles';
import { getIconSvg } from '../../icons';
import { getColorScheme } from '../../color-schemes';

/**
 * Coffee Premium Template
 *
 * A luxury, high-end presentation with very dark backgrounds, gold/copper
 * accents, generous negative space, and elegant oversized typography.
 * Fewer visual elements overall, but each one carries more impact.
 *
 * Section order:
 *   Hero (full-width cinematic) -> Tasting Notes (centered, large)
 *   -> Origin Info (split, elegant) -> Roast Level (minimal)
 *   -> Flavor Profile (refined) -> Brewing Guide (understated)
 *   -> Single Feature Review -> CTA (minimal, elegant) -> Product Info
 */
export function getCoffeePremiumTemplate(): string {
  const colors = getColorScheme('coffee', 'premium');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  \${BASE_STYLES}
  <style>
    /* ── Coffee Premium: color-scheme overrides ────────────────── */
    :root {
      --color-primary: ${colors.primary};
      --color-primary-dark: ${colors.primaryDark};
      --color-primary-light: ${colors.primaryLight};
      --coffee-accent: ${colors.primary};
      --coffee-accent-light: ${colors.accent};
      --coffee-accent-dark: ${colors.primaryDark};
      --coffee-cream: ${colors.cream};
      --premium-gold: ${colors.accent};
      --premium-dark: ${colors.primaryDark};
      --premium-surface: #1c150e;
    }

    body {
      background: #0f0a06;
      color: #e8ddd0;
    }

    .detail-page {
      background: #0f0a06;
    }

    /* ── Typography: elegant, large ───────────────────────────── */
    .premium-heading {
      font-family: 'Georgia', 'Noto Serif KR', 'Times New Roman', serif;
      letter-spacing: -0.01em;
    }

    /* ── Hero: full-width cinematic ───────────────────────────── */
    .premium-hero {
      position: relative;
      min-height: 700px;
      display: flex;
      align-items: center;
      overflow: hidden;
      background: linear-gradient(180deg, ${colors.primaryDark} 0%, #0f0a06 100%);
    }
    .premium-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: ${colors.heroBgBefore};
      pointer-events: none;
    }
    .premium-hero-content {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-10);
      align-items: center;
      padding: var(--space-12) var(--space-8);
      width: 100%;
      max-width: var(--max-width);
      margin: 0 auto;
    }
    .premium-hero-text { color: #ffffff; }
    .premium-hero-badge {
      display: inline-block;
      padding: 6px 20px;
      background: transparent;
      border: 1px solid ${colors.accent};
      color: ${colors.accent};
      font-size: var(--text-xs);
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      margin-bottom: var(--space-4);
    }
    .premium-hero-title {
      font-size: clamp(40px, 5vw, 60px);
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: var(--space-4);
      font-family: 'Georgia', 'Noto Serif KR', serif;
      letter-spacing: -0.02em;
    }
    .premium-hero-subtitle {
      font-size: var(--text-lg);
      color: rgba(255,255,255,0.55);
      line-height: 1.9;
      font-weight: 300;
      max-width: 480px;
    }
    .premium-hero-image-wrap { position: relative; }
    .premium-hero-image-wrap img {
      width: 100%;
      height: auto;
      border-radius: var(--radius-lg);
      box-shadow: 0 30px 80px rgba(0,0,0,0.6);
    }
    .premium-hero-badge-float {
      position: absolute;
      bottom: -16px;
      left: 50%;
      transform: translateX(-50%);
      padding: var(--space-2) var(--space-5);
      background: ${colors.accent};
      color: ${colors.primaryDark};
      font-weight: 700;
      font-size: var(--text-sm);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    /* ── Gold separator ───────────────────────────────────────── */
    .premium-sep {
      width: 48px;
      height: 1px;
      background: ${colors.accent};
      margin: var(--space-2) auto;
      opacity: 0.6;
    }

    /* ── Tasting notes: centered, large ───────────────────────── */
    .premium-tasting {
      padding: var(--space-12) var(--space-6);
      text-align: center;
      background: #0f0a06;
    }
    .premium-tasting-label {
      font-size: var(--text-xs);
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: ${colors.accent};
      font-weight: 600;
      margin-bottom: var(--space-3);
    }
    .premium-tasting-title {
      font-size: var(--text-4xl);
      font-weight: 700;
      color: #ffffff;
      margin-bottom: var(--space-6);
      font-family: 'Georgia', 'Noto Serif KR', serif;
    }
    .premium-tasting-notes {
      display: flex;
      justify-content: center;
      gap: var(--space-3);
      flex-wrap: wrap;
    }
    .premium-tasting-note {
      padding: var(--space-2) var(--space-4);
      border: 1px solid rgba(166,123,78,0.35);
      color: ${colors.accent};
      font-size: var(--text-base);
      font-weight: 500;
      letter-spacing: 0.05em;
      background: rgba(166,123,78,0.06);
    }

    /* ── Origin info: split elegant ───────────────────────────── */
    .premium-origin {
      padding: var(--space-12) var(--space-8);
      background: var(--premium-surface);
    }
    .premium-origin-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-12);
      align-items: start;
      max-width: 1000px;
      margin: 0 auto;
    }
    .premium-origin-col { }
    .premium-origin-label {
      font-size: var(--text-xs);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${colors.accent};
      font-weight: 600;
      margin-bottom: var(--space-3);
      display: block;
    }
    .premium-origin-title {
      font-size: var(--text-3xl);
      font-weight: 700;
      color: #ffffff;
      margin-bottom: var(--space-5);
      font-family: 'Georgia', 'Noto Serif KR', serif;
      line-height: 1.3;
    }
    .premium-origin-text {
      font-size: var(--text-base);
      line-height: 2;
      color: rgba(232,221,208,0.6);
      margin-bottom: var(--space-4);
    }
    .premium-origin-list { list-style: none; padding: 0; margin: 0; }
    .premium-origin-item {
      display: flex;
      justify-content: space-between;
      padding: var(--space-3) 0;
      border-bottom: 1px solid rgba(166,123,78,0.12);
    }
    .premium-origin-item:last-child { border-bottom: none; }
    .premium-origin-item-label {
      color: rgba(232,221,208,0.45);
      font-size: var(--text-sm);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .premium-origin-item-value {
      color: #ffffff;
      font-weight: 600;
      font-size: var(--text-sm);
    }

    /* Bean info card (right column) */
    .premium-bean-card {
      background: rgba(166,123,78,0.06);
      border: 1px solid rgba(166,123,78,0.15);
      padding: var(--space-6);
    }
    .premium-bean-card-header {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-5);
      padding-bottom: var(--space-4);
      border-bottom: 1px solid rgba(166,123,78,0.15);
    }
    .premium-bean-icon {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${colors.accent};
    }
    .premium-bean-icon svg { width: 28px; height: 28px; }
    .premium-bean-card-title {
      font-size: var(--text-lg);
      font-weight: 600;
      color: #ffffff;
      font-family: 'Georgia', serif;
    }

    /* ── Roast level: minimal ─────────────────────────────────── */
    .premium-roast {
      padding: var(--space-12) var(--space-6);
      background: #0f0a06;
      text-align: center;
    }
    .premium-roast-display {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--space-2);
      margin: var(--space-8) 0 var(--space-4);
    }
    .roast-bean {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      transition: all 0.4s ease;
    }
    .roast-bean.light        { background: #d4a574; }
    .roast-bean.medium-light { background: #b8864a; }
    .roast-bean.medium       { background: #8b5a2b; }
    .roast-bean.medium-dark  { background: #5c3d1e; }
    .roast-bean.dark         { background: #3d2815; }
    .roast-bean.active {
      transform: scale(1.4);
      box-shadow: 0 0 30px rgba(166,123,78,0.5);
    }
    .roast-bean.inactive { opacity: 0.15; }
    .premium-roast-labels {
      display: flex;
      justify-content: space-between;
      max-width: 280px;
      margin: 0 auto;
      font-size: 11px;
      color: rgba(232,221,208,0.3);
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }
    .premium-roast-name {
      font-size: var(--text-4xl);
      font-weight: 700;
      color: ${colors.accent};
      margin-top: var(--space-5);
      font-family: 'Georgia', 'Noto Serif KR', serif;
    }
    .premium-roast-desc {
      color: rgba(232,221,208,0.45);
      margin-top: var(--space-3);
      font-size: var(--text-base);
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.8;
    }

    /* ── Flavor profile: refined ──────────────────────────────── */
    .premium-flavor {
      padding: var(--space-12) var(--space-6);
      background: var(--premium-surface);
    }
    .premium-flavor-inner {
      max-width: 560px;
      margin: 0 auto;
    }
    .premium-flavor-bar {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-4);
    }
    .premium-flavor-bar:last-child { margin-bottom: 0; }
    .premium-flavor-label {
      width: 80px;
      font-size: var(--text-sm);
      font-weight: 500;
      color: rgba(232,221,208,0.5);
      text-align: right;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .premium-flavor-track {
      flex: 1;
      height: 6px;
      background: rgba(166,123,78,0.1);
      overflow: hidden;
    }
    .premium-flavor-fill {
      height: 100%;
      background: linear-gradient(90deg, ${colors.accent} 0%, ${colors.primary} 100%);
      transition: width 0.6s ease;
    }
    .premium-flavor-value {
      width: 28px;
      font-size: var(--text-sm);
      font-weight: 700;
      color: ${colors.accent};
    }

    /* ── Brewing guide: understated ───────────────────────────── */
    .premium-brewing {
      padding: var(--space-12) var(--space-6);
      background: #0f0a06;
    }
    .premium-brewing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-6);
      max-width: 800px;
      margin: var(--space-8) auto 0;
    }
    .premium-brewing-card {
      text-align: center;
      padding: var(--space-6) var(--space-4);
      border: 1px solid rgba(166,123,78,0.12);
      background: transparent;
      transition: border-color 0.3s ease;
    }
    .premium-brewing-card:hover {
      border-color: rgba(166,123,78,0.35);
    }
    .premium-brewing-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto var(--space-4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${colors.accent};
    }
    .premium-brewing-icon svg { width: 32px; height: 32px; }
    .premium-brewing-value {
      font-size: var(--text-3xl);
      font-weight: 700;
      color: #ffffff;
      font-family: 'Georgia', serif;
    }
    .premium-brewing-label {
      font-size: var(--text-xs);
      color: rgba(232,221,208,0.4);
      margin-top: var(--space-2);
      text-transform: uppercase;
      letter-spacing: 0.12em;
    }

    /* ── Single feature review ────────────────────────────────── */
    .premium-review {
      padding: var(--space-12) var(--space-8);
      background: var(--premium-surface);
      text-align: center;
    }
    .premium-review-stars {
      color: ${colors.accent};
      font-size: var(--text-xl);
      margin-bottom: var(--space-5);
      letter-spacing: 4px;
    }
    .premium-review-quote {
      font-size: clamp(var(--text-2xl), 3vw, var(--text-4xl));
      font-weight: 400;
      color: #ffffff;
      max-width: 700px;
      margin: 0 auto var(--space-5);
      line-height: 1.5;
      font-family: 'Georgia', 'Noto Serif KR', serif;
      font-style: italic;
    }
    .premium-review-author {
      font-size: var(--text-sm);
      color: rgba(232,221,208,0.4);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    /* ── Features grid (premium) ──────────────────────────────── */
    .premium-features {
      padding: var(--space-10) var(--space-6);
      background: #0f0a06;
    }
    .feature-card {
      background: var(--premium-surface);
      border: 1px solid rgba(166,123,78,0.1);
      color: #e8ddd0;
    }
    .feature-card:hover {
      border-color: rgba(166,123,78,0.3);
      box-shadow: 0 10px 40px rgba(0,0,0,0.4);
    }
    .feature-title { color: #ffffff; }
    .feature-desc { color: rgba(232,221,208,0.5); }
    .feature-icon {
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
    }

    /* ── Trust badges ─────────────────────────────────────────── */
    .trust-section {
      background: var(--premium-surface);
      color: #ffffff;
    }
    .trust-section .story-label { color: ${colors.accent}; }
    .trust-section .headline-lg { color: #ffffff; }
    .trust-badge-icon {
      background: rgba(166,123,78,0.1);
      border: 1px solid rgba(166,123,78,0.2);
      color: ${colors.accent};
    }
    .trust-badge-text { color: rgba(232,221,208,0.7); }

    /* ── CTA: minimal, elegant ────────────────────────────────── */
    .premium-cta {
      padding: var(--space-12) var(--space-6);
      background: #0f0a06;
      text-align: center;
    }
    .premium-cta-title {
      font-size: clamp(var(--text-3xl), 4vw, 48px);
      font-weight: 700;
      color: #ffffff;
      margin-bottom: var(--space-4);
      font-family: 'Georgia', 'Noto Serif KR', serif;
    }
    .premium-cta-subtitle {
      font-size: var(--text-lg);
      color: rgba(232,221,208,0.4);
      margin-bottom: var(--space-6);
      font-weight: 300;
      line-height: 1.8;
    }
    .premium-cta-button {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-3) var(--space-8);
      background: transparent;
      border: 1px solid ${colors.accent};
      color: ${colors.accent};
      font-size: var(--text-base);
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
      min-height: 48px;
    }
    .premium-cta-button:hover {
      background: ${colors.accent};
      color: ${colors.primaryDark};
    }
    .premium-cta-button svg { width: 18px; height: 18px; }
    .premium-cta-note {
      margin-top: var(--space-4);
      font-size: var(--text-xs);
      color: rgba(232,221,208,0.25);
      letter-spacing: 0.05em;
    }

    /* ── Grind options (premium) ──────────────────────────────── */
    .grind-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--space-3);
      max-width: 900px;
      margin: var(--space-6) auto 0;
    }
    .grind-card {
      background: rgba(166,123,78,0.04);
      border: 1px solid rgba(166,123,78,0.12);
      padding: var(--space-4);
      text-align: center;
      transition: all 0.3s ease;
    }
    .grind-card:hover {
      border-color: rgba(166,123,78,0.4);
    }
    .grind-icon {
      width: 44px;
      height: 44px;
      margin: 0 auto var(--space-2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${colors.accent};
      background: none;
    }
    .grind-icon svg { width: 24px; height: 24px; }
    .grind-name {
      font-size: var(--text-sm);
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .grind-desc {
      font-size: var(--text-xs);
      color: rgba(232,221,208,0.35);
    }

    /* ── Product info table ───────────────────────────────────── */
    .premium-info-section {
      padding: var(--space-10) var(--space-6);
      background: var(--premium-surface);
    }
    .info-table {
      background: transparent;
      box-shadow: none;
      border: 1px solid rgba(166,123,78,0.12);
    }
    .info-table th {
      background: rgba(166,123,78,0.06);
      color: rgba(232,221,208,0.6);
      border-bottom: 1px solid rgba(166,123,78,0.1);
    }
    .info-table td {
      color: rgba(232,221,208,0.8);
      border-bottom: 1px solid rgba(166,123,78,0.06);
    }

    /* ── Responsive ───────────────────────────────────────────── */
    @media (max-width: 768px) {
      .premium-hero-content { grid-template-columns: 1fr; text-align: center; padding: var(--space-8) var(--space-4); }
      .premium-hero-subtitle { margin: 0 auto; }
      .premium-origin-inner { grid-template-columns: 1fr; }
      .premium-brewing-grid { grid-template-columns: 1fr; }
      .grind-grid { grid-template-columns: repeat(3, 1fr); }
      .roast-bean { width: 28px; height: 28px; }
    }
    @media (max-width: 480px) {
      .grind-grid { grid-template-columns: repeat(2, 1fr); }
      .premium-hero { min-height: 500px; }
    }
  </style>
</head>
<body>
  <div class="detail-page">

    <!-- ① Hero: full-width cinematic -->
    <section class="premium-hero">
      <div class="premium-hero-content">
        <div class="premium-hero-text">
          <span class="premium-hero-badge">{{BADGE_TEXT}}</span>
          <h1 class="premium-hero-title">{{HEADLINE}}</h1>
          <p class="premium-hero-subtitle">{{SUBHEADLINE}}</p>
        </div>
        <div class="premium-hero-image-wrap">
          <img src="{{IMAGE_1}}" alt="{{PRODUCT_NAME}}">
          <div class="premium-hero-badge-float">
            <span>{{BADGE_LABEL}} {{BADGE_VALUE}}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ② Tasting Notes: centered, large -->
    <section class="premium-tasting">
      <p class="premium-tasting-label">Tasting Notes</p>
      <div class="premium-sep"></div>
      <h2 class="premium-tasting-title">테이스팅 노트</h2>
      <div class="premium-tasting-notes">
        {{TASTING_NOTES}}
      </div>
    </section>

    <!-- ③ Origin Info: split elegant -->
    <section class="premium-origin">
      <div class="premium-origin-inner">
        <div class="premium-origin-col">
          <span class="premium-origin-label">{{STORY_LABEL}}</span>
          <h2 class="premium-origin-title">{{STORY_TITLE}}</h2>
          <p class="premium-origin-text">{{STORY_TEXT}}</p>
          <p class="premium-origin-text">{{STORY_TEXT_1}}</p>
          <ul class="premium-origin-list">
            {{ORIGIN_INFO_LIST}}
          </ul>
        </div>
        <div class="premium-origin-col">
          <div class="premium-bean-card">
            <div class="premium-bean-card-header">
              <div class="premium-bean-icon">{{ICON_BEAN}}</div>
              <span class="premium-bean-card-title">원두 특성</span>
            </div>
            <ul class="premium-origin-list">
              {{BEAN_INFO_LIST}}
            </ul>
          </div>
          <div style="margin-top: var(--space-6);">
            <img src="{{IMAGE_2}}" alt="원두 스토리" style="width: 100%; border-radius: 2px; box-shadow: 0 20px 60px rgba(0,0,0,0.4);">
          </div>
        </div>
      </div>
    </section>

    <!-- ④ Roast Level: minimal -->
    <section class="premium-roast">
      <p class="premium-tasting-label">Roasting Level</p>
      <div class="premium-sep"></div>
      <h2 class="premium-tasting-title" style="margin-bottom: 0;">로스팅 레벨</h2>
      <div class="premium-roast-display">
        {{ROAST_BEANS}}
      </div>
      <div class="premium-roast-labels">
        <span>Light</span>
        <span>Dark</span>
      </div>
      <div class="premium-roast-name">{{ROAST_NAME}}</div>
      <p class="premium-roast-desc">{{ROAST_DESCRIPTION}}</p>
    </section>

    <!-- ⑤ Flavor Profile: refined -->
    <section class="premium-flavor">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <p class="premium-tasting-label">Flavor Profile</p>
        <div class="premium-sep"></div>
        <h2 class="premium-tasting-title">맛의 프로필</h2>
      </div>
      <div class="premium-flavor-inner">
        {{FLAVOR_BARS}}
      </div>
    </section>

    <!-- ⑥ Features grid -->
    <section class="premium-features">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <p class="premium-tasting-label">Special Features</p>
        <div class="premium-sep"></div>
        <h2 class="premium-tasting-title">{{FEATURES_TITLE}}</h2>
      </div>
      <div class="features-grid">
        {{FEATURE_CARDS}}
      </div>
    </section>

    <!-- ⑦ Brewing Guide: understated -->
    <section class="premium-brewing">
      <div style="text-align: center;">
        <p class="premium-tasting-label">Brewing Guide</p>
        <div class="premium-sep"></div>
        <h2 class="premium-tasting-title">완벽한 한 잔을 위한 추출 가이드</h2>
      </div>
      <div class="premium-brewing-grid">
        <div class="premium-brewing-card">
          <div class="premium-brewing-icon">{{ICON_THERMOMETER}}</div>
          <div class="premium-brewing-value">{{BREW_TEMP}}</div>
          <div class="premium-brewing-label">추출 온도</div>
        </div>
        <div class="premium-brewing-card">
          <div class="premium-brewing-icon">{{ICON_SCALE}}</div>
          <div class="premium-brewing-value">{{BREW_RATIO}}</div>
          <div class="premium-brewing-label">커피 : 물 비율</div>
        </div>
        <div class="premium-brewing-card">
          <div class="premium-brewing-icon">{{ICON_TIMER}}</div>
          <div class="premium-brewing-value">{{BREW_TIME}}</div>
          <div class="premium-brewing-label">추출 시간</div>
        </div>
      </div>
    </section>

    <!-- ⑧ Single Feature Review -->
    <section class="premium-review">
      <div class="premium-review-stars">{{REVIEW_STARS}}</div>
      <div class="premium-sep"></div>
      <p class="premium-review-quote">"{{REVIEW_QUOTE}}"</p>
      <p class="premium-review-author">{{REVIEW_AUTHOR}}</p>
    </section>

    <!-- Trust badges -->
    <section class="trust-section">
      <span class="story-label" style="color: ${colors.accent};">WHY CHOOSE US</span>
      <h2 class="headline-lg" style="color: #ffffff;">{{TRUST_TITLE}}</h2>
      <div class="trust-badges">
        {{TRUST_BADGES}}
      </div>
    </section>

    <!-- ⑨ CTA: minimal, elegant -->
    <section class="premium-cta">
      <p class="premium-tasting-label">Order Now</p>
      <div class="premium-sep"></div>
      <h2 class="premium-cta-title">{{CTA_TITLE}}</h2>
      <p class="premium-cta-subtitle">{{CTA_SUBTITLE}}</p>
      <a href="#" class="premium-cta-button">
        <span>{{CTA_BUTTON}}</span>
        {{ICON_ARROW_RIGHT}}
      </a>
      <p class="premium-cta-note">{{CTA_NOTE}}</p>
    </section>

    <!-- ⑩ Product Info -->
    <section class="premium-info-section">
      <h2 class="headline-md premium-heading" style="margin-bottom: var(--space-4); color: #ffffff;">제품 상세 정보</h2>
      <table class="info-table">
        {{PRODUCT_INFO_TABLE}}
      </table>
    </section>

  </div>
</body>
</html>`;
}
