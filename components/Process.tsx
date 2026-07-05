import { MessageCircle, Search, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { waLink } from "@/lib/whatsapp";

const steps = [
  {
    icon: MessageCircle,
    num: "01",
    title: "Pišete nam",
    desc: "Javite se na WhatsApp, opišite vozilo i problem. Odgovaramo brzo, bez obaveze.",
  },
  {
    icon: Search,
    num: "02",
    title: "Dijagnoza",
    desc: "Pregledamo vozilo, očitamo podatke i dajemo jasnu procjenu — bez skrivenih troškova.",
  },
  {
    icon: CheckCircle2,
    num: "03",
    title: "Rješenje",
    desc: "Posao odrađujemo precizno i kvalitetno. Vozilo radi pouzdano kako treba.",
  },
];

export default function Process() {
  return (
    <section id="proces" className="relative border-y border-line bg-bg-2 py-16 lg:py-20">
      <div className="mx-auto max-w-container px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow tick text-fg-soft">Kako radimo</p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-fg sm:text-5xl">
              Od poruke do rješenja u tri koraka
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.num} delay={i * 100}>
                <div className="relative h-full rounded-2xl border border-line bg-bg p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-extrabold tracking-tight text-fg-faint/50">
                      {s.num}
                    </span>
                    <Icon className="h-6 w-6 text-accent-bright" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-bold tracking-tight text-fg">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-fg-soft">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              Spremni za prvi korak?
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-wa-bright px-7 py-4 text-sm font-semibold text-bg transition-all hover:bg-wa"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pošalji poruku
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
