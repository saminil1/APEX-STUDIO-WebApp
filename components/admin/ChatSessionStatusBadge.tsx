"use client";

import type { ChatSessionStatus } from "@/types/chat";

const STATUS_CONFIG: Record<
  ChatSessionStatus,
  { label: string; bg: string; text: string }
> = {
  ACTIVE: { label: "진행중", bg: "bg-green-100", text: "text-green-700" },
  CLOSED: { label: "종료", bg: "bg-gray-100", text: "text-gray-600" },
  ARCHIVED: { label: "보관", bg: "bg-blue-100", text: "text-blue-700" },
};

export default function ChatSessionStatusBadge({ status }: { status: ChatSessionStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
