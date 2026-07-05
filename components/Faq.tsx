"use client";

import { useEffect, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Koliko košta dijagnostika?",
    a: "Cijena ovisi o vozilu i vrsti problema. Pošaljite nam poruku na WhatsApp s opisom vozila i kvara — brzo dajemo procjenu, bez obaveze.",
  },
  {
    q: "Trebam li najaviti dolazak?",
    a: "Preporučujemo najavu putem WhatsAppa ili poziva kako biste izbjegli čekanje. Hitne slučajeve rješavamo po dogovoru.",
  },
  {
    q: "Koje marke vozila radite?",
    a: "Radimo sve marke vozila — od VW grupe (VW, Audi, Škoda, SEAT) preko BMW-a, Mercedesa i Porschea do japanskih i francuskih marki. Za dijagnostiku i kodiranje koristimo profesionalnu opremu za svaku marku.",
  },
  {
    q: "Radite li izradu i programiranje ključeva?",
    a: "Da — izrađujemo i programiramo auto ključeve za većinu marki, uključujući slučajeve kad su svi ključevi izgubljeni.",
  },
  {
    q: "Je li chiptuning siguran za moj motor?",
    a: "Prije svakog chiptuninga radimo dijagnostiku stanja motora. Koristimo provjerene mape prilagođene vašem vozilu — snaga raste u granicama koje motor sigurno podnosi.",
  },
  {
    q: "Dolaze li klijenti i izvan Gruda?",
    a: "Da, do nas redovno dolaze klijenti iz cijele Bosne i Hercegovine i Hrvatske — posebno za kodiranje, programiranje i probleme koje drugi nisu uspjeli riješiti.",
  },
];

// FAQPage schema — omogućuje Google rich results za pitanja i odgovore.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Zugeklappte Sektion unter Kontakt: sichtbar ist nur der breite Button,
// Klick klappt die Fragen inline nach unten auf (kein Modal). Die Items
// bleiben im DOM, damit der Inhalt zum FAQPage-JSON-LD passt.
export default function Faq() {
  const [expanded, setExpanded] = useState(false);
  const [openItem, setOpenItem] = useState<number | null>(0);

  // Navbar-Link (#faq) soll die Sektion beim Anspringen automatisch öffnen.
  useEffect(() => {
    const openIfTargeted = () => {
      if (window.location.hash === "#faq") setExpanded(true);
    };
    openIfTargeted();
    window.addEventListener("hashchange", openIfTargeted);
    return () => window.removeEventListener("hashchange", openIfTargeted);
  }, []);

  return (
    <section
      id="faq"
      className="relative scroll-mt-20 border-t border-line py-14 lg:py-16"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-container px-5 lg:px-8">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="faq-content"
          className={`flex w-full items-center justify-between gap-4 rounded-2xl border bg-bg-2 px-7 py-6 text-left transition-colors hover:border-line-strong ${
            expanded ? "border-line-strong" : "border-line"
          }`}
        >
          <span className="flex items-center gap-3.5">
            <HelpCircle
              className="h-6 w-6 flex-shrink-0 text-accent-bright"
              strokeWidth={1.8}
            />
            <span className="font-display text-xl font-extrabold tracking-tight text-fg sm:text-2xl">
              Česta pitanja
            </span>
          </span>
          <ChevronDown
            className={`h-6 w-6 flex-shrink-0 text-fg-soft transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
            strokeWidth={1.8}
          />
        </button>

        <div
          id="faq-content"
          aria-hidden={!expanded}
          className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="grid gap-4 pt-6 lg:grid-cols-2">
              {faqs.map((f, i) => {
                const isOpen = openItem === i;
                return (
                  <div
                    key={f.q}
                    className={`rounded-2xl border bg-bg-2 transition-colors ${
                      isOpen ? "border-line-strong" : "border-line"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenItem(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      tabIndex={expanded ? 0 : -1}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    >
                      <span className="font-display text-base font-bold tracking-tight text-fg sm:text-lg">
                        {f.q}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-fg-soft transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.8}
                      />
                    </button>
                    {isOpen && (
                      <p className="px-6 pb-6 text-base leading-relaxed text-fg-soft">
                        {f.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
