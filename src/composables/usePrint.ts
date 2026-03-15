import { useCanvasStore } from '../store/canvas'
import { useElementStore } from '../store/element'
import { usePrintStore } from '../store/print'
import { renderFrame } from '../canvas/render'

const PAPER_SIZES: Record<string, { w: number; h: number }> = {
  A4:     { w: 210, h: 297 },
  A5:     { w: 148, h: 210 },
  Letter: { w: 216, h: 279 },
}

export function usePrint() {
  function print() {
    const canvasStore = useCanvasStore()
    const elementStore = useElementStore()
    const printStore = usePrintStore()
    const s = printStore.settings

    const paper = PAPER_SIZES[s.paperSize] ?? PAPER_SIZES.A4
    const paperW = s.orientation === 'landscape' ? paper.h : paper.w
    const paperH = s.orientation === 'landscape' ? paper.w : paper.h

    const DPI = 96
    const MM_TO_PX = DPI / 25.4

    const paperWpx = paperW * MM_TO_PX
    const paperHpx = paperH * MM_TO_PX
    const marginTop = s.marginTopMm * MM_TO_PX
    const marginBottom = s.marginBottomMm * MM_TO_PX
    const marginLeft = s.marginLeftMm * MM_TO_PX
    const marginRight = s.marginRightMm * MM_TO_PX

    const labelW = canvasStore.labelWidthPx
    const labelH = canvasStore.labelHeightPx

    // Render one label to an offscreen canvas
    const offscreen = document.createElement('canvas')
    offscreen.width = labelW
    offscreen.height = labelH
    const ctx = offscreen.getContext('2d')!
    renderFrame({
      ctx,
      elements: elementStore.elements,
      viewport: { x: 0, y: 0, zoom: 1 },
      labelSize: canvasStore.labelSize,
      selectedIds: [],
      hoveredId: null,
      bindings: {},
      previewMode: false,
    })
    const labelDataUrl = offscreen.toDataURL('image/png')

    // Build print HTML
    const cellW = (paperWpx - marginLeft - marginRight) / s.cols
    const cellH = (paperHpx - marginTop - marginBottom) / s.rows

    let cells = ''
    for (let r = 0; r < s.rows; r++) {
      for (let c = 0; c < s.cols; c++) {
        const border = s.showCutLines ? '1px dashed #aaa' : 'none'
        cells += `<div style="
          position:absolute;
          left:${marginLeft + c * cellW}px;
          top:${marginTop + r * cellH}px;
          width:${cellW}px;
          height:${cellH}px;
          border:${border};
          box-sizing:border-box;
          display:flex;
          align-items:center;
          justify-content:center;
        "><img src="${labelDataUrl}" style="max-width:100%;max-height:100%;object-fit:contain;" /></div>`
      }
    }

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  @page { size: ${paperW}mm ${paperH}mm; margin: 0; }
  body { margin: 0; padding: 0; }
  .page { position: relative; width: ${paperWpx}px; height: ${paperHpx}px; }
</style>
</head><body>
<div class="page">${cells}</div>
<script>window.onload=()=>{ window.print(); window.close(); }<\/script>
</body></html>`

    const win = window.open('', '_blank')
    if (win) {
      win.document.write(html)
      win.document.close()
    }
  }

  return { print }
}
