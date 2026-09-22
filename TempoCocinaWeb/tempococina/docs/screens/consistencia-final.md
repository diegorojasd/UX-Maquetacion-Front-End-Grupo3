# Consistencia entre las cuatro pantallas

Pasada final del alcance (W-06, W-13, W-22, W-24). Auditoría hecha sobre el
código; lo que requiere navegador queda marcado como pendiente al final.

---

## 1. Lo que sí cuadra

| Aspecto | Estado |
|---|---|
| App bar | Componente único (`core/layout/app-bar`), idéntico por construcción |
| Footer | Componente único (`core/layout/footer`), idéntico por construcción |
| Contenedor de página | Mixin único `tc-page-container` (máx. 1440, gutter 32) en App bar, las cuatro pantallas, el índice y el pie |
| Enlace "Volver" | Componente único `tc-back-link` en W-06, W-13 y W-22 |
| Radios | Todos por token. **Cero valores crudos** tras corregir el último (`50%` → `--tc-radius-pill` en `tc-equipment-chip`) |
| Anillo de foco | Mixin `tc-focus-ring` en los 5 archivos con controles interactivos: botón, enlace de retorno, checklist item, la tabla editable de W-13 y el índice. Sin excepciones |
| Color | Cero hex fuera de `_tokens.scss` |
| Tipografía | Cero `font-size` fuera de `_typography.scss` (salvo el `16px` raíz que define el `rem`) |
| Prohibidos §7 | Cero `ngClass`, `ngStyle`, `::ng-deep`, `!important` |
| Cabecera de tabla | Mixin `tc-table-head` compartido entre la tabla de lectura (W-22) y la editable (W-13) |
| Cifras tabulares | Los 9 lugares donde se pinta un tiempo pasan por un estilo con `tabular-nums` o lo añaden explícitamente |

---

## 2. Lo que NO cuadra

### 2.1 Cuatro formatos distintos para las mismas cuatro duraciones

| Proceso | W-06 | W-24 | W-22 | W-13 |
|---|---|---|---|---|
| Precalentar | `10 min` | `10:00 min` | `10` + `min` | `10` + `minutos` |
| Pollo | **`30 min`** | `35:00 min` | `35` + `min` | `35` + `minutos` |
| Arroz | `15 min` | `15:00 min` | `15` + `min` | `15` + `minutos` |
| Reposo | `5 min` | `05:00 min` | `05` + `min` | **`5`** + `minutos` |

Tres problemas superpuestos, todos del diseño y **ninguno corregido**:

1. **La duración del pollo no coincide.** W-06 dice 30 min; las otras tres dicen 35.
2. **El cero a la izquierda va y viene.** Aparece en W-24 y W-22, no en W-06 ni W-13.
3. **La unidad cambia de forma y de sitio.** Sufijo dentro del valor (W-06, W-24), etiqueta abreviada al lado (W-22), etiqueta completa al lado (W-13).

En el modelo compartido esto vive como cuatro campos distintos (`duration`,
`syncDuration`, `transferDuration`, `assignedMinutes`) precisamente para no
uniformarlo por accidente.

### 2.2 Cinco valores para el tiempo total

`45` (tile de W-06) · `50` (CLAUDE.md §1 y sub-barra de W-22) · `60` (suma de
los pasos de W-06) · `65` (suma de W-24 y de las filas de W-22). W-13 no muestra
total. El `50` de W-22 se transcribe tal cual porque los procesos se solapan.

### 2.3 Cuatro redacciones para los mismos cuatro procesos

Detallado en `W-13.md` (G2). Dos de ellas —Arroz y Reposo— cambian de redacción
entre W-22 y W-13, no solo de prefijo.

### 2.4 El ordinal no identifica al proceso

W-06 y W-24 numeran por secuencia cronológica; W-22 y W-13 por posición en la
tabla. La fila `01` de W-13 es el pollo, que es el proceso `02` en W-06
(`W-13.md`, G13).

### 2.5 Dos sombras de elevación 1

`tc-card-surface` usa `0 1px 2px rgb(0 0 0 / 5%)`; `tc-sound-list-item` (W-24)
usa `0 1px 1px rgb(0 0 0 / 5%)`, que es lo que dibuja su frame. Diferencia de
1px de desenfoque, fiel al diseño pero inconsistente entre pantallas.

### 2.6 El H1 cambia de color

W-06, W-22 y W-13 lo pintan con `--tc-text-primary` (`#1D434B`); W-24 con
`--tc-text-strong` (`#0F172A`). La excepción es W-24 (`W-24.md`, E9).

---

## 3. Desviaciones deliberadas respecto a los frames

- **Contenedor unificado a 1440.** Cada frame traía su propio ancho (1600 en
  W-06, 1280 en W-22/W-24) y el pie un gutter de 48 contra los 32 del contenido.
  Unificado a petición del equipo.
- **Familia tipográfica en W-24.** El frame usa Montserrat; se construyó en
  Roboto por coherencia con el resto y con CLAUDE.md §5 (`W-24.md`, E1).
- **Objetivos táctiles.** El enlace "Volver" (14px en el frame) y el botón de
  quitar de W-13 (32px) amplían su área de clic con un pseudo-elemento, sin
  alterar la caja dibujada.
- **Cifras de tiempo en Roboto.** El encargo pedía estilo Data monoespaciado;
  los frames las pintan en Roboto. Se mantuvo Roboto y se añadió `tabular-nums`
  (`W-22.md`, Q1/F8).

---

## 4. Pendientes

- **PASO 2 de W-13 — 4 iconos suplentes.** `close`, `chevron-down`, `plus` y
  `bolt` no se pudieron exportar (límite de llamadas del plan de Figma). Con
  autorización del equipo se añadieron suplentes al sprite, marcados como tales,
  siguiendo la convención de trazo de la familia. **Se aparta de CLAUDE.md §6.**
  `bolt` es el que conviene contrastar contra el frame; los otros tres son
  geométricamente inequívocos.
- **Verificación visual.** Captura a 1280px de las cuatro y comparación con los
  frames: requiere navegador, no disponible en el entorno de trabajo.
- **Recorrido de teclado y AXE.** Igual: requiere navegador. La semántica de la
  tabla editable sí está cubierta por tests unitarios (13 en verde), incluidos
  `scope`, nombres accesibles por control y la etiqueta del botón de quitar.
- **Colores y tipografía de W-13 sin confirmar contra el frame**, por el mismo
  bloqueo del MCP. No se identificó ningún color nuevo a simple vista.
