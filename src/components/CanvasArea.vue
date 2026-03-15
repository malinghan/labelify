<template>
  <div class="canvas-area" ref="containerRef">
    <LabelCanvas :width="containerWidth" :height="containerHeight" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LabelCanvas from './LabelCanvas.vue'

const containerRef = ref<HTMLElement | null>(null)
const containerWidth = ref(800)
const containerHeight = ref(600)

let ro: ResizeObserver | null = null

onMounted(() => {
  if (!containerRef.value) return
  ro = new ResizeObserver(entries => {
    const entry = entries[0]
    containerWidth.value = entry.contentRect.width
    containerHeight.value = entry.contentRect.height
  })
  ro.observe(containerRef.value)
  containerWidth.value = containerRef.value.clientWidth
  containerHeight.value = containerRef.value.clientHeight
})

onUnmounted(() => ro?.disconnect())
</script>

<style scoped>
.canvas-area {
  flex: 1;
  overflow: hidden;
  position: relative;
  background: #e8e8e8;
}
</style>
