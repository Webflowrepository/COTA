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
4. `papel-produccion.jpeg` terminó reutilizada en 5 lugares — el cliente
   notó que se repetía muy seguido en el scroll (Familias de Producto →
   Soluciones, dos secciones seguidas, mostraban la misma foto). Se buscó
   una segunda foto de stock específica para "rebobinado" y apareció
   `proceso-rebobinado.jpeg` (Pexels, Dmitriy Steinke — rebobinadora
   industrial con bobinas grandes entrando a la máquina), que además encaja
   mejor que la anterior en dos lugares puntuales: Proceso — etapa 04
   Rebobinado (coincidencia directa con el título de la etapa) y el
   segmento Convertidores de `SolutionsByApplication.tsx` (que ya hablaba
   de "bobinas listas para su línea de conversión"). Se buscó también un
   match para "Producto Terminado" (rollos de papel apilados/embalados);
   no apareció nada con el registro visual industrial del resto del sitio
   — los resultados eran o decorativos (rollos de tela de colores) o de
   estética "lifestyle" desenfocada, ninguno de los dos encaja — sigue en
   placeholder, a propósito, no forzado.

Regla aplicada de acá en adelante: una foto (real o de stock) solo se usa si
efectivamente representa lo que dice el texto al lado. Si no hay ninguna que
encaje, mejor un placeholder honesto que una foto que "llene el hueco" pero
no tenga que ver.

5. **Ronda de revisión del cliente (documento "A revisar") — se sacaron 2 de
   las 2 fotos de stock y 1 foto de COTA por no representar a la empresa.**
   El cliente miró el sitio en detalle y marcó 3 fotos como problemáticas,
   con motivos distintos:
   - `papel-produccion.jpeg` — "hay miles de rollitos chiquitos en una
     cinta, esa no es representativa". Es la foto de stock (Pexels, David
     Lehoczki) que además muestra a un fotógrafo de espaldas en el
     encuadre — nunca fue ideal, se sacó de las 4 secciones donde vivía
     (swatch Papel en Compañía, capa Papel en Químicos→Papel, panel
     Bobinas en Familias de Producto, Proceso — etapa 03) y se volvió a
     `PlaceholderMedia` en las 4.
   - `proceso-rebobinado.jpeg` — "se nota que no somos nada que ver". Es la
     otra foto de stock (Pexels, Dmitriy Steinke) — bobinas industriales
     reales pero de otra fábrica, con una estética (soportes celestes,
     carteles en otro idioma) que no se parece en nada a la planta real de
     COTA. Se sacó de Proceso — etapa 04 y del segmento Convertidores
     (Soluciones), vuelta a `PlaceholderMedia` en ambas.
   - `footer-planta-cenital.png` — el cliente la identificó como "otra foto
     rara... está desde el aire, pero no es la portada... no tiene nada que
     ver", sin saber que ya se había flageado antes por dentro (ver más
     abajo) como una de las fotos "reales" de COTA con tells de generación
     por IA: comparada con `hero-planta-aerea.png` y
     `naschel-planta-aerea.png` (mismos techos blancos con detalle verde,
     misma arquitectura), esta muestra techos completamente verdes y una
     distribución de edificios distinta — no es la misma planta. Se sacó
     del fondo del `Footer.tsx` (global, en todas las páginas) y se
     reemplazó por `naschel-planta-aerea.png`, ya usada y consistente en
     el resto del sitio. **El archivo se conserva en `public/photos/` por
     si el cliente confirma que es real y hay que reintegrarla, pero no se
     debería volver a usar sin esa confirmación explícita — no pasó el
     control de consistencia dos veces.**

   Las 2 fotos de stock quedaron completamente fuera del sitio (0 usos) —
   ver la tabla actualizada abajo. Después de esta ronda, **6 de las 9
   secciones que antes tenían foto real ahora están en placeholder
   honesto**, a la espera de fotos reales de COTA que sí representen lo que
   describen: máquina papelera en producción, rebobinadora industrial,
   bobina de papel Tissue (genérica).

