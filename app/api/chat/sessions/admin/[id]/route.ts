import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chatSessionUpdateSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

// GET: 관리자 - 세션 상세 (메시지 포함)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await prisma.chatSession.findUnique({
      where: { id },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: "세션을 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...session,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
      messages: session.messages.map((m) => ({
        ...m,
        createdAt: m.createdAt.toISOString(),
      })),
    });
  } catch {
    return NextResponse.json(
      { error: "상세 조회 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

// PATCH: 관리자 - 상태/메모 수정
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = chatSessionUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "입력 데이터가 유효하지 않습니다" },
        { status: 400 }
      );
    }

    const session = await prisma.chatSession.update({
      where: { id },
      data: result.data,
    });

    return NextResponse.json({
      ...session,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return NextResponse.json(
        { error: "세션을 찾을 수 없습니다" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "수정 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

// DELETE: 관리자 - 삭제
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.chatSession.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Record to delete does not exist")
    ) {
      return NextResponse.json(
        { error: "세션을 찾을 수 없습니다" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "삭제 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
