# Baseline — estado del código antes de M-02, M-03 y M-07

Fase 0 del protocolo de CLAUDE.md §2. **No se tocó código.** Este documento describe
lo que hay, no lo que debería haber; las diferencias contra las secciones 4–10 quedan
anotadas para que se decidan, no corregidas.

> **Nota de vocabulario.** El encargo original hablaba de *styles, tokens, core,
> shared/ui, mocks, models, rutas y sprite*, que es vocabulario del proyecto web en
> Angular. Este proyecto es Android, así que el equivalente es: tokens → `values/themes.xml`,
> shared/ui → drawables y bloques de layout, rutas → `AndroidManifest.xml` + `Intent`,
> sprite → `res/drawable`, features → un `activity_*.xml` con su `*.kt`.

---

## 1. Stack real

| | |
|---|---|
| Plataforma | Android nativo — Gradle 9.3.1, AGP 9.1.1, Kotlin 2.2.10 |
| UI | **XML layouts + `AppCompatActivity`** (no Compose, no fragments) |
| minSdk / targetSdk / compileSdk | 24 / 36 / 37 |
| Java | 25 (Temurin) — el build pasa |
| Dependencias UI | `appcompat`, `material`, `constraintlayout`, `core-ktx`. CardView entra transitivamente por `material` |
| Compose | Presente en dependencias y en `MainActivity.kt` + `ui/theme/`, **pero ninguna pantalla real lo usa**. Es andamiaje de la plantilla de Android Studio |

`./gradlew assembleDebug` → **BUILD SUCCESSFUL**.

---

## 2. Tokens de color

Viven en **`res/values/themes.xml`**, no en `colors.xml`. `colors.xml` solo tiene los
colores de plantilla de Android Studio (`purple_200`, `teal_200`…) y **nadie los referencia**.

### Contraste contra CLAUDE.md §4

Los **17 tokens base coinciden exactamente**, valor por valor:

| Token §4 | Recurso | Valor | ¿Coincide? |
|---|---|---|---|
| Primary `#18434B` | `@color/primary` | `#18434B` | ✅ |
| Primary deep `#0F2B31` | `@color/primary_deep` | `#0F2B31` | ✅ |
| Secondary `#ED532A` | `@color/secondary` | `#ED532A` | ✅ |
| Secondary soft `#FDDCCF` | `@color/secondary_soft` | `#FDDCCF` | ✅ |
| Secondary wash `#FFF5F1` | `@color/secondary_wash` | `#FFF5F1` | ✅ |
| Background `#F8F9FA` | `@color/background` | `#F8F9FA` | ✅ |
| Surface `#FFFFFF` | `@color/surface` | `#FFFFFF` | ✅ |
| Surface alt `#F1F5F9` | `@color/surface_alt` | `#F1F5F9` | ✅ |
| Border `#E2E8F0` | `@color/border` | `#E2E8F0` | ✅ |
| Text primary `#18434B` | `@color/text_primary` | `#18434B` | ✅ |
| Text body `#1E293B` | `@color/text_body` | `#1E293B` | ✅ |
| Text secondary `#64748B` | `@color/text_secondary` | `#64748B` | ✅ |
| Text disabled `#CBD5E1` | `@color/text_disabled` | `#CBD5E1` | ✅ |
| Success `#10B981` | `@color/success` | `#10B981` | ✅ |
| Warning `#F59E0B` | `@color/warning` | `#F59E0B` | ✅ |
| Error `#EF4444` | `@color/error` | `#EF4444` | ✅ |
| Critical `#ED532A` | `@color/critical` | `#ED532A` | ✅ |

### Lo que NO coincide

**a) Faltan los 8 valores de texto y fondo semánticos.** §4 pide color + texto + fondo por
familia; solo está el color base.

| Familia | Texto que falta | Fondo que falta |
|---|---|---|
| Success | `#047857` | `#D1FAE5` |
| Warning | `#92400E` | `#FDE68A` |
| Error | `#B91C1C` | `#FEE2E2` |
| Critical | `#9A2F12` | `#FFF5F1` (existe como `secondary_wash`) |

