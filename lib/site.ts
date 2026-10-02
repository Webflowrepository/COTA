// URL pública del sitio. Cargar NEXT_PUBLIC_SITE_URL en Vercel cuando el sitio
// pase al dominio definitivo (ej. https://cota.com.ar); mientras tanto usa la
// URL de Vercel.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cota-eta.vercel.app";
