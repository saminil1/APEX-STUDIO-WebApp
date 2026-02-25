"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { motion, type Variants } from "framer-motion";
import { CONTACT_EMAIL, KAKAO_CHANNEL } from "@/lib/constants";

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
  visible: { transition: { staggerChildren: 0.3 } },
};

interface FormData {
  name: string;
  phone: string;
  business: string;
  message: string;
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSending(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // EmailJS + API를 병렬 실행
      const promises: Promise<unknown>[] = [];

      // EmailJS 전송
      if (serviceId && templateId && publicKey) {
        promises.push(
          emailjs.send(serviceId, templateId, {
            from_name: data.name,
            phone: data.phone,
            business: data.business,
            message: data.message,
          }, publicKey)
        );
      }

      // DB 저장 API 호출
      promises.push(
        fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      );

      const results = await Promise.allSettled(promises);
      const hasSuccess = results.some((r) => r.status === "fulfilled");

      if (hasSuccess) {
        setSubmitted(true);
        reset();
      } else {
        alert("전송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch {
      alert("전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="max-w-[600px] mx-auto px-6 py-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* 타이틀 */}
        <motion.h2
          variants={fadeUp}
          className="text-[clamp(22px,5vw,30px)] font-bold text-center mb-10 leading-relaxed"
        >
          내 사업의 성장을 위한
          <br />
          홈페이지 전략을 받아보세요
        </motion.h2>

        {/* 성공 메시지 */}
        {submitted ? (
          <motion.div
            variants={fadeUp}
            className="border border-primary/40 rounded-2xl p-8 text-center"
          >
            <p className="text-2xl mb-4">&#10003;</p>
            <p className="text-lg font-bold mb-2">
              신청이 완료되었습니다!
            </p>
            <p className="text-text-sub text-sm">
              빠른 시일 내 연락드리겠습니다.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-sm text-accent underline underline-offset-4 cursor-pointer bg-transparent border-none"
            >
              추가 문의하기
            </button>
          </motion.div>
        ) : (
          /* 폼 */
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit(onSubmit)}
            className="border border-primary/40 rounded-2xl p-8 flex flex-col gap-4"
          >
            {/* 이름 */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[13px] text-text-sub">이름 *</label>
              <input
                {...register("name", { required: "이름을 입력해주세요" })}
                placeholder="홍길동"
                className="bg-white/5 border border-white/15 rounded-lg text-white px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-primary-light placeholder:text-white/30"
              />
              {errors.name && (
                <span className="text-xs text-red-400">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* 연락처 */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[13px] text-text-sub">연락처 *</label>
              <input
                {...register("phone", { required: "연락처를 입력해주세요" })}
                type="tel"
                placeholder="010-0000-0000"
                className="bg-white/5 border border-white/15 rounded-lg text-white px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-primary-light placeholder:text-white/30"
              />
              {errors.phone && (
                <span className="text-xs text-red-400">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* 업종 */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[13px] text-text-sub">
                업종 / 사업 분야 *
              </label>
              <input
                {...register("business", {
                  required: "업종을 입력해주세요",
                })}
                placeholder="예: 뷰티 쇼핑몰, 병원, 음식점 등"
                className="bg-white/5 border border-white/15 rounded-lg text-white px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-primary-light placeholder:text-white/30"
              />
              {errors.business && (
                <span className="text-xs text-red-400">
                  {errors.business.message}
                </span>
              )}
            </div>

            {/* 문의 내용 */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[13px] text-text-sub">문의 내용</label>
              <textarea
                {...register("message")}
                placeholder="어떤 홈페이지가 필요하신가요? 편하게 작성해 주세요."
                className="bg-white/5 border border-white/15 rounded-lg text-white px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-primary-light resize-y min-h-[100px] placeholder:text-white/30"
              />
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={sending}
              className="bg-primary text-white border-none py-4 rounded-[10px] text-base font-bold cursor-pointer transition-colors hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "전송 중..." : "무료 성장 전략 받기"}
            </button>
          </motion.form>
        )}

        {/* 연락처 정보 */}
        <motion.div
          variants={fadeUp}
          className="mt-6 flex flex-col gap-2 text-sm text-text-sub text-center"
        >
          <span>카카오톡 채널: {KAKAO_CHANNEL}</span>
          <span>이메일: <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-white transition-colors">{CONTACT_EMAIL}</a></span>
        </motion.div>
      </motion.div>
    </section>
  );
}
