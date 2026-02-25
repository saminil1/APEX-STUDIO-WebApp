import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: 공개 - 챗봇 세션 생성
export async function POST() {
  try {
    const session = await prisma.chatSession.create({ data: {} });
    return NextResponse.json({ id: session.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "세션 생성 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
