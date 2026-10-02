import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/catalogos/catalogo-bobinas-2026.pdf`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/catalogos/catalogo-producto-convertido.pdf`, changeFrequency: "yearly", priority: 0.6 },
  ];
}
