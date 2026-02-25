"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import type { InquiryItem, InquiryStatus } from "@/types/inquiry";

const STATUS_OPTIONS: { value: InquiryStatus; label: string }[] = [
  { value: "NEW", label: "신규" },
  { value: "READ", label: "확인" },
  { value: "REPLIED", label: "답변완료" },
  { value: "ARCHIVED", label: "보관" },
];

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

interface InquiryDetailProps {
  inquiry: InquiryItem;
}

export default function InquiryDetail({ inquiry }: InquiryDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState<InquiryStatus>(inquiry.status);
  const [memo, setMemo] = useState(inquiry.memo);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/inquiries/${inquiry.id}`, {
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
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/inquiries/${inquiry.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/inquiries");
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
          onClick={() => router.push("/admin/inquiries")}
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

      {/* 문의 정보 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <StatusBadge status={inquiry.status} />
          <span className="text-xs text-gray-400">
            {formatDateTime(inquiry.createdAt)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 text-xs mb-1">이름</p>
            <p className="text-gray-900 font-medium">{inquiry.name}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">연락처</p>
            <p className="text-gray-900">{inquiry.phone}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-400 text-xs mb-1">업종</p>
            <p className="text-gray-900">{inquiry.business}</p>
          </div>
          {inquiry.message && (
            <div className="sm:col-span-2">
              <p className="text-gray-400 text-xs mb-1">문의 내용</p>
              <p className="text-gray-900 whitespace-pre-wrap">
                {inquiry.message}
              </p>
            </div>
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
