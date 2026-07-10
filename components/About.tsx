import Reveal from "./Reveal";
import Counter from "./Counter";

const stats = [
  { to: 7, suffix: "", label: "Godina iskustva" },
  { to: 1000, suffix: "+", label: "Odrađenih vozila" },
  { to: 40, suffix: "+", label: "Marki vozila" },
  { to: 100, suffix: "%", label: "Zadovoljnih klijenata" },
];

export default function About() {
  return (
    <section
      id="o-nama"
      className="grain relative overflow-hidden border-t border-line bg-bg-2 py-24 lg:py-32"
    >
      {/* Red atmospheric glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 120%, rgba(232,35,47,0.14), transparent 65%)",
        }}
      />

      <div className="relative z-[1] mx-auto max-w-3xl px-5 text-center lg:px-8">
        <Reveal>
          <p className="eyebrow tick inline-block text-fg-soft">O nama</p>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Rješavamo ono što drugi{" "}
            <span className="text-accent-bright">ne mogu.</span>
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-fg-soft">
            Specijalizirani za dijagnostiku, kodiranje i programiranje
            upravljačkih jedinica, auto elektriku i izradu ključeva — uz tuning i
            servis. Smješteni smo u Grudama, a do nas dolaze klijenti iz cijele
            Bosne i Hercegovine te Hrvatske.
          </p>
        </Reveal>

        {/* Stats band */}
        <Reveal delay={280}>
          <div className="mt-16 grid grid-cols-2 gap-y-10 border-y border-line py-10 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="px-2 text-center">
                <Counter
                  to={s.to}
                  suffix={s.suffix}
                  className="font-display text-3xl font-extrabold tracking-tight text-fg sm:text-4xl lg:text-5xl"
                />
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-fg-soft">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
