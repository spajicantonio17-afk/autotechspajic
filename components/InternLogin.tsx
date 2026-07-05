"use client";

import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";

export default function InternLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/intern/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Pogrešna lozinka.");
      }
    } catch {
      setError("Greška u vezi. Pokušajte ponovno.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-bg px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-line bg-bg-2 p-8"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-autotech.png"
          alt="Autotech Spajic"
          className="mx-auto mb-6 h-auto w-44"
        />
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white">
          <Lock className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-fg">
          Interni pristup
        </h1>
        <p className="mt-2 text-sm text-fg-soft">
          Unesite timsku lozinku za unos termina.
        </p>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Lozinka"
          className="mt-6 w-full rounded-xl border border-line bg-bg-3 px-4 py-3 text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-accent"
        />

        {error && <p className="mt-3 text-sm text-accent-bright">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Prijava
        </button>
      </form>
    </main>
  );
}
