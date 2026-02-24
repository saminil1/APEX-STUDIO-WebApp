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
  title: "APEX STUDIO | 실패없는 홈페이지 제작 에이전시",
  description:
    "고객이 읽고, 믿고, 행동하는 홈페이지. 실패없는 디자인으로 매출을 만드는 에이전시 APEX STUDIO",
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
