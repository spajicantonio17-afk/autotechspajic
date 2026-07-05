"use client";

import Image from "next/image";
import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <Image
        src="/logo-nav.png"
        alt="Autotech Spajic"
        width={200}
        height={133}
        className="h-14 w-auto object-contain"
      />
      <h1 className="mt-10 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
        Nešto je pošlo po zlu
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-fg-soft">
        Dogodila se neočekivana greška. Pokušajte ponovno.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
        >
          Pokušaj ponovno
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold text-fg transition-colors hover:border-fg"
        >
          Natrag na početnu
        </Link>
      </div>
    </main>
  );
}
