# Assets pendientes — COTA

Este sitio se construyó con **placeholders limpios** (`components/visuals/PlaceholderMedia.tsx`)
en lugar de fotografía/video real, porque todavía no hay material de COTA
disponible. Cada placeholder preserva la composición exacta (tamaño, encuadre)
que va a ocupar el asset real, con una etiqueta chica en la esquina indicando
qué conseguir. Este archivo es la lista completa para producción/reemplazo.

## Fotografía stock ya integrada (reemplaza al placeholder)

Se sumaron 3 fotos reales de stock con licencia libre para uso comercial
(Pexels — no requiere atribución), guardadas en `public/photos/` en su
resolución original. Las tres son del **mismo fotógrafo** (Igor Passchier,
serie de puerto/planta industrial en Rotterdam a la hora azul/dorada) a
propósito — mismo tratamiento de luz y color en todo el sitio en vez de fotos
sueltas de fuentes distintas, que es lo que generaba el "revoltijo" que el
cliente señaló (la primera versión de Químicos era un macro abstracto de
tinta que no encajaba con el resto — se reemplazó). Son imágenes
**genéricas** (atmósfera industrial real, pero no la planta de COTA) — el
`alt` de cada una es deliberadamente genérico:

| Sección | Componente | Archivo | Contenido |
|---|---|---|---|
| Hero | `components/sections/Hero.tsx` | `public/photos/hero-planta-atardecer.jpeg` (5472×3648) | Planta industrial vertical a la hora azul, Zuid-Holland |
| Químicos | `components/sections/ChemicalsToPaper.tsx` | `public/photos/quimicos-planta.jpeg` (4834×3223) | Refinería con vapor a la hora azul, Rotterdam |
| Soluciones Industriales | `components/sections/WhatCotaDoes.tsx`, `components/sections/ProductFamilies.tsx` | `public/photos/soluciones-puerto.jpeg` (3080×2053) | Grúas pórtico de puerto al atardecer, Rotterdam |

No se buscó una foto para **Papel** (Tissue): las opciones libres encontradas
siguen siendo cartón corrugado (no tissue) o rollos de baño de calidad baja —
mejor mantener el placeholder ahí que forzar una imagen que no representa
bien el producto ni respeta el patrón visual del resto.

## Sigue en placeholder (a propósito)

| Sección | Componente | Por qué sigue en placeholder |
|---|---|---|
| Proceso Industrial | `components/sections/IndustrialProcess.tsx` | Reclama ser la secuencia real de la planta de Naschel (materia prima → producto terminado) — una foto de stock ahí sería engañosa, no solo genérica. |
| Planta Naschel | `components/sections/NaschelPlant.tsx` | Misma razón — la sección afirma mostrar la fachada/infraestructura real de Naschel. |
| Papel Tissue | `components/sections/ChemicalsToPaper.tsx` (capa papel), `components/sections/ProductFamilies.tsx` (panel Bobinas/Guardián), `components/sections/WhatCotaDoes.tsx` (swatch Papel) | No se encontró stock libre que represente bien papel Tissue (ver arriba). |

**Nota:** la sección standalone "Escala de Producción" (`ProductionScale.tsx`)
se eliminó — mostraba el mismo dato (700 T/mes) que ya aparece en Planta
Naschel, duplicado. El contador grande ("mega", mismo tratamiento tipográfico
que tenía esa sección) ahora vive del lado derecho de `NaschelPlant.tsx`,
junto al resto de los datos de la planta.

## Marca y color

El logo real ya está integrado (`public/logo-cota.png`, provisto por el
cliente — wordmark monocromático blanco, 327×80, pensado para fondo oscuro).
Se usa en el nav (con `filter: invert` cuando el fondo pasa a claro al
scrollear) y en el cierre del formulario de contacto.

`app/globals.css` usa un único acento de marca: verde (`#017130`), tomado del
sitio actual cota.com.ar (antes había también un azul de acento que no se
correspondía con la identidad real del sitio — se sacó, todo el acento del
sitio es ahora ese mismo verde). El logo provisto es monocromático, así que
no confirma el hex exacto. Si tenés una guía de marca con el código oficial,
reemplazo este valor aproximado. Si consiguen el logo también en versión SVG
o a color, mejor aún — el PNG actual es rasterizado.

## Datos de contacto

`lib/content/cota.ts` — email y teléfono son los reales de cota.com.ar
(`comercial@cota.com.ar`, `+54 9 11 3371 3283`). Confirmar que sigan vigentes
antes de publicar.

## Contenido pendiente (no solo media)

- **Soluciones por aplicación**: no hay segmentos/industrias de cliente
  verificados más allá de "convertidores y distribuidores" (mencionados en
  cota.com.ar). La sección `SolutionsByApplication` está marcada como
  contenido a definir — no se inventaron verticales adicionales.
