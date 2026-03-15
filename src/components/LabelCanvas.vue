<template>
  <canvas
    ref="canvasRef"
    :width="width"
    :height="height"
    style="display: block; position: absolute; top: 0; left: 0;"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRenderLoop } from '../composables/useRenderLoop'
import { useCanvasInteraction } from '../composables/useCanvasInteraction'
import { useCanvasStore } from '../store/canvas'

const props = defineProps<{ width: number; height: number }>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasStore = useCanvasStore()

const { selectionBox } = useRenderLoop(canvasRef)
const { mount, unmount } = useCanvasInteraction(canvasRef, selectionBox)

onMounted(() => {
  mount()
  canvasStore.fitToScreen(props.width, props.height)
})

onUnmounted(() => unmount())

watch(() => [props.width, props.height] as [number, number], ([w, h]) => {
  canvasStore.fitToScreen(w, h)
})
</script>
