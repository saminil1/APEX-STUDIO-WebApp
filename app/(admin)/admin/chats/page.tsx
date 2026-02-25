"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ChatTable from "@/components/admin/ChatTable";
import ChatFilters from "@/components/admin/ChatFilters";
import Pagination from "@/components/admin/Pagination";
import type { ChatSessionItem, ChatSessionStatus, ChatSessionsResponse } from "@/types/chat";

export default function ChatsPage() {
  const [data, setData] = useState<ChatSessionItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<ChatSessionStatus | "">("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "20");
      if (status) params.set("status", status);
      if (search) params.set("search", search);

      const res = await fetch(`/api/chat/sessions/admin?${params.toString()}`);
      if (res.ok) {
        const json: ChatSessionsResponse = await res.json();
        setData(json.data);
        setTotalPages(json.totalPages);
        setTotal(json.total);
      }
    } catch {
      // 네트워크 에러 무시
    } finally {
      setLoading(false);
    }
  }, [page, status, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = (newStatus: ChatSessionStatus | "") => {
    setStatus(newStatus);
    setPage(1);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  return (
    <>
      <AdminHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">대화 관리</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              총 {total}건
            </p>
          </div>
        </div>

        <div className="mb-4">
          <ChatFilters
            status={status}
            search={search}
            onStatusChange={handleStatusChange}
            onSearchChange={handleSearchChange}
          />
        </div>

        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
            불러오는 중...
          </div>
        ) : (
          <>
            <ChatTable data={data} />
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </>
  );
}
