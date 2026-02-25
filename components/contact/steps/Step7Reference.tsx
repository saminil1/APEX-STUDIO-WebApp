"use client";

import { type UseFormRegister } from "react-hook-form";
import type { WizardFormData } from "../ContactWizard";

interface Step7ReferenceProps {
  register: UseFormRegister<WizardFormData>;
}

export default function Step7Reference({ register }: Step7ReferenceProps) {
  return (
    <div>
      <h2 className="text-[clamp(22px,5vw,30px)] font-black mb-2">
        참고할 사이트가
        <br />
        있으신가요?
      </h2>
      <p className="text-text-sub text-sm mb-8">
        원하는 스타일의 사이트 링크를 공유해주세요. (선택)
      </p>

      <textarea
        {...register("referenceLink")}
        placeholder={"예:\nhttps://example1.com\nhttps://example2.com"}
        className="w-full bg-white/5 border border-white/15 rounded-xl text-white px-5 py-4 text-base outline-none transition-colors focus:border-primary resize-y min-h-[120px] placeholder:text-white/30"
      />
    </div>
  );
}
