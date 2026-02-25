"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PortfolioTabs from "./PortfolioTabs";
import {
  AI_WORKS,
  AI_CATEGORIES,
  type AiCategory,
} from "@/lib/constants";

export default function AiPageContent() {
  const [selected, setSelected] = useState<AiCategory>("전체");

  const filtered = useMemo(() => {
    return AI_WORKS.filter(
      (item) => selected === "전체" || item.category === selected
    );
  }, [selected]);

  return (
    <section className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1100px] mx-auto px-5">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[clamp(36px,8vw,56px)] font-black tracking-[3px] leading-tight mb-8"
        >
          PORTFOLIO
        </motion.h1>

        <PortfolioTabs />

        {/* 카테고리 필터 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex flex-wrap gap-2">
            {AI_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all cursor-pointer ${
                  selected === cat
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-white/20 text-text-sub hover:border-white/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry 그리드 */}
        <div className="columns-2 lg:columns-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="break-inside-avoid mb-4 group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden bg-[#111]">
                  <Image
                    src={item.img}
                    alt={item.desc}
                    width={600}
                    height={item.aspect === "portrait" ? 800 : item.aspect === "square" ? 600 : 400}
                    className="w-full block transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                    unoptimized
                  />
                  {/* 호버 오버레이 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                    <div className="p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary/80 text-white mb-1.5">
                        {item.category}
                      </span>
                      <p className="text-sm text-white font-bold">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-sub">
            <p className="text-lg font-bold mb-2">해당 조건의 포트폴리오가 없습니다</p>
            <p className="text-sm">다른 필터를 선택해 보세요</p>
          </div>
        )}
      </div>
    </section>
  );
}
