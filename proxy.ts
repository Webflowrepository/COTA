import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "www.cota.com.ar";

// Direcciones *.vercel.app de producción: servían el sitio completo como un
// sitio aparte, y Google las listaba como resultado propio con el nombre
// "Vercel". Se redirige todo a www.cota.com.ar para que exista un solo
// sitio. cota-eta = cuenta Vercel anterior; cota-sigma = cuenta de COTA.
// Sólo estas direcciones exactas: los deploys de prueba
// (cota-xxxx.vercel.app) siguen funcionando y Vercel ya les pone noindex.
const LEGACY_HOSTS = new Set(["cota-eta.vercel.app", "cota-sigma.vercel.app"]);

// URLs del sitio Joomla anterior que Google todavía tiene indexadas (ej.
// /index.php/es/la-empresa.html, /website/index.php?option=com_content&...).
// Responden 410 ("ya no existe"), no un redirect: con 410 Google las saca
// del índice, y es lo que exige la herramienta pública de Google "Quitar
// contenido desactualizado" para borrarlas sin acceso a Search Console. Con
// un redirect Google seguía mostrando el resultado viejo (etiquetado
// "Vercel"). La página igual ofrece el link al sitio nuevo.
const LEGACY_PATH = /^\/(index\.php|website)(\/|$)/;

const GONE_HTML = `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Esta página ya no existe — COTA S.A.</title></head>
<body style="font-family:system-ui,sans-serif;max-width:560px;margin:15vh auto;padding:0 24px;color:#0b0e1a">
<h1 style="font-size:28px">Esta página ya no existe</h1>
<p style="font-size:18px;line-height:1.5">El sitio de COTA S.A. se renovó.</p>
<p><a href="https://${CANONICAL_HOST}/" style="color:#017130;font-size:18px;font-weight:600">Ir a www.cota.com.ar →</a></p>
</body></html>`;

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") ?? "";

  if (LEGACY_HOSTS.has(host)) {
    url.protocol = "https";
    url.host = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  if (LEGACY_PATH.test(url.pathname)) {
    return new NextResponse(GONE_HTML, {
      status: 410,
      headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
