# TEMPO COCINA · App web

Módulo de planificación de TEMPO COCINA, un sistema de logística culinaria y alarmas
compuesto por una app web y una app móvil. **La web planifica** la receta y sus alarmas:
elige el plato, detecta los procesos, ajusta los tiempos y los transfiere al teléfono.
**La móvil las ejecuta** en la cocina (vive en `../../TempoCocinaMovil/`).

Este repositorio contiene **solo la maquetación visual**: las pantallas reproducen los
mockups de alta fidelidad de Figma, **sin lógica de negocio**.

Proyecto del curso de UX, Maestría en Ingeniería de Software (MISO), Universidad de los
Andes — **David Rojas · Diego Rojas**.

---

## 1. Qué incluye

Ocho pantallas, cada una como componente *standalone* cargado con `loadComponent` desde
`src/app/app.routes.ts`.

| ID | Título | Módulo | Ruta |
|---|---|---|---|
| **W-02** | Lista de recetas comunes | Recetario | `/mockups/w-02` |
| **W-06** | Detalle de receta y flujo de pasos | Recetario | `/mockups/w-06` |
| **W-13** | Configuración automática sugerida | Detección automática | `/mockups/w-13` |
| **W-15** | Configuración manual | Detección manual | `/mockups/w-15` |
| **W-16** | Editar alarmas | Alarmas | `/mockups/w-16` |
| **W-17** | Sonido sugerido | Sonido | `/mockups/w-17` |
| **W-22** | Confirmar y enviar al móvil | Transferencia | `/mockups/w-22` |
| **W-24** | Alarmas sincronizadas | Transferencia | `/mockups/w-24` |

Hay además un **índice de revisión** en `/mockups` que las lista todas con su módulo, para
recorrerlas sin escribir rutas a mano. La raíz `/` redirige a `/mockups/w-02`.

### Qué **no** hace la app

- **No hay backend, red ni persistencia.** Nada se guarda ni se envía a ninguna parte.
- **No hay temporizadores reales.** Las cifras son estáticas y no descuentan.
- **No hay audio.** Los botones de sonido no reproducen nada.
- **Los datos vienen de mocks**: un archivo `*.mock.ts` por pantalla, con el texto y los
  números transcritos del mockup. Ninguna pantalla lee de otra.
- Los formularios de W-13, W-15 y W-16 son editables en pantalla, pero **lo que escribas se
  pierde al navegar**: no hay estado compartido entre rutas.

---

## 2. Stack y requisitos

Versiones tomadas de `package.json` y del entorno donde se verificó.

| Pieza | Versión |
|---|---|
| Angular | 21.2 |
| Angular CLI / `@angular/build` | 21.2.24 |
| TypeScript | ~5.9.2 |
| RxJS | ~7.8 |
| Vitest (tests) | 4.x |
| Prettier | 3.8 |
| Node | **20.20.0** (probado) |
| npm | **10.8.2** (fijado en `packageManager`) |

Necesitas:

- **Node.js 20.19 o superior** (o 22.12+). Angular 21 no arranca con versiones anteriores.
- **npm 10.8.2.** El `package.json` lo declara en `packageManager`; con otra versión el
  proyecto compila igual, pero `package-lock.json` puede reescribirse.
- **Un navegador moderno.**
- **Conexión a internet en la primera carga**: las fuentes (Montserrat, Roboto y Roboto Mono)
  se piden a Google Fonts desde `src/index.html`. Sin red la app funciona, pero cae a las
  fuentes del sistema y la maquetación no coincide con el mockup.

No necesitas instalar la CLI de Angular globalmente: `npm start` usa la del proyecto.

> `@angular/material` y `@angular/cdk` están en `package.json` pero **no se importan en
> ningún archivo de `src/`**. Son residuo del andamiaje inicial; el diseño está hecho con
> SCSS propio. No los uses sin acordarlo.

---

## 3. Probar en `localhost:4200`

Desde esta carpeta (`TempoCocinaWeb/tempococina/`):

1. **Instalar las dependencias.** Solo la primera vez, o cuando cambie
   `package-lock.json`:

   ```bash
   npm ci
   ```

   `npm ci` instala exactamente lo que fija el lockfile. Usa `npm install` solo si vas a
   añadir un paquete.

