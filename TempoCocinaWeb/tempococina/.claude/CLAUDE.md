# CLAUDE.md — TEMPO COCINA · Web mockup implementation

## 0. Language

- These instructions are in English. **All UI copy stays in Spanish, exactly as it appears in the mockups** (spelling, accents, capitalization). Never translate, paraphrase or "fix" UI text.
- Code identifiers, file names, commits and code comments: English.
- Screen reports in `docs/screens/` and end-of-task summaries in chat: **Spanish**.
- `lang="es"` on `<html>`.

## 1. Context

TEMPO COCINA is a culinary logistics and alarms system (UX course project, MISO Master's program, Universidad de los Andes — David Rojas · Diego Rojas). High-fidelity mockups exist in Figma for web and mobile, and the design system below was inferred from the 13 web screens.

**This phase is visual implementation of the web version only**: reproduce the screens with Angular + HTML + SCSS, with no business logic.

- Figma (web mockups): https://www.figma.com/design/g3A1Ziiig9RtAFZkQS28yX/Web---Mockups
- System Design PDF: `docs/design/TempoCocina-SystemDesign-Mockups-Web-final.pdf` — 25 pages: Style Tile (p3), Color (p4), Typography (p5), Iconography (p6–7), Components (p8–10), Layout/spacing/elevation (p11), screen catalog (p13–25).
- Reference screenshots: `docs/mockups/W-XX.png`
- Initial scope, in this order: **W-06, W-24, W-22, W-13**.

Web inventory (13 screens, non-contiguous IDs): W-01, 02, 06, 12, 13, 15, 16, 17, 18, 19, 22, 23, 24. Do not assume intermediate screens exist. There are no create/edit recipe screens in this deliverable.

### Screens in scope

| ID | Title | Module | What it is |
|---|---|---|---|
| **W-06** | Detalle de receta y flujo de pasos | Recetario | Two-column sheet: recipe data + equipment on the left, ingredients and timed steps on the right |
| **W-24** | Alarmas sincronizadas | Transferencia | Final confirmation: device synced, four timers listed with their tone |
| **W-22** | Confirmar y enviar al móvil | Transferencia | Final review of the consolidated sequence, channel and sound per process, estimated time distribution |
| **W-13** | Configuración automática sugerida | Detección automática | Editable table of detected processes with time and sound, before transferring to the phone |

Components and icons each screen uses are listed on its catalog page in the PDF. Build from that list, not from guesswork.

**Shared mock data:** W-06, W-13, W-22 and W-24 all show the same recipe — *Pollo al horno con arroz*, 4 processes, 50 min total — with different labels and detail per screen. Put that data in one shared mock (`src/app/shared/mocks/`), typed, and let each screen project the fields it shows. Do not retype the copy per screen.

## 2. Source of truth and per-screen protocol

The design rules. **Do not invent content, copy, icons, colors or measurements.** If something is not in the PDF, Figma or the screenshot, stop and ask, or record it as an assumption in the screen report.

For each screen, in this order:

1. **Read the design.** Read the screen's page in the System Design PDF (component list + icon list + purpose), then get exact geometry from the Figma MCP (`get_metadata`, `get_design_context`, `get_variable_defs`, `get_screenshot`) or the screenshot. Code returned by the Figma MCP is usually React + Tailwind: **translate it** to Angular + SCSS using the project tokens; never paste it as-is.
2. **Inventory** in `docs/screens/W-XX.md`: regions (landmarks), system components used, tokens, icons, literal copy, images, visible states. Mark which components already exist in `shared/ui` and which must be created.
3. **Shared pieces first**: missing tokens, icons, `shared/ui` components. Then the screen.
4. **Build the screen** by composing those components.
5. **Verify** (section 11) and **report** differences from the mockup.
6. One commit per screen (`feat(w-06): implement recipe detail screen`), plus separate commits for shared components.

Before the first screen, read `package.json`, `angular.json`, `src/styles*` and the `src/app` structure so you respect the existing scaffolding. Do not install packages or change dependency versions without asking.

**The browser chrome is not part of the app.** Every mockup is presented inside a browser frame (traffic lights + URL bar). Do not build it. The real app header is the "App bar" component: brand on the left. If a screen seems to need the URL bar, it does not.

## 3. What "no functionality" means

Yes:
- Complete semantic HTML, faithful styles, visual states (hover, focus-visible, active, selected, disabled) as defined in section 8.
- **Typed** sample data in `*.mock.ts`, using the real mockup copy. Templates iterate with `@for`; never duplicate markup by hand.
- Navigation between implemented screens with `routerLink` where the mockup implies it ("← Volver", "Volver al recetario").
- Forms built with `ReactiveFormsModule` and real `<label>` elements, even though they submit nothing.

No:
- HTTP services, backend, persistence, real timers, sounds, notifications, device pairing.
- Business logic. The only allowed state is visual and local (e.g. which filter chip is active), using `signal()`.
- Progress bars and timelines are **static**: render the percentage from the mock, never animate toward it.

## 4. Color

17 tokens, read directly from the mockups. The system uses **one orange (`#ED532A`)** as its accent and reserves it for what demands action; the calm hierarchy is carried by the deep teal and a cool grey scale.

### Brand and accent

| Token | Hex | Use |
|---|---|---|
| `--tc-primary` | `#1D434B` | Brand, titles, action button, confirmation surfaces |
| `--tc-primary-deep` | `#0F2B31` | Table headers and focus blocks |
| `--tc-secondary` | `#ED532A` | Sole accent: alarm, critical CTA, numeric emphasis |
| `--tc-secondary-soft` | `#FDDCCF` | Badge halos, soft alert states, **focus ring** |
| `--tc-secondary-wash` | `#FFF5F1` | Background for algorithmic suggestions and highlighted cards |

### Neutrals and text

| Token | Hex | Use |
|---|---|---|
| `--tc-background` | `#F7F9FB` | App canvas |
| `--tc-surface` | `#FFFFFF` | Cards, fields, modals |
| `--tc-surface-alt` | `#F1F5F9` | Inner blocks, neutral chips, table headers |
| `--tc-border` | `#E2E8F0` | 1px borders on cards, fields and separators |
| `--tc-text-primary` | `#1D434B` | Titles and high-hierarchy text |
| `--tc-text-body` | `#1E293B` | Running text, high contrast |
| `--tc-text-secondary` | `#64748B` | Descriptions, labels, metadata |
| `--tc-text-disabled` | `#CBD5E1` | Inactive text and controls |

### Semantic (each has color + text + background)

| Token | Color | Text | Background | Use |
|---|---|---|---|---|
| Success | `#10B981` | `#047857` | `#D1FAE5` | Process ready, active tone, correct sync |
| Warning | `#F59E0B` | `#92400E` | `#FDE68A` | Stage in progress, notices needing attention |
| Error | `#E11D48` | `#BE123C` | `#FFE4E6` | Destructive action, connection failure |
| Critical | `#ED532A` | `#9A2F12` | `#FFF5F1` | Alarm sounding / immediate action |

Rules:
- `#C63F18` and dark greys like `#2A2A2A` are leftovers from older exports and **do not exist** in the system.
- Two levels in `src/styles/_tokens.scss`: primitives first, then semantic tokens (`--tc-surface-header`, `--tc-on-primary`, `--tc-focus-ring`, …). Components reference semantic tokens only.
- Use **CSS custom properties**, not Sass variables, for color. Sass is for mixins and breakpoints, loaded with `@use` (never `@import`).
- Derive tints with `color-mix()` only where the system does not define the value.

## 5. Typography

Single family: **Roboto**, weights Black, Bold, Medium, Regular. Sizes are px on the 1280px canvas; convert to `rem` in tokens (1rem = 16px).

| Style | Font | Size / line | Tracking | Use |
|---|---|---|---|---|
| Display | Roboto Black | 56 / 60 | +6.0 | Pairing code (`7K9P - 4M2W`) |
| H1 | Roboto Black | 34 / 40 | −0.5 | Screen title |
| H2 | Roboto Bold | 24 / 32 | −0.2 | Panel and large-card title |
| H3 | Roboto Bold | 18 / 26 | 0 | Card, recipe and highlighted-row title |
| Body | Roboto Regular | 15 / 24 | 0 | Descriptive text, instructions, steps |
| Body S | Roboto Regular | 13 / 20 | 0 | Metadata, helper text, footnotes |
| Caption | Roboto Medium | 11 / 16 | +1.2, **UPPERCASE** | Table headers, labels, badges |
| Button | Roboto Bold | 15 / 20 | +0.3 | Button label; UPPERCASE on critical CTA |
| Data | Monospace | 14 / 20 | +0.5 | IDs, timers, error codes, clock values |

Rules:
- Define these as mixins or utility classes in `_typography.scss`. A component never sets a raw `font-size`.
- The PDF does not name the monospace family. Use **Roboto Mono** and record it as an assumption.
- Any number that counts or updates uses `font-variant-numeric: tabular-nums` so it does not jitter — timers, durations, percentages, the pairing code.
- Uppercase in Caption and critical CTA is **visual**: use `text-transform: uppercase`, keep the source text in normal case so screen readers do not spell it out.
- Heading levels follow document structure, not visual size. A block styled H2 can be an `<h3>` if that is its place in the hierarchy.

## 6. Iconography

46 icons, **extracted directly from the mockup screens**: not redrawn, not substituted from any library, keeping their original shape, stroke weight, color and proportion. Linear stroke of uniform weight on a square grid; solid variants only for the alarm state.

- Forbidden: Material Icons, Lucide, Font Awesome or any icon font; emoji; Unicode characters as icons.
- Export each icon as SVG from Figma (or ask for it). Normalize: keep `viewBox`, remove fixed `width`/`height`, replace fixed colors with `currentColor` — **except** the icons whose color is part of their identity (brand timer, alarm variants), which keep their fill.
- Store as `<symbol id="tc-icon-<name>">` in `src/assets/icons/sprite.svg`. Kebab-case names describing the shape, as catalogued below.
- One `shared/ui/icon` component renders them:

```html
<svg class="tc-icon" aria-hidden="true" focusable="false"><use [attr.href]="'assets/icons/sprite.svg#tc-icon-' + name()" /></svg>
```

  with `name = input.required<string>()` and size from a token. Color inherits via `currentColor`.
- Decorative → `aria-hidden="true"`. Icon-only button → `aria-label` on the button, in Spanish, describing the action.

### Catalog

**Navigation and structure:** `arrow-left` (Volver) · `arrow-left-inv` (Volver al recetario) · `arrow-right` (Continuar) · `chevron-down` (Desplegable) · `hash` (Índice de fila) · `close` (Quitar elemento) · `checkbox` (Ingrediente verificado)

**Content actions:** `search` (Buscar receta o ingrediente) · `plus-circle` (Crear o importar receta) · `plus` (Agregar alarma o proceso) · `pencil` (Editar alarma) · `trash` (Quitar alarma — destructive) · `refresh` (Generar otro código)

**System actions:** `gear` (Configurar automáticamente) · `play-circle` (Preparar receta) · `play` (Reproducir muestra) · `bolt` (Confirmar y enviar) · `bolt-line` (Sugerencia algorítmica) · `send` (Enviar a mi celular)

**State and feedback:** `check-circle` (Paso completado) · `check` (Confirmación) · `target` (Paso en curso) · `step` (Paso pendiente) · `radio-off` · `radio-on` · `info` · `info-clock` (Ejecución concurrente) · `shield` (Cifrado extremo a extremo) · `spinner` (Reintentando) · `toggle` (Interruptor activo) · `mic-off` (Tono activo) · `dot` (Sensor / canal disponible)

**Domain and device:** `clock` (Tiempo total) · `timer-brand` (Identidad Tempo Cocina) · `timer` (Secuencia temporizada) · `bell` (Sonido de alarma) · `volume` (Tono asignado) · `volume-on` (Probar tono) · `music` (Bip constante) · `flame` (Técnica: horno) · `phone` (Compatible móvil) · `phone-dot` (Dispositivo conectado) · `phone-ok` (Sincronizado y listo) · `trend` (Dificultad) · `servings` (Porciones) · `toolbox` (Equipamiento requerido)

Some pieces that look like icons are components (chips, toggles, progress indicators). Build the component.

## 7. Layout, spacing, radii, elevation

**Grid and margins**
- Canvas: 1280px (browser frame). Container: max **1200px**, centered. Side margin: **40–45px**.
- Grid: **12 columns, 24px gutter**.
- Work split: **62 / 38** on detail screens (W-06 uses it).
- Vertical rhythm: multiples of 4; steps 8 · 12 · 16 · 24 · 32 · 48.

**Spacing scale** — base 4: `4, 8, 12, 16, 24, 32, 48`. Between cards in a list: **12**. Between sections: **24 or 32**.

**Radii**

| Element | Radius |
|---|---|
| Chips and badges | 6–8px |
| Fields and inputs | 8px |
| Buttons | 10–12px |
| Cards and panels | 14–16px |
| Modals | 20px |

**Elevation** — four levels: 0 border only · 1 card · 2 floating · 3 modal. **Shadow never replaces the border**: cards keep their 1px stroke (`--tc-border`) to hold contrast against the light background. A card with a shadow and no border is wrong.

**Layout rules**
- Figma auto layout → flexbox or grid with `gap`. Never reproduce frame coordinates with `position: absolute`.
- Repeated lists and cards → `@for` over mock data with `track`.
- Tabular data (W-13, W-22) → semantic `<table>` with `<thead>`; never headers embedded in the first data row. Column layouts aligned across rows → CSS Grid (or `subgrid`).
- Forbidden: Bootstrap, `!important`, `::ng-deep`, negative margins to offset third-party padding, `ViewEncapsulation.None`, inline styles.
- Units: `rem` for type and spacing (via tokens); `px` only for 1–2px borders and radii.
- Gradients go in `background` / `background-image`, never `background-color`.
- Colors by state or category come from data or inputs, never from `:nth-child`.
- Static images with `NgOptimizedImage` (`ngSrc`, `width`, `height`, meaningful Spanish `alt`; `alt=""` only if decorative). Recipe photography is top-down, warm light, wood or stone background, no illustration — export from Figma into `src/assets/images/`.
- Reference viewport 1280px. Must look correct at 1440px and 1280px and degrade without breaking down to 1024px. Mobile is out of scope (it has its own mockups).

## 8. Component states and accessibility

Must pass AXE and meet WCAG 2.2 AA.

**States** — every interactive component defines: Default · Hover · Focus · Disabled, plus Secondary and Critical variants where the design has them.
- **Focus: 3px halo in `#FDDCCF`** (`--tc-secondary-soft`). Implement as `outline: 3px solid var(--tc-focus-ring); outline-offset: 2px` on `:focus-visible`. Never `outline: none` without a replacement.
- **Disabled**: text and icon drop to `#CBD5E1`, **shape is preserved** (same size, border and radius).
- Minimum touch target **44 × 44px** on every control.

**Rules from the system**
- State is never conveyed by color alone: it always carries a label or an icon. Every chip has a label; critical states add a dot or icon.
- Temporal data uses tabular figures.
- An alarm combines color, movement and sound so it works in a noisy kitchen — in this phase only color and label; do not add motion or audio.

**Semantics**
- Landmarks: `<header>`, `<nav aria-label>`, `<main>` (one per page), `<aside>`, `<footer>`.
- One `<h1>` per screen; heading hierarchy without skipped levels.
- Action → `<button type="button">`. Navigation → `<a routerLink>`. Never `(click)` on `div` / `span`.
- Selected navigation state via `routerLinkActive` + `ariaCurrentWhenActive="page"`.
- A progress bar needs `role="progressbar"` with `aria-valuenow/min/max`, or a `<progress>` element, plus a visible text percentage.
- Respect `prefers-reduced-motion` for any transition.

**Known contrast findings — implement as designed, report, do not silently fix**
- Body text `#1D434B` on `#F7F9FB` is ≈10:1 — well above AA.
- `--tc-text-secondary` `#64748B` on white is ≈4.8:1 — passes for normal text.
- **White on `--tc-secondary` `#ED532A` is ≈3.6:1**, which only meets AA for large text (≥24px, or ≥18.66px bold). The "Button · Primary" critical CTA uses white 15px Bold on that orange, so it falls short. Build it as designed and log it in the screen report.
- Disabled text at `#CBD5E1` is exempt from the contrast minimum, but never use that token for content that must be read.

## 9. Architecture

```
src/app/
├── core/layout/            → app bar, footer, page shell
├── shared/
│   ├── ui/                 → design-system components (button, icon, chip, card, metric-tile, …)
│   └── mocks/              → data shared across screens (the recipe and its 4 processes)
├── features/
│   └── <screen-name>/      → page component + *.mock.ts + screen-specific subcomponents
└── app.routes.ts
src/styles/                 → _tokens.scss, _typography.scss, _mixins.scss, styles.scss
docs/design/  docs/mockups/  docs/screens/
```

- Selector prefix: `tc-`.
- **1:1 mapping with the system catalog.** The PDF documents 35 components under fixed names; use them:
  - *Buttons*: Primary (critical CTA, `#ED532A`, uppercase, circular icon) · Brand (`#1D434B` with bolt icon) · Brand ficha (`#1D434B`, full width, gear icon) · Destructive (`#E11D48`, trash icon, no fill) · Secondary (outline on Surface, same height as primary) · Link (card action, full width, trailing arrow) · Pill (recetario main action, centered under the grid) · Dashed (add an item to an editable list).
    → one `tc-button` with `variant = input<'primary' | 'brand' | 'brand-block' | 'destructive' | 'secondary' | 'link' | 'pill' | 'dashed'>()`.
  - *Data entry*: Search bar (44px tall, radius 10) · Dropdown/Select · Select con icono · Text input (inside table, 1px border, radius 8) · Stepper + quick adjust.
  - *Control and selection*: Toggle · Slider · Radio option card · Filter chips · Chip de equipamiento · Badge sobre imagen.
  - *Containers*: Recipe card · Checklist item · Step item · Metric tile · Alarm editor card · Progress step.
  - *Rows, bars and frame*: App bar · Editable table row · Sound list item · Timeline · Summary table · Footer.
  - *Panels and overlays*: Side panel · Sync card · Feedback overlay · Error dialog.
- A component goes in `shared/ui` when more than one screen uses it, otherwise inside its feature. Check `shared/ui` before creating anything.
- Figma/PDF variants → `input()`s, never loose classes.
- The footer is the same on every screen (encryption seal, mobile compatibility, copyright): build it once in `core/layout`.
- Lazy-loaded review routes, plus an index page:

```ts
{ path: 'mockups', loadComponent: () => import('./features/mockups-index/…') },
{ path: 'mockups/w-06', loadComponent: () => import('./features/recipe-detail/…') },
```

## 10. Angular and TypeScript

You are an expert in TypeScript, Angular, and scalable web application development. Write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

### TypeScript

- Use strict type checking.
- Prefer type inference when the type is obvious.
- Avoid the `any` type; use `unknown` when the type is uncertain.
- Interfaces for mock data (`recipe.model.ts`, `process.model.ts`).

### Angular

- Always use standalone components over NgModules.
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management.
- Implement lazy loading for feature routes.
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead.
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

### Components

- Keep components small and focused on a single responsibility.
- Use `input()` and `output()` functions instead of decorators.
- Use `computed()` for derived state.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in the `@Component` decorator.
- Prefer inline templates for small components.
- Prefer Reactive forms instead of Template-driven ones.
- Do NOT use `ngClass`, use `class` bindings instead.
- Do NOT use `ngStyle`, use `style` bindings instead.
- When using external templates/styles, use paths relative to the component TS file.

### State management

- Use signals for local component state.
- Use `computed()` for derived state.
- Keep state transformations pure and predictable.
- Do NOT use `mutate` on signals, use `update` or `set` instead.

### Templates

- Keep templates simple and avoid complex logic.
- Use native control flow (`@if`, `@for` with `track`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`.
- Use the async pipe to handle observables.
- Do not assume globals like `new Date()` are available; sample time values go as strings in the mock.

### Services

- Design services around a single responsibility.
- Use the `providedIn: 'root'` option for singleton services (none should be needed in this phase).
- Use the `inject()` function instead of constructor injection.

## 11. Verification and definition of done

A screen is done when:

- [ ] `ng build` passes with no errors or new warnings; lint is clean.
- [ ] No literal hex, font size, spacing or radius outside `_tokens.scss` / `_typography.scss` (verify by search).
- [ ] Every icon comes from the sprite and matches the catalog name; no icon library is imported.
- [ ] Copy is identical to the mockup (spelling, accents, capitalization); uppercase is applied with CSS, not in the source text.
- [ ] Numbers that count use tabular figures.
- [ ] Every card that has a shadow also has its 1px border.
- [ ] Focus ring visible on every control (3px `#FDDCCF`); full keyboard pass (Tab / Shift+Tab / Enter / Space).
- [ ] AXE reports no violations.
- [ ] Visual comparison: screenshot of the rendered screen at 1280px next to the PDF/Figma one; differences listed.
- [ ] `docs/screens/W-XX.md` updated (in Spanish) with components used, assumptions, differences from the mockup, and accessibility findings in the design.

After each screen, summarize in chat (in Spanish): what was built, new shared components, differences from the mockup, and open questions. Do not move to the next screen while an open question would change a shared component.