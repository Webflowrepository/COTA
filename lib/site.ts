// URL pública del sitio (canonical, sitemap, datos estructurados). www es el
// host principal: cota.com.ar redirige a www.cota.com.ar en Vercel. Antes
// el default era cota-eta.vercel.app, y Google lo tomaba como la URL
// oficial y mostraba el sitio como "Vercel" en los resultados.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cota.com.ar";
