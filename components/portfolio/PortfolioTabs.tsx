"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "홈페이지", href: "/portfolio" },
  { label: "Ai 컨텐츠", href: "/portfolio/ai" },
  { label: "상세페이지", href: "/portfolio/detail" },
];

export default function PortfolioTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-3 mb-10">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all no-underline ${
              isActive
                ? "border-primary text-primary bg-primary/10"
                : "border-white/20 text-text-sub hover:border-white/50 hover:text-white"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
