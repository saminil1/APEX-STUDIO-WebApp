import type { InquiryStatus } from "@prisma/client";

export type { InquiryStatus };

export interface InquiryItem {
  id: string;
  name: string;
  phone: string;
  business: string;
  message: string;
  email: string;
  homepageType: string;
  homepagePrice: string;
  additionalOption: string;
  additionalPrice: string;
  referenceLink: string;
  fileName: string;
  status: InquiryStatus;
  memo: string;
  createdAt: string;
  updatedAt: string;
}

export interface InquiriesResponse {
  data: InquiryItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
