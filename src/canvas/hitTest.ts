import type { Point, LabelElement, HandlePosition } from '../types'
import { getHandlePositions } from './elementBounds'

const HANDLE_HIT_RADIUS = 8

/** AABB 命中检测单个元素 */
export function hitTestElement(point: Point, el: LabelElement): boolean {
  if (!el.visible) return false
  return (
    point.x >= el.x &&
    point.x <= el.x + el.width &&
    point.y >= el.y &&
    point.y <= el.y + el.height
  )
}

/** 控制点命中检测，返回命中的 handle 名称或 null */
export function hitTestHandle(
  point: Point,
  el: LabelElement,
  zoom: number,
): HandlePosition | null {
  const handles = getHandlePositions(el)
  const radius = HANDLE_HIT_RADIUS / zoom
  for (const [pos, hp] of Object.entries(handles) as [HandlePosition, Point][]) {
    const dx = point.x - hp.x
    const dy = point.y - hp.y
    if (dx * dx + dy * dy <= radius * radius) return pos
  }
  return null
}

/** 返回最顶层（zIndex 最大）命中元素的 id，无命中返回 null */
export function hitTest(point: Point, elements: LabelElement[]): string | null {
  const sorted = [...elements].sort((a, b) => b.zIndex - a.zIndex)
  for (const el of sorted) {
    if (hitTestElement(point, el)) return el.id
  }
  return null
}
