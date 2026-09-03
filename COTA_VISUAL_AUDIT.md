# COTA — Visual Execution Audit

Live site audited: `https://cota-eta.vercel.app/`
Viewports tested: 1440×900, 1280×800, 768×1024, 390×844.
Method: real browser rendering (navigation, wheel-scroll, viewport resize, screenshot) cross-checked against computed styles and element geometry (`getBoundingClientRect`, `getComputedStyle`) pulled from the live DOM — pixel values quoted below are measured, not estimated. No code was changed to produce this audit.

This is visual-execution only. It does not propose new sections, new content, or IA changes.

---

## TOP 10 VISUAL ISSUES

Ranked by how much each one currently costs the site's ability to read as expertly executed.

| # | Issue | Section | Viewport(s) |
|---|---|---|---|
| 1 | Certification badges are labeled "(pendiente)" in the live, shipped page | Certifications | All |
| 2 | Clicking "Proceso" in the nav hides the section's own kicker behind the nav bar | IndustrialProcess | All |
| 3 | Product panels are squeezed into a 1:2.9 portrait crop at tablet width | ProductFamilies | 768×1024 |
| 4 | Business-line photos shrink to ~180px wide at tablet width | WhatCotaDoes | 768×1024 |
| 5 | The nav highlights "Químicos" while the on-screen content reads "Papel — 02" | ChemicalsToPaper | 1440, 1280 |
| 6 | Two forced-scroll pinned sections run back-to-back with no normal section between them | IndustrialProcess → ChemicalsToPaper | All |
| 7 | The same 3-line pitch, in near-identical wording, is shown twice in a row | ProductFamilies → SolutionsByApplication | All |
| 8 | The mobile menu is an unstyled link list with none of the site's own type system | Nav (mobile menu) | 390×844 |
| 9 | Nav and kicker text stay fixed at 13px from 390px to 1440px+ | Nav / all kickers | All |
| 10 | 184px of empty padding separates the last stat from the next heading on mobile | StatsBand → WhatCotaDoes | 390×844 |

Full detail for each, plus additional findings below, follow the same format: **Section / Viewport / What's wrong / Why it matters / Correction / Impact.**

---

## 1. Certification badges read as placeholder content in production

**Section:** Certifications (between NaschelPlant and InstagramFeed)
**Viewport:** All four — the section doesn't reflow, it's a static row of badges.
**What is visibly wrong:** Each of the three badges — "ISO 9001", "BPM", "Normas de seguridad industrial" — renders with a literal `(pendiente)` suffix next to the name, in the same weight and color as the rest of the label. There's also an "Ejemplo — ninguna certificación confirmada todavía" notice directly above the row.
**Why it reduces design quality:** A visitor doesn't read "(pendiente)" as a content-management note — they read it as the company telling them, directly, that it doesn't have the certifications it's listing. On an industrial B2B site whose entire premise is that COTA is a real, exacting production operation, a row of unconfirmed compliance badges undercuts exactly the kind of trust that section exists to build.
**Exact correction:** Remove the section until the badges represent certifications COTA actually holds. This is a copy/content decision, not a layout one — no visual redesign needed, just don't ship unconfirmed claims.
**Expected impact:** Removes the single most visible "this site isn't finished" signal on the page. High impact, zero design cost.

---

## 2. IndustrialProcess kicker is hidden behind the fixed nav on arrival

