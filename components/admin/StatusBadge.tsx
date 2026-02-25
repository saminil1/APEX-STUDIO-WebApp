"use client";

import type { InquiryStatus } from "@/types/inquiry";

const STATUS_CONFIG: Record<
  InquiryStatus,
  { label: string; bg: string; text: string }
> = {
  NEW: { label: "신규", bg: "bg-purple-100", text: "text-purple-700" },
  READ: { label: "확인", bg: "bg-blue-100", text: "text-blue-700" },
  REPLIED: { label: "답변완료", bg: "bg-green-100", text: "text-green-700" },
  ARCHIVED: { label: "보관", bg: "bg-gray-100", text: "text-gray-600" },
};

export default function StatusBadge({ status }: { status: InquiryStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
