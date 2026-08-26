import { cota } from "@/lib/content/cota";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6" aria-hidden>
      <path
        fill="currentColor"
        d="M16.02 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.38 1.63 6.22L3.2 28.8l6.77-1.6a12.72 12.72 0 0 0 6.05 1.54c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.74-12.8-12.74Zm0 23.36a10.5 10.5 0 0 1-5.36-1.47l-.38-.23-4 .95.98-3.9-.25-.4a10.54 10.54 0 0 1-1.6-5.55c0-5.85 4.76-10.6 10.61-10.6s10.6 4.75 10.6 10.6-4.75 10.6-10.6 10.6Zm5.8-7.94c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.5-2.55-1.58-.94-.84-1.58-1.87-1.76-2.19-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.6c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.19-1.5-.08-.14-.29-.21-.61-.37Z"
      />
    </svg>
  );
}

export default function WhatsAppButton() {
  const href = cota.whatsapp.number ? `https://wa.me/${cota.whatsapp.number}` : undefined;

  return (
    <a
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      aria-disabled={!href}
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green text-paper shadow-lg transition-transform md:bottom-8 md:right-8 ${
        href ? "hover:scale-105" : "cursor-default opacity-60"
      }`}
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
