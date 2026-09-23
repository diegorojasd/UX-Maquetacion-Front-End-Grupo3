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
| JDK | 17 o superior (probado con el JBR 21 de Android Studio y con Temurin 25.0.3) |
| `compileSdk` | 37 |
| `minSdk` | 24 (Android 7.0) |
| `targetSdk` | 36 |
| AndroidX | AppCompat 1.6.1 · ConstraintLayout 2.1.4 · Material 1.10.0 |

Necesitas:

- **Android Studio** (probado con **2025.3**) con el Android SDK y un emulador, o un
  teléfono Android con depuración USB.
- **El SDK Platform 37**, porque el proyecto compila contra `compileSdk 37`. Se instala desde
  el SDK Manager (paso 1 de la sección 4).
- **Un JDK 17 o superior.** No hace falta instalarlo: **el que trae Android Studio sirve**
  (JBR 21, verificado). Desde la terminal se usa el JDK del sistema.
- **No** necesitas Node, npm, Ionic, Capacitor ni instalar Gradle: el wrapper (`./gradlew`)
  descarga Gradle 9.3.1 solo.

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

El APK queda en `app/build/outputs/apk/debug/tempococina.apk` y el informe de lint en
`app/build/reports/lint-results-debug.html`.

---

## 4. Probar en Android Studio

Paso a paso completo, desde un clon recién hecho. Las rutas de menú son las de **Android
Studio 2025.3**; en otras versiones las etiquetas cambian un poco pero el flujo es el mismo.

### 4.1 Preparar el SDK (solo la primera vez)

1. Abre Android Studio y ve a **Settings → Languages & Frameworks → Android SDK**
   (en macOS *Android Studio → Settings*; también llegas desde *More Actions → SDK Manager*
   en la pantalla de bienvenida).
2. En la pestaña **SDK Platforms**, marca **Android API 37**. Es obligatorio: el proyecto
   declara `compileSdk 37` y sin esa plataforma el sync falla.
3. En la pestaña **SDK Tools**, confirma que están marcados **Android SDK Build-Tools**,
   **Android SDK Platform-Tools** y **Android Emulator**.
4. **Apply** y espera la descarga.

> No necesitas crear `local.properties`: está en `.gitignore` y Android Studio lo genera con
> la ruta de tu SDK la primera vez que abres el proyecto.

### 4.2 Abrir el proyecto

1. En la pantalla de bienvenida pulsa **Open** (o *File → Open* si ya tienes otro proyecto
   abierto).
2. Selecciona la carpeta **`TempoCocinaMovil/`**, **no la raíz del repositorio**. La raíz
   contiene también `TempoCocinaWeb/`, que es un proyecto Angular: si abres la raíz, Android
   Studio no encuentra `settings.gradle.kts` y no reconoce el proyecto.
3. Si pregunta si confías en el proyecto, acepta (**Trust Project**).
4. Empieza el **Gradle Sync** automáticamente. La primera vez descarga Gradle 9.3.1 y las
   dependencias de AndroidX: tarda varios minutos y la barra de estado dice
   *«Gradle: Downloading…»*.
5. **Si te ofrece actualizar AGP, Gradle o Kotlin, di que no.** Las versiones están fijadas en
   `gradle/libs.versions.toml` y actualizarlas rompe el build.
6. **Sabes que salió bien** cuando el panel *Build* muestra `BUILD SUCCESSFUL` y en el
   desplegable de configuraciones de la barra superior aparece el módulo **`app`**.

> No deberías tener que tocar el Gradle JDK: el que Android Studio trae de fábrica (JBR 21)
> compila este proyecto sin cambios. Si lo cambiaste alguna vez, está en
> *Settings → Build, Execution, Deployment → Build Tools → Gradle → Gradle JDK* y debe ser
> **17 o superior**.

### 4.3 Crear el emulador

1. Abre el **Device Manager** (icono del teléfono en la barra lateral derecha, o
   *View → Tool Windows → Device Manager*).
2. Pulsa **+ → Create Virtual Device**.
3. Elige un **Pixel**. Para revisar la app sirve cualquiera; los que más se acercan al lienzo
   de los mockups (390 dp de ancho) son el **Pixel 4** y el **Pixel 5**, de 393 dp.
4. Elige una **imagen de sistema de API 24 o superior** — el `minSdk` del proyecto es 24.
   Si no tienes ninguna descargada, pulsa el icono de descarga junto al nombre.
5. Dale un nombre y pulsa **Finish**. El emulador aparece en la lista del Device Manager.

Desde la terminal puedes comprobar qué emuladores existen:

```bash
~/Library/Android/sdk/emulator/emulator -list-avds
```

