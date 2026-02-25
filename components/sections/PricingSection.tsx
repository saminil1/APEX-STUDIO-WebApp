"use client";

import { motion, type Variants } from "framer-motion";
import { PRICING_PLANS, ADDITIONAL_SERVICES } from "@/lib/constants";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6">
      {/* ── 홈페이지 제작 요금 ── */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-[1200px] mx-auto"
      >
        {/* Section Title */}
        <motion.p
          variants={fadeUp}
          className="text-[clamp(36px,8vw,56px)] font-black tracking-[3px] text-center mb-4"
        >
          PLAN
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-subtitle text-center mb-16"
        >
          홈페이지 제작 요금
        </motion.h2>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING_PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariant}
              className="relative rounded-2xl overflow-hidden border border-primary/30 group hover:border-primary/60 transition-colors"
              style={{
                background:
                  "linear-gradient(160deg, rgba(139,0,255,0.15) 0%, rgba(0,0,0,0.9) 50%, rgba(139,0,255,0.08) 100%)",
              }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  BEST
                </div>
              )}

              <div className="p-6 flex flex-col h-full">
                {/* Plan Name */}
                <h3 className="text-xl font-black mb-2">{plan.name}</h3>
                <p className="text-text-sub text-sm leading-relaxed mb-6">
                  {plan.desc}
                </p>

                {/* Specs */}
                <div className="space-y-3 mb-8 flex-1">
                  {plan.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="font-bold">{spec.label}</span>
                      <span className="text-text-sub">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <p className="text-[clamp(28px,5vw,36px)] font-black">
                  {plan.price}
                  <span className="text-base font-bold text-text-sub">
                    {plan.priceNote}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          variants={fadeUp}
          className="mt-12 rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-6"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))",
          }}
        >
          <div>
            <p className="text-white font-bold text-lg">
              내 사업에 맞춘
            </p>
            <p className="text-white/80 text-sm">
              홈페이지 전략, 솔루션 받기
            </p>
          </div>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-colors text-sm shrink-0"
          >
            신청하기
          </button>
        </motion.div>
      </motion.div>

      {/* ── 부가 서비스 ── */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-[1200px] mx-auto mt-28"
      >
        <motion.p
          variants={fadeUp}
          className="text-[clamp(36px,8vw,56px)] font-black tracking-[3px] text-center mb-4"
        >
          SERVICE
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-subtitle text-center mb-16"
        >
          부가 서비스
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADDITIONAL_SERVICES.map((service) => (
            <motion.div
              key={service.name}
              variants={cardVariant}
              className="rounded-2xl border border-white/10 p-6 hover:border-primary/40 transition-colors"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div className="text-2xl mb-3">{service.icon}</div>
              <h3 className="font-bold text-base mb-1">{service.name}</h3>
              <p className="text-text-sub text-sm mb-4">{service.desc}</p>
              <p className="text-primary font-black text-lg">{service.price}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── 제작 과정 ── */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-[1200px] mx-auto mt-28"
      >
        <motion.p
          variants={fadeUp}
          className="text-[clamp(36px,8vw,56px)] font-black tracking-[3px] text-center mb-4"
        >
          PROCESS
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-subtitle text-center mb-16"
        >
          제작 과정
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { step: "01", title: "상담", desc: "요구사항 파악\n목표 설정" },
            { step: "02", title: "기획", desc: "콘텐츠 구성\n와이어프레임" },
            { step: "03", title: "디자인", desc: "맞춤 UI 디자인\n고객 피드백" },
            { step: "04", title: "개발", desc: "반응형 퍼블리싱\n기능 구현" },
            { step: "05", title: "런칭", desc: "테스트 & 배포\n유지보수 시작" },
          ].map((item) => (
            <motion.div
              key={item.step}
              variants={cardVariant}
              className="rounded-2xl border border-white/10 p-6 text-center hover:border-primary/40 transition-colors"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-primary font-black text-2xl mb-2">
                {item.step}
              </p>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-text-sub text-sm whitespace-pre-line">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
