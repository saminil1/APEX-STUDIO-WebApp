"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { REASONS, PRINCIPLES } from "@/lib/constants";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

function StoryWrapper({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={`min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center gap-7 mx-auto ${
        wide ? "max-w-[900px]" : "max-w-[700px]"
      }`}
    >
      {children}
    </motion.div>
  );
}

/* ── S05: 홈페이지를 만드는 이유 ── */
function ReasonsSection() {
  return (
    <StoryWrapper>
      <motion.h2
        variants={fadeUp}
        className="text-[clamp(20px,5vw,26px)] font-bold leading-relaxed"
      >
        홈페이지를 만들려는 이유
      </motion.h2>
      <div className="flex flex-col gap-4 text-[clamp(15px,3.5vw,18px)] text-text-sub">
        {REASONS.map((reason) => (
          <motion.span key={reason} variants={fadeUp} className="block">
            {reason}
          </motion.span>
        ))}
      </div>
      <motion.p
        variants={fadeUp}
        className="text-[clamp(20px,5vw,26px)] font-bold leading-relaxed"
      >
        이 많은 이유들은
        <br />
        하나의 <span className="text-accent">꼭지점</span>에서 시작됩니다
      </motion.p>
    </StoryWrapper>
  );
}

/* ── S06: 매출 공식 ── */
function FormulaSection() {
  return (
    <StoryWrapper>
      <motion.p variants={fadeUp} className="text-[15px] text-text-sub">
        내 회사의 성장
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="text-[clamp(36px,8vw,56px)] font-black text-accent leading-tight"
      >
        매출
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="text-[clamp(24px,5vw,32px)] font-bold"
      >
        매출 = 유입 x <span className="font-black">전환</span>
      </motion.p>
      <motion.p
        variants={fadeUp}
        className="text-[clamp(24px,5vw,32px)] font-bold"
      >
        노출 → 유입 → <span className="font-black">전환</span>
      </motion.p>
      <motion.p
        variants={fadeUp}
        className="text-[15px] text-text-sub leading-loose"
      >
        <span className="font-black">홈페이지의 역할</span>은
        <br />
        광고 퍼널 중 <span className="font-black">전환</span>에 속하죠
      </motion.p>
      <motion.p
        variants={fadeUp}
        className="text-[15px] text-text-sub leading-loose"
      >
        유입량을 늘린 만큼
        <br />
        홈페이지가 제 역할을 해준다면
        <br />
        <span className="font-black">지속적인 성장</span>을 만들어 줍니다.
      </motion.p>
      <motion.p
        variants={fadeUp}
        className="text-[clamp(20px,5vw,26px)] font-bold leading-relaxed"
      >
        즉, 홈페이지 제작은
        <br />
        가장 확실한 <span className="text-accent">성장 투자</span>입니다.
      </motion.p>
    </StoryWrapper>
  );
}

/* ── S07: 포트폴리오 배경 + 질문 ── */
function PortfolioBgSection() {
  const bgImages = Array.from(
    { length: 6 },
    (_, i) => `https://picsum.photos/300/200?random=${20 + i}`
  );

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative overflow-hidden py-20 px-6 text-center min-h-screen flex items-center justify-center"
    >
      {/* 배경 이미지 그리드 */}
      <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-20">
        {bgImages.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt=""
            width={300}
            height={200}
            className="w-full h-full object-cover"
            unoptimized
          />
        ))}
      </div>

      {/* 텍스트 */}
      <div className="relative z-10 max-w-[700px] mx-auto">
        <p className="text-[clamp(20px,5vw,26px)] font-bold leading-relaxed">
          성공적인 투자가 될 홈페이지는
          <br />
          어떻게 만들어져야할까요?
        </p>
      </div>
    </motion.div>
  );
}

