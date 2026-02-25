"use client";

import Link from "next/link";
import StatusBadge from "./StatusBadge";
import type { InquiryItem } from "@/types/inquiry";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const mins = String(d.getMinutes()).padStart(2, "0");
  return `${month}.${day} ${hours}:${mins}`;
}

interface InquiryTableProps {
  data: InquiryItem[];
}

export default function InquiryTable({ data }: InquiryTableProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
        문의 내역이 없습니다
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
              <th className="text-left px-4 py-3 font-medium">이름</th>
              <th className="text-left px-4 py-3 font-medium">연락처</th>
              <th className="text-left px-4 py-3 font-medium">업종</th>
              <th className="text-left px-4 py-3 font-medium">문의내용</th>
              <th className="text-left px-4 py-3 font-medium">날짜</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  <Link
                    href={`/admin/inquiries/${item.id}`}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-600">{item.phone}</td>
                <td className="px-4 py-3 text-gray-600">{item.business}</td>
                <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">
                  {item.message || "-"}
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
            href={`/admin/inquiries/${item.id}`}
            className="bg-white rounded-xl border border-gray-200 p-4 block hover:border-purple-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <StatusBadge status={item.status} />
              <span className="text-xs text-gray-400">
                {formatDate(item.createdAt)}
              </span>
            </div>
            <p className="font-medium text-gray-900 mb-1">{item.name}</p>
            <p className="text-sm text-gray-500">{item.phone}</p>
            <p className="text-sm text-gray-500">{item.business}</p>
            {item.message && (
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {item.message}
              </p>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}
