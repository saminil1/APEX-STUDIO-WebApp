import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import InquiryDetail from "@/components/admin/InquiryDetail";
import type { InquiryItem } from "@/types/inquiry";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InquiryDetailPage({ params }: PageProps) {
  const { id } = await params;

  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
  });

  if (!inquiry) {
    notFound();
  }

  const serialized: InquiryItem = {
    ...inquiry,
    createdAt: inquiry.createdAt.toISOString(),
    updatedAt: inquiry.updatedAt.toISOString(),
  };

  return (
    <>
      <AdminHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <InquiryDetail inquiry={serialized} />
      </div>
    </>
  );
}
