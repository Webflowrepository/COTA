# COTA — Reference Gap Audit

Comparative visual study of `cota-eta.vercel.app` against `terminal-industries.com` and `q-industrial.com`, on the rendered homepages only. No source code was read to produce this document — every claim below is backed by what actually renders in the browser.

**Methodology note:** primary viewports requested were 1440×900 and 390×844. COTA's own site rendered correctly at 1440×900 in this session (confirmed in the prior defect-correction pass). The capture tool could not reliably produce a full-resolution screenshot of `terminal-industries.com` or `q-industrial.com` at exactly 1440×900 in this session — the two reference sites were therefore inspected at **1024×768** for desktop composition (a legitimate, comparable desktop breakpoint; both sites' own responsive behavior is stable across the 1024–1440 range, confirmed via computed `innerWidth`), and at the full **390×844** for mobile, matching COTA's mobile capture exactly. Every finding below rests on evidence visible at one of these confirmed-working captures.

---

# 1. WHAT COTA ALREADY DOES AT REFERENCE LEVEL

Conservative on purpose — these are decisions that already work and should not be touched just to make them different from the references.

### 1.1 The Hero commits fully to one real photograph

**What's already working:** `cota-eta.vercel.app/#top` opens with a single full-bleed aerial photograph of the actual Naschel plant at golden hour, filling the entire first viewport edge-to-edge. Overlaid text is limited to a kicker line, a two-word headline, one sentence of body copy, and one CTA — nothing else competes with the photograph.

**Why it works:** the image touches all four edges of the viewport with no padding or frame, so it reads as the world itself rather than a picture placed on a page. Text is confined to roughly the bottom third and never exceeds a narrow column width.

**Reference-level principle satisfied:** this is the exact mechanism Terminal Industries opens with — a single full-bleed vehicle photograph, minimal overlaid text, one scroll cue. COTA's version uses a real photo of its own facility rather than a generic vehicle, which is the correct choice for an infrastructure/manufacturing company.

**What must NOT be changed:** do not add a second image, a stat band, or additional copy to the Hero. Do not inset the photo or add margin around it. Do not soften or reduce how much of the viewport it occupies.

### 1.2 NaschelPlant's number treatment

**What's already working:** the "700" (T/MES) figure in NaschelPlant renders in the site's largest available type size, directly over the full-bleed plant video, with no card, box, or background chip behind it — the number sits on the photograph itself.

**Why it works:** it's the only place on the page where typography itself, not a photograph, becomes the dominant visual signal — and it does so while staying physically anchored to the real photographic evidence behind it (the actual plant), not floating in an abstract stat band elsewhere on the page.

**Reference-level principle satisfied:** this is functionally the same move Q Industrial makes with its hero wordmarks (type as the dominant visual element) combined with the same move Terminal makes when it puts "50% more throughput" directly over an aerial yard photo (a number tied to visible physical evidence, not abstracted into a separate section).

**What must NOT be changed:** do not shrink the number, move it into a card, or add a border/background behind it. Do not add more numbers to this same moment — its strength comes from being one number, once.

### 1.3 Navigation restraint

**What's already working:** the nav carries a logo, six anchor links, and a "Contacto" link — no dropdowns, no mega-menu, no secondary icon row. Its background stays transparent over dark hero photography and only gains a solid pill once the user has scrolled.

**Why it works:** the nav never competes with the content behind it, and the transparent-to-solid transition means it reads as part of the same photograph-first system as the Hero, not a separate UI layer bolted on top.

**Reference-level principle satisfied:** matches the minimal-nav pattern both references use — Terminal's nav is logo + 4 links + 2 CTA buttons, Q Industrial's is logo + a handful of links + a CTA. Neither reference site uses a mega-menu or nav-embedded search.

**What must NOT be changed:** do not add more top-level links, a permanently opaque background, or secondary utility icons (search, cart, language switcher) to the nav.

### 1.4 One accent color, one job

**What's already working:** COTA uses exactly one accent color (green) and reserves it for the nav's active-link state — every other interactive element (CTAs, hover states, focus rings) uses ink/paper with opacity or underline changes instead of a second color.

