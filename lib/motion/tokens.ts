/**
 * Constantes de motion compartidas. El patrón de reveal simple
 * (autoAlpha 0→1, y:N→0, scrub scroll-triggered) se repetía igual en 6
 * lugares (WhatCotaDoes, WhyCota, y 4 veces en PapelTissueSpecs) con el
 * mismo ease escrito como string suelto en cada archivo. Se centraliza acá
 * — la duración queda a criterio de cada sección (varía a propósito según
 * el peso del contenido que revela), pero el ease no debería tener que
 * "reinventarse" en cada archivo.
 *
 * Los momentos con coreografía propia (Hero, ProductFamilies clip-reveal)
 * usan sus propios eases (power3/power4.out) a propósito — son los 2
 * momentos insignia del sitio y está bien que se sientan distintos. No se
 * tocan acá.
 */
export const EASE_STANDARD = "power2.out";
