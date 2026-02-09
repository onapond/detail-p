import { BASE_STYLES } from '../../base-styles';
import { getColorScheme } from '../../color-schemes';

/**
 * Health Supplement - Classic Template
 *
 * Clinical/Trust-focused design with blue-green tones.
 * Data-driven layout with a clean, medical-professional aesthetic.
 *
 * Section order:
 * Hero -> Certifications Grid -> Ingredients (with amounts table)
 * -> Clinical Evidence -> Benefits (numbered) -> Dosage Guide
 * -> Allergen Warning -> Reviews -> Trust -> CTA -> Product Info
 */
export function getHealthClassicTemplate(): string {
  const colors = getColorScheme('health', 'classic');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  ${BASE_STYLES}
  <style>
    /* ===========================
       Health Classic Theme
       Blue-green clinical tones
       =========================== */
    :root {
      --hc-primary: ${colors.primary};
      --hc-primary-light: ${colors.primaryLight};
      --hc-primary-dark: ${colors.primaryDark};
      --hc-accent: ${colors.accent};
      --hc-cream: ${colors.cream};
      --hc-hero-gradient: ${colors.heroGradient};
      --hc-hero-bg-before: ${colors.heroBgBefore};
      --hc-badge-bg: ${colors.badgeBg};
      --hc-badge-border: ${colors.badgeBorder};
      --hc-badge-text: ${colors.badgeText};
      --hc-cta-gradient: ${colors.ctaGradient};
      --hc-cta-shadow: ${colors.ctaShadow};
    }

    /* Hero overrides */
    .classic-hero-bg {
      background: var(--hc-hero-gradient);
    }
    .classic-hero-bg::before {
      background: var(--hc-hero-bg-before);
    }

    .hero-badge {
      background: var(--hc-badge-bg);
      border-color: var(--hc-badge-border);
      color: var(--hc-primary-light);
    }

    .hero-floating-badge {
      background: linear-gradient(135deg, var(--hc-primary) 0%, var(--hc-primary-light) 100%);
      box-shadow: 0 10px 30px rgba(13, 148, 136, 0.4);
    }

    /* Global accent overrides */
    .story-label { color: var(--hc-primary); }
    .stat-number { color: var(--hc-primary); }
    .text-accent { color: var(--hc-primary); }
    .trust-badge-icon { color: var(--hc-primary); }

    .feature-icon {
      background: linear-gradient(135deg, var(--hc-primary) 0%, var(--hc-primary-light) 100%);
    }

    .story-image-accent {
      background: linear-gradient(135deg, var(--hc-primary) 0%, var(--hc-primary-light) 100%);
    }

    /* ===========================
       Certifications Grid
       =========================== */
    .cert-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-3);
      margin-top: var(--space-5);
    }

    .cert-card {
      background: #ffffff;
      border: 1px solid var(--color-gray-200);
      border-radius: var(--radius-md);
      padding: var(--space-4) var(--space-3);
      text-align: center;
      transition: transform var(--animation-duration) var(--animation-easing),
                  border-color var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing);
    }

    .cert-card:hover {
      transform: translateY(-4px);
      border-color: var(--hc-primary-light);
      box-shadow: 0 8px 24px rgba(13, 148, 136, 0.12);
    }

    .cert-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto var(--space-2);
      background: var(--hc-cream);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--hc-primary);
    }

    .cert-icon svg {
      width: 28px;
      height: 28px;
    }

    .cert-name {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--color-gray-800);
      margin-bottom: 4px;
    }

    .cert-desc {
      font-size: var(--text-xs);
      color: var(--color-gray-500);
      line-height: 1.5;
    }

    /* ===========================
       Ingredient Data Table
       =========================== */
    .ingredient-data-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: var(--space-5);
      background: #ffffff;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }

    .ingredient-data-table thead th {
      background: linear-gradient(135deg, var(--hc-primary) 0%, var(--hc-primary-light) 100%);
      color: #ffffff;
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-sm);
      font-weight: 700;
      text-align: left;
      letter-spacing: 0.02em;
    }

    .ingredient-data-table tbody td {
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-sm);
      color: var(--color-gray-700);
      border-bottom: 1px solid var(--color-gray-100);
      line-height: 1.6;
    }

    .ingredient-data-table tbody tr:hover {
      background: var(--hc-cream);
    }

    .ingredient-data-table tbody tr:last-child td {
      border-bottom: none;
    }

    .amount-highlight {
      font-weight: 700;
      color: var(--hc-primary);
    }

    .daily-value {
      font-size: var(--text-xs);
      color: var(--color-gray-500);
    }

    /* ===========================
       Clinical Evidence Cards
       =========================== */
    .evidence-section {
      background: linear-gradient(180deg, var(--hc-cream) 0%, #ffffff 100%);
    }

    .evidence-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);
      margin-top: var(--space-5);
    }

    .evidence-card {
      background: #ffffff;
      border: 1px solid var(--color-gray-200);
      border-radius: var(--radius-md);
      padding: var(--space-4);
      position: relative;
      transition: transform var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing);
    }

    .evidence-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
    }

    .evidence-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(180deg, var(--hc-primary), var(--hc-primary-light));
      border-radius: 4px 0 0 4px;
    }

    .evidence-type {
      display: inline-block;
      padding: 2px 10px;
      background: var(--hc-cream);
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
      font-weight: 700;
      color: var(--hc-primary);
      margin-bottom: var(--space-2);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .evidence-title {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: var(--space-1);
      line-height: 1.4;
    }

    .evidence-desc {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
      line-height: 1.7;
    }

    .evidence-ref {
      display: block;
      margin-top: var(--space-2);
      font-size: var(--text-xs);
      color: var(--hc-primary);
      font-style: italic;
      font-weight: 500;
    }

    /* ===========================
       Benefits - Numbered List
       =========================== */
    .numbered-benefits {
      max-width: 720px;
      margin: var(--space-5) auto 0;
    }

    .numbered-benefit {
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);
      padding: var(--space-3) 0;
      border-bottom: 1px solid var(--color-gray-200);
    }

    .numbered-benefit:last-child {
      border-bottom: none;
    }

    .benefit-number {
      flex-shrink: 0;
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, var(--hc-primary) 0%, var(--hc-primary-light) 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: var(--text-lg);
      font-weight: 800;
      box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);
    }

    .benefit-content {
      flex: 1;
      padding-top: 2px;
    }

    .benefit-content-title {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: 4px;
    }

    .benefit-content-text {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
      line-height: 1.7;
    }

    /* ===========================
       Dosage Guide
       =========================== */
    .dosage-guide {
      display: flex;
      justify-content: space-around;
      margin-top: var(--space-5);
      padding: var(--space-5);
      background: var(--hc-cream);
      border-radius: var(--radius-lg);
      border: 1px solid rgba(13, 148, 136, 0.1);
    }

    .dosage-step {
      text-align: center;
      flex: 1;
      padding: 0 var(--space-2);
      position: relative;
    }

    .dosage-step:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 60%;
      background: rgba(13, 148, 136, 0.2);
    }

    .dosage-step-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto var(--space-2);
      background: linear-gradient(135deg, var(--hc-primary) 0%, var(--hc-primary-light) 100%);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }

    .dosage-step-icon svg {
      width: 28px;
      height: 28px;
    }

    .dosage-step-time {
      font-size: var(--text-xs);
      color: var(--color-gray-500);
      margin-bottom: 4px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .dosage-step-text {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--hc-primary);
    }

    .dosage-step-note {
      font-size: var(--text-xs);
      color: var(--color-gray-500);
      margin-top: 4px;
    }

    /* ===========================
       Allergen Warning (compact clinical style)
       =========================== */
    .allergen-warning-section {
      padding: var(--space-6) var(--space-6);
      background: #fffbeb;
    }

    .allergen-compact {
      max-width: 800px;
      margin: 0 auto;
      border: 2px solid #f59e0b;
      border-radius: var(--radius-md);
      overflow: hidden;
      background: #ffffff;
    }

    .allergen-compact-header {
      background: #fef3c7;
      padding: var(--space-2) var(--space-3);
      display: flex;
      align-items: center;
      gap: var(--space-1);
      border-bottom: 1px solid #fbbf24;
    }

    .allergen-compact-header svg {
      width: 20px;
      height: 20px;
      color: #d97706;
      flex-shrink: 0;
    }

    .allergen-compact-title {
      font-size: var(--text-base);
      font-weight: 700;
      color: #92400e;
    }

    .allergen-compact-body {
      padding: var(--space-3);
    }

    .allergen-compact-text {
      font-size: var(--text-sm);
      color: var(--color-gray-700);
      line-height: 1.7;
      margin-bottom: var(--space-2);
    }

    .allergen-chip-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .allergen-chip {
      padding: 4px 12px;
      background: #fef3c7;
      border: 1px solid #fde68a;
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
      font-weight: 600;
      color: #92400e;
    }

    .allergen-compact-note {
      margin-top: var(--space-2);
      font-size: 11px;
      color: var(--color-gray-500);
    }

    /* ===========================
       CTA overrides
       =========================== */
    .cta-section {
      background: linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%);
    }

    .cta-button {
      background: var(--hc-cta-gradient);
      box-shadow: var(--hc-cta-shadow);
    }

    .cta-button:hover {
      box-shadow: 0 15px 40px rgba(13, 148, 136, 0.5);
    }

    /* ===========================
       Responsive
       =========================== */
    @media (max-width: 1024px) {
      .cert-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .cert-grid {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-2);
      }

      .evidence-grid {
        grid-template-columns: 1fr;
      }

      .dosage-guide {
        flex-direction: column;
        gap: var(--space-3);
        padding: var(--space-4);
      }

      .dosage-step:not(:last-child)::after {
        display: none;
      }

      .allergen-warning-section {
        padding: var(--space-4) var(--space-3);
      }
    }

    @media (max-width: 480px) {
      .cert-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="detail-page">

    <!-- ========================
         HERO SECTION
         Clinical hero with badge
         ======================== -->
    <section class="hero classic-hero-bg">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-badge">{{BADGE_TEXT}}</span>
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
         CERTIFICATIONS GRID
         ======================== -->
    <section class="section section-light">
      <div style="text-align: center;">
        <span class="story-label">CERTIFICATIONS</span>
        <h2 class="headline-lg">인증 및 품질 관리</h2>
        <p class="body-md" style="margin-top: var(--space-1); max-width: 580px; margin-left: auto; margin-right: auto;">
          엄격한 품질 기준을 통과한 인증 원료와 제조 공정을 사용합니다
        </p>
      </div>
      <div class="cert-grid">
        {{CERTIFICATION_BADGES}}
      </div>
    </section>

    <!-- ========================
         INGREDIENTS WITH AMOUNTS
         Data table layout
         ======================== -->
    <section class="section section-gray">
      <div style="text-align: center; margin-bottom: var(--space-5);">
        <span class="story-label">KEY INGREDIENTS</span>
        <h2 class="headline-lg">{{INGREDIENTS_TITLE}}</h2>
      </div>
      <table class="ingredient-data-table">
        <thead>
          <tr>
            <th>성분명</th>
            <th>1일 섭취량</th>
            <th>일일 권장량 대비</th>
            <th>주요 기능</th>
          </tr>
        </thead>
        <tbody>
          {{INGREDIENT_TABLE_ROWS}}
        </tbody>
      </table>
      <div class="features-grid" style="margin-top: var(--space-5);">
        {{INGREDIENT_CARDS}}
      </div>
    </section>

    <!-- ========================
         CLINICAL EVIDENCE
         ======================== -->
    <section class="section evidence-section">
      <div style="text-align: center; margin-bottom: var(--space-5);">
        <span class="story-label">CLINICAL EVIDENCE</span>
        <h2 class="headline-lg">과학적 근거 및 임상 연구</h2>
        <p class="body-md" style="margin-top: var(--space-1); max-width: 600px; margin-left: auto; margin-right: auto;">
          신뢰할 수 있는 과학적 연구 결과에 기반한 제품입니다
        </p>
      </div>
      <div class="evidence-grid">
        {{CLINICAL_CARDS}}
      </div>
    </section>

    <!-- ========================
         BENEFITS - Numbered List
         ======================== -->
    <section class="section section-light">
      <div style="text-align: center;">
        <span class="story-label">BENEFITS</span>
        <h2 class="headline-lg">{{BENEFITS_TITLE}}</h2>
        <p class="body-md" style="margin-top: var(--space-1);">{{BENEFITS_TEXT}}</p>
      </div>
      <div class="numbered-benefits">
        {{BENEFITS_LIST}}
      </div>
    </section>

    <!-- ========================
         DOSAGE GUIDE
         ======================== -->
    <section class="section section-gray">
      <div style="text-align: center; margin-bottom: var(--space-5);">
        <span class="story-label">HOW TO TAKE</span>
        <h2 class="headline-lg">올바른 섭취 방법</h2>
      </div>
      <div class="dosage-guide">
        {{DOSAGE_ITEMS}}
      </div>
      <div class="warning-box" style="max-width: 720px; margin: var(--space-5) auto 0;">
        <div class="warning-icon">{{ICON_ALERT_TRIANGLE}}</div>
        <div class="warning-content">
          <p class="warning-title">섭취 시 주의사항</p>
          <p class="warning-text">{{CAUTION_NOTES}}</p>
        </div>
      </div>
    </section>

    <!-- ========================
         ALLERGEN WARNING
         ======================== -->
    <section class="allergen-warning-section">
      <div class="allergen-compact">
        <div class="allergen-compact-header">
          {{ICON_ALERT_TRIANGLE}}
          <span class="allergen-compact-title">알레르기 유발 물질 안내</span>
        </div>
        <div class="allergen-compact-body">
          <p class="allergen-compact-text">
            본 제품에 포함되어 있거나 같은 시설에서 제조되는 알레르기 유발 물질입니다.
          </p>
          <div class="allergen-chip-list">
            {{ALLERGEN_TAGS}}
          </div>
          <p class="allergen-compact-note">
            * 식품위생법에 의한 알레르기 유발 물질 표기 사항입니다.
          </p>
        </div>
      </div>
    </section>

    <!-- ========================
         REVIEWS
         ======================== -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-5);">
        <span class="story-label">REVIEWS</span>
        <h2 class="headline-lg">고객 후기</h2>
      </div>
      <div class="reviews-grid">
        {{REVIEW_CARDS}}
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
