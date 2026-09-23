# CLAUDE.md — TEMPO COCINA · Mobile mockup implementation

> **Scope of this file.** It lives in `TempoCocinaMovil/` and governs everything under that folder. If the web `CLAUDE.md` is also loaded (Claude Code reads parent folders), **this file wins for anything inside `TempoCocinaMovil/`**: mobile has its own platform, tokens, type scale, canvas and component catalog. Never import styles, tokens or components from the web project — it is a different stack. If a piece is worth reusing, copy the *values* and rebuild them the Android way.

> **Revision note.** An earlier version of this file described an Angular + SCSS implementation, copied from the web project. **That was wrong**: `TempoCocinaMovil/` is an Android app (Gradle + Kotlin + XML layouts), and M-01, M-08 and M-13 are already built as XML layouts with `AppCompatActivity`. Sections 1, 2, 3, 6, 8, 9, 10 and 11 were rewritten against the real code. Sections 4, 5, 7, 12 and 13 kept their values, which are platform-independent. Facts corrected while rewriting are listed in section 14.

## 0. Language

- These instructions are in English. **All UI copy stays in Spanish, exactly as it appears in the mockups** (spelling, accents, capitalization). Never translate, paraphrase or "fix" UI text.
- Code identifiers, file names, commits and code comments: English — **except** the identifiers the baseline already uses, which are Spanish (`tituloModulo`, `cardReceta`, `btnEmpezar`). Follow the baseline inside this project.
- Screen reports in `docs/screens/` and end-of-task summaries in chat: **Spanish**.
- The app locale is Spanish. `android:supportsRtl="true"` is already set; keep it and use `start`/`end` (never `left`/`right`) so the layout still mirrors correctly.

## 1. Context

