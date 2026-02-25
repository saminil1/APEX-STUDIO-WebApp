"use client";

import { useRouter } from "next/navigation";

export default function StickyBanner() {
  const router = useRouter();

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[999] w-[calc(100%-40px)] max-w-[800px]">
      <div className="flex items-center justify-between gap-6 px-8 py-5 rounded-2xl bg-gradient-to-r from-primary-dark to-primary shadow-[0_4px_24px_rgba(139,0,255,0.4)]">
        <p className="text-[15px] font-bold leading-relaxed text-white">
          내 사업에 맞춘
          <br />
          홈페이지 전략, 솔루션 받기
        </p>
        <button
          onClick={() => router.push("/contact")}
          className="flex-shrink-0 whitespace-nowrap rounded-xl bg-white px-7 py-3 text-[15px] font-bold text-black transition-all hover:bg-gray-100 active:scale-95"
        >
          신청하기
        </button>
      </div>
    </div>
  );
}
