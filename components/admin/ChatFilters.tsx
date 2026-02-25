"use client";

import { useState } from "react";
import type { ChatSessionStatus } from "@/types/chat";

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "전체" },
  { value: "ACTIVE", label: "진행중" },
  { value: "CLOSED", label: "종료" },
  { value: "ARCHIVED", label: "보관" },
];

interface ChatFiltersProps {
  status: ChatSessionStatus | "";
  search: string;
  onStatusChange: (status: ChatSessionStatus | "") => void;
  onSearchChange: (search: string) => void;
}

export default function ChatFilters({
  status,
  search,
  onStatusChange,
  onSearchChange,
}: ChatFiltersProps) {
  const [searchInput, setSearchInput] = useState(search);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchInput);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex gap-1 flex-wrap">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onStatusChange(opt.value as ChatSessionStatus | "")}
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

      <form onSubmit={handleSearchSubmit} className="flex gap-2 sm:ml-auto">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="마지막 메시지, 메모 검색"
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-1.5 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors whitespace-nowrap"
        >
          검색
        </button>
      </form>
    </div>
  );
}
