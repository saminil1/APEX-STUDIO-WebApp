import type { ChatSessionStatus } from "@prisma/client";

export type { ChatSessionStatus };

export interface ChatSessionItem {
  id: string;
  status: ChatSessionStatus;
  memo: string;
  messageCount: number;
  lastMessage: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessageItem {
  id: string;
  sessionId: string;
  sender: string;
  content: string;
  createdAt: string;
}

export interface ChatSessionDetailItem extends ChatSessionItem {
  messages: ChatMessageItem[];
}

export interface ChatSessionsResponse {
  data: ChatSessionItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
