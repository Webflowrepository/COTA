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
    unit: "Tn/mes",
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
  /**
   * "Papel" es UNA sola división real (ver arriba, y StatsBand cuenta
   * businessLines.length = 3 divisiones reales de la empresa — ese número
   * no cambia). Para las secciones que muestran tarjetas/paneles por
   * línea de negocio (WhatCotaDoes, ProductFamilies), el cliente pidió
   * comunicar Papel como 2 conceptos separados — bobina para convertidores
   * (fabricantes) vs. producto ya convertido para distribución — porque
   * hoy se leían mezclados bajo un solo "Papel Tissue". Sólo separa el
   * relato, no crea una 4ta división real.
   */
  papelSplit: [
    {
      id: "bobinas-convertidores",
      label: "Bobinas Industriales",
      short: "Papel Tissue en bobina para convertidores y fabricantes.",
    },
    {
      id: "conversion-integrada",
      label: "Conversión Integrada",
      short: "Papel Tissue convertido, listo para distribución.",
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
    /** Gramaje por tipo de producto — confirmado por el cliente. El resto
     * de combinaciones ("alternativas") se maneja por consulta directa,
     * no se lista acá para no dar a entender que es un catálogo cerrado. */
    gramajes: [
      { label: "Higiénico", value: "18 g" },
      { label: "Rollo de cocina (toalla)", value: "19 g" },
      { label: "Toalla", value: "30 g" },
    ],
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
      label: "Marca para Terceros",
      short: '"Tu nombre, tu logo" — producto terminado fabricado bajo la marca del cliente o de un tercero.',
    },
    {
      id: "guardian",
      label: "Guardián",
      short: "Línea propia de COTA, con apoyo a distribuidores en todo el país.",
    },
  ],
  /**
   * Catálogo de productos terminados — confirmado por el cliente.
   * "Toallas en rollo" + "Camilleros" se muestran fusionados en una sola
   * tarjeta (mismo material en rollo, distinto formato/uso) — decisión
   * tomada junto con el cliente al rediseñar "Nuestros Productos": eran 6
   * productos pero uno quedaba sin tarjeta propia si no se fusionaba
   * ninguno, y separar los 6 en tarjetas iguales diluía la jerarquía.
   * Quedan 5 tarjetas. Subtítulos (formato/medida) provistos por el
   * cliente en esa misma conversación — no inventados.
   */
  finishedProducts: [
    {
      id: "toallas-rollo-camilleros",
      label: "Toallas de papel en rollo y camilleros",
      subtitle: "Múltiples formatos",
    },
    {
      id: "bobinas-limpieza",
      label: "Bobinas industriales de limpieza y multiuso con precorte",
      subtitle: "Gran absorción",
    },
    {
      id: "toallas-intercaladas",
      label: "Caja toallas de papel intercaladas",
      subtitle: "20cm x 24cm",
    },
    {
      id: "papel-higienico",
      label: "Papel higiénico de medio y alto metraje",
      subtitle: "Suavidad y rendimiento en cada rollo",
    },
    {
      id: "servilletas",
      label: "Caja servilletas extra blancas",
      subtitle: "Suaves y absorbentes",
    },
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
  /** Redes — Instagram siempre primero (pedido explícito del cliente).
   * LinkedIn y Facebook confirmadas con URL real. TikTok: el cliente dijo
   * que todavía no existe la cuenta — no se agrega hasta que haya un
   * link real (mismo criterio que se aplicó antes acá mismo). */
  social: [
    { name: "Instagram", href: "https://www.instagram.com/cota_papelera/" },
    // Probado con Playwright: tanto esta URL como la de /posts/?feedView=all
    // redirigen al mismo "authwall" de LinkedIn (pantalla de Registrarse) en
    // un navegador sin sesión iniciada — es el comportamiento propio de
    // LinkedIn para visitantes anónimos en páginas de empresa, no depende
    // de qué variante de URL se use. No se puede arreglar desde acá; se
    // deja la URL base (sin /posts), que es la correcta para quien sí
    // tenga sesión abierta.
    { name: "LinkedIn", href: "https://www.linkedin.com/company/cota-sa/" },
    { name: "Facebook", href: "https://www.facebook.com/p/Cota-SA-6157699516126" },
  ],
} as const;

export type BusinessLine = (typeof cota.businessLines)[number];
export type Service = (typeof cota.services)[number];
