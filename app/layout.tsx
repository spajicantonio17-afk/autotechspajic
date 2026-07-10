import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { siteUrl } from "@/lib/business";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: "Autotech Spajic — Dijagnostika, kodiranje i elektrika | Grude",
  description:
    "Autotech Spajic iz Gruda — auto dijagnostika, kodiranje upravljačkih jedinica, auto elektrika, izrada ključeva, chiptuning i servis za sve marke vozila.",
  keywords: [
    "Autotech Spajic",
    "Autotech Spajic Grude",
    "Auto Spajic",
    "Spajic auto elektrika",
    "Spajic dijagnostika",
    "Spajic Grude",
    "auto dijagnostika Grude",
    "auto elektrika Grude",
    "auto servis Grude",
    "kodiranje ECU",
    "auto elektrika",
    "auto ključevi Grude",
    "chiptuning",
    "Hercegovina",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "hQoRHSagGj15QLwXYj9IO7otUW2-uN8fhX6u7IOn37I",
  },
  openGraph: {
    title: "Autotech Spajic — Dijagnostika, kodiranje i elektronika",
    description:
      "Profesionalna dijagnostika, kodiranje, auto elektrika, ključevi, tuning i servis za sve marke vozila. Grude, Hercegovina.",
    type: "website",
    locale: "hr_HR",
    url: "/",
    siteName: "Autotech Spajic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autotech Spajic — Dijagnostika, kodiranje i elektronika",
    description:
      "Profesionalna dijagnostika, kodiranje, auto elektrika, ključevi, tuning i servis za sve marke vozila. Grude, Hercegovina.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body
        className={`${display.variable} ${sans.variable} font-sans antialiased`}
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
