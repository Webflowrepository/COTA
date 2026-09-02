/**
 * Única fuente de verdad para datos verificados de COTA.
 * Fuentes: cota.com.ar (sitio actual) + brief provisto directamente por el cliente.
 * No agregar certificaciones, clientes, países, specs técnicas
 * o claims de sostenibilidad/liderazgo que no estén confirmados en alguna de esas dos fuentes.
 */

export const cota = {
  name: "COTA",
  legalName: "COTA S.A.",
  country: "Argentina",
  foundedYear: 1994,
  yearsOfOperation: new Date().getFullYear() - 1994,
  plant: {
    location: "Naschel, San Luis",
    postalCode: "5759",
    /** cota.com.ar (historia): instalación de la planta propia con capitales propios. */
    ownCapital: true,
  },
  /** Oficina comercial — distinta de la planta de producción en Naschel. */
  offices: {
    commercial: "San Isidro, Buenos Aires",
  },
  /** Distillado de la Misión real publicada en cota.com.ar ("Socios Estratégicos en Soluciones de Papel"). */
  mission: "Socios estratégicos en soluciones de papel.",
  production: {
    /** Capacidad de la línea de químicos/blanqueadores — no es la capacidad total de la planta. */
    chemicalsMonthlyTons: 700,
    /** No confirmado todavía por COTA — no inventar un número acá. */
    paperMonthlyTons: null as number | null,
    unit: "T/mes",
  },
  // Orden: Papel primero — el cliente pidió que el sitio no lea como una
  // fábrica solo de química, y la Misión real de COTA ("Socios estratégicos
  // en soluciones de papel") ya es papel-céntrica. Este orden se propaga
  // solo a todo lo que itera cota.businessLines (WhatCotaDoes.tsx, etc.).
  businessLines: [
    {
      id: "papel",
      label: "Papel Tissue",
      short: "Bobinas para convertidores y línea profesional Guardián.",
    },
    {
      id: "quimicos",
      label: "Químicos",
      short: "Blanqueadores ópticos para la industria papelera y textil, y abastecimiento a la industria de la limpieza.",
    },
    {
      id: "soluciones",
      label: "Soluciones Industriales",
      short: "Asesoramiento, logística, instalación de fábricas y venta de maquinaria de conversión.",
    },
  ],
  services: [
    {
      id: "asesoramiento",
      label: "Servicio y asesoramiento",
      short: "Asesoramiento especializado para papeleras que necesitan blanquear papel y pasta.",
    },
    {
      id: "bobinas",
      label: "Bobinas para convertidores",
      short: "Bobinas de papel de alta calidad para convertidores y rebobinadores.",
    },
    {
      id: "logistica",
      label: "Servicio de logística",
      short: "Logística, instalación de fábricas y venta de maquinaria de conversión.",
    },
    {
      id: "productos",
      label: "Productos finales",
      short: "Productos finales y asesoramiento a distribuidores en todo el país.",
    },
    {
      id: "autoelevadores",
      label: "Autoelevadores y embalajes",
      short: "Provisión de autoelevadores y soluciones de embalaje para la operación del cliente.",
    },
  ],
  /** Tipos de blanqueadores ópticos que produce COTA — provisto por el cliente. */
  chemicalTypes: ["Tetrasulfónicos", "Hexasulfónicos", "Antraquinona"],
  /**
   * Especificaciones técnicas de bobinas de papel Tissue.
   * Confirmadas por el cliente — no inventadas.
   */
  bobinaSpecs: {
    anchos: ["220 cm", "200 cm", "120 cm", "100 cm"],
    diametros: ["110 cm", "100 cm"],
    conoInterior: "7,5 cm",
  },
  /** Los 3 modelos de negocio bajo los que opera la línea de papel. */
  businessModels: [
    {
      id: "fabricacion",
      label: "Fabricación",
      short: "Producción de bobinas de papel Tissue a pedido, según las medidas que requiera el convertidor.",
    },
    {
      id: "marca-privada",
      label: "Marca privada / terceros",
      short: "Producto terminado fabricado bajo la marca del cliente o de un tercero.",
    },
    {
      id: "guardian",
      label: "Guardián",
      short: "Línea propia de COTA, con apoyo a distribuidores en todo el país.",
    },
  ],
  /** Catálogo de productos terminados — confirmado por el cliente. */
  finishedProducts: [
    "Toallas en rollo",
    "Camilleros",
    "Bobinas de limpieza con precorte",
    "Toallas intercaladas",
    "Papel higiénico de medio y alto metraje",
    "Servilletas extra blancas",
  ],
  /**
   * Guardián — línea profesional de producto terminado (papel Tissue),
   * dirigida a distribuidores. Marca real de COTA, confirmada por el cliente.
   * No hay fotografía de producto en alta resolución todavía — usar proxy visual.
   */
  guardian: {
    name: "Guardián",
    tagline: "Línea Profesional — Protector de Ambientes Limpios",
  },
  /** Categorías para el contacto segmentado — mismo canal real, asunto pre-completado por categoría. */
  contactCategories: [
    { id: "general", label: "Consulta general" },
    { id: "bobinas", label: "Bobinas para convertidores" },
    { id: "quimicos", label: "Blanqueadores y químicos" },
    { id: "distribucion", label: "Distribución — Guardián" },
    { id: "maquinaria", label: "Maquinaria y logística" },
  ],
  contact: {
    email: "ventaspapel@cota.com.ar",
    phone: "+54 9 11 3371 3283",
  },
  /** Mismo celular confirmado por el cliente para contacto — formato wa.me (solo dígitos, sin +). */
  whatsapp: {
    number: "5491133713283" as string | null,
    isPlaceholder: false,
  },
  /** Redes preparadas para activar más adelante — sin cuenta confirmada todavía. */
  socialPlaceholders: ["Instagram", "LinkedIn", "TikTok"],
} as const;

export type BusinessLine = (typeof cota.businessLines)[number];
export type Service = (typeof cota.services)[number];