2. **Levantar el servidor de desarrollo:**

   ```bash
   npm start
   ```

   Es un alias de `ng serve`. La primera compilación tarda algo; termina cuando imprime:

   ```
   Watch mode enabled. Watching for file changes...
     ➜  Local:   http://localhost:4200/
   ```

3. **Abrir** <http://localhost:4200/> en el navegador. Como `/` redirige, aterrizas en
   **W-02 «Lista de recetas comunes»**.

4. **Ir al índice** en <http://localhost:4200/mockups> para ver las ocho pantallas listadas y
   saltar a cualquiera con un clic.

5. **Sabes que funcionó** cuando ves, de arriba abajo: la barra con la marca —el icono
   `timer-brand` y el logotipo *Tempo* / *Cocina* en dos líneas—, el contenido de la
   pantalla, y el pie con sus dos sellos, «Sincronización cifrada de extremo a extremo» y
   «Compatible con Tempo Móvil iOS / Android». La pestaña dice **Tempo Cocina**.

El servidor recarga solo al guardar cualquier archivo de `src/`.

### Ver las pantallas al ancho correcto

Los frames de Figma están a **1440px**. El contenedor (`--tc-page-max`) tope a 1440 con
32px de margen lateral, o sea **1376px de contenido**; por debajo de 1440 encoge con la
ventana. Para compararlas con el mockup píxel a píxel:

1. Abre las DevTools (`⌥⌘I` en macOS, `F12` en Windows y Linux).
2. Activa el modo dispositivo (`⇧⌘M` / `Ctrl+Shift+M`).
3. En la barra de arriba pon el ancho en **1440** y elige *Responsive*.
4. Baja el zoom a 50–75% si no te cabe en pantalla; el ancho del viewport es lo que cuenta,
   no el zoom.

También conviene probar a **1280px** y a **768px**: el contenedor debe encoger sin scroll
horizontal.

### Otro puerto

Si el 4200 está ocupado:

```bash
npm start -- --port 4300
```

### Problemas comunes

| Síntoma | Causa y solución |
|---|---|
| `Cannot find module '@angular/build'` o errores raros al arrancar | `node_modules` quedó a medias. `rm -rf node_modules && npm ci` |
| `The Angular CLI requires a minimum Node.js version of...` | Node es anterior al 20.19. Actualízalo (`nvm use 20`) |
| `Port 4200 is already in use` | Otro `ng serve` sigue vivo. Ciérralo, o arranca en otro puerto (arriba) |
| Las tipografías se ven distintas al mockup | No hay red y Google Fonts no cargó. Es solo visual, la app funciona |
| Cambié un `.scss` y no se refleja | Los estilos de componente están en el mismo archivo `.ts` o en su `.scss`; si el watcher se atascó, reinicia `npm start` |
| Entro a `/mockups/w-06` directo y da 404 | Pasa al servir el `dist/` con un servidor estático sin *fallback* a `index.html`. Con `npm start` no ocurre |

---

## 4. Recorrido sugerido

Los enlaces que **existen de verdad** en el código. Cada destino sale de un campo `*Target`
del mock de la pantalla, así que este grafo es el que está cableado, no el del prototipo.

```
W-02  Lista de recetas comunes
 └── «Ver detalles y cargar →» ────────────► W-06

W-06  Detalle de receta
 ├── «Configurar alarmas automáticamente» ─► W-13
 ├── «Preparar receta» ───────────────────► W-24
 └── «Volver» ────────────────────────────► W-02

W-13  Configuración automática
 ├── «Confirmar y enviar al móvil» ───────► W-22
 ├── «Reconfigurar manualmente» ──────────► W-15
 └── «Volver» ────────────────────────────► W-06

W-15  Configuración manual
 ├── «GUARDAR Y SINCRONIZAR CON EL MÓVIL» ─► W-22
 ├── «DESCARTAR Y CANCELAR» ──────────────► W-13
 └── editar una alarma ───────────────────► W-16

W-16  Editar alarmas
 ├── guardar ─────────────────────────────► W-15
 └── elegir sonido ───────────────────────► W-17

W-17  Sonido sugerido
 ├── «CONSERVAR SONIDO» ──────────────────► W-16
 └── «Volver» ────────────────────────────► W-16

W-22  Confirmar y enviar
 ├── «Enviar a mi celular» ───────────────► W-24
 └── «Volver» ────────────────────────────► W-13

W-24  Alarmas sincronizadas
 └── «Volver al recetario» ───────────────► W-02
```