/* ── S08: 성공하는 홈페이지의 3가지 힘 ── */
function AttitudeSection() {
  return (
    <StoryWrapper>
      <motion.p
        variants={fadeUp}
        className="text-[15px] text-text-sub leading-loose"
      >
        성공하는 홈페이지에는
        <br />
        <span className="font-black">3가지 힘</span>이 있습니다.
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="text-[clamp(36px,8vw,56px)] font-black leading-tight"
      >
        읽고 싶게 만든다.
      </motion.h2>
      <motion.h2
        variants={fadeUp}
        className="text-[clamp(36px,8vw,56px)] font-black leading-tight"
      >
        믿을 수 있게 만든다.
      </motion.h2>
      <motion.h2
        variants={fadeUp}
        className="text-[clamp(36px,8vw,56px)] font-black leading-tight"
      >
        행동하게 만든다.
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="text-[clamp(20px,5vw,26px)] font-bold leading-relaxed"
      >
        이 3가지가 갖춰질 때
        <br />
        <span className="font-black">전환이 잘되는 홈페이지</span>가 완성됩니다.
      </motion.p>
    </StoryWrapper>
  );
}

/* ── S09~S11: 3가지 원칙 ── */
function PrincipleSection({
  number,
  title,
  points,
}: {
  number: string;
  title: string;
  points: string[];
}) {
  return (
    <StoryWrapper>
      <motion.div variants={fadeUp}>
        <span className="inline-block border-2 border-white text-white text-sm font-bold px-5 py-1.5 rounded-full tracking-widest">
          {number}
        </span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="text-[clamp(36px,8vw,56px)] font-black leading-tight"
      >
        {title}
      </motion.h2>
      {points.map((point, i) => (
        <motion.p
          key={i}
          variants={fadeUp}
          className={
            i < points.length - 1
              ? "text-[15px] text-text-sub leading-loose"
              : "text-[clamp(20px,5vw,26px)] font-bold leading-relaxed"
          }
        >
          {point}
        </motion.p>
      ))}
    </StoryWrapper>
  );
}

/* ── S12: 마무리 ── */
function ClosingSection() {
  return (
    <StoryWrapper>
      <motion.p
        variants={fadeUp}
        className="text-[15px] text-text-sub leading-loose"
      >
        이 3가지 원칙은 대표님 회사의
        <br />
        <span className="font-black">비즈니스 모델을 이해</span>하고
        <br />
        <span className="font-black">고객을 명확하게 아는 것</span>에서
        시작되어야합니다.
      </motion.p>
      <motion.p
        variants={fadeUp}
        className="text-[15px] text-text-sub leading-loose"
      >
        그래서 기술을 넘어
        <br />
        <span className="font-black">비즈니스를 이해하는 파트너</span>가 필요합니다.
      </motion.p>
      <motion.p
        variants={fadeUp}
        className="text-[clamp(20px,5vw,26px)] font-bold leading-relaxed"
      >
        요리를 잘하는 것과 장사를 잘하는 게
        <br />
        다른 것처럼, 디자인 기술과
        <br />
        매출을 만들어내는 기획력이
        <br />
        <span className="font-black">함께할 때 성공</span>합니다.
      </motion.p>
      <motion.p
        variants={fadeUp}
        className="text-[15px] text-text-sub leading-loose"
      >
        40년간 삼성SDS를 시작으로 직접 사업을 운영하며
        <br />
        수천 명의 고객과 함께 성장해 온
        <br />
        <span className="font-black">경험이 대표님의 성공을 만듭니다.</span>
      </motion.p>
    </StoryWrapper>
  );
}

/* ── 전체 StorySection ── */
export default function StorySection() {
  return (
    <>
      <ReasonsSection />
      <FormulaSection />
      <PortfolioBgSection />
      <AttitudeSection />
      {PRINCIPLES.map((p) => (
        <PrincipleSection
          key={p.number}
          number={p.number}
          title={p.title}
          points={p.points}
        />
      ))}
      <ClosingSection />
    </>
  );
}
