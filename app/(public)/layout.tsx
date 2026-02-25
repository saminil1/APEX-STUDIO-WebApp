import Navbar from "@/components/layout/Navbar";
import StickyBanner from "@/components/layout/StickyBanner";
import ChatBot from "@/components/chatbot/ChatBot";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-24">
      <GoogleAnalytics />
      <Navbar />
      {children}
      <StickyBanner />
      <ChatBot />
    </div>
  );
}
