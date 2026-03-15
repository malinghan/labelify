<template>
  <div class="top-toolbar">
    <!-- File actions -->
    <div class="toolbar-group">
      <button @click="newLabel" title="New">New</button>
      <button @click="exportPng()" title="Export PNG">Export PNG</button>
    </div>

    <div class="toolbar-divider" />

    <!-- History -->
    <div class="toolbar-group">
      <button @click="elementStore.undo()" :disabled="!canUndo" title="Undo (⌘Z)">↩</button>
      <button @click="elementStore.redo()" :disabled="!canRedo" title="Redo (⌘⇧Z)">↪</button>
    </div>

    <div class="toolbar-divider" />

    <!-- Zoom -->
    <div class="toolbar-group">
      <button @click="zoomOut">−</button>
      <span class="zoom-label">{{ zoomPercent }}%</span>
      <button @click="zoomIn">+</button>
      <button @click="fitScreen" title="Fit to screen">Fit</button>
    </div>

    <div class="toolbar-divider" />

    <!-- Align (active when 2+ selected) -->
    <div class="toolbar-group">
      <button v-for="dir in alignDirs" :key="dir.key" :disabled="selectedIds.length < 2"
        @click="doAlign(dir.key)" :title="dir.label">{{ dir.icon }}</button>
    </div>

    <div class="toolbar-spacer" />

    <!-- Preview mode -->
    <div class="toolbar-group">
      <button :class="{ active: previewMode }" @click="dataBindingStore.setPreviewMode(!previewMode)">
        {{ previewMode ? '● Preview' : '○ Preview' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCanvasStore } from '../store/canvas'
import { useElementStore } from '../store/element'
import { useSelectionStore } from '../store/selection'
import { useDataBindingStore } from '../store/dataBinding'
import { useExport } from '../composables/useExport'
import { alignElements } from '../canvas/align'
import type { AlignDirection } from '../canvas/align'

const canvasStore = useCanvasStore()
const elementStore = useElementStore()
const selectionStore = useSelectionStore()
const dataBindingStore = useDataBindingStore()
const { exportPng } = useExport()

const canUndo = computed(() => elementStore.past.length > 0)
const canRedo = computed(() => elementStore.future.length > 0)
const zoomPercent = computed(() => Math.round(canvasStore.viewport.zoom * 100))
const selectedIds = computed(() => selectionStore.selectedIds)
const previewMode = computed(() => dataBindingStore.previewMode)

const alignDirs: { key: AlignDirection; label: string; icon: string }[] = [
  { key: 'left',   label: 'Align left',   icon: '⬛▪' },
  { key: 'center', label: 'Align center', icon: '▪⬛▪' },
  { key: 'right',  label: 'Align right',  icon: '▪⬛' },
  { key: 'top',    label: 'Align top',    icon: '⬛↑' },
  { key: 'middle', label: 'Align middle', icon: '⬛↕' },
  { key: 'bottom', label: 'Align bottom', icon: '⬛↓' },
]

function newLabel() {
  if (elementStore.elements.length > 0 && !confirm('Clear canvas?')) return
  elementStore.clear()
  selectionStore.clearSelection()
}

function zoomIn() {
  const vp = canvasStore.viewport
  canvasStore.setViewport({ zoom: Math.min(4, vp.zoom * 1.2) })
}

function zoomOut() {
  const vp = canvasStore.viewport
  canvasStore.setViewport({ zoom: Math.max(0.1, vp.zoom / 1.2) })
}

function fitScreen() {
  const el = document.querySelector('.canvas-area') as HTMLElement
  if (el) canvasStore.fitToScreen(el.clientWidth, el.clientHeight)
}

function doAlign(dir: AlignDirection) {
  const patch = alignElements(
    selectionStore.selectedIds,
    elementStore.elements,
    dir,
    'selection',
  )
  elementStore.updateMany(patch as Record<string, { x?: number; y?: number }>)
}
</script>

<style scoped>
.top-toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  height: 40px;
  background: #2c2c2c;
  color: #e0e0e0;
  flex-shrink: 0;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 2px;
}

.toolbar-divider {
  width: 1px;
  height: 20px;
  background: #444;
  margin: 0 4px;
}

.toolbar-spacer {
  flex: 1;
}

.zoom-label {
  min-width: 40px;
  text-align: center;
  font-size: 12px;
}

button {
  padding: 3px 8px;
  border-radius: 3px;
  color: #e0e0e0;
  font-size: 12px;
  transition: background 0.1s;
}

button:hover:not(:disabled) {
  background: #444;
}

button:disabled {
  opacity: 0.4;
  cursor: default;
}

button.active {
  background: #1a73e8;
  color: #fff;
}
</style>
