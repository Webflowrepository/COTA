import type { Metadata } from "next";
import { Big_Shoulders, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import SmoothScrollProvider from "@/lib/motion/SmoothScrollProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const display = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
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
    "COTA es una empresa industrial argentina con más de 30 años de trayectoria en químicos, papel y soluciones industriales. Planta en Naschel, ~700 T/mes de capacidad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SmoothScrollProvider>
          <Nav />
          {children}
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
