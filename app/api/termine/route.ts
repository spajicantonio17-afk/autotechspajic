import { NextResponse, type NextRequest } from "next/server";
import { createCalendarEvent } from "@/lib/google-calendar";
import {
  SERVICES,
  buildSummary,
  buildDescription,
  computeStartEnd,
  type TerminInput,
} from "@/lib/termin";
import { INTERN_COOKIE, isValidPassword } from "@/lib/auth";
import { TIMEZONE } from "@/lib/business";

export const runtime = "nodejs";

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

/** YYYY-MM-DD i stvarno postojeći kalendarski datum (npr. ne 2026-02-30). */
function isValidDate(datum: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) return false;
  const [y, m, d] = datum.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m - 1 &&
    date.getUTCDate() === d
  );
}

/** Današnji datum (YYYY-MM-DD) u vremenskoj zoni radionice. */
function todayInWorkshopTz(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
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
  if (!service || !SERVICES.includes(service as (typeof SERVICES)[number]))
    return bad("Odaberite uslugu.");
  if (!datum || !isValidDate(datum)) return bad("Neispravan datum.");
  if (!vrijeme || !/^([01]\d|2[0-3]):[0-5]\d$/.test(vrijeme))
    return bad("Neispravno vrijeme.");
  if (datum < todayInWorkshopTz()) return bad("Datum je u prošlosti.");
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
