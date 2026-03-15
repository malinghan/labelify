<template>
  <div class="left-panel">
    <!-- Tab header -->
    <div class="tab-header">
      <button :class="{ active: activeTab === 'tools' }" @click="activeTab = 'tools'" title="绘制工具">工具</button>
      <button :class="{ active: activeTab === 'warnings' }" @click="activeTab = 'warnings'" title="警告语库">警告</button>
      <button :class="{ active: activeTab === 'symbols' }" @click="activeTab = 'symbols'" title="标识库">标识</button>
    </div>

    <!-- Tools tab -->
    <div v-if="activeTab === 'tools'" class="tools-list">
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

    <!-- Warnings tab -->
    <div v-else-if="activeTab === 'warnings'" class="scroll-pane">
      <WarningPanel />
    </div>

    <!-- Symbols tab -->
    <div v-else-if="activeTab === 'symbols'" class="scroll-pane">
      <SymbolPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToolbarStore } from '../store/toolbar'
import type { ToolType } from '../types'
import WarningPanel from './panels/WarningPanel.vue'
import SymbolPanel from './panels/SymbolPanel.vue'

const toolbar = useToolbarStore()
const activeTool = computed(() => toolbar.activeTool)
const activeTab = ref<'tools' | 'warnings' | 'symbols'>('tools')

const tools: { type: ToolType; label: string; icon: string; key: string }[] = [
  { type: 'select',  label: '选择',  icon: '↖',  key: 'V' },
  { type: 'text',    label: '文字',  icon: 'T',   key: 'T' },
  { type: 'barcode', label: '条码',  icon: '▦',   key: 'B' },
   { type: 'image',   label: '标识',  icon: '🔣',  key: 'I' },
  { type: 'rect',    label: '矩形',  icon: '□',   key: 'R' },
  { type: 'line',    label: '直线',  icon: '╱',   key: 'L' },
]
</script>

<style scoped>
.left-panel {
  width: 72px;
  background: #2c2c2c;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-right: 1px solid #1a1a1a;
  overflow: hidden;
}

.tab-header {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 4px;
  border-bottom: 1px solid #1a1a1a;
}

.tab-header button {
  width: 100%;
  padding: 4px 2px;
  border-radius: 4px;
  font-size: 9px;
  color: #888;
  text-align: center;
  cursor: pointer;
}

.tab-header button:hover { background: #3a3a3a; color: #fff; }
.tab-header button.active { background: #1a73e8; color: #fff; }

.tools-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  gap: 2px;
}

.tools-list button {
  width: 56px;
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

.tools-list button:hover { background: #3a3a3a; color: #fff; }
.tools-list button.active { background: #1a73e8; color: #fff; }

.tool-icon { font-size: 16px; line-height: 1; }
.tool-label { font-size: 9px; line-height: 1; }

.scroll-pane {
  flex: 1;
  overflow-y: auto;
  width: 200px;
  /* expand panel when warnings/symbols tab is active */
}

/* When showing warnings/symbols, widen the panel */
.left-panel:has(.scroll-pane) {
  width: 220px;
}
</style>
