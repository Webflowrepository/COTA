import type { Metadata } from "next";
import { Teko, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/lib/motion/SmoothScrollProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { cota } from "@/lib/content/cota";
import { SITE_URL } from "@/lib/site";

// Reemplaza a Big Shoulders — el cliente pidió Teko después de comparar
// varias rondas de opciones (condensada técnica, cortes angulosos). Solo
// afecta a .font-impact-number en globals.css (los números grandes:
// StatsBand, NaschelPlant, specs de bobinas, etc.) — los títulos usan
// --font-body (Inter), no este.
const display = Teko({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// SEO (2026-10-02). SITE_URL en lib/site.ts. opengraph-image.jpg /
// twitter-image.jpg / icon.png en app/ los toma Next.js solo.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "COTA S.A. — Soluciones en papel Tissue para la industria",
    template: "%s | COTA S.A.",
  },
  description:
    "Fabricante argentino de papel Tissue desde 1994: bobinas industriales para convertidores, productos convertidos y línea profesional Guardián. Planta propia en Naschel, San Luis. También blanqueadores ópticos y soluciones industriales.",
  keywords: [
    "papel Tissue",
    "bobinas industriales",
    "bobinas de papel",
    "fabricante de papel Tissue Argentina",
    "productos convertidos",
    "Guardián",
    "blanqueadores ópticos",
    "COTA",
    "Naschel San Luis",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "COTA S.A.",
    title: "COTA S.A. — Soluciones en papel Tissue para la industria",
    description:
      "Bobinas industriales de papel Tissue, productos convertidos y línea Guardián. Planta propia en Naschel, San Luis, desde 1994.",
  },
  twitter: {
    card: "summary_large_image",
    title: "COTA S.A. — Soluciones en papel Tissue para la industria",
    description:
      "Bobinas industriales de papel Tissue, productos convertidos y línea Guardián. Planta propia en Naschel, San Luis.",
  },
  robots: { index: true, follow: true },
};

// schema.org — sólo datos verificados de lib/content/cota.ts, nada de
// certificaciones/reseñas/ratings (esos campos de LocalBusiness quedan
// afuera hasta tener algo real que declarar).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: cota.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-cota.png`,
  description:
    "Fabricante argentino de papel Tissue: bobinas industriales, productos convertidos y línea Guardián. Planta propia en Naschel, San Luis.",
  foundingDate: String(cota.foundedYear),
  address: {
    "@type": "PostalAddress",
    addressLocality: cota.plant.location.split(",")[0]?.trim(),
    addressRegion: cota.plant.location.split(",")[1]?.trim(),
    postalCode: cota.plant.postalCode,
    addressCountry: "AR",
  },
  telephone: cota.contact.phone,
  email: cota.contact.email,
  sameAs: cota.social.filter((s) => s.href).map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollProvider>
          <Nav />
          {children}
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