**Section:** IndustrialProcess (`#proceso`)
**Viewport:** Confirmed at 1440×900 and 1280×800 via both screenshot and geometry; the same fixed-offset math reproduces at 768 and 390 (kicker sits 40–56px below the section's own top, well inside the nav's footprint at every width, since the nav's height doesn't scale with viewport).
**What is visibly wrong:** The nav is `position: fixed`, height ≈80px from the top of the viewport at desktop. `IndustrialProcess`'s kicker ("Recorrido industrial") sits only 56px below the section's own top edge. Landing on this section — by clicking "Proceso" in the nav, or by scrolling to it — puts the kicker underneath the nav bar. Measured: at the exact scroll position the anchor click produces, the kicker's screen-top is 24px *above* the nav's bottom edge. It is not visible at all; the section's H2 ("Materia prima → producto terminado.") appears to sit directly under the nav with no label above it.
**Why it reduces design quality:** Every other section's kicker ("Compañía — Argentina, desde 1994", "Papel Tissue", "Soluciones — 03"...) is visible on arrival — this is the one section where clicking its own nav link hides its own label. It reads as a layout bug because, functionally, it is one: the nav-link destination and the content's resting position don't agree.
**Exact correction:** Add `scroll-margin-top` to `#proceso` (and audit the other five anchor targets the same way — `#compania`, `#quimicos`, `#papel`, `#soluciones`, `#planta` all currently have 48–398px of clearance and are fine, but `#proceso` is the one exception) sized to the nav's actual rendered height at each breakpoint (~80px desktop, ~56px mobile), or increase the section's own top offset so the kicker starts below that line regardless of anchor scroll-margin.
**Expected impact:** Fixes a reproducible, 100%-of-the-time defect on the one section most likely to be clicked directly from the nav (it's the second link, right after "Compañía").

---

## 3. ProductFamilies panels are compressed to a 1:2.9 portrait crop at tablet width

**Section:** ProductFamilies ("Un sistema industrial integrado.")
**Viewport:** 768×1024 specifically — the breakpoint where the component switches from mobile carousel (`flex overflow-x-auto`) to desktop grid (`md:grid md:grid-cols-3`), which triggers at exactly 768px.
**What is visibly wrong:** Measured via `getComputedStyle`: at 768px, `grid-template-columns` computes to `203px 203px 203px`. The panels keep their `md:h-[58vh]` height, which at a 1024px-tall viewport is 594px. Each panel therefore renders at 203×594px — a 1:2.9 width-to-height ratio. The source photos (a person standing next to bobinas, industrial tanks, an aerial plant shot) are landscape-composed; forced into a ratio nearly three times taller than wide, they crop down to narrow vertical slivers — confirmed in the screenshot, where the "Bobinas Industriales" panel shows almost nothing but a cropped column of white-wrapped rolls, the photo's actual subject pushed mostly out of frame.
**Why it reduces design quality:** This is the exact midpoint the layout was designed around two states for (`<md`: swipeable carousel with wide-per-panel real estate; `≥md`: three visible columns in a wide desktop container) — 768px is `≥md` by definition, so it gets the grid, but it's also the narrowest width that grid ever has to render at, and nothing scales the panel height down to compensate. The two states were tuned for their respective typical widths (a phone in portrait, a desktop window), not for the width where they meet.
**Exact correction:** Cap panel height with a `vh`-and-pixel pair that degrades gracefully at narrow grid widths — e.g. `md:h-[58vh] md:max-h-[420px]` (or a `clamp()`), or scale the grid's column height by aspect ratio (`aspect-[3/4]`) instead of pure `vh`, so a narrow column also gets a shorter, more landscape-friendly frame.
**Expected impact:** Removes the worst photo crop on the page at a standard device width (iPad portrait, most small laptops in a non-maximized window).

---

## 4. WhatCotaDoes business-line photos shrink to ~180px wide at tablet width

**Section:** WhatCotaDoes ("Socios estratégicos en soluciones de papel.")
**Viewport:** 768×1024.
**What is visibly wrong:** Measured directly: each row's text column is 428–448px wide (fixed via `max-w-md` = 28rem = 448px) inside a 657px-wide row with a 40px gap, leaving the photo column (`flex-1`) exactly 169–189px wide at 176px tall. At 1440px, the same row is roughly 1280px wide, so the identical math (448px text + 40px gap) leaves the photo column ~790px+ wide — over 4× wider. On mobile the photo goes full-width (stacked layout). The photo is only ever cramped in the 768–900px range.
**Why it reduces design quality:** The photo is the only material/proof element in each business-line row — the text is already carrying the description. At 768px it shrinks to a ~180×176px square, too small to read as a deliberate photographic composition; it looks like a thumbnail accidentally left at the wrong size, not an intentional layout choice.
**Exact correction:** Switch the text column from a fixed `max-w-md` to a percentage or `clamp()`-based width (e.g. `w-[40%]` or `max-w-[min(28rem,40%)]`) so it yields proportionally more room to the photo column as the row narrows, instead of eating a fixed 448px regardless of how little space is left.
**Expected impact:** Restores the photo as a legible visual element for the entire 768–1024px range — currently the single narrowest-looking section on tablet.

---

## 5. Nav active-state disagrees with the on-screen section label

**Section:** ChemicalsToPaper (`#quimicos`) — specifically its second, crossfaded "Papel — 02" chapter.
**Viewport:** Confirmed at 1440×900; applies at any viewport since it's a DOM-structure issue, not a layout one.
**What is visibly wrong:** `ChemicalsToPaper` is one `<section id="quimicos">` containing two GSAP-crossfaded chapters ("Químicos — 01" and "Papel — 02"). Scrolling into the second chapter, the screen shows "PAPEL — 02 / Papel Tissue a escala industrial." as the on-screen label — while the nav bar simultaneously highlights "QUÍMICOS" in green, because the whole component only ever carries the one section id.
**Why it reduces design quality:** The nav's entire job is to tell the visitor where they are. For roughly half of this section's scroll duration, it tells them something the content on screen directly contradicts.
**Exact correction:** Either split the "Papel" chapter into its own DOM section with its own id and let the nav's existing scroll-position logic pick it up naturally, or add the crossfade progress into the nav's active-section calculation so it switches from "Químicos" to "Papel" partway through this component's scroll range.
**Expected impact:** Removes a direct, visible self-contradiction between two pieces of UI that are only 80px apart on screen at any given moment.

---

## 6. Two forced-scroll pinned sections run back-to-back

**Section:** IndustrialProcess → ChemicalsToPaper (the transition itself).
**Viewport:** All — both sections use `vh`-based pin distances, not viewport-relative content, so the forced-scroll cost is roughly constant in "screens of scroll" at any width.
**What is visibly wrong:** `IndustrialProcess` pins the viewport and hijacks roughly 1 additional screen-height of scroll input to drive a horizontal panel track (measured: 1800px of scroll distance at 900px viewport height = 2 screens). `ChemicalsToPaper` immediately follows with its own pin, driving a crossfade over 2160px (2.4 screens). They are adjacent in the DOM with nothing but a section boundary between them — no normal-scrolling section, no pause. That's roughly 4.4 continuous screens (at 1440×900) where the visitor's scroll input is being redirected into an animation rather than moving them down the page at the rate they're scrolling.
**Why it reduces design quality:** Either section alone reads as a deliberate, cinematic moment. Stacked directly, the visitor exits one hijacked-scroll section and is immediately inside another, with no normal page movement in between to reset the expectation that scrolling = moving. It reads as heavy rather than as two distinct signature moments.
**Exact correction:** Insert a normal (non-pinned) breathing section between them, or shorten one of the two pin distances so the combined hijacked-scroll span drops meaningfully below 4 screens.
**Expected impact:** Addresses the most likely source of a general "this feels heavy/slow" impression in the middle third of the page, without touching either section's own internal design.

---

## 7. The same 3-line business pitch appears twice in a row

**Section:** ProductFamilies → SolutionsByApplication (the transition itself).
**Viewport:** All.
**What is visibly wrong:** `ProductFamilies` presents three photo panels — Bobinas Industriales, Químicos, Soluciones Industriales — using `services.bobinas.short` and `businessLines.quimicos.short` as their captions. The very next section, `SolutionsByApplication`, presents three tabs — Convertidores, Distribuidores, Papeleras y textiles — where the "Convertidores" tab uses the identical `services.bobinas.short` string and the "Papeleras y textiles" tab uses the identical `businessLines.quimicos.short` string. Screenshot-confirmed: scrolling from one section directly into the next shows the tail of the photo-panel row, then immediately a heading ("De la materia a la operación del cliente") and a differently-styled control (tabs instead of panels) presenting two of the same three facts again.
**Why it reduces design quality:** Two consecutive sections using different UI patterns (photo cards, then tabs) to say the same thing reads as two different people having designed two different solutions to one problem, not one considered information architecture. It also halves the perceived information density of the page — a visitor who read the panels gets nothing new from the tabs.
**Exact correction:** This is a content/IA fix, not a pure visual one — merge the two into a single treatment (keep the photo panels, drop the duplicate tab section; or keep the tabs and give ProductFamilies a distinct angle instead of the same three descriptions). Full detail on this exact repetition is in the standing repetition audit already produced for this project.
**Expected impact:** Removes the largest single duplication on the page and shortens the scroll noticeably without losing any unique information.

---

## 8. Mobile menu carries none of the site's visual identity

**Section:** Nav (mobile hamburger menu, open state).
**Viewport:** 390×844 (`<md`, hamburger-triggered).
**What is visibly wrong:** Opening the mobile menu renders a flat white panel, in normal document flow (not a full-screen or scrim-backed overlay), containing seven links — Compañía, Proceso, Químicos, Papel, Soluciones, Planta, Contacto — as a plain vertical list in `text-2xl` black text, evenly spaced, no numbering, no kicker treatment, no underline styling, no icon. It sits directly against the still-fully-visible hero photo below it with a hard, undecorated edge.
**Why it reduces design quality:** Every other list-like element on this site (the process stages, the specs table, the product catalog) carries the site's own type system — small tracked-caps mono labels, numbered indices (`01`, `02`...), hairline dividers. The one navigation surface that's guaranteed to appear on every single mobile visit uses none of it; it's the default unstyled-list pattern found on effectively any template site.
**Exact correction:** Apply the same kicker/index treatment used elsewhere (mono `.font-label` styling for section names, or numbered indices matching the nav's own section order) and either give the panel a scrim/backdrop over the hero photo or make it a genuine full-screen takeover, consistent with how deliberately every other UI moment on the site has been treated.
**Expected impact:** The nav is seen on 100% of mobile sessions, at the very top of the funnel — it currently sets a "default template" first impression that the rest of the site actively works to avoid everywhere else.

---

## 9. Nav and kicker text never scale up on desktop

**Section:** Nav links, and every section kicker (`.font-label` — "Compañía — Argentina, desde 1994", "Papel Tissue", "Soluciones — 03", etc.)
**Viewport:** Measured at both ends: 390px and 1440px.
**What is visibly wrong:** `font-size: 13px` for `.font-label` computes identically at both 390px and 1440px viewport width — 0% change. Compare: the Hero H1 scales 44px→86.4px (1.96×) and the H2 scales 33.6px→60px (1.79×) across the same range. Every major heading in the type system is fluid; the entire label/kicker/nav layer is fixed.
**Why it reduces design quality:** On a 1440px display the nav and kickers are exactly as small, in absolute terms, as they are on a phone — they don't claim any of the extra space a large screen offers, while everything else on the page visibly does. At normal desktop viewing distance, 13px reads closer to fine print than to a primary navigation label.
**Exact correction:** Give `.font-label` a `clamp()` (e.g. `clamp(0.8125rem, 0.75rem + 0.2vw, 0.9375rem)`) so it gains a modest amount of size on larger viewports, the same way every other text role on the site already does — even a 2px gain at 1440px meaningfully changes how substantial the nav reads.
**Expected impact:** Brings the one text role that's visible on every screen, on every section, in line with the fluid-type system already built for everything else.

---

## 10. 184px of empty padding between StatsBand and WhatCotaDoes on mobile

**Section:** StatsBand → WhatCotaDoes (the transition itself).
**Viewport:** 390×844.
**What is visibly wrong:** Measured via computed style: `StatsBand`'s own bottom padding is 72px; `WhatCotaDoes`'s own top padding is 112px. The two sections are directly adjacent (0px gap between their boxes), so the combined dead zone between the last visible stat number and the next section's kicker is 184px — 22% of a 844px mobile viewport, entirely blank.
**Why it reduces design quality:** On mobile, where every scroll-inch is relatively more expensive than on desktop, a fifth of a screen with no content between two sections reads as a pause the design didn't intend, especially directly after the Hero and StatsBand — the two sections meant to give the fastest possible sense of what COTA does. It's the single largest content-free gap in the first two screens of the mobile experience.
**Exact correction:** Reduce `WhatCotaDoes`'s mobile-specific top padding (it currently uses the same `section-py-lg` role at every breakpoint that gives it 112px on mobile before also carrying a 144–176px desktop value) — a mobile-specific lighter first-section padding (e.g. 56–64px) would still read as a clear section break without costing an extra fifth of a screen.
**Expected impact:** Tightens the highest-attention part of the mobile scroll (the first 2 sections after Hero) without touching desktop spacing at all.

---

## Additional findings (beyond the top 10)

### 11. Hero kicker text runs edge-to-edge at mobile width

**Section:** Hero.
**Viewport:** 390×844.
**What is visibly wrong:** "ARGENTINA — QUÍMICOS / PAPEL TISSUE / SOLUCIONES INDUSTRIALES" — 54 characters of uppercase tracked type — spans the full container width and wraps to exactly 2 lines with almost no margin to either edge.
**Why it reduces design quality:** It's the first line of type the visitor reads, and it's the densest, hardest-to-scan line on the entire mobile Hero — small caps, wide tracking, wrapped mid-word-group ("SOLUCIONES" starts a new line with no visual grouping cue), while the actual message ("Materia en transformación.") is one line below in far larger, easier type.
**Exact correction:** Shorten to the two most load-bearing terms for a first-screen read (e.g. "Argentina — Papel Tissue y Químicos") on mobile specifically, saving the full three-way list for the body copy line below it, which already states all three explicitly.
**Expected impact:** Reduces the cognitive load of the very first thing read on a phone, without removing any information (it's restated one line down).

### 12. Google Maps embed shows a mostly-blank frame before tiles finish loading

**Section:** Contact (`#contacto`).
**Viewport:** Observed at 1440×900; likely applies everywhere the iframe is present, though this may be connection-speed dependent rather than a fixed layout defect.
**What is visibly wrong:** On first paint, the embedded map shows only a small UI control (fullscreen icon) against an otherwise blank light-grey frame — the street/road tiles hadn't rendered yet at the moment of capture.
**Why it reduces design quality:** A map with no visible geography reads as broken, even briefly, in a section whose entire job is to make the physical plant feel concrete and reachable.
**Exact correction:** Confirm this is purely a network-timing artifact of the test environment rather than a real loading-state gap; if reproducible on a normal connection, add an explicit loading placeholder (e.g. a static preview image of the plant location) shown until the iframe's `load` event fires.
**Expected impact:** Low-to-moderate — this note carries lower confidence than the others above, since it may not reproduce outside this test environment, but it's cheap to add a static fallback either way.

---

## Categories audited with no material findings

For completeness — these were checked and did not surface a defect worth reporting:

- **Nav horizontal balance (desktop):** measured — logo-to-links gap and links-to-Contacto gap are both exactly 323px at 1440px width; the header is a genuinely balanced 3-zone `justify-between` layout, not crowded.
- **Sticky behavior:** the nav's `fixed` positioning and background-pill toggle (transparent-over-photo → `bg-paper/95` once scrolled) work correctly at every viewport tested; no jitter, no z-index conflicts with in-page content besides the two nav-overlap cases already listed above.
- **ProductFamilies / IndustrialProcess mobile carousels:** swipe affordance (partially-visible next panel, progress dots, drag-to-seek bar) all render and track correctly at 390px.
- **WhatsApp button footer-avoidance:** the floating button correctly fades out with `opacity/pointer-events` once the footer enters view, at every viewport checked.

---

*Audit performed via live browser inspection of the deployed site (`cota-eta.vercel.app`) using real viewport resizing, scrolling, and DOM/computed-style measurement against the rendered page — a black-box pass, not a code review. No code was modified.*
