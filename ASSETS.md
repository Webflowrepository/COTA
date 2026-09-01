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

| Archivo en `public/photos/` | Fuente | Contenido | Usado en |
|---|---|---|---|
| `hero-planta-aerea.png` | Foto real de COTA | Vista aérea al amanecer | Hero |
| `naschel-planta-aerea.png` | Foto real de COTA | Vista aérea al atardecer, portón/cartel COTA | Fondo de Planta Naschel; swatch/panel Soluciones; Proceso — etapa 06 Logística; fondo del `Footer.tsx` |
| `quimicos-tanques.png` | Foto real de COTA | Tanques de proceso, primer plano, cielo despejado | Capítulo Químicos; swatch/panel Químicos; segmento Papeleras y textiles |
| `proceso-tanques.png` | Foto real de COTA | Tanques de proceso, interior, tono oscuro | Proceso — etapa 02 Proceso Químico |
| `proceso-materia-prima.png` | Foto real de COTA | Tanques + edificio + avenida, luz de día | Proceso — etapa 01 Materia Prima |

`papel-produccion.jpeg` y `proceso-rebobinado.jpeg` (stock Pexels) siguen en
`public/photos/` pero **ya no se usan en ningún lado** — el cliente las
descartó explícitamente (ver punto 5). `footer-planta-cenital.png` (foto de
COTA con tells de IA) tampoco se usa — ver mismo punto.

Quedan **3 de las 10 fotos de COTA sin usar** (dos primeros planos del
logo/cartel en la pared, una toma aérea con paisaje tipo meseta/desierto que
no coincide con San Luis) — no encajan con ningún contenido actual del
sitio; se guardan en `Images/` por si sirven para algo más adelante (redes,
material de marca, etc.).

## Fotos reales pendientes (pedidas explícitamente por el cliente)

- **Máquina papelera en producción** (Proceso — etapa 03 "Fabricación de
  Papel Tissue"; también capa Papel en Químicos→Papel).
- **Rebobinadora industrial** (Proceso — etapa 04 "Rebobinado"; también
  segmento Convertidores en Soluciones).
- **Bobina de papel Tissue** — foto de producto/bobina sola, no de la línea
  completa (swatch Papel en Compañía; panel Bobinas en Familias de
  Producto). El cliente sugirió específicamente **bobinas de 220 cm de
  ancho** como la más representativa/clave para mostrar.
- **Productos terminados** (toallas en rollo, camilleros, servilletas, etc.)
  — hoy el catálogo en `PapelTissueSpecs.tsx` es solo texto, sin ninguna
  foto de producto.
- Confirmar si `footer-planta-cenital.png` es una foto real (y de qué
  ángulo/fecha) o si hay que descartarla definitivamente — ver punto 5.

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

## Formulario de contacto — limitación técnica

`components/sections/ContactForm.tsx` arma un `mailto:` con los datos
cargados (abre el cliente de correo del visitante). Funciona sin backend,
pero tiene las limitaciones típicas de mailto: depende de que el visitante
tenga un cliente de correo configurado, y no queda un registro del lead del
lado del servidor. Para un formulario que envíe el mail directamente y
guarde los leads, hace falta conectar un servicio (Resend, Formspree, o un
backend propio) — es una decisión de infraestructura, no de diseño, así que
la dejo para cuando definan qué servicio usar.
