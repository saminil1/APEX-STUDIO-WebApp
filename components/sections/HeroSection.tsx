"use client";

import { motion, type Variants } from "framer-motion";

const fadeSlideUp = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" as const, delay },
  },
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center gap-8"
    >
      {/* 그라디언트 바 */}
      <motion.div
        variants={fadeSlideUp(0)}
        initial="hidden"
        animate="visible"
        className="rounded-md"
        style={{
          width: 180,
          height: 380,
          background:
            "linear-gradient(160deg, #FF00FF 0%, #8800FF 40%, #0044FF 75%, #FF6600 100%)",
        }}
      />

      {/* 타이틀 */}
      <motion.h1
        variants={fadeSlideUp(0.3)}
        initial="hidden"
        animate="visible"
        className="text-[clamp(36px,8vw,58px)] font-black tracking-[4px] leading-tight"
      >
        APEX STUDIO
      </motion.h1>

      {/* 슬로건 */}
      <motion.p
        variants={fadeSlideUp(0.5)}
        initial="hidden"
        animate="visible"
        className="text-[clamp(15px,3vw,20px)] text-text-sub max-w-[480px]"
      >
        성공하는 디자인으로 매출을 만드는 웹&앱 에이전시
      </motion.p>
    </section>
  );
}
