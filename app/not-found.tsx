import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { waLink } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <Image
        src="/logo-nav.png"
        alt="Autotech Spajic"
        width={200}
        height={133}
        className="h-14 w-auto object-contain"
      />
      <p className="mt-10 font-display text-7xl font-extrabold tracking-tight text-accent-bright">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
        Stranica nije pronađena
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-fg-soft">
        Stranica koju tražite ne postoji ili je premještena.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
        >
          Natrag na početnu
        </Link>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold text-fg transition-colors hover:border-wa-bright hover:text-wa-bright"
        >
          <WhatsAppIcon className="h-4 w-4 text-wa-bright" />
          WhatsApp
        </a>
      </div>
    </main>
  );
}
