import type { LabelElement, LabelSize } from '../types'

export type AlignDirection = 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom'

type PositionPatch = Record<string, { x?: number; y?: number }>

export function alignElements(
  ids: string[],
  elements: LabelElement[],
  direction: AlignDirection,
  relativeTo: 'selection' | 'canvas',
  labelSize?: LabelSize,
): PositionPatch {
  const targets = elements.filter(el => ids.includes(el.id))
  if (targets.length === 0) return {}

  let refX = 0, refY = 0, refW = 0, refH = 0

  if (relativeTo === 'canvas' && labelSize) {
    refX = 0
    refY = 0
    refW = labelSize.widthMm  // caller should pass px values
    refH = labelSize.heightMm
  } else {
    refX = Math.min(...targets.map(el => el.x))
    refY = Math.min(...targets.map(el => el.y))
    refW = Math.max(...targets.map(el => el.x + el.width)) - refX
    refH = Math.max(...targets.map(el => el.y + el.height)) - refY
  }

  const patch: PositionPatch = {}

  for (const el of targets) {
    switch (direction) {
      case 'left':
        patch[el.id] = { x: refX }
        break
      case 'center':
        patch[el.id] = { x: refX + refW / 2 - el.width / 2 }
        break
      case 'right':
        patch[el.id] = { x: refX + refW - el.width }
        break
      case 'top':
        patch[el.id] = { y: refY }
        break
      case 'middle':
        patch[el.id] = { y: refY + refH / 2 - el.height / 2 }
        break
      case 'bottom':
        patch[el.id] = { y: refY + refH - el.height }
        break
    }
  }

  return patch
}
