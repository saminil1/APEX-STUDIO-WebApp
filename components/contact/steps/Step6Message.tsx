"use client";

import { type UseFormRegister } from "react-hook-form";
import type { WizardFormData } from "../ContactWizard";

interface Step6MessageProps {
  register: UseFormRegister<WizardFormData>;
}

export default function Step6Message({ register }: Step6MessageProps) {
  return (
    <div>
      <h2 className="text-[clamp(22px,5vw,30px)] font-black mb-2">
        문의 내용을
        <br />
        자유롭게 적어주세요
      </h2>
      <p className="text-text-sub text-sm mb-8">
        만들고 싶은 홈페이지에 대해 편하게 작성해주세요. (선택)
      </p>

      <textarea
        {...register("message")}
        placeholder="예: 기업 소개 홈페이지를 만들고 싶습니다. 현재 사이트가 없어서 처음부터 새로 제작하려 합니다..."
        className="w-full bg-white/5 border border-white/15 rounded-xl text-white px-5 py-4 text-base outline-none transition-colors focus:border-primary resize-y min-h-[160px] placeholder:text-white/30"
      />
    </div>
  );
}
