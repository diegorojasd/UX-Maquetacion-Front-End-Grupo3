#!/usr/bin/env python3
"""Compare two screenshots, ignoring the system bars.

CLAUDE.md section 11 asks for a regression check on M-01, M-08 and M-13
whenever a shared resource changes. A plain checksum is useless for that: the
status-bar clock ticks between captures, so every comparison "fails".

This strips the status bar at the top and the gesture bar at the bottom, then
counts differing pixels. Pure stdlib — the machine has no ImageMagick and no
Pillow, and CLAUDE.md forbids adding dependencies without asking.

    python3 tools/compare_screens.py before.png after.png [--scale 4]
"""

from __future__ import annotations

import struct
import sys
import zlib

# Height of the system bars in dp; multiplied by the capture's scale factor.
STATUS_BAR_DP = 32
GESTURE_BAR_DP = 28


def read_png(path: str) -> tuple[int, int, bytes]:
    """Return (width, height, RGBA rows) for an 8-bit non-interlaced PNG."""
    data = open(path, "rb").read()
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError(f"{path}: not a PNG")

    pos, idat, width, height, channels = 8, bytearray(), 0, 0, 4
    while pos < len(data):
        (length,) = struct.unpack(">I", data[pos : pos + 4])
        kind = data[pos + 4 : pos + 8]
        body = data[pos + 8 : pos + 8 + length]
        if kind == b"IHDR":
            width, height, depth, color = struct.unpack(">IIBB", body[:10])
            if depth != 8:
                raise ValueError(f"{path}: only 8-bit is supported")
            channels = {0: 1, 2: 3, 4: 2, 6: 4}[color]
        elif kind == b"IDAT":
            idat += body
        elif kind == b"IEND":
            break
        pos += 12 + length

    raw = zlib.decompress(bytes(idat))
    stride = width * channels
    out = bytearray(height * stride)
    prev = bytearray(stride)
    src = 0
    for y in range(height):
        f = raw[src]
        src += 1
        line = bytearray(raw[src : src + stride])
        src += stride
        if f == 1:  # Sub
            for i in range(channels, stride):
                line[i] = (line[i] + line[i - channels]) & 0xFF
        elif f == 2:  # Up
            for i in range(stride):
                line[i] = (line[i] + prev[i]) & 0xFF
        elif f == 3:  # Average
            for i in range(stride):
                left = line[i - channels] if i >= channels else 0
                line[i] = (line[i] + ((left + prev[i]) >> 1)) & 0xFF
        elif f == 4:  # Paeth
            for i in range(stride):
                a = line[i - channels] if i >= channels else 0
                b = prev[i]
                c = prev[i - channels] if i >= channels else 0
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                pred = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[i] = (line[i] + pred) & 0xFF
        elif f != 0:
            raise ValueError(f"{path}: unknown filter {f}")
        out[y * stride : (y + 1) * stride] = line
        prev = line
    return width, height, bytes(out), channels


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 2
    scale = 4
    if "--scale" in sys.argv:
        scale = int(sys.argv[sys.argv.index("--scale") + 1])

    before, after = sys.argv[1], sys.argv[2]
    w1, h1, p1, c1 = read_png(before)
    w2, h2, p2, c2 = read_png(after)

    if (w1, h1, c1) != (w2, h2, c2):
        print(f"DIFERENTE — tamaños distintos: {w1}x{h1} vs {w2}x{h2}")
        return 1

    top = STATUS_BAR_DP * scale
    bottom = h1 - GESTURE_BAR_DP * scale
    stride = w1 * c1

    diff = 0
    first_row = None
    for y in range(top, bottom):
        a = p1[y * stride : (y + 1) * stride]
        b = p2[y * stride : (y + 1) * stride]
        if a != b:
            row = sum(1 for i in range(0, stride, c1) if a[i : i + c1] != b[i : i + c1])
            diff += row
            if first_row is None:
                first_row = y
    total = (bottom - top) * w1
    pct = 100.0 * diff / total if total else 0.0

    label = f"{before.split('/')[-1]} vs {after.split('/')[-1]}"
    if diff == 0:
        print(f"IDENTICA  {label}  (ignorando barras del sistema)")
        return 0
    print(f"DIFERENTE {label}  {diff} px ({pct:.3f}%), primera fila y={first_row}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
