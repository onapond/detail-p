import { BASE_STYLES } from '../../base-styles';
import { getColorScheme } from '../../color-schemes';

/**
 * Classic Food Template
 * Homey, comfortable design with warmer tones.
 * Traditional, text-heavy layout focused on family meals
 * and information-rich content.
 * Includes: hero with taste tags, features grid, recipe suggestion cards,
 * nutrition info grid, story section, cooking process, allergen warning,
 * stats row, reviews grid, trust badges, CTA section, product info table.
 */
export function getFoodClassicTemplate(): string {
  const colors = getColorScheme('food', 'classic');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  ${BASE_STYLES}
  <style>
    /* ===========================
       Food Classic Theme Overrides
       Homey, comfortable, traditional feel
       =========================== */
    :root {
      --food-primary: ${colors.primary};
      --food-primary-light: ${colors.primaryLight};
      --food-primary-dark: ${colors.primaryDark};
      --food-accent: ${colors.accent};
      --food-cream: ${colors.cream};
      --food-warm-bg: #fdfaf5;
      --food-warm-border: #f0e6d6;
    }

    body {
      background: var(--food-warm-bg);
    }

    .detail-page {
      background: var(--food-warm-bg);
    }

    /* Hero */
    .classic-hero-bg {
      background: ${colors.heroGradient};
    }
    .classic-hero-bg::before {
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
      box-shadow: 0 10px 30px rgba(212, 114, 46, 0.4);
    }

    /* Taste Tags - Classic Rounded Style */
    .taste-tags-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: var(--space-3);
    }

    .taste-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.15);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      font-size: var(--text-sm);
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.02em;
      transition: background var(--animation-duration) var(--animation-easing);
    }

    .taste-tag:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    /* Classic Section Styling */
    .section-warm {
      background: var(--food-warm-bg);
    }

    .section-warm-alt {
      background: var(--food-cream);
    }

    .classic-section-divider {
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, var(--food-primary) 0%, var(--food-accent) 100%);
      margin: 0 auto var(--space-4);
      border-radius: 2px;
    }

    /* Feature Cards - Classic Warm Style */
    .feature-icon {
      background: linear-gradient(135deg, var(--food-primary) 0%, var(--food-accent) 100%);
    }

    .feature-card {
      background: #ffffff;
      border: 1px solid var(--food-warm-border);
      border-radius: var(--radius-lg);
    }

    .feature-card:hover {
      border-color: var(--food-primary-light);
      box-shadow: var(--shadow-lg), 0 0 0 1px rgba(212, 114, 46, 0.1);
    }

    /* ===========================
       Recipe Suggestion Cards - Classic Grid Layout
       =========================== */
    .recipe-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-5);
    }

    .recipe-card {
      background: #ffffff;
      border-radius: var(--radius-lg);
      border: 1px solid var(--food-warm-border);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: transform var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing);
    }

    .recipe-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .recipe-image-wrap {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .recipe-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .recipe-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 12px 16px;
      background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 100%);
    }

    .recipe-overlay-title {
      font-size: var(--text-base);
      font-weight: 700;
      color: #ffffff;
    }

    .recipe-body {
      padding: var(--space-4);
    }

    .recipe-title {
      font-size: var(--text-xl);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .recipe-desc {
      font-size: var(--text-base);
      color: var(--color-gray-600);
      line-height: 1.75;
      margin-bottom: 14px;
    }

    .recipe-info-bar {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding-top: 14px;
      border-top: 1px solid var(--food-warm-border);
      font-size: var(--text-sm);
      color: var(--color-gray-500);
    }

    .recipe-info-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .recipe-info-item svg {
      width: 16px;
      height: 16px;
      color: var(--food-primary);
    }

    .recipe-difficulty {
      display: inline-block;
      padding: 3px 10px;
      background: var(--food-cream);
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--food-primary);
    }

    /* ===========================
       Nutrition Info - Classic Table Layout
       =========================== */
    .nutrition-section {
      background: #ffffff;
      border: 1px solid var(--food-warm-border);
      border-radius: var(--radius-xl);
      padding: var(--space-6);
      max-width: 900px;
      margin: 0 auto;
    }

    .nutrition-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 3px solid var(--food-primary);
    }

    .nutrition-header-title {
      font-size: var(--text-2xl);
      font-weight: 800;
      color: var(--color-gray-900);
    }

    .nutrition-serving {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      background: var(--food-cream);
      padding: 6px 16px;
      border-radius: var(--radius-full);
    }

    .nutrition-table {
      width: 100%;
      border-collapse: collapse;
    }

    .nutrition-table tr {
      border-bottom: 1px solid var(--color-gray-100);
    }

    .nutrition-table tr:last-child {
      border-bottom: none;
    }

    .nutrition-table td {
      padding: 14px 0;
      font-size: var(--text-base);
    }

    .nutrition-table td:first-child {
      font-weight: 600;
      color: var(--color-gray-800);
    }

    .nutrition-table td:nth-child(2) {
      text-align: right;
      font-weight: 700;
      color: var(--food-primary);
      font-size: var(--text-lg);
    }

    .nutrition-table td:nth-child(3) {
      text-align: right;
      color: var(--color-gray-500);
      font-size: var(--text-sm);
      width: 80px;
    }

    .nutrition-highlight-row td {
      background: var(--food-cream);
      padding-left: 12px;
      padding-right: 12px;
      border-radius: 6px;
    }

    .nutrition-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-3);
      margin-top: var(--space-4);
      padding-top: var(--space-4);
      border-top: 2px solid var(--color-gray-100);
    }

    .nutrition-card {
      text-align: center;
      padding: var(--space-3);
      background: var(--food-cream);
      border-radius: var(--radius-lg);
    }

    .nutrition-value {
      font-size: var(--text-2xl);
      font-weight: 800;
      color: var(--food-primary);
    }

    .nutrition-unit {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
    }

    .nutrition-label {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
      margin-top: 2px;
      font-weight: 500;
    }

    /* ===========================
       Story Section - Classic Style
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

    .serving-suggestion {
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);
      padding: var(--space-4);
      background: var(--food-cream);
      border-radius: var(--radius-lg);
      border-left: 4px solid var(--food-primary);
      margin-top: var(--space-4);
    }

    .serving-icon {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--food-primary) 0%, var(--food-accent) 100%);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }

    .serving-icon svg {
      width: 24px;
      height: 24px;
    }

    .serving-text {
      flex: 1;
    }

    .serving-text strong {
      display: block;
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: 4px;
    }

    .serving-text span {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
      line-height: 1.7;
    }

    /* ===========================
       Cooking Process - Classic Numbered Steps
       =========================== */
    .cooking-steps {
      max-width: 860px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 0;
    }

    .cooking-step {
      display: grid;
      grid-template-columns: 72px 1fr;
      gap: var(--space-3);
      padding: var(--space-4) 0;
      border-bottom: 1px solid var(--food-warm-border);
      position: relative;
    }

    .cooking-step:last-child {
      border-bottom: none;
    }

    .step-number-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .step-number {
      width: 52px;
      height: 52px;
      background: #ffffff;
      border: 3px solid var(--food-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--food-primary);
      font-size: var(--text-xl);
      font-weight: 800;
    }

    .step-line {
      flex: 1;
      width: 2px;
      background: var(--food-warm-border);
      margin-top: 8px;
    }

    .step-content {
      padding-top: 8px;
    }

    .step-title {
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: 8px;
    }

    .step-desc {
      font-size: var(--text-base);
      color: var(--color-gray-600);
      line-height: 1.8;
    }

    .step-tip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 12px;
      padding: 8px 16px;
      background: #ffffff;
      border: 1px solid var(--food-warm-border);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--food-primary);
    }

    .step-tip svg {
      width: 16px;
      height: 16px;
    }

    /* ===========================
       Allergen Warning - Classic Box
       =========================== */
    .allergen-box {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      border: 2px solid #fbbf24;
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .allergen-banner {
      background: #fef3c7;
      padding: var(--space-3) var(--space-4);
      display: flex;
      align-items: center;
      gap: var(--space-2);
      border-bottom: 1px solid #fde68a;
    }

    .allergen-banner-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #d97706;
    }

    .allergen-banner-icon svg {
      width: 24px;
      height: 24px;
    }

    .allergen-banner-title {
      font-size: var(--text-lg);
      font-weight: 700;
      color: #92400e;
    }

    .allergen-body {
      padding: var(--space-4);
      font-size: var(--text-base);
      color: #78350f;
      line-height: 1.8;
    }

    .allergen-list {
      list-style: none;
      padding: 0;
      margin: var(--space-2) 0 0 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    .allergen-list li {
      padding: 8px 12px;
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: var(--radius-sm);
      font-size: var(--text-sm);
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .allergen-list li::before {
      content: '';
      width: 8px;
      height: 8px;
      background: #f59e0b;
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* ===========================
       Reviews - Classic Style
       =========================== */
    .review-card {
      border: 1px solid var(--food-warm-border);
    }

    .review-stars {
      color: var(--food-accent);
    }

    /* ===========================
       Trust Badges Accent
       =========================== */
    .trust-section {
      background: var(--food-cream);
    }

    .trust-badge-icon {
      color: var(--food-primary);
    }

    /* ===========================
       CTA Section - Classic Warm
       =========================== */
    .classic-cta {
      background: ${colors.heroGradient};
    }

    .classic-cta .cta-button {
      background: #ffffff;
      color: var(--food-primary);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
      font-weight: 800;
    }

    .classic-cta .cta-button:hover {
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
    }

    /* ===========================
       Info Table - Classic
       =========================== */
    .info-table {
      border: 1px solid var(--food-warm-border);
    }

    .info-table th {
      background: var(--food-cream);
      color: var(--color-gray-800);
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

      .allergen-list {
        grid-template-columns: 1fr;
      }

      .cooking-step {
        grid-template-columns: 56px 1fr;
      }

      .serving-suggestion {
        flex-direction: column;
      }
    }

    @media (max-width: 480px) {
      .nutrition-grid {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-2);
      }

      .nutrition-section {
        padding: var(--space-4);
      }

      .cooking-step {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .step-number-wrap {
        flex-direction: row;
        justify-content: center;
        gap: var(--space-2);
      }

      .step-line {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="detail-page">

    <!-- 1. Hero with Taste Tags -->
    <section class="hero classic-hero-bg">
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
    <section class="section section-warm">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">SPECIAL FEATURES</span>
        <h2 class="headline-lg">{{FEATURES_TITLE}}</h2>
        <div class="classic-section-divider"></div>
      </div>
      <div class="features-grid">
        {{FEATURE_CARDS}}
      </div>
    </section>

    <!-- 3. Recipe Suggestion Cards -->
    <section class="section section-warm-alt">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">RECIPE IDEAS</span>
        <h2 class="headline-lg">가족과 함께하는 따뜻한 레시피</h2>
        <div class="classic-section-divider"></div>
        <p class="body-md" style="margin-top: var(--space-2);">소중한 사람들과 나눌 수 있는 특별한 요리를 만들어 보세요</p>
      </div>
      <div class="recipe-grid">
        {{RECIPE_CARDS}}
      </div>
    </section>

    <!-- 4. Nutrition Info Grid -->
    <section class="section section-warm">
      <div style="text-align: center; margin-bottom: var(--space-6);">
        <span class="story-label">NUTRITION FACTS</span>
        <h2 class="headline-lg">영양 정보</h2>
        <div class="classic-section-divider"></div>
      </div>
      <div class="nutrition-section">
        <div class="nutrition-header">
          <span class="nutrition-header-title">영양성분표</span>
          <span class="nutrition-serving">1회 제공량 기준</span>
        </div>
        <div class="nutrition-grid">
          {{NUTRITION_GRID}}
        </div>
      </div>
    </section>

    <!-- 5. Story Section (image + text) -->
    <section class="section section-warm-alt">
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
          <div class="stats-row">
            {{STATS_ITEMS}}
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Cooking Process Section -->
    <section class="section section-warm">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">HOW TO COOK</span>
        <h2 class="headline-lg">이렇게 만들어요</h2>
        <div class="classic-section-divider"></div>
        <p class="body-md" style="margin-top: var(--space-2);">정성을 담아 만드는 간단한 조리 과정</p>
      </div>
      <div class="cooking-steps">
        {{COOKING_STEPS}}
      </div>
    </section>

    <!-- 7. Allergen Warning Box -->
    <section class="section section-warm-alt">
      <div class="allergen-box">
        <div class="allergen-banner">
          <div class="allergen-banner-icon">
            {{ICON_ALERT_TRIANGLE}}
          </div>
          <h3 class="allergen-banner-title">알레르기 유발 성분 안내</h3>
        </div>
        <div class="allergen-body">
          {{ALLERGEN_WARNING}}
        </div>
      </div>
    </section>

    <!-- 8. Stats Row -->
    <section class="section section-warm">
      <div style="text-align: center; margin-bottom: var(--space-6);">
        <span class="story-label">BY THE NUMBERS</span>
        <h2 class="headline-lg">숫자로 보는 품질</h2>
        <div class="classic-section-divider"></div>
      </div>
      <div class="stats-row" style="justify-content: center; border-top: none; padding-top: 0;">
        {{STATS_ITEMS}}
      </div>
    </section>

    <!-- 9. Reviews Grid -->
    <section class="section section-warm-alt">
      <div style="text-align: center; margin-bottom: var(--space-6);">
        <span class="story-label">REVIEWS</span>
        <h2 class="headline-lg">고객님들의 솔직한 후기</h2>
        <div class="classic-section-divider"></div>
      </div>
      <div class="reviews-grid">
        {{REVIEW_CARDS}}
      </div>
    </section>

    <!-- 10. Trust Badges -->
    <section class="trust-section">
      <span class="story-label">WHY CHOOSE US</span>
      <h2 class="headline-lg">{{TRUST_TITLE}}</h2>
      <div class="classic-section-divider"></div>
      <div class="trust-badges">
        {{TRUST_BADGES}}
      </div>
    </section>

    <!-- 11. CTA Section -->
    <section class="cta-section classic-cta">
      <h2 class="cta-title">{{CTA_TITLE}}</h2>
      <p class="cta-subtitle">{{CTA_SUBTITLE}}</p>
      <a href="#" class="cta-button">
        <span>{{CTA_BUTTON}}</span>
        {{ICON_ARROW_RIGHT}}
      </a>
      <p class="cta-note">{{CTA_NOTE}}</p>
    </section>

    <!-- 12. Product Info Table -->
    <section class="section section-warm">
      <h2 class="headline-md" style="margin-bottom: var(--space-4);">제품 상세 정보</h2>
      <table class="info-table">
        {{PRODUCT_INFO_TABLE}}
      </table>
    </section>

  </div>
</body>
</html>`;
}
