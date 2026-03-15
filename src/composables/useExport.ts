import { useCanvasStore } from '../store/canvas'
import { useElementStore } from '../store/element'
import { useSelectionStore } from '../store/selection'
import { useDataBindingStore } from '../store/dataBinding'
import { mmToPx } from '../canvas/units'
import { renderFrame } from '../canvas/render'

export function useExport() {
  const canvasStore = useCanvasStore()
  const elementStore = useElementStore()
  const selectionStore = useSelectionStore()
  const dataBindingStore = useDataBindingStore()

  function exportPng(scale = 3) {
    const lw = canvasStore.labelWidthPx
    const lh = canvasStore.labelHeightPx

    const offscreen = document.createElement('canvas')
    offscreen.width = lw * scale
    offscreen.height = lh * scale
    const ctx = offscreen.getContext('2d')!

    renderFrame({
      ctx,
      elements: elementStore.elements,
      viewport: { x: 0, y: 0, zoom: scale },
      labelSize: canvasStore.labelSize,
      selectedIds: [],
      hoveredId: null,
      bindings: dataBindingStore.bindings,
      previewMode: true,
      selectionBox: null,
    })

    const url = offscreen.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'label.png'
    a.click()
  }

  return { exportPng }
}
