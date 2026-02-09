import { BASE_STYLES } from '../../base-styles';
import { getColorScheme } from '../../color-schemes';

/**
 * Health Supplement - Premium Template
 *
 * Spa/Wellness feel with sage/wellness tones.
 * Soft, calming design with lots of white space, natural imagery feel.
 * Softer shadows, rounded corners, gentle gradients.
 *
 * Section order:
 * Hero (serene) -> Ingredients (elegant cards) -> Benefits (large icons)
 * -> Wellness Story -> Dosage (gentle visual) -> Safety & Quality
 * -> Reviews -> CTA -> Product Info
 */
export function getHealthPremiumTemplate(): string {
  const colors = getColorScheme('health', 'premium');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  ${BASE_STYLES}
  <style>
    /* ===========================
       Health Premium Theme
       Sage / Wellness tones
       Soft, calming, spa-inspired
       =========================== */
    :root {
      --hp-primary: ${colors.primary};
      --hp-primary-light: ${colors.primaryLight};
      --hp-primary-dark: ${colors.primaryDark};
      --hp-accent: ${colors.accent};
      --hp-cream: ${colors.cream};
      --hp-hero-gradient: ${colors.heroGradient};
      --hp-hero-bg-before: ${colors.heroBgBefore};
      --hp-badge-bg: ${colors.badgeBg};
      --hp-badge-border: ${colors.badgeBorder};
      --hp-badge-text: ${colors.badgeText};
      --hp-cta-gradient: ${colors.ctaGradient};
      --hp-cta-shadow: ${colors.ctaShadow};
    }

    /* Global feel: softer line-height, more breathable */
    body {
      line-height: 1.8;
      background: #fafcfb;
    }

    .detail-page {
      background: #fafcfb;
    }

    /* Hero overrides - serene */
    .premium-hero-bg {
      background: var(--hp-hero-gradient);
    }
    .premium-hero-bg::before {
      background: var(--hp-hero-bg-before);
    }

    .hero {
      min-height: 640px;
    }

    .hero-badge {
      background: var(--hp-badge-bg);
      border-color: var(--hp-badge-border);
      color: var(--hp-primary-light);
      font-weight: 500;
      letter-spacing: 0.08em;
    }

    .hero-floating-badge {
      background: linear-gradient(135deg, var(--hp-primary) 0%, var(--hp-primary-light) 100%);
      box-shadow: 0 10px 30px rgba(77, 124, 111, 0.35);
      border-radius: var(--radius-2xl);
    }

    .hero-image {
      border-radius: var(--radius-2xl);
      transform: perspective(1000px) rotateY(-3deg);
    }

    /* Global accent overrides */
    .story-label {
      color: var(--hp-primary);
      font-weight: 500;
      letter-spacing: 0.12em;
    }
    .stat-number { color: var(--hp-primary); }
    .text-accent { color: var(--hp-primary); }
    .trust-badge-icon { color: var(--hp-primary); }

    .feature-icon {
      background: linear-gradient(135deg, var(--hp-primary) 0%, var(--hp-primary-light) 100%);
    }

    .story-image-accent {
      background: linear-gradient(135deg, var(--hp-primary) 0%, var(--hp-primary-light) 100%);
    }

    /* ===========================
       Section spacing - more generous
       =========================== */
    .section {
      padding: 112px var(--space-6);
    }

    .section-divider {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, var(--hp-primary), var(--hp-primary-light));
      margin: 0 auto var(--space-3);
      border-radius: 2px;
    }

    /* ===========================
       Elegant Ingredient Cards
       =========================== */
    .elegant-ingredients {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-5);
      margin-top: var(--space-8);
    }

    .elegant-ingredient-card {
      background: #ffffff;
      border-radius: var(--radius-2xl);
      padding: var(--space-6) var(--space-4);
      text-align: center;
      box-shadow: 0 2px 12px rgba(77, 124, 111, 0.06);
      border: 1px solid rgba(77, 124, 111, 0.08);
      transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
      overflow: hidden;
    }

    .elegant-ingredient-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(180deg, var(--hp-cream) 0%, transparent 40%);
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .elegant-ingredient-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(77, 124, 111, 0.12);
    }

    .elegant-ingredient-card:hover::before {
      opacity: 1;
    }

    .elegant-ingredient-card > * {
      position: relative;
      z-index: 1;
    }

    .ingredient-circle {
      width: 100px;
      height: 100px;
      margin: 0 auto var(--space-3);
      background: linear-gradient(135deg, var(--hp-cream) 0%, #e2f0eb 100%);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(77, 124, 111, 0.12);
    }

    .ingredient-amount {
      font-size: var(--text-2xl);
      font-weight: 800;
      color: var(--hp-primary);
      line-height: 1;
    }

    .ingredient-unit {
      font-size: var(--text-xs);
      color: var(--hp-primary-light);
      font-weight: 600;
      margin-top: 2px;
    }

    .ingredient-name {
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--color-gray-800);
      margin-top: var(--space-1);
    }

    .ingredient-benefit {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      margin-top: 6px;
      line-height: 1.6;
    }

    /* ===========================
       Benefits - Large Icons
       =========================== */
    .large-benefits {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-5);
      margin-top: var(--space-8);
    }

    .large-benefit-card {
      display: flex;
      align-items: flex-start;
      gap: var(--space-4);
      padding: var(--space-5);
      background: #ffffff;
      border-radius: var(--radius-2xl);
      box-shadow: 0 2px 12px rgba(77, 124, 111, 0.06);
      transition: transform 0.4s ease, box-shadow 0.4s ease;
    }

    .large-benefit-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 32px rgba(77, 124, 111, 0.1);
    }

    .large-benefit-icon {
      width: 80px;
      height: 80px;
      flex-shrink: 0;
      background: linear-gradient(135deg, var(--hp-cream) 0%, #e2f0eb 100%);
      border-radius: var(--radius-xl);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--hp-primary);
    }

    .large-benefit-icon svg {
      width: 36px;
      height: 36px;
    }

    .large-benefit-content {
      flex: 1;
    }

    .large-benefit-title {
      font-size: var(--text-xl);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: var(--space-1);
    }

    .large-benefit-text {
      font-size: var(--text-base);
      color: var(--color-gray-600);
      line-height: 1.8;
    }

    /* ===========================
       Wellness Story Section
       =========================== */
    .wellness-story {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-10);
      align-items: center;
    }

    .wellness-image-wrap {
      position: relative;
    }

    .wellness-image {
      width: 100%;
      border-radius: var(--radius-2xl);
      box-shadow: 0 20px 40px rgba(77, 124, 111, 0.12);
    }

    .wellness-image-float {
      position: absolute;
      bottom: -20px;
      right: -20px;
      padding: var(--space-3) var(--space-4);
      background: #ffffff;
      border-radius: var(--radius-xl);
      box-shadow: 0 10px 30px rgba(77, 124, 111, 0.15);
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .wellness-float-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, var(--hp-primary) 0%, var(--hp-primary-light) 100%);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }

    .wellness-float-icon svg {
      width: 22px;
      height: 22px;
    }

    .wellness-float-text {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--color-gray-800);
    }

    .wellness-float-sub {
      font-size: var(--text-xs);
      color: var(--color-gray-500);
    }

    .wellness-content {
      padding: var(--space-3) 0;
    }

    /* ===========================
       Gentle Dosage Visual
       =========================== */
    .gentle-dosage {
      max-width: 800px;
      margin: var(--space-8) auto 0;
    }

    .gentle-dosage-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .gentle-dosage-item {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-4);
      background: #ffffff;
      border-radius: var(--radius-2xl);
      box-shadow: 0 2px 12px rgba(77, 124, 111, 0.06);
      border: 1px solid rgba(77, 124, 111, 0.06);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .gentle-dosage-item:hover {
      transform: translateX(4px);
      box-shadow: 0 8px 24px rgba(77, 124, 111, 0.1);
    }

    .gentle-dosage-icon {
      width: 64px;
      height: 64px;
      flex-shrink: 0;
      background: linear-gradient(135deg, var(--hp-primary) 0%, var(--hp-primary-light) 100%);
      border-radius: var(--radius-xl);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      box-shadow: 0 6px 16px rgba(77, 124, 111, 0.2);
    }

    .gentle-dosage-icon svg {
      width: 28px;
      height: 28px;
    }

    .gentle-dosage-content {
      flex: 1;
    }

    .gentle-dosage-time {
      font-size: var(--text-xs);
      font-weight: 700;
      color: var(--hp-primary);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 2px;
    }

    .gentle-dosage-text {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--color-gray-800);
    }

    .gentle-dosage-detail {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      margin-top: 2px;
    }

    /* ===========================
       Safety & Quality Section
       =========================== */
    .safety-section {
      background: var(--hp-cream);
    }

    .safety-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-4);
      margin-top: var(--space-8);
    }

    .safety-card {
      background: #ffffff;
      border-radius: var(--radius-2xl);
      padding: var(--space-5) var(--space-4);
      text-align: center;
      box-shadow: 0 2px 12px rgba(77, 124, 111, 0.06);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .safety-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 28px rgba(77, 124, 111, 0.1);
    }

    .safety-icon {
      width: 72px;
      height: 72px;
      margin: 0 auto var(--space-3);
      background: linear-gradient(135deg, var(--hp-cream) 0%, #e2f0eb 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--hp-primary);
    }

    .safety-icon svg {
      width: 32px;
      height: 32px;
    }

    .safety-title {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: 6px;
    }

    .safety-text {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      line-height: 1.7;
    }

    /* Allergen note within safety */
    .allergen-note {
      margin-top: var(--space-5);
      padding: var(--space-3) var(--space-4);
      background: #ffffff;
      border: 1px solid #fde68a;
      border-radius: var(--radius-xl);
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
    }

    .allergen-note-icon {
      flex-shrink: 0;
      color: #d97706;
    }

    .allergen-note-icon svg {
      width: 22px;
      height: 22px;
    }

    .allergen-note-content {
      flex: 1;
    }

    .allergen-note-title {
      font-size: var(--text-sm);
      font-weight: 700;
      color: #92400e;
      margin-bottom: 4px;
    }

    .allergen-note-text {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
      line-height: 1.7;
    }

    .allergen-note-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: var(--space-1);
    }

    .allergen-mini-tag {
      padding: 3px 10px;
      background: #fef9ee;
      border: 1px solid #fde68a;
      border-radius: var(--radius-full);
      font-size: 11px;
      font-weight: 600;
      color: #92400e;
    }

    /* Caution note */
    .caution-note {
      margin-top: var(--space-4);
      padding: var(--space-3) var(--space-4);
      background: #ffffff;
      border-left: 3px solid var(--hp-primary);
      border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
    }

    .caution-note-title {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--hp-primary);
      margin-bottom: 4px;
    }

    .caution-note-text {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
      line-height: 1.7;
    }

    /* ===========================
       Reviews (softer style)
       =========================== */
    .review-card {
      border-radius: var(--radius-2xl);
      border: 1px solid rgba(77, 124, 111, 0.06);
    }

    .review-card:hover {
      box-shadow: 0 12px 28px rgba(77, 124, 111, 0.08);
    }

    /* ===========================
       CTA overrides
       =========================== */
    .cta-section {
      background: linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 80%, ${colors.primaryLight} 100%);
    }

    .cta-button {
      background: var(--hp-cta-gradient);
      box-shadow: var(--hp-cta-shadow);
      border-radius: var(--radius-2xl);
      padding: var(--space-3) var(--space-8);
    }

    .cta-button:hover {
      box-shadow: 0 15px 40px rgba(77, 124, 111, 0.45);
    }

    /* ===========================
       Trust overrides
       =========================== */
    .trust-section {
      background: #ffffff;
    }

    .trust-badge-icon {
      box-shadow: 0 4px 16px rgba(77, 124, 111, 0.08);
    }

    /* ===========================
       Responsive
       =========================== */
    @media (max-width: 1024px) {
      .section {
        padding: var(--space-10) var(--space-5);
      }

      .elegant-ingredients {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-4);
      }

      .safety-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .section {
        padding: var(--space-8) var(--space-3);
      }

      .elegant-ingredients {
        grid-template-columns: 1fr;
        gap: var(--space-3);
      }

      .large-benefits {
        grid-template-columns: 1fr;
        gap: var(--space-3);
      }

      .large-benefit-card {
        padding: var(--space-4);
      }

      .large-benefit-icon {
        width: 64px;
        height: 64px;
      }

      .large-benefit-icon svg {
        width: 28px;
        height: 28px;
      }

      .wellness-story {
        grid-template-columns: 1fr;
        gap: var(--space-5);
      }

      .wellness-image-float {
        bottom: -12px;
        right: 12px;
      }

      .safety-grid {
        grid-template-columns: 1fr;
      }

      .gentle-dosage-item {
        padding: var(--space-3);
      }
    }

    @media (max-width: 480px) {
      .large-benefit-card {
        flex-direction: column;
        text-align: center;
        align-items: center;
      }

      .ingredient-circle {
        width: 80px;
        height: 80px;
      }

      .ingredient-amount {
        font-size: var(--text-xl);
      }
    }
  </style>
