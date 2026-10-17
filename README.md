# Sitio web de COTA S.A. — www.cota.com.ar

Esta es la guía para hacer cambios en la web **sin saber programar**. Los cambios
se hacen pidiéndoselos en palabras normales a una inteligencia artificial
(Claude o Codex), que edita la web por vos y te muestra el resultado antes de
publicarlo.

---

## 1. Lo que necesitás (una sola vez)

- Una cuenta de **GitHub** con acceso a este proyecto (es donde está guardada la web).
- Una cuenta de **Claude** (claude.ai) **o** de **ChatGPT** (para usar Codex). Con una alcanza.
- Una cuenta de **Vercel** con acceso al proyecto (es donde está publicada la web).
  Sirve para ver los cambios antes de publicarlos y para volver atrás si algo sale mal.

## 2. Conectar la IA a la web (una sola vez)

**Con Claude:** entrá a <https://claude.ai/code> → conectá tu cuenta de GitHub
cuando te lo pida → elegí este proyecto (`COTA`).

**Con Codex:** entrá a <https://chatgpt.com/codex> → conectá tu cuenta de GitHub
cuando te lo pida → elegí este proyecto (`COTA`).

## 3. Cómo pedir un cambio

Escribí lo que querés, como se lo dirías a una persona. La primera vez de cada
conversación empezá así:

> Leé el README y el AGENTS.md del proyecto. Quiero hacer este cambio en la web: …

Ejemplos de pedidos:

- *"Cambiá el teléfono de contacto por +54 9 11 1234 5678."*
- *"Cambiá el mail de ventas por ventas@cota.com.ar."*
- *"Reemplazá el catálogo de bobinas por este PDF nuevo"* (y adjuntás el PDF).
- *"En la sección de Químicos, cambiá el título por 'Blanqueadores ópticos de alta pureza'."*
- *"Agregá el link de nuestro TikTok: https://www.tiktok.com/@…"*
- *"Reemplazá la foto de la sección Planta por esta"* (y adjuntás la foto).
- *"Deshacé el último cambio que hicimos."*

Tips para que salga bien:
- **Un cambio por vez.** Es más fácil revisarlo y, si algo no gusta, volver atrás.
- **Sé concreto:** decí en qué parte de la web está (podés mandar una captura de pantalla).
- **Usá datos reales.** La IA no debe inventar números, clientes ni certificaciones.

## 4. Revisar y publicar

1. La IA hace el cambio y te deja un **link de vista previa** (una copia de la web
   con el cambio, que todavía **no** ve nadie más). Abrilo y revisá que esté bien,
   en la compu y en el celular.
2. Si está bien: en GitHub, en el "Pull Request" que creó la IA, tocá el botón
   verde **Merge pull request** → **Confirm merge**.
3. En 1 o 2 minutos el cambio está en **www.cota.com.ar**.

Si algo no te gusta, decíselo a la IA en la misma conversación y lo corrige antes de publicar.

## 5. Si algo se rompe: volver a la versión anterior

La web guarda todas sus versiones anteriores. Para volver a la última que andaba bien:

1. Entrá a <https://vercel.com> → proyecto **cota** → pestaña **Deployments**.
2. Buscá la última versión que funcionaba (las de arriba son las más nuevas).
3. Tocá los tres puntitos **⋯** de esa versión → **Instant Rollback** (o **Promote to Production**).

En segundos la web vuelve a como estaba. Después podés pedirle a la IA que
revise qué falló.

> Tranquilidad: si un cambio tiene un error grave, Vercel **no lo publica** y la web
> sigue como estaba. Lo que puede pasar es que un cambio se publique y se vea mal;
> para eso está el paso de arriba.

## 6. Dónde está cada cosa (por si la IA pregunta)

| Qué querés cambiar | Dónde está |
|---|---|
| Teléfono, mail, WhatsApp, redes, años, datos de la empresa | `lib/content/cota.ts` |
| Catálogos en PDF | carpeta `public/catalogos/` |
| Fotos | carpeta `public/photos/` |
| Videos | carpeta `public/videos/` |
| Orden de las secciones | `app/page.tsx` |
| Título y descripción que aparecen en Google | `app/layout.tsx` |

---

Hecho con Next.js, publicado en Vercel. Las instrucciones técnicas para la IA están en [`AGENTS.md`](AGENTS.md).
