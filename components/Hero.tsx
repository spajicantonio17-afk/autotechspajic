import { ArrowRight } from "lucide-react";
import Counter from "./Counter";
import WhatsAppIcon from "./WhatsAppIcon";
import { waLink } from "@/lib/whatsapp";

const stats = [
  { value: 10, suffix: "+", label: "godina iskustva" },
  { value: 5000, suffix: "+", label: "servisiranih vozila" },
  { value: 100, suffix: "%", label: "sve marke vozila" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden grain">
      {/* atmospheric accent glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_75%_25%,rgba(232,35,47,0.14),transparent_60%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-container flex-col justify-end px-5 pb-14 pt-20 lg:px-8 lg:pb-20">
        {/* Copy */}
        <div className="max-w-3xl">
          <p
            className="reveal eyebrow tick text-fg-soft"
            style={{ "--d": "0ms" } as React.CSSProperties}
          >
            Dijagnostika · Elektronika · Kodiranje
          </p>

          <h1 className="mt-6 font-display text-[3.1rem] font-extrabold leading-[0.98] tracking-tight text-fg sm:text-7xl lg:text-[6rem]">
            <span
              className="reveal block"
              style={{ "--d": "90ms" } as React.CSSProperties}
            >
              Auto elektronika
            </span>
            <span
              className="reveal block"
              style={{ "--d": "190ms" } as React.CSSProperties}
            >
              bez <span className="text-accent">nagađanja</span>.
            </span>
          </h1>

          <p
            className="reveal mt-7 max-w-xl text-lg leading-relaxed text-fg-soft"
            style={{ "--d": "300ms" } as React.CSSProperties}
          >
            Profesionalna dijagnostika, kodiranje i programiranje upravljačkih
            jedinica, auto elektrika, ključevi i servis — za sve marke vozila.
            Tuning kada vam zatreba.
          </p>

          <div
            className="reveal mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ "--d": "400ms" } as React.CSSProperties}
          >
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-wa-bright px-7 py-4 text-sm font-semibold text-bg transition-all hover:bg-wa"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pošalji poruku
            </a>
            <a
              href="#usluge"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-7 py-4 text-sm font-semibold text-fg transition-all hover:border-fg"
            >
              Pogledaj usluge
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div
          className="reveal mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8"
          style={{ "--d": "520ms" } as React.CSSProperties}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-bold tracking-tight text-fg sm:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-xs leading-snug text-fg-faint sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
