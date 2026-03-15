import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'
import { renderFrame } from '../canvas/render'
import { useCanvasStore } from '../store/canvas'
import { useElementStore } from '../store/element'
import { useSelectionStore } from '../store/selection'
import { useDataBindingStore } from '../store/dataBinding'

export function useRenderLoop(canvasRef: Ref<HTMLCanvasElement | null>) {
  const canvasStore = useCanvasStore()
  const elementStore = useElementStore()
  const selectionStore = useSelectionStore()
  const dataBindingStore = useDataBindingStore()

  const selectionBox = ref<{ x1: number; y1: number; x2: number; y2: number } | null>(null)

  let rafId = 0

  function draw() {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    renderFrame({
      ctx,
      elements: elementStore.elements,
      viewport: canvasStore.viewport,
      labelSize: canvasStore.labelSize,
      selectedIds: selectionStore.selectedIds,
      hoveredId: selectionStore.hoveredId,
      bindings: dataBindingStore.bindings,
      previewMode: dataBindingStore.previewMode,
      selectionBox: selectionBox.value,
    })

    rafId = requestAnimationFrame(draw)
  }

  onMounted(() => {
    rafId = requestAnimationFrame(draw)
  })

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
  })

  return { selectionBox }
}
