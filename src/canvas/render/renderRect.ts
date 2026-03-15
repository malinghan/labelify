import type { RectElement, LineElement } from '../../types'

export function renderRect(ctx: CanvasRenderingContext2D, el: RectElement) {
  ctx.save()
  if (el.fillColor) {
    ctx.fillStyle = el.fillColor
    ctx.fillRect(el.x, el.y, el.width, el.height)
  }
  if (el.strokeColor && el.strokeWidth > 0) {
    ctx.strokeStyle = el.strokeColor
    ctx.lineWidth = el.strokeWidth
    ctx.strokeRect(el.x, el.y, el.width, el.height)
  }
  ctx.restore()
}

export function renderLine(ctx: CanvasRenderingContext2D, el: LineElement) {
  ctx.save()
  ctx.strokeStyle = el.strokeColor
  ctx.lineWidth = el.strokeWidth
  ctx.beginPath()
  ctx.moveTo(el.x, el.y)
  ctx.lineTo(el.x + el.width, el.y + el.height)
  ctx.stroke()
  ctx.restore()
}
