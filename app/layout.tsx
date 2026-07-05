import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
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
  title:
    "Autotech Spajic — Auto Dijagnostika, Kodiranje i Elektronika | Grude",
  description:
    "Autotech Spajic iz Gruda — profesionalna auto dijagnostika, kodiranje i programiranje upravljačkih jedinica, auto elektrika, izrada ključeva, chiptuning i servis za sve marke vozila.",
  keywords: [
    "auto dijagnostika Grude",
    "kodiranje ECU",
    "auto elektrika",
    "auto ključevi Grude",
    "chiptuning",
    "Autotech Spajic",
    "Hercegovina",
  ],
  openGraph: {
    title: "Autotech Spajic — Dijagnostika, kodiranje i elektronika",
    description:
      "Profesionalna dijagnostika, kodiranje, auto elektrika, ključevi, tuning i servis za sve marke vozila. Grude, Hercegovina.",
    type: "website",
    locale: "hr_HR",
  },
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
        {children}
      </body>
    </html>
  );
}
