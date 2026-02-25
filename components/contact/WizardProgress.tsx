"use client";

import { WIZARD_STEPS } from "@/lib/constants";

interface WizardProgressProps {
  currentStep: number;
}

export default function WizardProgress({ currentStep }: WizardProgressProps) {
  const progress = ((currentStep + 1) / WIZARD_STEPS.length) * 100;

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-text-sub">
          Step {currentStep + 1} / {WIZARD_STEPS.length}
        </span>
        <span className="text-sm font-bold text-white">
          {WIZARD_STEPS[currentStep]}
        </span>
      </div>
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, var(--color-primary-dark), var(--color-primary), var(--color-accent))",
          }}
        />
      </div>
    </div>
  );
}