**Why it works:** the restraint means the one moment green DOES appear (telling you where you are in the nav) reads as informative, not decorative — it hasn't been diluted by also appearing on ten other unrelated elements.

**Reference-level principle satisfied:** both references keep their palettes narrow — Terminal is near-monochrome (navy/cream photography) plus a single lime-green accent used almost exclusively for primary CTAs; Q Industrial is black/white/red, red reserved for CTA buttons only.

**What must NOT be changed:** do not introduce a second accent color, and do not spread green into more UI elements (buttons, borders, backgrounds) than it currently touches.

### 1.5 IndustrialProcess's horizontal scroll-panel mechanic

**What's already working:** scrolling into `#proceso` hijacks vertical scroll input to drive a horizontal panel track — a materia-prima-to-producto-terminado sequence the user pulls through sideways rather than reading as a static vertical list.

**Why it works:** it's COTA's only genuinely distinctive interaction pattern on the page — everything else is a normal vertical scroll. It gives the site one moment that couldn't be replicated by scrolling past a series of `<section>` elements.

**Reference-level principle satisfied:** functionally parallel to Terminal's own signature scroll-driven sequence (the dark abstract/wireframe passage that reveals headline text progressively) — both sites commit one section to a scroll mechanic that's more than "content appears as you scroll past it."

**What must NOT be changed:** do not remove the horizontal-scroll mechanic or convert it to a plain static grid. (The one real defect inside this section — an empty placeholder panel with no photograph — is addressed separately below; the mechanic itself should stay.)

---

# 2. THE 10 LARGEST REMAINING QUALITY GAPS

Ranked by how much each one separates COTA's execution from the references', based only on what's visible in the rendered pages.

---

## Gap 1 — Photographs sit inset with visible margin instead of full-bleed to the viewport edge

**Rank:** 1
**Affected sections:** WhatCotaDoes (all three business-line photos), SolutionsByApplication (segment photo), PapelTissueSpecs (catalog area has none at all — see Gap 3)
**COTA current rendered behavior:** in WhatCotaDoes, each business-line photo sits inside `container-industrial`'s padded content column — at 1440×900-class widths there's visible paper-colored margin on the right edge of the photo before the browser edge. The photo never touches the viewport boundary. Same pattern in SolutionsByApplication's single active-segment photo.
**Reference mechanism:** every comparable content photograph in both references touches at least one full viewport edge. Terminal's two aerial yard photographs (computer-vision overlay, fleet-rows) are both right-aligned and bleed straight to the browser's right edge with zero margin. Q Industrial's mountain-silhouette and train-yard photographs do the same.
**Why the difference matters:** an inset photo with visible margin around it reads as "an illustration placed on a page" — a supporting graphic. A full-bleed photo reads as "the world continues past what you can see" — physical, ongoing, real. This is the single largest driver of why the references feel like they're showing you an operation, while COTA's inset photos read as documentation of one.
**Exact proposed intervention:** let the photo column in these rows extend to the actual viewport edge instead of stopping at the container's padding — no new image, no new markup, only how far the existing element is allowed to run.
**Desktop consequence:** the photo becomes visibly larger and reads as continuous with the browser edge rather than framed inside a column; the row's asymmetry (text confined, photo unconstrained) becomes the composition's organizing idea instead of an accident of the grid.
**Mobile consequence:** these rows already stack full-width on mobile (confirmed in the mobile screenshot — the photo already runs edge-to-edge below the text), so mobile requires no change; this is a desktop-and-tablet-specific gap.
**Risk of making the change:** if the row's flex/grid math isn't adjusted at the same time, the photo could overlap the fixed WhatsApp button or crowd the nav at certain scroll positions — needs the same care given to the WhatsApp-avoidance logic already built elsewhere on the site.
**Expected visual impact:** high — this single change touches the most-repeated composition pattern on the page (the business-line row appears 3 times in WhatCotaDoes alone).

---

## Gap 2 — Text column claims fixed width; photo gets whatever is left over