- **Historia**: fundación confirmada en 1994 (cota.com.ar). No hay más hitos
  intermedios verificados — el timeline queda en dos puntos (origen/hoy)
  a propósito.
- **Especificaciones técnicas de papel Tissue** (gramaje, ancho, aplicaciones):
  no verificadas — no se incluyeron valores inventados.

## Contenido para generar leads (prueba social — no inventado a propósito)

El sitio ya tiene la mecánica de conversión (formulario en Contacto, CTAs
"Solicitar ficha técnica" en cada línea de producto, WhatsApp flotante). Lo
que falta es **contenido real que no puedo fabricar** sin arriesgar que el
sitio afirme algo falso sobre COTA:

- **Casos de éxito / testimonios de clientes** — ninguno verificado. No se
  inventaron citas ni resultados ("aumentó su producción un 30%", etc.).
- **Logos de clientes** — cota.com.ar no lista clientes con permiso de uso.
  Si tenés autorización de alguno, mandalos y los sumo como prueba social.
- **Certificaciones** (ISO, calidad) — no verificadas, no incluidas.
- **Fichas técnicas / hojas de seguridad descargables (PDF)** — los CTAs
  "Solicitar ficha técnica" hoy abren un mailto pre-completado porque no
  existe el PDF real todavía. En cuanto tengas las fichas, cambio el link
  para que descarguen el PDF directo.
- **Artículos técnicos para SEO** (ej. "diferencia entre blanqueadores
  tetrasulfónicos y hexasulfónicos", "cómo elegir gramaje de bobina") — esto
  requiere afirmaciones técnicas de química/papel que solo alguien de COTA
  puede validar. No voy a redactar contenido técnico especializado sin
  revisión de un experto de la empresa.

## Evaluación del informe comparativo con la competencia

Se recibió un informe que cruzaba (a) contenido presente en cota.com.ar pero
ausente en el sitio nuevo, y (b) prácticas de competidores (Celulosa Pilar,
Celulosa Argentina, Argen-Pel, Carvalheira). Se aplicó el mismo criterio de
siempre: sumar lo verificado, declinar lo que requeriría inventar datos de
COTA.

**Incorporado (dato real de cota.com.ar, ya estaba verificado en esta sesión
pero no se veía en el sitio):**
- Misión distillada ("Socios estratégicos en soluciones de papel") — en
  `WhatCotaDoes.tsx`.
- Mención a industria textil en el Hero (`Hero.tsx`) — ya estaba en el
  business line de Químicos, pero no en la primera pantalla.
- "Venta de maquinaria de conversión" explícita en el business line de
  Soluciones Industriales (`lib/content/cota.ts`) — antes solo aparecía en
  `services.logistica`, quedaba diluido.
- "Apoyo a distribuidores en todo el país" en el segmento Distribuidores de
  `SolutionsByApplication.tsx`.
- "Instalación realizada con capitales propios" en `NaschelPlant.tsx` — dato
  real de la sección de historia de cota.com.ar.

**Declinado explícitamente (compararía a COTA con datos de otra empresa, o
afirmaría algo no confirmado):**
- **Especificaciones técnicas duras** (gramaje, ancho, diámetro de bobina):
  los números que cita el informe son de Celulosa Pilar, no de COTA. No se
  agregó ninguna tabla de specs con valores inventados — sigue documentado
  arriba como pendiente real.
- **Sección de sostenibilidad/ambiente** (tratamiento de efluentes,
  reutilización de desperdicios): son claims de competidores. COTA no tiene
  ningún dato ambiental verificado en cota.com.ar ni provisto por el cliente
  — no se agregó.
- **Promesas de stock/entrega puntual (48/72hs)**: es un compromiso de
  servicio de Celulosa Pilar. Publicarlo para COTA sin confirmación sería un
  compromiso comercial falso, no solo un error de copy.
- **Control de calidad visible** ("cada bobina pasa control de gramaje,
  humedad y resistencia"): describe el proceso de un competidor, no un
  proceso confirmado de COTA.
- **E-commerce / portal de pedidos**: es una decisión de infraestructura
  (backend, catálogo, pagos), no de contenido — fuera de alcance de este
  rediseño de sitio institucional.

Si en algún momento tenés estos datos reales de COTA (specs de producto,
certificaciones ambientales, SLA de entrega), los sumo de inmediato — el
límite fue siempre "no inventar", no "no quiero mostrarlo".

## Formulario de contacto — limitación técnica

`components/sections/ContactForm.tsx` arma un `mailto:` con los datos
cargados (abre el cliente de correo del visitante). Funciona sin backend,
pero tiene las limitaciones típicas de mailto: depende de que el visitante
tenga un cliente de correo configurado, y no queda un registro del lead del
lado del servidor. Para un formulario que envíe el mail directamente y
guarde los leads, hace falta conectar un servicio (Resend, Formspree, o un
backend propio) — es una decisión de infraestructura, no de diseño, así que
la dejo para cuando definan qué servicio usar.
