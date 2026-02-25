"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const PROCESS_STEPS = [
  {
    step: "1단계",
    title: "상담 진행",
    points: [
      "상담은 통화, 줌(Zoom), 카카오톡 채팅으로 모두 가능합니다.",
      "정리된 자료가 없어도 상담이 가능합니다.",
      "상담 후 예상 견적과 제작 일정을 안내드립니다.",
      "단, 웹 서비스 제작의 경우 제작 범위에 따라 비용이 조정됩니다.",
    ],
    img: "https://picsum.photos/600/700?random=601",
  },
  {
    step: "2단계",
    title: "기획 & 콘텐츠",
    points: [
      "사업 분석을 바탕으로 사이트맵과 콘텐츠 구성안을 기획합니다.",
      "경쟁사 분석 및 타겟 고객 조사를 진행합니다.",
      "페이지별 와이어프레임을 작성하여 구조를 확정합니다.",
      "카피라이팅, 이미지 등 필요한 콘텐츠를 준비합니다.",
    ],
    img: "https://picsum.photos/600/700?random=602",
  },
  {
    step: "3단계",
    title: "디자인",
    points: [
      "브랜드 아이덴티티에 맞는 맞춤 UI 디자인을 진행합니다.",
      "메인 페이지 시안을 먼저 제출하고 피드백을 반영합니다.",
      "수정은 무제한으로 진행되며, 만족할 때까지 조율합니다.",
      "모바일·태블릿·PC 반응형 디자인을 함께 설계합니다.",
    ],
    img: "https://picsum.photos/600/700?random=603",
  },
  {
    step: "4단계",
    title: "개발 & 퍼블리싱",
    points: [
      "확정된 디자인을 기반으로 반응형 웹 퍼블리싱을 진행합니다.",
      "문의 폼, 예약 시스템, 결제 등 필요한 기능을 구현합니다.",
      "SEO 최적화와 페이지 속도 최적화를 기본으로 적용합니다.",
      "개발 중 실시간 미리보기 링크를 공유하여 진행 상황을 확인합니다.",
    ],
    img: "https://picsum.photos/600/700?random=604",
  },
  {
    step: "5단계",
    title: "검수 & 오픈",
    points: [
      "모든 페이지를 꼼꼼하게 테스트하고 최종 검수를 진행합니다.",
      "도메인 연결 및 호스팅 세팅을 도와드립니다.",
      "Google Analytics, Search Console 등 분석 도구를 세팅합니다.",
      "오픈 이후에도 유지보수 서비스로 지속적으로 관리해 드립니다.",
    ],
    img: "https://picsum.photos/600/700?random=605",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 px-6">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="max-w-[1100px] mx-auto"
      >
        {/* Section Title */}
        <motion.p
          variants={fadeUp}
          className="text-[clamp(36px,8vw,56px)] font-black tracking-[3px] text-center mb-4"
        >
          PROCESS
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-subtitle text-center mb-20"
        >
          제작 과정
        </motion.h2>

        {/* Steps */}
        <div className="space-y-20">
          {PROCESS_STEPS.map((item, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-8 lg:gap-14 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-[42%] shrink-0">
                  <div className="relative aspect-[6/7] rounded-2xl overflow-hidden bg-[#111]">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:flex-1">
                  <span className="inline-block bg-primary text-white text-sm font-bold px-5 py-2 rounded-full mb-5">
                    {item.step}
                  </span>
                  <h3 className="text-[clamp(24px,5vw,32px)] font-black mb-6">
                    {item.title}
                  </h3>
                  <div className="space-y-4">
                    {item.points.map((point, i) => (
                      <p
                        key={i}
                        className="text-text-sub text-[15px] leading-relaxed"
                      >
                        {point}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="mt-20 rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-6"
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
          <Link
            href="/contact"
            className="bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-colors text-sm shrink-0 no-underline"
          >
            신청하기
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
