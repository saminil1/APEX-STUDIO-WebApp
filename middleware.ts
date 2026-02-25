import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin_session")?.value;
  if (!token) return false;

  const secret = getSecret();
  if (!secret) return false;

  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin 로그인 페이지는 통과
  if (pathname === "/admin") {
    const authenticated = await isAuthenticated(request);
    if (authenticated) {
      return NextResponse.redirect(new URL("/admin/inquiries", request.url));
    }
    return NextResponse.next();
  }

  // /admin/* 보호
  if (pathname.startsWith("/admin/")) {
    const authenticated = await isAuthenticated(request);
    if (!authenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // GET /api/inquiries, PATCH/DELETE /api/inquiries/[id] 보호
  if (pathname.startsWith("/api/inquiries")) {
    const method = request.method;

    // POST /api/inquiries는 공개 (폼 제출)
    if (pathname === "/api/inquiries" && method === "POST") {
      return NextResponse.next();
    }

    // 그 외는 관리자 인증 필요
    if (method === "GET" || method === "PATCH" || method === "DELETE") {
      const authenticated = await isAuthenticated(request);
      if (!authenticated) {
        return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });
      }
    }
  }

  // /api/chat/sessions/admin 관리자 인증 보호
  if (pathname.startsWith("/api/chat/sessions/admin")) {
    const authenticated = await isAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/inquiries/:path*", "/api/chat/sessions/admin/:path*"],
};
