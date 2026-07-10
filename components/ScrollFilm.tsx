"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const frames: {
  src: string;
  src2?: string;
  src3?: string;
  alt: string;
  alt2?: string;
  alt3?: string;
  label: string;
  caption: string;
}[] = [
  {
    src: "/photos/radionica.jpg",
    alt: "Radionica Autotech Spajic u Grudama — auto servis i dijagnostika",
    label: "Radionica",
    caption: "Naša moderna radionica",
  },
  {
    src: "/photos/dijagnostika.jpg",
    alt: "Originalna dijagnostička oprema za auto dijagnostiku — ODIS, Xentry, ISTA, Bosch",
    label: "Dijagnostička oprema",
    caption: "Originalna dijagnostika: ODIS, PSA, Porsche, Xentry, ISTA, Bosch",
  },
  {
    src: "/photos/kljucevi-tuning.jpg",
    alt: "Izrada auto ključeva i profesionalna oprema za chiptuning — Autotech Spajic Grude",
    label: "Ključevi i chiptuning",
    caption: "Izrada ključeva i profesionalni alati za chiptuning",
  },
  {
    src: "/photos/stol-1.jpg",
    src2: "/photos/stol-2.jpg",
    alt: "Radni stol za auto elektroniku i programiranje upravljačkih jedinica",
    alt2: "Popravak i lemljenje auto elektronike u radionici Autotech Spajic",
    label: "Radni prostor",
    caption: "Elektronika i programiranje — do zadnjeg detalja",
  },
  {
    src: "/photos/detalj-punjac.jpg",
    src2: "/photos/detalj-hauba.jpg",
    src3: "/photos/detalj-beta.jpg",
    alt: "Punjač akumulatora tijekom dijagnostike vozila",
    alt2: "Pregled vozila pod haubom u auto servisu u Grudama",
    alt3: "Profesionalni alat za auto elektriku u radionici",
    label: "Detalji",
    caption: "Detalji koji čine razliku",
  },
];

export default function ScrollFilm() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const available = ref.current.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / available));
      const frame = Math.min(frames.length - 1, Math.floor(progress * frames.length));
      setActiveFrame(frame);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} style={{ height: `${frames.length * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {frames.map((frame, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === activeFrame ? 1 : 0 }}
          >
            {/* Background image or dark fallback */}
            <div className="photo-slot absolute inset-0">
              {frame.src2 && frame.src3 ? (
                /* Gallery collage: every object fully visible (object-contain) */
                <div className="absolute inset-x-2 bottom-20 top-14 sm:inset-x-10 sm:bottom-32 sm:top-24">
                  <div className="grid h-full grid-rows-[55%_1fr] gap-2 sm:grid-cols-[1.2fr_1fr_1fr] sm:grid-rows-1 sm:gap-3">
                    <div className="relative">
                      <Image
                        src={frame.src}
                        alt={frame.alt}
                        fill
                        className="photo-cine object-contain"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:col-span-2 sm:gap-3">
                      <div className="relative">
                        <Image
                          src={frame.src2}
                          alt={frame.alt2 ?? frame.alt}
                          fill
                          className="photo-cine object-contain"
                        />
                      </div>
                      <div className="relative">
                        <Image
                          src={frame.src3}
                          alt={frame.alt3 ?? frame.alt}
                          fill
                          className="photo-cine object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : frame.src2 ? (
                <div className="grid h-full grid-cols-1 sm:grid-cols-2">
                  <div className="relative">
                    <Image
                      src={frame.src}
                      alt={frame.alt}
                      fill
                      className="photo-cine object-contain sm:object-cover sm:object-center"
                    />
                  </div>
                  <div className="relative hidden sm:block">
                    <Image
                      src={frame.src2}
                      alt={frame.alt2 ?? frame.alt}
                      fill
                      className="photo-cine object-cover object-center"
                    />
                  </div>
                </div>
              ) : frame.src ? (
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  priority={i === 0}
                  className="photo-cine object-contain sm:object-cover sm:object-center"
                />
              ) : null}
            </div>

            {/* Gradient overlay */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,10,11,0.5) 0%, rgba(10,10,11,0.0) 30%, rgba(10,10,11,0.0) 60%, rgba(10,10,11,0.85) 100%)",
              }}
            />

            {/* Bottom-left: label + caption */}
            <div className="absolute bottom-6 left-4 z-[2] max-w-[75vw] sm:bottom-10 sm:left-6 lg:left-10">
              <p className="eyebrow tick text-fg-soft">{frame.label}</p>
              <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-fg sm:mt-2 sm:text-2xl lg:text-3xl">
                {frame.caption}
              </p>
            </div>

            {/* Bottom-right: frame counter */}
            <div className="absolute bottom-6 right-4 z-[2] sm:bottom-10 sm:right-6 lg:right-10">
              <p className="font-display text-sm font-bold tabular-nums text-fg-faint">
                {String(i + 1).padStart(2, "0")}{" "}
                <span className="text-fg-faint/40">/ {String(frames.length).padStart(2, "0")}</span>
              </p>
            </div>
          </div>
        ))}

        {/* Right-center: progress indicator */}
        <div className="absolute right-6 top-1/2 z-[3] flex -translate-y-1/2 flex-col gap-2 lg:right-10">
          {frames.map((_, i) => (
            <div
              key={i}
              className="h-0.5 w-6 rounded-full transition-all duration-500"
              style={{
                backgroundColor:
                  i === activeFrame
                    ? "var(--accent)"
                    : "rgba(255,255,255,0.15)",
                width: i === activeFrame ? "2rem" : "1rem",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
