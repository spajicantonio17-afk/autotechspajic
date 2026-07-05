import Image from "next/image";
import { Lock, MapPin } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { waLink } from "@/lib/whatsapp";

const links = [
  { href: "#usluge", label: "Usluge" },
  { href: "#proces", label: "Proces" },
  { href: "#galerija", label: "Galerija" },
  { href: "#o-nama", label: "O nama" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="mx-auto max-w-container px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center">
              <Image
                src="/logo-nav.png"
                alt="Autotech Spajic"
                width={160}
                height={107}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-soft">
              Dijagnostika, kodiranje, auto elektrika, ključevi, tuning i servis
              za sve marke vozila. Grude, Hercegovina.
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-fg-faint">Navigacija</h4>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm font-medium text-fg-soft transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/termin"
                  aria-label="Admin"
                  className="inline-flex items-center gap-2 text-sm font-medium text-fg-soft transition-colors hover:text-fg"
                >
                  <Lock className="h-4 w-4" />
                  Admin
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-fg-faint">Kontakt</h4>
            <ul className="mt-5 space-y-3 text-sm text-fg-soft">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-bright"
                  strokeWidth={1.8}
                />
                Pocrte 59, 88340 Grude
              </li>
            </ul>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-fg transition-all hover:border-fg"
            >
              <WhatsAppIcon className="h-4 w-4 text-wa-bright" />
              063 509 999
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-fg-faint sm:flex-row">
          <p>© {new Date().getFullYear()} Autotech Spajic — Sva prava pridržana</p>
          <p>Grude · Hercegovina · BiH</p>
        </div>
      </div>
    </footer>
  );
}
