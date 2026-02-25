"use client";

import { motion, type Variants } from "framer-motion";
import { STATS } from "@/lib/constants";
import useCountUp from "@/hooks/useCountUp";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

function StatCard({
  label,
  value,
  suffix,
  decimal,
}: {
  label: string;
  value: number;
  suffix: string;
  decimal?: boolean;
}) {
  const { count, ref } = useCountUp({ target: value, decimal });

  return (
    <div
      ref={ref}
      className="bg-white text-black rounded-xl px-3 py-5 text-center"
    >
      <div className="text-[13px] text-[#555] mb-2">{label}</div>
      <div className="text-[clamp(24px,6vw,34px)] font-black text-black">
        {decimal ? count.toFixed(1) : count}
        {suffix}
      </div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section id="stats" className="px-6 py-20 max-w-[760px] mx-auto">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* 섹션 타이틀 */}
        <h2 className="text-[clamp(22px,5vw,30px)] font-bold text-center mb-10 leading-relaxed">
          고객님들이
          <br />
          직접 들려주는 변화 이야기
        </h2>

        {/* YouTube 영상 placeholder */}
        <div className="w-full aspect-video rounded-xl overflow-hidden mb-7 bg-[#111]">
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-text-sub text-sm">
            <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
              <div
                className="ml-1"
                style={{
                  width: 0,
                  height: 0,
                  borderStyle: "solid",
                  borderWidth: "10px 0 10px 20px",
                  borderColor: "transparent transparent transparent white",
                }}
              />
            </div>
            <span>APEX STUDIO 고객 인터뷰 영상</span>
          </div>
        </div>

        {/* 실적 카드 3개 */}
        <div className="grid grid-cols-3 gap-3">
          {STATS.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              decimal={stat.decimal}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
