"use client";

import { type UseFormSetValue, type UseFormWatch } from "react-hook-form";
import { WIZARD_ADDITIONAL_OPTIONS } from "@/lib/constants";
import type { WizardFormData } from "../ContactWizard";

interface Step5AdditionalOptionProps {
  watch: UseFormWatch<WizardFormData>;
  setValue: UseFormSetValue<WizardFormData>;
}

export default function Step5AdditionalOption({
  watch,
  setValue,
}: Step5AdditionalOptionProps) {
  const selected = watch("additionalOption");

  const handleSelect = (option: (typeof WIZARD_ADDITIONAL_OPTIONS)[number]) => {
    setValue("additionalOption", option.label);
    setValue("additionalPrice", option.price);
  };

  return (
    <div>
      <h2 className="text-[clamp(22px,5vw,30px)] font-black mb-2">
        추가로 필요한
        <br />
        제작 옵션이 있나요?
      </h2>
      <p className="text-text-sub text-sm mb-8">
        필요 없으시면 &quot;선택 안함&quot;을 눌러주세요.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {WIZARD_ADDITIONAL_OPTIONS.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => handleSelect(option)}
            className={`text-left rounded-xl p-5 border transition-all cursor-pointer ${
              selected === option.label
                ? "border-primary bg-primary/10"
                : "border-white/20 bg-white/5 hover:border-white/40"
            }`}
          >
            <p className="font-bold text-[15px] mb-1">{option.label}</p>
            {option.price && (
              <p className="text-text-sub text-sm">{option.price}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
