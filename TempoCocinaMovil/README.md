# TEMPO COCINA · App móvil

Módulo de ejecución en cocina de TEMPO COCINA, un sistema de logística culinaria y alarmas
compuesto por una app web y una app móvil. **La web planifica** la receta y sus alarmas; **la
móvil las ejecuta**: recibe la configuración, toma prioridad sobre el audio del teléfono,
corre los temporizadores en paralelo y cierra la sesión con un resumen.

Este repositorio contiene **solo la maquetación visual**: las pantallas reproducen los
mockups de alta fidelidad de Figma como layouts Android, **sin lógica de negocio**.

Proyecto del curso de UX, Maestría en Ingeniería de Software (MISO), Universidad de los
Andes — **David Rojas · Diego Rojas**.

> **Es una app Android nativa** (Gradle + Kotlin + XML), no una app web empaquetada.
> No hay Angular, Node, Ionic ni Capacitor, y no hacen falta: se abre directamente en
> Android Studio. La app web vive aparte, en `../TempoCocinaWeb/tempococina/`.

---

## 1. Qué incluye

Seis pantallas construidas. Cada una es una `AppCompatActivity` con su layout XML; no hay
grafo de navegación ni fragments, la navegación es por `Intent` y el índice es el launcher.

| ID | Título | Módulo (kicker) | Activity / layout | Qué es |
|---|---|---|---|---|
| **M-01** | Receta preparación | — | `m01_recetas` · `activity_m01_recetas.xml` | Pantalla de entrada (LAUNCHER): la receta con sus tres procesos listos para iniciar |
| **M-02** | Permiso de audio prioritario | Módulo de sincronización | `m02_permiso_ModoCocina` · `activity_m02_permiso_modo_cocina.xml` | Explica por qué la alarma debe sonar sobre el silencio y «No Molestar» antes de entrar en Modo Cocina |
| **M-03** | Temporizadores activos · vista compacta | Módulo de cocción • Modo activo | `m03_cola_Alarmas` · `activity_m03_cola_alarmas.xml` | Panel de control: tres procesos en paralelo, Arroz en alerta |
| **M-07** | Proceso terminado | Sesión de cocina | `m07_proceso_terminado` · `activity_m07_proceso_terminado.xml` | El mismo panel más tarde: Arroz completado y deshabilitado, el horno en alerta |
| **M-08** | Resumen de cocción | Sesión finalizada | `m08_resumen` · `activity_m08_resumen.xml` | Cierre analítico: precisión global, desviación por proceso y sugerencia de calibración |
| **M-13** | Alarma | Modo cocina · Alarma | `m13_alarma` · `activity_m13_alarma.xml` | Alarma sonando a pantalla completa, con detener y posponer |

Las otras ocho pantallas del inventario móvil (M-04, M-05, M-06, M-09 … M-12, M-14) **no
están construidas** y no se enlazan desde ninguna parte.

### Qué **no** hace la app

- **No hay temporizadores reales.** Las cifras (`05:22`, `19:58`) son estáticas y no
  descuentan; las barras de progreso tienen un valor fijo y no se animan.
- **No hay audio ni vibración.** «Escuchar» en M-02 no reproduce nada y la app nunca pide
  un permiso del sistema — M-02 *explica* un permiso, no lo solicita.
- **No hay sincronización, backend, red ni persistencia.**
- **Los datos vienen de un mock**, `CookingSession.kt`: una sesión fija de *Pollo al horno
  con arroz* con tres procesos (Arroz, Horno, Salsa). El resto de las pantallas escribe sus
  textos directamente en el XML.

---

## 2. Stack y requisitos

Versiones tomadas de `gradle/wrapper/gradle-wrapper.properties`, `gradle/libs.versions.toml`
y `app/build.gradle.kts`.

| Pieza | Versión |
|---|---|
| Android Gradle Plugin | 9.1.1 |
| Gradle (wrapper) | 9.3.1 |
| Kotlin | 2.2.10 |
| JDK | 25 (probado con Temurin 25.0.3 LTS) |
| `compileSdk` | 37 |
| `minSdk` | 24 (Android 7.0) |
| `targetSdk` | 36 |
| AndroidX | AppCompat 1.6.1 · ConstraintLayout 2.1.4 · Material 1.10.0 |

Necesitas:

- **Android Studio** con el Android SDK y un emulador (o un teléfono con depuración USB).
- **JDK 25**. Android Studio trae el suyo (*Settings → Build, Execution, Deployment → Build
  Tools → Gradle → Gradle JDK*); desde la terminal usa el del sistema.
