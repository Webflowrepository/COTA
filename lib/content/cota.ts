/**
 * Única fuente de verdad para datos verificados de COTA.
 * Verificado contra cota.com.ar (sitio actual de la empresa).
 * No agregar certificaciones, clientes, países, specs técnicas
 * o claims de sostenibilidad/liderazgo que no estén confirmados ahí.
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
  },
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
      short: "Fabricación de bobinas de papel Tissue en planta propia.",
    },
    {
      id: "soluciones",
      label: "Soluciones Industriales",
      short: "Asesoramiento, logística e instalación de fábricas para convertidores.",
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
  contact: {
    email: "comercial@cota.com.ar",
    phone: "+54 9 11 3371 3283",
  },
} as const;

export type BusinessLine = (typeof cota.businessLines)[number];
export type Service = (typeof cota.services)[number];
