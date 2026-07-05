import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/termin", "/api"],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
