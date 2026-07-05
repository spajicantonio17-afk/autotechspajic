// Shared appointment (termin) domain helpers — safe for client & server.
// No secrets here.

// Single source of truth for the service list shown in the quick-entry dropdown.
// Mirrors the service titles in components/Services.tsx.
export const SERVICES = [
  "Dijagnostika",
  "Kodiranje i programiranje",
  "Auto elektrika",
  "Auto ključevi",
  "Chiptuning",
  "Servis",
] as const;

export type ServiceName = (typeof SERVICES)[number];

// Sub-options per service (mirrors the `details` lists in components/Services.tsx).
// Shown as multi-select chips so a service can be specified in one or two taps.
export const SERVICE_DETAILS: Record<string, string[]> = {
  Dijagnostika: [
    "Očitavanje grešaka",
    "Pronalazak uzroka kvara",
    "Brisanje grešaka",
    "Analiza svih sustava",
    "Provjera uživo (live data)",
    "Provjera prije kupnje",
  ],
  "Kodiranje i programiranje": [
    "Aktivacija funkcija",
    "Prilagodba brzinomjera",
    "Prilagodba kilometraže",
    "Nova ECU jedinica",
    "Programiranje upravljačkih jedinica",
    "Retrofit kodiranje",
  ],
  "Auto elektrika": [
    "Popravak instalacija",
    "Elektronika mjenjača",
    "ELV / EZS (Mercedes)",
    "Ugradnja opreme",
    "Električna dijagnostika",
  ],
  "Auto ključevi": [
    "Izrada novih ključeva",
    "Programiranje ključeva",
    "Rezervni ključevi",
    "Izgubljeni ključevi",
  ],
  Chiptuning: [
    "Stage optimizacija",
    "AdBlue rješenje",
    "DPF / EGR",
    "NOx off",
    "KAT / OPF off",
    "Lambda off",
    "Pop and bangs",
    "Revlimiter / Hardcut",
  ],
  Servis: [
    "Zamjena ulja i filtera",
    "Servis kočnica",
    "Zamjena svjećica",
    "Tekućine",
    "Zamjena akumulatora",
    "Sezonska provjera",
  ],
};

// Duration quick-pick options (minutes).
export const DURATIONS = [15, 30, 60, 90] as const;

export type TerminInput = {
  name: string;
  telefon: string;
  vozilo: string;
  service: string;
  datum: string; // YYYY-MM-DD
  vrijeme: string; // HH:mm
  trajanje: number; // minutes
  ostaje?: boolean; // car stays at the workshop
  stavke?: string[]; // selected service sub-options
  napomena?: string;
  mitarbeiter?: string;
};

export function buildSummary({
  service,
  name,
  vozilo,
  ostaje,
}: Pick<TerminInput, "service" | "name" | "vozilo" | "ostaje">): string {
  const car = vozilo.trim() ? ` (${vozilo.trim()})` : "";
  const who = name.trim() ? ` — ${name.trim()}` : "";
  const stays = ostaje ? "🅿️ " : "";
  return `${stays}🔧 ${service}${who}${car}`;
}

export function buildDescription({
  telefon,
  ostaje,
  stavke,
  napomena,
  mitarbeiter,
}: Pick<
  TerminInput,
  "telefon" | "ostaje" | "stavke" | "napomena" | "mitarbeiter"
>): string {
  const lines = [`Telefon: ${telefon.trim()}`];
  if (ostaje) lines.push("Auto ostaje: DA");
  if (stavke && stavke.length) lines.push(`Stavke: ${stavke.join(", ")}`);
  if (napomena?.trim()) lines.push(`Napomena: ${napomena.trim()}`);
  if (mitarbeiter?.trim()) lines.push(`Unio: ${mitarbeiter.trim()}`);
  lines.push("", "Uneseno preko Autotech Spajic interne stranice.");
  return lines.join("\n");
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// Format a UTC-built Date back into a naive local datetime string using UTC
// getters so the wall-clock components round-trip exactly (no tz conversion).
function toNaiveLocal(d: Date): string {
  return (
    `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:00`
  );
}

/**
 * Combine a YYYY-MM-DD date + HH:mm time + duration into naive local datetime
 * strings (e.g. "2026-06-29T09:00:00"). These are sent to the Calendar API
 * together with timeZone: Europe/Sarajevo, so Google anchors them to the
 * workshop's wall-clock time regardless of the server timezone.
 */
export function computeStartEnd(
  datum: string,
  vrijeme: string,
  trajanjeMin: number,
): { start: string; end: string } {
  const [y, m, d] = datum.split("-").map(Number);
  const [hh, mm] = vrijeme.split(":").map(Number);
  // Use UTC purely as an arithmetic vehicle; we read it back with UTC getters.
  const startDate = new Date(Date.UTC(y, m - 1, d, hh, mm));
  const endDate = new Date(startDate.getTime() + trajanjeMin * 60_000);
  return { start: toNaiveLocal(startDate), end: toNaiveLocal(endDate) };
}
