import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Viewport, LabelSize } from '../types'
import { mmToPx } from '../canvas/units'

export const useCanvasStore = defineStore('canvas', () => {
  const viewport = ref<Viewport>({ x: 0, y: 0, zoom: 1 })
  const labelSize = ref<LabelSize>({ widthMm: 100, heightMm: 150 })

  const labelWidthPx = computed(() => mmToPx(labelSize.value.widthMm))
  const labelHeightPx = computed(() => mmToPx(labelSize.value.heightMm))

  function setViewport(v: Partial<Viewport>) {
    viewport.value = { ...viewport.value, ...v }
  }

  function resetViewport() {
    viewport.value = { x: 0, y: 0, zoom: 1 }
  }

  function setLabelSize(size: Partial<LabelSize>) {
    labelSize.value = { ...labelSize.value, ...size }
  }

  function fitToScreen(containerWidth: number, containerHeight: number) {
    const padding = 40
    const scaleX = (containerWidth - padding * 2) / labelWidthPx.value
    const scaleY = (containerHeight - padding * 2) / labelHeightPx.value
    const zoom = Math.min(scaleX, scaleY, 4)
    const x = (containerWidth - labelWidthPx.value * zoom) / 2
    const y = (containerHeight - labelHeightPx.value * zoom) / 2
    viewport.value = { x, y, zoom }
  }

  return {
    viewport,
    labelSize,
    labelWidthPx,
    labelHeightPx,
    setViewport,
    resetViewport,
    setLabelSize,
    fitToScreen,
  }
})
