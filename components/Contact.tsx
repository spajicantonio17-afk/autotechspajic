import { MapPin, Clock } from "lucide-react";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { waLink } from "@/lib/whatsapp";

const hours = [
  { day: "Ponedjeljak – Petak", time: "09:00 – 18:00" },
  { day: "Pauza", time: "12:00 – 13:00" },
  { day: "Subota", time: "09:00 – 15:00" },
  { day: "Nedjelja", time: "Zatvoreno" },
];

export default function Contact() {
  return (
    <section id="kontakt" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-container px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow tick text-fg-soft">Kontakt</p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-fg sm:text-5xl">
              Javite se još danas
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-soft">
              Najbrži način da dođete do nas je WhatsApp. Pošaljite poruku s
              opisom vozila — odgovaramo brzo i bez obaveze.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            {/* WhatsApp CTA card */}
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-2 p-7">
                <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-wa-bright/10 blur-3xl" />
                <div className="relative flex items-center gap-2.5 text-sm font-semibold text-wa-bright">
                  <span className="inline-block h-2 w-2 rounded-full bg-wa-bright" />
                  WhatsApp · 063 509 999
                </div>
                <p className="relative mt-4 max-w-sm text-base leading-relaxed text-fg-soft">
                  Pošaljite nam poruku — opišite vozilo i što vam treba.
                </p>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-6 inline-flex items-center gap-2.5 rounded-full bg-wa-bright px-7 py-4 text-sm font-semibold text-bg transition-all hover:bg-wa"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Pošalji poruku
                </a>
              </div>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              <Reveal delay={80}>
                <div className="h-full rounded-2xl border border-line bg-bg-2 p-7">
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-accent-bright">
                    <MapPin className="h-4 w-4" strokeWidth={1.8} />
                    Lokacija
                  </div>
                  <p className="mt-4 font-display text-lg font-bold leading-snug tracking-tight text-fg">
                    Pocrte 59
                    <br />
                    88340 Grude
                  </p>
                  <p className="mt-2 text-sm text-fg-faint">
                    Bosna i Hercegovina
                  </p>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="h-full rounded-2xl border border-line bg-bg-2 p-7">
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-accent-bright">
                    <Clock className="h-4 w-4" strokeWidth={1.8} />
                    Radno vrijeme
                  </div>
                  <div className="mt-4 space-y-2.5">
                    {hours.map((h) => (
                      <div
                        key={h.day}
                        className="flex items-center justify-between gap-3 border-b border-line pb-2 text-sm last:border-0"
                      >
                        <span className="text-fg-soft">{h.day}</span>
                        <span className="font-medium text-fg">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Map */}
          <Reveal delay={120} className="min-h-[420px]">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Lokacija Autotech Spajic — Grude"
                src="https://www.google.com/maps?q=Pocrte%2059%2C%2088340%20Grude%2C%20Bosna%20i%20Hercegovina&output=embed"
                className="h-full min-h-[420px] w-full"
                style={{ filter: "invert(0.92) hue-rotate(180deg) grayscale(0.2)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
