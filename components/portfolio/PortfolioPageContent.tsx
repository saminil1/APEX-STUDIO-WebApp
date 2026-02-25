"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioCard from "./PortfolioCard";
import {
  PORTFOLIO_WORKS,
  PORTFOLIO_TYPES,
  INDUSTRY_TYPES,
  type PortfolioType,
  type IndustryType,
} from "@/lib/constants";

export default function PortfolioPageContent() {
  const [selectedType, setSelectedType] = useState<PortfolioType>("전체");
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>("전체");

  const filtered = useMemo(() => {
    return PORTFOLIO_WORKS.filter((item) => {
      const typeMatch = selectedType === "전체" || item.type === selectedType;
      const industryMatch =
        selectedIndustry === "전체" || item.industry === selectedIndustry;
      return typeMatch && industryMatch;
    });
  }, [selectedType, selectedIndustry]);

  return (
    <section className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1100px] mx-auto px-5">
        {/* 페이지 타이틀 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[clamp(36px,8vw,56px)] font-black tracking-[3px] leading-tight mb-10"
        >
          PORTFOLIO
        </motion.h1>

        {/* 유형 필터 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4"
        >
          <div className="flex flex-wrap gap-2">
            {PORTFOLIO_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all cursor-pointer ${
                  selectedType === type
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-white/20 text-text-sub hover:border-white/50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 업종 필터 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <p className="text-sm text-text-sub mb-2 font-bold">업종</p>
          <div className="flex flex-wrap gap-2">
            {INDUSTRY_TYPES.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-2 transition-all cursor-pointer ${
                  selectedIndustry === industry
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-white/20 text-text-sub hover:border-white/50"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 포트폴리오 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {/* 결과 없음 */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-text-sub"
          >
            <p className="text-lg font-bold mb-2">
              해당 조건의 포트폴리오가 없습니다
            </p>
            <p className="text-sm">다른 필터를 선택해 보세요</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
