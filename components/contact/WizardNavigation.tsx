"use client";

import { WIZARD_STEPS } from "@/lib/constants";

interface WizardNavigationProps {
  currentStep: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function WizardNavigation({
  currentStep,
  onPrev,
  onNext,
  onSubmit,
  isSubmitting,
}: WizardNavigationProps) {
  const isLast = currentStep === WIZARD_STEPS.length - 1;

  return (
    <div className="flex justify-between items-center mt-10">
      {currentStep > 0 ? (
        <button
          type="button"
          onClick={onPrev}
          className="text-text-sub text-sm font-bold hover:text-white transition-colors bg-transparent border-none cursor-pointer"
        >
          &larr; 이전
        </button>
      ) : (
        <div />
      )}

      {isLast ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-primary text-white font-bold px-10 py-3.5 rounded-xl hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
        >
          {isSubmitting ? "제출 중..." : "제출하기"}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="bg-primary text-white font-bold px-10 py-3.5 rounded-xl hover:bg-primary-light transition-colors cursor-pointer text-sm"
        >
          다음 &rarr;
        </button>
      )}
    </div>
  );
}
