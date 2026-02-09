import { BASE_STYLES } from '../../base-styles';
import { getColorScheme } from '../../color-schemes';

/**
 * Health Supplement - Modern Template
 *
 * Green accent, clean modern layout with enhanced sections:
 * Hero (certification badges) -> Ingredients -> Benefits -> Dosage (enhanced visual guide)
 * -> Allergen Warning -> Clinical Evidence -> Caution -> Trust -> CTA -> Product Info
 */
export function getHealthModernTemplate(): string {
  const colors = getColorScheme('health', 'modern');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  ${BASE_STYLES}
  <style>
    /* ===========================
       Health Modern Theme
       Green accent from color scheme
       =========================== */
    :root {
      --health-primary: ${colors.primary};
      --health-primary-light: ${colors.primaryLight};
      --health-primary-dark: ${colors.primaryDark};
      --health-accent: ${colors.accent};
      --health-cream: ${colors.cream};
      --health-hero-gradient: ${colors.heroGradient};
      --health-hero-bg-before: ${colors.heroBgBefore};
      --health-badge-bg: ${colors.badgeBg};
      --health-badge-border: ${colors.badgeBorder};
      --health-badge-text: ${colors.badgeText};
      --health-cta-gradient: ${colors.ctaGradient};
      --health-cta-shadow: ${colors.ctaShadow};
    }

    /* Hero overrides */
    .health-hero-bg {
      background: var(--health-hero-gradient);
    }
    .health-hero-bg::before {
      background: var(--health-hero-bg-before);
    }

    .hero-badge {
      background: var(--health-badge-bg);
      border-color: var(--health-badge-border);
      color: var(--health-primary-light);
    }

    .hero-floating-badge {
      background: linear-gradient(135deg, var(--health-primary) 0%, var(--health-primary-light) 100%);
      box-shadow: 0 10px 30px rgba(5, 150, 105, 0.4);
    }

    /* Accent color overrides */
    .story-label { color: var(--health-primary); }
    .stat-number { color: var(--health-primary); }
    .text-accent { color: var(--health-primary); }
    .feature-icon {
      background: linear-gradient(135deg, var(--health-primary) 0%, var(--health-primary-light) 100%);
    }
    .story-image-accent {
      background: linear-gradient(135deg, var(--health-primary) 0%, var(--health-primary-light) 100%);
    }
    .trust-badge-icon { color: var(--health-primary); }

    /* ===========================
       Certification Badges
       =========================== */
    .certification-badges {
      display: flex;
      gap: var(--space-1);
      flex-wrap: wrap;
      margin-bottom: var(--space-3);
    }

    .certification-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: var(--space-1) var(--space-2);
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: var(--radius-sm);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--health-primary-light);
      backdrop-filter: blur(4px);
      transition: background var(--animation-duration) var(--animation-easing);
    }

    .certification-badge:hover {
      background: rgba(16, 185, 129, 0.25);
    }

    .certification-badge svg {
      width: 16px;
      height: 16px;
    }

    /* ===========================
       Ingredient Cards
       =========================== */
    .ingredient-card {
      background: linear-gradient(135deg, var(--health-cream) 0%, #d1fae5 100%);
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      text-align: center;
      transition: transform var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing);
      border: 1px solid rgba(5, 150, 105, 0.08);
    }

    .ingredient-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 24px rgba(5, 150, 105, 0.15);
    }

    .ingredient-amount {
      font-size: var(--text-4xl);
      font-weight: 800;
      color: var(--health-primary);
      line-height: 1.1;
    }

    .ingredient-name {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--color-gray-700);
      margin-top: var(--space-1);
    }

    .ingredient-desc {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      margin-top: 4px;
      line-height: 1.5;
    }

    /* ===========================
       Benefits List
       =========================== */
    .benefits-list-item {
      padding: var(--space-2) 0;
      border-bottom: 1px solid var(--color-gray-200);
      display: flex;
      align-items: center;
      gap: var(--space-1);
      font-size: var(--text-base);
      color: var(--color-gray-700);
      line-height: 1.6;
    }

    .benefits-list-item:last-child {
      border-bottom: none;
    }

    .benefits-list-item svg {
      width: 20px;
      height: 20px;
      color: var(--health-primary);
      flex-shrink: 0;
    }

    /* ===========================
       Enhanced Dosage Visual Guide
       =========================== */
    .dosage-visual-guide {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-4);
      margin-top: var(--space-5);
    }

    .dosage-card {
      text-align: center;
      padding: var(--space-5) var(--space-3);
      background: var(--health-cream);
      border-radius: var(--radius-xl);
      position: relative;
      overflow: hidden;
      transition: transform var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing);
    }

    .dosage-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .dosage-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--health-primary), var(--health-primary-light));
    }

    .dosage-time-label {
      font-size: var(--text-xs);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-gray-500);
      margin-bottom: var(--space-2);
    }

    .dosage-icon {
      width: 72px;
      height: 72px;
      margin: 0 auto var(--space-2);
      background: linear-gradient(135deg, var(--health-primary) 0%, var(--health-primary-light) 100%);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);
    }

    .dosage-icon svg {
      width: 32px;
      height: 32px;
    }

    .dosage-icon-morning svg {
      /* sunrise icon styling */
      filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));
    }

    .dosage-icon-afternoon svg {
      /* sun icon styling */
      filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));
    }

    .dosage-icon-evening svg {
      /* moon icon styling */
      filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));
    }

    .dosage-text {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--health-primary);
      margin-top: var(--space-1);
    }

    .dosage-detail {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      margin-top: 4px;
    }

    .dosage-connector {
      display: none;
    }

    @media (min-width: 769px) {
      .dosage-connector {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: -28px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        width: 24px;
        height: 24px;
        color: var(--color-gray-400);
      }

      .dosage-card {
        position: relative;
      }

      .dosage-card:last-child .dosage-connector {
        display: none;
      }
    }

    /* ===========================
       Allergen Warning Section (NEW)
       =========================== */
    .allergen-section {
      padding: var(--space-8) var(--space-6);
      background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
    }

    .allergen-box {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border: 2px solid #f59e0b;
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(245, 158, 11, 0.15);
    }

    .allergen-header {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      padding: var(--space-3) var(--space-4);
      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: #ffffff;
    }

    .allergen-header svg {
      width: 28px;
      height: 28px;
      flex-shrink: 0;
    }

    .allergen-header-title {
      font-size: var(--text-xl);
      font-weight: 700;
    }

    .allergen-body {
      padding: var(--space-4);
    }

    .allergen-notice {
      font-size: var(--text-base);
      color: var(--color-gray-700);
      line-height: 1.8;
      margin-bottom: var(--space-3);
    }

    .allergen-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
    }

    .allergen-tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 14px;
      background: #fef3c7;
      border: 1px solid #fbbf24;
      border-radius: var(--radius-full);
      font-size: var(--text-sm);
      font-weight: 600;
      color: #92400e;
    }

    .allergen-tag svg {
      width: 14px;
      height: 14px;
    }

    .allergen-footnote {
      margin-top: var(--space-3);
      padding-top: var(--space-2);
      border-top: 1px solid var(--color-gray-200);
      font-size: var(--text-xs);
      color: var(--color-gray-500);
      line-height: 1.6;
    }

    /* ===========================
       Clinical Evidence Section (NEW)
       =========================== */
    .clinical-section {
      background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%);
    }

    .clinical-header {
      text-align: center;
      margin-bottom: var(--space-8);
    }

    .clinical-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);
    }

    .clinical-card {
      background: #ffffff;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      border: 1px solid var(--color-gray-200);
      box-shadow: var(--shadow-sm);
      transition: transform var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing);
    }

    .clinical-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }

    .clinical-icon {
      width: 48px;
      height: 48px;
      background: var(--health-cream);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--health-primary);
      margin-bottom: var(--space-2);
    }

    .clinical-icon svg {
      width: 24px;
      height: 24px;
    }

    .clinical-card-title {
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: var(--space-1);
    }

    .clinical-card-text {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
      line-height: 1.7;
    }

    .clinical-card-ref {
      display: inline-block;
      margin-top: var(--space-2);
      font-size: var(--text-xs);
      color: var(--health-primary);
      font-weight: 500;
      font-style: italic;
    }

    .clinical-summary {
      margin-top: var(--space-5);
      padding: var(--space-4);
      background: var(--health-cream);
      border-radius: var(--radius-lg);
      border-left: 4px solid var(--health-primary);
    }

    .clinical-summary-title {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--health-primary);
      margin-bottom: var(--space-1);
    }

    .clinical-summary-text {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
      line-height: 1.7;
    }

    /* ===========================
       Caution / Warning Box
       =========================== */
    .warning-box {
      background: #fffbeb;
      border-left: 4px solid var(--color-warning);
      padding: var(--space-3);
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
      margin-top: var(--space-5);
      display: flex;
      gap: var(--space-2);
      align-items: flex-start;
    }

    .warning-icon {
      color: var(--color-warning);
      flex-shrink: 0;
    }

    .warning-icon svg {
      width: 24px;
      height: 24px;
    }

    .warning-content { flex: 1; }

    .warning-title {
      font-weight: 700;
      color: var(--color-warning);
      margin-bottom: var(--space-1);
    }

    .warning-text {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
      line-height: 1.7;
    }

    /* ===========================
       CTA overrides
       =========================== */
    .cta-section {
      background: linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%);
    }

    .cta-button {
      background: var(--health-cta-gradient);
      box-shadow: var(--health-cta-shadow);
    }

    .cta-button:hover {
      box-shadow: 0 15px 40px rgba(5, 150, 105, 0.5);
    }

    /* ===========================
       Responsive
       =========================== */
    @media (max-width: 768px) {
      .dosage-visual-guide {
        grid-template-columns: 1fr;
        gap: var(--space-3);
      }

      .clinical-grid {
        grid-template-columns: 1fr;
      }

      .allergen-section {
        padding: var(--space-6) var(--space-3);
      }

      .allergen-header {
        padding: var(--space-2) var(--space-3);
      }

      .allergen-body {
        padding: var(--space-3);
      }
    }
  </style>