- **No** necesitas Node, npm ni instalar Gradle: el wrapper (`./gradlew`) lo descarga solo.

> El proyecto arrastra las dependencias de Jetpack Compose del template de Android Studio
> (`MainActivity.kt`, `ui/theme/`). **Ninguna pantalla real las usa** — todas son XML +
> `AppCompatActivity`. Están ahí sin borrar, no las extiendas.

---

## 3. Compilar desde la terminal

No hay modo navegador: es una app nativa, se ejecuta en un emulador o en un dispositivo.
Desde `TempoCocinaMovil/`:

```bash
# Si gradlew no tiene permiso de ejecución (pasa al clonar en macOS/Linux)
chmod +x gradlew

# Compilar el APK de debug
./gradlew assembleDebug

# Análisis estático
./gradlew lint

# Instalar en el emulador o dispositivo conectado
./gradlew installDebug
```

El APK queda en `app/build/outputs/apk/debug/app-debug.apk` y el informe de lint en
`app/build/reports/lint-results-debug.html`.

---

## 4. Probar en Android Studio

1. **Abrir el proyecto.** *File → Open* y selecciona la carpeta **`TempoCocinaMovil/`**, no
   la raíz del repositorio. La raíz contiene también el proyecto web y Android Studio no
   sabría qué hacer con ella.
2. **Esperar el sync de Gradle.** La primera vez descarga Gradle 9.3.1 y las dependencias;
   tarda varios minutos. Si te ofrece actualizar AGP o Gradle, **di que no**: las versiones
   están fijadas.
3. **Crear un emulador.** *Device Manager → Add a new device → Pixel* (cualquier Pixel
   reciente sirve) con una imagen de sistema de **API 24 o superior**.
4. **Ejecutar.** Elige el emulador en la barra superior y pulsa **Run ▶** (`^R` en macOS).
   Arranca en **M-01**, que es la Activity marcada como `LAUNCHER`.

### Reproducir el lienzo exacto de los mockups

Los mockups están dibujados sobre **390 × 844 dp** y exportados a 4×. Para comparar píxel a
píxel, fija el emulador a esa resolución con `adb` (el binario está en
`~/Library/Android/sdk/platform-tools/` en macOS):

```bash
adb -s emulator-5554 shell wm size 1560x3376
adb -s emulator-5554 shell wm density 640
```

Cambia `emulator-5554` por lo que liste `adb devices`. Para volver a la configuración
original del AVD:

```bash
adb -s emulator-5554 shell wm size reset
adb -s emulator-5554 shell wm density reset
```

Y para capturar la pantalla tal como están los PNG de `docs/screens/`:

```bash
adb -s emulator-5554 exec-out screencap -p > captura.png
```

### Problemas comunes

| Síntoma | Causa y solución |
|---|---|
| `zsh: permission denied: ./gradlew` | Falta el bit de ejecución: `chmod +x gradlew` |
| El sync falla por el SDK | `local.properties` apunta al SDK de otra máquina. Bórralo y deja que Android Studio lo regenere; **no lo subas al repo** |
| `Unsupported class file major version` | El Gradle JDK no es el 25. Cámbialo en *Settings → Build Tools → Gradle → Gradle JDK* |
| La app arranca en una pantalla que no es M-01 | El emulador restauró la tarea anterior. Ciérrala del todo: `adb shell am force-stop com.example.app` |
| Un cambio en un layout no se ve | *Build → Clean Project* y vuelve a ejecutar; Apply Changes no siempre recarga recursos |
| `SecurityException` al abrir una pantalla con `adb shell am start` | Todas las Activities salvo M-01 son `exported="false"`. Navega tocando la interfaz, no por intent directo |

---

## 5. Recorrido sugerido

Los enlaces que **existen de verdad** en el código, en el orden en que conviene revisarlos:

```
M-01  Receta preparación
 ├── «Modo cocina» ──────────────► M-02  Permiso de audio prioritario
 │                                  ├── «Empezar en Modo Cocina» ──► M-03
 │                                  └── «Ahora no» ────────────────► vuelve atrás (finish)
 └── «Empezar cocción» ──────────► M-13  Alarma

M-03  Temporizadores activos
 ├── tarjeta de Arroz (la card entera) ──► M-13  Alarma
 └── «Finalizar sesión de cocina» ───────► M-08  Resumen de cocción

M-13  Alarma
 └── «Detener alarma» ──────────────────► M-07  Proceso terminado

M-07  Proceso terminado
 └── «Finalizar sesión de cocina» ───────► M-08  Resumen de cocción
```

