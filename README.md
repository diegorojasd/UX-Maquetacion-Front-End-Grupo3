# TEMPO COCINA

Maquetación de las interfaces de **TEMPO COCINA**, un sistema de logística culinaria y
alarmas compuesto por una app web y una app móvil. **La web planifica** la receta y sus
alarmas; **la móvil las ejecuta** en la cocina: toma prioridad sobre el audio del teléfono,
corre los temporizadores en paralelo y cierra la sesión con un resumen.

Ambos proyectos son **solo maquetación visual**: reproducen los mockups de alta fidelidad de
Figma, sin lógica de negocio, sin backend y con datos de prueba.

Proyecto del curso de UX, Maestría en Ingeniería de Software (MISO), Universidad de los
Andes — **David Rojas · Diego Rojas**.

---

## Los dos proyectos

Son independientes: distinto lenguaje, distintas herramientas y distinto sistema de diseño.
**Cada uno tiene su propio README, y es ahí donde está la documentación completa.**

| | **App web** | **App móvil** |
|---|---|---|
| Qué hace | Planifica la receta y sus alarmas | Las ejecuta en la cocina |
| Stack | Angular 21 · TypeScript · SCSS | Android nativo · Kotlin · layouts XML |
| Se abre con | Un navegador, en `localhost:4200` | Android Studio, en un emulador |
| Pantallas | 8 | 6 |
| **README** | **[`TempoCocinaWeb/tempococina/README.md`](TempoCocinaWeb/tempococina/README.md)** | **[`TempoCocinaMovil/README.md`](TempoCocinaMovil/README.md)** |

> ⚠️ El proyecto Angular está **dentro de `TempoCocinaWeb/tempococina/`**, un nivel más abajo
> de lo que sugiere el nombre de la carpeta. Ahí es donde viven el `package.json` y los
> comandos de npm. El móvil no tiene ese nivel de más.

---

## Arrancar

**Web** — necesita Node 20.19+:

```bash
cd TempoCocinaWeb/tempococina
npm ci
npm start          # abre http://localhost:4200/
```

**Móvil** — necesita Android Studio con el SDK Platform 37:

```bash
cd TempoCocinaMovil
./gradlew assembleDebug
```

O, lo habitual: abrir la carpeta **`TempoCocinaMovil/`** desde *File → Open* en Android
Studio y pulsar Run. Los pasos completos, con la creación del emulador y los problemas
frecuentes, están en su README.

---

## Estructura

```
UX-Maquetacion-Front-End-Grupo3/
├── README.md                      ← este archivo
├── TempoCocinaWeb/
│   ├── README.md                  índice de la carpeta
│   └── tempococina/               el proyecto Angular
│       ├── README.md              ← documentación de la web
│       ├── docs/screens/          un reporte por pantalla
│       └── src/
└── TempoCocinaMovil/              el proyecto Android
    ├── README.md                  ← documentación del móvil
    ├── tools/                     comparador de capturas para el chequeo visual
    └── app/src/main/
```

## Ramas

| Rama | Para qué |
|---|---|
| `main` | Integración de ambos proyectos |
| `movil` | Trabajo sobre la app móvil |
| `web` | Trabajo sobre la app web |
