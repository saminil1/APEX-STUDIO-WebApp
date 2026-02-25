import type { Metadata } from "next";
import ErpPageContent from "@/components/portfolio/ErpPageContent";

export const metadata: Metadata = {
  title: "ERP 포트폴리오 | APEX STUDIO",
  description:
    "APEX STUDIO의 ERP 구축 포트폴리오. ISO ERP 관리시스템과 Odoo ERP 솔루션 구축 사례.",
};

export default function ErpPortfolioPage() {
  return <ErpPageContent />;
}
