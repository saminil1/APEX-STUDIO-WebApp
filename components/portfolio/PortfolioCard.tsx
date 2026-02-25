"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { PortfolioWork } from "@/lib/constants";

export default function PortfolioCard({ item }: { item: PortfolioWork }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="group cursor-pointer"
    >
      {/* 썸네일 */}
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

      {/* 메타 정보 */}
      <div className="text-xs text-text-sub mb-1">{item.industry}</div>

      {/* 제목 + 플랜 */}
      <div className="flex items-baseline gap-2 mb-2">
        <h3 className="text-base font-black text-white leading-tight">
          {item.name}
        </h3>
        <span className="text-xs text-text-sub">{item.plan}</span>
      </div>

      {/* 태그 */}
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
  );
}
