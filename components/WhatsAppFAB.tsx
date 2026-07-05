import WhatsAppIcon from "./WhatsAppIcon";
import { waLink } from "@/lib/whatsapp";

// Always-visible floating WhatsApp CTA — key for mobile / Instagram traffic.
export default function WhatsAppFAB() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Piši nam na WhatsApp"
      className="wa-pulse group fixed bottom-5 right-5 z-[60] flex h-14 items-center gap-2.5 rounded-full bg-wa-bright pl-4 pr-5 text-bg transition-all duration-300 hover:scale-105 hover:bg-wa"
    >
      <WhatsAppIcon className="h-7 w-7 flex-shrink-0" />
      <span className="whitespace-nowrap text-sm font-semibold">
        Piši nam na WhatsApp
      </span>
    </a>
  );
}
