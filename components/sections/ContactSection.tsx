"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { CONTACT_EMAIL, KAKAO_CHANNEL } from "@/lib/constants";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

export default function ContactSection() {
  return (
    <section id="contact" className="max-w-[600px] mx-auto px-6 py-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="text-[clamp(22px,5vw,30px)] font-bold mb-4 leading-relaxed"
        >
          내 사업의 성장을 위한
          <br />
          홈페이지 전략을 받아보세요
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-text-sub text-sm mb-8"
        >
          8단계 간편 상담 신청으로 맞춤 견적을 받아보세요.
        </motion.p>

        <motion.div variants={fadeUp}>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white border-none py-4 px-12 rounded-[10px] text-base font-bold no-underline transition-colors hover:bg-primary-light"
          >
            무료 상담 신청하기
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col gap-2 text-sm text-text-sub"
        >
          <span>카카오톡 채널: {KAKAO_CHANNEL}</span>
          <span>
            이메일:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline hover:text-white transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