En su lugar, los layouts y drawables improvisan: `#ECFDF5` y `#16A34A` para éxito,
`#FFF7ED` y `#F97316` para aviso.

**b) Dos colores fuera del sistema, y uno es el hex más repetido del proyecto.**

| Hex | Usos | Nota |
|---|---|---|
| `#94A3B8` | **19** (16 en M-08, 3 en M-01) | Gris que no es ningún token. Es el color literal más frecuente |
| `#F97316` | 5 (4 en M-08 + `bg_estado_naranja`) | **Un segundo naranja**, distinto de `#ED532A` |
| `#16A34A` | 2 | Un segundo verde, distinto de `#10B981` |
| `#B8C5C8`, `#21474E`, `#D5DDE0`, `#355C64`, `#294D54`, `#10353C` | 1 c/u, todos en M-13 | Tonos del bloque de alarma oscuro |
| `#E8EEF3`, `#E6F0F2`, `#F8FAFC`, `#493A35` | 1 c/u, en drawables | Tintes derivados sin nombrar |

CLAUDE.md §4 dice que `#C63F18` y los grises oscuros «no existen en el sistema». Estos
están en la misma situación y hay que decidir si se tokenizan o se sustituyen.

**c) `@color/completed` (`#E2E8F0`) existe pero no está en §4**, y duplica `border`.
`@color/focus_color` (`#FDDCCF`) duplica `secondary_soft` bajo otro nombre.

**d) Contraste contra Figma: no se pudo hacer.** El MCP de Figma agotó el límite de
llamadas del plan Starter. Queda pendiente confirmar los 17 valores con
`get_variable_defs` sobre el archivo `3ckGVFDTfe53VKggdmjxmK`.

---

## 3. Dimensiones, radios y tipografía

**Espaciado y radios: completos y correctos** en `themes.xml`.

- Base: `base_width` 390dp · `margin_lateral` 20dp · `gutter_interno` 12dp · `barra_superior` 64dp · `boton_altura` 48dp
- Escala: `space_4` … `space_48` (4, 8, 12, 16, 24, 32, 48) — coincide con §7
- Radios: `radius_chip` 8 · `radius_field` 12 · `radius_card` 16 · `radius_button` 999 · `radius_modal` 28 — coincide con §7
- Accesibilidad: `touch_target_min` 44dp · `focus_halo` 3dp

**Tipografía: prácticamente sin tokenizar.**

- §5 define **9 estilos**; `themes.xml` define **2**: `TextTitle` (20sp) y `TextBody` (14sp).
- **Ningún** tamaño de esos dos coincide con la tabla de §5 (H1 28, Timer 34, H2 22, H3 17, Body 15, Body S 13, Caption 11, Button 16).
- Hay **77 `textSize` literales** en los tres layouts. Los más usados: 11sp (22 veces), 12sp (19), 16sp (8), 24sp (6).
- Los `@dimen` de texto que existen (`text_size_title` 20, `text_size_body` 14, `text_size_caption` 12) tampoco salen de §5.
- Las fuentes Roboto **sí** están en `res/font/` y los layouts las usan bien (`@font/roboto_bold`). Pero los dos estilos de `themes.xml` declaran `fontFamily="Roboto"` (la del sistema), así que quien use `style="@style/TextTitle"` no obtiene la Roboto empaquetada.
- No hay `letterSpacing` ni `lineHeight` en ningún sitio, que §5 sí pide.
- No hay `fontFeatureSettings="tnum"` en ninguna cifra, pese a que §5 y §11 lo exigen para timers y porcentajes.

---

## 4. Drawables

**Formas (15).** Todas `<shape>`, ninguna `<selector>` ni `<ripple>`.

