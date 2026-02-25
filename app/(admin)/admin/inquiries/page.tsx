"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import InquiryTable from "@/components/admin/InquiryTable";
import InquiryFilters from "@/components/admin/InquiryFilters";
import Pagination from "@/components/admin/Pagination";
import type { InquiryItem, InquiryStatus, InquiriesResponse } from "@/types/inquiry";

export default function InquiriesPage() {
  const [data, setData] = useState<InquiryItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<InquiryStatus | "">("");
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

      const res = await fetch(`/api/inquiries?${params.toString()}`);
      if (res.ok) {
        const json: InquiriesResponse = await res.json();
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

  const handleStatusChange = (newStatus: InquiryStatus | "") => {
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
            <h2 className="text-xl font-bold text-gray-900">문의 관리</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              총 {total}건
            </p>
          </div>
        </div>

        <div className="mb-4">
          <InquiryFilters
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
            <InquiryTable data={data} />
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
