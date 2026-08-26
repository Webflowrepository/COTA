# Assets pendientes — COTA

Este sitio se construyó con **placeholders limpios** (`components/visuals/PlaceholderMedia.tsx`)
en lugar de fotografía/video real, porque todavía no hay material de COTA
disponible. Cada placeholder preserva la composición exacta (tamaño, encuadre)
que va a ocupar el asset real, con una etiqueta chica en la esquina indicando
qué conseguir. Este archivo es la lista completa para producción/reemplazo.

## Por sección

| Sección | Componente | Asset real necesario | Formato sugerido |
|---|---|---|---|
| Hero | `components/sections/Hero.tsx` | Video loop 10–15s: rollo de papel en movimiento, vapor de proceso, o macro de material en transformación | Video 1920×1080+, muteado, loop, <8MB o servido optimizado |
| Proceso Industrial | `components/sections/IndustrialProcess.tsx` | Secuencia real de planta Naschel: materia prima, proceso químico, fabricación, rebobinado, producto terminado, logística (6 momentos) | 6 fotos o video corto por etapa, mismo encuadre/tono si es posible |
| Escala de Producción | `components/sections/ProductionScale.tsx` | Fondo de maquinaria/línea de producción en movimiento (opcional, puede quedar tipográfico) | Video o foto de línea de producción |
| Químicos → Papel | `components/sections/ChemicalsToPaper.tsx` | Macro de líquido químico (superficie, reacción) + macro de fibra de papel real | Foto macro alta resolución, iluminación controlada |
| Familias de Producto | `components/sections/ProductFamilies.tsx` | Foto por línea: químicos, papel, soluciones industriales | 3 fotos horizontales, mismo tratamiento de luz |
| Planta Naschel | `components/sections/NaschelPlant.tsx` | Fotografía/video real de la planta — fachada, infraestructura, escala física, de día (la sección usa un cielo claro, no nocturno) | Foto/video panorámico, luz de día |

## Marca y color

`app/globals.css` usa azul (`#2e3d96`) y verde (`#017130`) tomados del sitio
actual cota.com.ar (logo/plantilla). No se pudo leer el logo real en detalle
por bloqueo cross-origin al muestrear la imagen — si COTA tiene una guía de
marca o el logo en SVG/alta resolución, conviene reemplazar estos valores
aproximados por los oficiales.

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

## Formulario de contacto — limitación técnica

`components/sections/ContactForm.tsx` arma un `mailto:` con los datos
cargados (abre el cliente de correo del visitante). Funciona sin backend,
pero tiene las limitaciones típicas de mailto: depende de que el visitante
tenga un cliente de correo configurado, y no queda un registro del lead del
lado del servidor. Para un formulario que envíe el mail directamente y
guarde los leads, hace falta conectar un servicio (Resend, Formspree, o un
backend propio) — es una decisión de infraestructura, no de diseño, así que
la dejo para cuando definan qué servicio usar.
