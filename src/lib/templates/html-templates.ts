/**
 * 상업용 상세페이지 HTML 템플릿
 * 쿠팡, 마켓컬리, 네이버 스마트스토어 베스트셀러 참고
 */

// Lucide Icons SVG Map (인라인 SVG로 외부 의존성 제거)
export const ICON_SVG_MAP: Record<string, string> = {
  // General
  'check': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  'check-circle': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  'star': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  'award': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  'badge': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/></svg>',
  'shield': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
  'shield-check': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
  'heart': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  'thumbs-up': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>',
  'users': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  'truck': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>',
  'package': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
  'clock': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  'calendar': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
  'refresh-cw': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>',
  'zap': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>',
  'sparkles': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
  'target': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  'trending-up': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',

  // Coffee
  'coffee': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>',
  'thermometer': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>',
  'scale': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
  'timer': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>',
  'flame': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  'bean': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z"/><path d="M5.341 10.62a4 4 0 1 0 5.279-5.28"/></svg>',
  'droplets': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>',
  'sun': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
  'wind': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>',

  // Health & Supplements
  'leaf': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
  'pill': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>',
  'activity': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>',
  'brain': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>',
  'dna': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m17 6-2.5-2.5"/><path d="m14 8-1-1"/><path d="m7 18 2.5 2.5"/><path d="m3.5 14.5.5.5"/><path d="m20 9 .5.5"/><path d="m6.5 12.5 1 1"/><path d="m16.5 10.5 1 1"/><path d="m10 16 1.5 1.5"/></svg>',
  'eye': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
  'bone': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"/></svg>',
  'droplet': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>',
  'moon': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  'sunrise': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>',

  // Food
  'utensils': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
  'cherry': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"/><path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"/><path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"/><path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"/></svg>',
  'wheat': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/></svg>',
  'refrigerator': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"/><path d="M5 10h14"/><path d="M15 7v6"/></svg>',
  'soup': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M7 21h10"/><path d="M19.5 12 22 6"/><path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"/><path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"/><path d="M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62"/></svg>',
  'cookie': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg>',
  'salad': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21h10"/><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"/><path d="m13 12 4-4"/><path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2"/></svg>',

  // Certification & Quality
  'file-check': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/></svg>',
  'microscope': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>',
  'flask-conical': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>',
  'test-tube': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/></svg>',
  'building': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
  'factory': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>',

  // Warning & Info
  'alert-triangle': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  'info': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  'help-circle': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',

  // Navigation & Actions
  'arrow-right': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  'chevron-right': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  'external-link': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  'shopping-cart': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
  'gift': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>',
  'percent': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
  'tag': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>',
  'crown': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>',
  'medal': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/></svg>',
  'gem': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>',
};

// 아이콘 렌더링 헬퍼 함수
export function getIconSvg(iconName: string, size: number = 24, color: string = 'currentColor'): string {
  const svg = ICON_SVG_MAP[iconName.toLowerCase()];
  if (!svg) {
    // Fallback: 기본 아이콘
    return ICON_SVG_MAP['check-circle'] || '';
  }
  // size와 color 적용
  return svg
    .replace(/width="24"/g, `width="${size}"`)
    .replace(/height="24"/g, `height="${size}"`)
    .replace(/stroke="currentColor"/g, `stroke="${color}"`);
}

// 카테고리별 추천 아이콘 프리셋
export const ICON_PRESETS: Record<string, string[]> = {
  coffee: ['coffee', 'thermometer', 'scale', 'timer', 'bean', 'flame', 'droplets', 'sun', 'wind', 'sparkles'],
  health_supplement: ['shield-check', 'heart', 'leaf', 'pill', 'activity', 'brain', 'eye', 'bone', 'droplet', 'moon', 'sunrise', 'zap'],
  food: ['utensils', 'cherry', 'wheat', 'refrigerator', 'soup', 'cookie', 'salad', 'flame', 'sparkles', 'heart'],
  general: ['check-circle', 'shield', 'award', 'star', 'thumbs-up', 'users', 'truck', 'package', 'clock', 'refresh-cw', 'zap', 'target'],
  trust: ['shield-check', 'award', 'file-check', 'microscope', 'flask-conical', 'building', 'factory', 'medal', 'gem', 'crown'],
};

