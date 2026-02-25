"use client";

import { type UseFormSetValue, type UseFormWatch } from "react-hook-form";
import { HOMEPAGE_TYPES } from "@/lib/constants";
import type { WizardFormData } from "../ContactWizard";

interface Step4HomepageTypeProps {
  watch: UseFormWatch<WizardFormData>;
  setValue: UseFormSetValue<WizardFormData>;
}

export default function Step4HomepageType({
  watch,
  setValue,
}: Step4HomepageTypeProps) {
  const selected = watch("homepageType");

  const handleSelect = (type: (typeof HOMEPAGE_TYPES)[number]) => {
    setValue("homepageType", type.label);
    setValue("homepagePrice", type.price);
  };

  return (
    <div>
      <h2 className="text-[clamp(22px,5vw,30px)] font-black mb-2">
        어떤 홈페이지를
        <br />
        만들고 싶으신가요?
      </h2>
      <p className="text-text-sub text-sm mb-8">
        유형을 선택해주세요.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {HOMEPAGE_TYPES.map((type) => (
          <button
            key={type.label}
            type="button"
            onClick={() => handleSelect(type)}
            className={`text-left rounded-xl p-5 border transition-all cursor-pointer ${
              selected === type.label
                ? "border-primary bg-primary/10"
                : "border-white/20 bg-white/5 hover:border-white/40"
            }`}
          >
            <p className="font-bold text-[15px] mb-1">{type.label}</p>
            <p className="text-text-sub text-sm">{type.price}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
