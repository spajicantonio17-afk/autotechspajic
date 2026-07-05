"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { waLink } from "@/lib/whatsapp";

const links = [
  { href: "#usluge", label: "Usluge" },
  { href: "#proces", label: "Proces" },
  { href: "#galerija", label: "Galerija" },
  { href: "#o-nama", label: "O nama" },
  { href: "#kontakt", label: "Di se nalazimo" },
  { href: "#faq", label: "Česta pitanja" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 overflow-visible transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="relative mx-auto flex h-full max-w-container items-center px-5 lg:px-8">
        <a href="#" className="flex items-center">
          <Image
            src="/logo-nav.png"
            alt="Autotech Spajic"
            width={360}
            height={240}
            quality={100}
            className="h-9 w-auto object-contain sm:h-11"
            priority
          />
        </a>

        <div className="hidden absolute left-1/2 -translate-x-1/2 items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-fg-soft transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-bg transition-all hover:bg-white md:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="text-fg md:hidden"
            aria-label="Izbornik"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg/95 px-5 py-6 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-fg-soft transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-wa-bright px-5 py-3 text-sm font-semibold text-bg"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pošalji poruku
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