**Rank:** 2
**Affected sections:** WhatCotaDoes
**COTA current rendered behavior:** the text column in each business-line row is a fixed-width block; the photo is the flexible remainder of the row. The text is guaranteed its full width regardless of viewport; the photo only ever gets what's left after text and gap are subtracted.
**Reference mechanism:** Terminal's aerial-photo sections do the reverse allocation — a narrow, fixed-width text column (roughly a third of the row) and a photo that claims the dominant remaining share of the width, confirmed visually across both aerial-photo moments on Terminal's homepage.
**Why the difference matters:** which element gets the "guaranteed" share versus the "leftover" share is a direct, visible statement of which one the composition considers more important. COTA's current allocation quietly tells the layout system the copy is the priority and the photo is decoration; the references do the opposite.
**Exact proposed intervention:** invert the allocation — give the photo the wider, guaranteed share of the row and let the text be the narrower column, matching the reference ratio (photo ≈ 60–65% of the row, text ≈ 35–40%).
**Desktop consequence:** each business-line row becomes visibly photo-led rather than text-led; the same real photography COTA already has (bobinas-deposito.jpeg, quimicos-tanques.png, naschel-planta-aerea.png) would simply occupy more of the frame.
**Mobile consequence:** none — mobile already stacks full-width, unaffected by this desktop row-ratio change.
**Risk of making the change:** the text (label + one-line description + secondary CTA) needs to still read comfortably at a narrower column width — worth a legibility check at the narrowed width before shipping.
**Expected visual impact:** high, and compounds directly with Gap 1 — the two together are effectively one composition fix applied to the same rows.

---

## Gap 3 — A mid-page content section with zero photographic material