| Drawable | Radio | Relleno |
|---|---|---|
| `bg_card` | `@dimen/radius_card` | `@color/surface` |
| `bg_card_aprendizaje` | 16dp | `#F8FAFC` |
| `bg_aviso_tiempos` | 10dp | transparente (borde punteado) |
| `bg_btn_detener` | 28dp | `@color/error` |
| `bg_btn_lineal` | 28dp | `@color/text_primary` |
| `bg_btn_opcion` | 28dp | `@color/surface` |
| `bg_btn_posponer` | 28dp | `@color/surface_alt` |
| `bg_check_proceso` | 8dp | `@color/primary` |
| `bg_circle_white` | óvalo | `@color/surface` |
| `bg_contador_procesos` | 999dp | `#E8EEF3` |
| `bg_estado_naranja` | 12dp | `#FFF7ED` |
| `bg_estado_verde` | 12dp | `#ECFDF5` |
| `bg_icon_alarm` | 14dp | `#493A35` |
| `bg_icono_aprendizaje` | óvalo | `#FFFFFF` |
| `bg_icono_proceso` | 12dp | `#E6F0F2` |

**Observaciones:** los radios de botón son **28dp**, no `@dimen/radius_button` (999dp) como
dice §7. Cinco de las quince usan hex literal en vez de token.

**Iconos (7 reales).** **Todos PNG**, ninguno vectorial: `ic_aprendizaje`, `ic_arroz`,
`ic_bell`, `ic_horno`, `ic_salsa`, `ic_star`, `ic_thunder`. No se pueden teñir con
`android:tint` ni escalan bien. Más `img_comida.png` y `tempo_cocina_logo.png`.

**Del catálogo de §6 (34 iconos), en el proyecto hay 7 y ninguno con el nombre del catálogo.**
Mapeo aproximado: `ic_arroz`→`pot`, `ic_horno`→`oven`, `ic_salsa`→`pan`,
`ic_aprendizaje`→`sparkles`, `ic_bell`→`bell`, `ic_thunder`→`bolt`, `ic_star`→`star`.

---

## 5. Bloques reutilizables

**No hay ninguno. `<include>` no se usa en ningún layout (0 ocurrencias).** Todo está
copiado y pegado:

- **Top app bar** — el trío `tituloModulo` + `tituloPrincipal` + `logoTempo` está duplicado
  literalmente en las tres pantallas. M-08 además añade un subtítulo.
- **Process item** — M-01 repite el mismo bloque 3 veces a mano.
- **Comparative bars** — M-08 repite su bloque 3 veces a mano.

Recuento de widgets en los tres layouts: 84 `TextView`, 62 `LinearLayout`, 18 `CardView`,
10 `ImageView`, 8 `ProgressBar`, 5 `Button`, 3 `ConstraintLayout`, 2 `View`.

**Convención de ids:** camelCase en español, prefijado por rol — `tituloModulo`,
`tituloPrincipal`, `logoTempo`, `cardReceta`, `cardSiguienteProceso`, `avisoTiempos`,
`seccionProcesos`, `seccionDesglose`, `colaAlarmas`, `btnEmpezar`, `btnModoCocina`,
`btnDetener`, `btnPosponer`.

**Estructura raíz:** `ScrollView` (`fillViewport="true"`) → `ConstraintLayout` con
`android:id="@+id/main"` y `tools:context=".mXX_nombre"`. M-13 es la excepción: arranca
directamente en `ConstraintLayout`, sin scroll.

---

## 6. Datos: no hay capa de modelos ni mocks

Todo el contenido es literal dentro del XML (`android:text="Pollo al horno con arroz"`).
No existen `data class`, ni repositorios, ni `strings.xml` poblado — `strings.xml` solo
tiene `app_name`. Los números (`09:44`, `92%`, `15 min est.`) están escritos a mano en cada
layout.

Consecuencia para M-03 y M-07: la consistencia de los datos de sesión entre pantallas hay
que mantenerla **a mano**, contrastando contra los layouts ya construidos.

---

## 7. Navegación

No hay navigation graph ni rutas. Cada pantalla es una `<activity>` en el manifest y se
navega con `Intent` explícito.

| Activity | `exported` | Entra desde |
|---|---|---|
| `m01_recetas` | **`true`** — LAUNCHER | — |
| `m13_alarma` | `false` | M-01, botón `btnEmpezar` («Empezar cocción») |
| `m08_resumen` | `false` | M-13, botón `btnDetener` («Detener alarma») |
| `m02_permiso_ModoCocina` | `false` | **nadie** |
| `m03_cola_Alarmas` | `false` | **nadie** |
| `m07_proceso_terminado` | `false` | **nadie** |
| `MainActivity` | `false` | nadie (plantilla Compose) |

