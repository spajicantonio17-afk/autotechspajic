import { NextResponse, type NextRequest } from "next/server";
import { INTERN_COOKIE, isValidPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let password: string | undefined;
  try {
    password = (await request.json())?.password;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!isValidPassword(password)) {
    return NextResponse.json(
      { ok: false, error: "Pogrešna lozinka." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(INTERN_COOKIE, password!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
