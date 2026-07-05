"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { ProdajaRow } from "@/lib/prodaja";

function formatDatumVrijeme(iso: string): string {
  const d = new Date(iso);
  const p2 = (n: number) => String(n).padStart(2, "0");
  return `${p2(d.getDate())}.${p2(d.getMonth() + 1)}.${d.getFullYear()}. ${p2(
    d.getHours(),
  )}:${p2(d.getMinutes())}`;
}

export default function PregledProdajePage() {
  const [items, setItems] = useState<ProdajaRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/prodaja")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setItems(data.items);
        else setError(data.error ?? "Podaci nisu učitani.");
      })
      .catch(() => setError("Greška u vezi. Pokušajte ponovno."));
  }, []);

  return (
    <main className="min-h-dvh bg-bg px-5 pb-10 pt-6">
      <div className="mx-auto w-full max-w-5xl">
        <header className="flex items-center gap-4">
          <Link
            href="/termin"
            className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-fg-soft transition-colors hover:border-fg-faint hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" />
            Natrag
          </Link>
          <div>
            <p className="eyebrow tick text-fg-soft">Interni pregled</p>
            <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
              Pregled prodaje
            </h1>
          </div>
        </header>

        <div className="mt-7 overflow-x-auto rounded-2xl border border-line bg-bg-2">
          {items === null && !error && (
            <div className="flex items-center justify-center gap-2 p-10 text-fg-soft">
              <Loader2 className="h-4 w-4 animate-spin" />
              Učitavanje...
            </div>
          )}

          {error && <p className="p-6 text-sm text-accent-bright">{error}</p>}

          {items && items.length === 0 && (
            <p className="p-6 text-sm text-fg-soft">Još nema unosa.</p>
          )}

          {items && items.length > 0 && (
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-fg-faint">
                  <th className="px-5 py-3.5 font-medium">Datum / vrijeme</th>
                  <th className="px-5 py-3.5 font-medium">Usluga</th>
                  <th className="px-5 py-3.5 font-medium">Stavka</th>
                  <th className="px-5 py-3.5 font-medium">Vozilo</th>
                  <th className="px-5 py-3.5 font-medium">Napomena</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-line last:border-0">
                    <td className="whitespace-nowrap px-5 py-3.5 text-fg-soft">
                      {formatDatumVrijeme(item.created_at)}
                    </td>
                    <td className="px-5 py-3.5 text-fg">{item.usluga}</td>
                    <td className="px-5 py-3.5 text-fg-soft">{item.stavka ?? "—"}</td>
                    <td className="px-5 py-3.5 text-fg-soft">{item.vozilo ?? "—"}</td>
                    <td className="px-5 py-3.5 text-fg-soft">{item.napomena ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
