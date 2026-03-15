<template>
  <div class="panel-section">
    <div class="panel-title">图层顺序</div>
    <div class="layer-buttons">
      <button @click="elementStore.bringForward(element.id)" title="上移一层">↑ 上移</button>
      <button @click="elementStore.sendBackward(element.id)" title="下移一层">↓ 下移</button>
    </div>
    <div class="z-index-label">z-index: {{ element.zIndex }}</div>
  </div>
</template>

<script setup lang="ts">
import type { LabelElement } from '../../types'
import { useElementStore } from '../../store/element'

const props = defineProps<{ element: LabelElement }>()
const elementStore = useElementStore()
</script>

<style scoped>
.panel-section { padding: 10px; border-bottom: 1px solid #2a2a2a; }
.panel-title { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
.layer-buttons { display: flex; gap: 6px; }
button {
  flex: 1;
  padding: 4px 8px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 3px;
  color: #ccc;
  font-size: 11px;
  cursor: pointer;
}
button:hover { background: #3a3a3a; }
.z-index-label { font-size: 10px; color: #555; margin-top: 4px; }
</style>
