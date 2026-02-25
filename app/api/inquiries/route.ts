import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { wizardInquirySchema, inquiryCreateSchema } from "@/lib/validations";
import type { InquiryStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

// POST: 공개 - 문의 폼 제출
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 위자드 폼 → 기존 폼 순서로 검증 (하위 호환)
    const wizardResult = wizardInquirySchema.safeParse(body);
    const legacyResult = inquiryCreateSchema.safeParse(body);

    if (!wizardResult.success && !legacyResult.success) {
      return NextResponse.json(
        { error: "입력 데이터가 유효하지 않습니다", details: legacyResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = wizardResult.success ? wizardResult.data : legacyResult.data!;

    const inquiry = await prisma.inquiry.create({
      data,
    });

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "문의 저장 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

// GET: 관리자 - 목록 조회 (middleware에서 인증 처리)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const status = searchParams.get("status") as InquiryStatus | null;
    const search = searchParams.get("search") || "";

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
        { business: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.inquiry.count({ where }),
    ]);

    return NextResponse.json({
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return NextResponse.json(
      { error: "목록 조회 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
