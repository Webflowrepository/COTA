import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "www.cota.com.ar";

// Dirección vieja de Vercel: servía el sitio completo como un sitio aparte,
// y Google la listaba como resultado propio con el nombre "Vercel". Se
// redirige todo a www.cota.com.ar para que exista un solo sitio. Sólo esta
// dirección exacta: los deploys de prueba (cota-xxxx.vercel.app) siguen
// funcionando y Vercel ya les pone noindex.
const LEGACY_HOSTS = new Set(["cota-eta.vercel.app"]);

// URLs del sitio Joomla anterior que Google todavía tiene indexadas (ej.
// /index.php/es/la-empresa.html, /website/index.php?option=com_content&...).
// Se mandan al inicio SIN el query string viejo: los parámetros tipo
// ?option=com_content son justamente lo que disparaba el bloqueo de Vercel.
const LEGACY_PATH = /^\/(index\.php|website)(\/|$)/;

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") ?? "";

  if (LEGACY_HOSTS.has(host)) {
    url.protocol = "https";
    url.host = CANONICAL_HOST;
    url.port = "";
    if (LEGACY_PATH.test(url.pathname)) {
      url.pathname = "/";
      url.search = "";
    }
    return NextResponse.redirect(url, 308);
  }

  if (LEGACY_PATH.test(url.pathname)) {
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
