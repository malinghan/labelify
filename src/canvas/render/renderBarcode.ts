import type { BarcodeElement } from '../../types'
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode'

// Cache rendered barcodes to avoid re-rendering every frame
const barcodeCache = new Map<string, HTMLCanvasElement>()

function cacheKey(el: BarcodeElement): string {
  return `${el.barcodeType}:${el.data}:${el.showText}:${Math.round(el.width)}:${Math.round(el.height)}`
}

function renderLinearBarcode(el: BarcodeElement): HTMLCanvasElement | null {
  const offscreen = document.createElement('canvas')
  offscreen.width = Math.round(el.width)
  offscreen.height = Math.round(el.height)

  const formatMap: Record<string, string> = {
    code128: 'CODE128',
    code39: 'CODE39',
    ean13: 'EAN13',
    ean8: 'EAN8',
    upca: 'UPC',
  }
  const format = formatMap[el.barcodeType] ?? 'CODE128'

  try {
    JsBarcode(offscreen, el.data, {
      format,
      displayValue: el.showText,
      margin: 4,
      width: 1.5,
      height: Math.round(el.height * (el.showText ? 0.72 : 0.88)),
      fontSize: Math.max(8, Math.round(el.height * 0.14)),
      background: '#ffffff',
      lineColor: '#000000',
    })
    return offscreen
  } catch {
    return null
  }
}

// QR rendering is async; we store a promise and re-use the result
const qrPromiseCache = new Map<string, Promise<HTMLCanvasElement | null>>()

function renderQrAsync(el: BarcodeElement): Promise<HTMLCanvasElement | null> {
  const key = cacheKey(el)
  if (qrPromiseCache.has(key)) return qrPromiseCache.get(key)!

  const size = Math.min(Math.round(el.width), Math.round(el.height))
  const offscreen = document.createElement('canvas')
  offscreen.width = size
  offscreen.height = size

  const p = QRCode.toCanvas(offscreen, el.data || ' ', {
    width: size,
    margin: 2,
    color: { dark: '#000000', light: '#ffffff' },
  })
    .then(() => {
      barcodeCache.set(key, offscreen)
      return offscreen as HTMLCanvasElement
    })
    .catch(() => null)

  qrPromiseCache.set(key, p)
  return p
}

export function renderBarcode(ctx: CanvasRenderingContext2D, el: BarcodeElement) {
  ctx.save()

  // White background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(el.x, el.y, el.width, el.height)

  const key = cacheKey(el)

  if (el.barcodeType === 'qrcode') {
    const cached = barcodeCache.get(key)
    if (cached) {
      const size = Math.min(el.width, el.height)
      const ox = el.x + (el.width - size) / 2
      const oy = el.y + (el.height - size) / 2
      ctx.drawImage(cached, ox, oy, size, size)
    } else {
      // Trigger async render; draw placeholder until ready
      renderQrAsync(el)
      drawQrPlaceholder(ctx, el)
    }
  } else {
    if (!barcodeCache.has(key)) {
      const offscreen = renderLinearBarcode(el)
      if (offscreen) {
        barcodeCache.set(key, offscreen)
      } else {
        drawLinearPlaceholder(ctx, el)
        ctx.restore()
        return
      }
    }
    const cached = barcodeCache.get(key)!
    ctx.drawImage(cached, el.x, el.y, el.width, el.height)
  }

  ctx.restore()
}

function drawQrPlaceholder(ctx: CanvasRenderingContext2D, el: BarcodeElement) {
  ctx.strokeStyle = '#cccccc'
  ctx.lineWidth = 1
  ctx.strokeRect(el.x, el.y, el.width, el.height)
  ctx.fillStyle = '#999'
  ctx.font = '10px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('QR', el.x + el.width / 2, el.y + el.height / 2)
}

function drawLinearPlaceholder(ctx: CanvasRenderingContext2D, el: BarcodeElement) {
  ctx.strokeStyle = '#cccccc'
  ctx.lineWidth = 1
  ctx.strokeRect(el.x, el.y, el.width, el.height)
  ctx.fillStyle = '#999'
  ctx.font = '10px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(el.data || '---', el.x + el.width / 2, el.y + el.height / 2)
}

/** Call this when barcode element data changes to invalidate cache */
export function invalidateBarcodeCache(el: BarcodeElement) {
  const key = cacheKey(el)
  barcodeCache.delete(key)
  qrPromiseCache.delete(key)
}
