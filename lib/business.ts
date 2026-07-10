// Central business data — single source of truth for Contact, Footer,
// JSON-LD structured data and the live open/closed badge.
//
// NAKON VERIFIKACIJE GOOGLE BUSINESS PROFILA:
// 1. Zamijeniti GEO koordinate točnim vrijednostima iz Google Mapsa
//    (desni klik na pin → koordinate).
// 2. Upisati GOOGLE_REVIEW_URL (link "Napišite recenziju" iz GBP-a).
// 3. Dodati GBP/društvene profile u SAME_AS.
// 4. Radno vrijeme ovdje i na GBP-u držati identičnim.
import { WHATSAPP_NUMBER } from "./whatsapp";

// Alternativni nazivi po kojima ljudi traže radionicu na Googleu — pomaže
// da pretrage tipa "Auto Spajic" ili "Spajic elektrika" vode direktno na nas.
export const ALTERNATE_NAMES = [
  "Auto Spajic",
  "Spajic auto elektrika",
  "Autotech Spajic Grude",
] as const;

export const BUSINESS = {
  name: "Autotech Spajic",
  legalName: "Autotech Spajic",
  phone: `+${WHATSAPP_NUMBER}`, // +38763509999
  phoneDisplay: "063 509 999",
  street: "Pocrte 59",
  postalCode: "88340",
  city: "Grude",
  country: "BA",
  countryDisplay: "Bosna i Hercegovina",
  region: "Hercegovina",
} as const;

// Približne koordinate za Grude — zamijeniti točnima nakon GBP verifikacije.
export const GEO = {
  latitude: 43.3711,
  longitude: 17.4106,
} as const;

// Popuniti nakon GBP verifikacije (npr. https://g.page/r/.../review).
export const GOOGLE_REVIEW_URL = "";

export const INSTAGRAM_URL = "https://www.instagram.com/autotechspajic/";

// GBP profil, Facebook itd. — dopuniti kad postoje.
export const SAME_AS: string[] = [INSTAGRAM_URL];

/** Radno vrijeme po danu (0 = nedjelja … 6 = subota), lokalno vrijeme radionice. */
export type DaySchedule = { open: string; close: string }[];

export const WEEKLY_HOURS: Record<number, DaySchedule> = {
  0: [], // nedjelja — zatvoreno
  1: [
    { open: "09:00", close: "12:00" },
    { open: "13:00", close: "18:00" },
  ],
  2: [
    { open: "09:00", close: "12:00" },
    { open: "13:00", close: "18:00" },
  ],
  3: [
    { open: "09:00", close: "12:00" },
    { open: "13:00", close: "18:00" },
  ],
  4: [
    { open: "09:00", close: "12:00" },
    { open: "13:00", close: "18:00" },
  ],
  5: [
    { open: "09:00", close: "12:00" },
    { open: "13:00", close: "18:00" },
  ],
  6: [{ open: "09:00", close: "15:00" }],
};

/** Prikaz radnog vremena u Contact sekciji. */
export const HOURS_DISPLAY = [
  { day: "Ponedjeljak – Petak", time: "09:00 – 18:00" },
  { day: "Pauza", time: "12:00 – 13:00" },
  { day: "Subota", time: "09:00 – 15:00" },
  { day: "Nedjelja", time: "Zatvoreno" },
] as const;

/** IANA vremenska zona radionice. */
export const TIMEZONE = "Europe/Sarajevo";

/** openingHoursSpecification za schema.org (AutoRepair JSON-LD). */
export function openingHoursSpecification() {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ] as const;
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...weekdays],
      opens: "09:00",
      closes: "12:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...weekdays],
      opens: "13:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "15:00",
    },
  ];
}

/**
 * Canonical site URL. Postaviti NEXT_PUBLIC_SITE_URL u Vercelu čim postoji
 * vlastita domena — sitemap, canonical i OG se automatski prilagode.
 */
export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export type OpenStatus =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string | null };

/** Trenutni status (otvoreno/zatvoreno) prema vremenu radionice. */
export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const weekdayShort = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = parts.find((p) => p.type === "hour")?.value ?? "00";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    weekdayShort
  );
  const minutes = Number(hour) * 60 + Number(minute);

  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const today = WEEKLY_HOURS[dayIndex] ?? [];
  for (const slot of today) {
    if (minutes >= toMin(slot.open) && minutes < toMin(slot.close)) {
      return { open: true, closesAt: slot.close };
    }
  }

  // Zatvoreno — nađi sljedeće otvaranje (danas kasnije ili idućih dana).
  for (const slot of today) {
    if (minutes < toMin(slot.open)) {
      return { open: false, opensAt: `u ${slot.open}` };
    }
  }
  for (let offset = 1; offset <= 7; offset++) {
    const next = WEEKLY_HOURS[(dayIndex + offset) % 7] ?? [];
    if (next.length > 0) {
      const dayNames = [
        "nedjelju",
        "ponedjeljak",
        "utorak",
        "srijedu",
        "četvrtak",
        "petak",
        "subotu",
      ];
      const label =
        offset === 1
          ? `sutra u ${next[0].open}`
          : `u ${dayNames[(dayIndex + offset) % 7]} u ${next[0].open}`;
      return { open: false, opensAt: label };
    }
  }
  return { open: false, opensAt: null };
}