El boilerplate de cada Activity es idéntico: `enableEdgeToEdge()`, `setContentView`,
listener de `WindowInsetsCompat` sobre `@+id/main`, y el `setOnClickListener` de navegación.
`findViewById`, sin ViewBinding.

---

## 8. Reportes previos

**No existe ninguno.** No hay `docs/screens/M-01.md`, `M-08.md` ni `M-13.md`, ni el PDF
de System Design que CLAUDE.md §1 referencia, ni los mockups 4× en `docs/mockups/`.
`docs/` se creó en esta fase para alojar el baseline.

---

## 9. Capturas del baseline

En `docs/screens/_baseline/`, a 390 × 844 dp con densidad 4× (1560 × 3376 px), que es el
lienzo exacto de §7. El procedimiento y sus trampas están en
`_baseline/README.md`.

Lo importante: **solo M-01 se puede lanzar con `am start`**. Las demás están
`exported="false"`, así que Android rechaza el lanzamiento con `SecurityException`, y
`adb root` no funciona en esta imagen de emulador. Se llega navegando con taps
(M-01 → M-13 → M-08), con las coordenadas sacadas de `uiautomator dump`.

---

## 10. Hallazgo importante: `m08_resumen` implementa M-07

La pantalla que el proyecto llama **M-08** renderiza, línea por línea, lo que CLAUDE.md §13
especifica para **M-07 «Resumen de cocción»**:

- Kicker `SESIÓN FINALIZADA` · título `RESUMEN DE COCCION` · subtítulo `Pollo al horno con arroz · Tiempo total: 48 min`
- Metric card: `PRECISIÓN GLOBAL` / `92%` `efectividad` · `DESVIACIÓN NETA` / `+4 min`
- Footer: `3 procesos ejecutados` · `2 ligeros desfases`
- `DESGLOSE POR PROCESO` · `PLANEADO VS. REAL`
- Las tres barras comparativas con Arroz / Pollo al horno / Salsa (reducción) y sus chips `+2 min desfase`, `A tiempo`, `Reducción +2m`
- Tarjeta `Aprendizaje automático` con el texto exacto de §13

No aparece nada del «Status banner · Timer card · Chips de estado · Disabled state» que §1
atribuye a M-08. Y `m07_proceso_terminado` es un stub vacío.

**Pregunta abierta:** ¿el archivo está mal nombrado (el contenido es M-07) o la tabla de §1
describe mal M-08? Si es lo primero, **M-07 ya está construida** y el alcance de este
encargo se reduce a M-02 y M-03.

Falta confirmar si la pantalla incluye el footer fijo con el botón `Evaluar` que pide §13;
en la captura no se ve, pero puede estar fuera del scroll.

---

## 11. Otros hallazgos

1. **Tilde inconsistente en los títulos.** M-01 muestra `RECETA PREPARACIÓN` **con** tilde;
   `m08_resumen` muestra `RESUMEN DE COCCION` **sin** tilde. §0 y §13 piden ambas sin tilde.
   Una de las dos está mal y hay que decidir cuál.
2. **Las mayúsculas están escritas en el copy** (`android:text="MÓDULO DE SINCRONIZACIÓN"`)
   en vez de usar `android:textAllCaps`. §5 lo prohíbe porque los lectores de pantalla
   pueden deletrearlo.
3. **Sin estados.** No hay ningún `<selector>`: ningún control tiene estado pressed,
   focused ni disabled, que §8 exige para todos.
4. **Sin `contentDescription`.** Ninguno de los 10 `ImageView` lo declara, ni se marca como
   decorativo con `importantForAccessibility`.
5. **Sin `accessibilityHeading`** en ningún título.
6. **`ProgressBar` sin nombre accesible** ni `contentDescription`, que §8 pide.
7. **Radios de botón a 28dp** en vez del token de 999dp de §7.
8. **El logo lleva un recuadro visible** — el layout de M-01 lo comenta como
   «Recuadro temporal para el logo». Se nota en la captura.