</head>
<body>
  <div class="detail-page">

    <!-- ========================
         HERO SECTION (Serene)
         ======================== -->
    <section class="hero premium-hero-bg">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-badge">{{BADGE_TEXT}}</span>
          <h1 class="hero-title" style="letter-spacing: -0.03em;">{{HEADLINE}}</h1>
          <p class="hero-subtitle" style="font-weight: 300;">{{SUBHEADLINE}}</p>
          <p style="font-size: var(--text-sm); color: rgba(255,255,255,0.55); margin-top: var(--space-3); line-height: 1.7; font-weight: 300;">
            {{FUNCTIONAL_CLAIM}}
          </p>
        </div>
        <div class="hero-image-wrap">
          <img src="{{IMAGE_1}}" alt="{{PRODUCT_NAME}}" class="hero-image">
          <div class="hero-floating-badge">
            <span style="font-size: var(--text-xs); font-weight: 500;">{{BADGE_LABEL}}</span>
            <span style="font-size: var(--text-xl); font-weight: 800;">{{BADGE_VALUE}}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================
         ELEGANT INGREDIENTS
         ======================== -->
    <section class="section" style="background: #ffffff;">
      <div style="text-align: center;">
        <div class="section-divider"></div>
        <span class="story-label">INGREDIENTS</span>
        <h2 class="headline-lg" style="margin-top: var(--space-1);">{{INGREDIENTS_TITLE}}</h2>
        <p class="body-md" style="margin-top: var(--space-2); max-width: 560px; margin-left: auto; margin-right: auto; font-weight: 300;">
          자연에서 엄선한 최고급 원료만을 사용합니다
        </p>
      </div>
      <div class="elegant-ingredients">
        {{INGREDIENT_CARDS}}
      </div>
    </section>

    <!-- ========================
         BENEFITS (Large Icons)
         ======================== -->
    <section class="section" style="background: var(--hp-cream);">
      <div style="text-align: center;">
        <div class="section-divider"></div>
        <span class="story-label">BENEFITS</span>
        <h2 class="headline-lg" style="margin-top: var(--space-1);">{{BENEFITS_TITLE}}</h2>
        <p class="body-md" style="margin-top: var(--space-2); max-width: 560px; margin-left: auto; margin-right: auto; font-weight: 300;">
          {{BENEFITS_TEXT}}
        </p>
      </div>
      <div class="large-benefits">
        {{BENEFITS_LIST}}
      </div>
    </section>

    <!-- ========================
         WELLNESS STORY
         ======================== -->
    <section class="section" style="background: #ffffff;">
      <div class="wellness-story">
        <div class="wellness-image-wrap">
          <img src="{{IMAGE_2}}" alt="웰니스 스토리" class="wellness-image">
          <div class="wellness-image-float">
            <div class="wellness-float-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
            <div>
              <p class="wellness-float-text">{{BADGE_LABEL}}</p>
              <p class="wellness-float-sub">{{BADGE_VALUE}}</p>
            </div>
          </div>
        </div>
        <div class="wellness-content">
          <span class="story-label">{{STORY_LABEL}}</span>
          <h2 class="story-title" style="margin-top: var(--space-1);">{{STORY_TITLE}}</h2>
          <p class="story-text" style="font-weight: 300;">{{STORY_TEXT}}</p>
          <div class="stats-row">
            {{STATS_ITEMS}}
          </div>
        </div>
      </div>
    </section>

    <!-- ========================
         GENTLE DOSAGE VISUAL
         ======================== -->
    <section class="section" style="background: var(--hp-cream);">
      <div style="text-align: center;">
        <div class="section-divider"></div>
        <span class="story-label">HOW TO TAKE</span>
        <h2 class="headline-lg" style="margin-top: var(--space-1);">올바른 섭취 가이드</h2>
        <p class="body-md" style="margin-top: var(--space-2); max-width: 520px; margin-left: auto; margin-right: auto; font-weight: 300;">
          하루의 리듬에 맞춰 최적의 타이밍에 섭취하세요
        </p>
      </div>
      <div class="gentle-dosage">
        <div class="gentle-dosage-list">
          {{DOSAGE_ITEMS}}
        </div>
      </div>
    </section>

    <!-- ========================
         SAFETY & QUALITY
         Allergen + Caution + Trust cards
         ======================== -->
    <section class="section safety-section">
      <div style="text-align: center;">
        <div class="section-divider"></div>
        <span class="story-label">SAFETY &amp; QUALITY</span>
        <h2 class="headline-lg" style="margin-top: var(--space-1);">안심하고 드실 수 있도록</h2>
        <p class="body-md" style="margin-top: var(--space-2); max-width: 560px; margin-left: auto; margin-right: auto; font-weight: 300;">
          엄격한 품질 관리와 안전 기준을 준수합니다
        </p>
      </div>
      <div class="safety-grid">
        {{TRUST_BADGES}}
      </div>

      <!-- Allergen note -->
      <div class="allergen-note">
        <div class="allergen-note-icon">{{ICON_ALERT_TRIANGLE}}</div>
        <div class="allergen-note-content">
          <p class="allergen-note-title">알레르기 유발 물질 안내</p>
          <p class="allergen-note-text">
            본 제품에 포함되어 있거나 같은 제조 시설에서 취급되는 알레르기 유발 물질을 확인하세요.
          </p>
          <div class="allergen-note-tags">
            {{ALLERGEN_TAGS}}
          </div>
        </div>
      </div>

      <!-- Caution note -->
      <div class="caution-note">
        <p class="caution-note-title">섭취 시 주의사항</p>
        <p class="caution-note-text">{{CAUTION_NOTES}}</p>
      </div>
    </section>

    <!-- ========================
         REVIEWS (Soft style)
         ======================== -->
    <section class="section" style="background: #ffffff;">
      <div style="text-align: center; margin-bottom: var(--space-5);">
        <div class="section-divider"></div>
        <span class="story-label">REVIEWS</span>
        <h2 class="headline-lg" style="margin-top: var(--space-1);">고객님의 이야기</h2>
      </div>
      <div class="reviews-grid">
        {{REVIEW_CARDS}}
      </div>
    </section>

    <!-- ========================
         CTA SECTION
         ======================== -->
    <section class="cta-section">
      <h2 class="cta-title">{{CTA_TITLE}}</h2>
      <p class="cta-subtitle" style="font-weight: 300;">{{CTA_SUBTITLE}}</p>
      <a href="#" class="cta-button">
        <span>{{CTA_BUTTON}}</span>
        {{ICON_ARROW_RIGHT}}
      </a>
      <p class="cta-note">{{CTA_NOTE}}</p>
    </section>

    <!-- ========================
         PRODUCT INFO TABLE
         ======================== -->
    <section class="section" style="background: #ffffff;">
      <h2 class="headline-md" style="margin-bottom: var(--space-4);">제품 상세 정보</h2>
      <table class="info-table" style="border-radius: var(--radius-2xl); border: 1px solid rgba(77,124,111,0.06);">
        {{PRODUCT_INFO_TABLE}}
      </table>
    </section>

  </div>
</body>
</html>`;
}
