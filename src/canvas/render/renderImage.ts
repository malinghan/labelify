import type { ImageElement } from '../../types'

const imageCache = new Map<string, HTMLImageElement>()

export function renderImage(ctx: CanvasRenderingContext2D, el: ImageElement) {
  ctx.save()
  ctx.beginPath()
  ctx.rect(el.x, el.y, el.width, el.height)
  ctx.clip()

  if (!el.src) {
    // Placeholder
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(el.x, el.y, el.width, el.height)
    ctx.strokeStyle = '#cccccc'
    ctx.lineWidth = 1
    ctx.strokeRect(el.x, el.y, el.width, el.height)
    ctx.fillStyle = '#999999'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Image', el.x + el.width / 2, el.y + el.height / 2)
    ctx.restore()
    return
  }

  let img = imageCache.get(el.src)
  if (!img) {
    img = new Image()
    img.src = el.src
    imageCache.set(el.src, img)
    // Will render on next frame once loaded
    ctx.restore()
    return
  }

  if (!img.complete) {
    ctx.restore()
    return
  }

  const { x, y, width, height } = el
  const iw = img.naturalWidth
  const ih = img.naturalHeight

  let sx = 0, sy = 0, sw = iw, sh = ih
  let dx = x, dy = y, dw = width, dh = height

  if (el.objectFit === 'contain') {
    const scale = Math.min(width / iw, height / ih)
    dw = iw * scale
    dh = ih * scale
    dx = x + (width - dw) / 2
    dy = y + (height - dh) / 2
  } else if (el.objectFit === 'cover') {
    const scale = Math.max(width / iw, height / ih)
    sw = width / scale
    sh = height / scale
    sx = (iw - sw) / 2
    sy = (ih - sh) / 2
  }

  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.restore()
}
