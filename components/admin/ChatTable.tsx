"use client";

import Link from "next/link";
import ChatSessionStatusBadge from "./ChatSessionStatusBadge";
import type { ChatSessionItem } from "@/types/chat";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const mins = String(d.getMinutes()).padStart(2, "0");
  return `${month}.${day} ${hours}:${mins}`;
}

interface ChatTableProps {
  data: ChatSessionItem[];
}

export default function ChatTable({ data }: ChatTableProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
        대화 내역이 없습니다
      </div>
    );
  }

  return (
    <>
      {/* 데스크톱 테이블 */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs">
              <th className="text-left px-4 py-3 font-medium">상태</th>
              <th className="text-left px-4 py-3 font-medium">세션 ID</th>
              <th className="text-left px-4 py-3 font-medium">메시지 수</th>
              <th className="text-left px-4 py-3 font-medium">마지막 메시지</th>
              <th className="text-left px-4 py-3 font-medium">시작 시간</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <ChatSessionStatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  <Link
                    href={`/admin/chats/${item.id}`}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {item.id.slice(0, 8)}...
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-600">{item.messageCount}건</td>
                <td className="px-4 py-3 text-gray-500 max-w-[250px] truncate">
                  {item.lastMessage || "-"}
                </td>
                <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                  {formatDate(item.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 모바일 카드 */}
      <div className="md:hidden flex flex-col gap-3">
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/admin/chats/${item.id}`}
            className="bg-white rounded-xl border border-gray-200 p-4 block hover:border-purple-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <ChatSessionStatusBadge status={item.status} />
              <span className="text-xs text-gray-400">
                {formatDate(item.createdAt)}
              </span>
            </div>
            <p className="font-medium text-gray-900 mb-1 text-sm">
              세션 {item.id.slice(0, 8)}...
            </p>
            <p className="text-sm text-gray-500">메시지 {item.messageCount}건</p>
            {item.lastMessage && (
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {item.lastMessage}
              </p>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}