El recorrido completo más largo es **W-02 → W-06 → W-13 → W-15 → W-16 → W-17 → W-16 →
W-15 → W-22 → W-24 → W-02**, que cierra el ciclo.

Controles **sin destino** a propósito: «Modificar Receta» y «Agregar proceso manual» (las
pantallas que abrirían no están construidas).

---

## 5. Estructura del proyecto

```
TempoCocinaWeb/tempococina/
├── angular.json                    Configuración de build y del dev server
├── package.json                    Dependencias y scripts
├── docs/
│   ├── mockups/                    Exports de Figma
│   └── screens/                    Un reporte por pantalla + consistencia-final.md
└── src/
    ├── index.html                  Shell HTML; carga las fuentes de Google
    ├── styles/
    │   ├── _tokens.scss            107 custom properties ← el sistema de diseño
    │   ├── _typography.scss        20 mixins de texto
    │   └── _mixins.scss            Contenedor de página, foco, tarjeta, cabecera de tabla
    ├── assets/
    │   ├── icons/sprite.svg        28 iconos en un sprite SVG
    │   └── images/                 Fotografía de la receta
    └── app/
        ├── app.routes.ts           Tabla de rutas; todas con carga diferida
        ├── app.html                Shell: barra superior + router-outlet + pie
        ├── core/layout/            app-bar y footer, en todas las rutas
        ├── shared/ui/              16 componentes reutilizables
        ├── shared/mocks/           Datos compartidos entre pantallas
        └── features/               Una carpeta por pantalla
```

Cada carpeta de `features/` tiene el mismo juego de archivos: el componente (`.ts`), su
plantilla (`.html`), sus estilos (`.scss`) y su mock (`.mock.ts`).

---

## 6. Sistema de diseño

**Los tokens viven en `src/styles/_tokens.scss`**, como *custom properties* de CSS: 107 en
total, agrupadas en espaciado (23), escala de grises (11), texto (9), radios (8) y las
familias semánticas (éxito, crítico, aviso). Nunca escribas un color o una medida literal:
si falta un valor, se añade primero como token con nombre.

**Tipografía.** Tres familias desde Google Fonts: **Montserrat** (700, 800) para la marca,
**Roboto** (400–900) para la interfaz y **Roboto Mono** (400, 500) para las cifras que
cuentan. No se aplican con `font-size` suelto sino con los 20 mixins de
`_typography.scss` — `tc-text-h1`, `tc-text-body`, `tc-text-data-num`, `tc-text-chip`…

**Mixins de layout** (`_mixins.scss`): `tc-page-container` (el ancho de 1440px que comparten
todas las pantallas), `tc-focus-ring`, `tc-card-surface`, `tc-table-head` y `tc-below`.

**Iconos.** Un único **sprite SVG** en `src/assets/icons/sprite.svg` con 28 símbolos, que se
referencian con `<use href="#tc-icon-...">` a través del componente `tc-icon`. Se tiñen con
`currentColor`.

> **Los iconos se extraen de los mockups de Figma.** Prohibido Material Icons, Font Awesome,
> cualquier icon font, emojis o caracteres Unicode usados como iconos.

**Componentes compartidos** (`src/app/shared/ui/`), todos con prefijo `tc-`, *standalone* y
`OnPush`:

| Componente | Variantes |
|---|---|
| `tc-button` | `brand` · `brand-block` · `primary` · `secondary` · `dashed`, con tamaños e icono opcional |
| `tc-status-badge` | `success` · `neutral` |
| `tc-image-badge` | `technique` · `telemetry` |
| `tc-back-link` | una |
| `tc-icon` | envuelve el sprite |
| `tc-summary-table` | tabla de resumen (W-22) |
| `tc-timeline` | línea de tiempo de procesos |
| `tc-sync-card`, `tc-metric-tile`, `tc-info-note`, `tc-step-item`, `tc-checklist-item`, `tc-equipment-chip`, `tc-sound-list-item`, `tc-search-bar`, `tc-select` | una cada uno |

