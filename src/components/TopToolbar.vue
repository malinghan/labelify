<template>
  <div class="top-toolbar">
    <!-- File actions -->
    <div class="toolbar-group">
      <button @click="newLabel" title="新建标签">新建</button>
      <button @click="exportPng()" title="导出 PNG">导出 PNG</button>
      <button @click="exportPdf()" title="导出 PDF">导出 PDF</button>
    </div>

    <div class="toolbar-divider" />

    <!-- History -->
    <div class="toolbar-group">
      <button @click="elementStore.undo()" :disabled="!canUndo" title="撤销 (⌘Z)">↩</button>
      <button @click="elementStore.redo()" :disabled="!canRedo" title="重做 (⌘⇧Z)">↪</button>
    </div>

    <div class="toolbar-divider" />

    <!-- Zoom -->
    <div class="toolbar-group">
      <button @click="zoomOut">−</button>
      <span class="zoom-label">{{ zoomPercent }}%</span>
      <button @click="zoomIn">+</button>
      <button @click="fitScreen" title="适应屏幕">适应</button>
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
      <button :class="{ active: previewMode }" @click="dataBindingStore.setPreviewMode(!previewMode)" title="预览数据绑定">
        {{ previewMode ? '● 预览' : '○ 预览' }}
      </button>
    </div>

    <div class="toolbar-divider" />

    <!-- Print -->
    <div class="toolbar-group">
      <button @click="showPrint = true" title="打印">🖨 打印</button>
    </div>

    <div class="toolbar-divider" />

    <!-- Save template + auth -->
    <div class="toolbar-group">
      <button
        @click="onSaveTemplate"
        :title="authStore.isLoggedIn ? '保存为模板' : '登录后可保存模板'"
      >保存模板</button>
      <template v-if="authStore.isLoggedIn">
        <UserAvatar />
      </template>
      <template v-else>
        <button @click="showAuth = true">登录</button>
      </template>
    </div>

    <PrintSettingsModal v-if="showPrint" @close="showPrint = false" />
    <SaveTemplateModal v-if="showSaveTemplate" @close="showSaveTemplate = false" />
    <AuthModal v-if="showAuth" @close="showAuth = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCanvasStore } from '../store/canvas'
import { useElementStore } from '../store/element'
import { useSelectionStore } from '../store/selection'
import { useDataBindingStore } from '../store/dataBinding'
import { useAuthStore } from '../store/auth'
import { useExport } from '../composables/useExport'
import { alignElements } from '../canvas/align'
import type { AlignDirection } from '../canvas/align'
import PrintSettingsModal from './PrintSettingsModal.vue'
import SaveTemplateModal from './SaveTemplateModal.vue'
import AuthModal from './AuthModal.vue'
import UserAvatar from './UserAvatar.vue'

const canvasStore = useCanvasStore()
const elementStore = useElementStore()
const selectionStore = useSelectionStore()
const dataBindingStore = useDataBindingStore()
const authStore = useAuthStore()
const { exportPng, exportPdf } = useExport()

const showPrint = ref(false)
const showSaveTemplate = ref(false)
const showAuth = ref(false)
const canUndo = computed(() => elementStore.past.length > 0)
const canRedo = computed(() => elementStore.future.length > 0)

function onSaveTemplate() {
  if (authStore.isLoggedIn) showSaveTemplate.value = true
  else showAuth.value = true
}
const zoomPercent = computed(() => Math.round(canvasStore.viewport.zoom * 100))
const selectedIds = computed(() => selectionStore.selectedIds)
const previewMode = computed(() => dataBindingStore.previewMode)

const alignDirs: { key: AlignDirection; label: string; icon: string }[] = [
  { key: 'left',   label: '左对齐',   icon: '⬛▪' },
  { key: 'center', label: '水平居中', icon: '▪⬛▪' },
  { key: 'right',  label: '右对齐',  icon: '▪⬛' },
  { key: 'top',    label: '顶对齐',  icon: '⬛↑' },
  { key: 'middle', label: '垂直居中', icon: '⬛↕' },
  { key: 'bottom', label: '底对齐',  icon: '⬛↓' },
]

function newLabel() {
  if (elementStore.elements.length > 0 && !confirm('清空画布？')) return
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
