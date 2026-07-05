import { NextResponse, type NextRequest } from "next/server";
import { createCalendarEvent } from "@/lib/google-calendar";
import {
  buildSummary,
  buildDescription,
  computeStartEnd,
  type TerminInput,
} from "@/lib/termin";
import { INTERN_COOKIE, isValidPassword } from "@/lib/auth";

export const runtime = "nodejs";

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: NextRequest) {
  // Gate: must carry a valid intern cookie.
  if (!isValidPassword(request.cookies.get(INTERN_COOKIE)?.value)) {
    return bad("Niste prijavljeni.", 401);
  }

  let body: Partial<TerminInput>;
  try {
    body = await request.json();
  } catch {
    return bad("Neispravan zahtjev.");
  }

  const name = body.name?.trim() ?? "";
  const telefon = body.telefon?.trim();
  const service = body.service?.trim();
  const datum = body.datum?.trim();
  const vrijeme = body.vrijeme?.trim();
  const trajanje = Number(body.trajanje);

  if (!telefon) return bad("Telefon je obavezan.");
  if (!service) return bad("Odaberite uslugu.");
  if (!datum) return bad("Odaberite datum.");
  if (!vrijeme) return bad("Odaberite vrijeme.");
  if (!Number.isFinite(trajanje) || trajanje <= 0)
    return bad("Neispravno trajanje.");

  const { start, end } = computeStartEnd(datum, vrijeme, trajanje);

  try {
    const { htmlLink } = await createCalendarEvent({
      summary: buildSummary({
        service,
        name,
        vozilo: body.vozilo ?? "",
        ostaje: Boolean(body.ostaje),
      }),
      description: buildDescription({
        telefon,
        ostaje: Boolean(body.ostaje),
        stavke: Array.isArray(body.stavke) ? body.stavke : undefined,
        napomena: body.napomena,
        mitarbeiter: body.mitarbeiter,
      }),
      start,
      end,
    });
    return NextResponse.json({ ok: true, htmlLink });
  } catch (err) {
    console.error("Calendar insert failed:", err);
    return bad(
      "Termin nije spremljen u kalendar. Provjerite Google konfiguraciju.",
      502,
    );
  }
}