### 4.4 Ejecutar la app

1. En la barra superior, elige el módulo **`app`** en el desplegable de la izquierda y tu
   emulador en el de la derecha.
2. Pulsa **Run ▶** (`⌃R` en macOS, `Shift+F10` en Windows y Linux).
3. Android Studio arranca el emulador, compila, instala el APK y lanza la app.
4. **Sabes que funcionó** cuando el emulador muestra **M-01 «Receta preparación»**: el kicker
   naranja arriba, el logo de Tempo Cocina a la derecha, la tarjeta de la receta *Pollo al
   horno con arroz* y los botones «Modo cocina» y «Empezar cocción» abajo. M-01 es la única
   Activity marcada como `LAUNCHER`, así que siempre es la pantalla de entrada.
5. Desde ahí navega con el recorrido de la sección 5.

**Alternativa por terminal**, con el emulador ya abierto:

```bash
./gradlew installDebug
adb shell am start -n com.example.app/.m01_recetas
```

### 4.5 Ejecutar en un teléfono físico

1. En el teléfono, *Ajustes → Información del teléfono* y toca **Número de compilación**
   siete veces para activar las opciones de desarrollador.
2. *Ajustes → Opciones de desarrollador* y activa **Depuración por USB**.
3. Conéctalo por USB y acepta el diálogo de autorización que aparece en el teléfono.
4. Comprueba que el equipo lo ve:

   ```bash
   adb devices
   ```

5. Elígelo en el desplegable de dispositivos de Android Studio y pulsa **Run ▶**.

El `minSdk` es 24, así que sirve cualquier teléfono con **Android 7.0 o superior**. No hace
falta red ni Wi-Fi compartida: la app no habla con ningún servidor.

### 4.6 Reproducir el lienzo exacto de los mockups

Los mockups están dibujados sobre **390 × 844 dp** y exportados a 4×. Ningún perfil de Pixel
coincide exactamente, así que para comparar píxel a píxel se fuerza esa resolución con `adb`
(en macOS el binario está en `~/Library/Android/sdk/platform-tools/`):

```bash
adb devices                                       # ver el id del emulador
adb -s emulator-5554 shell wm size 1560x3376      # 1560 / 4 = 390 dp
adb -s emulator-5554 shell wm density 640         # 640 dpi = 4x
```

Cambia `emulator-5554` por lo que liste `adb devices`. Para capturar la pantalla tal como
están los PNG de `docs/screens/`:

```bash
adb -s emulator-5554 exec-out screencap -p > captura.png
```

Y para devolver el emulador a su configuración original:

```bash
adb -s emulator-5554 shell wm size reset
adb -s emulator-5554 shell wm density reset
```

> El override sobrevive a los reinicios del emulador. Si un día lo ves todo enorme o
> diminuto, es que quedó fijado: ejecuta los dos `reset`.

### 4.7 Problemas comunes

| Síntoma | Causa y solución |
|---|---|
| Android Studio no reconoce el proyecto al abrirlo | Abriste la raíz del repositorio. Ábrelo desde **`TempoCocinaMovil/`**, que es donde está `settings.gradle.kts` |
| El sync falla con `Failed to find target with hash string 'android-37'` | Falta el SDK Platform 37. Instálalo en el SDK Manager (sección 4.1) |
| El sync falla con `SDK location not found` | `local.properties` apunta al SDK de otra máquina. Bórralo y reabre el proyecto; **nunca lo subas al repo** |
| `Unsupported class file major version` | El Gradle JDK es anterior al 17. Cámbialo en *Settings → Build Tools → Gradle → Gradle JDK* |
| `zsh: permission denied: ./gradlew` | Falta el bit de ejecución: `chmod +x gradlew` |
| El botón Run está gris | El sync no terminó o falló. Mira el panel *Build* y relanza con *File → Sync Project with Gradle Files* |
| La app arranca en una pantalla que no es M-01 | El emulador restauró la tarea anterior. Ciérrala del todo con `adb shell am force-stop com.example.app` y vuelve a lanzarla |
| Un cambio en un layout no se ve | *Build → Clean Project* y ejecuta de nuevo; *Apply Changes* no siempre recarga recursos |
| `SecurityException` al abrir una pantalla con `adb shell am start` | Salvo M-01, todas las Activities son `exported="false"`. Navega tocando la interfaz |
| La pantalla se ve enorme o diminuta | Quedó un override de `wm size`/`wm density`. Ejecuta los dos `reset` de la sección 4.6 |

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
├── build.gradle.kts                Build raíz
├── settings.gradle.kts             Módulos y repositorios
├── gradle/libs.versions.toml       Catálogo de versiones
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

## 8. Tareas de Gradle

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
