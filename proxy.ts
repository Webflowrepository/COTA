import { NextResponse, type NextRequest } from "next/server";

// URLs del sitio Joomla anterior de cota.com.ar que Google todavía tiene
// indexadas (ej. /index.php/es/la-empresa.html,
// /website/index.php?option=com_content&...). Sin esto daban 404 o un
// bloqueo de Vercel. Se redirige al inicio SIN el query string viejo: los
// parámetros tipo ?option=com_content son justamente lo que dispara el
// bloqueo, y un redirect de next.config los arrastraría al destino.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/index.php", "/index.php/:path*", "/website", "/website/:path*"],
};