// 공통 CSS 스타일 (프리미엄 디자인 시스템)
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

    /* Typography */
    --text-xs: 12px;
    --text-sm: 14px;
    --text-base: 16px;
    --text-lg: 18px;
    --text-xl: 20px;
    --text-2xl: 24px;
    --text-3xl: 30px;
    --text-4xl: 36px;
    --text-5xl: 48px;

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
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    line-height: 1.6;
    color: var(--color-gray-900);
    background: #ffffff;
    -webkit-font-smoothing: antialiased;
  }

  .detail-page {
    max-width: var(--max-width);
    margin: 0 auto;
    background: #fff;
  }

  /* 섹션 공통 */
  .section {
    padding: var(--space-12) var(--space-6);
    position: relative;
  }

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

  /* 타이포그래피 */
  .headline-xl {
    font-size: clamp(var(--text-4xl), 5vw, var(--text-5xl));
    font-weight: 700;
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
  }

  .body-md {
    font-size: var(--text-base);
    line-height: 1.7;
    color: var(--color-gray-600);
  }

  .body-sm {
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--color-gray-500);
  }

  .text-accent {
    color: var(--color-primary);
  }

  .text-highlight {
    background: linear-gradient(180deg, transparent 60%, rgba(37, 99, 235, 0.15) 60%);
    padding: 0 4px;
  }

  /* 히어로 섹션 */
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
    line-height: 1.7;
    margin-bottom: var(--space-4);
  }

  .hero-image-wrap {
    position: relative;
  }

  .hero-image {
    width: 100%;
    height: auto;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-2xl);
    transform: perspective(1000px) rotateY(-5deg);
    transition: transform 0.3s ease;
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

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  /* 특징 카드 */
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
    transition: all 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
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
    line-height: 1.6;
  }

  /* 스토리 섹션 (이미지 + 텍스트) */
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

  /* 숫자 강조 */
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
    font-size: 42px;
    font-weight: 800;
    color: var(--color-primary);
    line-height: 1;
  }

  .stat-label {
    font-size: var(--text-sm);
    color: var(--color-gray-500);
    margin-top: var(--space-1);
  }

  /* 신뢰 배지 */
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

  /* 리뷰 섹션 */
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
  }

  .review-stars {
    color: var(--color-warning-light);
    font-size: var(--text-lg);
    margin-bottom: var(--space-2);
  }

  .review-text {
    font-size: var(--text-base);
    line-height: 1.7;
    color: var(--color-gray-700);
    margin-bottom: var(--space-3);
  }

  .review-author {
    font-size: var(--text-sm);
    color: var(--color-gray-500);
  }

  /* CTA 섹션 */
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
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
  }

  .cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(37, 99, 235, 0.5);
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

  /* 정보 표 */
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
  }

  /* 반응형 - 대형 태블릿/소형 데스크톱 */
  @media (max-width: 1280px) {
    .section {
      padding: var(--space-10) var(--space-5);
    }

    .hero-content {
      gap: var(--space-6);
    }
  }

  /* 반응형 - 태블릿 가로 */
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

  /* 반응형 - 태블릿 세로/대형 모바일 */
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
  }

  /* 반응형 - 모바일 */
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
    }
  }