El recorrido completo más largo es **M-01 → M-02 → M-03 → M-13 → M-07 → M-08**.

Controles **sin destino** a propósito: «Detener», «Pausar» y «Pausar todo» (no hay
temporizadores reales), «Escuchar» en M-02 (no hay audio), «Posponer 2 min» y «Ver cola de
alarmas» en M-13, y «Evaluar» en M-08 (lleva a M-09, fuera de alcance).

Capturas de las tres pantallas construidas en esta fase:
[M-02](docs/screens/M-02.render.png) · [M-03](docs/screens/M-03.render.png) ·
[M-07](docs/screens/M-07.render.png). Las tres del baseline están en
[`docs/screens/_baseline/`](docs/screens/_baseline/).

---

## 6. Estructura del proyecto

```
TempoCocinaMovil/
├── .claude/CLAUDE.md               Reglas de implementación: manda sobre el CLAUDE.md web
├── build.gradle.kts                Build raíz
├── settings.gradle.kts             Módulos y repositorios
├── gradle/libs.versions.toml       Catálogo de versiones
├── docs/
│   └── screens/                    Un reporte por pantalla + capturas renderizadas
│       └── _baseline/              M-01, M-08 y M-13 como se veían antes de esta fase
├── tools/
│   └── compare_screens.py          Comparador de PNG sin dependencias, para el chequeo de regresión
└── app/src/main/
    ├── AndroidManifest.xml         Una <activity> por pantalla; M-01 es LAUNCHER
    ├── java/com/example/app/
    │   ├── m01_recetas.kt …        Una Activity por pantalla (nombres en snake_case, del baseline)
    │   ├── CookingSession.kt        El mock de la sesión: receta, procesos e instantáneas
    │   ├── MainActivity.kt          Template de Compose, sin usar
    │   └── ui/theme/                Scaffold de Compose, sin usar
    └── res/
        ├── layout/activity_*.xml   Una por pantalla
        ├── layout/item_*.xml       Filas reutilizables, insertadas con <include>
        ├── drawable/bg_*.xml       Shapes: cards, chips, tiles, botones, estados
        ├── drawable/ic_*.xml       Iconos como vector drawables
        ├── font/roboto_*.ttf       Black, Bold, Medium, Regular
        └── values/themes.xml       Paleta, dimens y estilos ← el sistema de diseño
            values/colors.xml       Restos del template de Android Studio, sin usar
```

---

## 7. Sistema de diseño

**Todo vive en `app/src/main/res/values/themes.xml`**, no en `colors.xml` — ese último
todavía tiene los colores del template de Android Studio y nadie lo referencia.

**Color.** 27 tokens. El acento es **un solo naranja** (`@color/secondary` `#ED532A`),
reservado para lo que exige acción; la jerarquía tranquila la lleva el teal profundo
(`@color/primary` `#18434B`) y una escala de grises fríos. Nunca escribas un hex literal en
un layout: si falta un valor, se añade primero como token con nombre.

**Tipografía.** Una sola familia, **Roboto**, empaquetada en `res/font/` en cuatro pesos. Se
aplica con estilos, no con `textSize` suelto:

| Estilo | Uso |
|---|---|
| `TextScreenTitle` | Título de la barra superior (`TEMP ACTIVOS`) |
| `TextH2` | Título de pantalla y pregunta principal |
| `TextItemTitle` | Nombre de receta, proceso o tarjeta |
| `TextBodyM` / `TextBodyS` | Texto descriptivo / metadatos y microcopia |
| `TextCaptionUpper` | Etiquetas de sección, estado y chip, en mayúsculas |
| `TextTimer` / `TextTimerSm` | Tiempo restante dentro de una timer card |
| `TextChip`, `TextButtonLabel`, `TextButtonLabelSmall`, `TextActionLabel` | Chips y botones |

Las cifras que cuentan llevan `android:fontFeatureSettings="tnum"` para que no bailen. Las
mayúsculas se aplican con `android:textAllCaps`, **nunca escritas dentro de `android:text`**,
para que un lector de pantalla no las deletree.

**Iconos.** En Android no hay sprite SVG: **cada icono es su propio vector drawable** en
`res/drawable/ic_<nombre>.xml`. Se tiñen desde el `ImageView` con `app:tint`, no desde el
drawable.

