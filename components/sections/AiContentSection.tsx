"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { AI_CONTENT_IMAGES } from "@/lib/constants";

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
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function AiContentSection() {
  return (
    <section id="ai-content" className="py-20 text-center">
      {/* 섹션 타이틀 */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="text-[clamp(36px,8vw,56px)] font-black tracking-[3px] leading-tight mb-8"
      >
        AI CONTENT
        <br />
        PORTFOLIO
      </motion.h2>

      {/* Masonry 그리드 */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-[800px] mx-auto px-4"
        style={{ columns: 2, gap: "8px" }}
      >
        {AI_CONTENT_IMAGES.map((item) => (
          <motion.div
            key={item.alt}
            variants={itemFade}
            className="break-inside-avoid mb-2 overflow-hidden rounded-lg group"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={400}
              height={400}
              className="w-full block transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 800px) 50vw, 400px"
              unoptimized
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