</style>
`;

// 커피 전용 템플릿
export const COFFEE_TEMPLATE = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  ${BASE_STYLES}
  <style>
    /* Coffee Theme - using CSS variables with brown accent */
    :root {
      --coffee-accent: #8b5a2b;
      --coffee-accent-light: #d4a574;
    }

    .coffee-hero-bg {
      background: linear-gradient(135deg, var(--color-gray-900) 0%, #3d2c1f 50%, var(--color-gray-900) 100%);
    }
    .coffee-hero-bg::before {
      background: radial-gradient(ellipse at 30% 20%, rgba(139,90,43,0.2) 0%, transparent 50%);
    }

    .hero-badge {
      background: rgba(139,90,43,0.2);
      border-color: rgba(139,90,43,0.4);
      color: var(--coffee-accent-light);
    }

    .hero-floating-badge {
      background: linear-gradient(135deg, var(--coffee-accent) 0%, var(--coffee-accent-light) 100%);
      box-shadow: 0 10px 30px rgba(139,90,43,0.4);
    }

    .story-label { color: var(--coffee-accent); }
    .stat-number { color: var(--coffee-accent); }
    .feature-icon { background: linear-gradient(135deg, var(--coffee-accent) 0%, var(--coffee-accent-light) 100%); }
    .story-image-accent { background: linear-gradient(135deg, var(--coffee-accent) 0%, var(--coffee-accent-light) 100%); }

    .tasting-wheel {
      display: flex;
      justify-content: center;
      gap: var(--space-2);
      flex-wrap: wrap;
      margin-top: var(--space-4);
    }
    .tasting-note {
      padding: var(--space-1) var(--space-3);
      background: rgba(139,90,43,0.1);
      border: 1px solid rgba(139,90,43,0.2);
      border-radius: var(--radius-full);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--coffee-accent);
    }

    .roast-level {
      display: flex;
      align-items: center;
      gap: var(--space-1);
      margin-top: var(--space-3);
    }
    .roast-bar {
      flex: 1;
      height: 8px;
      background: var(--color-gray-200);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }
    .roast-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--coffee-accent-light) 0%, var(--coffee-accent) 100%);
      border-radius: var(--radius-sm);
    }

    .brewing-card {
      background: #ffffff;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      text-align: center;
      box-shadow: var(--shadow-md);
    }
    .brewing-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto var(--space-2);
      background: linear-gradient(135deg, var(--coffee-accent) 0%, var(--coffee-accent-light) 100%);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }
    .brewing-icon svg {
      width: 32px;
      height: 32px;
    }
    .brewing-value {
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--coffee-accent);
    }
    .brewing-label {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      margin-top: var(--space-1);
    }

    .cta-button {
      background: linear-gradient(135deg, var(--coffee-accent) 0%, var(--coffee-accent-light) 100%);
      box-shadow: 0 10px 30px rgba(139,90,43,0.4);
    }
    .cta-button:hover {
      box-shadow: 0 15px 40px rgba(139,90,43,0.5);
    }

    .trust-badge-icon {
      color: var(--coffee-accent);
    }
  </style>
</head>
<body>
  <div class="detail-page">
    <!-- 히어로 섹션 -->
    <section class="hero coffee-hero-bg">
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-badge">{{BADGE_TEXT}}</span>
          <h1 class="hero-title">{{HEADLINE}}</h1>
          <p class="hero-subtitle">{{SUBHEADLINE}}</p>
          <div class="tasting-wheel">
            {{TASTING_NOTES}}
          </div>
        </div>
        <div class="hero-image-wrap">
          <img src="{{IMAGE_1}}" alt="{{PRODUCT_NAME}}" class="hero-image">
          <div class="hero-floating-badge">
            <span style="font-size: var(--text-sm);">{{BADGE_LABEL}}</span>
            <span style="font-size: var(--text-2xl);">{{BADGE_VALUE}}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 특징 섹션 -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">SPECIAL FEATURES</span>
        <h2 class="headline-lg">{{FEATURES_TITLE}}</h2>
      </div>
      <div class="features-grid">
        {{FEATURE_CARDS}}
      </div>
    </section>

    <!-- 스토리 섹션 1 -->
    <section class="section section-gray">
      <div class="story-section">
        <div class="story-image-wrap">
          <div class="story-image-accent"></div>
          <img src="{{IMAGE_2}}" alt="원두 스토리" class="story-image">
        </div>
        <div class="story-content">
          <span class="story-label">OUR STORY</span>
          <h2 class="story-title">{{STORY_TITLE_1}}</h2>
          <p class="story-text">{{STORY_TEXT_1}}</p>
          <div class="roast-level">
            <span style="font-weight: 600; color: var(--color-gray-700);">로스팅 레벨</span>
            <div class="roast-bar">
              <div class="roast-fill" style="width: {{ROAST_LEVEL}}%;"></div>
            </div>
            <span style="font-weight: 600; color: var(--coffee-accent);">{{ROAST_NAME}}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 추출 가이드 -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">BREWING GUIDE</span>
        <h2 class="headline-lg">완벽한 한 잔을 위한 추출 가이드</h2>
      </div>
      <div class="features-grid">
        <div class="brewing-card">
          <div class="brewing-icon">{{ICON_THERMOMETER}}</div>
          <div class="brewing-value">92-96°C</div>
          <div class="brewing-label">추출 온도</div>
        </div>
        <div class="brewing-card">
          <div class="brewing-icon">{{ICON_SCALE}}</div>
          <div class="brewing-value">1:15</div>
          <div class="brewing-label">커피 : 물 비율</div>
        </div>
        <div class="brewing-card">
          <div class="brewing-icon">{{ICON_TIMER}}</div>
          <div class="brewing-value">2:30-3:00</div>
          <div class="brewing-label">추출 시간</div>
        </div>
      </div>
    </section>

    <!-- 신뢰 섹션 -->
    <section class="trust-section">
      <span class="story-label">WHY CHOOSE US</span>
      <h2 class="headline-lg">{{TRUST_TITLE}}</h2>
      <div class="trust-badges">
        {{TRUST_BADGES}}
      </div>
    </section>

    <!-- CTA 섹션 -->
    <section class="cta-section">
      <h2 class="cta-title">{{CTA_TITLE}}</h2>
      <p class="cta-subtitle">{{CTA_SUBTITLE}}</p>
      <a href="#" class="cta-button">
        <span>{{CTA_BUTTON}}</span>
        {{ICON_ARROW_RIGHT}}
      </a>
      <p class="cta-note">{{CTA_NOTE}}</p>
    </section>

    <!-- 제품 정보 -->
    <section class="section section-light">
      <h2 class="headline-md" style="margin-bottom: var(--space-4);">제품 상세 정보</h2>
      <table class="info-table">
        {{PRODUCT_INFO_TABLE}}
      </table>
    </section>
  </div>
</body>
</html>
`;

