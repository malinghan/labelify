import { describe, it, expect } from 'vitest'
import { alignElements } from '../align'
import type { RectElement } from '../../types'

function makeRect(id: string, x: number, y: number, w = 50, h = 30): RectElement {
  return {
    id, type: 'rect', x, y, width: w, height: h,
    rotation: 0, locked: false, visible: true, zIndex: 1,
    fillColor: '#fff', strokeColor: '#000', strokeWidth: 1,
  }
}

describe('alignElements', () => {
  const els = [makeRect('a', 0, 0), makeRect('b', 100, 50)]

  it('aligns left to selection min-x', () => {
    const patch = alignElements(['a', 'b'], els, 'left', 'selection')
    expect(patch['a']?.x).toBe(0)
    expect(patch['b']?.x).toBe(0)
  })

  it('aligns right to selection max-x', () => {
    const patch = alignElements(['a', 'b'], els, 'right', 'selection')
    // max-x = 150, so right edge of each el = 150
    expect(patch['a']?.x).toBe(100)  // 150 - 50
    expect(patch['b']?.x).toBe(100)  // 150 - 50
  })

  it('aligns center horizontally', () => {
    const patch = alignElements(['a', 'b'], els, 'center', 'selection')
    // refX=0, refW=150, center = 75 - w/2
    expect(patch['a']?.x).toBe(50)   // 75 - 25
    expect(patch['b']?.x).toBe(50)
  })

  it('aligns top to selection min-y', () => {
    const patch = alignElements(['a', 'b'], els, 'top', 'selection')
    expect(patch['a']?.y).toBe(0)
    expect(patch['b']?.y).toBe(0)
  })

  it('aligns bottom to selection max-y', () => {
    const patch = alignElements(['a', 'b'], els, 'bottom', 'selection')
    // max-y = 80, bottom edge = 80
    expect(patch['a']?.y).toBe(50)   // 80 - 30
    expect(patch['b']?.y).toBe(50)
  })

  it('returns empty patch for empty ids', () => {
    const patch = alignElements([], els, 'left', 'selection')
    expect(Object.keys(patch)).toHaveLength(0)
  })
})
