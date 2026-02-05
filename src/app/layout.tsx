import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Detail_P - AI 상세페이지 생성기",
  description: "AI가 만드는 식품/건강기능식품 상세페이지. 제품 이미지만 업로드하면 마케팅 카피와 상세페이지를 자동 생성합니다.",
  keywords: ["상세페이지", "AI", "식품", "건강기능식품", "쇼핑몰", "마케팅"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
