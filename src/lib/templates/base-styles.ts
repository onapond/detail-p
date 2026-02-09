export const BASE_STYLES = `
<style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

  :root {
    /* Primary Brand Colors */
    --color-primary: #2563eb;
    --color-primary-dark: #1d4ed8;
    --color-primary-light: #3b82f6;

    /* Neutral Colors */
    --color-gray-900: #111827;
    --color-gray-800: #1f2937;
    --color-gray-700: #374151;
    --color-gray-600: #4b5563;
    --color-gray-500: #6b7280;
    --color-gray-400: #9ca3af;
    --color-gray-300: #d1d5db;
    --color-gray-200: #e5e7eb;
    --color-gray-100: #f3f4f6;
    --color-gray-50: #f9fafb;

    /* Semantic Colors */
    --color-success: #059669;
    --color-success-light: #10b981;
    --color-warning: #d97706;
    --color-warning-light: #f59e0b;
    --color-error: #dc2626;

    /* Spacing (8px grid) */
    --space-1: 8px;
    --space-2: 16px;
    --space-3: 24px;
    --space-4: 32px;
    --space-5: 40px;
    --space-6: 48px;
    --space-8: 64px;
    --space-10: 80px;
    --space-12: 96px;

    /* Typography - fluid clamp values */
    --text-xs: clamp(11px, 0.75vw + 8px, 12px);
    --text-sm: clamp(13px, 0.85vw + 9px, 14px);
    --text-base: clamp(15px, 1vw + 10px, 16px);
    --text-lg: clamp(16px, 1.1vw + 11px, 18px);
    --text-xl: clamp(18px, 1.25vw + 12px, 20px);
    --text-2xl: clamp(20px, 1.5vw + 14px, 24px);
    --text-3xl: clamp(24px, 2vw + 16px, 30px);
    --text-4xl: clamp(28px, 2.5vw + 18px, 36px);
    --text-5xl: clamp(36px, 3vw + 24px, 48px);

    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
    --shadow-xl: 0 20px 25px rgba(0,0,0,0.1);
    --shadow-2xl: 0 25px 50px rgba(0,0,0,0.15);

    /* Layout */
    --max-width: 1200px;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
    --radius-2xl: 24px;
    --radius-full: 9999px;

    /* Gradients (limited to 3) */
    --gradient-dark: linear-gradient(180deg, var(--color-gray-900) 0%, var(--color-gray-800) 100%);
    --gradient-light: linear-gradient(180deg, var(--color-gray-50) 0%, var(--color-gray-100) 100%);
    --gradient-accent: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);

    /* Animation durations */
    --animation-duration-fast: 0.2s;
    --animation-duration: 0.3s;
    --animation-duration-slow: 0.6s;
    --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    line-height: 1.7;
    color: var(--color-gray-900);
    background: #ffffff;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    word-break: keep-all;
    overflow-wrap: break-word;
  }

  .detail-page {
    max-width: var(--max-width);
    margin: 0 auto;
    background: #fff;
  }

  /* ===========================
     Keyframe Animations
     =========================== */

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Section entry animations */
  .section {
    padding: var(--space-12) var(--space-6);
    position: relative;
    animation: fadeInUp var(--animation-duration-slow) var(--animation-easing) both;
  }

  .section:nth-child(1) { animation-delay: 0s; }
  .section:nth-child(2) { animation-delay: 0.1s; }
  .section:nth-child(3) { animation-delay: 0.2s; }
  .section:nth-child(4) { animation-delay: 0.3s; }
  .section:nth-child(5) { animation-delay: 0.4s; }
  .section:nth-child(6) { animation-delay: 0.5s; }
  .section:nth-child(7) { animation-delay: 0.6s; }
  .section:nth-child(8) { animation-delay: 0.7s; }

  .section-dark {
    background: var(--gradient-dark);
    color: #ffffff;
  }

  .section-light {
    background: #ffffff;
  }

  .section-gray {
    background: var(--gradient-light);
  }

  /* ===========================
     Typography - Korean-optimized
     =========================== */

  .headline-xl {
    font-size: clamp(var(--text-4xl), 5vw, var(--text-5xl));
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .headline-lg {
    font-size: clamp(var(--text-2xl), 4vw, var(--text-4xl));
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .headline-md {
    font-size: clamp(var(--text-xl), 3vw, var(--text-3xl));
    font-weight: 600;
    line-height: 1.4;
  }

  .body-lg {
    font-size: var(--text-lg);
    line-height: 1.8;
    color: var(--color-gray-600);
    font-weight: 400;
  }

  .body-md {
    font-size: var(--text-base);
    line-height: 1.75;
    color: var(--color-gray-600);
    font-weight: 400;
  }

  .body-sm {
    font-size: var(--text-sm);
    line-height: 1.7;
    color: var(--color-gray-500);
    font-weight: 300;
  }

  .text-accent {
    color: var(--color-primary);
  }

  .text-highlight {
    background: linear-gradient(180deg, transparent 60%, rgba(37, 99, 235, 0.15) 60%);
    padding: 0 4px;
  }

  /* Font weight utility classes */
  .fw-light { font-weight: 300; }
  .fw-regular { font-weight: 400; }
  .fw-medium { font-weight: 500; }
  .fw-semibold { font-weight: 600; }
  .fw-bold { font-weight: 700; }
  .fw-extrabold { font-weight: 800; }

  /* ===========================
     Hero Section
     =========================== */

  .hero {
    position: relative;
    min-height: 600px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background: var(--gradient-dark);
  }

  .hero-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 50%);
  }

  .hero-content {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
    align-items: center;
    padding: var(--space-8) var(--space-6);
    width: 100%;
  }

  .hero-text {
    color: #ffffff;
    animation: slideInLeft var(--animation-duration-slow) var(--animation-easing) both;
  }

  .hero-badge {
    display: inline-block;
    padding: var(--space-1) var(--space-2);
    background: rgba(37, 99, 235, 0.2);
    border: 1px solid rgba(37, 99, 235, 0.4);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-primary-light);
    margin-bottom: var(--space-3);
    letter-spacing: 0.05em;
  }

  .hero-title {
    font-size: clamp(var(--text-4xl), 5vw, 52px);
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: var(--space-3);
    letter-spacing: -0.02em;
  }

  .hero-subtitle {
    font-size: var(--text-lg);
    color: rgba(255,255,255,0.8);
    line-height: 1.8;
    margin-bottom: var(--space-4);
    font-weight: 400;
  }

  .hero-image-wrap {
    position: relative;
    animation: slideInRight var(--animation-duration-slow) var(--animation-easing) 0.2s both;
  }

  .hero-image {
    width: 100%;
    height: auto;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-2xl);
    transform: perspective(1000px) rotateY(-5deg);
    transition: transform var(--animation-duration) var(--animation-easing);
  }

  .hero-image:hover {
    transform: perspective(1000px) rotateY(0deg);
  }

  .hero-floating-badge {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    background: var(--gradient-accent);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
    animation: float 3s ease-in-out infinite;
  }

  /* ===========================
     Feature Cards - with micro interactions
     =========================== */

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
  }

  .feature-card {
    background: #ffffff;
    border-radius: var(--radius-xl);
    padding: var(--space-5) var(--space-4);
    text-align: center;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--color-gray-100);
    transition: transform var(--animation-duration) var(--animation-easing),
                box-shadow var(--animation-duration) var(--animation-easing),
                border-color var(--animation-duration) var(--animation-easing);
    animation: scaleIn var(--animation-duration-slow) var(--animation-easing) both;
  }

  .feature-card:nth-child(1) { animation-delay: 0.1s; }
  .feature-card:nth-child(2) { animation-delay: 0.2s; }
  .feature-card:nth-child(3) { animation-delay: 0.3s; }
  .feature-card:nth-child(4) { animation-delay: 0.4s; }
  .feature-card:nth-child(5) { animation-delay: 0.5s; }
  .feature-card:nth-child(6) { animation-delay: 0.6s; }

  .feature-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--shadow-xl), 0 0 0 1px rgba(37, 99, 235, 0.1);
    border-color: var(--color-primary-light);
  }

  .feature-icon {
    width: 72px;
    height: 72px;
    margin: 0 auto var(--space-3);
    background: var(--gradient-accent);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    transition: transform var(--animation-duration) var(--animation-easing);
  }

  .feature-card:hover .feature-icon {
    transform: scale(1.1);
  }

  .feature-icon svg {
    width: 32px;
    height: 32px;
  }

  .feature-title {
    font-size: var(--text-xl);
    font-weight: 700;
    margin-bottom: var(--space-1);
    color: var(--color-gray-900);
  }

  .feature-desc {
    font-size: var(--text-sm);
    color: var(--color-gray-600);
    line-height: 1.7;
  }

  /* ===========================
     Story Section (image + text)
     =========================== */

  .story-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-10);
    align-items: center;
  }

  .story-section.reverse {
    direction: rtl;
  }

  .story-section.reverse > * {
    direction: ltr;
  }

  .story-image-wrap {
    position: relative;
    animation: scaleIn var(--animation-duration-slow) var(--animation-easing) both;
  }

  .story-image {
    width: 100%;
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-xl);
  }

  .story-image-accent {
    position: absolute;
    width: 200px;
    height: 200px;
    background: var(--gradient-accent);
    border-radius: var(--radius-2xl);
    z-index: -1;
    top: -30px;
    left: -30px;
    opacity: 0.2;
  }

  .story-content {
    padding: var(--space-3) 0;
    animation: fadeInUp var(--animation-duration-slow) var(--animation-easing) 0.15s both;
  }

  .story-label {
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--color-primary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-2);
  }

  .story-title {
    font-size: clamp(var(--text-3xl), 4vw, var(--text-4xl));
    font-weight: 700;
    line-height: 1.25;
    margin-bottom: var(--space-3);
    color: var(--color-gray-900);
  }

  .story-text {
    font-size: var(--text-lg);
    line-height: 1.8;
    color: var(--color-gray-600);
    margin-bottom: var(--space-4);
  }

  /* ===========================
     Stats
     =========================== */

  .stats-row {
    display: flex;
    gap: var(--space-5);
    margin-top: var(--space-5);
    padding-top: var(--space-5);
    border-top: 1px solid var(--color-gray-200);
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    font-size: clamp(32px, 3vw + 10px, 42px);
    font-weight: 800;
    color: var(--color-primary);
    line-height: 1;
  }

  .stat-label {
    font-size: var(--text-sm);
    color: var(--color-gray-500);
    margin-top: var(--space-1);
    font-weight: 400;
  }

  /* ===========================
     Trust Badges
     =========================== */

  .trust-section {
    text-align: center;
    padding: var(--space-12) var(--space-6);
    background: var(--gradient-light);
  }

  .trust-badges {
    display: flex;
    justify-content: center;
    gap: var(--space-8);
    flex-wrap: wrap;
    margin-top: var(--space-6);
  }

  .trust-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    transition: transform var(--animation-duration) var(--animation-easing);
  }

  .trust-badge:hover {
    transform: translateY(-4px);
  }

  .trust-badge-icon {
    width: 80px;
    height: 80px;
    background: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
    color: var(--color-primary);
    transition: box-shadow var(--animation-duration) var(--animation-easing);
  }

  .trust-badge:hover .trust-badge-icon {
    box-shadow: var(--shadow-xl);
  }

  .trust-badge-icon svg {
    width: 36px;
    height: 36px;
  }

  .trust-badge-text {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-gray-700);
  }

  /* ===========================
     Reviews
     =========================== */

  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-3);
    margin-top: var(--space-6);
  }

  .review-card {
    background: #ffffff;
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    box-shadow: var(--shadow-md);
    transition: transform var(--animation-duration) var(--animation-easing),
                box-shadow var(--animation-duration) var(--animation-easing);
  }

  .review-card:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: var(--shadow-xl);
  }

  .review-stars {
    color: var(--color-warning-light);
    font-size: var(--text-lg);
    margin-bottom: var(--space-2);
  }

  .review-text {
    font-size: var(--text-base);
    line-height: 1.75;
    color: var(--color-gray-700);
    margin-bottom: var(--space-3);
  }

  .review-author {
    font-size: var(--text-sm);
    color: var(--color-gray-500);
    font-weight: 500;
  }

  /* ===========================
     CTA Section
     =========================== */

  .cta-section {
    text-align: center;
    padding: var(--space-12) var(--space-6);
    background: var(--gradient-dark);
    color: #ffffff;
  }

  .cta-title {
    font-size: clamp(var(--text-3xl), 4vw, 42px);
    font-weight: 700;
    margin-bottom: var(--space-3);
  }

  .cta-subtitle {
    font-size: var(--text-lg);
    color: rgba(255,255,255,0.7);
    margin-bottom: var(--space-5);
    line-height: 1.7;
    font-weight: 400;
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-3) var(--space-6);
    background: var(--gradient-accent);
    color: #ffffff;
    font-size: var(--text-lg);
    font-weight: 700;
    border: none;
    border-radius: var(--radius-full);
    cursor: pointer;
    text-decoration: none;
    transition: transform var(--animation-duration) var(--animation-easing),
                box-shadow var(--animation-duration) var(--animation-easing);
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
    min-height: 48px;
    min-width: 48px;
  }

  .cta-button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 40px rgba(37, 99, 235, 0.5);
  }

  .cta-button:active {
    transform: translateY(-1px) scale(0.99);
  }

  .cta-button svg {
    width: 20px;
    height: 20px;
  }

  .cta-note {
    margin-top: var(--space-3);
    font-size: var(--text-sm);
    color: rgba(255,255,255,0.5);
  }

  /* ===========================
     Info Table
     =========================== */

  .info-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: var(--space-5);
    background: #ffffff;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
  }

  .info-table th,
  .info-table td {
    padding: var(--space-3);
    text-align: left;
    border-bottom: 1px solid var(--color-gray-100);
  }

  .info-table th {
    background: var(--color-gray-50);
    font-weight: 600;
    color: var(--color-gray-700);
    width: 30%;
  }

  .info-table td {
    color: var(--color-gray-600);
    line-height: 1.7;
  }

  /* ===========================
     Mobile Touch Targets
     =========================== */

  a, button, [role="button"],
  input[type="submit"], input[type="button"] {
    min-height: 44px;
    min-width: 44px;
  }

  /* ===========================
     Responsive - Large tablet / Small desktop
     =========================== */

  @media (max-width: 1280px) {
    .section {
      padding: var(--space-10) var(--space-5);
    }

    .hero-content {
      gap: var(--space-6);
    }
  }

  /* Responsive - Tablet landscape */
  @media (max-width: 1024px) {
    .section {
      padding: var(--space-8) var(--space-4);
    }

    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .story-section {
      gap: var(--space-6);
    }

    .trust-badges {
      gap: var(--space-5);
    }
  }

  /* Responsive - Tablet portrait / Large mobile */
  @media (max-width: 768px) {
    .section {
      padding: var(--space-6) var(--space-3);
    }

    .hero-content {
      grid-template-columns: 1fr;
      gap: var(--space-5);
      text-align: center;
      padding: var(--space-6) var(--space-3);
    }

    .hero-image {
      transform: none;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }

    .story-section {
      grid-template-columns: 1fr;
      gap: var(--space-5);
    }

    .story-section.reverse {
      direction: ltr;
    }

    .stats-row {
      flex-wrap: wrap;
      justify-content: center;
    }

    .trust-badges {
      gap: var(--space-4);
    }

    .reviews-grid {
      grid-template-columns: 1fr;
    }

    .cta-section {
      padding: var(--space-8) var(--space-3);
    }

    /* Ensure touch targets on mobile */
    .trust-badge,
    .feature-card,
    .review-card {
      min-height: 44px;
    }
  }

  /* Responsive - Mobile */
  @media (max-width: 480px) {
    .section {
      padding: var(--space-5) var(--space-2);
    }

    .hero-floating-badge {
      width: 80px;
      height: 80px;
      top: -10px;
      right: -10px;
    }

    .feature-card {
      padding: var(--space-4) var(--space-3);
    }

    .feature-icon {
      width: 60px;
      height: 60px;
    }

    .trust-badge-icon {
      width: 64px;
      height: 64px;
    }

    .cta-button {
      padding: var(--space-2) var(--space-4);
      font-size: var(--text-base);
      width: 100%;
      justify-content: center;
    }

    /* Increase body line-height for small screens (Korean readability) */
    .body-lg {
      line-height: 1.85;
    }

    .body-md {
      line-height: 1.8;
    }
  }

  /* ===========================
     Reduced Motion Preference
     =========================== */

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }

    .hero-image {
      transform: none;
    }

    .hero-image:hover {
      transform: none;
    }

    .hero-floating-badge {
      animation: none;
    }

    .feature-card:hover,
    .review-card:hover,
    .trust-badge:hover,
    .cta-button:hover {
      transform: none;
    }
  }

  /* ===========================
     Print Styles
     =========================== */

  @media print {
    :root {
      --color-primary: #000000;
      --color-primary-dark: #000000;
      --color-primary-light: #333333;
    }

    body {
      background: #ffffff;
      color: #000000;
      font-size: 12pt;
      line-height: 1.5;
    }

    .detail-page {
      max-width: 100%;
    }

    .section,
    .section-dark,
    .section-gray,
    .cta-section,
    .trust-section {
      background: #ffffff !important;
      color: #000000 !important;
      padding: 16pt 0;
      animation: none !important;
    }

    .hero {
      min-height: auto;
      page-break-after: avoid;
    }

    .hero-bg,
    .hero-bg::before {
      display: none;
    }

    .hero-content {
      grid-template-columns: 1fr;
      padding: 0;
    }

    .hero-text {
      color: #000000;
    }

    .hero-title,
    .cta-title,
    .story-title,
    .headline-xl,
    .headline-lg,
    .headline-md {
      color: #000000;
    }

    .hero-subtitle,
    .cta-subtitle,
    .body-lg,
    .body-md,
    .body-sm,
    .story-text,
    .feature-desc,
    .review-text {
      color: #333333;
    }

    .hero-badge {
      border: 1px solid #000000;
      background: none;
      color: #000000;
    }

    .hero-floating-badge {
      display: none;
    }

    .hero-image {
      transform: none;
      box-shadow: none;
      border: 1px solid #cccccc;
      max-width: 60%;
    }

    .feature-card {
      box-shadow: none;
      border: 1px solid #cccccc;
      page-break-inside: avoid;
    }

    .feature-icon {
      background: #eeeeee;
      color: #000000;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .features-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 12pt;
    }

    .story-section {
      page-break-inside: avoid;
    }

    .story-image {
      box-shadow: none;
      border: 1px solid #cccccc;
      max-width: 80%;
    }

    .story-image-accent {
      display: none;
    }

    .stats-row {
      border-top: 1px solid #cccccc;
    }

    .stat-number {
      color: #000000;
    }

    .trust-badge-icon {
      box-shadow: none;
      border: 1px solid #cccccc;
    }

    .review-card {
      box-shadow: none;
      border: 1px solid #cccccc;
      page-break-inside: avoid;
    }

    .review-stars {
      color: #000000;
    }

    .reviews-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .cta-button {
      background: none;
      color: #000000;
      border: 2px solid #000000;
      box-shadow: none;
      padding: 8pt 24pt;
    }

    .cta-note {
      color: #666666;
    }

    .info-table {
      box-shadow: none;
      border: 1px solid #cccccc;
    }

    .info-table th {
      background: #f0f0f0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .text-highlight {
      background: none;
      font-weight: 700;
    }

    .text-accent {
      color: #000000;
      font-weight: 700;
    }

    /* Remove all animations and transitions for print */
    * {
      animation: none !important;
      transition: none !important;
    }

    /* Avoid page breaks in middle of content */
    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid;
    }

    img {
      max-width: 100% !important;
      page-break-inside: avoid;
    }

    /* Hide interactive elements in print */
    a[href]::after {
      content: " (" attr(href) ")";
      font-size: 10pt;
      color: #666666;
    }
  }
</style>
`;