TEMPO COCINA is a culinary logistics and alarms system (UX course project, MISO Master's program, Universidad de los Andes — David Rojas · Diego Rojas). High-fidelity mockups exist in Figma for web and mobile. The web app plans the recipe and its alarms. **The mobile app runs them in the kitchen**: it receives the configuration, takes priority over the phone's audio, runs the timers in parallel and closes the session with a summary. The design system below was inferred from the 14 mobile screens.

**This phase is visual implementation of the mobile version only**: reproduce the screens as **Android XML layouts driven by `AppCompatActivity`**, with no business logic, inside `TempoCocinaMovil/`.

- Figma (mobile mockups): https://www.figma.com/design/3ckGVFDTfe53VKggdmjxmK/Mobil---Mockups
- System Design PDF: `docs/design/TempoCocina-SystemDesign-Mockups-Movil-final.pdf` — 26 pages: Style Tile (p3), Color (p4), Typography (p5), Iconography (p6–7), Components (p8–10), Layout/spacing/elevation (p11), screen catalog (p13–26; screen M-XX is on page 12 + XX). **This file is not in the repo yet** — if it is still missing, say so and work from Figma and the screenshots.
- Reference screenshots: `docs/mockups/M-XX.png`, exported at **4×** (1560px wide = 390dp × 4). Divide any measurement taken from them by 4.
- Scope, in this order, **one screen at a time**: **M-02 → M-03 → M-07**.

Mobile inventory (14 screens, contiguous IDs): M-01 … M-14. **M-01, M-08 and M-13 are already built.** M-02, M-03 and M-07 exist as **empty stubs** — layout with only the root `ConstraintLayout`, an Activity that inflates it, and a manifest entry. Filling those stubs is the job. Do not build the others and do not link to them.

### Already built — the baseline

| ID | Activity / layout | System components it already implements (PDF catalog) |
|---|---|---|
| **M-01** | `m01_recetas` / `activity_m01_recetas.xml` | Top app bar · Recipe card · Info banner · Process item · Counter chip · Button primary / secondary |
| **M-08** | `m08_resumen` / `activity_m08_resumen.xml` | Status banner · Timer card · Chips de estado · Disabled state |
| **M-13** | `m13_alarma` / `activity_m13_alarma.xml` | Modal · Icon con badge · Chip de estado · Nota con advertencia · Button primary |

**The existing code is the standard for how things are done here.** Its resource names, id naming, layout structure, drawable conventions, Activity boilerplate, report format and commit style are the conventions to follow. Sections 4–10 describe the target the design system asks for; where the existing code already solved something differently, **the existing code wins**, and the gap goes in the report as a note, not as a refactor. Do not rename resources or restructure layouts that M-01, M-08 and M-13 use.

Expected reuse (confirm against the code in Phase 0):

| New screen | Reuse from the baseline | Probably new |
|---|---|---|
| **M-02** | Top app bar block (kicker + title + logo), `@color`/`@dimen` tokens, button background drawables, `@font/roboto_*` | Icon tile 64 / 44, List item con icono, sound-test row, primary button with a leading icon on an orange circle |
| **M-03** | Top app bar, Status banner, Timer card, status chips, progress bar (M-08), Counter chip (M-01) | Timer card **active** variant with inner Timer display and button pair, «Pausar todo» full-width outline |
| **M-07** | Top app bar, Button primary, chips, progress bar, Icon tile (from M-02) | Metric card, Comparative bars, Insight card, success and soft-critical chip tones |

Extending a baseline piece (a new drawable variant, a new dimen) is fine; changing how an existing screen renders is not. Any change to a shared resource requires the regression check in section 11.

### Screens in scope

| ID | Title | Module (kicker) | What it is | PDF page |
|---|---|---|---|---|
| **M-02** | Permiso de audio prioritario | MÓDULO DE SINCRONIZACIÓN | Explains why the alarm must sound over silent mode and "No Molestar" before entering Kitchen Mode | 14 |
| **M-03** | Temporizadores activos · vista compacta | MÓDULO DE COCCIÓN • MODO ACTIVO | Control panel: three processes running in parallel, the one in alert highlighted | 15 |
| **M-07** | Resumen de cocción | SESIÓN FINALIZADA | Analytical close of the session: global accuracy, per-process deviation (plan vs. real), calibration suggestion | 19 |

Components and icons each screen uses are listed on its catalog page in the PDF. Build from that list, not from guesswork. The literal copy of each screen is in section 13, so you can cross-check what Figma returns.

**Shared mock data.** The baseline hardcodes every string and number directly in the layout XML; there is no model or mock layer. M-03 and M-07 show the same session as M-01 and M-08 — *Pollo al horno con arroz*, **3 processes** (Arroz, Horno, Salsa). Keep that data consistent across screens by hand and cross-check it against the already-built layouts; do not introduce a Kotlin model layer for it unless asked, since nothing in this phase reads it. The naming differs per screen on purpose (`Horno` in M-03 vs `Pollo al horno` in M-07; `Salsa` vs `Salsa (reducción)`): keep both labels and do not normalize them. The mobile session does **not** match the web mock (web uses 4 processes / 50 min). Do not reuse or reconcile it.

## 2. Source of truth and per-screen protocol

The design rules. **Do not invent content, copy, icons, colors or measurements.** If something is not in the PDF, Figma or the screenshot, stop and ask, or record it as an assumption in the screen report.

When sources disagree about **how the screen looks**: **Figma (values) > screenshot (visual result) > System Design PDF (documented intent) > this file**. When they disagree about **how the code is written** (structure, naming, resource names, layout idioms): **existing code of M-01 / M-08 / M-13 > this file**. Every disagreement goes in the screen report.

**Phase 0 — audit the baseline, once, before the first new screen.** Read `app/build.gradle.kts`, `gradle/libs.versions.toml`, `AndroidManifest.xml`, `res/values/` (`themes.xml`, `colors.xml`, `strings.xml`), `res/layout/`, `res/drawable/`, `res/font/`, `java/com/example/app/`, and `docs/screens/M-01.md`, `M-08.md`, `M-13.md` if they exist. Write `docs/screens/_baseline.md` (Spanish) with: the colors, dimens and styles in use and where they live, the reusable layout blocks and drawables with their ids, the icons already in `res/drawable`, how repeated rows are expressed, the Activity/manifest pattern, how screenshots and reports were produced, and every place where the code differs from sections 4–10 of this file. Also capture M-01, M-08 and M-13 as they render today (390 × 844, 4×) into `docs/screens/_baseline/M-XX.before.png`: these are the reference for the regression check in section 11. **Capturing requires an emulator or a device** — if none is available, say so and record the gap instead of skipping it silently. Do not change any code in Phase 0.

For each screen, in this order:

1. **Read the design.** Read the screen's page in the System Design PDF (component list + icon list + purpose), then get exact geometry from the Figma MCP (`get_metadata`, `get_design_context`, `get_variable_defs`, `get_screenshot`) or the 4× screenshot. Code returned by the Figma MCP is React + Tailwind: **translate it** to Android XML using the project's `@color`/`@dimen`/`@style`; never paste it as-is. The Figma MCP is rate-limited on the current plan — if it refuses, work from the screenshots and say so in the report.
2. **Inventory** in `docs/screens/M-XX.md`: regions, system components used, tokens, icons, literal copy, images, visible states. For each component, mark **reuse as is / extend (what) / create**, using `_baseline.md`.
3. **Shared pieces first**: missing colors/dimens, icons added to `res/drawable`, new reusable row layouts, new background drawables. Then the screen.
4. **Build the screen** by composing those pieces.
5. **Verify** (section 11) and **report** differences from the mockup.
6. One commit per screen (`feat(m-02): implement priority audio permission screen`), plus separate commits for shared resources.
7. **Stop and wait for review** before starting the next screen.

Do not add Gradle dependencies or change versions without asking.

**The phone chrome is not part of the app.** Every mockup shows an iOS status bar (`12:45`, signal, Wi-Fi, battery) and a home indicator at the bottom. Do not build them. The system draws its own; the app already calls `enableEdgeToEdge()` and applies `WindowInsetsCompat` padding to `@+id/main`, which is the Android equivalent of the safe areas. Keep that block in every new Activity. The real app header is the "Top app bar" block: kicker + title on the left, brand logo on the right.

## 3. What "no functionality" means

Yes:
- Complete layouts with faithful styling and visual states (pressed, focused, disabled) as defined in section 8.
- Real copy from the mockups, written into the layout the way the baseline does it.
- Repeated blocks (the three permission rows, the three timer cards, the three plan-vs-real cards) expressed as a **reusable row layout in `res/layout/item_*.xml` pulled in with `<include>`**, so the markup is written once. This is the Android equivalent of iterating; it needs no adapter and no code. Do not copy-paste the same block three times, and do not add a `RecyclerView` — that is real code for no benefit here.
- Navigation between implemented screens with an `Intent`, following `m01_recetas.kt`:
  ```kotlin
  findViewById<View>(R.id.btnEmpezar).setOnClickListener {
      startActivity(Intent(this, m03_cola_Alarmas::class.java))
  }
  ```
  - M-02 «Empezar en Modo Cocina» → M-03
  - M-03 «Finalizar sesión de cocina» → M-07
- Links to already-built screens are real: if the mockup implies «Ahora no» on M-02 goes back to M-01, wire that `Intent` (or `finish()` if M-02 was opened from M-01). If an existing screen has a control that leads to a screen you just built, wire it in a separate small commit and mention it in the report — only where the Figma prototype or the navigation map shows that link.
- Controls that lead to screens not built (e.g. «Evaluar» → M-09) get **no** `setOnClickListener`. Do not create placeholder Activities for them.

No:
- Networking, persistence, device pairing, real timers, audio playback, vibration, or any runtime permission request (`POST_NOTIFICATIONS`, `VIBRATE`, audio focus). The screen *explains* a permission; it must not request one.
- Business logic, `ViewModel`s, coroutines, data binding. The only allowed state is visual and local (e.g. a button toggling a selected background), done with a state-list drawable or a one-line `setOnClickListener` that flips a visual flag.
- Timers do not count down. Progress bars are **static**: set the value from the layout, never animate toward it.

## 4. Color

17 tokens, read directly from the mobile mockups (PDF p4). The system uses **one orange (`#ED532A`)** as its accent and reserves it for what demands action; the calm hierarchy is carried by the deep teal and a cool grey scale.

**Mobile values differ from web** (primary `#18434B` vs web `#1D434B`, background `#F8F9FA` vs `#F7F9FB`, a different error family).

**Where they live:** the palette is defined in **`res/values/themes.xml`**, not in `colors.xml` — `colors.xml` still holds only the Android Studio template colors and is unused. Reference every color as `@color/<name>`. Do not move the palette without asking; M-01, M-08 and M-13 depend on it.

### Brand and accent

| Token | Resource | Hex | Use |
|---|---|---|---|
| Primary | `@color/primary` | `#18434B` | Brand, titles, primary button, status banner, focus surfaces |
| Primary deep | `@color/primary_deep` | `#0F2B31` | Timer block in alarm state (alarm hero) |
| Secondary | `@color/secondary` | `#ED532A` | Sole accent: active alarm, critical CTA, numeric emphasis, module kicker |
| Secondary soft | `@color/secondary_soft` | `#FDDCCF` | Halos, badge backgrounds, soft alert states, **focus ring** |
| Secondary wash | `@color/secondary_wash` | `#FFF5F1` | Inline alerts and highlighted cards |

### Neutrals and text

| Token | Resource | Hex | Use |
|---|---|---|---|
| Background | `@color/background` | `#F8F9FA` | App canvas |
| Surface | `@color/surface` | `#FFFFFF` | Cards, fields, modals |
| Surface alt | `@color/surface_alt` | `#F1F5F9` | Inner blocks (timer display, insight card), neutral chips, icon tiles |
| Border | `@color/border` | `#E2E8F0` | 1px borders on cards, fields and separators; progress-bar track |
| Text primary | `@color/text_primary` | `#18434B` | Titles and high-hierarchy text |
| Text body | `@color/text_body` | `#1E293B` | Running text, high contrast |
| Text secondary | `@color/text_secondary` | `#64748B` | Descriptions, labels, metadata |
| Text disabled | `@color/text_disabled` | `#CBD5E1` | Inactive text and controls |

### Semantic (each needs color + text + background)

| Token | Color | Text | Background | Use |
|---|---|---|---|---|
| Success | `#10B981` ✅ | `#047857` ❌ | `#D1FAE5` ❌ | Process ready / on time («A tiempo») |
| Warning | `#F59E0B` ✅ | `#92400E` ❌ | `#FDE68A` ❌ | Reduction stage, slight deviation, attention |
| Error | `#EF4444` ✅ | `#B91C1C` ❌ | `#FEE2E2` ❌ | Validation and connection failures |
| Critical | `#ED532A` ✅ | `#9A2F12` ❌ | `#FFF5F1` ✅ (`secondary_wash`) | Alarm sounding / immediate action |

✅ defined · ❌ **missing from `themes.xml`** — add the ones a screen in scope actually needs, as `@color/success_text`, `@color/success_bg`, etc. Never rename or re-value a token the baseline uses without asking.

Rules:
- `#C63F18` and dark greys like `#2A2A2A` are leftovers from older exports and **do not exist** in the system. Neither do `#F97316` (a second orange) or `#94A3B8` (a grey), both of which leaked into the baseline layouts — see section 14.
- Components reference `@color/<semantic name>`. Never a literal hex in a layout or drawable.
- There is no `color-mix()` on Android. Derive a tint by adding an alpha channel to the hex (`#1A18434B` = primary at 10%) and **define it as a named color** in `themes.xml`, e.g. `@color/icon_tile_teal_bg`. Record every derived value in the report. Cases already known: the soft orange border of the active timer card (M-03), the teal-tinted 64 icon tile (M-02), the peach border of the soft critical chips and the light grey-blue "Plan" bar (M-07).

## 5. Typography

Single family: **Roboto**, weights Black, Bold, Medium, Regular, bundled in `res/font/` as `roboto_black.ttf`, `roboto_bold.ttf`, `roboto_medium.ttf`, `roboto_regular.ttf`. Reference them as `android:fontFamily="@font/roboto_bold"`, which is what the baseline layouts do. Sizes are dp on the 390dp canvas; in Android they are **`sp`** so they honour the user's font scale.

| Style | Font | Size / line | Tracking | Use |
|---|---|---|---|---|
| Display | Roboto Black | 48 / 52 | −1.0 | Full-screen alarm counter (`00:00`) — not used in the current scope |
| H1 | Roboto Black | 28 / 32 | −0.5 | Module title in the top app bar (`TEMP ACTIVOS`) |
| Timer | Roboto Black | 34 / 38 | −0.5 | Remaining time inside a timer card (`05:22`) |
| H2 | Roboto Bold | 22 / 28 | −0.2 | Screen title and main question (`Permiso de audio prioritario`) |
| H3 | Roboto Bold | 17 / 24 | 0 | Recipe, process or card name |
| Body | Roboto Regular | 15 / 22 | 0 | Descriptive and supporting text |
| Body S | Roboto Regular | 13 / 18 | 0 | Metadata, notes, microcopy |
| Caption | Roboto Medium | 11 / 14 | +0.8, **UPPERCASE** | Section, status and chip labels (`TIEMPO RESTANTE`) |
| Button | Roboto Bold | 16 / 20 | 0 | Primary and secondary button labels |

Rules:
- Define these as `<style>` entries in `themes.xml` and apply them with `style="@style/TextH2"`. **The baseline only defines two** (`TextTitle` 20sp, `TextBody` 14sp) and neither size matches this table, so the layouts set `textSize` literally 77 times. Add the missing styles as the screens in scope need them; do not retrofit the existing screens.
- Line height is `android:lineHeight` (API 28+) or `android:lineSpacingExtra`. Tracking is `android:letterSpacing`, expressed in **em** (px ÷ font size), not px.
- There is no monospace style on mobile. Timers and figures are Roboto Black / Bold with tabular figures: `android:fontFeatureSettings="tnum"`.
- Any number that counts or updates uses tabular figures so it does not jitter — `05:22`, `28:53`, `92%`, `+4 min`, `17m`.
- Uppercase is **visual**: use `android:textAllCaps="true"` and keep `android:text` in sentence case, so TalkBack does not spell the label out. This applies to Captions, kickers, text buttons («Ahora no», «Finalizar sesión de cocina») and the top-bar title. **The baseline writes them in literal uppercase** (`android:text="MÓDULO DE SINCRONIZACIÓN"`) — do it correctly in new screens and log the difference; do not rewrite the existing ones.
- Heading levels follow document structure, not visual size. Android has no `<h1>`: mark the top-bar title with `android:accessibilityHeading="true"` (API 28+) and do the same for section headings.

## 6. Iconography

34 icons, **extracted directly from the mockup screens**: not redrawn, not substituted from any library, keeping their original shape, stroke weight, color and proportion. Linear stroke of uniform weight on a square grid; solid variants only for the alarm state.

- Forbidden: Material Icons, Font Awesome or any icon font; emoji; Unicode characters as icons (not even `▶` or `■`).
- **There is no SVG sprite on Android.** Each icon is its own **vector drawable** in `res/drawable/ic_<name>.xml`. Export the SVG from Figma and convert it with Android Studio's *Vector Asset* import, or hand-write the `<vector>` keeping the original `viewportWidth`/`viewportHeight` and path data.
- Tinting replaces `currentColor`: set `android:fillColor="#FF000000"` in the drawable and apply the real color at the call site with `android:tint="@color/secondary"` on the `ImageView`. Icons whose color is part of their identity (brand mark, solid alarm variants) keep their own `fillColor` and get no tint.
- Naming: `ic_<name>.xml`, kebab collapsed to snake (`ic_bell_off.xml`), matching the catalog below.
- Decorative icon → `android:importantForAccessibility="no"`. Icon-only button → `android:contentDescription` in Spanish describing the action.
- The **brand logo** is already in the repo as `@drawable/tempo_cocina_logo` (PNG). Keep using it; do not rebuild the wordmark with `TextView`s.

### Catalog (PDF p6–7)

**Navigation and structure:** `book` (Receta activa) · `key` (Código de token) · `link` (Vincular dispositivo) · `refresh` (Reintentar sincronización) · `arrow-right` (Continuar) · `checkbox` (Proceso seleccionado)

**Timer control:** `play` (Empezar cocción / Escuchar) · `pause` (Pausar proceso) · `stop` (Detener proceso) · `stop-alarm` (Detener alarma) · `clock` (Posponer / siguiente) · `clock-alert` (Tiempo cumplido)

**Sound alerts:** `bell` (Modo Cocina) · `bell-ring` (Alarma activa) · `bell-solid` (Alerta sonora) · `bell-off` (Silencio ignorado) · `volume` (Audio prioritario) · `vibrate` (Vibración)

**State and validation:** `alert` (Error de validación) · `alert-solid` (Aviso inmediato) · `warning` (Advertencia) · `info` (Información) · `bolt` (Siguiente proceso) · `sparkles` (Aprendizaje automático) · `star` (Calificación activa) · `star-outline` (Calificación vacía)

**Culinary domain:** `pot` (Olla) · `station` (Estación de cocción) · `utensils` (Receta) · `flame` (Horno encendido) · `oven` (Horno) · `pan` (Salsa / reducción) · `cooker` (Arrocera) · `clipboard-check` (Sesión cerrada)

Icons in the current scope:

| Screen | Icons |
|---|---|
| M-02 | `volume` (large in the 64 tile, small in the first row), `bell-off` (orange), `vibrate`, `play` (orange, in «Escuchar»), `bell` (white on an orange circle, in the primary button) |
| M-03 | `pot` (next to «Arroz»), `stop`, `pause` |
| M-07 | `pot`, `oven`, `pan`, `sparkles` |

The baseline ships a handful of icons **as PNG** (`ic_bell.png`, `ic_arroz.png`, `ic_horno.png`, `ic_salsa.png`, `ic_star.png`, `ic_thunder.png`, `ic_aprendizaje.png`), which cannot be tinted cleanly and do not scale. Leave them alone; add **new** icons as vector drawables and note the inconsistency in the report. Some pieces that look like icons are shapes: the baseline builds them as `bg_*.xml` shape drawables (`bg_card.xml`, `bg_chip_*.xml`, `bg_circle_white.xml`). Follow that convention for tiles, chips and circles.

## 7. Layout, spacing, radii, elevation

**Canvas and margins**
- Canvas: **390 × 844dp** (iPhone 13/14 reference). One column.
- Side margin: **20dp** — `@dimen/margin_lateral`.
- Inner gutter (inside cards, between paired buttons): **12dp** — `@dimen/gutter_interno`.
- Top app bar: **64dp** — `@dimen/barra_superior` — followed by a 1px `@color/border` separator where the mockup shows one (M-02).
- Action zone: pinned to the bottom when the mockup separates it (M-07: «Evaluar» on a footer with a top border). Two 48dp buttons at most — `@dimen/boton_altura`.
- Vertical rhythm: multiples of 4; steps 4 · 8 · 12 · 16 · 24 · 32.

**Spacing scale** — `@dimen/space_4` … `@dimen/space_48` (4, 8, 12, 16, 24, 32, 48). Between cards in a list: 12. Between sections: 24 or 32. All already defined in `themes.xml`.

**Radii** — all already defined:

| Element | Radius | Resource |
|---|---|---|
| Chips and badges | 8dp | `@dimen/radius_chip` |
| Fields and paired buttons | 12dp | `@dimen/radius_field` |
| Cards | 16dp (exact per frame from Figma) | `@dimen/radius_card` |
| Main buttons | 999dp (pill) | `@dimen/radius_button` |
| Modals | 28dp | `@dimen/radius_modal` |

Radii are applied through shape drawables (`<corners android:radius="@dimen/radius_card"/>`), the way `bg_card.xml` does it.

**Elevation** — four levels: 0 border only · 1 card · 2 floating · 3 modal. **Shadow never replaces the border**: cards keep their 1px `@color/border` stroke to hold contrast against the light background. On Android, `android:elevation` draws the shadow and the `<stroke>` in the shape drawable draws the border; a card with elevation and no stroke is wrong.

**Layout rules**
- Figma auto layout → `LinearLayout` with `android:divider`/margins, or `ConstraintLayout` chains. Never absolute `x`/`y`.
- The baseline root pattern is `ScrollView` (`fillViewport="true"`) wrapping a `ConstraintLayout` with `android:id="@+id/main"` and `tools:context=".mXX_name"`. Follow it, so the insets listener in the Activity keeps working.
- Repeated rows → one `res/layout/item_*.xml` reused with `<include>` (section 3).
- Aligned rows (the Plan / Real bars in M-07) → `ConstraintLayout` with a shared guideline or barrier, so every bar starts and ends at the same x.
- Fixed action zone → keep it outside the `ScrollView`, anchored to the parent bottom, so it never covers scrolling content.
- Forbidden: `!important`-style overrides via `tools:`, hardcoded `dp`/`sp`/hex where a `@dimen`/`@color` exists, negative margins to offset another view's padding, absolute positioning, third-party UI kits.
- Units: `dp` for spacing and size, `sp` for text, always through `@dimen` where one exists.
- Gradients are `<gradient>` inside a shape drawable, never a solid color faked with layers.
- Colors by state or category come from the data or from a state-list drawable, never from position in the layout.

**Viewport and preview**
- The app fills the device screen. `enableEdgeToEdge()` plus the `WindowInsetsCompat` listener on `@+id/main` handles the status bar and the gesture bar — that is already in every Activity, keep it.
- Reference device **390 × 844dp**. Must look correct at 360dp (small phones) and 430dp (large phones) without horizontal scrolling, and survive a font-scale bump.
- `tools:` attributes are for preview only and must never carry real content.

## 8. Component states and accessibility

Must pass the Accessibility Scanner and meet WCAG 2.2 AA.

**States** — every interactive control defines: Default · Pressed · Focused · Disabled, plus Secondary and Critical variants where the design has them.
- Touch first: **Pressed** is the feedback a user actually sees. Implement with a state-list drawable (`<selector>` with `android:state_pressed="true"`) or a ripple (`?attr/selectableItemBackground` / `<ripple>`), darkening the fill on filled buttons and using `@color/surface_alt` on outline and text buttons.
- **Focused** matters for keyboard and switch access: `android:state_focused="true"` in the same selector, drawing a **3dp halo in `@color/secondary_soft`** (`#FDDCCF`) — `@dimen/focus_halo` and `@color/focus_color` are already defined for this. Never remove the focus indicator without replacing it.
- **Disabled**: `android:enabled="false"`, text and icon drop to `@color/text_disabled`, **shape is preserved** (same size, border and radius).
- Minimum touch target: `@dimen/touch_target_min` is **44dp**, the iOS/web figure this design was drawn to. **Android's own floor is 48dp**; use 48dp for new controls, keep the 44dp token for reference, and log the difference. Extend the hit area with padding, or with `TouchDelegate`, when the visual is smaller — including «Ahora no», «Finalizar sesión de cocina» and the small «Pausar» buttons in M-03.

**Rules from the system**
- State is never conveyed by color alone: it always carries a label or an icon. Every chip has a label; critical states add a dot or icon.
- Temporal data uses tabular figures.
- An alarm combines color, movement and sound so it works in a noisy kitchen — in this phase only color and label. Do not add animation or audio. If Figma shows a pulsing dot on the status banner, build it static and log it.

**Semantics** — Android has no landmarks or heading tags; the equivalents are:
- `android:accessibilityHeading="true"` on the top-bar title and on each section heading, in place of `<h1>`/`<h2>`.
- Action → `Button` (or a `View` with `android:clickable="true"` **and** `android:focusable="true"`). Never an `onClick` on a plain `TextView` or `ImageView` without both.
- Every non-decorative `ImageView` needs `android:contentDescription`; decorative ones get `android:importantForAccessibility="no"`.
- A progress bar is a `ProgressBar` with `android:max` and `android:progress` set from the mockup value, plus a `contentDescription` naming it («Progreso de Arroz»). The mockups show no visible percentage: do not add one, and log the missing visible text as a finding.
- Groups of equivalent rows: give the container `android:screenReaderFocusable="true"` and the children `importantForAccessibility="no"` only when the row reads better as one unit; otherwise leave each label readable on its own.
- Reading order follows the layout order. If `ConstraintLayout` puts them out of order, fix it with `android:accessibilityTraversalAfter`.
- Respect the user's animation setting; in this phase there are no animations to gate.

**Known contrast findings — implement as designed, report, do not silently fix**
- Text primary `#18434B` on `#F8F9FA` ≈ 10.3:1, on white ≈ 10.8:1 — well above AA.
- `@color/text_secondary` `#64748B` on white ≈ 4.8:1, on `#F8F9FA` ≈ 4.5:1 — passes, barely, on the canvas.
- **`#ED532A` on white ≈ 3.6:1, on `#F8F9FA` ≈ 3.4:1, on `#FFF5F1` ≈ 3.3:1.** It meets AA only for large text (≥ 24sp, or ≥ 18.66sp bold). It falls short in: the kickers (M-02, M-03), «Ahora no» (M-02), «Finalizar sesión de cocina» (M-03), «2 ligeros desfases», «+2 min desfase» and «Reducción +2m» (M-07). «+4 min» at Timer size passes.
- **White on `#ED532A` ≈ 3.6:1**: the «Alerta activa» chip (M-03) is small text on orange, so it falls short.
- Disabled text at `#CBD5E1` is exempt from the contrast minimum, but never use that token for content that must be read.

## 9. Architecture

The tree below is what the project actually looks like. **The layout M-01, M-08 and M-13 already use takes precedence**: if file names or id conventions differ from what follows, keep the existing ones and add the new screens next to the old ones the same way.

```
TempoCocinaMovil/
├── .claude/CLAUDE.md
├── build.gradle.kts  settings.gradle.kts  gradle/libs.versions.toml
├── docs/
│   ├── design/    → TempoCocina-SystemDesign-Mockups-Movil-final.pdf
│   ├── mockups/   → M-02.png, M-03.png, M-07.png (4×)
│   └── screens/   → _baseline.md, _baseline/M-XX.before.png, M-XX.md, M-XX.render.png
└── app/src/main/
    ├── AndroidManifest.xml          → one <activity> per screen; M-01 is LAUNCHER
    ├── java/com/example/app/
    │   ├── m01_recetas.kt  m08_resumen.kt  m13_alarma.kt        (built)
    │   ├── m02_permiso_ModoCocina.kt  m03_cola_Alarmas.kt
    │   │   m07_proceso_terminado.kt                             (stubs to fill)
    │   ├── MainActivity.kt          → Compose template, unused by these screens
    │   └── ui/theme/                → Compose theme scaffold, unused
    └── res/
        ├── layout/activity_mXX_*.xml    → one per screen
        ├── layout/item_*.xml            → reusable rows pulled in with <include>
        ├── drawable/bg_*.xml            → shapes: cards, chips, tiles, buttons
        ├── drawable/ic_*.xml | *.png    → icons (new ones as vector)
        ├── font/roboto_*.ttf
        └── values/themes.xml            → palette, dimens, styles  ← the design system
            values/colors.xml            → template leftovers, unused
            values/strings.xml
```

- **Screen = Activity + layout.** There is no navigation graph, no fragments and no route table. Navigation is `Intent`; the "index" is the launcher, M-01.
- Each new screen: fill its existing `activity_mXX_*.xml`, wire its `mXX_*.kt`, and confirm its `<activity>` entry in the manifest (all three already exist for M-02, M-03 and M-07 — do not add duplicates).
- Keep the Activity boilerplate identical to `m01_recetas.kt`: `enableEdgeToEdge()`, `setContentView`, the `WindowInsetsCompat` listener on `@+id/main`, then the `setOnClickListener` wiring.
- **Component catalog → drawables and includes.** The PDF documents 30 components (p8–10). On Android they become: a shape drawable for the box, a `<style>` for the text, and an `item_*.xml` when the whole block repeats.
  - *Buttons*: Primary (pill 48dp, `@color/primary`, leading icon) · Critical (`@color/secondary`) · Secondary (1dp `@color/border` outline on Surface) · Filled pair · Outline pair · Text (low-emphasis, uppercase, secondary color).
  - *Containers and lists*: Recipe card · Process item · Timer card · activa · Timer card · secundaria · List item con icono · Icon tile (64 and 44).
  - *Entry and feedback*: Text field · Inline alert · Modal / Dialog · Rating · Progress bar.
  - *Chips, badges and counters*: Chip · Crítico · Neutro · Warning · Disabled · Counter chip. `critical-soft` and `success` are not in the PDF catalog but appear in M-07: build them and log them.
  - *Structure and navigation*: Top app bar · Status banner · Info banner · Next-step card.
  - *Data and summary*: Timer display · Alarm hero · Metric card · Comparative bars · Insight card.
- Only build what the screens in scope need. Check `res/drawable` and the existing layouts before creating anything.
- Variants are separate drawables with an explicit name (`bg_chip_critical.xml`, `bg_chip_neutral.xml`), not one drawable overridden at the call site.
- The top app bar block is on every screen. It is currently **copied into each layout**, not extracted. Keep copying it for the new screens rather than refactoring the built ones mid-scope; note the duplication in the report as a candidate for a later `<include>`.

## 10. Kotlin and Android conventions

Write clear, idiomatic Android. This phase is layout work: the Kotlin should stay thin.

### Kotlin

- Kotlin official style, with one deliberate exception: **class names follow the baseline** (`m02_permiso_ModoCocina`), which is snake_case and not `PascalCase`. That violates the Kotlin convention, but renaming would touch the manifest and the built screens. Keep it, and log it once in `_baseline.md`.
- No `var` where `val` works. No `!!`; use `findViewById<T>(...)` results directly, since an inflated id is non-null by construction.
- No business logic, no `ViewModel`, no coroutines, no data binding in this phase.

### Activities

- One `AppCompatActivity` per screen, matching the `m01_recetas.kt` shape exactly:
  ```kotlin
  class m02_permiso_ModoCocina : AppCompatActivity() {
      override fun onCreate(savedInstanceState: Bundle?) {
          super.onCreate(savedInstanceState)
          enableEdgeToEdge()
          setContentView(R.layout.activity_m02_permiso_modo_cocina)
          ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
              val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
              v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
              insets
          }
          // navigation wiring only
      }
  }
  ```
- `findViewById` is the baseline's way of reaching views; ViewBinding would be nicer but is not enabled — do not turn it on mid-scope.
- The Compose scaffolding (`MainActivity.kt`, `ui/theme/`) belongs to the Android Studio template and is **not** used by these screens. Do not extend it and do not delete it without asking.

### Layout XML

- Ids in the baseline's Spanish camelCase (`tituloModulo`, `cardReceta`, `btnEmpezar`). Prefix by role: `titulo*`, `card*`, `btn*`, `chip*`, `icon*`, `bar*`.
- Every color through `@color`, every spacing and radius through `@dimen`, every font through `@font`. Add the token to `themes.xml` first if it is missing.
- Text styles through `style="@style/…"`; add the missing styles from section 5 rather than setting `textSize` inline.
- `tools:text` for preview values, `android:text` for real copy.
- Keep `android:importantForAccessibility` and `android:contentDescription` on every image as you write it, not as a later pass.

## 11. Verification and definition of done

A screen is done when:

- [ ] `./gradlew assembleDebug` passes with no errors or new warnings.
- [ ] `./gradlew lint` is clean, or every remaining warning is listed in the report with a reason.
- [ ] No literal hex, `sp`, `dp` or radius in the new layout where a `@color`/`@dimen`/`@style` exists (verify by search).
- [ ] Every new icon is a vector drawable in `res/drawable`, named per the catalog; no icon font and no icon library.
- [ ] Copy is identical to the mockup (spelling, accents, capitalization); uppercase is applied with `android:textAllCaps`, not written into `android:text`.
- [ ] Numbers that count use `android:fontFeatureSettings="tnum"`.
- [ ] Every card that has `android:elevation` also has its 1dp `<stroke>`.
- [ ] Pressed, focused and disabled states exist on every control; the focus halo is 3dp `@color/secondary_soft`.
- [ ] Every control has a touch target of at least 48dp (see section 8).
- [ ] Accessibility Scanner reports no issues beyond the contrast findings already listed in section 8; every image has a `contentDescription` or is explicitly not important.
- [ ] Visual comparison: screenshot of the rendered screen at **390 × 844, 4×**, saved as `docs/screens/M-XX.render.png`, next to `docs/mockups/M-XX.png`; differences listed. Ignore the system status bar and gesture bar. **This needs an emulator or a device** — if neither is available, say so explicitly and do not claim the screen is verified.
- [ ] Checked at 360dp and 430dp: no horizontal overflow, text wraps like the mockup, the fixed action zone does not cover content. Checked once with the system font scale raised.
- [ ] **No regression in the baseline**: if the change touched `themes.xml`, a shared drawable or a shared layout block, re-capture M-01, M-08 and M-13 with the same settings and confirm they are visually identical to `docs/screens/_baseline/M-XX.before.png`. Any difference is a bug, not a report item.
- [ ] `docs/screens/M-XX.md` updated (in Spanish) with components reused / extended / created, assumptions, differences from the mockup, and accessibility findings in the design.

After each screen, summarize in chat (in Spanish): what was built, new shared resources, differences from the mockup, and open questions. **Do not move to the next screen until the user approves**, and never while an open question would change a shared resource.

## 12. Known design discrepancies (reproduce, then report)

These come from comparing the mockups against the System Design. Build what the **mockup** shows and mention the item in the screen report; do not fix the design.

- **M-03 vs M-08** — Both show the same three processes with timer cards and state chips, but with different layouts and states. Compare them in the inventory: reuse M-08's timer card and chip drawables where the anatomy matches, add variants where it doesn't, and keep M-08 rendering exactly as it does today.
- **M-03** — The «Reducción» chip of Salsa is neutral grey in the mockup; the DS defines Chip · Warning (amber) for a reduction stage.
- **M-03** — The active timer card border is a soft orange, not the full `#ED532A` the DS describes («borde de 2 px Secondary»). Take the exact value from Figma.
- **M-03** — «Pausar todo» is a full-width pill with a 2dp teal outline; the catalog only has the half-width Outline pair. Build it as a full-width outline variant (or ask) and log it.
- **M-03** — Progress values (Arroz ≈ 78 %, Horno ≈ 45 %, Salsa ≈ 60 %) must be read from Figma widths and set as `android:progress`.
- **M-07** — The kicker «Sesión finalizada» is teal, unlike the orange kickers of M-02 and M-03.
- **M-07** — «Evaluar» is a filled button with ~12–16 radius on a footer, not the 48dp pill of Button · Primary. Take the radius from Figma.
- **M-07** — «Tiempo total: 48 min» and the per-process real times (17 + 35 + 20) do not add up because processes run in parallel. Not an error; keep the copy.
- **M-07** — The soft critical chips («+2 min desfase», «Reducción +2m») and the success chip («A tiempo») are not in the PDF chip catalog.
- **All** — The orange small text listed in section 8.

## 13. Screen specs (literal copy)

Transcribed from the 4× exports. Text shown in UPPERCASE in the mockup is written here in sentence case followed by *(uppercase)*, because that is how it goes in `android:text` (section 5). Cross-check against Figma; if a character differs, Figma wins and the report says so.

### M-02 · Permiso de audio prioritario

- Top app bar — kicker `Módulo de sincronización` *(uppercase, orange)* · title `Receta preparacion` *(uppercase)* · brand logo · 1px separator below.
- Icon tile 64 (teal-tinted surface) with the large `volume` icon.
- H2 centered: `Permiso de audio prioritario`
- Body centered, secondary color: `El Modo Cocina necesita sonar con volumen alto aunque tu teléfono esté en silencio o “No Molestar”. Así no se te quemará ningún plato.` (curly quotes “ ”).
- List (3 × List item con icono):
  1. `volume` (neutral tile) — **Alarma a volumen constante** — `Se eleva automáticamente al sonar para vencer el ruido de campana y sartenes.`
  2. `bell-off` (orange-tinted tile, orange icon) — **Ignora el interruptor de silencio** — `Omite el modo No Molestar del sistema operativo de forma crítica.`
  3. `vibrate` (neutral tile) — **Vibración continua de alerta** — `Patrón háptico repetitivo detectable incluso en el bolsillo o delantal.`
- Sound test row (bordered card; faint tint on its left part — confirm the fill in Figma): caption `Probar sonido de prueba` *(uppercase)* + small secondary pill button with orange `play` + `Escuchar`. No playback.
- Primary pill button, full width, elevated: orange circle with white `bell` + `Empezar en Modo Cocina` → M-03.
- Text button: `Ahora no` *(uppercase, orange)* — back to M-01.

### M-03 · Temporizadores activos · vista compacta

- Top app bar — kicker `Módulo de cocción • Modo activo` *(uppercase, orange)* · title `Temp activos` *(uppercase)* · brand logo.
- Status banner (teal pill): orange dot + `Modo cocina — En curso` (em dash).
- Recipe row card: `Pollo al horno con arroz` + counter chip `3 procesos`.
- Timer card · activa (soft orange border): `Arroz` + `pot` · chip critical `Alerta activa` · timer display: `Tiempo restante` *(uppercase)* / `05:22` / orange progress · pair: outline `Detener` (`stop`) and filled `Pausar` (`pause`).
- Timer card · secundaria: `Horno` · `28:53` · teal progress · chip neutral `En cocción` · small outline `Pausar` (`pause`).
- Timer card · secundaria: `Salsa` · `12:47` · teal progress · chip neutral `Reducción` · small outline `Pausar` (`pause`).
- Full-width outline pill, 2dp teal border: `pause` + `Pausar todo`.
- Text button: `Finalizar sesión de cocina` *(uppercase, orange)* → M-07.

### M-07 · Resumen de cocción

- Top app bar — kicker `Sesión finalizada` *(uppercase, teal)* · title `Resumen de coccion` *(uppercase)* · brand logo · subtitle `Pollo al horno con arroz · Tiempo total: 48 min`.
- Metric card: `Precisión global` *(uppercase)* / `92%` + `efectividad` · `Desviación neta` *(uppercase)* / `+4 min` (orange) · divider · teal progress (≈ 92 %) · footer `3 procesos ejecutados` (secondary) and `2 ligeros desfases` (orange, right-aligned).
- Section header: `Desglose por proceso` + caption `Planeado vs. real` *(uppercase, right-aligned)*.
- Comparative bars × 3 (Plan bar light grey-blue, Real bar teal, values right-aligned):
  1. `pot` — **Arroz** — `15 min est. · 17 min real` — chip critical-soft `+2 min desfase` — Plan `15m` · Real `17m`
  2. `oven` — **Pollo al horno** — `35 min est. · 35 min real` — chip success `A tiempo` — Plan `35m` · Real `35m`
  3. `pan` — **Salsa (reducción)** — `18 min est. · 20 min real` — chip critical-soft `Reducción +2m` — Plan `18m` · Real `20m`
- Insight card: `sparkles` on a white circle — **Aprendizaje automático** — `Considera calibrar tu preset de Arroz a 17 min la cocción habitual en tu receta.` (as is, no added comma).
- Fixed footer with top border: primary button `Evaluar` — no navigation (M-09 is out of scope).

## 14. Baseline debt found while rewriting this file

Facts about the current code, recorded so nobody "fixes" them by surprise. **Do not refactor these mid-scope**; each is a candidate for a separate, agreed cleanup.

1. **The palette lives in `themes.xml`, not `colors.xml`.** `colors.xml` still holds the Android Studio template colors (`purple_200`, `teal_200`…) and nothing references them.
2. **Eight semantic values are missing** — the text and background of Success, Warning, Error and Critical (section 4). Only the base color of each exists.
3. **Two off-system colors leaked into the layouts**: `#F97316` (a second orange, 4 uses) and `#94A3B8` (a grey, 19 uses — the most repeated hex in the project). Neither is a token. Also loose: `#B8C5C8`, `#21474E`, `#D5DDE0`, `#355C64`, `#294D54`, `#16A34A`, `#10353C`.
4. **Typography is barely tokenized**: `themes.xml` defines two styles (`TextTitle` 20sp, `TextBody` 14sp) whose sizes match none of the nine in section 5, and the layouts set `textSize` literally 77 times.
5. **Uppercase is written into the copy** (`android:text="MÓDULO DE SINCRONIZACIÓN"`) instead of `android:textAllCaps`, so screen readers may spell it out.
6. **M-01's title reads `RECETA PREPARACIÓN` with an accent**, while sections 0 and 13 of this file insist the mockup shows `RECETA PREPARACION` without one. Confirm against Figma; whichever is right, the two must agree.
7. **Strings are hardcoded in the layouts**, not in `strings.xml`.
8. **Some icons are PNG** (`ic_bell.png`, `ic_arroz.png`, `ic_horno.png`, `ic_salsa.png`, `ic_star.png`, `ic_thunder.png`, `ic_aprendizaje.png`), so they cannot be tinted and do not scale.
9. **The top app bar is copy-pasted** into each layout instead of being an `<include>`.
10. **Class names are snake_case** (`m02_permiso_ModoCocina`), against Kotlin convention.
11. **`MainActivity.kt` and `ui/theme/` are unused Compose template code**, while every real screen is XML + `AppCompatActivity`.
12. **`docs/` does not exist yet**, so the PDF, the 4× mockups and the reports this file references have nowhere to live until it is created.
