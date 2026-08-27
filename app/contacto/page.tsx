import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contacto — COTA",
  description:
    "Contactá a COTA para consultas comerciales, bobinas de papel Tissue, blanqueadores químicos, distribución Guardián o maquinaria de conversión.",
};

export default function ContactoPage() {
  return (
    <main className="flex-1">
      <Contact />
    </main>
  );
}
