import { describe, it, expect } from 'vitest'
import { computeResize } from '../resize'
import type { RectElement } from '../../types'

function makeRect(): RectElement {
  return {
    id: 'r1', type: 'rect', x: 10, y: 10, width: 100, height: 80,
    rotation: 0, locked: false, visible: true, zIndex: 1,
    fillColor: '#fff', strokeColor: '#000', strokeWidth: 1,
  }
}

describe('computeResize', () => {
  it('se handle grows width and height', () => {
    const result = computeResize(makeRect(), 'se', { dx: 20, dy: 10 })
    expect(result.width).toBe(120)
    expect(result.height).toBe(90)
    expect(result.x).toBe(10)
    expect(result.y).toBe(10)
  })

  it('nw handle moves origin and shrinks', () => {
    const result = computeResize(makeRect(), 'nw', { dx: 10, dy: 10 })
    expect(result.x).toBe(20)
    expect(result.y).toBe(20)
    expect(result.width).toBe(90)
    expect(result.height).toBe(70)
  })

  it('n handle only changes y and height', () => {
    const result = computeResize(makeRect(), 'n', { dx: 0, dy: -10 })
    expect(result.y).toBe(0)
    expect(result.height).toBe(90)
    expect(result.x).toBe(10)
    expect(result.width).toBe(100)
  })

  it('clamps minimum size to 4', () => {
    const result = computeResize(makeRect(), 'se', { dx: -200, dy: -200 })
    expect(result.width).toBe(4)
    expect(result.height).toBe(4)
  })
})
