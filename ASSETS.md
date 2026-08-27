# Assets pendientes — COTA

## Arquitectura: single-page landing (vuelta atrás de multi-página)

El sitio pasó brevemente a multi-página (`/proceso`, `/papel-tissue`,
`/contacto` como rutas separadas) y luego volvió a una sola homepage — el
cliente pidió consolidar todo de nuevo en el landing. Estado actual:

- `/` es la única página. Incluye, en orden: Hero, Compañía, Proceso
  Industrial completo (las 6 etapas, scrollytelling horizontal — ya no hay
  versión resumida en un lado y completa en otra página), Químicos → Papel,
  especificaciones de Papel Tissue (`PapelTissueSpecs.tsx` — modelos de
  negocio, tabla de specs, catálogo de productos, Guardián), Familias de
  Producto, Soluciones por Aplicación, Planta Naschel, Contacto.
- `Nav.tsx` volvió a ser anclas simples (`#compania`, `#quimicos`, `#papel`,
  `#soluciones`, `#planta`, `#proceso`, `#contacto`) — se sacó la lógica de
  `usePathname()` que distinguía home de otras páginas, porque ya no hace
  falta.
- Como la página ahora es más larga (todo el contenido en un solo scroll),
  se agregaron varios links "Ir al formulario →" que saltan directo a
  `#contacto` (en Compañía, dos en Papel Tissue, en Familias de Producto,
  en Soluciones, y en Planta Naschel — 6 en total), además del link fijo
  "Contacto" del nav — para que no haya que scrollear todo el sitio a mano
  para llegar al formulario.
- `Footer.tsx` se mantuvo como componente global en `app/layout.tsx` (no
  volvió a vivir dentro de `Contact.tsx`) porque ya estaba mejor así
  independientemente del tema de rutas — sigue con fondo de foto real
  (`footer-planta-cenital.png`).

## Datos agregados en esta ronda (confirmados por el cliente)

- Especificaciones de bobinas: ancho 220/200 cm, diámetro 110/100 cm, cono interior 7,5 cm.
- 3 modelos de negocio de la línea de papel: Fabricación, Marca privada/terceros, Guardián.
- Catálogo de productos terminados (toallas en rollo, camilleros, bobinas de limpieza con precorte, toallas intercaladas, papel higiénico medio/alto metraje, servilletas extra blancas).
- Oficina comercial en San Isidro, Buenos Aires (distinta de la planta de Naschel).
- Los 700 T/mes son específicos de la línea de **Químicos**, no de la planta entera — se corrigió el label en `NaschelPlant.tsx` (antes decía "Capacidad de producción" genérico).
- Servicio de autoelevadores y embalajes, y abastecimiento a la industria de la limpieza (línea Químicos).
- Categoría de contacto "Consulta general" agregada al formulario.

**Sigue sin confirmar** (no inventado): capacidad de producción específica de
papel Tissue — el documento fuente de esta ronda lo señala explícitamente
como pendiente de verificar con COTA, así que no se agregó ningún número.

Este sitio usaba **placeholders limpios** (`components/visuals/PlaceholderMedia.tsx`)
en los lugares sin foto real. Hubo una vuelta de más/menos precisión que vale
la pena documentar porque puede repetirse:

1. Primero se usaron las fotos reales solo con precisión de contenido (una
   foto de tanques solo donde el texto hablaba de tanques), dejando
   placeholder donde nada coincidía exactamente.
2. El cliente pidió que no quedara ningún hueco vacío, así que se reutilizaron
   fotos reales de la planta también donde no coincidían con precisión
   (una foto del portón ilustrando "Fabricación de Papel Tissue", un primer
   plano del logo ilustrando "Guardián").
3. El cliente señaló que esas fotos reutilizadas **se veían sin relación con
   lo que decía el texto al lado** — pidió imágenes acordes o generarlas.
   Se hizo una nueva búsqueda de stock (Pexels) específica para bobinas/papel
   Tissue industrial y esta vez sí apareció una foto real que encaja
   (`papel-produccion.jpeg` — línea de producción con bobinas grandes,
   trabajador inspeccionando). Se usó donde encaja genuinamente; donde no
   había nada que encajara ni en las fotos de COTA ni en stock, **se volvió
   a placeholder en vez de forzar otra foto sin relación**.

Regla aplicada de acá en adelante: una foto (real o de stock) solo se usa si
efectivamente representa lo que dice el texto al lado. Si no hay ninguna que
encaje, mejor un placeholder honesto que una foto que "llene el hueco" pero
no tenga que ver.

| Archivo en `public/photos/` | Fuente | Contenido | Usado en |
|---|---|---|---|
| `hero-planta-aerea.png` | Foto real de COTA | Vista aérea al amanecer | Hero |
| `naschel-planta-aerea.png` | Foto real de COTA | Vista aérea al atardecer, portón/cartel COTA | Fondo de Planta Naschel; swatch/panel Soluciones; Proceso — etapa 06 Logística |
| `quimicos-tanques.png` | Foto real de COTA | Tanques de proceso, primer plano, cielo despejado | Capítulo Químicos; swatch/panel Químicos; segmento Papeleras y textiles |
| `proceso-tanques.png` | Foto real de COTA | Tanques de proceso, interior, tono oscuro | Proceso — etapa 02 Proceso Químico |
| `proceso-materia-prima.png` | Foto real de COTA | Tanques + edificio + avenida, luz de día | Proceso — etapa 01 Materia Prima |
| `footer-planta-cenital.png` | Foto real de COTA | Vista aérea cenital (90°) | Fondo del `Footer.tsx` |
| `papel-produccion.jpeg` | Stock Pexels (David Lehoczki, licencia libre) | Línea de producción, bobinas grandes de papel, trabajador inspeccionando | Swatch Papel (Compañía); capa Papel (Químicos→Papel); panel Bobinas (Familias de Producto); Proceso — etapa 03 Fabricación; segmento Convertidores (Soluciones) |

Quedan **3 de las 10 fotos de COTA sin usar** (dos primeros planos del
logo/cartel en la pared, una toma aérea con paisaje tipo meseta/desierto que
no coincide con San Luis) — no encajan con ningún contenido actual del
sitio; se guardan en `Images/` por si sirven para algo más adelante (redes,
material de marca, etc.).

**Sigue en placeholder, a propósito** (ni las fotos de COTA ni el stock
encontrado representan esto con precisión):
- Proceso — etapa 04 Rebobinado, etapa 05 Producto Terminado
- Panel Guardián (Familias de Producto) y segmento Distribuidores (Soluciones) — ambos necesitan mostrar el producto Guardián específico, no una foto genérica de fábrica

**Nota:** la sección standalone "Escala de Producción" (`ProductionScale.tsx`)
se eliminó — mostraba el mismo dato (700 T/mes) que ya aparece en Planta
Naschel, duplicado. El contador grande ("mega", mismo tratamiento tipográfico
que tenía esa sección) ahora vive del lado derecho de `NaschelPlant.tsx`,
junto al resto de los datos de la planta.

## Marca y color

El logo real ya está integrado (`public/logo-cota.png`, provisto por el
cliente — wordmark monocromático blanco, 327×80, pensado para fondo oscuro).
Se usa en el nav (con `filter: invert` cuando el fondo pasa a claro al
scrollear) y en el `Footer.tsx` global sin invertir, porque el footer ahora
tiene fondo oscuro (foto real + overlay), no fondo claro como antes.

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
