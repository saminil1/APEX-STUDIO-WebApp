import type { Metadata } from "next";
import ContactWizard from "@/components/contact/ContactWizard";

export const metadata: Metadata = {
  title: "상담 신청 | APEX STUDIO",
  description:
    "APEX STUDIO에 홈페이지 제작 상담을 신청하세요. 8단계 간편 접수로 빠르게 맞춤 견적을 받아보실 수 있습니다.",
  openGraph: {
    title: "상담 신청 | APEX STUDIO",
    description:
      "APEX STUDIO에 홈페이지 제작 상담을 신청하세요. 8단계 간편 접수로 빠르게 맞춤 견적을 받아보실 수 있습니다.",
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactWizard />
    </main>
  );
}
