import type { LabelElement, ToolType } from '../types'
import { mmToPx } from '../canvas/units'

let zIndexCounter = 1

function nextZIndex() {
  return zIndexCounter++
}

function baseDefaults(x: number, y: number): Omit<LabelElement, 'type' | 'id'> & { id: string } {
  return {
    id: crypto.randomUUID(),
    x,
    y,
    width: mmToPx(30),
    height: mmToPx(15),
    rotation: 0,
    locked: false,
    visible: true,
    zIndex: nextZIndex(),
  }
}

export function useElementFactory() {
  function createElement(type: Exclude<ToolType, 'select'>, x: number, y: number): LabelElement {
    const base = baseDefaults(x, y)

    switch (type) {
      case 'text':
        return {
          ...base,
          type: 'text',
          content: 'Text',
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: 'normal',
          fontStyle: 'normal',
          color: '#000000',
          align: 'left',
        }
      case 'barcode':
        return {
          ...base,
          width: mmToPx(40),
          height: mmToPx(20),
          type: 'barcode',
          barcodeType: 'code128',
          data: '123456789',
          showText: true,
          platform: 'custom',
        }
      case 'image':
        return {
          ...base,
          width: mmToPx(30),
          height: mmToPx(30),
          type: 'image',
          src: '',
          objectFit: 'contain',
          opacity: 1,
        }
      case 'rect':
        return {
          ...base,
          type: 'rect',
          fillColor: '#ffffff',
          strokeColor: '#000000',
          strokeWidth: 1,
        }
      case 'line':
        return {
          ...base,
          height: 0,
          width: mmToPx(30),
          type: 'line',
          strokeColor: '#000000',
          strokeWidth: 1,
        }
    }
  }

  return { createElement }
}
