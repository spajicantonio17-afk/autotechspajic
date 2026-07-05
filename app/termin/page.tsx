"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarPlus,
  Loader2,
  CheckCircle2,
  ExternalLink,
  BarChart3,
  X,
} from "lucide-react";
import { SERVICES, DURATIONS, SERVICE_DETAILS } from "@/lib/termin";
import QuickSaleEntry from "@/components/QuickSaleEntry";

const p2 = (n: number) => String(n).padStart(2, "0");
function dateStr(d: Date): string {
  return `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
}
function todayStr(): string {
  return dateStr(new Date());
}
function plusDaysStr(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return dateStr(d);
}
function tomorrowStr(): string {
  return plusDaysStr(1);
}
function dayAfterStr(): string {
  return plusDaysStr(2);
}
function nextRoundHour(): string {
  const d = new Date();
  d.setMinutes(0, 0, 0);
  d.setHours(d.getHours() + 1);
  return `${p2(d.getHours())}:${p2(d.getMinutes())}`;
}

// Common workshop slots for one-tap time selection (every 30 min, lunch break out).
const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

const EMPTY = {
  name: "",
  telefon: "",
  vozilo: "",
  service: SERVICES[0] as string,
  napomena: "",
};

type Toast = { link: string } | null;

export default function TerminPage() {
  const [form, setForm] = useState(EMPTY);
  const [datum, setDatum] = useState(todayStr);
  const [vrijeme, setVrijeme] = useState(nextRoundHour);
  const [trajanje, setTrajanje] = useState<number>(60);
  const [ostaje, setOstaje] = useState(false);
  const [stavke, setStavke] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);

  function set<K extends keyof typeof EMPTY>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function selectService(s: string) {
    set("service", s);
    setStavke([]); // sub-options belong to a specific service
  }

  function toggleStavka(item: string) {
    setStavke((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setToast(null);
    try {
      const res = await fetch("/api/termine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, datum, vrijeme, trajanje, ostaje, stavke }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setToast({ link: data.htmlLink });
        // Reset customer fields for the next quick entry; keep date/time/service.
        setForm((f) => ({ ...EMPTY, service: f.service }));
        setStavke([]);
        setOstaje(false);
      } else {
        setError(data.error ?? "Termin nije spremljen.");
      }
    } catch {
      setError("Greška u vezi. Pokušajte ponovno.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-3 px-4 py-3.5 text-base text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-accent";
  const labelCls = "block text-base font-medium text-fg-soft";
  const chip = (active: boolean) =>
    `rounded-full border px-5 py-2.5 text-base font-medium transition-all ${
      active
        ? "border-accent bg-accent text-white"
        : "border-line text-fg-soft hover:border-fg-faint"
    }`;
  const subChip = (active: boolean) =>
    `rounded-lg border px-3.5 py-2 text-sm font-medium transition-all ${
      active
        ? "border-accent bg-accent/15 text-accent-bright"
        : "border-line text-fg-soft hover:border-fg-faint"
    }`;

  return (
    <main className="min-h-dvh bg-bg px-5 pb-10 pt-6">
      <div className="mx-auto w-full max-w-7xl">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow tick text-fg-soft">Interni unos</p>
            <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
              Novi termin
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/termin/pregled"
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-fg-soft transition-colors hover:border-fg-faint hover:text-fg"
            >
              <BarChart3 className="h-4 w-4" />
              Pregled prodaje
            </Link>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-autotech.png"
              alt="Autotech Spajic"
              className="h-20 w-auto sm:h-28"
            />
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-white">
              <CalendarPlus className="h-7 w-7" strokeWidth={1.8} />
            </div>
          </div>
        </header>

        <QuickSaleEntry />

        <form
          onSubmit={onSubmit}
          className="mt-7 grid gap-x-10 gap-y-7 rounded-2xl border border-line bg-bg-2 p-7 sm:p-9 lg:grid-cols-2"
        >
          {/* ---- Left column: when ---- */}
          <div className="space-y-7">
            {/* Date */}
            <div className="space-y-2">
              <span className={labelCls}>Datum</span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDatum(todayStr())}
                  className={chip(datum === todayStr())}
                >
                  Danas
                </button>
                <button
                  type="button"
                  onClick={() => setDatum(tomorrowStr())}
                  className={chip(datum === tomorrowStr())}
                >
                  Sutra
                </button>
                <button
                  type="button"
                  onClick={() => setDatum(dayAfterStr())}
                  className={chip(datum === dayAfterStr())}
                >
                  Prekosutra
                </button>
                <input
                  type="date"
                  required
                  value={datum}
                  onChange={(e) => setDatum(e.target.value)}
                  className="rounded-xl border border-line bg-bg-3 px-3 py-2 text-sm text-fg outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Time slots */}
            <div className="space-y-2">
              <span className={labelCls}>Vrijeme</span>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setVrijeme(t)}
                    className={chip(vrijeme === t)}
                  >
                    {t}
                  </button>
                ))}
                <input
                  type="time"
                  required
                  value={vrijeme}
                  onChange={(e) => setVrijeme(e.target.value)}
                  className="rounded-xl border border-line bg-bg-3 px-3 py-2 text-sm text-fg outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Service */}
            <div className="space-y-2">
              <span className={labelCls}>Usluga</span>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => selectService(s)}
                    className={chip(form.service === s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Sub-options for the selected service */}
              {SERVICE_DETAILS[form.service]?.length > 0 && (
                <div className="mt-3 rounded-xl border border-line bg-bg-3 p-4">
                  <p className="mb-3 text-sm font-medium text-fg-faint">
                    Detalji — {form.service}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_DETAILS[form.service].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleStavka(item)}
                        className={subChip(stavke.includes(item))}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ---- Right column: who ---- */}
          <div className="flex flex-col gap-5">
            {/* Duration + car stays */}
            <div className="space-y-2">
              <span className={labelCls}>Trajanje</span>
              <div className="flex flex-wrap items-center gap-2">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setTrajanje(d)}
                    className={chip(trajanje === d)}
                  >
                    {d} min
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setOstaje((v) => !v)}
                  aria-pressed={ostaje}
                  className={`ml-auto rounded-full border px-5 py-2.5 text-base font-semibold transition-all ${
                    ostaje
                      ? "border-wa bg-wa/15 text-wa-bright"
                      : "border-line text-fg-soft hover:border-fg-faint"
                  }`}
                >
                  🅿️ Auto ostaje
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className={labelCls} htmlFor="name">
                  Ime kupca <span className="text-fg-faint">(opcionalno)</span>
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="npr. Ivan Ivić"
                  className={inputCls}
                />
              </div>
              <div className="space-y-2">
                <label className={labelCls} htmlFor="telefon">
                  Telefon <span className="text-accent-bright">*</span>
                </label>
                <input
                  id="telefon"
                  required
                  inputMode="tel"
                  value={form.telefon}
                  onChange={(e) => set("telefon", e.target.value)}
                  placeholder="063 ..."
                  className={inputCls}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelCls} htmlFor="vozilo">
                Vozilo
              </label>
              <input
                id="vozilo"
                value={form.vozilo}
                onChange={(e) => set("vozilo", e.target.value)}
                placeholder="npr. BMW E46 320d"
                className={inputCls}
              />
            </div>

            <div className="flex flex-1 flex-col space-y-2">
              <label className={labelCls} htmlFor="napomena">
                Napomena <span className="text-fg-faint">(opcionalno)</span>
              </label>
              <textarea
                id="napomena"
                value={form.napomena}
                onChange={(e) => set("napomena", e.target.value)}
                placeholder="Opis problema, dijelovi, ..."
                className={`${inputCls} min-h-20 flex-1 resize-none`}
              />
            </div>

            {error && (
              <p className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent-bright">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CalendarPlus className="h-4 w-4" />
              )}
              Spremi termin
            </button>
          </div>
        </form>
      </div>

      {/* Success toast */}
      {toast && (
        <div className="fixed inset-x-0 bottom-6 z-50 mx-auto flex w-full max-w-md items-center gap-3 rounded-2xl border border-wa/40 bg-bg-2 px-5 py-4 shadow-2xl">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-wa-bright" />
          <p className="flex-1 text-sm text-fg">Termin spremljen u kalendar.</p>
          {toast.link && (
            <a
              href={toast.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-wa-bright hover:underline"
            >
              Otvori <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <button
            onClick={() => setToast(null)}
            aria-label="Zatvori"
            className="text-fg-faint transition-colors hover:text-fg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </main>
  );
}
