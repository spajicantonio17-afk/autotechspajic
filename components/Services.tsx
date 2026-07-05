"use client";

import { useEffect, useState } from "react";
import {
  ScanSearch,
  Code2,
  Zap,
  KeyRound,
  Cpu,
  Wrench,
  ArrowUpRight,
  X,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { waLinkForService } from "@/lib/whatsapp";

type Service = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  details: string[];
};

// Elektronika u fokusu — tuning dolazi kasnije.
const services: Service[] = [
  {
    icon: ScanSearch,
    title: "Dijagnostika",
    subtitle: "Očitavanje i analiza",
    description:
      "Profesionalna dijagnostika s najnovijom opremom — očitavanje grešaka, pronalazak uzroka kvara i analiza svih sustava vozila.",
    items: [
      "Očitavanje memorije grešaka",
      "Pronalazak uzroka kvara",
      "Provjera uživo (live data)",
      "Provjera prije kupnje",
    ],
    details: [
      "Očitavanje memorije grešaka",
      "Pronalazak uzroka kvara",
      "Brisanje grešaka",
      "Analiza svih sustava",
      "Provjera uživo (live data)",
      "Provjera prije kupnje",
    ],
  },
  {
    icon: Code2,
    title: "Kodiranje i programiranje",
    subtitle: "Upravljačke jedinice",
    description:
      "Kodiranje skrivenih funkcija, aktivacija opcija te prilagodba i programiranje upravljačkih jedinica za sve marke vozila.",
    items: [
      "Aktivacija funkcija",
      "Prilagodba nove ECU jedinice",
      "Programiranje upravljačkih jedinica",
      "Retrofit kodiranje",
    ],
    details: [
      "Aktivacija funkcija",
      "Prilagodba brzinomjera",
      "Prilagodba kilometraže",
      "Prilagodba nove ECU jedinice",
      "Programiranje upravljačkih jedinica",
      "Retrofit kodiranje",
      "Za sve marke vozila",
    ],
  },
  {
    icon: Zap,
    title: "Auto elektrika",
    subtitle: "Elektronika i instalacije",
    description:
      "Kompletni električni radovi te popravak elektronike vozila — od instalacija i ugradnje opreme do popravka upravljačkih jedinica.",
    items: [
      "Popravak instalacija",
      "Popravak elektronike mjenjača",
      "Popravak ELV / EZS (Mercedes)",
      "Ugradnja opreme",
    ],
    details: [
      "Popravak instalacija",
      "Popravak elektronike mjenjača",
      "Popravak ELV / EZS (Mercedes)",
      "Ugradnja opreme",
      "Električna dijagnostika",
      "Update dijagnostike",
    ],
  },
  {
    icon: KeyRound,
    title: "Auto ključevi",
    subtitle: "Izrada i programiranje",
    description:
      "Izrada i programiranje auto ključeva za sve marke vozila — rješenje za izgubljene ključeve te kopije rezervnih ključeva.",
    items: [
      "Izrada novih ključeva",
      "Programiranje ključeva",
      "Rezervni ključevi",
      "Izgubljeni ključevi",
    ],
    details: [
      "Izrada novih ključeva",
      "Programiranje ključeva",
      "Rezervni ključevi",
      "Izgubljeni ključevi",
      "Za sve marke vozila",
    ],
  },
  {
    icon: Cpu,
    title: "Chiptuning",
    subtitle: "ECU optimizacija",
    description:
      "Profesionalno ECU programiranje za povećanje snage i momenta te optimizaciju potrošnje — uz DPF/EGR i AdBlue rješenja.",
    items: [
      "Stage optimizacija",
      "AdBlue rješenje",
      "DPF / EGR rješenja",
      "Pop and bangs",
    ],
    details: [
      "Stage optimizacija",
      "AdBlue rješenje",
      "DPF / EGR rješenja",
      "NOx off",
      "KAT / OPF off",
      "Lambda off",
      "Pop and bangs",
      "Revlimiter / Hardcut",
    ],
  },
  {
    icon: Wrench,
    title: "Servis",
    subtitle: "Održavanje vozila",
    description:
      "Redovito održavanje i servisni radovi za pouzdan rad vozila — zamjena ulja, filtera, kočnica i provjera ključnih sustava.",
    items: [
      "Zamjena ulja i filtera",
      "Servis kočnica",
      "Zamjena svjećica",
      "Sezonska provjera vozila",
    ],
    details: [
      "Zamjena ulja i filtera",
      "Servis kočnica",
      "Zamjena svjećica",
      "Provjera i dopuna tekućina",
      "Zamjena akumulatora",
      "Sezonska provjera vozila",
    ],
  },
];

function ServiceCard({
  service,
  onOpen,
}: {
  service: Service;
  onOpen: (service: Service) => void;
}) {
  const Icon = service.icon;
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(service)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(service);
        }
      }}
      aria-label={`Detalji: ${service.title}`}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-bg-2 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* accent glow on hover */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/0 blur-3xl transition-all duration-500 group-hover:bg-accent/15" />

      <div className="relative flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-3 text-fg ring-1 ring-line transition-colors group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </div>
        <a
          href={waLinkForService(service.title)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Pošalji upit: ${service.title}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-faint transition-all hover:border-fg hover:text-fg"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <h3 className="relative mt-6 font-display text-xl font-bold tracking-tight text-fg">
        {service.title}
      </h3>
      <p className="relative mt-1 text-sm font-medium text-accent-bright">
        {service.subtitle}
      </p>

      <p className="relative mt-4 text-sm leading-relaxed text-fg-soft">
        {service.description}
      </p>

      <ul className="relative mt-5 space-y-2 border-t border-line pt-5">
        {service.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 text-sm text-fg-soft"
          >
            <span className="h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>

      <p className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg-faint transition-colors group-hover:text-accent-bright">
        Pogledaj sve
        <ArrowUpRight className="h-4 w-4" />
      </p>
    </article>
  );
}

function ServiceModal({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  const Icon = service.icon;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={service.title}
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
      />

      {/* card */}
      <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-line bg-bg-2 shadow-2xl">
        {/* accent glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />

        <button
          onClick={onClose}
          aria-label="Zatvori"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-faint transition-all hover:border-fg hover:text-fg"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative overflow-y-auto p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white ring-1 ring-accent">
            <Icon className="h-5 w-5" strokeWidth={1.6} />
          </div>

          <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-fg">
            {service.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-accent-bright">
            {service.subtitle}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-fg-soft">
            {service.description}
          </p>

          <ul className="mt-5 grid gap-2 border-t border-line pt-5 sm:grid-cols-2">
            {service.details.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm text-fg-soft"
              >
                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href={waLinkForService(service.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wa-bright px-6 py-3 text-sm font-semibold text-bg transition-all hover:brightness-110"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pošalji upit
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section id="usluge" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-container px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow tick text-fg-soft">Usluge</p>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.02] tracking-tight text-fg sm:text-4xl lg:text-5xl">
              Elektronika, dijagnostika i sve ostalo za vaše vozilo
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-soft">
              Problem s elektronikom? Ključevi? Chiptuning? Riješavamo sve — za svaku marku.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 80} className="h-full">
              <ServiceCard service={service} onOpen={setSelected} />
            </Reveal>
          ))}
        </div>
      </div>

      {selected && (
        <ServiceModal service={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
