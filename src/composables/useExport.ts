import { jsPDF } from 'jspdf'
import { useCanvasStore } from '../store/canvas'
import { useElementStore } from '../store/element'
import { useDataBindingStore } from '../store/dataBinding'
import { renderFrame } from '../canvas/render'

export function useExport() {
  const canvasStore = useCanvasStore()
  const elementStore = useElementStore()
  const dataBindingStore = useDataBindingStore()

  function renderToCanvas(scale: number): HTMLCanvasElement {
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
    return offscreen
  }

  function exportPng(scale = 3) {
    const offscreen = renderToCanvas(scale)
    const a = document.createElement('a')
    a.href = offscreen.toDataURL('image/png')
    a.download = 'label.png'
    a.click()
  }

  function exportPdf() {
    const { widthMm, heightMm } = canvasStore.labelSize
    const offscreen = renderToCanvas(3)
    const imgData = offscreen.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: widthMm >= heightMm ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [widthMm, heightMm],
    })
    pdf.addImage(imgData, 'PNG', 0, 0, widthMm, heightMm)
    pdf.save('label.pdf')
  }

  return { exportPng, exportPdf }
}
