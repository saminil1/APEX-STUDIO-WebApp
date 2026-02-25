"use client";

import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import type { WizardFormData } from "../ContactWizard";

interface Step1NameProps {
  register: UseFormRegister<WizardFormData>;
  errors: FieldErrors<WizardFormData>;
}

export default function Step1Name({ register, errors }: Step1NameProps) {
  return (
    <div>
      <h2 className="text-[clamp(22px,5vw,30px)] font-black mb-2">
        업체명(담당자 성함)을
        <br />
        알려주세요
      </h2>
      <p className="text-text-sub text-sm mb-8">
        상담 시 사용할 이름을 입력해주세요.
      </p>

      <div className="flex flex-col gap-1.5">
        <input
          {...register("name", { required: "이름을 입력해주세요" })}
          placeholder="예: 홍길동 / (주)에이펙스"
          autoFocus
          className="bg-white/5 border border-white/15 rounded-xl text-white px-5 py-4 text-base outline-none transition-colors focus:border-primary placeholder:text-white/30"
        />
        {errors.name && (
          <span className="text-xs text-red-400">{errors.name.message}</span>
        )}
      </div>
    </div>
  );
}
