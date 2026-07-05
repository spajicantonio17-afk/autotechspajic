"use client";

import { useState } from "react";
import { Zap, Loader2, CheckCircle2, X } from "lucide-react";
import { SERVICES, SERVICE_DETAILS } from "@/lib/termin";

export default function QuickSaleEntry() {
  const [usluga, setUsluga] = useState<string | null>(null);
  const [stavka, setStavka] = useState<string | null>(null);
  const [vozilo, setVozilo] = useState("");
  const [napomena, setNapomena] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function reset() {
    setUsluga(null);
    setStavka(null);
    setVozilo("");
    setNapomena("");
  }

  async function onSave() {
    if (!usluga) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/prodaja", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usluga, stavka, vozilo, napomena }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setToast(`Spremljeno: ${usluga}${stavka ? ` — ${stavka}` : ""}`);
        reset();
      } else {
        setError(data.error ?? "Unos nije spremljen.");
      }
    } catch {
      setError("Greška u vezi. Pokušajte ponovno.");
    } finally {
      setLoading(false);
    }
  }

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
  const inputCls =
    "w-full rounded-xl border border-line bg-bg-3 px-4 py-3 text-base text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-accent";

  return (
    <div className="mt-7 rounded-2xl border border-line bg-bg-2 p-7 sm:p-9">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-accent-bright" strokeWidth={1.8} />
        <h2 className="font-display text-xl font-bold tracking-tight text-fg">
          Brzi unos
        </h2>
      </div>
      <p className="mt-1 text-sm text-fg-soft">
        Bez termina — samo brzo zabilježi što je napravljeno/prodano.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {SERVICES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setUsluga(s);
              setStavka(null);
            }}
            className={chip(usluga === s)}
          >
            {s}
          </button>
        ))}
      </div>

      {usluga && (
        <div className="mt-5 space-y-5">
          {SERVICE_DETAILS[usluga]?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {SERVICE_DETAILS[usluga].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStavka((cur) => (cur === item ? null : item))}
                  className={subChip(stavka === item)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={vozilo}
              onChange={(e) => setVozilo(e.target.value)}
              placeholder="Vozilo (opcionalno)"
              className={inputCls}
            />
            <input
              value={napomena}
              onChange={(e) => setNapomena(e.target.value)}
              placeholder="Napomena (opcionalno)"
              className={inputCls}
            />
          </div>

          {error && <p className="text-sm text-accent-bright">{error}</p>}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onSave}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Spremi
            </button>
            <button
              type="button"
              onClick={reset}
              className="text-sm font-medium text-fg-faint hover:text-fg-soft"
            >
              Odustani
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed inset-x-0 bottom-6 z-50 mx-auto flex w-full max-w-md items-center gap-3 rounded-2xl border border-wa/40 bg-bg-2 px-5 py-4 shadow-2xl">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-wa-bright" />
          <p className="flex-1 text-sm text-fg">{toast}</p>
          <button
            onClick={() => setToast(null)}
            aria-label="Zatvori"
            className="text-fg-faint transition-colors hover:text-fg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
