import { BASE_STYLES } from '../../base-styles';
import { getColorScheme } from '../../color-schemes';

export function getBeveragePremiumTemplate(): string {
  const colors = getColorScheme('beverage', 'premium');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  ${BASE_STYLES}
  <style>
    /* ===========================
       Beverage Premium Theme
       Dark Bar / Lounge Aesthetic
       Moody & Sophisticated
       =========================== */
    :root {
      --bev-primary: ${colors.primary};
      --bev-primary-light: ${colors.primaryLight};
      --bev-primary-dark: ${colors.primaryDark};
      --bev-accent: ${colors.accent};
      --bev-cream: ${colors.cream};
      --bev-surface: #16162a;
      --bev-surface-light: #1e1e38;
      --bev-surface-border: rgba(74,144,217,0.12);
      --bev-gold: #d4af37;
    }

    /* Override body for dark theme */
    body {
      background: #0c0c1a;
      color: #e4e4ef;
    }
    .detail-page {
      background: #0c0c1a;
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
      inset: 0;
      background: radial-gradient(ellipse at 70% 80%, rgba(74,144,217,0.08) 0%, transparent 60%);
    }

    .hero-badge {
      background: ${colors.badgeBg};
      border-color: ${colors.badgeBorder};
      color: ${colors.accent};
    }

    .hero-floating-badge {
      background: linear-gradient(135deg, var(--bev-gold) 0%, #e8c84a 100%);
      box-shadow: 0 10px 30px rgba(212,175,55,0.35);
      color: #1a1a2e;
    }

    .hero-title {
      background: linear-gradient(135deg, #ffffff 0%, var(--bev-accent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ── Taste Tags (premium capsule) ─────────── */
    .taste-tags {
      display: flex;
      justify-content: center;
      gap: var(--space-2);
      flex-wrap: wrap;
      margin-top: var(--space-4);
    }
    .taste-tag {
      padding: 6px 20px;
      background: rgba(74,144,217,0.08);
      border: 1px solid rgba(74,144,217,0.25);
      border-radius: var(--radius-full);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--bev-accent);
      letter-spacing: 0.04em;
      backdrop-filter: blur(4px);
      transition: background var(--animation-duration) var(--animation-easing),
                  border-color var(--animation-duration) var(--animation-easing),
                  transform var(--animation-duration) var(--animation-easing);
    }
    .taste-tag:hover {
      background: rgba(74,144,217,0.18);
      border-color: rgba(74,144,217,0.5);
      transform: translateY(-2px);
    }

    /* ── Dark section overrides ───────────────── */
    .section-light {
      background: var(--bev-surface);
      color: #e4e4ef;
    }
    .section-gray {
      background: var(--bev-surface-light);
      color: #e4e4ef;
    }
    .section-dark {
      background: linear-gradient(180deg, #0c0c1a 0%, var(--bev-surface) 100%);
      color: #e4e4ef;
    }

    /* ── Accent overrides ─────────────────────── */
    .story-label {
      color: var(--bev-accent);
      letter-spacing: 0.15em;
    }
    .stat-number { color: var(--bev-accent); }
    .feature-icon {
      background: linear-gradient(135deg, rgba(74,144,217,0.15) 0%, rgba(74,144,217,0.05) 100%);
      border: 1px solid rgba(74,144,217,0.2);
      color: var(--bev-accent);
    }
    .story-image-accent {
      background: linear-gradient(135deg, rgba(74,144,217,0.3) 0%, rgba(212,175,55,0.15) 100%);
    }
    .text-accent { color: var(--bev-accent); }
    .text-highlight {
      background: linear-gradient(180deg, transparent 60%, rgba(74,144,217,0.2) 60%);
    }

    /* ── Premium gold accent line ─────────────── */
    .premium-line {
      width: 48px;
      height: 2px;
      background: linear-gradient(90deg, var(--bev-gold), var(--bev-accent));
      margin: 0 auto var(--space-4);
    }

    /* ── Headline color for dark bg ───────────── */
    .headline-lg, .headline-md, .headline-xl {
      color: #ffffff;
    }
    .body-md, .body-lg {
      color: rgba(228,228,239,0.65);
    }
    .body-sm {
      color: rgba(228,228,239,0.45);
    }

    /* ── Feature Cards (dark glass) ───────────── */
    .feature-card {
      background: var(--bev-surface-light);
      border: 1px solid var(--bev-surface-border);
      box-shadow: 0 4px 24px rgba(0,0,0,0.3);
    }
    .feature-card:hover {
      border-color: rgba(74,144,217,0.35);
      box-shadow: 0 8px 32px rgba(74,144,217,0.12), 0 4px 24px rgba(0,0,0,0.3);
    }
    .feature-title {
      color: #ffffff;
    }
    .feature-desc {
      color: rgba(228,228,239,0.6);
    }

    /* ── Flavor Profile Bars (dark glass) ─────── */
    .flavor-profile {
      background: var(--bev-surface-light);
      border: 1px solid var(--bev-surface-border);
      border-radius: var(--radius-xl);
      padding: var(--space-6);
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      max-width: 640px;
      margin: var(--space-8) auto 0;
    }
    .flavor-profile-title {
      text-align: center;
      font-size: var(--text-xl);
      font-weight: 700;
      color: #ffffff;
      margin-bottom: var(--space-5);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--bev-surface-border);
    }
    .flavor-bar-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
    }
    .flavor-bar-item:last-child {
      margin-bottom: 0;
    }
    .flavor-bar-label {
      width: 70px;
      font-size: var(--text-sm);
      font-weight: 600;
      color: rgba(228,228,239,0.7);
      text-align: right;
      flex-shrink: 0;
    }
    .flavor-bar-track {
      flex: 1;
      height: 10px;
      background: rgba(255,255,255,0.06);
      border-radius: var(--radius-full);
      overflow: hidden;
    }
    .flavor-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--bev-accent) 0%, var(--bev-gold) 100%);
      border-radius: var(--radius-full);
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 12px rgba(74,144,217,0.3);
    }
    .flavor-bar-value {
      width: 30px;
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--bev-accent);
    }

    /* ── Serving Temperature (dark cards) ─────── */
    .temp-section {
      background: linear-gradient(180deg, var(--bev-surface) 0%, #0c0c1a 100%);
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
      background: var(--bev-surface-light);
      border: 1px solid var(--bev-surface-border);
      border-radius: var(--radius-xl);
      min-width: 155px;
      transition: transform var(--animation-duration) var(--animation-easing),
                  border-color var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing);
    }
    .temp-badge:hover {
      transform: translateY(-6px);
      border-color: rgba(74,144,217,0.35);
      box-shadow: 0 8px 24px rgba(74,144,217,0.1);
    }
    .temp-badge.recommended {
      border: 2px solid var(--bev-gold);
      position: relative;
      box-shadow: 0 0 24px rgba(212,175,55,0.1);
    }
    .temp-badge.recommended::after {
      content: 'BEST';
      position: absolute;
      top: -10px;
      right: -10px;
      background: linear-gradient(135deg, var(--bev-gold) 0%, #e8c84a 100%);
      color: #1a1a2e;
      font-size: 10px;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      letter-spacing: 0.05em;
    }
    .temp-icon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    .temp-icon.cold {
      background: rgba(14,116,144,0.15);
      color: #67e8f9;
      border: 1px solid rgba(14,116,144,0.3);
    }
    .temp-icon.cool {
      background: rgba(74,144,217,0.12);
      color: var(--bev-accent);
      border: 1px solid rgba(74,144,217,0.25);
    }
    .temp-icon.room {
      background: rgba(212,175,55,0.1);
      color: var(--bev-gold);
      border: 1px solid rgba(212,175,55,0.25);
    }
    .temp-degree {
      font-size: var(--text-2xl);
      font-weight: 800;
      color: #ffffff;
    }
    .temp-label {
      font-size: var(--text-sm);
      color: rgba(228,228,239,0.5);
      font-weight: 500;
    }

    /* ── Story section dark adjustments ────────── */
    .story-title {
      color: #ffffff;
    }
    .story-text {
      color: rgba(228,228,239,0.6);
    }
    .story-image {
      border: 1px solid var(--bev-surface-border);
    }
    .stats-row {
      border-top-color: var(--bev-surface-border);
    }
    .stat-label {
      color: rgba(228,228,239,0.45);
    }

    /* ── Pairing (dark cards with glow) ────────── */
    .pairing-section {
      padding: var(--space-10) var(--space-6);
      background: var(--bev-surface);
    }
    .pairing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-4);
      max-width: 960px;
      margin: var(--space-6) auto 0;
    }
    .pairing-card {
      background: var(--bev-surface-light);
      border: 1px solid var(--bev-surface-border);
      border-radius: var(--radius-xl);
      padding: var(--space-5);
      text-align: center;
      transition: transform var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing),
                  border-color var(--animation-duration) var(--animation-easing);
    }
    .pairing-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 36px rgba(0,0,0,0.4), 0 0 20px rgba(74,144,217,0.06);
      border-color: rgba(74,144,217,0.3);
    }
    .pairing-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto var(--space-3);
      background: rgba(74,144,217,0.08);
      border: 1px solid rgba(74,144,217,0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
    }
    .pairing-name {
      font-size: var(--text-lg);
      font-weight: 700;
      color: #ffffff;
      margin-bottom: var(--space-1);
    }
    .pairing-desc {
      font-size: var(--text-sm);
      color: rgba(228,228,239,0.5);
      line-height: 1.6;
    }
    .pairing-match {
      display: inline-block;
      margin-top: var(--space-2);
      padding: 3px 12px;
      background: rgba(212,175,55,0.1);
      border: 1px solid rgba(212,175,55,0.25);
      border-radius: var(--radius-full);
      font-size: 11px;
      font-weight: 700;
      color: var(--bev-gold);
      letter-spacing: 0.04em;
    }

    /* ── Season / TPO (dark mood cards) ────────── */
    .season-section {
      padding: var(--space-10) var(--space-6);
      background: linear-gradient(180deg, #0c0c1a 0%, var(--bev-surface) 100%);
    }
    .season-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-3);
      max-width: 960px;
      margin: var(--space-6) auto 0;
    }
    .season-card {
      background: var(--bev-surface-light);
      border: 1px solid var(--bev-surface-border);
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      text-align: center;
      transition: transform var(--animation-duration) var(--animation-easing),
                  border-color var(--animation-duration) var(--animation-easing),
                  box-shadow var(--animation-duration) var(--animation-easing);
    }
    .season-card:hover {
      transform: translateY(-4px);
      border-color: rgba(74,144,217,0.3);
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    }
    .season-emoji {
      font-size: 36px;
      margin-bottom: var(--space-2);
      display: block;
    }
    .season-title {
      font-size: var(--text-base);
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .season-desc {
      font-size: var(--text-xs);
      color: rgba(228,228,239,0.45);
      line-height: 1.5;
    }

    /* ── Nutrition (dark glass cards) ──────────── */
    .nutrition-section {
      padding: var(--space-10) var(--space-6);
      background: var(--bev-surface);
    }
    .nutrition-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-3);
      max-width: 900px;
      margin: var(--space-6) auto 0;
    }
    .nutrition-card {
      background: var(--bev-surface-light);
      border: 1px solid var(--bev-surface-border);
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      text-align: center;
      transition: transform var(--animation-duration) var(--animation-easing),
                  border-color var(--animation-duration) var(--animation-easing);
    }
    .nutrition-card:hover {
      transform: scale(1.04);
      border-color: rgba(74,144,217,0.3);
    }
    .nutrition-value {
      font-size: var(--text-3xl);
      font-weight: 800;
      color: var(--bev-accent);
      line-height: 1.1;
    }
    .nutrition-unit {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--bev-gold);
    }
    .nutrition-label {
      font-size: var(--text-sm);
      color: rgba(228,228,239,0.5);
      margin-top: var(--space-1);
      font-weight: 500;
    }
    .nutrition-bar {
      width: 100%;
      height: 3px;
      background: rgba(255,255,255,0.06);
      border-radius: var(--radius-full);
      margin-top: var(--space-2);
      overflow: hidden;
    }
    .nutrition-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--bev-accent), var(--bev-gold));
      border-radius: var(--radius-full);
      box-shadow: 0 0 8px rgba(74,144,217,0.3);
    }

    /* ── Reviews (dark cards) ─────────────────── */
    .review-card {
      background: var(--bev-surface-light);
      border: 1px solid var(--bev-surface-border);
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    }
    .review-card:hover {
      box-shadow: 0 8px 24px rgba(0,0,0,0.4), 0 0 12px rgba(74,144,217,0.06);
      border-color: rgba(74,144,217,0.25);
    }
    .review-text {
      color: rgba(228,228,239,0.7);
    }
    .review-author {
      color: rgba(228,228,239,0.45);
    }

    /* ── Trust section (dark) ─────────────────── */
    .trust-section {
      background: var(--bev-surface-light);
    }
    .trust-badge-icon {
      background: var(--bev-surface);
      color: var(--bev-accent);
      border: 1px solid var(--bev-surface-border);
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    }
    .trust-badge:hover .trust-badge-icon {
      box-shadow: 0 8px 24px rgba(0,0,0,0.4), 0 0 12px rgba(74,144,217,0.1);
    }
    .trust-badge-text {
      color: rgba(228,228,239,0.7);
    }

    /* ── CTA (premium gradient) ───────────────── */
    .cta-section {
      background: linear-gradient(135deg, #0c0c1a 0%, var(--bev-primary) 50%, #0c0c1a 100%);
    }
    .cta-title {
      background: linear-gradient(135deg, #ffffff 0%, var(--bev-accent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .cta-button {
      background: linear-gradient(135deg, var(--bev-gold) 0%, #e8c84a 100%);
      color: #1a1a2e;
      box-shadow: 0 10px 30px rgba(212,175,55,0.3);
    }
    .cta-button:hover {
      box-shadow: 0 15px 40px rgba(212,175,55,0.45);
    }

    /* ── Info table (dark) ─────────────────────── */
    .info-table {
      background: var(--bev-surface-light);
      border: 1px solid var(--bev-surface-border);
    }
    .info-table th {
      background: var(--bev-surface);
      color: rgba(228,228,239,0.7);
      border-bottom-color: var(--bev-surface-border);
    }
    .info-table td {
      color: rgba(228,228,239,0.6);
      border-bottom-color: var(--bev-surface-border);
    }

    /* ── Hero image premium effect ────────────── */
    .hero-image {
      border: 1px solid rgba(74,144,217,0.15);
      box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(74,144,217,0.05);
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

    /* ── Print override for dark theme ────────── */
    @media print {
      body, .detail-page {
        background: #ffffff !important;
        color: #000000 !important;
      }
      .section-light, .section-gray, .section-dark,
      .temp-section, .pairing-section, .season-section,
      .nutrition-section, .trust-section {
        background: #ffffff !important;
        color: #000000 !important;
      }
      .feature-card, .flavor-profile, .temp-badge,
      .pairing-card, .season-card, .nutrition-card,
      .review-card, .info-table {
        background: #ffffff !important;
        border-color: #cccccc !important;
        color: #000000 !important;
        box-shadow: none !important;
      }
      .hero-title {
        -webkit-text-fill-color: #000000;
        color: #000000 !important;
      }
      .cta-title {
        -webkit-text-fill-color: #000000;
        color: #000000 !important;
      }
      .headline-lg, .headline-md, .headline-xl,
      .feature-title, .pairing-name, .season-title,
      .story-title, .flavor-profile-title, .temp-degree {
        color: #000000 !important;
      }
      .body-md, .body-lg, .body-sm,
      .feature-desc, .pairing-desc, .season-desc,
      .story-text, .flavor-bar-label, .temp-label,
      .nutrition-label, .review-text, .review-author,
      .trust-badge-text {
        color: #333333 !important;
      }
      .trust-badge-icon {
        background: #ffffff !important;
        border: 1px solid #cccccc !important;
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
        <div class="premium-line"></div>
        <h2 class="headline-lg">{{FEATURES_TITLE}}</h2>
      </div>
      <div class="features-grid" style="margin-top:var(--space-6);">
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
        <div class="premium-line" style="margin-top:var(--space-3);"></div>
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
        <div class="premium-line" style="margin-top:var(--space-3);"></div>
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
        <div class="premium-line" style="margin-top:var(--space-3);"></div>
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
        <div class="premium-line" style="margin-top:var(--space-3);"></div>
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
        <div class="premium-line" style="margin-top:var(--space-3);"></div>
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
        <div class="premium-line" style="margin-top:var(--space-3);"></div>
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
      <div class="premium-line" style="margin-top:var(--space-3);"></div>
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
