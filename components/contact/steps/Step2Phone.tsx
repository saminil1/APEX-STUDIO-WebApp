"use client";

import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import type { WizardFormData } from "../ContactWizard";

interface Step2PhoneProps {
  register: UseFormRegister<WizardFormData>;
  errors: FieldErrors<WizardFormData>;
}

export default function Step2Phone({ register, errors }: Step2PhoneProps) {
  return (
    <div>
      <h2 className="text-[clamp(22px,5vw,30px)] font-black mb-2">
        연락 가능한
        <br />
        전화번호를 알려주세요
      </h2>
      <p className="text-text-sub text-sm mb-8">
        상담 진행을 위해 필요합니다.
      </p>

      <div className="flex flex-col gap-1.5">
        <input
          {...register("phone", { required: "연락처를 입력해주세요" })}
          type="tel"
          placeholder="010-0000-0000"
          autoFocus
          className="bg-white/5 border border-white/15 rounded-xl text-white px-5 py-4 text-base outline-none transition-colors focus:border-primary placeholder:text-white/30"
        />
        {errors.phone && (
          <span className="text-xs text-red-400">{errors.phone.message}</span>
        )}
      </div>
    </div>
  );
}