> **Los iconos se extraen de los mockups de Figma**, con su forma, grosor de trazo y
> proporción originales. **Prohibido** Material Icons, Font Awesome, cualquier icon font,
> emojis o caracteres Unicode usados como iconos.
>
> ⚠️ Los 12 iconos añadidos en esta fase son **suplentes** dibujados a mano, marcados como
> tales dentro de cada archivo, porque el MCP de Figma estuvo en el límite de llamadas de su
> plan durante todo el trabajo. **Hay que reemplazarlos por el export real.**

**Componentes.** Las piezas repetidas son shapes (`bg_*.xml`) más un layout reutilizable
(`item_*.xml`) cuando se repite el bloque entero:

| Componente | Archivos | Variantes |
|---|---|---|
| Card | `bg_card.xml`, `bg_card_bordered.xml`, `bg_card_alert.xml` | normal · con borde · en alerta (con pressed y foco) |
| Chip | `bg_chip_critical.xml`, `bg_chip_neutral.xml`, `bg_chip_success.xml`, `bg_chip_critical_soft.xml`, `bg_chip_disabled.xml` | crítico · neutro · éxito · crítico suave · deshabilitado |
| Counter chip | `bg_contador_procesos.xml` | una |
| Botones | `bg_btn_primary.xml`, `bg_btn_small.xml`, `bg_btn_text.xml`, `bg_btn_filled_pair.xml`, `bg_btn_outline_pair.xml`, `bg_btn_outline_block.xml`, `bg_btn_small_disabled.xml` | primario pill · pequeño · de texto · par relleno / contorno · bloque a ancho completo · deshabilitado |
| Icon tile | `bg_tile_64.xml`, `bg_tile_44.xml`, `bg_tile_44_secondary.xml` | 64 y 44, neutro y naranja |
| Status banner | `bg_status_banner.xml` | una |
| Timer display | `bg_timer_display.xml` | una |
| Puntos de estado | `bg_dot_secondary.xml`, `bg_dot_disabled.xml`, `bg_dot_white.xml` | activo · completado · dentro de chip crítico |
| Fila de permiso | `item_permiso_audio.xml` | M-02, incluida 3 veces |
| Timer card secundaria | `item_timer_card_compact.xml` (M-03), `item_timer_card_finished.xml` (M-07) | barra corta en columna · barra a ancho completo con punto de estado |

**Estados.** Todo control define Default · Pressed · Focused · Disabled. El foco es un halo
de 3dp en `@color/focus_color` (`#FDDCCF`). El estado deshabilitado **conserva la forma** y
solo baja la tinta. El objetivo táctil mínimo de los controles nuevos es **48dp**.

---

## 8. Diferencias con el mockup y hallazgos de accesibilidad

Resumen consolidado. El detalle está en cada reporte:
[M-02](docs/screens/M-02.md) · [M-03](docs/screens/M-03.md) · [M-07](docs/screens/M-07.md) ·
[baseline](docs/screens/_baseline.md).

### Pendientes que afectan la fidelidad

- **Sin geometría de Figma.** El MCP estuvo bloqueado en el límite de llamadas de su plan
  durante toda la fase. Márgenes, radios, tintes derivados y los porcentajes de las barras
  (Arroz 78 %, Horno 45 %, Salsa 60 %) son **lectura del mockup, no valores medidos**.
  *(H1, I2, I3, J3, K6)*
- **Los 12 iconos nuevos son suplentes.** Se nota sobre todo en `ic_pot`, que parece una
  cesta. *(H5, K7)*
- **El ritmo vertical se apretó** en M-02, M-03 y M-07 respecto al mockup: sin eso el último
  control quedaba fuera de los 844dp. *(K5)*
- **CLAUDE.md tenía M-07 y M-08 intercambiados.** El prototipo de Figma demostró que
  `m07_proceso_terminado` es «Proceso terminado» y `m08_resumen` es «Resumen de cocción»,
  como decían los nombres del baseline. Corregido, y M-07 se reconstruyó entero. *(K2)*
- **Incoherencias que se transcribieron tal cual, sin normalizar:** M-01 escribe `RECETA
  PREPARACIÓN` con tilde y el mockup de M-02 la quita *(H2)*; el chip «Reducción» es gris en
  M-03 y naranja suave en M-07 para el mismo proceso *(K3)*; «Tiempo total: 48 min» no es la
  suma de 17 + 35 + 20 porque los procesos se solapan *(J4)*.

### Deuda del código base (no tocar sin acordarlo)

