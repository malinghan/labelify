import { describe, it, expect } from 'vitest'
import { hitTestElement, hitTestHandle, hitTest } from '../hitTest'
import type { TextElement } from '../../types'

function makeEl(overrides: Partial<TextElement> = {}): TextElement {
  return {
    id: 'el1',
    type: 'text',
    x: 10, y: 10, width: 100, height: 50,
    rotation: 0, locked: false, visible: true, zIndex: 1,
    content: 'Test', fontFamily: 'Arial', fontSize: 14,
    fontWeight: 'normal', fontStyle: 'normal', color: '#000', align: 'left',
    ...overrides,
  }
}

describe('hitTestElement', () => {
  it('returns true for point inside element', () => {
    expect(hitTestElement({ x: 50, y: 30 }, makeEl())).toBe(true)
  })

  it('returns false for point outside element', () => {
    expect(hitTestElement({ x: 5, y: 5 }, makeEl())).toBe(false)
  })

  it('returns false for invisible element', () => {
    expect(hitTestElement({ x: 50, y: 30 }, makeEl({ visible: false }))).toBe(false)
  })

  it('returns true on boundary', () => {
    expect(hitTestElement({ x: 10, y: 10 }, makeEl())).toBe(true)
    expect(hitTestElement({ x: 110, y: 60 }, makeEl())).toBe(true)
  })
})

describe('hitTest', () => {
  it('returns topmost element id by zIndex', () => {
    const el1 = makeEl({ id: 'a', zIndex: 1 })
    const el2 = makeEl({ id: 'b', zIndex: 2 })
    expect(hitTest({ x: 50, y: 30 }, [el1, el2])).toBe('b')
  })

  it('returns null when no hit', () => {
    expect(hitTest({ x: 0, y: 0 }, [makeEl()])).toBeNull()
  })

  it('skips invisible elements', () => {
    const el = makeEl({ visible: false })
    expect(hitTest({ x: 50, y: 30 }, [el])).toBeNull()
  })
})

describe('hitTestHandle', () => {
  it('detects corner handle at zoom 1', () => {
    const el = makeEl()
    // nw handle is at (10, 10)
    const handle = hitTestHandle({ x: 10, y: 10 }, el, 1)
    expect(handle).toBe('nw')
  })

  it('returns null when far from handles', () => {
    const el = makeEl()
    expect(hitTestHandle({ x: 50, y: 30 }, el, 1)).toBeNull()
  })
})
