import type { Metadata } from "next";
import { Teko, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/lib/motion/SmoothScrollProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { cota } from "@/lib/content/cota";

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

export const metadata: Metadata = {
  title: "COTA — Materia en transformación",
  description:
    "COTA es una empresa industrial argentina con más de 30 años de trayectoria en blanqueadores ópticos (tetrasulfónicos, hexasulfónicos, antraquinona), bobinas de papel Tissue y soluciones industriales. Planta propia en Naschel, San Luis.",
};

// schema.org — sólo datos verificados de lib/content/cota.ts, nada de
// certificaciones/reseñas/ratings (esos campos de LocalBusiness quedan
// afuera hasta tener algo real que declarar).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: cota.legalName,
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
