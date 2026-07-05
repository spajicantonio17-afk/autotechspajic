import { NextResponse, type NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { SERVICES } from "@/lib/termin";
import type { ProdajaInput } from "@/lib/prodaja";
import { INTERN_COOKIE, isValidPassword } from "@/lib/auth";

export const runtime = "nodejs";

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: NextRequest) {
  if (!isValidPassword(request.cookies.get(INTERN_COOKIE)?.value)) {
    return bad("Niste prijavljeni.", 401);
  }

  let body: Partial<ProdajaInput>;
  try {
    body = await request.json();
  } catch {
    return bad("Neispravan zahtjev.");
  }

  const usluga = body.usluga?.trim();
  if (!usluga || !SERVICES.includes(usluga as (typeof SERVICES)[number])) {
    return bad("Odaberite uslugu.");
  }

  const { error } = await getSupabase()
    .from("prodaje")
    .insert({
      usluga,
      stavka: body.stavka?.trim() || null,
      vozilo: body.vozilo?.trim() || null,
      napomena: body.napomena?.trim() || null,
    });

  if (error) {
    console.error("Supabase insert failed:", error);
    return bad("Unos nije spremljen.", 502);
  }

  return NextResponse.json({ ok: true });
}

export async function GET(request: NextRequest) {
  if (!isValidPassword(request.cookies.get(INTERN_COOKIE)?.value)) {
    return bad("Niste prijavljeni.", 401);
  }

  const { data, error } = await getSupabase()
    .from("prodaje")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error("Supabase select failed:", error);
    return bad("Podaci nisu učitani.", 502);
  }

  return NextResponse.json({ ok: true, items: data });
}
