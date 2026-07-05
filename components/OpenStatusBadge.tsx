"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/business";

// Renders nothing until mounted — the status depends on the visitor's clock,
// so computing it during SSR would cause a hydration mismatch.
export default function OpenStatusBadge() {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    setStatus(getOpenStatus());
    const timer = setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => clearInterval(timer);
  }, []);

  if (!status) return null;

  return status.open ? (
    <span className="inline-flex items-center gap-2 rounded-full border border-wa-bright/30 bg-wa-bright/10 px-3.5 py-1.5 text-xs font-semibold text-wa-bright">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa-bright opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-wa-bright" />
      </span>
      Sada otvoreno · do {status.closesAt}
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-2 px-3.5 py-1.5 text-xs font-semibold text-fg-soft">
      <span className="inline-flex h-2 w-2 rounded-full bg-fg-faint" />
      Zatvoreno{status.opensAt ? ` · otvara ${status.opensAt}` : ""}
    </span>
  );
}