Regla aplicada de acá en adelante: una foto (real o de stock) solo se usa si
efectivamente representa lo que dice el texto al lado. Si no hay ninguna que
encaje, mejor un placeholder honesto que una foto que "llene el hueco" pero
no tenga que ver. **Esto ahora incluye fotos "reales" de COTA con tells de
IA que el cliente mismo puede detectar como ajenas** — no alcanza con que el
archivo venga del cliente, también tiene que superar la prueba de "¿esto se
parece a la planta real?".

6. **Las 5 fotos "papel/bobinas" que faltaban llegaron por WhatsApp — 4 se
   usaron, 1 quedó afuera.** El cliente había mandado por audio que ya
   tenía fotos reales de "la típica bobina arriba de un pallet" — aparecieron
   como 5 archivos nuevos en `Images/` (`WhatsApp Image 2026-09-01...`).
   Se revisaron una por una:
   - Máquina de papel Tissue produciendo toallas apiladas → copiada a
     `papel-produccion-tissue.jpeg`, usada en Proceso — etapa 03
     "Fabricación de Papel Tissue".
   - Bobina en máquina rebobinadora, brazo de operario visible (no la cara)
     → `proceso-rebobinado-real.jpeg`, usada en Proceso — etapa 04
     "Rebobinado".
   - Depósito con filas de bobinas grandes en pallets, carteles "TB30",
     sin personas → `bobinas-deposito.jpeg`, la más versátil — usada como
     swatch Papel (Compañía), capa Papel (Químicos→Papel) y segmento
     Convertidores (Soluciones).
   - Dos personas caminando junto a bobinas de 220 cm en pallets afuera de
     la planta (el "típico" pedido en el audio) → `bobinas-pallet-220cm.jpeg`,
     usada en el panel "Bobinas Industriales" de Familias de Producto. Tiene
     2 personas identificables en cuadro — el cliente la mandó a propósito
     como LA foto representativa, así que se usó tal cual; avisar si
     prefieren una versión recortada/sin personas más adelante.
   - La 5ª imagen es un **gráfico de marketing ya armado** (logo COTA +
     "Papel Tissue para cada necesidad" + "100% EXTRA BLANCO" + fotos de
     producto, todo con texto incrustado) — no se usó como foto de fondo de
     ninguna sección: el sitio arma toda su tipografía en código, no con
     texto incrustado en la imagen, y el claim "100% EXTRA BLANCO" no está
     verificado como para mostrarlo. Queda en `Images/` — puede servir tal
     cual para redes sociales en vez de para el sitio.

   Con esto, **las 5 secciones "papel/bobinas" que estaban en placeholder
   después de sacar las fotos de stock (punto 5) ahora tienen foto real**.
   Sigue pendiente únicamente: foto de productos terminados (toallas,
   camilleros, etc. — no hay ninguna en las que mandaron) y confirmar si
   `footer-planta-cenital.png` es real o se descarta del todo.

| Archivo en `public/photos/` | Fuente | Contenido | Usado en |
|---|---|---|---|
| `hero-planta-aerea.png` | Foto real de COTA | Vista aérea al amanecer | Hero |
| `naschel-planta-aerea.png` | Foto real de COTA | Vista aérea al atardecer, portón/cartel COTA | Fondo de Planta Naschel; swatch/panel Soluciones; Proceso — etapa 06 Logística; fondo del `Footer.tsx` |
| `quimicos-tanques.png` | Foto real de COTA | Tanques de proceso, primer plano, cielo despejado | Capítulo Químicos; swatch/panel Químicos; segmento Papeleras y textiles |
| `proceso-tanques.png` | Foto real de COTA | Tanques de proceso, interior, tono oscuro | Proceso — etapa 02 Proceso Químico |
| `proceso-materia-prima.png` | Foto real de COTA | Tanques + edificio + avenida, luz de día | Proceso — etapa 01 Materia Prima |
| `papel-produccion-tissue.jpeg` | Foto real de COTA (WhatsApp) | Máquina de papel Tissue, toallas apiladas en producción | Proceso — etapa 03 Fabricación |
| `proceso-rebobinado-real.jpeg` | Foto real de COTA (WhatsApp) | Bobina en máquina rebobinadora | Proceso — etapa 04 Rebobinado |
| `bobinas-deposito.jpeg` | Foto real de COTA (WhatsApp) | Depósito, filas de bobinas grandes en pallets, sin personas | Swatch Papel (Compañía); capa Papel (Químicos→Papel); segmento Convertidores (Soluciones) |
| `bobinas-pallet-220cm.jpeg` | Foto real de COTA (WhatsApp) | Bobina de 220cm en pallet, 2 personas en cuadro | Panel Bobinas Industriales (Familias de Producto) |

