import { describe, it, expect } from 'vitest'
import { mmToPx, pxToMm } from '../units'

describe('units', () => {
  it('mmToPx converts mm to pixels at 96dpi', () => {
    expect(mmToPx(25.4)).toBeCloseTo(96)
    expect(mmToPx(0)).toBe(0)
  })

  it('pxToMm converts pixels to mm at 96dpi', () => {
    expect(pxToMm(96)).toBeCloseTo(25.4)
    expect(pxToMm(0)).toBe(0)
  })

  it('round-trips correctly', () => {
    expect(pxToMm(mmToPx(100))).toBeCloseTo(100)
  })
})
