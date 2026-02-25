"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PortfolioTabs from "./PortfolioTabs";
import {
  LMS_WORKS,
  LMS_CATEGORIES,
  type LmsCategory,
} from "@/lib/constants";

export default function LmsPageContent() {
  const [selected, setSelected] = useState<LmsCategory>("전체");

  const filtered = useMemo(() => {
    return LMS_WORKS.filter(
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
            {LMS_CATEGORIES.map((cat) => (
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

        {/* 그리드 — LMS는 가로 비율 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/2] rounded-xl overflow-hidden mb-3 bg-[#111]">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
                <div className="text-xs text-text-sub mb-1">{item.category}</div>
                <h3 className="text-base font-black text-white leading-tight mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-text-sub mb-2">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/10 text-text-sub border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
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
