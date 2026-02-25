"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChatSessionStatusBadge from "./ChatSessionStatusBadge";
import type { ChatSessionDetailItem, ChatSessionStatus, ChatMessageItem } from "@/types/chat";

const STATUS_OPTIONS: { value: ChatSessionStatus; label: string }[] = [
  { value: "ACTIVE", label: "진행중" },
  { value: "CLOSED", label: "종료" },
  { value: "ARCHIVED", label: "보관" },
];

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function MessageBubble({ message }: { message: ChatMessageItem }) {
  const isBot = message.sender === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
          isBot
            ? "bg-gray-100 text-gray-900 rounded-bl-md"
            : "bg-purple-600 text-white rounded-br-md"
        }`}
      >
        <p>{message.content}</p>
        <p className={`text-[10px] mt-1 ${isBot ? "text-gray-400" : "text-purple-200"}`}>
          {formatTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}

interface ChatDetailProps {
  session: ChatSessionDetailItem;
}

export default function ChatDetail({ session }: ChatDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState<ChatSessionStatus>(session.status);
  const [memo, setMemo] = useState(session.memo);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/chat/sessions/admin/${session.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, memo }),
      });
      if (res.ok) {
        setMessage("저장되었습니다");
        router.refresh();
      } else {
        setMessage("저장에 실패했습니다");
      }
    } catch {
      setMessage("서버 오류가 발생했습니다");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까? 모든 대화 내용이 삭제됩니다.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/chat/sessions/admin/${session.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/chats");
      } else {
        setMessage("삭제에 실패했습니다");
      }
    } catch {
      setMessage("서버 오류가 발생했습니다");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/admin/chats")}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; 목록으로
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
        >
          {deleting ? "삭제 중..." : "삭제"}
        </button>
      </div>

      {/* 세션 정보 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <ChatSessionStatusBadge status={session.status} />
          <span className="text-xs text-gray-400">
            {formatDateTime(session.createdAt)}
          </span>
          <span className="text-xs text-gray-400">
            메시지 {session.messageCount}건
          </span>
        </div>

        {/* 채팅 내역 */}
        <div className="bg-gray-50 rounded-lg p-4 max-h-[500px] overflow-y-auto">
          {session.messages.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">메시지가 없습니다</p>
          ) : (
            session.messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))
          )}
        </div>
      </div>

      {/* 관리자 수정 영역 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">관리</h3>

        {/* 상태 변경 */}
        <div className="mb-4">
          <label className="block text-xs text-gray-500 mb-1.5">
            상태 변경
          </label>
          <div className="flex gap-2 flex-wrap">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                  status === opt.value
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 메모 */}
        <div className="mb-4">
          <label className="block text-xs text-gray-500 mb-1.5">
            관리자 메모
          </label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm resize-y min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* 저장 */}
        {message && (
          <p
            className={`text-sm mb-3 ${message.includes("실패") || message.includes("오류") ? "text-red-600" : "text-green-600"}`}
          >
            {message}
          </p>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
}
