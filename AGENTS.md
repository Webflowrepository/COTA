<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Instrucciones para la IA (Claude, Codex u otra)

## Con quién hablás

Las personas que te piden cambios son de **COTA S.A.** y **no son técnicas**.
Por eso:

- Hablá siempre en **español simple**. Nada de jerga ("commit", "build",
  "componente", "deploy") sin explicarla en palabras normales.
- Si el pedido es ambiguo, **preguntá antes de cambiar**. Si te mandan una
  captura, usala para ubicar la sección.
- Hacé **sólo lo que te pidieron**. No mejores, reordenes ni "limpies" otras
  partes de la web por tu cuenta.
- **No inventes datos.** Nada de números, clientes, certificaciones, premios,
  fechas o especificaciones que no te hayan dado. Si falta un dato, pedilo.

## Cómo trabajar

1. Ubicá qué archivo tocar con el mapa de abajo.
2. Hacé el cambio mínimo necesario.
3. Verificá que la web compila: `npm run build` tiene que terminar sin errores.
   Si falla, corregilo antes de seguir. Nunca entregues algo que no compila.
4. Publicá así: trabajá en una **rama nueva** y abrí un **Pull Request** hacia
   `main`. **Nunca** subas cambios directo a `main`, nunca uses `--force` y
   nunca borres ramas ni historial. Vercel genera solo una vista previa para el
   Pull Request.
5. Cerrá siempre con un mensaje corto, en este formato:
   - **Qué cambié:** en una o dos frases, en palabras normales.
   - **Cómo verlo:** el link de vista previa de Vercel (aparece en el Pull
     Request). Si todavía no está, decí que en 1–2 minutos aparece ahí.
   - **Cómo publicarlo:** "Si está bien, en el Pull Request tocá *Merge pull
     request* → *Confirm merge*. En 1–2 minutos queda en www.cota.com.ar."
   - **Cómo deshacerlo:** "Si no te gusta, decime y lo corrijo, o pedime que
     deshaga el cambio."

Si te piden **deshacer** un cambio ya publicado, hacé un revert de ese cambio
en una rama nueva y abrí un Pull Request (nunca reescribas el historial). Si la
web está rota y necesitan arreglarla ya, recordales la opción de la sección 5
del README (Instant Rollback en Vercel), que es instantánea.

## Mapa de la web

Orden de las secciones en la página (`app/page.tsx`), de arriba hacia abajo:

| Lo que ve la gente | Archivo |
|---|---|
| Menú de arriba | `components/nav/Nav.tsx` |
| Portada (video, "Líderes en la producción de papel Tissue") | `components/sections/Hero.tsx` |
| Banda de números (años, toneladas, etc.) | `components/sections/StatsBand.tsx` |
| Compañía / qué hace COTA (4 líneas de negocio) | `components/sections/WhatCotaDoes.tsx` |
| Bloque de foto grande "Papel" | `components/sections/ChemicalsToPaper.tsx` (`part="papel"`) |
| Papel Tissue: modelos de negocio, especificaciones de bobinas, productos, catálogos | `components/sections/PapelTissueSpecs.tsx` |
| "Un sistema industrial integrado" (paneles con foto) | `components/sections/ProductFamilies.tsx` |
| Bloque de foto grande "Químicos" | `components/sections/ChemicalsToPaper.tsx` (`part="quimicos"`) |
| Soluciones por perfil (Convertidores / Distribuidores / Papeleras) | `components/sections/SolutionsByApplication.tsx` |
| Planta Naschel (video) | `components/sections/NaschelPlant.tsx` |
| Contacto (mail, redes, catálogos, mapa) | `components/sections/Contact.tsx` |
| Pie de página | `components/footer/Footer.tsx` |
| Botón flotante de WhatsApp | `components/ui/WhatsAppButton.tsx` |

Datos que se repiten en varias partes — **cambialos siempre acá**, no en cada
sección por separado:

- `lib/content/cota.ts`: mail, teléfono, WhatsApp, redes sociales, año de
  fundación, ubicación de la planta, toneladas, líneas de negocio, productos,
  especificaciones de bobinas (anchos, diámetros, gramajes).

Otros archivos útiles:

- Catálogos PDF: `public/catalogos/`. Para reemplazar uno, guardá el PDF nuevo
  **con el mismo nombre de archivo** que el anterior; así no hay que tocar
  ningún link. Si cambia el nombre, actualizá los links en `Contact.tsx`,
  `PapelTissueSpecs.tsx` y `app/sitemap.ts`.
- Fotos: `public/photos/`. Videos: `public/videos/`.
- Título, descripción y nombre que muestra Google: `app/layout.tsx`.
- Dominio oficial (`www.cota.com.ar`): `lib/site.ts`.
- `proxy.ts`: redirige direcciones viejas (del sitio anterior y de Vercel) a la
  web actual. No lo saques.

## Cuidados con fotos y videos

- Antes de agregar una foto, achicala para web: ancho máximo ~2000 px y
  preferentemente `.jpg` o `.webp` de menos de 500 KB. Nombres de archivo en
  minúscula, sin espacios ni tildes (ej. `planta-naschel-2027.jpg`).
- Videos: comprimilos (ideal menos de 5 MB) antes de agregarlos.
- Siempre que agregues una imagen, escribí un texto alternativo (`alt`) que
  describa lo que se ve.
- Si te mandan una imagen generada por IA, avisá que la idea es usar fotos
  reales de COTA siempre que se pueda.