// 건강기능식품 전용 템플릿
export const HEALTH_SUPPLEMENT_TEMPLATE = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  ${BASE_STYLES}
  <style>
    /* Health Theme - using CSS variables with green accent */
    :root {
      --health-accent: #059669;
      --health-accent-light: #10b981;
      --health-accent-dark: #047857;
    }

    .health-hero-bg {
      background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #064e3b 100%);
    }
    .health-hero-bg::before {
      background: radial-gradient(ellipse at 70% 30%, rgba(16,185,129,0.2) 0%, transparent 50%);
    }

    .hero-badge {
      background: rgba(16,185,129,0.2);
      border-color: rgba(16,185,129,0.4);
      color: var(--health-accent-light);
    }

    .hero-floating-badge {
      background: linear-gradient(135deg, var(--health-accent) 0%, var(--health-accent-light) 100%);
      box-shadow: 0 10px 30px rgba(5,150,105,0.4);
    }

    .story-label { color: var(--health-accent); }
    .stat-number { color: var(--health-accent); }
    .feature-icon { background: linear-gradient(135deg, var(--health-accent) 0%, var(--health-accent-light) 100%); }
    .story-image-accent { background: linear-gradient(135deg, var(--health-accent) 0%, var(--health-accent-light) 100%); }

    .certification-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      padding: var(--space-1) var(--space-2);
      background: rgba(16,185,129,0.15);
      border: 1px solid rgba(16,185,129,0.3);
      border-radius: var(--radius-sm);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--health-accent-light);
    }

    .certification-badge svg {
      width: 16px;
      height: 16px;
    }

    .ingredient-card {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      text-align: center;
    }
    .ingredient-amount {
      font-size: var(--text-4xl);
      font-weight: 800;
      color: var(--health-accent);
    }
    .ingredient-name {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--color-gray-700);
      margin-top: var(--space-1);
    }

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
    .warning-content {
      flex: 1;
    }
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

    .dosage-timeline {
      display: flex;
      justify-content: space-around;
      margin-top: var(--space-5);
      padding: var(--space-5);
      background: #ecfdf5;
      border-radius: var(--radius-lg);
    }
    .dosage-item {
      text-align: center;
    }
    .dosage-time {
      font-size: var(--text-sm);
      color: var(--color-gray-500);
      margin-bottom: var(--space-1);
    }
    .dosage-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto var(--space-2);
      background: linear-gradient(135deg, var(--health-accent) 0%, var(--health-accent-light) 100%);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }
    .dosage-icon svg {
      width: 32px;
      height: 32px;
    }
    .dosage-text {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--health-accent);
    }

    .benefits-list-item {
      padding: var(--space-1) 0;
      border-bottom: 1px solid var(--color-gray-200);
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }
    .benefits-list-item svg {
      width: 20px;
      height: 20px;
      color: var(--health-accent);
      flex-shrink: 0;
    }

    .cta-section {
      background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
    }
    .cta-button {
      background: linear-gradient(135deg, var(--health-accent) 0%, var(--health-accent-light) 100%);
      box-shadow: 0 10px 30px rgba(5,150,105,0.4);
    }
    .cta-button:hover {
      box-shadow: 0 15px 40px rgba(5,150,105,0.5);
    }

    .trust-badge-icon {
      color: var(--health-accent);
    }
  </style>
