import type { Metadata } from "next";
import DetailPageContent from "@/components/portfolio/DetailPageContent";

export const metadata: Metadata = {
  title: "상세페이지 포트폴리오 | APEX STUDIO",
  description:
    "APEX STUDIO가 제작한 상세페이지, 리텐츠 포트폴리오. 전환율을 높이는 상세페이지 디자인.",
};

export default function DetailPortfolioPage() {
  return <DetailPageContent />;
}
