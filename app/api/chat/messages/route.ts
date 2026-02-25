import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chatMessageCreateSchema } from "@/lib/validations";

// POST: 공개 - 챗봇 메시지 저장
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = chatMessageCreateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "입력 데이터가 유효하지 않습니다" },
        { status: 400 }
      );
    }

    const { sessionId, sender, content } = result.data;

    const message = await prisma.$transaction(async (tx) => {
      const msg = await tx.chatMessage.create({
        data: { sessionId, sender, content },
      });

      await tx.chatSession.update({
        where: { id: sessionId },
        data: {
          messageCount: { increment: 1 },
          lastMessage: content.slice(0, 100),
        },
      });

      return msg;
    });

    return NextResponse.json({ id: message.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "메시지 저장 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
