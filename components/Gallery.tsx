"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Reveal from "./Reveal";

/**
 * GALERIJA — radovi / Werkstatt-Fotos
 *
 * FOTOS EINBAUEN:
 *   1. Bild in public/photos/ legen (kleingeschriebener Slug, .jpg).
 *   2. Unten einen Eintrag ins `shots`-Array einfügen (src, title, desc, tag).
 *   Fotos vom gleichen Auto direkt hintereinander einordnen.
 */
type Shot = {
  src: string;
  title: string;
  desc: string;
  tag: Tag;
};

type Tag =
  | "Chiptuning"
  | "Elektrika"
  | "Dijagnostika"
  | "Kodiranje"
  | "Ključevi"
  | "Radionica";

const shots: Shot[] = [
  {
    src: "/photos/q5-chiptuning-flex.jpg",
    title: "Audi Q5 2.0 TDI",
    desc: "Chiptuning — čitanje i optimizacija Bosch EDC17CP14 (Flex)",
    tag: "Chiptuning",
  },
  {
    src: "/photos/audi-q5.jpg",
    title: "Audi Q5 2.0 TDI",
    desc: "Isti auto — chiptuning u radionici",
    tag: "Chiptuning",
  },
  {
    src: "/photos/bmw-f30.jpg",
    title: "BMW 3 (F30)",
    desc: "Auto elektrika — brava vrata, podizač stakla, poklopac rezervoara",
    tag: "Elektrika",
  },
  {
    src: "/photos/bmw-f30-podizac-stakla.jpg",
    title: "BMW 3 (F30)",
    desc: "Zamjena podizača stakla",
    tag: "Elektrika",
  },
  {
    src: "/photos/bmw-fem-modul.jpg",
    title: "BMW — FEM modul",
    desc: "Zamjena i kodiranje FEM modula (body computer)",
    tag: "Elektrika",
  },
  {
    src: "/photos/mercedes-e-klasa.jpg",
    title: "Mercedes E-klasa (W212)",
    desc: "Auto elektrika u radionici",
    tag: "Elektrika",
  },
  {
    src: "/photos/mercedes-ezs.jpg",
    title: "Mercedes",
    desc: "Zamjena EZS brave paljenja (elektronski kontakt)",
    tag: "Ključevi",
  },
  {
    src: "/photos/passat-kljucevi.jpg",
    title: "VW Passat B8",
    desc: "Izrada i programiranje dva nova ključa",
    tag: "Ključevi",
  },
  {
    src: "/photos/cayenne-piwis.jpg",
    title: "Porsche Cayenne",
    desc: "Originalna Porsche PIWIS dijagnostika",
    tag: "Dijagnostika",
  },
  {
    src: "/photos/macan-chiptuning.jpg",
    title: "Porsche Macan",
    desc: "Chiptuning (Flex)",
    tag: "Chiptuning",
  },
  {
    src: "/photos/bmw-g20-programiranje.jpg",
    title: "BMW 3 (G20)",
    desc: "Programiranje i kodiranje (ISTA, ENET) uz stabilizator napona",
    tag: "Kodiranje",
  },
  {
    src: "/photos/bmw-m4-chiptuning.jpg",
    title: "BMW M4 (F82)",
    desc: "Chiptuning preko OBD",
    tag: "Chiptuning",
  },
  {
    src: "/photos/bmw-m4.jpg",
    title: "BMW M4 (F82)",
    desc: "Isti auto nakon obavljenog posla",
    tag: "Chiptuning",
  },
  {
    src: "/photos/citroen-chiptuning.jpg",
    title: "Citroën",
    desc: "Chiptuning (Flex)",
    tag: "Chiptuning",
  },
  {
    src: "/photos/ecu-bench.jpg",
    title: "ECU na stolu",
    desc: "Čitanje i pisanje u boot modu (bench)",
    tag: "Chiptuning",
  },
  {
    src: "/photos/porsche-911-992.jpg",
    title: "Porsche 911 (992)",
    desc: "Dijagnostika i servis",
    tag: "Dijagnostika",
  },
  {
    src: "/photos/oldtimer-porsche.jpg",
    title: "Mercedes oldtimer i Porsche 911",
    desc: "U radionici",
    tag: "Radionica",
  },
  {
    src: "/photos/bmw-m5.jpg",
    title: "BMW M5 (F90)",
    desc: "Kod nas u radionici",
    tag: "Radionica",
  },
  {
    src: "/photos/audi-rs6.jpg",
    title: "Audi RS6 Avant (C7)",
    desc: "Kod nas u radionici",
    tag: "Radionica",
  },
  {
    src: "/photos/bmw-f36.jpg",
    title: "BMW 4 Gran Coupé (F36)",
    desc: "Kod nas u radionici",
    tag: "Radionica",
  },
  {
    src: "/photos/nissan-patrol.jpg",
    title: "Nissan Patrol (Y61)",
    desc: "Kod nas u radionici",
    tag: "Radionica",
  },
  {
    src: "/photos/ispred-radionice.jpg",
    title: "Ispred radionice",
    desc: "Mercedes E-klasa, AMG i BMW E30 M3",
    tag: "Radionica",
  },
];

