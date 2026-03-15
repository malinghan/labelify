import type { LabelElement, HandlePosition } from '../../types'
import { getHandlePositions } from '../elementBounds'

const HANDLE_SIZE = 8
const SELECTION_COLOR = '#1a73e8'
const HOVER_COLOR = '#4a9eff'

export function renderHandles(
  ctx: CanvasRenderingContext2D,
  el: LabelElement,
  isSelected: boolean,
  isHovered: boolean,
  zoom: number,
) {
  if (!isSelected && !isHovered) return

  ctx.save()

  const color = isSelected ? SELECTION_COLOR : HOVER_COLOR
  const handleSize = HANDLE_SIZE / zoom

  // Selection border
  ctx.strokeStyle = color
  ctx.lineWidth = 1.5 / zoom
  ctx.setLineDash([])
  ctx.strokeRect(el.x, el.y, el.width, el.height)

  if (!isSelected) {
    ctx.restore()
    return
  }

  // Draw 8 resize handles
  const handles = getHandlePositions(el)
  for (const [, pos] of Object.entries(handles) as [HandlePosition, { x: number; y: number }][]) {
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = SELECTION_COLOR
    ctx.lineWidth = 1.5 / zoom
    ctx.fillRect(pos.x - handleSize / 2, pos.y - handleSize / 2, handleSize, handleSize)
    ctx.strokeRect(pos.x - handleSize / 2, pos.y - handleSize / 2, handleSize, handleSize)
  }

  ctx.restore()
}

export function renderSelectionBox(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
) {
  ctx.save()
  ctx.strokeStyle = SELECTION_COLOR
  ctx.lineWidth = 1
  ctx.setLineDash([4, 3])
  ctx.fillStyle = 'rgba(26, 115, 232, 0.08)'
  const x = Math.min(startX, endX)
  const y = Math.min(startY, endY)
  const w = Math.abs(endX - startX)
  const h = Math.abs(endY - startY)
  ctx.fillRect(x, y, w, h)
  ctx.strokeRect(x, y, w, h)
  ctx.restore()
}
