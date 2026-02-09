import { BASE_STYLES } from '../../base-styles';
import { getColorScheme } from '../../color-schemes';

/**
 * Modern Food Template
 * Warm, appetizing design with orange/red appetite-stimulating colors.
 * Includes: hero with taste tags, features grid, recipe suggestion cards,
 * nutrition info grid, story section, cooking process, allergen warning,
 * stats row, reviews grid, trust badges, CTA section, product info table.
 */
export function getFoodModernTemplate(): string {
  const colors = getColorScheme('food', 'modern');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  ${BASE_STYLES}
  <style>
    /* ===========================
       Food Modern Theme Overrides
       =========================== */
    :root {
      --food-primary: ${colors.primary};
      --food-primary-light: ${colors.primaryLight};
      --food-primary-dark: ${colors.primaryDark};
      --food-accent: ${colors.accent};
      --food-cream: ${colors.cream};
    }

    /* Hero */
    .food-hero-bg {
      background: ${colors.heroGradient};
    }
    .food-hero-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      ${colors.heroBgBefore ? `background: ${colors.heroBgBefore};` : ''}
    }

    .hero-badge {
      background: ${colors.badgeBg};
      border-color: ${colors.badgeBorder};
      color: #ffffff;
    }

    .hero-floating-badge {
      background: linear-gradient(135deg, var(--food-primary) 0%, var(--food-accent) 100%);
      box-shadow: 0 10px 30px rgba(232, 93, 38, 0.45);
    }

    /* Taste Tags */
    .taste-tags-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: var(--space-3);
    }

    .taste-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: var(--radius-full);
      font-size: var(--text-sm);
      font-weight: 600;
      color: #ffffff;
      backdrop-filter: blur(6px);
      transition: background var(--animation-duration) var(--animation-easing),
                  transform var(--animation-duration) var(--animation-easing);
    }

    .taste-tag:hover {
      background: rgba(255, 255, 255, 0.22);
      transform: translateY(-2px);
    }

    /* Feature Cards Accent */
    .feature-icon {
      background: linear-gradient(135deg, var(--food-primary) 0%, var(--food-accent) 100%);
    }

    .feature-card:hover {
      border-color: var(--food-primary-light);
      box-shadow: var(--shadow-xl), 0 0 0 1px rgba(232, 93, 38, 0.12);
    }

    /* ===========================
       Recipe Suggestion Cards
       =========================== */
    .recipe-section-title {
      text-align: center;
      margin-bottom: var(--space-8);
    }

    .recipe-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);
    }

    .recipe-card {
      background: #ffffff;
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--color-gray-100);
      transition: transform var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing);
    }

    .recipe-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-xl);
    }

    .recipe-image-wrap {
      position: relative;
      overflow: hidden;
      height: 220px;
    }

    .recipe-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s var(--animation-easing);
    }

    .recipe-card:hover .recipe-image {
      transform: scale(1.06);
    }

    .recipe-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      padding: 6px 14px;
      background: var(--food-primary);
      color: #ffffff;
      font-size: var(--text-xs);
      font-weight: 700;
      border-radius: var(--radius-full);
      letter-spacing: 0.03em;
    }

    .recipe-content {
      padding: var(--space-3) var(--space-4) var(--space-4);
    }

    .recipe-title {
      font-size: var(--text-xl);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: 8px;
      line-height: 1.35;
    }

    .recipe-desc {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
      line-height: 1.7;
      margin-bottom: 12px;
    }

    .recipe-meta {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      font-size: var(--text-xs);
      color: var(--color-gray-500);
    }

    .recipe-meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .recipe-meta-item svg {
      width: 14px;
      height: 14px;
    }

    /* ===========================
       Nutrition Info Grid
       =========================== */
    .nutrition-section {
      background: var(--food-cream);
    }

    .nutrition-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-3);
    }

    .nutrition-card {
      background: #ffffff;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      text-align: center;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--color-gray-100);
      transition: transform var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing);
    }

    .nutrition-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }

    .nutrition-icon {
      width: 48px;
      height: 48px;
      margin: 0 auto var(--space-2);
      background: linear-gradient(135deg, var(--food-primary) 0%, var(--food-accent) 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }

    .nutrition-icon svg {
      width: 22px;
      height: 22px;
    }

    .nutrition-value {
      font-size: var(--text-2xl);
      font-weight: 800;
      color: var(--food-primary);
      line-height: 1.2;
    }

    .nutrition-unit {
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--color-gray-500);
    }

    .nutrition-label {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
      margin-top: 4px;
      font-weight: 500;
    }

    /* ===========================
       Story Section Accent
       =========================== */
    .story-label {
      color: var(--food-primary);
    }

    .story-image-accent {
      background: linear-gradient(135deg, var(--food-primary) 0%, var(--food-accent) 100%);
    }

    .stat-number {
      color: var(--food-primary);
    }

    /* ===========================
       Cooking Process Section
       =========================== */
    .cooking-section {
      background: #ffffff;
    }

    .cooking-header {
      text-align: center;
      margin-bottom: var(--space-8);
    }

    .cooking-steps {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
      max-width: 800px;
      margin: 0 auto;
    }

    .cooking-step {
      display: flex;
      align-items: flex-start;
      gap: var(--space-4);
      position: relative;
    }

    .cooking-step:not(:last-child)::after {
      content: '';
      position: absolute;
      left: 28px;
      top: 64px;
      bottom: -28px;
      width: 2px;
      background: linear-gradient(180deg, var(--food-accent) 0%, var(--color-gray-200) 100%);
    }

    .step-number {
      flex-shrink: 0;
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, var(--food-primary) 0%, var(--food-accent) 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: var(--text-xl);
      font-weight: 800;
      box-shadow: 0 4px 12px rgba(232, 93, 38, 0.3);
      position: relative;
      z-index: 1;
    }

    .step-content {
      flex: 1;
      padding-top: 6px;
    }

    .step-title {
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: 6px;
    }

    .step-desc {
      font-size: var(--text-base);
      color: var(--color-gray-600);
      line-height: 1.75;
    }

    .step-tip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 10px;
      padding: 6px 14px;
      background: var(--food-cream);
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--food-primary);
    }

    .step-tip svg {
      width: 14px;
      height: 14px;
    }

    /* ===========================
       Allergen Warning Box
       =========================== */
    .allergen-section {
      padding: var(--space-6);
    }

    .allergen-box {
      max-width: 800px;
      margin: 0 auto;
      background: #fffbeb;
      border: 2px solid #fbbf24;
      border-radius: var(--radius-xl);
      padding: var(--space-5);
      position: relative;
      overflow: hidden;
    }

    .allergen-box::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 6px;
      height: 100%;
      background: #f59e0b;
      border-radius: 3px 0 0 3px;
    }

    .allergen-header {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-3);
    }

    .allergen-icon {
      width: 40px;
      height: 40px;
      background: #fef3c7;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #d97706;
    }

    .allergen-icon svg {
      width: 22px;
      height: 22px;
    }

    .allergen-title {
      font-size: var(--text-lg);
      font-weight: 700;
      color: #92400e;
    }

    .allergen-content {
      font-size: var(--text-base);
      color: #78350f;
      line-height: 1.8;
      padding-left: 52px;
    }

    .allergen-list {
      list-style: none;
      padding: 0;
      margin: var(--space-2) 0 0 0;
    }

    .allergen-list li {
      padding: 4px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .allergen-list li::before {
      content: '';
      width: 6px;
      height: 6px;
      background: #d97706;
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* ===========================
       Reviews Accent
       =========================== */
    .review-stars {
      color: var(--food-accent);
    }

    /* ===========================
       Trust Badges Accent
       =========================== */
    .trust-badge-icon {
      color: var(--food-primary);
    }

    /* ===========================
       CTA Section
       =========================== */
    .food-cta {
      background: ${colors.heroGradient};
    }

    .food-cta .cta-button {
      background: #ffffff;
      color: var(--food-primary);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .food-cta .cta-button:hover {
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    }

    /* ===========================
       Serving Suggestion Banner
       =========================== */
    .serving-suggestion {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-4);
      background: var(--food-cream);
      border-radius: var(--radius-xl);
      border: 1px solid rgba(232, 93, 38, 0.12);
      margin-top: var(--space-5);
    }

    .serving-icon {
      flex-shrink: 0;
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, var(--food-primary) 0%, var(--food-accent) 100%);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }

    .serving-icon svg {
      width: 28px;
      height: 28px;
    }

    .serving-text {
      flex: 1;
    }

    .serving-text strong {
      display: block;
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: 2px;
    }

    .serving-text span {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
      line-height: 1.6;
    }

    /* ===========================
       Responsive Overrides
       =========================== */
    @media (max-width: 1024px) {
      .nutrition-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .recipe-grid {
        grid-template-columns: 1fr;
      }

      .nutrition-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .cooking-step:not(:last-child)::after {
        display: none;
      }

      .allergen-content {
        padding-left: 0;
      }

      .serving-suggestion {
        flex-direction: column;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .nutrition-grid {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-2);
      }

      .nutrition-card {
        padding: var(--space-3);
      }

      .cooking-step {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .cooking-step:not(:last-child)::after {
        display: none;
      }

      .step-tip {
        justify-content: center;
      }
    }
  </style>
</head>
<body>
  <div class="detail-page">

    <!-- 1. Hero with Taste Tags -->
    <section class="hero food-hero-bg">
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-badge">{{BADGE_TEXT}}</span>
          <h1 class="hero-title">{{HEADLINE}}</h1>
          <p class="hero-subtitle">{{SUBHEADLINE}}</p>
          <div class="taste-tags-wrap">
            {{TASTE_TAGS}}
          </div>
        </div>
        <div class="hero-image-wrap">
          <img src="{{IMAGE_1}}" alt="{{PRODUCT_NAME}}" class="hero-image" loading="eager">
          <div class="hero-floating-badge">
            <span style="font-size: var(--text-sm);">{{BADGE_LABEL}}</span>
            <span style="font-size: var(--text-2xl);">{{BADGE_VALUE}}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Features Grid -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">SPECIAL FEATURES</span>
        <h2 class="headline-lg">{{FEATURES_TITLE}}</h2>
      </div>
      <div class="features-grid">
        {{FEATURE_CARDS}}
      </div>
    </section>

    <!-- 3. Recipe Suggestion Cards -->
    <section class="section section-gray">
      <div class="recipe-section-title">
        <span class="story-label">RECIPE IDEAS</span>
        <h2 class="headline-lg">이 제품으로 만드는 특별한 레시피</h2>
      </div>
      <div class="recipe-grid">
        {{RECIPE_CARDS}}
      </div>
    </section>

    <!-- 4. Nutrition Info Grid -->
    <section class="section nutrition-section">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">NUTRITION FACTS</span>
        <h2 class="headline-lg">영양 정보</h2>
        <p class="body-md" style="margin-top: var(--space-2);">1회 제공량 기준 주요 영양소 함량</p>
      </div>
      <div class="nutrition-grid">
        {{NUTRITION_GRID}}
      </div>
    </section>

    <!-- 5. Story Section (image + text) -->
    <section class="section section-light">
      <div class="story-section">
        <div class="story-image-wrap">
          <div class="story-image-accent"></div>
          <img src="{{IMAGE_2}}" alt="{{PRODUCT_NAME}} 스토리" class="story-image" loading="lazy">
        </div>
        <div class="story-content">
          <span class="story-label">{{STORY_LABEL}}</span>
          <h2 class="story-title">{{STORY_TITLE}}</h2>
          <p class="story-text">{{STORY_TEXT}}</p>
          <div class="serving-suggestion">
            {{SERVING_SUGGESTION}}
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Cooking Process Section -->
    <section class="section cooking-section">
      <div class="cooking-header">
        <span class="story-label">HOW TO COOK</span>
        <h2 class="headline-lg">이렇게 만들어요</h2>
        <p class="body-md" style="margin-top: var(--space-2);">간단한 조리 과정으로 맛있는 한 끼를 완성하세요</p>
      </div>
      <div class="cooking-steps">
        {{COOKING_STEPS}}
      </div>
    </section>

    <!-- 7. Allergen Warning Box -->
    <section class="section section-gray allergen-section">
      <div class="allergen-box">
        <div class="allergen-header">
          <div class="allergen-icon">
            {{ICON_ALERT_TRIANGLE}}
          </div>
          <h3 class="allergen-title">알레르기 유발 성분 안내</h3>
        </div>
        <div class="allergen-content">
          {{ALLERGEN_WARNING}}
        </div>
      </div>
    </section>

    <!-- 8. Stats Row -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-6);">
        <span class="story-label">BY THE NUMBERS</span>
        <h2 class="headline-lg">숫자로 보는 품질</h2>
      </div>
      <div class="stats-row" style="justify-content: center; border-top: none; padding-top: 0;">
        {{STATS_ITEMS}}
      </div>
    </section>

    <!-- 9. Reviews Grid -->
    <section class="section section-gray">
      <div style="text-align: center; margin-bottom: var(--space-6);">
        <span class="story-label">REVIEWS</span>
        <h2 class="headline-lg">고객님들의 솔직한 후기</h2>
      </div>
      <div class="reviews-grid">
        {{REVIEW_CARDS}}
      </div>
    </section>

    <!-- 10. Trust Badges -->
    <section class="trust-section">
      <span class="story-label">WHY CHOOSE US</span>
      <h2 class="headline-lg">{{TRUST_TITLE}}</h2>
      <div class="trust-badges">
        {{TRUST_BADGES}}
      </div>
    </section>

    <!-- 11. CTA Section -->
    <section class="cta-section food-cta">
      <h2 class="cta-title">{{CTA_TITLE}}</h2>
      <p class="cta-subtitle">{{CTA_SUBTITLE}}</p>
      <a href="#" class="cta-button">
        <span>{{CTA_BUTTON}}</span>
        {{ICON_ARROW_RIGHT}}
      </a>
      <p class="cta-note">{{CTA_NOTE}}</p>
    </section>

    <!-- 12. Product Info Table -->
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
