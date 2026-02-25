"use client";

import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { PORTFOLIO_ITEMS } from "@/lib/constants";

import "swiper/css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function PortfolioSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="portfolio" className="py-20 text-center">
      {/* 섹션 타이틀 */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="text-[clamp(36px,8vw,56px)] font-black tracking-[3px] leading-tight mb-8"
      >
        WEBSITE
        <br />
        PORTFOLIO
      </motion.h2>

      {/* 슬라이더 */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative max-w-[800px] mx-auto mb-8 rounded-xl overflow-hidden"
      >
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop
          spaceBetween={0}
          slidesPerView={1}
          className="w-full"
        >
          {PORTFOLIO_ITEMS.map((item) => (
            <SwiperSlide key={item.name}>
              <div className="relative aspect-video">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 800px) 100vw, 800px"
                  unoptimized
                />
                {/* 오버레이 정보 */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-5 pb-5 pt-10 text-left">
                  <span className="inline-block bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded mb-2">
                    {item.category}
                  </span>
                  <div className="text-lg font-bold mb-1">{item.name}</div>
                  <div className="text-[13px] text-text-sub">{item.desc}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 네비게이션 버튼 */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute top-1/2 left-2.5 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 border border-white/30 text-white flex items-center justify-center text-lg cursor-pointer hover:bg-black/70 transition-colors"
          aria-label="이전 슬라이드"
        >
          &#8592;
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 right-2.5 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 border border-white/30 text-white flex items-center justify-center text-lg cursor-pointer hover:bg-black/70 transition-colors"
          aria-label="다음 슬라이드"
        >
          &#8594;
        </button>
      </motion.div>

      {/* 더보기 버튼 */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <Link
          href="/portfolio"
          className="inline-block border-2 border-white text-white px-10 py-3 text-[15px] font-bold tracking-wider bg-transparent cursor-pointer transition-all hover:bg-white hover:text-black no-underline"
        >
          더보기
        </Link>
      </motion.div>
    </section>
  );
}
