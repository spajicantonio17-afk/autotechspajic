import { Instagram } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/business";

// Schmales Band zwischen Usluge und Kako radimo — Link zum Instagram-Profil.
export default function InstagramBar() {
  return (
    <div className="border-t border-line">
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group mx-auto flex max-w-container items-center justify-center gap-3 px-5 py-6 lg:px-8"
      >
        <Instagram
          className="h-5 w-5 text-accent-bright transition-transform group-hover:scale-110"
          strokeWidth={1.8}
        />
        <span className="text-sm font-medium text-fg-soft transition-colors group-hover:text-fg sm:text-base">
          Zapratite nas na Instagramu{" "}
          <span className="font-semibold text-accent-bright">
            @autotechspajic
          </span>
        </span>
      </a>
    </div>
  );
}
