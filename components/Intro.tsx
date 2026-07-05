import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { waLink } from "@/lib/whatsapp";

const GARAGE_IMAGE = "/photos/garaza-vrata.jpg";

const chips = ["Chiptuning", "Ključevi", "Dijagnostika", "Kodiranje", "Servis", "Elektrika"];

export default function Intro() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden grain">
      {/* Background image or dark fallback */}
      <div className="photo-slot absolute inset-0">
        {GARAGE_IMAGE ? (
          <Image
            src={GARAGE_IMAGE}
            alt="Autotech Spajic radionica"
            fill
            priority
            className="photo-cine object-cover object-center"
          />
        ) : null}
      </div>

      {/* Gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(105deg, rgba(10,10,11,0.96) 0%, rgba(10,10,11,0.78) 55%, rgba(10,10,11,0.55) 100%)",
        }}
      />

      {/* Red atmospheric glow bottom-left */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at -5% 110%, rgba(232,35,47,0.18), transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] mx-auto flex min-h-[100svh] max-w-container items-center gap-8 px-5 pb-16 pt-24 lg:justify-center lg:gap-0 lg:px-8">
        {/* Left: Logo */}
        <div className="flex flex-1 items-center justify-center lg:flex-none lg:justify-end">
          <Image
            src="/logo.png"
            alt="Autotech Spajic"
            width={420}
            height={280}
            priority
            className="reveal h-72 w-auto object-contain sm:h-96 lg:h-[28rem]"
            style={{ "--d": "0ms" } as React.CSSProperties}
          />
        </div>

        {/* Right: Text + CTAs */}
        <div className="flex flex-1 flex-col justify-center lg:-ml-12 lg:max-w-xl">
          {/* Subtitle */}
          <p
            className="reveal text-xl leading-snug text-fg-soft sm:text-2xl"
            style={{ "--d": "120ms" } as React.CSSProperties}
          >
            Chiptuning, ključevi, dijagnostika,{" "}
            kodiranje i servis —{" "}
            <span className="text-fg">sve na jednom mjestu.</span>
          </p>

          {/* Service chips */}
          <div
            className="reveal mt-6 flex flex-wrap gap-2"
            style={{ "--d": "230ms" } as React.CSSProperties}
          >
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-line-strong px-3.5 py-1.5 text-xs font-medium text-fg-soft"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div
            className="reveal mt-9 flex flex-wrap gap-3"
            style={{ "--d": "340ms" } as React.CSSProperties}
          >
            <a
              href="#usluge"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
            >
              Naše usluge
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold text-fg transition-colors hover:border-wa-bright hover:text-wa-bright"
            >
              <WhatsAppIcon className="h-4 w-4 text-wa-bright" />
              Zakaži termin
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-6 z-[2] flex flex-col items-center gap-2 lg:right-10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-fg-faint/50">
          Scroll
        </span>
        <ChevronDown className="scroll-bounce h-5 w-5 text-fg-faint/40" />
      </div>
    </section>
  );
}
