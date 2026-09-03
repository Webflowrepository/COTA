"use client";

import { useEffect, useState } from "react";
import { cota } from "@/lib/content/cota";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export default function WhatsAppButton() {
  const href = cota.whatsapp.number ? `https://wa.me/${cota.whatsapp.number}` : undefined;

  // El botón flotante se oculta al llegar al footer — pedido explícito: no
  // tapar el footer con el CTA sticky. Antes esto sólo pasaba en mobile
  // (se asumía que en desktop el botón era chico respecto al layout y no
  // molestaba), pero el cliente mostró que en desktop también queda
  // superpuesto sobre el footer — se aplica el mismo ocultamiento en
  // ambos tamaños ahora.
  const [hideAtFooter, setHideAtFooter] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setHideAtFooter(entry.isIntersecting), {
      rootMargin: "0px",
      threshold: 0.05,
    });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      aria-disabled={!href}
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green text-paper shadow-lg transition-[transform,opacity] md:bottom-8 md:right-8 ${
        href ? "hover:scale-105" : "cursor-default opacity-60"
      } ${hideAtFooter ? "pointer-events-none translate-y-24 opacity-0" : ""}`}
      title={href ? "Escribinos por WhatsApp" : "WhatsApp — número pendiente de confirmar"}
    >
      <WhatsAppIcon />
      {!href && (
        <span className="placeholder-tag absolute -top-5 right-0 whitespace-nowrap text-ink/50">
          número pendiente
        </span>
      )}
    </a>
  );
}
