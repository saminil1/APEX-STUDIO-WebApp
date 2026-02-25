"use client";

import { useRef } from "react";
import { type UseFormSetValue, type UseFormWatch } from "react-hook-form";
import type { WizardFormData } from "../ContactWizard";

interface Step8FileUploadProps {
  watch: UseFormWatch<WizardFormData>;
  setValue: UseFormSetValue<WizardFormData>;
}

export default function Step8FileUpload({
  watch,
  setValue,
}: Step8FileUploadProps) {
  const fileName = watch("fileName");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("fileName", file.name);
    }
  };

  const handleRemove = () => {
    setValue("fileName", "");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <h2 className="text-[clamp(22px,5vw,30px)] font-black mb-2">
        기획안이 있으시면
        <br />
        첨부해주세요
      </h2>
      <p className="text-text-sub text-sm mb-8">
        없으시면 바로 제출하기를 눌러주세요. (선택)
      </p>

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
      >
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.hwp,.zip,.jpg,.png"
        />

        {fileName ? (
          <div className="flex items-center justify-center gap-3">
            <svg
              className="w-5 h-5 text-primary shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm text-white font-bold truncate max-w-[200px]">
              {fileName}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="text-text-sub hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer text-lg"
            >
              &times;
            </button>
          </div>
        ) : (
          <>
            <svg
              className="w-10 h-10 text-text-sub mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-text-sub mb-1">
              클릭하여 파일을 선택하세요
            </p>
            <p className="text-xs text-white/30">
              PDF, DOC, PPT, HWP, ZIP, JPG, PNG
            </p>
          </>
        )}
      </div>

      <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-xs text-text-sub leading-relaxed">
          기획안은 상담 시 이메일/카카오톡으로 보내주시면 됩니다.
          <br />
          여기서는 파일명만 기록되며, 실제 파일은 업로드되지 않습니다.
        </p>
      </div>
    </div>
  );
}