La paleta vive en `themes.xml` y `colors.xml` está muerto; las mayúsculas están escritas
dentro del copy en las pantallas antiguas; los textos están en los layouts y no en
`strings.xml`; siete iconos del baseline son PNG y no se pueden teñir; la barra superior está
copiada en cada layout en vez de ser un `<include>`; y hay hex fuera del sistema (`#94A3B8`
aparece 19 veces). El inventario completo está en `.claude/CLAUDE.md` §14.

### Accesibilidad — se implementa como está diseñado y se reporta

Estos hallazgos son **del diseño**, no errores de implementación. Se construyeron tal cual y
quedan documentados para que el equipo de UX decida:

- **Contraste del naranja.** `#ED532A` sobre fondo claro ≈ 3.4–3.6:1: cumple AA solo para
  texto grande. Se queda corto en los kickers, «Ahora no», «Finalizar sesión de cocina»,
  «Faltan ~20 min» y los chips suaves de desviación. *(A1, A2, B2, C1, C2, D2)*
- **Texto blanco sobre naranja** en el chip «Alerta activa» ≈ 3.6:1: también se queda corto.
  *(B1, D1)*
- **Las barras de progreso no muestran porcentaje visible.** El mockup no lo tiene y el valor
  vive en el `contentDescription` de cada barra. *(B3, C3, D3)*
- **Botones que anuncian una acción sin ejecutarla**: «Escuchar» en M-02 y «Evaluar» en M-08
  confunden con lector de pantalla. Es lo que pide esta fase. *(A4, C5)*

Y lo que **sí** se cumple: ningún estado se comunica solo por color —cada chip lleva
etiqueta—, los iconos decorativos están marcados como no importantes, los títulos y
encabezados llevan `accessibilityHeading`, y el «Pausar» de un proceso completado queda
`enabled=false` y fuera del foco para no anunciar una acción imposible. *(B4, D4, D5, D6)*

---

## 9. Documentación y fuentes

| Fuente | Dónde |
|---|---|
| **Mockups de Figma (móvil)** | https://www.figma.com/design/3ckGVFDTfe53VKggdmjxmK/Mobil---Mockups |
| **Reglas de implementación** | [`.claude/CLAUDE.md`](.claude/CLAUDE.md) — lenguaje, fuentes de verdad, protocolo por pantalla, sistema de diseño, accesibilidad y verificación |
| **Reportes por pantalla** | [`docs/screens/`](docs/screens/) — uno por pantalla, en español |
| **Auditoría del código base** | [`docs/screens/_baseline.md`](docs/screens/_baseline.md) |
| **Capturas renderizadas** | `docs/screens/M-0X.render.png` y `docs/screens/_baseline/M-0X.before.png` |

> **Faltan en el repositorio** dos fuentes que `.claude/CLAUDE.md` da por hechas:
> `docs/design/TempoCocina-SystemDesign-Mockups-Movil-final.pdf` (el System Design de 26
> páginas) y `docs/mockups/M-XX.png` (los mockups exportados a 4×). Mientras no estén, la
> única fuente de verdad visual es Figma y las capturas que el equipo comparte por chat.

---

## 10. Tareas de Gradle

No hay `package.json` ni scripts de npm. Las tareas útiles del wrapper:

| Tarea | Qué hace |
|---|---|
| `./gradlew assembleDebug` | Compila el APK de debug |
| `./gradlew installDebug` | Compila e instala en el emulador o dispositivo conectado |
| `./gradlew lint` | Análisis estático; informe en `app/build/reports/` |
| `./gradlew test` | Tests unitarios (hoy solo el `ExampleUnitTest` del template) |
| `./gradlew connectedAndroidTest` | Tests instrumentados; requiere un dispositivo conectado |
| `./gradlew clean` | Borra `build/` |
| `./gradlew tasks` | Lista todas las tareas disponibles |

### Chequeo de regresión

Cambiar un recurso compartido (`themes.xml`, un `bg_*.xml`, un `item_*.xml`) puede alterar
sin querer M-01, M-08 o M-13. Para comprobarlo, vuelve a capturar esas tres pantallas con la
misma configuración de emulador y compáralas con las de referencia:

```bash
python3 tools/compare_screens.py docs/screens/_baseline/M-01.before.png captura.png --scale 4
```

El script no necesita dependencias e **ignora la barra de estado y la de gestos**, que es lo
que hace inútil comparar los archivos por checksum: el reloj del sistema cambia en cada
captura. Cualquier diferencia que reporte es un bug, no una nota para el reporte.