</head>
<body>
  <div class="detail-page">

    <!-- ========================
         HERO SECTION
         with certification badges
         ======================== -->
    <section class="hero health-hero-bg">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-text">
          <div class="certification-badges">
            {{CERTIFICATION_BADGES}}
          </div>
          <h1 class="hero-title">{{HEADLINE}}</h1>
          <p class="hero-subtitle">{{SUBHEADLINE}}</p>
          <p style="font-size: var(--text-sm); color: rgba(255,255,255,0.6); margin-top: var(--space-3); line-height: 1.6;">
            {{FUNCTIONAL_CLAIM}}
          </p>
        </div>
        <div class="hero-image-wrap">
          <img src="{{IMAGE_1}}" alt="{{PRODUCT_NAME}}" class="hero-image">
          <div class="hero-floating-badge">
            <span style="font-size: var(--text-xs);">{{BADGE_LABEL}}</span>
            <span style="font-size: var(--text-xl);">{{BADGE_VALUE}}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================
         KEY INGREDIENTS
         ======================== -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">KEY INGREDIENTS</span>
        <h2 class="headline-lg">{{INGREDIENTS_TITLE}}</h2>
      </div>
      <div class="features-grid">
        {{INGREDIENT_CARDS}}
      </div>
    </section>

    <!-- ========================
         BENEFITS SECTION
         image + list layout
         ======================== -->
    <section class="section section-gray">
      <div class="story-section">
        <div class="story-image-wrap">
          <div class="story-image-accent"></div>
          <img src="{{IMAGE_2}}" alt="효능" class="story-image">
        </div>
        <div class="story-content">
          <span class="story-label">BENEFITS</span>
          <h2 class="story-title">{{BENEFITS_TITLE}}</h2>
          <p class="story-text">{{BENEFITS_TEXT}}</p>
          <ul style="list-style: none; padding: 0;">
            {{BENEFITS_LIST}}
          </ul>
        </div>
      </div>
    </section>

    <!-- ========================
         ENHANCED DOSAGE VISUAL GUIDE (NEW)
         Morning / Afternoon / Evening
         ======================== -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-5);">
        <span class="story-label">HOW TO TAKE</span>
        <h2 class="headline-lg">올바른 섭취 방법</h2>
        <p class="body-md" style="margin-top: var(--space-2); max-width: 600px; margin-left: auto; margin-right: auto;">
          시간대별 최적의 섭취 가이드를 따라 최대 효과를 경험하세요
        </p>
      </div>
      <div class="dosage-visual-guide">
        {{DOSAGE_ITEMS}}
      </div>
    </section>

    <!-- ========================
         ALLERGEN WARNING (NEW)
         Prominent yellow/orange box
         ======================== -->
    <section class="allergen-section">
      <div class="allergen-box">
        <div class="allergen-header">
          {{ICON_ALERT_TRIANGLE}}
          <span class="allergen-header-title">알레르기 유발 물질 안내</span>
        </div>
        <div class="allergen-body">
          <p class="allergen-notice">
            본 제품은 다음의 알레르기 유발 물질을 포함하고 있거나, 해당 물질을 사용하는 시설에서 제조되었습니다.
            알레르기가 있으신 분은 반드시 확인 후 섭취하시기 바랍니다.
          </p>
          <div class="allergen-list">
            {{ALLERGEN_TAGS}}
          </div>
          <p class="allergen-footnote">
            * 위 알레르기 정보는 식품위생법에 따라 표기된 것이며, 개인의 알레르기 반응은 다를 수 있습니다.
            이상 반응이 나타나면 즉시 섭취를 중단하고 전문의와 상담하시기 바랍니다.
          </p>
        </div>
      </div>
    </section>

    <!-- ========================
         CLINICAL EVIDENCE (NEW)
         Scientific background & study references
         ======================== -->
    <section class="section clinical-section">
      <div class="clinical-header">
        <span class="story-label">CLINICAL EVIDENCE</span>
        <h2 class="headline-lg">과학적 근거</h2>
        <p class="body-md" style="margin-top: var(--space-2); max-width: 640px; margin-left: auto; margin-right: auto;">
          엄격한 임상시험과 과학적 연구를 통해 검증된 원료를 사용합니다
        </p>
      </div>
      <div class="clinical-grid">
        {{CLINICAL_CARDS}}
      </div>
      <div class="clinical-summary">
        <p class="clinical-summary-title">연구 결과 요약</p>
        <p class="clinical-summary-text">
          {{CLINICAL_SUMMARY}}
        </p>
      </div>
    </section>

    <!-- ========================
         CAUTION / WARNING BOX
         ======================== -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-5);">
        <span class="story-label">CAUTION</span>
        <h2 class="headline-lg">섭취 시 주의사항</h2>
      </div>
      <div class="warning-box">
        <div class="warning-icon">{{ICON_ALERT_TRIANGLE}}</div>
        <div class="warning-content">
          <p class="warning-title">주의사항 안내</p>
          <p class="warning-text">{{CAUTION_NOTES}}</p>
        </div>
      </div>
    </section>

    <!-- ========================
         TRUST BADGES
         ======================== -->
    <section class="trust-section">
      <span class="story-label">TRUST &amp; SAFETY</span>
      <h2 class="headline-lg">{{TRUST_TITLE}}</h2>
      <div class="trust-badges">
        {{TRUST_BADGES}}
      </div>
    </section>

    <!-- ========================
         CTA SECTION
         ======================== -->
    <section class="cta-section">
      <h2 class="cta-title">{{CTA_TITLE}}</h2>
      <p class="cta-subtitle">{{CTA_SUBTITLE}}</p>
      <a href="#" class="cta-button">
        <span>{{CTA_BUTTON}}</span>
        {{ICON_ARROW_RIGHT}}
      </a>
      <p class="cta-note">{{CTA_NOTE}}</p>
    </section>

    <!-- ========================
         PRODUCT INFO TABLE
         ======================== -->
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
