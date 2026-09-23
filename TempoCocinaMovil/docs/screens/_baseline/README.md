# Capturas del baseline

Estado de M-01, M-08 y M-13 tal como renderizan hoy. Son la referencia del
chequeo de regresión de CLAUDE.md §11: si un cambio toca `themes.xml`, un
drawable compartido o un bloque de layout compartido, hay que volver a
capturarlas y confirmar que no cambian.

## Cómo se generan

Emulador a 390 × 844 dp con densidad 4× (1560 × 3376 px), que es exactamente
el lienzo de referencia de §7.

```sh
adb -s emulator-5556 shell wm size 1560x3376
adb -s emulator-5556 shell wm density 640
./gradlew assembleDebug
adb -s emulator-5556 install -r -t app/build/outputs/apk/debug/app-debug.apk
adb -s emulator-5556 shell am start -n com.example.app/.m01_recetas
adb -s emulator-5556 exec-out screencap -p > M-01.before.png
```

Para restaurar el emulador a su tamaño real: `adb shell wm size reset` y
`adb shell wm density reset`.

## Aviso: solo M-01 se puede lanzar directamente

Las demás Activities están como `android:exported="false"`, así que
`am start` falla con `SecurityException` y `adb root` no funciona en esta
imagen de emulador. Se llega a ellas navegando por la UI:

**M-01 → «Empezar cocción» → M-13 → «Detener alarma» → M-08**

Las coordenadas del tap se sacan del árbol de vistas, no a ojo:

```sh
adb shell uiautomator dump /sdcard/ui.xml
adb shell cat /sdcard/ui.xml   # buscar bounds del id, p. ej. btnEmpezar
adb shell input tap <cx> <cy>
```
