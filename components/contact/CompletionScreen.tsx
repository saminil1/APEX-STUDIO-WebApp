"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CONTACT_EMAIL, KAKAO_CHANNEL } from "@/lib/constants";

export default function CompletionScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center py-16"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-primary flex items-center justify-center">
        <svg
          className="w-10 h-10 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-black mb-3">상담 신청이 완료되었습니다!</h2>
      <p className="text-text-sub text-[15px] leading-relaxed mb-8 max-w-md mx-auto">
        빠른 시일 내에 담당자가 연락드리겠습니다.
        <br />
        보통 1~2 영업일 이내에 회신됩니다.
      </p>

      <div className="border border-white/10 rounded-2xl p-6 max-w-sm mx-auto mb-8">
        <p className="text-sm font-bold mb-3">빠른 상담을 원하시면</p>
        <div className="space-y-2 text-sm text-text-sub">
          <p>카카오톡 채널: <span className="text-white font-bold">{KAKAO_CHANNEL}</span></p>
          <p>
            이메일:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-white font-bold underline hover:text-primary transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>

      <Link
        href="/"
        className="inline-block text-sm text-accent underline underline-offset-4 hover:text-white transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </motion.div>
  );
}
