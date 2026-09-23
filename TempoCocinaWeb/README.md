# TEMPO COCINA · App web

> ## 📄 El README completo está en [`tempococina/README.md`](tempococina/README.md)
>
> Esta carpeta es solo el contenedor. **El proyecto Angular vive un nivel más abajo**, en
> [`tempococina/`](tempococina/), y ahí está la documentación de verdad: las ocho pantallas
> con sus rutas, los requisitos, el paso a paso para levantar la app, el mapa de navegación,
> el sistema de diseño y los hallazgos frente al mockup.

Módulo de planificación de TEMPO COCINA, el sistema de logística culinaria y alarmas del
curso de UX (MISO, Universidad de los Andes — David Rojas · Diego Rojas). La web planifica
la receta y sus alarmas; la app móvil las ejecuta en la cocina.

---

## Arrancar en un minuto

Todos los comandos se ejecutan **dentro de `tempococina/`**, que es donde está el
`package.json`. Desde la raíz del repositorio:

```bash
cd TempoCocinaWeb/tempococina
npm ci
npm start
```

Abre <http://localhost:4200/> y aterrizas en la primera pantalla. El índice de las ocho está
en <http://localhost:4200/mockups>.

Si ejecutas `npm` desde esta carpeta y no desde `tempococina/`, npm no encuentra el
`package.json` y falla.

---

## Por qué hay dos carpetas

`tempococina/` es el nombre que la CLI de Angular le dio al proyecto al generarlo dentro de
`TempoCocinaWeb/`, así que quedó ese nivel de más. La app móvil no lo tiene: su proyecto
está directamente en `TempoCocinaMovil/`.

```
UX-Maquetacion-Front-End-Grupo3/
├── TempoCocinaMovil/          ← app Android (Gradle + Kotlin)
│   └── README.md
└── TempoCocinaWeb/            ← estás aquí
    ├── README.md              ← este archivo, solo un índice
    └── tempococina/           ← el proyecto Angular
        ├── package.json
        ├── src/
        └── README.md          ← la documentación real
```

## También en este repositorio

- **[App móvil](../TempoCocinaMovil/README.md)** — el módulo que ejecuta las alarmas en la
  cocina, como app Android nativa.