`footer-planta-cenital.png` (foto de COTA con tells de IA) no se usa — ver
punto 5. Las fotos de stock Pexels descartadas (punto 5) se borraron de
`public/photos/` directamente, ya no están ni sin usar.

Quedan **3 de las 10 fotos originales de COTA sin usar** (dos primeros
planos del logo/cartel en la pared, una toma aérea con paisaje tipo
meseta/desierto que no coincide con San Luis) — no encajan con ningún
contenido actual del sitio; se guardan en `Images/` por si sirven para algo
más adelante (redes, material de marca, etc.).

## Fotos reales pendientes (pedidas explícitamente por el cliente)

- **Productos terminados** (toallas en rollo, camilleros, servilletas, etc.)
  — hoy el catálogo en `PapelTissueSpecs.tsx` es solo texto, sin ninguna
  foto de producto. Ninguna de las fotos recibidas hasta ahora sirve para
  esto — son todas de proceso/bobina, no de producto de góndola/venta.
- Confirmar si `footer-planta-cenital.png` es una foto real (y de qué
  ángulo/fecha) o si hay que descartarla definitivamente — ver punto 5.

## Redes sociales — Instagram confirmado, falta LinkedIn

`Footer.tsx` y `Contact.tsx` muestran íconos SVG (no texto plano) para
Instagram, LinkedIn y TikTok — ver `cota.social` en `lib/content/cota.ts`
(antes `socialPlaceholders`, un array de strings; ahora `{name, href}[]`
para poder cargar el link real de cada uno de forma independiente).
**Instagram real, confirmado por el cliente:**
`https://www.instagram.com/cota_papelera/` — ya es un `<a>` funcional en
Footer, en los 3 íconos de Contacto, y en `sameAs` del schema.org
(`app/layout.tsx`). LinkedIn y TikTok siguen con `href: null` — quedan
como `<span>` con tooltip "próximamente" hasta que el cliente pase esos
links. Cuando lleguen, es un solo cambio en `cota.social` — ya no hace
falta tocar los componentes.

## Catálogos descargables (PDF) — pendiente

