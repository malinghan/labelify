import type { LabelElement, HandlePosition, Point } from '../types'

export interface Bounds {
  x: number
  y: number
  width: number
  height: number
}

export function getElementBounds(el: LabelElement): Bounds {
  return { x: el.x, y: el.y, width: el.width, height: el.height }
}

export function getHandlePositions(el: LabelElement): Record<HandlePosition, Point> {
  const { x, y, width, height } = el
  const cx = x + width / 2
  const cy = y + height / 2
  return {
    nw: { x, y },
    n:  { x: cx, y },
    ne: { x: x + width, y },
    w:  { x, y: cy },
    e:  { x: x + width, y: cy },
    sw: { x, y: y + height },
    s:  { x: cx, y: y + height },
    se: { x: x + width, y: y + height },
  }
}
