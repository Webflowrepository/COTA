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
  /** Distillado de la Misión real publicada en cota.com.ar ("Socios Estratégicos en Soluciones de Papel"). */
  mission: "Socios estratégicos en soluciones de papel.",
  production: {
    monthlyTons: 700,
    unit: "T/mes",
  },
  businessLines: [
    {
      id: "quimicos",
      label: "Químicos",
      short: "Blanqueadores ópticos para la industria papelera y textil.",
    },
    {
      id: "papel",
      label: "Papel Tissue",
      short: "Bobinas para convertidores y línea profesional Guardián.",
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
  ],
  /** Tipos de blanqueadores ópticos que produce COTA — provisto por el cliente. */
  chemicalTypes: ["Tetrasulfónicos", "Hexasulfónicos", "Antraquinona"],
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
    { id: "bobinas", label: "Bobinas para convertidores" },
    { id: "quimicos", label: "Blanqueadores y químicos" },
    { id: "distribucion", label: "Distribución — Guardián" },
    { id: "maquinaria", label: "Maquinaria y logística" },
  ],
  contact: {
    email: "comercial@cota.com.ar",
    phone: "+54 9 11 3371 3283",
  },
  /** PLACEHOLDER — no se proveyó un número de WhatsApp Business todavía. */
  whatsapp: {
    number: null as string | null,
    isPlaceholder: true,
  },
  /** Redes preparadas para activar más adelante — sin cuenta confirmada todavía. */
  socialPlaceholders: ["TikTok", "LinkedIn"],
} as const;

export type BusinessLine = (typeof cota.businessLines)[number];
export type Service = (typeof cota.services)[number];