El cliente pidió botones de descarga de catálogo por línea: **Bobinas y
Producto terminado primero, Químicos y Máquinas más adelante**. Hoy no
existe ningún PDF — los CTAs "Solicitar ficha técnica" abren un mailto
pre-completado en su lugar (ver "Formulario de contacto — limitación
técnica" más abajo). En cuanto haya un PDF real por línea, cambio esos
botones para que descarguen el archivo directo.

**Sigue en placeholder, a propósito** (ni las fotos de COTA ni el stock
encontrado representan esto con precisión):
- Proceso — etapa 05 Producto Terminado (ver punto 4 arriba — se buscó, no
  apareció nada con el registro visual del resto del sitio)
- Segmento Distribuidores (Soluciones) — necesita mostrar el producto
  Guardián específico (foto de producto/POS), no una foto genérica de fábrica

**Guardián salió de Familias de Producto (ProductFamilies.tsx) — historial
completo.** Pasó por 3 rondas ahí y nunca terminó de funcionar: (1) placeholder
gris genérico, (2) panel tipográfico con fondo oscuro ("colgado" — leía como
un bloque negro entre 3 fotos), (3) mismo panel con fondo claro (seguía
"colgado" — el problema no era el color, era el formato: un panel sin foto
no puede convivir bien con 3 paneles cuyo lenguaje ES la foto). En la 4ª
ronda se sacó por completo del carrusel — ahora son 3 paneles, todos con
foto real, consistentes entre sí. Toda la presencia de Guardián se
concentró en un único lugar bien resuelto: el bloque "Productos terminados
+ Guardián" al final de `PapelTissueSpecs.tsx` (ver abajo), con el mismo
tratamiento tipográfico grande que "Naschel." en `NaschelPlant.tsx` —
mismo criterio de siempre (no inventar una foto de producto que no existe),
pero ahora es un momento de marca con peso real en vez de un panel forzado.

**Catálogo de productos terminados + Guardián — rediseño completo.** Era la
sección con menos peso visual de la página: una lista de texto angosta en
3 columnas + un párrafo suelto de Guardián debajo, sin relación visual entre
ambos. Se rehizo como una sola composición de 2 columnas: catálogo con
números grandes (mismo tratamiento que "Modelos de negocio" — `font-impact-number`
+ `text-ink/25`) a la izquierda, Guardián a tamaño hero a la derecha. Ver
`components/sections/PapelTissueSpecs.tsx`.

**Nota:** la sección standalone "Escala de Producción" (`ProductionScale.tsx`)
se eliminó — mostraba el mismo dato (700 T/mes) que ya aparece en Planta
Naschel, duplicado. El contador grande ("mega", mismo tratamiento tipográfico
que tenía esa sección) ahora vive del lado derecho de `NaschelPlant.tsx`,
junto al resto de los datos de la planta.

## Microinteracciones (pedido: "más motion, dinamismo")

Se agregó una capa liviana de microinteracciones, sin salir de la regla de
UI restringida (sin cards/pills/sombras decorativas):

- **`.cta-arrow`** (`app/globals.css`): clase compartida para la flecha "→"
  de todos los CTAs del sitio (13 links/botones en 8 componentes) — al hacer
  hover sobre el link/botón, la flecha se desplaza 5px con la misma curva de
  easing (`--ease-industrial`) que ya usaba el subrayado del nav.
- `WhatCotaDoes.tsx`: cada fila de línea de negocio ahora reacciona al hover
  (título baja opacidad, foto hace zoom sutil, la fila se corre unos px) —
  antes solo tenía la animación de entrada por scroll, sin feedback al pasar
  el mouse.
- `PapelTissueSpecs.tsx`: los números de "Modelos de negocio" se iluminan e
  título se desplaza al hover; las filas de la tabla de specs resaltan de
  fondo y el valor numérico se corre al hover; los ítems del catálogo de
  productos terminados cambian de opacidad al hover.
- `ProductFamilies.tsx`: el panel Guardián (ver arriba) también reacciona al
  hover (el wordmark se desplaza), igual que los paneles con foto.

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

`lib/content/cota.ts` — email y teléfono son los reales provistos por el
cliente (`ventaspapel@cota.com.ar` — reemplazó a `comercial@cota.com.ar`;
`+54 9 11 3371 3283`). Es el único mail de contacto del sitio: todos los
`mailto:` (formulario, CTAs "Solicitar ficha técnica" de cada línea,
Contacto, footer, schema.org) referencian `cota.contact.email`, no hay
ningún otro hardcodeado. Confirmar que sigan vigentes antes de publicar.

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
  inventaron citas ni resultados ("aumentó su producción un 30%", etc.). El
  cliente confirmó que conseguir la autorización legal escrita de un caso
  real "no cree que la consigamos" — se sacó `Testimonial.tsx` del todo
  (componente eliminado, ya no está en `app/page.tsx`) en vez de dejarlo
  como sección de ejemplo a la espera de un dato que no va a llegar.
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

## Familias de Producto — el carrusel no se sentía scrolleable

El cliente mandó captura: en pantallas anchas los 3 paneles (Bobinas,
Químicos, Soluciones) casi entraban enteros, así que el scroll horizontal
apenas se movía unos px — se sentía como que no había scroll, y el
progreso de la barra de abajo (que sí avanzaba un poco) parecía un bug
("la misma imagen que no se completa") en vez de una tercera imagen
distinta. Además el título quedaba separado del carrusel por un hueco
grande porque el hint "Desplazar horizontalmente →" vivía pegado al borde
derecho del contenedor, lejos del título.

Cambios en `ProductFamilies.tsx`:
- Paneles más anchos (`md:w-[62vw] lg:w-[52vw]`, antes `46vw/36vw`) — con
  3 paneles eso da ~150-186vw de ancho total, un recorrido de scroll real
  y perceptible (verificado: pasó de ~167px a 1223px de distancia
  scrolleable en una pantalla de 1900px). Ahora el 3er panel siempre queda
  parcialmente cortado en el borde, invitando a scrollear.
- El hint de scroll se movió del header a la barra de abajo, junto con un
  contador "01 / 03" — ahí es donde efectivamente pasa la interacción.
- El header quedó solo con título + CTA, sin el elemento suelto al borde
  derecho.

**Bug de cascada CSS encontrado en el camino:** intenté agregarle `pr-20`
(padding-right de Tailwind) al mismo `<div>` que ya tenía la clase
`container-industrial` para separar el contador del botón flotante de
WhatsApp en mobile — no tuvo ningún efecto. Causa: `.container-industrial`
define `padding-inline` en `globals.css`, y como esa regla está definida
*después* de `@import "tailwindcss"` en el archivo, le gana en cascada a
cualquier utilidad `pr-*`/`pl-*` de Tailwind aplicada al mismo elemento
(misma especificidad, pero orden de aparición posterior). **Cualquier
elemento con la clase `container-industrial` va a ignorar `pr-*`/`pl-*`
de Tailwind puestos en el mismo nodo** — hay que usar `margin` en un hijo,
o padding en un wrapper interno, nunca padding directo sobre el nodo que
ya tiene `container-industrial`. Se resolvió con `mr-16 md:mr-0` en el
`<span>` del contador en vez de padding en el contenedor.

## Pase final de dirección de arte

Pedido explícito del cliente: pulir lo que ya existe (spacing, tipografía,
motion, consistencia) sin rediseñar, sin inventar contenido, sin
reestructurar la narrativa. Se auditó todo el sitio sección por sección
(`grep` de valores de padding, easings de GSAP, `rounded-`/`shadow-`) antes
de tocar nada. Cambios concretos:

- **Ritmo vertical (el de mayor impacto).** Antes casi todas las secciones
  usaban variantes de `py-24`/`py-28`/`py-32` sin ninguna lógica — el sitio
  respiraba todo al mismo ritmo. Se creó una escala de 4 roles en
  `globals.css` (`.section-py-xs/sm/md/lg`) y se asignó cada sección a
  propósito: StatsBand=sm (beat corto después del Hero), LogoBand=xs
  (conector), Compañía=lg (la declaración de misión necesita aire),
  WhyCota/ProductFamilies/Soluciones=md (ritmo estándar), Sostenibilidad=sm,
  Certificaciones=xs (conector antes del cierre), Contacto=lg (la
  conclusión). Las secciones pinneadas/full-bleed (Hero, Proceso Industrial,
  Químicos→Papel, Naschel) no usan esta escala — ya tienen su propio ritmo
  cinematográfico. Verificado con `getComputedStyle` en el navegador: la
  secuencia real de padding ahora es 0→88→72→144/176→128→[inmersivo]
  →[inmersivo]→128→128→[inmersivo]→88→72→144/176 — una onda real, no una
  línea plana.
- **`.text-index` nuevo** (`clamp(1.5rem, 3vw, 1.875rem)`) — antes
  "text-2xl md:text-3xl" estaba escrito suelto en 4 lugares distintos
  (specs de bobinas ×3, catálogo de productos) para el mismo rol visual
  (un número de índice en una lista). `.text-stat` queda reservado a los 3
  Modelos de negocio a propósito — son 3 decisiones, no 6 ítems de
  referencia, y merecen más peso.
- **`lib/motion/tokens.ts` nuevo** (`EASE_STANDARD`) — el patrón de reveal
  simple (autoAlpha + y, scroll-scrubbed) se repetía igual en 6 lugares
  (WhatCotaDoes, WhyCota, y 4 veces en PapelTissueSpecs) con "power2.out"
  como string suelto en cada archivo. Ahora comparten una constante. Las
  coreografías con ease propio (Hero, el clip-reveal de ProductFamilies)
  no se tocaron — son los 2 momentos insignia del sitio y está bien que se
  sientan distintos.
- **Foto de Sostenibilidad, corregida.** Tenía `opacity-30` en la imagen
  MÁS un overlay plano `rgba(...,0.75)` encima — entre las dos capas, la
  foto quedaba a ~7% de brillo real, casi invisible. Era la única sección
  del sitio que no seguía el patrón ya establecido en el resto (una foto a
  opacidad completa + un degradé más oscuro hacia abajo). Se corrigió para
  que siga el mismo patrón que Hero/Naschel/Proceso Industrial.
- **Hover de la CTA secundaria de Compañía, unificado.** Era la única CTA
  ink-sobre-claro del sitio que usaba `hover:border-ink hover:text-ink` —
  las otras 6+ CTAs en el mismo contexto (texto ink sobre fondo claro) usan
  `hover:opacity-60`. Las CTAs sobre fondo oscuro/foto sí usan
  consistentemente un tratamiento de borde — ese patrón (opacity en claro,
  borde en oscuro) ya existía en casi todo el sitio, esta era la única
  excepción real.
- **Foco de teclado propio.** No había ningún `:focus-visible` definido —
  dependía del outline default del navegador. Se agregó un outline de
  `currentColor` (2px, offset 3px) que hereda el ink/paper de cada
  elemento, así funciona igual en secciones claras y oscuras sin reglas
  separadas.

**Lo que se revisó y se decidió NO tocar** (por las mismas razones que pide
el brief — "refinar antes que reemplazar"):
- Las 3 filas de Compañía (Químicos/Papel/Soluciones) repiten la misma
  composición texto-izquierda/foto-derecha en vez de alternar — es
  intencional: son 3 líneas de negocio en pie de igualdad, variar la
  composición entre ellas implicaría una jerarquía que no existe.
- El orden Químicos→Papel dentro de `ChemicalsToPaper.tsx` y
  `IndustrialProcess.tsx` — es el proceso real de producción (se trata
  químicamente antes de convertirse en papel), no una cuestión de balance
  visual (ver "Balance Papel vs. Químicos" más abajo, que sí tocó el orden
  en otros lugares donde no había una razón de proceso real).
- Los paneles de ProductFamilies/Proceso Industrial ya eran fotos
  full-bleed con texto superpuesto, no cards de ecommerce — no hizo falta
  ningún cambio de composición ahí.
- Corner-radii/sombras: ya eran mínimos y deliberados (el botón circular de
  WhatsApp es la única excepción documentada desde el arranque del
  proyecto) — no había nada que "desprolijar" ahí.

## Tipografía — Big Shoulders → Teko (números Y labels)

`.font-impact-number` (todos los números grandes del sitio: StatsBand,
NaschelPlant, contador de Químicos en Químicos→Papel, specs de bobinas,
numeración "01/02/03" de catálogo/modelos de negocio) pasó de **Big
Shoulders** a **Teko** — `app/layout.tsx`. El cambio se eligió mostrándole
al cliente comparadores en vivo (4 rondas: industrial condensada, más
condensada aún, display geométrico moderno tipo "Clash Display" —
descartada por alejarse demasiado del registro industrial — y una vuelta
al terreno condensado con más carácter) hasta llegar a Teko.

Después de aplicarlo, el cliente mandó una captura de los labels del nav
("AÑOS OPERANDO", "T/MES — CAPACIDAD QUÍMICOS", etc.) diciendo que
"seguía dando muy compu genérico" — pero esos labels usan `.font-label`,
que en ese momento seguía en Inter mayúsculas + tracking (el fix de la
ronda anterior contra Geist Mono). O sea: el problema nunca fue
específicamente Geist Mono ni Inter — es el **patrón** "sans en mayúsculas
con tracking ancho", el label típico de cualquier SaaS/dashboard,
más allá de qué fuente exacta esté debajo. Se resolvió pasando
`.font-label` a Teko también (menos tracking, `0.8125rem` en vez de
`0.6875rem` porque las proporciones de Teko a ese tamaño necesitan un poco
más de aire) — ahora todo el sistema de "anotación técnica" del sitio
(números grandes Y labels/kickers/CTAs) comparte una sola fuente con forma
propia, angosta y condensada, en vez de mezclar Inter-mayúsculas con lo
que sea que se use para los números.

## Balance Papel vs. Químicos en el sitio

El cliente pidió explícitamente que el sitio "no parezca una fábrica solo
química" y esté "más orientada al papel también". Antes de tocar nada se
contó el uso real de fotos por tema (`grep` sobre `components/`): ya estaba
bastante parejo (6 fotos papel/bobinas vs. 5 químicos-específicas), así que
el desbalance no era de fotos — era de **orden y de números**:

- `cota.businessLines` en `lib/content/cota.ts` tenía Químicos primero — se
  reordenó a Papel primero (con Químicos y Soluciones después). Esto se
  propaga solo a todo lo que itera ese array, principalmente
  `WhatCotaDoes.tsx` (ahí Papel Tissue ahora es la primera línea que se ve
  al entrar a "Compañía").
- `ProductFamilies.tsx` (`PANELS`) tenía Químicos primero en el carrusel —
  se reordenó a Bobinas primero.
- `Nav.tsx` (`LINKS`) tenía Químicos antes que Papel — se invirtió el orden.
- `StatsBand.tsx` tenía un solo stat "de negocio" con número propio: 700
  T/mes Químicos, sin ningún número de Papel al lado (los otros 3 stats
  eran neutrales: años, divisiones, alcance nacional) — visualmente leía
  como que solo Químicos tiene una cifra de escala industrial. Se reemplazó
  el stat más genérico ("Abastecimiento nacional") por **220 cm — Ancho
  máx. de bobina (Papel)**, dato real de `cota.bobinaSpecs.anchos`, para
  que Papel tenga su propio número igual de grande al lado del de Químicos.

**Lo que no se tocó a propósito:** el orden interno de `ChemicalsToPaper.tsx`
(Químicos → Papel) y de `IndustrialProcess.tsx` (Proceso Químico antes de
Fabricación de Papel) — ese orden es el proceso real de producción (la
fibra se trata químicamente antes de convertirse en papel), no una
jerarquía de importancia; invertirlo sería inexacto, no solo una cuestión
de balance visual. `SolutionsByApplication.tsx` ya tenía Convertidores
(papel) primero, no hizo falta tocarlo.

**Nota:** este pedido llegó junto con "cargué nueva foto en la carpeta
Images" — se revisó `Images/` y no apareció ningún archivo nuevo (mismos
16 archivos que la ronda anterior, mismas fechas). Puede que la subida no
haya terminado de sincronizar — avisar si hay que revisar de nuevo.

