"use client";

import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import type { WizardFormData } from "../ContactWizard";

interface Step3EmailProps {
  register: UseFormRegister<WizardFormData>;
  errors: FieldErrors<WizardFormData>;
}

export default function Step3Email({ register, errors }: Step3EmailProps) {
  return (
    <div>
      <h2 className="text-[clamp(22px,5vw,30px)] font-black mb-2">
        이메일 주소를
        <br />
        알려주세요
      </h2>
      <p className="text-text-sub text-sm mb-8">
        견적서 및 안내 자료를 보내드립니다. (선택)
      </p>

      <div className="flex flex-col gap-1.5">
        <input
          {...register("email")}
          type="email"
          placeholder="example@email.com"
          autoFocus
          className="bg-white/5 border border-white/15 rounded-xl text-white px-5 py-4 text-base outline-none transition-colors focus:border-primary placeholder:text-white/30"
        />
        {errors.email && (
          <span className="text-xs text-red-400">{errors.email.message}</span>
        )}
      </div>
    </div>
  );
}
