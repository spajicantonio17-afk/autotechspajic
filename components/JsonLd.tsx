import {
  ALTERNATE_NAMES,
  BUSINESS,
  GEO,
  SAME_AS,
  openingHoursSpecification,
  siteUrl,
} from "@/lib/business";

// AutoRepair (podvrsta LocalBusiness) — ključno za lokalni SEO i
// povezivanje s Google Business Profilom.
export default function JsonLd() {
  const url = siteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${url}/#business`,
    name: BUSINESS.name,
    alternateName: [...ALTERNATE_NAMES],
    url,
    image: `${url}/opengraph-image`,
    logo: `${url}/icon.png`,
    telephone: BUSINESS.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      postalCode: BUSINESS.postalCode,
      addressLocality: BUSINESS.city,
      addressCountry: BUSINESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    openingHoursSpecification: openingHoursSpecification(),
    areaServed: [
      { "@type": "AdministrativeArea", name: "Hercegovina" },
      { "@type": "Country", name: "Bosna i Hercegovina" },
    ],
    makesOffer: [
      "Auto dijagnostika",
      "Kodiranje i programiranje upravljačkih jedinica",
      "Auto elektrika",
      "Izrada auto ključeva",
      "Chiptuning",
      "Servis vozila",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
    ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
