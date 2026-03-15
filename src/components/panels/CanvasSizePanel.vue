<template>
  <div class="panel-section">
    <div class="panel-title">画布尺寸</div>
    <div class="prop-grid">
      <label>预设</label>
      <select @change="handlePreset">
        <option v-for="p in presets" :key="p.id" :value="p.id" :selected="p.id === activePresetId">
          {{ p.name }}
        </option>
      </select>
      <label>宽(mm)</label>
      <input type="number" :value="labelSize.widthMm" @change="updateWidth(+($event.target as HTMLInputElement).value)" min="1" />
      <label>高(mm)</label>
      <input type="number" :value="labelSize.heightMm" @change="updateHeight(+($event.target as HTMLInputElement).value)" min="1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCanvasStore } from '../../store/canvas'
import { LABEL_SIZE_PRESETS } from '../../data/labelSizes'

const canvasStore = useCanvasStore()
const labelSize = computed(() => canvasStore.labelSize)
const presets = LABEL_SIZE_PRESETS

const activePresetId = computed(() => {
  const { widthMm, heightMm } = labelSize.value
  return presets.find(p => p.size.widthMm === widthMm && p.size.heightMm === heightMm)?.id ?? 'custom'
})

function handlePreset(e: Event) {
  const id = (e.target as HTMLSelectElement).value
  const preset = presets.find(p => p.id === id)
  if (preset && id !== 'custom') {
    canvasStore.setLabelSize(preset.size)
  }
}

function updateWidth(v: number) {
  if (v > 0) canvasStore.setLabelSize({ widthMm: v })
}

function updateHeight(v: number) {
  if (v > 0) canvasStore.setLabelSize({ heightMm: v })
}
</script>

<style scoped>
.panel-section { padding: 10px; border-bottom: 1px solid #2a2a2a; }
.panel-title { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
.prop-grid { display: grid; grid-template-columns: 50px 1fr; gap: 4px; align-items: center; }
label { font-size: 11px; color: #888; }
input, select { width: 100%; background: #2a2a2a; border: 1px solid #3a3a3a; border-radius: 3px; color: #e0e0e0; padding: 3px 5px; font-size: 12px; }
input:focus, select:focus { outline: none; border-color: #1a73e8; }
</style>
