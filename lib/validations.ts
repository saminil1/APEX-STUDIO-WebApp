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

export type InquiryCreateInput = z.infer<typeof inquiryCreateSchema>;
export type InquiryUpdateInput = z.infer<typeof inquiryUpdateSchema>;