</head>
<body>
  <div class="detail-page">
    <!-- 히어로 섹션 -->
    <section class="hero health-hero-bg">
      <div class="hero-content">
        <div class="hero-text">
          <div style="display: flex; gap: var(--space-1); flex-wrap: wrap; margin-bottom: var(--space-3);">
            {{CERTIFICATION_BADGES}}
          </div>
          <h1 class="hero-title">{{HEADLINE}}</h1>
          <p class="hero-subtitle">{{SUBHEADLINE}}</p>
          <p style="font-size: var(--text-sm); color: rgba(255,255,255,0.6); margin-top: var(--space-3);">
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

    <!-- 주요 성분 -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">KEY INGREDIENTS</span>
        <h2 class="headline-lg">{{INGREDIENTS_TITLE}}</h2>
      </div>
      <div class="features-grid">
        {{INGREDIENT_CARDS}}
      </div>
    </section>

    <!-- 효능 섹션 -->
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

    <!-- 섭취 방법 -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-5);">
        <span class="story-label">HOW TO TAKE</span>
        <h2 class="headline-lg">올바른 섭취 방법</h2>
      </div>
      <div class="dosage-timeline">
        {{DOSAGE_ITEMS}}
      </div>
      <div class="warning-box">
        <div class="warning-icon">{{ICON_ALERT_TRIANGLE}}</div>
        <div class="warning-content">
          <p class="warning-title">섭취 시 주의사항</p>
          <p class="warning-text">{{CAUTION_NOTES}}</p>
        </div>
      </div>
    </section>

    <!-- 신뢰 섹션 -->
    <section class="trust-section">
      <span class="story-label">TRUST & SAFETY</span>
      <h2 class="headline-lg">{{TRUST_TITLE}}</h2>
      <div class="trust-badges">
        {{TRUST_BADGES}}
      </div>
    </section>

    <!-- CTA 섹션 -->
    <section class="cta-section">
      <h2 class="cta-title">{{CTA_TITLE}}</h2>
      <p class="cta-subtitle">{{CTA_SUBTITLE}}</p>
      <a href="#" class="cta-button">
        <span>{{CTA_BUTTON}}</span>
        {{ICON_ARROW_RIGHT}}
      </a>
      <p class="cta-note">{{CTA_NOTE}}</p>
    </section>

    <!-- 제품 정보 -->
    <section class="section section-light">
      <h2 class="headline-md" style="margin-bottom: var(--space-4);">제품 상세 정보</h2>
      <table class="info-table">
        {{PRODUCT_INFO_TABLE}}
      </table>
    </section>
  </div>
