import type { BarcodeElement } from '../../types'

/**
 * Renders a barcode element as a placeholder.
 * Real barcode rendering requires a library like JsBarcode or qrcode.js.
 * For MVP we draw a visual placeholder with the data text.
 */
export function renderBarcode(ctx: CanvasRenderingContext2D, el: BarcodeElement) {
  ctx.save()

  // Background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(el.x, el.y, el.width, el.height)

  // Border
  ctx.strokeStyle = '#cccccc'
  ctx.lineWidth = 1
  ctx.strokeRect(el.x, el.y, el.width, el.height)

  if (el.barcodeType === 'qrcode') {
    // QR placeholder: grid pattern
    const cellSize = Math.min(el.width, el.height) / 7
    ctx.fillStyle = '#000000'
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 7; col++) {
        // Draw finder pattern corners
        const isCorner =
          (row < 3 && col < 3) ||
          (row < 3 && col >= 4) ||
          (row >= 4 && col < 3)
        if (isCorner || (row === 3 && col === 3)) {
          ctx.fillRect(
            el.x + col * cellSize + (el.width - cellSize * 7) / 2,
            el.y + row * cellSize + (el.height - cellSize * 7) / 2,
            cellSize - 1,
            cellSize - 1,
          )
        }
      }
    }
  } else {
    // Code128 placeholder: vertical bars
    const barCount = 20
    const barWidth = el.width / (barCount * 2)
    ctx.fillStyle = '#000000'
    for (let i = 0; i < barCount; i++) {
      const barH = el.height * (el.showText ? 0.75 : 0.9)
      ctx.fillRect(
        el.x + i * barWidth * 2,
        el.y + el.height * 0.05,
        barWidth,
        barH,
      )
    }
  }

  // Data text
  if (el.showText && el.data) {
    ctx.fillStyle = '#000000'
    ctx.font = `${Math.max(8, el.height * 0.12)}px monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText(el.data, el.x + el.width / 2, el.y + el.height - 2, el.width - 4)
  }

  ctx.restore()
}
