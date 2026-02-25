import type { Metadata } from "next";
import LmsPageContent from "@/components/portfolio/LmsPageContent";

export const metadata: Metadata = {
  title: "LMS 포트폴리오 | APEX STUDIO",
  description:
    "APEX STUDIO의 LMS 구축 포트폴리오. Moodle 기반 ISO 심사원 교육, 기업 교육, 플랫폼 구축 사례.",
};

export default function LmsPortfolioPage() {
  return <LmsPageContent />;
}