</body>
</html>
`;

// 일반 식품 템플릿
export const FOOD_TEMPLATE = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PRODUCT_NAME}} - 상세페이지</title>
  ${BASE_STYLES}
  <style>
    /* Food Theme - uses default primary blue from design system */
    .food-hero-bg {
      background: var(--gradient-dark);
    }
    .food-hero-bg::before {
      background: radial-gradient(ellipse at 30% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 50%);
    }

    .taste-tag {
      display: inline-block;
      padding: var(--space-1) var(--space-3);
      background: rgba(37, 99, 235, 0.1);
      border: 1px solid rgba(37, 99, 235, 0.2);
      border-radius: var(--radius-full);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-primary-light);
      margin: 4px;
    }

    .recipe-card {
      background: #ffffff;
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
    }
    .recipe-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .recipe-content {
      padding: var(--space-3);
    }
    .recipe-title {
      font-size: var(--text-lg);
      font-weight: 700;
      margin-bottom: var(--space-1);
    }
    .recipe-desc {
      font-size: var(--text-sm);
      color: var(--color-gray-600);
    }
  </style>
</head>
<body>
  <div class="detail-page">
    <!-- 히어로 섹션 -->
    <section class="hero food-hero-bg">
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-badge">{{BADGE_TEXT}}</span>
          <h1 class="hero-title">{{HEADLINE}}</h1>
          <p class="hero-subtitle">{{SUBHEADLINE}}</p>
          <div style="margin-top: var(--space-3);">
            {{TASTE_TAGS}}
          </div>
        </div>
        <div class="hero-image-wrap">
          <img src="{{IMAGE_1}}" alt="{{PRODUCT_NAME}}" class="hero-image">
          <div class="hero-floating-badge">
            <span style="font-size: var(--text-sm);">{{BADGE_LABEL}}</span>
            <span style="font-size: var(--text-2xl);">{{BADGE_VALUE}}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 특징 섹션 -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="story-label">SPECIAL FEATURES</span>
        <h2 class="headline-lg">{{FEATURES_TITLE}}</h2>
      </div>
      <div class="features-grid">
        {{FEATURE_CARDS}}
      </div>
    </section>

    <!-- 스토리 섹션 -->
    <section class="section section-gray">
      <div class="story-section">
        <div class="story-image-wrap">
          <div class="story-image-accent"></div>
          <img src="{{IMAGE_2}}" alt="제품 스토리" class="story-image">
        </div>
        <div class="story-content">
          <span class="story-label">OUR STORY</span>
          <h2 class="story-title">{{STORY_TITLE}}</h2>
          <p class="story-text">{{STORY_TEXT}}</p>
          <div class="stats-row">
            {{STATS_ITEMS}}
          </div>
        </div>
      </div>
    </section>

    <!-- 리뷰 섹션 -->
    <section class="section section-light">
      <div style="text-align: center; margin-bottom: var(--space-5);">
        <span class="story-label">REVIEWS</span>
        <h2 class="headline-lg">고객님들의 솔직한 후기</h2>
      </div>
      <div class="reviews-grid">
        {{REVIEW_CARDS}}
      </div>
    </section>

    <!-- 신뢰 섹션 -->
    <section class="trust-section">
      <span class="story-label">WHY CHOOSE US</span>
      <h2 class="headline-lg">{{TRUST_TITLE}}</h2>
      <div class="trust-badges">
        {{TRUST_BADGES}}
      </div>
    </section>

    <!-- CTA 섹션 -->
    <section class="cta-section">
      <h2 class="cta-title">{{CTA_TITLE}}</h2>
      <p class="cta-subtitle">{{CTA_SUBTITLE}}</p>
      <a href="#" class="cta-button">
        <span>{{CTA_BUTTON}}</span>
        {{ICON_ARROW_RIGHT}}
      </a>
      <p class="cta-note">{{CTA_NOTE}}</p>
    </section>

    <!-- 제품 정보 -->
    <section class="section section-light">
      <h2 class="headline-md" style="margin-bottom: var(--space-4);">제품 상세 정보</h2>
      <table class="info-table">
        {{PRODUCT_INFO_TABLE}}
      </table>
    </section>
  </div>
</body>
</html>
`;

// 템플릿 선택 함수
export function getHtmlTemplate(category: string): string {
  switch (category) {
    case 'coffee':
      return COFFEE_TEMPLATE;
    case 'health_supplement':
      return HEALTH_SUPPLEMENT_TEMPLATE;
    case 'processed_food':
    case 'beverage':
    case 'other':
    default:
      return FOOD_TEMPLATE;
  }
}
