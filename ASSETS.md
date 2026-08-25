# Assets pendientes — COTA

Este sitio se construyó con **proxies visuales generativos** (CSS/SVG — fibra,
líquido, vapor, rodillos) en lugar de fotografía/video real, porque todavía no
hay material de COTA disponible. Los proxies existen para validar composición,
escala, contraste, tipografía y coreografía de scroll — no pretenden ser
fotografía real.

Cada proxy tiene una etiqueta de desarrollo (`DevTag`, texto pequeño en la
esquina, baja opacidad) indicando qué reemplazar. Este archivo es la lista
completa para producción/reemplazo.

## Por sección

| Sección | Componente | Asset real necesario | Formato sugerido |
|---|---|---|---|
| Hero | `components/sections/Hero.tsx` | Video loop 10–15s: rollo de papel en movimiento, vapor de proceso, o macro de material en transformación | Video 1920×1080+, muteado, loop, <8MB o servido optimizado |
| Proceso Industrial | `components/sections/IndustrialProcess.tsx` | Secuencia real de planta Naschel: materia prima, proceso químico, fabricación, rebobinado, producto terminado, logística (6 momentos) | 6 fotos o video corto por etapa, mismo encuadre/tono si es posible |
| Escala de Producción | `components/sections/ProductionScale.tsx` | Fondo de maquinaria/línea de producción en movimiento (opcional, puede quedar tipográfico) | Video o foto de línea de producción |
| Químicos → Papel | `components/sections/ChemicalsToPaper.tsx` | Macro de líquido químico (superficie, reacción) + macro de fibra de papel real | Foto macro alta resolución, iluminación controlada |
| Familias de Producto | `components/sections/ProductFamilies.tsx` | Foto por línea: químicos, papel, soluciones industriales | 3 fotos horizontales, mismo tratamiento de luz |
| Planta Naschel | `components/sections/NaschelPlant.tsx` | Fotografía/video real de la planta — fachada, infraestructura, escala física | Foto/video panorámico, preferentemente al atardecer o con buena luz industrial |

## Datos de contacto

`lib/content/cota.ts` — el email de contacto es un placeholder
(`contacto@cota.com.ar`, `isPlaceholder: true`). Reemplazar por el canal real
antes de publicar.

## Contenido pendiente (no solo media)

- **Soluciones por aplicación**: no hay segmentos/industrias de cliente
  verificados. La sección `SolutionsByApplication` está marcada como
  contenido a definir — no se inventaron verticales.
- **Historia**: no hay año de fundación confirmado. `History.tsx` marca el
  origen como "año a confirmar".
- **Especificaciones técnicas de papel** (gramaje, ancho, aplicaciones): no
  verificadas — no se incluyeron valores inventados.
