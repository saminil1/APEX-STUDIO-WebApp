import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import ChatDetail from "@/components/admin/ChatDetail";
import type { ChatSessionDetailItem } from "@/types/chat";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatDetailPage({ params }: PageProps) {
  const { id } = await params;

  const session = await prisma.chatSession.findUnique({
    where: { id },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!session) {
    notFound();
  }

  const serialized: ChatSessionDetailItem = {
    id: session.id,
    status: session.status,
    memo: session.memo,
    messageCount: session.messageCount,
    lastMessage: session.lastMessage,
    createdAt: session.createdAt.toISOString(),
    updatedAt: session.updatedAt.toISOString(),
    messages: session.messages.map((m) => ({
      id: m.id,
      sessionId: m.sessionId,
      sender: m.sender,
      content: m.content,
      createdAt: m.createdAt.toISOString(),
    })),
  };

  return (
    <>
      <AdminHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <ChatDetail session={serialized} />
      </div>
    </>
  );
}
