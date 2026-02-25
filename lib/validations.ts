import { z } from "zod";

export const inquiryCreateSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요").max(50),
  phone: z.string().min(1, "연락처를 입력해주세요").max(20),
  business: z.string().min(1, "업종을 입력해주세요").max(100),
  message: z.string().max(2000).default(""),
});

export const inquiryUpdateSchema = z.object({
  status: z.enum(["NEW", "READ", "REPLIED", "ARCHIVED"]).optional(),
  memo: z.string().max(2000).optional(),
});

export const loginSchema = z.object({
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export const wizardInquirySchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요").max(50),
  phone: z.string().min(1, "연락처를 입력해주세요").max(20),
  email: z.string().max(100).default(""),
  business: z.string().max(100).default(""),
  homepageType: z.string().max(100).default(""),
  homepagePrice: z.string().max(50).default(""),
  additionalOption: z.string().max(100).default(""),
  additionalPrice: z.string().max(50).default(""),
  message: z.string().max(2000).default(""),
  referenceLink: z.string().max(1000).default(""),
  fileName: z.string().max(200).default(""),
});

export const chatMessageCreateSchema = z.object({
  sessionId: z.string().min(1),
  sender: z.enum(["user", "bot"]),
  content: z.string().min(1).max(5000),
});

export const chatSessionUpdateSchema = z.object({
  status: z.enum(["ACTIVE", "CLOSED", "ARCHIVED"]).optional(),
  memo: z.string().max(2000).optional(),
});

export type InquiryCreateInput = z.infer<typeof inquiryCreateSchema>;
export type WizardInquiryInput = z.infer<typeof wizardInquirySchema>;
export type InquiryUpdateInput = z.infer<typeof inquiryUpdateSchema>;
export type ChatMessageCreateInput = z.infer<typeof chatMessageCreateSchema>;
export type ChatSessionUpdateInput = z.infer<typeof chatSessionUpdateSchema>;
