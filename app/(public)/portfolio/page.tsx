import type { Metadata } from "next";
import PortfolioPageContent from "@/components/portfolio/PortfolioPageContent";

export const metadata: Metadata = {
  title: "포트폴리오 | APEX STUDIO",
  description:
    "APEX STUDIO가 제작한 홈페이지, 랜딩페이지, 쇼핑몰, 웹서비스 포트폴리오를 확인하세요.",
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
