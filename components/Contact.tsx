import { MapPin, Clock, Phone, Star } from "lucide-react";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import OpenStatusBadge from "./OpenStatusBadge";
import { waLink } from "@/lib/whatsapp";
import { BUSINESS, GOOGLE_REVIEW_URL, HOURS_DISPLAY } from "@/lib/business";

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
            <div className="mt-5">
              <OpenStatusBadge />
            </div>
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
                  WhatsApp · {BUSINESS.phoneDisplay}
                </div>
                <p className="relative mt-4 max-w-sm text-base leading-relaxed text-fg-soft">
                  Pošaljite nam poruku — opišite vozilo i što vam treba.
                </p>
                <div className="relative mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-wa-bright px-7 py-4 text-sm font-semibold text-bg transition-all hover:bg-wa"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Pošalji poruku
                  </a>
                  <a
                    href={`tel:${BUSINESS.phone}`}
                    className="inline-flex items-center gap-2.5 rounded-full border border-line px-7 py-4 text-sm font-semibold text-fg transition-all hover:border-fg"
                  >
                    <Phone className="h-4 w-4" strokeWidth={1.8} />
                    Nazovi
                  </a>
                </div>
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
                    {BUSINESS.street}
                    <br />
                    {BUSINESS.postalCode} {BUSINESS.city}
                  </p>
                  <p className="mt-2 text-sm text-fg-faint">
                    {BUSINESS.countryDisplay}
                  </p>
                  {GOOGLE_REVIEW_URL && (
                    <a
                      href={GOOGLE_REVIEW_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-bright transition-colors hover:text-fg"
                    >
                      <Star className="h-4 w-4" strokeWidth={1.8} />
                      Napišite recenziju na Googleu
                    </a>
                  )}
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="h-full rounded-2xl border border-line bg-bg-2 p-7">
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-accent-bright">
                    <Clock className="h-4 w-4" strokeWidth={1.8} />
                    Radno vrijeme
                  </div>
                  <div className="mt-4 space-y-2.5">
                    {HOURS_DISPLAY.map((h) => (
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
          <Reveal delay={120} className="min-h-[260px] sm:min-h-[340px] md:min-h-[420px]">
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-line sm:min-h-[340px] md:min-h-[420px]">
              <iframe
                title="Lokacija Autotech Spajic — Grude"
                src="https://www.google.com/maps?q=Autotech+Spajic,+Pocrte+59,+88340+Grude&ftid=0x134b233fc2cffdc3:0x4683f64e3eff18d0&output=embed"
                className="h-full min-h-[260px] w-full sm:min-h-[340px] md:min-h-[420px]"
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
