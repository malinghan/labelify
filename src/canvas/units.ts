const DPI = 96

export function mmToPx(mm: number, dpi = DPI): number {
  return (mm * dpi) / 25.4
}

export function pxToMm(px: number, dpi = DPI): number {
  return (px * 25.4) / dpi
}
