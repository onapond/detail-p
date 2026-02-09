import { BASE_STYLES } from '../../base-styles';
import { getColorScheme } from '../../color-schemes';

export function getBeverageClassicTemplate(): string {
  const colors = getColorScheme('beverage', 'classic');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  ${BASE_STYLES}
  <style>
    /* ===========================
       Beverage Classic Theme
       Traditional Blue Tones
       Information-rich Layout
       =========================== */
    :root {
      --bev-primary: ${colors.primary};
      --bev-primary-light: ${colors.primaryLight};
      --bev-primary-dark: ${colors.primaryDark};
      --bev-accent: ${colors.accent};
      --bev-cream: ${colors.cream};
    }

    /* ── Hero ──────────────────────────────────── */
    .bev-hero-bg {
      background: ${colors.heroGradient};
    }
    .bev-hero-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      background: ${colors.heroBgBefore};
    }
    .bev-hero-bg::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 80px;
      background: linear-gradient(0deg, rgba(255,255,255,0.04) 0%, transparent 100%);
    }

    .hero-badge {
      background: ${colors.badgeBg};
      border-color: ${colors.badgeBorder};
      color: ${colors.accent};
    }

    .hero-floating-badge {
      background: linear-gradient(135deg, var(--bev-primary) 0%, var(--bev-accent) 100%);
      box-shadow: 0 10px 30px rgba(30,111,143,0.45);
    }

    /* ── Taste Tags (classic pill style) ──────── */
    .taste-tags {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: var(--space-4);
    }
    .taste-tag {
      padding: 6px 18px;
      background: rgba(77,166,196,0.12);
      border: 1px solid rgba(77,166,196,0.35);
      border-radius: 6px;
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--bev-accent);
      letter-spacing: 0.02em;
      transition: background var(--animation-duration) var(--animation-easing);
    }
    .taste-tag:hover {
      background: rgba(77,166,196,0.22);
    }

    /* ── Accent overrides ─────────────────────── */
    .story-label { color: var(--bev-primary); }
    .stat-number { color: var(--bev-primary); }
    .feature-icon {
      background: linear-gradient(135deg, var(--bev-primary) 0%, var(--bev-accent) 100%);
    }
    .story-image-accent {
      background: linear-gradient(135deg, var(--bev-primary) 0%, var(--bev-accent) 100%);
    }
    .text-accent { color: var(--bev-primary); }
    .text-highlight {
      background: linear-gradient(180deg, transparent 60%, rgba(30,111,143,0.12) 60%);
    }

    /* ── Classic Section Dividers ─────────────── */
    .classic-divider {
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, var(--bev-primary), var(--bev-accent));
      margin: 0 auto var(--space-4);
      border-radius: var(--radius-full);
    }

    /* ── Flavor Profile Bars (classic boxed) ──── */
    .flavor-profile {
      background: #ffffff;
      border: 2px solid var(--color-gray-100);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      max-width: 640px;
      margin: var(--space-6) auto 0;
    }
    .flavor-profile-title {
      text-align: center;
      font-size: var(--text-xl);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: var(--space-2);
      padding-bottom: var(--space-3);
      border-bottom: 2px solid var(--color-gray-100);
    }
    .flavor-bar-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-2) 0;
      border-bottom: 1px solid var(--color-gray-50);
    }
    .flavor-bar-item:last-child {
      border-bottom: none;
    }
    .flavor-bar-label {
      width: 70px;
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-gray-700);
      text-align: right;
      flex-shrink: 0;
    }
    .flavor-bar-track {
      flex: 1;
      height: 10px;
      background: var(--color-gray-100);
      border-radius: 4px;
      overflow: hidden;
    }
    .flavor-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--bev-accent) 0%, var(--bev-primary) 100%);
      border-radius: 4px;
      transition: width 0.5s ease;
    }
    .flavor-bar-value {
      width: 32px;
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--bev-primary);
      text-align: center;
    }

    /* ── Serving Temperature (classic table) ──── */
    .temp-section {
      background: var(--bev-cream);
      padding: var(--space-10) var(--space-6);
    }
    .temp-content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    .temp-badge-row {
      display: flex;
      justify-content: center;
      align-items: stretch;
      gap: var(--space-4);
      margin-top: var(--space-6);
      flex-wrap: wrap;
    }
    .temp-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-4) var(--space-5);
      background: #ffffff;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-gray-200);
      min-width: 155px;
      transition: transform var(--animation-duration) var(--animation-easing),
                  border-color var(--animation-duration) var(--animation-easing);
    }
    .temp-badge:hover {
      transform: translateY(-4px);
      border-color: var(--bev-primary);
    }
    .temp-badge.recommended {
      border: 2px solid var(--bev-primary);
      background: linear-gradient(180deg, rgba(30,111,143,0.03) 0%, #ffffff 100%);
      position: relative;
    }
    .temp-badge.recommended::after {
      content: 'BEST';
      position: absolute;
      top: -10px;
      right: -10px;
      background: var(--bev-primary);
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 4px;
      letter-spacing: 0.05em;
    }
    .temp-icon {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .temp-icon.cold {
      background: #e0f2fe;
      color: #0284c7;
    }
    .temp-icon.cool {
      background: #cffafe;
      color: var(--bev-primary);
    }
    .temp-icon.room {
      background: #fef3c7;
      color: #b45309;
    }
    .temp-degree {
      font-size: var(--text-2xl);
      font-weight: 800;
      color: var(--color-gray-900);
    }
    .temp-label {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      font-weight: 500;
    }

    /* ── Pairing Recommendations (classic list) ── */
    .pairing-section {
      padding: var(--space-10) var(--space-6);
      background: #ffffff;
    }
    .pairing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-4);
      max-width: 960px;
      margin: var(--space-6) auto 0;
    }
    .pairing-card {
      background: #ffffff;
      border: 1px solid var(--color-gray-200);
      border-radius: var(--radius-md);
      padding: var(--space-5);
      text-align: center;
      transition: transform var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing),
                  border-color var(--animation-duration) var(--animation-easing);
    }
    .pairing-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
      border-color: var(--bev-primary);
    }
    .pairing-icon {
      width: 60px;
      height: 60px;
      margin: 0 auto var(--space-3);
      background: var(--bev-cream);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
    }
    .pairing-name {
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: var(--space-1);
    }
    .pairing-desc {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      line-height: 1.6;
    }
    .pairing-match {
      display: inline-block;
      margin-top: var(--space-2);
      padding: 3px 12px;
      background: rgba(30,111,143,0.08);
      border: 1px solid rgba(30,111,143,0.2);
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      color: var(--bev-primary);
    }

    /* ── Season / TPO (classic cards) ─────────── */
    .season-section {
      padding: var(--space-10) var(--space-6);
      background: var(--bev-cream);
    }
    .season-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-3);
      max-width: 960px;
      margin: var(--space-6) auto 0;
    }
    .season-card {
      background: #ffffff;
      border-radius: var(--radius-md);
      padding: var(--space-4);
      text-align: center;
      border: 1px solid var(--color-gray-200);
      transition: transform var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing);
    }
    .season-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
    }
    .season-emoji {
      font-size: 32px;
      margin-bottom: var(--space-2);
      display: block;
    }
    .season-title {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: 4px;
    }
    .season-desc {
      font-size: var(--text-xs);
      color: var(--color-gray-500);
      line-height: 1.5;
    }

    /* ── Nutrition Highlights (classic grid) ──── */
    .nutrition-section {
      padding: var(--space-10) var(--space-6);
      background: #ffffff;
    }
    .nutrition-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-3);
      max-width: 900px;
      margin: var(--space-6) auto 0;
    }
    .nutrition-card {
      background: #ffffff;
      border: 1px solid var(--color-gray-200);
      border-radius: var(--radius-md);
      padding: var(--space-4);
      text-align: center;
      transition: border-color var(--animation-duration) var(--animation-easing);
    }
    .nutrition-card:hover {
      border-color: var(--bev-primary);
    }
    .nutrition-value {
      font-size: var(--text-3xl);
      font-weight: 800;
      color: var(--bev-primary);
      line-height: 1.1;
    }
    .nutrition-unit {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--bev-accent);
    }
    .nutrition-label {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      margin-top: var(--space-1);
      font-weight: 500;
    }
    .nutrition-bar {
      width: 100%;
      height: 3px;
      background: var(--color-gray-100);
      border-radius: var(--radius-full);
      margin-top: var(--space-2);
      overflow: hidden;
    }
    .nutrition-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--bev-accent), var(--bev-primary));
      border-radius: var(--radius-full);
    }

    /* ── CTA overrides ────────────────────────── */
    .cta-section {
      background: ${colors.heroGradient};
    }
    .cta-button {
      background: linear-gradient(135deg, var(--bev-primary) 0%, var(--bev-accent) 100%);
      box-shadow: ${colors.ctaShadow};
      border-radius: var(--radius-md);
    }
    .cta-button:hover {
      box-shadow: 0 15px 40px rgba(30,111,143,0.5);
    }

    /* ── Trust badge ──────────────────────────── */
    .trust-badge-icon {
      color: var(--bev-primary);
    }

    /* ── Feature card classic borders ─────────── */
    .feature-card {
      border: 1px solid var(--color-gray-200);
      box-shadow: none;
    }
    .feature-card:hover {
      border-color: var(--bev-primary);
      box-shadow: var(--shadow-md);
    }

    /* ── Responsive ───────────────────────────── */
    @media (max-width: 1024px) {
      .pairing-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .season-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .nutrition-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 768px) {
      .temp-badge-row {
        flex-direction: column;
        align-items: center;
      }
      .temp-badge {
        width: 100%;
        max-width: 280px;
      }
      .pairing-grid {
        grid-template-columns: 1fr;
      }
      .season-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .nutrition-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 480px) {
      .season-grid {
        grid-template-columns: 1fr;
      }
      .nutrition-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="detail-page">

    <!-- ================================
         1. HERO SECTION
         ================================ -->
    <section class="hero section">
      <div class="hero-bg bev-hero-bg"></div>
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-badge">{{BADGE_TEXT}}</span>
          <h1 class="hero-title">{{HEADLINE}}</h1>
          <p class="hero-subtitle">{{SUBHEADLINE}}</p>
          <div class="taste-tags">
            {{TASTE_TAGS}}
          </div>
        </div>
        <div class="hero-image-wrap">
          <img src="{{IMAGE_1}}" alt="{{PRODUCT_NAME}}" class="hero-image" loading="eager" />
          <div class="hero-floating-badge">
            <span style="font-size:var(--text-xs);">{{BADGE_LABEL}}</span>
            <span style="font-size:var(--text-xl);">{{BADGE_VALUE}}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================
         2. FEATURES GRID
         ================================ -->
    <section class="section section-light">
      <div style="text-align:center; margin-bottom:var(--space-2);">
        <h2 class="headline-lg">{{FEATURES_TITLE}}</h2>
        <div class="classic-divider"></div>
      </div>
      <div class="features-grid">
        {{FEATURE_CARDS}}
      </div>
    </section>

    <!-- ================================
         3. FLAVOR PROFILE BARS
         ================================ -->
    <section class="section section-gray">
      <div style="text-align:center; margin-bottom:var(--space-2);">
        <span class="story-label">FLAVOR PROFILE</span>
        <h2 class="headline-lg" style="margin-top:var(--space-1);">맛 프로필</h2>
        <div class="classic-divider" style="margin-top:var(--space-3);"></div>
      </div>
      <div class="flavor-profile">
        <h3 class="flavor-profile-title">Taste Balance</h3>
        {{FLAVOR_BARS}}
      </div>
    </section>

    <!-- ================================
         4. SERVING TEMPERATURE GUIDE
         ================================ -->
    <section class="temp-section section">
      <div class="temp-content">
        <span class="story-label">SERVING GUIDE</span>
        <h2 class="headline-lg" style="margin-top:var(--space-1);">최적의 음용 온도</h2>
        <div class="classic-divider" style="margin-top:var(--space-3);"></div>
        <p class="body-md">가장 맛있게 즐기는 온도를 알려드립니다</p>
        <div class="temp-badge-row">
          {{SERVING_TEMP}}
        </div>
      </div>
    </section>

    <!-- ================================
         5. STORY SECTION
         ================================ -->
    <section class="section section-light">
      <div class="story-section">
        <div class="story-image-wrap">
          <div class="story-image-accent"></div>
          <img src="{{IMAGE_2}}" alt="{{PRODUCT_NAME}} 스토리" class="story-image" loading="lazy" />
        </div>
        <div class="story-content">
          <span class="story-label">{{STORY_LABEL}}</span>
          <h2 class="story-title">{{STORY_TITLE}}</h2>
          <p class="story-text">{{STORY_TEXT}}</p>
          <div class="stats-row">
            {{STATS_ITEMS}}
          </div>
        </div>
      </div>
    </section>

    <!-- ================================
         6. PAIRING RECOMMENDATIONS
         ================================ -->
    <section class="pairing-section section">
      <div style="text-align:center; margin-bottom:var(--space-2);">
        <span class="story-label">FOOD PAIRING</span>
        <h2 class="headline-lg" style="margin-top:var(--space-1);">이런 음식과 함께하면 더 맛있어요</h2>
        <div class="classic-divider" style="margin-top:var(--space-3);"></div>
        <p class="body-md">전문가가 추천하는 궁합 음식</p>
      </div>
      <div class="pairing-grid">
        {{PAIRING_CARDS}}
      </div>
    </section>

    <!-- ================================
         7. SEASON / TPO SUGGESTIONS
         ================================ -->
    <section class="season-section section">
      <div style="text-align:center; margin-bottom:var(--space-2);">
        <span class="story-label">WHEN TO ENJOY</span>
        <h2 class="headline-lg" style="margin-top:var(--space-1);">이럴 때 즐겨보세요</h2>
        <div class="classic-divider" style="margin-top:var(--space-3);"></div>
        <p class="body-md">일상 속 최적의 순간</p>
      </div>
      <div class="season-grid">
        {{SEASON_TPO}}
      </div>
    </section>

    <!-- ================================
         8. NUTRITION HIGHLIGHTS
         ================================ -->
    <section class="nutrition-section section">
      <div style="text-align:center; margin-bottom:var(--space-2);">
        <span class="story-label">NUTRITION</span>
        <h2 class="headline-lg" style="margin-top:var(--space-1);">영양 정보</h2>
        <div class="classic-divider" style="margin-top:var(--space-3);"></div>
        <p class="body-md">한 병(1회 제공량) 기준</p>
      </div>
      <div class="nutrition-grid">
        {{NUTRITION_CARDS}}
      </div>
    </section>

    <!-- ================================
         9. REVIEWS GRID
         ================================ -->
    <section class="section section-gray">
      <div style="text-align:center; margin-bottom:var(--space-2);">
        <span class="story-label">REVIEWS</span>
        <h2 class="headline-lg" style="margin-top:var(--space-1);">고객 후기</h2>
        <div class="classic-divider" style="margin-top:var(--space-3);"></div>
      </div>
      <div class="reviews-grid">
        {{REVIEW_CARDS}}
      </div>
    </section>

    <!-- ================================
         10. TRUST BADGES
         ================================ -->
    <section class="trust-section section">
      <h2 class="headline-md">{{TRUST_TITLE}}</h2>
      <div class="classic-divider" style="margin-top:var(--space-3);"></div>
      <div class="trust-badges">
        {{TRUST_BADGES}}
      </div>
    </section>

    <!-- ================================
         11. CTA SECTION
         ================================ -->
    <section class="cta-section section">
      <h2 class="cta-title">{{CTA_TITLE}}</h2>
      <p class="cta-subtitle">{{CTA_SUBTITLE}}</p>
      <a href="#" class="cta-button">
        {{CTA_BUTTON}} {{ICON_ARROW_RIGHT}}
      </a>
      <p class="cta-note">{{CTA_NOTE}}</p>
    </section>

    <!-- ================================
         12. PRODUCT INFO TABLE
         ================================ -->
    <section class="section section-light">
      <h2 class="headline-md" style="margin-bottom:var(--space-4);">제품 상세 정보</h2>
      <table class="info-table">
        {{PRODUCT_INFO_TABLE}}
      </table>
    </section>

  </div>
</body>
</html>
`;
}
