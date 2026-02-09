import { BASE_STYLES } from '../../base-styles';
import { getColorScheme } from '../../color-schemes';

/**
 * Premium Food Template
 * Gourmet/chef-quality design with rich, sophisticated tones.
 * Elegant, refined layout with large images and minimal text.
 * Includes: hero with taste tags, features grid, recipe suggestion cards,
 * nutrition info grid, story section, cooking process, allergen warning,
 * stats row, reviews grid, trust badges, CTA section, product info table.
 */
export function getFoodPremiumTemplate(): string {
  const colors = getColorScheme('food', 'premium');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  ${BASE_STYLES}
  <style>
    /* ===========================
       Food Premium Theme Overrides
       Gourmet, Chef-quality, Sophisticated
       =========================== */
    :root {
      --food-primary: ${colors.primary};
      --food-primary-light: ${colors.primaryLight};
      --food-primary-dark: ${colors.primaryDark};
      --food-accent: ${colors.accent};
      --food-cream: ${colors.cream};
      --food-dark: #1a120b;
      --food-dark-surface: #2d1f14;
      --food-gold: #c8a97e;
      --food-gold-light: #dcc4a0;
    }

    /* Hero */
    .premium-hero-bg {
      background: ${colors.heroGradient};
      min-height: 700px;
    }
    .premium-hero-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      ${colors.heroBgBefore ? `background: ${colors.heroBgBefore};` : ''}
    }

    .hero-badge {
      background: rgba(200, 169, 126, 0.15);
      border-color: rgba(200, 169, 126, 0.4);
      color: var(--food-gold-light);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-size: var(--text-xs);
    }

    .hero-title {
      font-size: clamp(var(--text-4xl), 5.5vw, 56px);
      font-weight: 300;
      letter-spacing: -0.01em;
      line-height: 1.15;
    }

    .hero-subtitle {
      font-weight: 300;
      letter-spacing: 0.02em;
    }

    .hero-floating-badge {
      background: linear-gradient(135deg, var(--food-gold) 0%, var(--food-gold-light) 100%);
      box-shadow: 0 10px 30px rgba(139, 69, 19, 0.5);
      color: var(--food-dark);
    }

    .hero-image {
      border-radius: var(--radius-2xl);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
    }

    /* Taste Tags - Premium Minimal */
    .taste-tags-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: var(--space-4);
    }

    .taste-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      background: transparent;
      border: 1px solid rgba(200, 169, 126, 0.35);
      border-radius: 2px;
      font-size: var(--text-xs);
      font-weight: 500;
      color: var(--food-gold-light);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      transition: all var(--animation-duration) var(--animation-easing);
    }

    .taste-tag:hover {
      background: rgba(200, 169, 126, 0.1);
      border-color: var(--food-gold);
    }

    /* Premium Section Styling */
    .section-premium-dark {
      background: var(--food-dark);
      color: #ffffff;
    }

    .section-premium-surface {
      background: var(--food-dark-surface);
      color: #ffffff;
    }

    .section-premium-light {
      background: var(--food-cream);
    }

    .premium-divider {
      width: 48px;
      height: 1px;
      background: var(--food-gold);
      margin: 0 auto var(--space-4);
    }

    .premium-label {
      font-size: var(--text-xs);
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--food-gold);
      margin-bottom: var(--space-2);
    }

    .premium-headline {
      font-size: clamp(var(--text-2xl), 4vw, var(--text-4xl));
      font-weight: 300;
      letter-spacing: -0.01em;
      line-height: 1.3;
    }

    .premium-headline-dark {
      color: #ffffff;
    }

    /* Feature Cards - Premium Elegant */
    .feature-icon {
      background: linear-gradient(135deg, var(--food-gold) 0%, var(--food-gold-light) 100%);
      color: var(--food-dark);
      border-radius: 4px;
    }

    .feature-card {
      background: #ffffff;
      border: none;
      border-radius: 4px;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
    }

    .feature-card:hover {
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
      border-color: transparent;
    }

    .feature-title {
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    .feature-desc {
      font-weight: 400;
      line-height: 1.75;
    }

    /* ===========================
       Recipe Suggestion Cards - Premium Large Image
       =========================== */
    .recipe-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-5);
    }

    .recipe-card {
      background: var(--food-dark-surface);
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      transition: transform var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing);
    }

    .recipe-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    }

    .recipe-image-wrap {
      position: relative;
      height: 280px;
      overflow: hidden;
    }

    .recipe-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.8s var(--animation-easing);
    }

    .recipe-card:hover .recipe-image {
      transform: scale(1.05);
    }

    .recipe-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba(26, 18, 11, 0.8) 0%, transparent 50%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: var(--space-5);
    }

    .recipe-category {
      font-size: var(--text-xs);
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--food-gold-light);
      margin-bottom: 8px;
    }

    .recipe-overlay-title {
      font-size: var(--text-xl);
      font-weight: 400;
      color: #ffffff;
      letter-spacing: -0.01em;
    }

    .recipe-body {
      padding: var(--space-4) var(--space-5);
    }

    .recipe-title {
      font-size: var(--text-lg);
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .recipe-desc {
      font-size: var(--text-sm);
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.75;
      font-weight: 300;
      margin-bottom: 16px;
    }

    .recipe-meta {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding-top: 16px;
      border-top: 1px solid rgba(200, 169, 126, 0.15);
      font-size: var(--text-xs);
      color: rgba(255, 255, 255, 0.45);
      letter-spacing: 0.05em;
    }

    .recipe-meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .recipe-meta-item svg {
      width: 14px;
      height: 14px;
      color: var(--food-gold);
    }

    /* ===========================
       Nutrition Info - Premium Minimal Cards
       =========================== */
    .nutrition-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-4);
    }

    .nutrition-card {
      background: var(--food-dark-surface);
      border-radius: 4px;
      padding: var(--space-5);
      text-align: center;
      border: 1px solid rgba(200, 169, 126, 0.1);
      transition: transform var(--animation-duration) var(--animation-easing),
                  border-color var(--animation-duration) var(--animation-easing);
    }

    .nutrition-card:hover {
      transform: translateY(-4px);
      border-color: rgba(200, 169, 126, 0.3);
    }

    .nutrition-icon {
      width: 40px;
      height: 40px;
      margin: 0 auto var(--space-3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--food-gold);
    }

    .nutrition-icon svg {
      width: 28px;
      height: 28px;
    }

    .nutrition-value {
      font-size: var(--text-3xl);
      font-weight: 300;
      color: #ffffff;
      line-height: 1;
    }

    .nutrition-unit {
      font-size: var(--text-sm);
      font-weight: 400;
      color: var(--food-gold);
    }

    .nutrition-label {
      font-size: var(--text-xs);
      color: rgba(255, 255, 255, 0.5);
      margin-top: 8px;
      font-weight: 400;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    /* ===========================
       Story Section - Premium Cinematic
       =========================== */
    .premium-story .story-section {
      gap: var(--space-12);
    }

    .premium-story .story-label {
      color: var(--food-gold);
      font-size: var(--text-xs);
      letter-spacing: 0.2em;
    }

    .premium-story .story-title {
      font-weight: 300;
      font-size: clamp(var(--text-3xl), 4vw, var(--text-4xl));
      letter-spacing: -0.01em;
    }

    .premium-story .story-text {
      font-weight: 300;
      letter-spacing: 0.01em;
    }

    .premium-story .story-image {
      border-radius: 4px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }

    .premium-story .story-image-accent {
      background: linear-gradient(135deg, var(--food-gold) 0%, var(--food-gold-light) 100%);
      opacity: 0.15;
      border-radius: 4px;
    }

    .stat-number {
      color: var(--food-gold);
      font-weight: 300;
    }

    .serving-suggestion {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-4);
      background: transparent;
      border: 1px solid var(--color-gray-200);
      border-radius: 4px;
      margin-top: var(--space-5);
    }

    .serving-icon {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      background: transparent;
      border: 1px solid var(--food-gold);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--food-gold);
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
      font-weight: 600;
      color: var(--color-gray-900);
      margin-bottom: 2px;
    }

    .serving-text span {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      line-height: 1.6;
      font-weight: 300;
    }

    /* ===========================
       Cooking Process - Premium Timeline
       =========================== */
    .cooking-steps {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
    }

    .cooking-steps::before {
      content: '';
      position: absolute;
      left: 28px;
      top: 0;
      bottom: 0;
      width: 1px;
      background: rgba(200, 169, 126, 0.2);
    }

    .cooking-step {
      display: flex;
      align-items: flex-start;
      gap: var(--space-5);
      padding: var(--space-5) 0;
      position: relative;
    }

    .step-number {
      flex-shrink: 0;
      width: 56px;
      height: 56px;
      background: var(--food-dark);
      border: 1px solid var(--food-gold);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--food-gold);
      font-size: var(--text-lg);
      font-weight: 300;
      z-index: 1;
      transition: background var(--animation-duration) var(--animation-easing);
    }

    .cooking-step:hover .step-number {
      background: var(--food-gold);
      color: var(--food-dark);
    }

    .step-content {
      flex: 1;
      padding-top: 10px;
    }

    .step-title {
      font-size: var(--text-lg);
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 8px;
      letter-spacing: -0.01em;
    }

    .step-desc {
      font-size: var(--text-base);
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.8;
      font-weight: 300;
    }

    .step-tip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 14px;
      padding: 8px 18px;
      background: transparent;
      border: 1px solid rgba(200, 169, 126, 0.25);
      border-radius: 2px;
      font-size: var(--text-xs);
      font-weight: 500;
      color: var(--food-gold);
      letter-spacing: 0.05em;
    }

    .step-tip svg {
      width: 14px;
      height: 14px;
    }

    /* ===========================
       Allergen Warning - Premium Subtle
       =========================== */
    .allergen-box {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid var(--color-gray-200);
      border-radius: 4px;
      padding: var(--space-5) var(--space-6);
      position: relative;
    }

    .allergen-header {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--color-gray-100);
    }

    .allergen-icon {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #d97706;
    }

    .allergen-icon svg {
      width: 24px;
      height: 24px;
    }

    .allergen-title {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--color-gray-800);
      letter-spacing: -0.01em;
    }

    .allergen-content {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
      line-height: 1.8;
      font-weight: 400;
    }

    .allergen-list {
      list-style: none;
      padding: 0;
      margin: var(--space-2) 0 0 0;
    }

    .allergen-list li {
      padding: 8px 0;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid var(--color-gray-50);
      font-size: var(--text-sm);
      color: var(--color-gray-700);
    }

    .allergen-list li:last-child {
      border-bottom: none;
    }

    .allergen-list li::before {
      content: '';
      width: 4px;
      height: 4px;
      background: #d97706;
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* ===========================
       Reviews - Premium Dark Cards
       =========================== */
    .premium-reviews .reviews-grid {
      gap: var(--space-4);
    }

    .premium-reviews .review-card {
      background: var(--food-dark-surface);
      border: 1px solid rgba(200, 169, 126, 0.1);
      border-radius: 4px;
      box-shadow: none;
    }

    .premium-reviews .review-card:hover {
      border-color: rgba(200, 169, 126, 0.25);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    }

    .premium-reviews .review-stars {
      color: var(--food-gold);
    }

    .premium-reviews .review-text {
      color: rgba(255, 255, 255, 0.7);
      font-weight: 300;
      line-height: 1.8;
    }

    .premium-reviews .review-author {
      color: rgba(255, 255, 255, 0.4);
      font-weight: 400;
    }

    /* ===========================
       Trust Badges - Premium Gold
       =========================== */
    .premium-trust {
      background: var(--food-dark);
      color: #ffffff;
    }

    .premium-trust .trust-badge-icon {
      background: var(--food-dark-surface);
      border: 1px solid rgba(200, 169, 126, 0.2);
      color: var(--food-gold);
      box-shadow: none;
    }

    .premium-trust .trust-badge:hover .trust-badge-icon {
      border-color: var(--food-gold);
      box-shadow: 0 4px 20px rgba(200, 169, 126, 0.15);
    }

    .premium-trust .trust-badge-text {
      color: rgba(255, 255, 255, 0.7);
      font-weight: 400;
    }

    /* ===========================
       CTA Section - Premium Dark Gold
       =========================== */
    .premium-cta {
      background: var(--food-dark);
      position: relative;
      overflow: hidden;
    }

    .premium-cta::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(200, 169, 126, 0.08) 0%, transparent 70%);
    }

    .premium-cta .cta-title {
      font-weight: 300;
      letter-spacing: -0.01em;
      position: relative;
    }

    .premium-cta .cta-subtitle {
      font-weight: 300;
      color: rgba(255, 255, 255, 0.5);
      position: relative;
    }

    .premium-cta .cta-button {
      background: linear-gradient(135deg, var(--food-gold) 0%, var(--food-gold-light) 100%);
      color: var(--food-dark);
      font-weight: 700;
      border-radius: 4px;
      box-shadow: 0 10px 30px rgba(200, 169, 126, 0.3);
      letter-spacing: 0.05em;
      position: relative;
    }

    .premium-cta .cta-button:hover {
      box-shadow: 0 15px 40px rgba(200, 169, 126, 0.4);
    }

    .premium-cta .cta-note {
      color: rgba(255, 255, 255, 0.3);
      font-weight: 300;
      position: relative;
    }

    /* ===========================
       Info Table - Premium
       =========================== */
    .premium-info-table .info-table {
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid var(--color-gray-100);
    }

    .premium-info-table .info-table th {
      background: var(--food-cream);
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    .premium-info-table .info-table td {
      font-weight: 400;
    }

    /* ===========================
       Responsive Overrides
       =========================== */
    @media (max-width: 1024px) {
      .nutrition-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .premium-hero-bg {
        min-height: 550px;
      }
    }

    @media (max-width: 768px) {
      .recipe-grid {
        grid-template-columns: 1fr;
      }

      .nutrition-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .premium-hero-bg {
        min-height: auto;
      }

      .hero-title {
        font-size: var(--text-3xl);
      }

      .cooking-steps::before {
        display: none;
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

      .cooking-steps::before {
        display: none;
      }

      .recipe-image-wrap {
        height: 220px;
      }
    }
  </style>
</head>
<body>
  <div class="detail-page">

    <!-- 1. Hero with Taste Tags -->
    <section class="hero premium-hero-bg">
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
    <section class="section section-premium-light">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="premium-label">SPECIAL FEATURES</span>
        <div class="premium-divider"></div>
        <h2 class="premium-headline">{{FEATURES_TITLE}}</h2>
      </div>
      <div class="features-grid">
        {{FEATURE_CARDS}}
      </div>
    </section>

    <!-- 3. Recipe Suggestion Cards -->
    <section class="section section-premium-dark">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="premium-label">CHEF'S RECIPE</span>
        <div class="premium-divider"></div>
        <h2 class="premium-headline premium-headline-dark">셰프가 추천하는 레시피</h2>
        <p style="color: rgba(255,255,255,0.5); font-weight: 300; margin-top: var(--space-2); font-size: var(--text-base);">미식의 경험을 한 단계 끌어올리는 특별한 레시피</p>
      </div>
      <div class="recipe-grid">
        {{RECIPE_CARDS}}
      </div>
    </section>

    <!-- 4. Nutrition Info Grid -->
    <section class="section section-premium-dark">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="premium-label">NUTRITION FACTS</span>
        <div class="premium-divider"></div>
        <h2 class="premium-headline premium-headline-dark">영양 정보</h2>
        <p style="color: rgba(255,255,255,0.45); font-weight: 300; margin-top: var(--space-2); font-size: var(--text-sm); letter-spacing: 0.03em;">1회 제공량 기준 주요 영양소 함량</p>
      </div>
      <div class="nutrition-grid">
        {{NUTRITION_GRID}}
      </div>
    </section>

    <!-- 5. Story Section (image + text) -->
    <section class="section section-premium-light premium-story">
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
    <section class="section section-premium-dark">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="premium-label">HOW TO COOK</span>
        <div class="premium-divider"></div>
        <h2 class="premium-headline premium-headline-dark">이렇게 만들어요</h2>
        <p style="color: rgba(255,255,255,0.45); font-weight: 300; margin-top: var(--space-2); font-size: var(--text-base);">셰프의 레시피를 따라 완벽한 요리를 완성하세요</p>
      </div>
      <div class="cooking-steps">
        {{COOKING_STEPS}}
      </div>
    </section>

    <!-- 7. Allergen Warning Box -->
    <section class="section section-premium-light">
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
    <section class="section section-premium-dark">
      <div style="text-align: center; margin-bottom: var(--space-6);">
        <span class="premium-label">BY THE NUMBERS</span>
        <div class="premium-divider"></div>
        <h2 class="premium-headline premium-headline-dark">숫자로 보는 품질</h2>
      </div>
      <div class="stats-row" style="justify-content: center; border-top: none; padding-top: 0; border-color: rgba(200,169,126,0.15);">
        {{STATS_ITEMS}}
      </div>
    </section>

    <!-- 9. Reviews Grid -->
    <section class="section section-premium-dark premium-reviews">
      <div style="text-align: center; margin-bottom: var(--space-6);">
        <span class="premium-label">REVIEWS</span>
        <div class="premium-divider"></div>
        <h2 class="premium-headline premium-headline-dark">고객님들의 미식 후기</h2>
      </div>
      <div class="reviews-grid">
        {{REVIEW_CARDS}}
      </div>
    </section>

    <!-- 10. Trust Badges -->
    <section class="trust-section premium-trust">
      <span class="premium-label">WHY CHOOSE US</span>
      <div class="premium-divider"></div>
      <h2 class="headline-lg" style="color: #ffffff; font-weight: 300;">{{TRUST_TITLE}}</h2>
      <div class="trust-badges">
        {{TRUST_BADGES}}
      </div>
    </section>

    <!-- 11. CTA Section -->
    <section class="cta-section premium-cta">
      <h2 class="cta-title">{{CTA_TITLE}}</h2>
      <p class="cta-subtitle">{{CTA_SUBTITLE}}</p>
      <a href="#" class="cta-button">
        <span>{{CTA_BUTTON}}</span>
        {{ICON_ARROW_RIGHT}}
      </a>
      <p class="cta-note">{{CTA_NOTE}}</p>
    </section>

    <!-- 12. Product Info Table -->
    <section class="section section-premium-light premium-info-table">
      <h2 class="headline-md" style="margin-bottom: var(--space-4); font-weight: 400; letter-spacing: -0.01em;">제품 상세 정보</h2>
      <table class="info-table">
        {{PRODUCT_INFO_TABLE}}
      </table>
    </section>

  </div>
</body>
</html>`;
}
