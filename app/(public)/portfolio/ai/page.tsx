import type { Metadata } from "next";
import AiPageContent from "@/components/portfolio/AiPageContent";

export const metadata: Metadata = {
  title: "AI 컨텐츠 포트폴리오 | APEX STUDIO",
  description:
    "APEX STUDIO의 AI 생성 컨텐츠 포트폴리오. 제품, 인물, 음식, 공간, 패션 등 다양한 AI 이미지.",
};

export default function AiPortfolioPage() {
  return <AiPageContent />;
}
