import type { LabelElement, HandlePosition } from '../types'

export interface ResizeResult {
  x: number
  y: number
  width: number
  height: number
}

export function computeResize(
  el: LabelElement,
  handle: HandlePosition,
  delta: { dx: number; dy: number },
  maintainAspect = false,
): ResizeResult {
  let { x, y, width, height } = el
  const { dx, dy } = delta
  const aspect = width / height

  switch (handle) {
    case 'nw':
      x += dx; y += dy; width -= dx; height -= dy
      break
    case 'n':
      y += dy; height -= dy
      break
    case 'ne':
      y += dy; width += dx; height -= dy
      break
    case 'w':
      x += dx; width -= dx
      break
    case 'e':
      width += dx
      break
    case 'sw':
      x += dx; width -= dx; height += dy
      break
    case 's':
      height += dy
      break
    case 'se':
      width += dx; height += dy
      break
  }

  // Clamp minimum size
  const MIN = 4
  if (width < MIN) {
    if (handle.includes('w')) x = el.x + el.width - MIN
    width = MIN
  }
  if (height < MIN) {
    if (handle.includes('n')) y = el.y + el.height - MIN
    height = MIN
  }

  if (maintainAspect) {
    if (['n', 's'].includes(handle)) {
      width = height * aspect
    } else if (['w', 'e'].includes(handle)) {
      height = width / aspect
    } else {
      // corner: use the larger delta
      if (Math.abs(dx) > Math.abs(dy)) {
        height = width / aspect
      } else {
        width = height * aspect
      }
    }
  }

  return { x, y, width, height }
}
