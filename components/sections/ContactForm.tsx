"use client";

import { useState, type FormEvent } from "react";
import { cota } from "@/lib/content/cota";

const inputClass =
  "w-full border-b border-line-on-light bg-transparent py-2.5 text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-ink";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState<string>(cota.contactCategories[0].id);
  const [volume, setVolume] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const categoryLabel = cota.contactCategories.find((c) => c.id === category)?.label ?? category;
    const subject = `Consulta — ${categoryLabel}`;
    const bodyLines = [
      `Nombre: ${name}`,
      `Empresa: ${company}`,
      `Email: ${email}`,
      `Teléfono: ${phone}`,
      `Producto de interés: ${categoryLabel}`,
      volume && `Volumen estimado: ${volume}`,
      "",
      message,
    ].filter(Boolean);
    const mailto = `mailto:${cota.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg border-t border-line-on-light pt-6 md:border-t-0 md:pt-0">
      <span className="font-label mb-8 block text-ink/45">Solicitar asesoramiento</span>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="font-label mb-2 block text-ink/45">Nombre</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Su nombre"
          />
        </label>

        <label className="block">
          <span className="font-label mb-2 block text-ink/45">Empresa</span>
          <input
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
            placeholder="Nombre de la empresa"
          />
        </label>

        <label className="block">
          <span className="font-label mb-2 block text-ink/45">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="su@empresa.com"
          />
        </label>

        <label className="block">
          <span className="font-label mb-2 block text-ink/45">Teléfono</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="Opcional"
          />
        </label>

        <label className="block">
          <span className="font-label mb-2 block text-ink/45">¿Qué necesita?</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            {cota.contactCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="font-label mb-2 block text-ink/45">Volumen estimado</span>
          <input
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className={inputClass}
            placeholder="ej. 5 T/mes"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="font-label mb-2 block text-ink/45">Mensaje</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Cuéntenos brevemente qué necesita"
          />
        </label>
      </div>

      <button
        type="submit"
        className="font-label mt-8 border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
      >
        Solicitar asesoramiento <span className="cta-arrow">→</span>
      </button>
      <p className="font-label mt-4 text-ink/35">Se abre su cliente de correo con la consulta pre-cargada.</p>
    </form>
  );
}
