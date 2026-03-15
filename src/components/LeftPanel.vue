<template>
  <div class="left-panel">
    <button
      v-for="tool in tools"
      :key="tool.type"
      :class="{ active: activeTool === tool.type }"
      @click="toolbar.setTool(tool.type)"
      :title="`${tool.label} (${tool.key})`"
    >
      <span class="tool-icon">{{ tool.icon }}</span>
      <span class="tool-label">{{ tool.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToolbarStore } from '../store/toolbar'
import type { ToolType } from '../types'

const toolbar = useToolbarStore()
const activeTool = computed(() => toolbar.activeTool)

const tools: { type: ToolType; label: string; icon: string; key: string }[] = [
  { type: 'select',  label: 'Select',  icon: '↖',  key: 'V' },
  { type: 'text',    label: 'Text',    icon: 'T',   key: 'T' },
  { type: 'barcode', label: 'Barcode', icon: '▦',   key: 'B' },
  { type: 'image',   label: 'Image',   icon: '🖼',  key: 'I' },
  { type: 'rect',    label: 'Rect',    icon: '□',   key: 'R' },
  { type: 'line',    label: 'Line',    icon: '╱',   key: 'L' },
]
</script>

<style scoped>
.left-panel {
  width: 56px;
  background: #2c2c2c;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  gap: 2px;
  flex-shrink: 0;
  border-right: 1px solid #1a1a1a;
}

button {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: #aaa;
  transition: background 0.1s, color 0.1s;
}

button:hover {
  background: #3a3a3a;
  color: #fff;
}

button.active {
  background: #1a73e8;
  color: #fff;
}

.tool-icon {
  font-size: 16px;
  line-height: 1;
}

.tool-label {
  font-size: 9px;
  line-height: 1;
}
</style>