9. **Clases en snake_case** (`m02_permiso_ModoCocina`), contra la convención de Kotlin.

---

## 12. Tabla de reutilización para el alcance

Completada con lo encontrado. «Reutilizar» significa usar el recurso tal cual; «extender»,
añadir una variante sin cambiar cómo renderiza lo existente; «crear», que no hay nada.

### M-02 · Permiso de audio prioritario

| Pieza | Estado | Detalle |
|---|---|---|
| Top app bar | **Copiar** | No es un `<include>`; hay que duplicar el bloque como hacen las tres pantallas. Con separador de 1px, que ninguna tiene todavía |
| Tokens de color | **Reutilizar** | Los 17 sirven tal cual |
| Espaciado y radios | **Reutilizar** | `margin_lateral`, `space_*`, `radius_*` completos |
| `bg_card` | **Reutilizar** | Para la fila de sonido de prueba |
| `bg_circle_white` | **Extender** | Existe en blanco; hace falta la versión naranja para el círculo del botón primario |
| `bg_icono_proceso` (tile 12dp `#E6F0F2`) | **Extender** | Es la base del icon tile; falta la variante 64 con tinte teal y la naranja de `bell-off` |
| Botón primario | **Crear** | `bg_btn_lineal` es teal pero con radio 28; §7 pide pill 999. Además ninguno admite icono adelante |
| Botón de texto («Ahora no») | **Crear** | No existe |
| Botón secundario pequeño («Escuchar») | **Crear** | No existe en tamaño `sm` |
| List item con icono | **Crear** | Como `item_permiso.xml` reutilizado con `<include>` ×3 |
| Estilos de texto H2 / Body / Caption | **Crear** | No existen en `themes.xml` |
| Iconos `volume`, `bell-off`, `vibrate`, `play` | **Crear** | Ninguno está. Como vector drawable, no PNG |
| Icono `bell` | **Extender** | Existe `ic_bell.png`; hace falta vectorial y blanco sobre naranja |
| Navegación → M-03 | **Crear** | `Intent` a `m03_cola_Alarmas` |
| Navegación → M-01 («Ahora no») | **Crear** | Confirmar contra el prototipo |

### M-03 · Temporizadores activos

| Pieza | Estado | Detalle |
|---|---|---|
| Top app bar | **Copiar** | Igual que M-02 |
| Timer card | **Extender** | M-08/M-07 no tiene timer cards; la anatomía más parecida son las barras comparativas. Probablemente haya que crearla entera |
| Chips de estado | **Extender** | `bg_estado_verde` y `bg_estado_naranja` existen; faltan el crítico y el neutro |
| `ProgressBar` | **Reutilizar** | Ya se usa en M-08 |
| Counter chip | **Reutilizar** | `bg_contador_procesos` |
| Status banner | **Crear** | No existe |
| Botón «Pausar todo» | **Crear** | Pill outline 2dp teal a ancho completo |
| Iconos `pot`, `stop`, `pause` | **Crear** / `ic_arroz.png`→`pot` existe como PNG | |

### M-07 · Resumen de cocción

**Bloqueado por el hallazgo de la sección 10.** Si `m08_resumen` es M-07, esta pantalla ya
está construida y lo que toca es renombrar, no maquetar. Si no lo es, casi todo
(metric card, barras comparativas, insight card, chips success y critical-soft) ya existe
en `activity_m08_resumen.xml` y sería **reutilizar** copiando el bloque.

---

## 13. Bloqueos

1. **Figma** — MCP en el límite de llamadas del plan Starter. Sin contraste de tokens ni
   geometría exacta. Se trabajará desde los mockups hasta que se reponga.
2. **Sin PDF de System Design** ni mockups 4× en `docs/`. Las listas de componentes e iconos
   por pantalla salen de CLAUDE.md §6 y §13, no del PDF.
3. **M-07 / M-08** — pendiente de decisión (sección 10).