function Tile({ shot, onOpen }: { shot: Shot; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-[min(72vw,288px)] flex-none flex-col overflow-hidden rounded-2xl border border-line text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-fg-soft sm:w-72"
    >
      <div className="photo-cine-wrap photo-slot relative aspect-[4/3] w-full">
        <Image
          src={shot.src}
          alt={`${shot.title} — ${shot.desc}`}
          fill
          sizes="320px"
          className="photo-cine object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1 p-3">
        <span className="text-sm font-semibold text-fg">{shot.title}</span>
      </div>
    </button>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: Shot[];
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const shot = items[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={shot.title}
    >
      <div className="flex justify-end p-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Zatvori"
          className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-fg hover:bg-white/10"
        >
          ✕
        </button>
      </div>

      <div
        className="relative mx-auto w-full max-w-5xl flex-1 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={shot.src}
          alt={`${shot.title} — ${shot.desc}`}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      <div
        className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onStep(-1)}
          aria-label="Prethodna slika"
          className="rounded-full border border-line px-4 py-2 text-lg font-semibold text-fg hover:bg-white/10"
        >
          ‹
        </button>
        <div className="text-center">
          <p className="text-sm font-semibold text-fg">{shot.title}</p>
          <p className="mt-1 text-sm text-fg-soft">{shot.desc}</p>
          <p className="mt-1 text-xs text-fg-faint">
            {index + 1} / {items.length}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onStep(1)}
          aria-label="Sljedeća slika"
          className="rounded-full border border-line px-4 py-2 text-lg font-semibold text-fg hover:bg-white/10"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = shots;

  // Zwei Marquee-Reihen: abwechselnd aufteilen, Index zeigt in `visible`
  const row1 = visible.map((shot, i) => ({ shot, i })).filter((_, i) => i % 2 === 0);
  const row2 = visible.map((shot, i) => ({ shot, i })).filter((_, i) => i % 2 === 1);

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpenIndex((i) =>
        i === null ? i : (i + dir + visible.length) % visible.length
      );
    },
    [visible.length]
  );

  return (
    <section id="galerija" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-container px-5 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow tick text-fg-soft">Galerija</p>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-fg sm:text-5xl">
                Naš rad govori za nas
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-fg-soft">
              Dio onoga što svakodnevno radimo — od dijagnostike i elektronike
              do ključeva.
            </p>
          </div>
        </Reveal>

      </div>

      {/* Full-width marquee — läuft wie vorher, jetzt mit Fotos + Beschreibung */}
      <div className="mt-12 space-y-4 overflow-hidden">
        {/* Row 1: right → left */}
        <div className="overflow-hidden">
          <div className="marquee-track marquee-left gap-4 py-1">
            {[...row1, ...row1].map(({ shot, i }, k) => (
              <Tile key={`${shot.src}-${k}`} shot={shot} onOpen={() => setOpenIndex(i)} />
            ))}
          </div>
        </div>

        {/* Row 2: left → right */}
        <div className="overflow-hidden">
          <div className="marquee-track marquee-right gap-4 py-1">
            {[...row2, ...row2].map(({ shot, i }, k) => (
              <Tile key={`${shot.src}-${k}`} shot={shot} onOpen={() => setOpenIndex(i)} />
            ))}
          </div>
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          items={visible}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onStep={step}
        />
      )}
    </section>
  );
}
