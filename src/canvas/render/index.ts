import type { LabelElement, Viewport, LabelSize, DataBinding } from '../../types'
import { worldToScreen } from '../transform'
import { mmToPx } from '../units'
import { renderText } from './renderText'
import { renderBarcode } from './renderBarcode'
import { renderImage } from './renderImage'
import { renderRect, renderLine } from './renderRect'
import { renderHandles } from './renderHandles'

export interface RenderOptions {
  ctx: CanvasRenderingContext2D
  elements: LabelElement[]
  viewport: Viewport
  labelSize: LabelSize
  selectedIds: string[]
  hoveredId: string | null
  bindings: DataBinding
  previewMode: boolean
  selectionBox?: { x1: number; y1: number; x2: number; y2: number } | null
}

function resolveContent(template: string, bindings: DataBinding): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => bindings[key] ?? `{{${key}}}`)
}

export function renderFrame(opts: RenderOptions) {
  const { ctx, elements, viewport, labelSize, selectedIds, hoveredId, bindings, previewMode, selectionBox } = opts
  const canvas = ctx.canvas
  const { width, height } = canvas

  // Clear
  ctx.clearRect(0, 0, width, height)

  // Background outside label
  ctx.fillStyle = '#e8e8e8'
  ctx.fillRect(0, 0, width, height)

  // Apply viewport transform
  ctx.save()
  ctx.translate(viewport.x, viewport.y)
  ctx.scale(viewport.zoom, viewport.zoom)

  // Label background (white)
  const lw = mmToPx(labelSize.widthMm)
  const lh = mmToPx(labelSize.heightMm)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, lw, lh)

  // Label border
  ctx.strokeStyle = '#cccccc'
  ctx.lineWidth = 1 / viewport.zoom
  ctx.strokeRect(0, 0, lw, lh)

  // Render elements sorted by zIndex
  const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex)
  for (const el of sorted) {
    if (!el.visible) continue

    switch (el.type) {
      case 'text': {
        const content = previewMode ? resolveContent(el.content, bindings) : el.content
        renderText(ctx, el, content)
        break
      }
      case 'barcode':
        renderBarcode(ctx, el)
        break
      case 'image':
        renderImage(ctx, el)
        break
      case 'rect':
        renderRect(ctx, el)
        break
      case 'line':
        renderLine(ctx, el)
        break
    }
  }

  // Render selection/hover handles (on top of elements)
  if (!previewMode) {
    for (const el of sorted) {
      if (!el.visible) continue
      const isSelected = selectedIds.includes(el.id)
      const isHovered = hoveredId === el.id && !isSelected
      if (isSelected || isHovered) {
        renderHandles(ctx, el, isSelected, isHovered, viewport.zoom)
      }
    }

    // Selection box
    if (selectionBox) {
      const { x1, y1, x2, y2 } = selectionBox
      ctx.save()
      ctx.strokeStyle = '#1a73e8'
      ctx.lineWidth = 1 / viewport.zoom
      ctx.setLineDash([4 / viewport.zoom, 3 / viewport.zoom])
      ctx.fillStyle = 'rgba(26, 115, 232, 0.08)'
      const x = Math.min(x1, x2)
      const y = Math.min(y1, y2)
      const w = Math.abs(x2 - x1)
      const h = Math.abs(y2 - y1)
      ctx.fillRect(x, y, w, h)
      ctx.strokeRect(x, y, w, h)
      ctx.restore()
    }
  }

  ctx.restore()
}
