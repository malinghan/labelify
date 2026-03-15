import type { TextElement } from '../../types'

export function renderText(ctx: CanvasRenderingContext2D, el: TextElement, resolvedContent: string) {
  ctx.save()
  ctx.font = `${el.fontStyle} ${el.fontWeight} ${el.fontSize}px ${el.fontFamily}`
  ctx.fillStyle = el.color
  ctx.textAlign = el.align
  ctx.textBaseline = 'top'

  const x = el.align === 'left' ? el.x : el.align === 'center' ? el.x + el.width / 2 : el.x + el.width
  const lineHeight = el.fontSize * 1.2
  const lines = resolvedContent.split('\n')

  // Clip to element bounds
  ctx.beginPath()
  ctx.rect(el.x, el.y, el.width, el.height)
  ctx.clip()

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, el.y + i * lineHeight)
  }

  ctx.restore()
}