**Rank:** 3
**Affected sections:** PapelTissueSpecs (the section's opening block — kicker, headline, body copy, CTA)
**COTA current rendered behavior:** confirmed by screenshot — this entire content block renders as black text on a plain white background with no photograph, no color treatment, no icon, nothing but type, before the "Modelos de negocio" content further down finally introduces layout variety.
**Reference mechanism:** every comparable mid-page content block in both references eventually resolves to a photograph, an icon-grid, or a deliberate atmospheric color treatment. Even Q Industrial's long black opening passage — the most restrained, text-forward stretch in either reference — is built from large-scale typography treated as a graphic element inside a color field, not plain black-on-white body text with nothing else happening.
**Why the difference matters:** a page that's otherwise carried by photography and full-bleed color moments loses momentum at the one point where it goes fully back to a conventional text block with no visual event at all — it reads as a placeholder for a section that hasn't been finished yet, not a deliberate quiet beat.
**Exact proposed intervention:** the same real bobinas photography already used elsewhere on the site (`bobinas-deposito.jpeg`, already deployed as a swatch in the Compañía row) could carry into this section's opening rather than introducing new content — a composition change, not a new-asset request.
**Desktop consequence:** the section gains a visual anchor at its opening beat instead of only gaining one much further down at "Modelos de negocio."
**Mobile consequence:** same principle applies — currently this block is also plain text-on-white on mobile with nothing else on screen for a comparatively long stretch.
**Risk of making the change:** reusing a photo that already appears elsewhere on the page (Compañía's Papel row) raises the site's existing photo-repetition count — needs to be weighed against how often that specific photo already recurs.
**Expected visual impact:** medium-high — this is the flattest, least-considered moment on the entire page relative to everything around it.

---

## Gap 4 — An empty placeholder panel still live inside the main process sequence

**Rank:** 4
**Affected sections:** IndustrialProcess (the "Producto Terminado" panel)
**COTA current rendered behavior:** confirmed by screenshot — scrolling through the six-panel horizontal sequence, the fifth panel ("Producto Terminado") renders as a flat gray rectangle with no photograph, sitting directly between two panels that do have real photography on either side.
**Reference mechanism:** neither reference site ships an empty card inside its primary product or process narrative. Every panel in Terminal's feature-card grid and every card in Q Industrial's Industries/Surfaces pair carries a real photograph — there is no visible precedent in either site for a placeholder appearing in the main flow.
**Why the difference matters:** a gray box appearing mid-sequence, flanked by real photography on both sides, reads as an unfinished section rather than a deliberate design choice — it's the most visible "this isn't done yet" signal in the entire scroll-driven sequence.
**Exact proposed intervention:** remove this one panel from the sequence (reducing it to 5 real-photo stages) rather than leaving a placeholder in place — subtraction, not a request for a new photograph.
**Desktop consequence:** the horizontal sequence becomes 5 consistently-photographic panels instead of 5 real + 1 empty; the scroll-drag distance shortens slightly, which is a secondary benefit given the section's already-long pin duration.
**Mobile consequence:** same fix applies — the mobile dot-navigation would drop from 6 dots to 5, and the swipeable carousel loses its one visibly broken-looking stop.
**Risk of making the change:** the stage numbering (currently "05 / 06") and the mobile dot-navigation logic both key off the total stage count — needs a matching update wherever that count is referenced, not just the removed panel itself.
**Expected visual impact:** high relative to how small the change is — a single missing photo currently undermines the credibility of an otherwise strong, distinctive scroll sequence.

---

## Gap 5 — No unifying color treatment ties COTA's photography together

**Rank:** 5
**Affected sections:** site-wide (Hero, WhatCotaDoes, ChemicalsToPaper, ProductFamilies, NaschelPlant — every section using a real photograph)
**COTA current rendered behavior:** each photo keeps its own native color temperature — Hero is golden-hour orange, ChemicalsToPaper's tank photos lean blue-daylight, WhatCotaDoes's warehouse interior is neutral fluorescent white, NaschelPlant's plant video is dusk-toned. Confirmed across every desktop screenshot — no consistent color grade connects them.
**Reference mechanism:** Q Industrial applies one disciplined warm amber/rust color grade across otherwise-unrelated photographs (mountain silhouettes, landscape shots) — confirmed identical color character across at least three separate images. Terminal applies a comparably consistent cool dawn-to-navy treatment across its truck photography and yard aerials.
**Why the difference matters:** a shared color treatment is what makes a set of different photographs read as one material world rather than a folder of separately-sourced images — it's a primary mechanism behind why the references feel authored as a single object rather than assembled from parts.
**Exact proposed intervention:** apply one consistent, subtle color treatment (a duotone or a narrow-range color grade) uniformly across `PhotoMedia`'s rendered output, tuned to sit naturally with COTA's existing ink/paper/green palette rather than introducing a new one.
**Desktop consequence:** every photograph on the page would read as part of one continuous visual world instead of a mix of independently color-balanced source photos.
**Mobile consequence:** identical benefit — mobile shows the same source photography, so the same treatment applies without any mobile-specific work.
**Risk of making the change:** applying a grade globally risks muddying photos that are already dark (ChemicalsToPaper, NaschelPlant, IndustrialProcess's dark panels) if the treatment isn't calibrated separately for light-background versus dark-background photo contexts — needs a light-touch, tested pass, not a single blanket filter value.
**Expected visual impact:** high and compounding — this is the one intervention that would be felt on literally every photograph on the site simultaneously.

---

## Gap 6 — Two consecutive forced-scroll pinned sections with no breathing section between them

**Rank:** 6
**Affected sections:** IndustrialProcess → ChemicalsToPaper (the transition itself)
**COTA current rendered behavior:** IndustrialProcess pins the viewport for roughly 2 screens of scroll to drive its horizontal panel track; ChemicalsToPaper immediately follows with its own pin, driving a crossfade over roughly 2.4 screens — adjacent in the DOM, nothing but a section boundary between them.
**Reference mechanism:** Terminal commits to exactly one sustained scroll-hijacked passage (the dark abstract/wireframe sequence) before returning to normal scrolling; Q Industrial's hero pin is a single, simpler anchor-and-reveal, also not immediately followed by a second independent pin.
**Why the difference matters:** either COTA pinned section alone reads as a deliberate signature moment, matching the references' own use of one sustained scroll-driven passage. Placed back to back, the visitor exits one hijacked-scroll section directly into another, with no normal page movement in between to reset the sense that scrolling equals moving — neither reference asks for this much consecutive forced-scroll investment in one stretch.
**Exact proposed intervention:** shorten one of the two pin distances (most naturally ChemicalsToPaper's, since it already crossfades two chapters inside one continuous pin and has the most slack to compress) rather than inserting new content between them.
**Desktop consequence:** the combined forced-scroll span drops from roughly 4.4 screens to something closer to 3, without touching either section's content or removing the pin mechanic itself.
**Mobile consequence:** both sections already use their own `vh`-based pin distances independent of viewport width, so the same proportional shortening applies identically on mobile.
**Risk of making the change:** ChemicalsToPaper's crossfade timing (chem items fading in at specific timeline points, paper items following) is tuned to the current pin length — shortening it requires re-tuning those same timeline positions, not just changing a height value.
**Expected visual impact:** medium-high — most felt by return visitors and anyone scrolling at a normal pace rather than skimming.

---

## Gap 7 — No single, sustained negative-space passage on the page

**Rank:** 7
**Affected sections:** overall pacing, most visible in the Hero → StatsBand → WhatCotaDoes stretch
**COTA current rendered behavior:** COTA's whitespace is distributed via four graduated section-padding roles (xs/sm/md/lg) applied fairly evenly across the page — confirmed via the site's own spacing system and screenshots — meaning no single stretch of the page commits to being dramatically quieter than the rest.
**Reference mechanism:** Q Industrial commits to a genuinely long, mostly-black, minimal-content passage — several full viewport-heights of near-empty space carrying only its hero wordmarks and one short headline — before any photography or dense content appears. That sustained quiet is itself a design statement, not just a gap between two sections.
**Why the difference matters:** evenly-distributed breathing room reads as consistent craft (which COTA has); one deliberately oversized quiet passage reads as confidence — the brand demonstrating it doesn't need to fill every scroll-inch with proof. COTA currently has no equivalent moment at any scale.
**Exact proposed intervention:** identify one existing transition already well-suited to carrying more space (the Hero-to-StatsBand handoff is the strongest candidate, given Hero already ends on a quiet, uncluttered frame) and let its existing whitespace role expand meaningfully beyond its current xs/sm padding value — a pacing adjustment to an existing gap, not new content.
**Desktop consequence:** one moment on the page would read as a deliberate pause rather than every transition reading at a similar, moderate tempo.
**Mobile consequence:** the same transition should receive a smaller, but still noticeably larger-than-usual, expansion — mobile has less scroll-inch to spend than desktop, so this needs a lighter touch than the desktop version, not a proportional 1:1 copy.
**Risk of making the change:** overdone, this reads as an accidental gap rather than a deliberate pause (exactly the failure mode the recent StatsBand→WhatCotaDoes defect fix just corrected) — this intervention only works if the expanded space is unmistakably intentional (e.g., paired with a single small design element that confirms the pause was planned), not merely "more padding."
**Expected visual impact:** medium — a subtler, pacing-level change rather than a compositional one, but real if executed with restraint.

---

## Gap 8 — The aerial/overhead viewpoint that communicates scale is used only once

**Rank:** 8
**Affected sections:** IndustrialProcess, ChemicalsToPaper, WhatCotaDoes (none use an overhead framing; only NaschelPlant/the footer do)
**COTA current rendered behavior:** every process-and-product photograph on the page is shot from eye level or a ground-level vantage (the tank photos, the bobinas warehouse interior, the rebobinado machine shot) — confirmed across every process/product screenshot. Only the aerial plant shot (Hero, footer, NaschelPlant) is overhead, and it's the same photograph reused in each of those three placements.
**Reference mechanism:** Terminal specifically and repeatedly uses an overhead/aerial viewpoint at the moments it wants to communicate physical scale — the computer-vision-overlay yard photo and the fleet-rows photo are both shot straight down, and that specific viewpoint is what makes a "yard" legible as a large, countable, physically extensive space rather than a single truck in a lot.
**Why the difference matters:** eye-level photography (which COTA otherwise uses well) shows quality and process; it doesn't communicate extent, count, or scale. Terminal reserves the overhead shot specifically for the moments it wants scale to be the message — a device COTA doesn't currently have available anywhere in its process/product narrative.
**Exact proposed intervention:** none of COTA's existing process photography is shot overhead, so this cannot be achieved by recomposing an existing image — flagged here as a real, visible gap in the *type* of photography available, not something correctable through layout alone. (Not counted toward the Top 5, since it depends on photography COTA does not currently have.)
**Desktop consequence:** n/a until new photography exists.
**Mobile consequence:** n/a until new photography exists.
**Risk of making the change:** n/a — no code-level intervention is proposed for this gap.
**Expected visual impact:** would be high if addressed, but is asset-dependent rather than execution-dependent.

---

## Gap 9 — The same three-line business pitch appears twice in a row, diminishing both instances

**Rank:** 9
**Affected sections:** ProductFamilies → SolutionsByApplication (the transition itself)
**COTA current rendered behavior:** confirmed by screenshot — ProductFamilies' three photo panels (Bobinas, Químicos, Soluciones) are followed immediately by SolutionsByApplication's three-tab layout (Convertidores, Distribuidores, Papeleras), presenting a closely related three-way split using two different UI patterns back to back.
**Reference mechanism:** neither Terminal nor Q Industrial repeats a three-item structure twice in immediate succession anywhere on their homepages — each section-level idea in both references gets exactly one treatment before the page moves to a genuinely different idea.
**Why the difference matters:** visual density and pacing both suffer when two consecutive sections are structurally near-identical (three cards, then three tabs, covering close to the same ground) — a visitor who engaged with the first gets diminishing return from the second, and neither section gets to feel like a distinct signature moment.
**Exact proposed intervention:** this is a content/IA question more than a pure visual one, and sits outside a code-only composition fix — noted here for completeness since it's directly visible in the comparative scroll-through, but not proposed as one of the Top 5 (it would require deciding which of the two sections' information survives, which this audit's constraints don't cover).
**Desktop consequence:** n/a — not proposed for implementation here.
**Mobile consequence:** n/a — not proposed for implementation here.
**Risk of making the change:** n/a.
**Expected visual impact:** would be high if resolved, but resolving it is an IA decision, not a design-execution one.

---

## Gap 10 — Typography never becomes the dominant visual signal outside one moment

**Rank:** 10
**Affected sections:** page-wide headline typography (H1/H2 treatment across Hero, WhatCotaDoes, PapelTissueSpecs, SolutionsByApplication)
**COTA current rendered behavior:** COTA's headlines (confirmed via the site's own fluid type scale) grow from roughly 44px to 86px across the responsive range — a conventional editorial headline scale. Only NaschelPlant's "700" pushes into a size where type itself becomes the composition's dominant element (see Section 1.2, already a strength).
**Reference mechanism:** Q Industrial's hero wordmarks ("Industrial" / "Coatings") render at a scale that fills most of the black canvas — large enough that the typography itself, not a photo, is the primary thing being looked at in that moment. It's a repeatable device in Q Industrial's system, not a one-off.
**Why the difference matters:** COTA has proven (with the "700" number) that it can execute this move well — the gap is that it only happens once, at the very end of the page, rather than being available as a recurring device the way Q Industrial uses it.
**Exact proposed intervention:** not proposed for implementation here — turning this into a repeatable device would mean identifying which additional existing headline(s) could carry a comparable scale increase without the change reading as arbitrary, which is a section-by-section judgment call better made with the client present, not a blanket rule to apply everywhere.
**Desktop consequence:** n/a — not proposed for implementation here.
**Mobile consequence:** n/a — not proposed for implementation here.
**Risk of making the change:** oversizing type in more places than it's earned would dilute the one place it currently lands hardest (NaschelPlant) — this is exactly the failure mode to avoid.
**Expected visual impact:** would be medium-high if extended thoughtfully; high risk of backfiring if applied indiscriminately.

---

# 3. TOP 5 INTERVENTIONS

Selected for visual impact, not implementation convenience. All five are subtraction, recomposition, or pacing moves — no new sections, no new copy, no new visual identity.

---

### 1. Rebalance WhatCotaDoes and SolutionsByApplication toward full-bleed, photo-dominant composition

**What exactly changes:** the business-line photo in each WhatCotaDoes row (and the single active-segment photo in SolutionsByApplication) extends to the actual viewport edge instead of stopping inside the padded container; the text column narrows from its current fixed width to a smaller, genuinely secondary share of the row, letting the photo claim the dominant remaining space.
**What remains unchanged:** the photographs themselves (no new assets), the copy, the row order, the stacked full-width mobile layout (already correct), the CTA placement within the text column.
**Why this is high leverage:** this single change addresses Gap 1 and Gap 2 together, and touches the most-repeated composition pattern on the page — the business-line row appears three times in WhatCotaDoes alone, so one fix compounds across the whole section.
**Which sections are affected:** WhatCotaDoes (all three rows), SolutionsByApplication (the active-segment photo).
**How to verify success visually with Playwright:** screenshot each row at 1440×900 and confirm the photo's right edge touches the viewport boundary (`getBoundingClientRect().right === window.innerWidth`); confirm the photo's measured width now exceeds the text column's width, reversing today's ratio; re-check mobile (390×844) to confirm the already-correct stacked layout is untouched.
**What would indicate the intervention made the design worse:** the text becoming too narrow to read comfortably (wrapping to 4+ lines for what was previously 2), or the widened photo overlapping the fixed WhatsApp button or nav at any scroll position.

---

### 2. Remove the empty "Producto Terminado" panel from IndustrialProcess

**What exactly changes:** the horizontal sequence drops from 6 panels (5 real photographs + 1 gray placeholder) to 5, all photographic; the stage counter and mobile dot-navigation are updated to match the new count of 5.
**What remains unchanged:** the horizontal-scroll-hijack mechanic itself, the 5 real-photo panels and their copy, the pin/scrub GSAP setup driving the track.
**Why this is high leverage:** the empty panel is currently the single most visible "unfinished" signal inside COTA's strongest, most distinctive interaction moment — removing it is a small, low-risk change with an outsized credibility payoff, and it shortens an already-long pinned section as a side benefit.
**Which sections are affected:** IndustrialProcess only.
**How to verify success visually with Playwright:** scroll through the full horizontal sequence at 1440×900 and confirm every panel now shows real photography with no gray/empty frame; confirm the stage label reads "01/05" through "05/05" (not "/06"); confirm the mobile dot-navigation shows 5 dots, not 6.
**What would indicate the intervention made the design worse:** the sequence now feeling too short or abrupt relative to the rest of the page's pacing, or the removed stage's information (if any was load-bearing) disappearing from the narrative entirely rather than being absorbed by an adjacent stage.

---

### 3. Shorten the combined pin distance of IndustrialProcess + ChemicalsToPaper

**What exactly changes:** ChemicalsToPaper's pin duration (and its internal crossfade timeline positions, which are tied to that duration) is compressed, reducing the combined forced-scroll span of the two consecutive pinned sections from roughly 4.4 screens to roughly 3.
**What remains unchanged:** both sections' pin mechanics remain in place, the crossfade between Químicos and Papel chapters still happens, all copy and photography are untouched — only the scroll distance required to move through them changes.
**Why this is high leverage:** this is the pacing fix most likely to change how the middle third of the page *feels* to scroll through, without touching a single piece of content — matching how the references each commit to one sustained scroll-driven passage rather than two stacked back to back.
**Which sections are affected:** ChemicalsToPaper primarily (IndustrialProcess is a secondary candidate if further shortening is needed after this change).
**How to verify success visually with Playwright:** measure total scroll distance from IndustrialProcess's `top` to ChemicalsToPaper's `bottom` before and after (via `getBoundingClientRect`) at 1440×900; confirm the ratio drops meaningfully; scroll through at a real, human wheel-scroll pace and confirm the Químicos→Papel crossfade still completes cleanly at the new, shorter duration (no chapter appearing "cut off" mid-transition).
**What would indicate the intervention made the design worse:** the crossfade now happening too fast to read comfortably, or ChemicalsToPaper losing the sense of being its own deliberate moment rather than a rushed afterthought to IndustrialProcess.

---

### 4. Apply one consistent color treatment across all photography

**What exactly changes:** a single, subtle color grade (calibrated separately for light-background and dark-background photo contexts) is applied uniformly through `PhotoMedia`'s rendering, so every photograph on the site shares a consistent color character instead of each retaining its own native color temperature.
**What remains unchanged:** the photographs themselves, their crops, their placements, and the site's existing ink/paper/green palette (the grade should sit inside that palette's logic, not introduce a new one).
**Why this is high leverage:** this is the one intervention felt on literally every photograph on the page at once — it's the primary mechanism behind why the references read as one authored material world rather than a set of independently-sourced images, and it requires zero new content.
**Which sections are affected:** every section using `PhotoMedia` — Hero, WhatCotaDoes, ChemicalsToPaper, ProductFamilies, SolutionsByApplication, NaschelPlant.
**How to verify success visually with Playwright:** screenshot every photo-bearing section at 1440×900 before and after; visually confirm the color character (warmth/coolness, contrast range) now reads as consistent across sections that previously looked visibly different in temperature (e.g., Hero's golden-hour tone versus ChemicalsToPaper's blue-daylight tanks).
**What would indicate the intervention made the design worse:** any photo becoming muddy, low-contrast, or harder to read its actual subject matter than before — especially photos already on dark backgrounds, where an added grade risks crushing shadow detail.

---

### 5. Give one existing transition a deliberately oversized quiet passage

**What exactly changes:** the whitespace already present at one transition (the Hero-to-StatsBand handoff is the strongest candidate) is expanded well beyond its current padding value, so that one moment on the page reads as a sustained, deliberate pause rather than a normal section break.
**What remains unchanged:** every other section's spacing role (xs/sm/md/lg) stays exactly as-is; no content is added or removed; this is a single, isolated pacing exception, not a change to the spacing system itself.
**Why this is high leverage:** COTA currently has no moment that reads as confidently unhurried the way Q Industrial's long black hero-into-intro passage does — one well-placed exception can establish that quality without touching the rest of the page's already-tuned rhythm.
**Which sections are affected:** the Hero→StatsBand transition specifically (chosen because Hero already ends on an uncluttered frame, making the pause feel earned rather than empty).
**How to verify success visually with Playwright:** screenshot the transition at 1440×900 and 390×844 before and after; confirm the expanded gap reads as intentional rather than broken by checking that no content is orphaned mid-viewport at any scroll position within the expanded range; compare against the recently-fixed StatsBand→WhatCotaDoes gap to confirm this new gap is visibly and deliberately larger, not accidentally similar in size.
**What would indicate the intervention made the design worse:** the expanded gap reading as a bug rather than a pause (the exact failure mode just corrected elsewhere on the page) — if it doesn't unmistakably read as intentional, it has failed and should be reverted rather than incrementally adjusted.

---

# 4. DO NOT TOUCH

Protect these during any refinement pass — changing them would not close a gap with the references, it would just make COTA look like a different site.

- **The Hero's full-bleed real aerial photo of the actual plant**, its minimal overlaid text, and its single CTA. Already at reference level (Section 1.1).
- **NaschelPlant's "700" number treatment** — its scale, its placement directly over the photograph, and the fact that it appears once. Already at reference level (Section 1.2).
- **The nav's minimal link structure and scroll-triggered background pill.** Already at reference level (Section 1.3).
- **Green as the single accent color, reserved for the nav's active-link state.** Do not spread it to more elements; do not add a second accent color.
- **IndustrialProcess's horizontal-scroll-hijack mechanic itself** (as distinct from the one empty panel inside it, which Top-5 intervention #2 addresses). This is COTA's only truly distinctive interaction pattern.
- **The use of real, COTA-sourced photography** (the actual Naschel plant, actual product, actual process) over stock or AI-generated imagery. Every intervention above should be executed using existing real photographs — none of them require or justify introducing generic/stock imagery to hit a reference-level composition ratio faster.
- **The project's no-fabrication content rule** — verified facts only, no invented certifications, clients, or specs. Any pursuit of reference-level polish (trust badges, client logos, analyst validation marks) must not motivate inventing content COTA cannot verify.
- **The WhatsApp floating button** and its existing footer-avoidance behavior — an established, protected element independent of this audit.
- **The already-correct mobile stacking pattern** in WhatCotaDoes, where photos already run full-width below their text — this is already at the ratio the desktop fix (Top-5 #1) is trying to reach.

---

*Comparative audit performed via live browser inspection of all three rendered homepages — screenshots and scroll-through observation only. No source code was read for any of the three sites, including COTA's own, to produce these findings.*
