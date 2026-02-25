import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apex-studio.kr"),
  title: "APEX STUDIO | 성공하는 홈페이지 제작 에이전시",
  description:
    "고객이 읽고, 믿고, 행동하는 홈페이지. AI 콘텐츠와 40년 IT 기획력으로 매출을 만드는 웹&앱 에이전시 APEX STUDIO",
  keywords: [
    "홈페이지 제작",
    "웹사이트 제작",
    "앱 개발",
    "에이전시",
    "APEX STUDIO",
    "AI 콘텐츠",
    "웹 에이전시",
  ],
  openGraph: {
    title: "APEX STUDIO | 성공하는 홈페이지 제작 에이전시",
    description:
      "고객이 읽고, 믿고, 행동하는 홈페이지. 매출을 만드는 웹&앱 에이전시",
    type: "website",
    locale: "ko_KR",
    url: "https://apex-studio.kr",
    siteName: "APEX STUDIO",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "APEX STUDIO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "APEX STUDIO | 성공하는 홈페이지 제작 에이전시",
    description:
      "고객이 읽고, 믿고, 행동하는 홈페이지. 매출을 만드는 웹&앱 에이전시",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