Un botón que navega no es un `<button>`: `tc-button` acepta `link` y renderiza
`<a routerLink>`, para que el enlace se pueda abrir en otra pestaña y el teclado lo trate
como enlace.

---

## 7. Diferencias con el mockup y hallazgos

Cada pantalla tiene su reporte con el detalle: [W-06](docs/screens/W-06.md) ·
[W-13](docs/screens/W-13.md) · [W-22](docs/screens/W-22.md) ·
[W-24](docs/screens/W-24.md), más
[consistencia-final.md](docs/screens/consistencia-final.md), que cruza las cuatro.

Lo que más pesa, resumido:

- **Los mismos cuatro procesos están redactados de cuatro formas distintas** según la
  pantalla, y dos versiones no coinciden con ninguna otra. Se transcribieron tal cual, sin
  normalizar. *(G2, F2, E4)*
- **Hay cinco valores distintos para el «tiempo total»** de la misma receta, y cuatro
  formatos distintos para las mismas cuatro duraciones. *(F4, E6, D4)*
- **El orden de la tabla de W-22 contradice el orden cronológico de su propia línea de
  tiempo**, y la línea no es proporcional a las duraciones que muestra. *(F1, F5)*
- **El H1 cambia de color entre pantallas** y aparecen grises, verdes y azules fuera del
  catálogo de tokens. *(D1, D2, D3, E8, F7)*
- **El ordinal no identifica al proceso**: el número de la columna `#` es la posición en la
  tabla, no el orden de cocción.

Todo esto se construyó **como está diseñado** y se reportó; no se «arregló» por cuenta
propia. Las decisiones que sí se tomaron a conciencia están en la sección 3 de
`consistencia-final.md`.

---

## 8. Documentación y fuentes

| Fuente | Dónde |
|---|---|
| **Mockups de Figma (web)** | El equipo comparte el enlace del archivo web |
| **Reportes por pantalla** | [`docs/screens/`](docs/screens/) — en español |
| **Cruce de consistencia** | [`docs/screens/consistencia-final.md`](docs/screens/consistencia-final.md) |
| **Exports de los mockups** | [`docs/mockups/`](docs/mockups/) |
| **App móvil** | [`../../TempoCocinaMovil/README.md`](../../TempoCocinaMovil/README.md) |

> `docs/mockups/` solo tiene el export de **W-06**. Los de las otras siete pantallas no
> están en el repositorio.

---

## 9. Scripts disponibles

| Script | Qué hace | Estado |
|---|---|---|
| `npm start` | Servidor de desarrollo en `localhost:4200` con recarga | ✅ verificado |
| `npm test` | Tests unitarios con Vitest | ✅ 4 archivos, 13 pruebas, todas pasan |
| `npm run watch` | Compila en modo desarrollo y se queda observando | — |
| `npm run build` | Compilación de producción a `dist/` | ⚠️ **falla hoy**, ver abajo |
| `npm run ng` | Acceso directo a la CLI del proyecto | — |

### `npm run build` está roto

La compilación de producción falla por un presupuesto de tamaño:

```
✘ [ERROR] src/app/features/edit-alarm/edit-alarm.scss exceeded maximum budget.
          Budget 16.00 kB was not met by 262 bytes with a total of 16.26 kB.
```

Son **262 bytes** por encima del tope que fija `angular.json` para los estilos de un
componente. `npm start` no lo aplica, así que **el desarrollo y la revisión visual no están
bloqueados**; solo el build de producción. Se arregla de dos maneras, y conviene acordar
cuál: adelgazar `edit-alarm.scss` (16.26 kB es mucho para una pantalla, y sugiere que hay
estilos que deberían vivir en un componente compartido), o subir el presupuesto en
`angular.json`.

La compilación también emite dos avisos **NG8113**: `SoundListItem` y `SyncCard` están
importados en `suggested-sound.ts` pero no se usan en su plantilla.