## Ronda grande: brief de 10 secciones nuevas

Se recibió un brief externo (tono "developer senior") pidiendo 10 secciones/mejoras
nuevas sobre este mismo sitio. 4 de esas 10 pedían datos que COTA no tiene
confirmados — **exactamente los mismos 4 tipos de contenido ya declinados una
vez en la ronda del informe comparativo** (ver más abajo): sostenibilidad,
testimonio de cliente, certificaciones, logos de clientes. Se le preguntó al
cliente cómo manejarlos y eligió explícitamente **"Placeholder visible
marcado"** — construir el layout con contenido de ejemplo del brief, pero
imposible de confundir con dato real. Se creó `components/ui/ExampleNotice.tsx`
para esto (mismo espíritu que `PlaceholderMedia.tsx`, pero para texto/dato en
vez de foto) y se usa en las 4 secciones nuevas:

- `Sustainability.tsx` — los 3 puntos del brief (90% agua recirculada, etc.)
  con marca a nivel de sección Y a nivel de cada bullet ("Ejemplo, no
  confirmado"). **No publicar sin reemplazar por datos ambientales reales.**
- `Testimonial.tsx` — la cita/resultado/autor del brief, con marca explícita
  de que son ficticios. **No publicar sin una cita real autorizada por un
  cliente real.**
- `Certifications.tsx` — ISO 9001 / BPM / normas de seguridad del brief, cada
  una con sufijo "(pendiente)" además del aviso de sección. **No publicar
  ninguna sin confirmar que COTA efectivamente la tiene vigente** — mostrar un
  sello de certificación no verificada es un riesgo, no sólo un error de copy.
- `LogoBand.tsx` — acá se hizo una excepción al "usar el ejemplo del brief":
  el brief sugería nombres de empresa inventados ("Convertidora Sur", etc.)
  como placeholder, pero eso fabrica prueba social (implica que empresas
  reales confían en COTA). Se armaron 6 slots vacíos con borde punteado y
  label "Logo" en vez de nombres inventados — layout listo, pero sin
  fabricar ningún cliente. Reemplazar cada slot por `<img>` cuando haya
  logos + autorización confirmada.

**Secciones nuevas construidas con datos 100% reales (sin marca de ejemplo):**
- `StatsBand.tsx` — franja de 4 números debajo del Hero. El brief pedía
  "50.000+ TN/año de producción" (no es un dato real de COTA — sólo la
  capacidad de Químicos, 700 T/mes, está confirmada); se usó ese número real
  en su lugar, mismo criterio que ya se aplicó en `NaschelPlant.tsx`. Los
  otros 3 (años operando, 3 divisiones, abastecimiento nacional) sí están
  verificados en `lib/content/cota.ts`.
- `WhyCota.tsx` — "Por qué COTA", los 4 diferenciales del brief resultaron
  ser reformulaciones de contenido YA verificado y usado en otras secciones
  (blanqueadores desarrollados por COTA — no revendidos, integración
  vertical, logística propia, asesoramiento técnico) — no hizo falta
  inventar nada acá.
- `IndustrialProcess.tsx` — se agregó navegación por puntos, sólo visible en
  mobile (`md:hidden`), que saltea la posición de scroll de página
  correspondiente a cada etapa usando el mismo `ScrollTrigger` que ya
  maneja el desktop (`stRef.current.start/end`).
- Hero: se agregó un CTA principal ("Solicitar asesoramiento técnico →")
  que antes no existía en el Hero (las 6+ CTAs "Ir al formulario" viven en
  otras secciones, no en el Hero).
- Contacto: mini mapa embebido (`iframe` de Google Maps con la dirección
  real de Naschel, sin API key), link directo a WhatsApp, y el formulario
  ahora pide también Email y Teléfono del que consulta. El brief pedía un
  horario de atención ("Lun a Vie 8 a 17hs") — no está confirmado, no se
  agregó (mismo criterio de siempre).
- Divisiones (`WhatCotaDoes.tsx`): CTA secundario por división, apuntando a
  la sección real correspondiente (`#quimicos`, `#papel`, `#soluciones`) en
  vez de a un mailto genérico. El brief también pedía "formatos de entrega"
  por división (ej. "Tambores | IBC | A granel" para Químicos) — no está
  confirmado, se omitió en vez de inventar valores de packaging.

**Orden de página:** el brief sugería intercalar Sostenibilidad/Testimonio
justo después del Recorrido Industrial, cortando la secuencia continua
Proceso → Químicos → Papel que se construyó como un tramo narrativo único
(ver punto 2 de la memoria de dirección de arte). Se agruparon esas 2
secciones + Certificaciones cerca del final, antes de Contacto, en vez de
seguir el orden literal del brief — ver comentario en `app/page.tsx`.

## Formulario de contacto — se sacó del todo

`Contact.tsx` ya no usa `ContactForm.tsx`. El cliente lo pidió explícito por
audio: "el formulario espanta a la gente, te abstrae". Se reemplazó por
mail grande + 3 íconos (WhatsApp/Instagram/Mail) más el mapa, que ahora
ocupa la columna que dejó libre el formulario. `ContactForm.tsx` queda en
el repo sin usar (no se borró, por si se quiere volver atrás) —
`components/ui/SocialIcons.tsx` es nuevo, centraliza los íconos que antes
estaban duplicados en `WhatsAppButton.tsx` y `Footer.tsx`, y suma
`MailIcon`.

**Se pierde con este cambio:** la segmentación por categoría
(Químicos/Papel/Soluciones/Guardián/Otro) y el campo de volumen estimado
que traía cada consulta por mailto — ahora cualquier consulta por mail o
WhatsApp llega sin ese contexto pre-cargado. Si en algún momento hace falta
esa segmentación de vuelta (para armar reportes de qué línea genera más
leads, por ejemplo), es cuestión de volver a montar `ContactForm.tsx` en la
sección — el componente sigue andando, no hubo que tocarlo.

El ícono de Instagram ya tiene link real (`https://www.instagram.com/cota_papelera/`,
confirmado por el cliente) — ver "Redes sociales" más arriba.
