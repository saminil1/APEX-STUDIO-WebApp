import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import AiContentSection from "@/components/sections/AiContentSection";
import StorySection from "@/components/sections/StorySection";
import PricingSection from "@/components/sections/PricingSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      {/* S01: Hero */}
      <HeroSection />
      {/* S02: 실적 & 인터뷰 */}
      <StatsSection />
      {/* S03: 웹사이트 포트폴리오 */}
      <PortfolioSection />
      {/* S04: AI 콘텐츠 갤러리 */}
      <AiContentSection />
      {/* S05~S12: 스크롤 스토리텔링 */}
      <StorySection />
      {/* 비용 & 서비스 */}
      <PricingSection />
      {/* 제작 과정 */}
      <ProcessSection />
      {/* S13~S14: 문의 폼 + 연락처 */}
      <ContactSection />
      {/* S15: Footer */}
      <Footer />
    </main>
  );
}
