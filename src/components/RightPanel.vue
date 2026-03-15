<template>
  <div class="right-panel">
    <template v-if="selectedElement">
      <PositionSizePanel :element="selectedElement" />
      <TextPropsPanel v-if="selectedElement.type === 'text'" :element="selectedElement" />
      <BarcodePropsPanel v-else-if="selectedElement.type === 'barcode'" :element="selectedElement" />
      <ImagePropsPanel v-else-if="selectedElement.type === 'image'" :element="selectedElement" />
      <ShapePropsPanel v-else-if="selectedElement.type === 'rect' || selectedElement.type === 'line'" :element="selectedElement" />
      <LayerOrderPanel :element="selectedElement" />
    </template>
    <template v-else>
      <CanvasSizePanel />
      <DataBindingPanel />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useElementStore } from '../store/element'
import { useSelectionStore } from '../store/selection'
import PositionSizePanel from './panels/PositionSizePanel.vue'
import TextPropsPanel from './panels/TextPropsPanel.vue'
import BarcodePropsPanel from './panels/BarcodePropsPanel.vue'
import ImagePropsPanel from './panels/ImagePropsPanel.vue'
import ShapePropsPanel from './panels/ShapePropsPanel.vue'
import LayerOrderPanel from './panels/LayerOrderPanel.vue'
import CanvasSizePanel from './panels/CanvasSizePanel.vue'
import DataBindingPanel from './panels/DataBindingPanel.vue'

const elementStore = useElementStore()
const selectionStore = useSelectionStore()

const selectedElement = computed(() => {
  const id = selectionStore.selectedIds[0]
  if (!id) return null
  return elementStore.elements.find(e => e.id === id) ?? null
})
</script>

<style scoped>
.right-panel {
  width: 240px;
  background: #1e1e1e;
  border-left: 1px solid #111;
  overflow-y: auto;
  flex-shrink: 0;
  color: #ccc;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  text-align: center;
  color: #555;
  font-size: 12px;
  line-height: 1.6;
}
</style>
