<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <span>保存为模板</span>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body">
        <div class="field">
          <label>模板名称 *</label>
          <input v-model="name" type="text" placeholder="我的模板" />
        </div>
        <div class="field">
          <label>描述</label>
          <input v-model="description" type="text" placeholder="简短描述这个模板的用途" />
        </div>
        <div class="field">
          <label>分类</label>
          <select v-model="category">
            <option v-for="c in CATEGORIES" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="field">
          <label>标签（逗号分隔）</label>
          <input v-model="tagsInput" type="text" placeholder="条码, 亚马逊, FBA" />
        </div>
        <div v-if="error" class="error">{{ error }}</div>
      </div>
      <div class="modal-footer">
        <button class="btn-secondary" @click="$emit('close')">取消</button>
        <button class="btn-primary" @click="save">保存</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useElementStore } from '../store/element'
import { useCanvasStore } from '../store/canvas'
import { useTemplateStore } from '../store/template'
import { useAuthStore } from '../store/auth'
import { renderFrame } from '../canvas/render'

const emit = defineEmits<{ close: [] }>()

const elementStore = useElementStore()
const canvasStore = useCanvasStore()
const templateStore = useTemplateStore()
const authStore = useAuthStore()

const CATEGORIES = ['亚马逊', 'eBay', '速卖通', '合规标签', '通用警告', '通用']

const name = ref('')
const description = ref('')
const category = ref(CATEGORIES[0])
const tagsInput = ref('')
const error = ref('')

function generateThumbnail(): string {
  const lw = canvasStore.labelWidthPx
  const lh = canvasStore.labelHeightPx
  const MAX = 200
  const scale = Math.min(MAX / lw, MAX / lh, 1)
  const offscreen = document.createElement('canvas')
  offscreen.width = Math.round(lw * scale)
  offscreen.height = Math.round(lh * scale)
  const ctx = offscreen.getContext('2d')!
  renderFrame({ ctx, elements: elementStore.elements, viewport: { x: 0, y: 0, zoom: scale }, labelSize: canvasStore.labelSize, selectedIds: [], hoveredId: null, bindings: {}, previewMode: true, selectionBox: null })
  return offscreen.toDataURL('image/png')
}

function save() {
  if (!name.value.trim()) { error.value = '请输入模板名称'; return }
  const tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
  templateStore.saveUserTemplate({
    name: name.value.trim(),
    description: description.value.trim(),
    category: category.value,
    tags,
    size: canvasStore.labelSize,
    elements: elementStore.elements,
    thumbnail: generateThumbnail(),
    isBuiltin: false,
    authorId: authStore.user?.id,
  })
  emit('close')
}
</script>

<style scoped>
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.65); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal { background: #2c2c2c; border: 1px solid #444; border-radius: 10px; width: 360px; color: #e0e0e0; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: 1px solid #3a3a3a; font-size: 14px; font-weight: 600; }
.close-btn { background: none; border: none; color: #666; cursor: pointer; font-size: 16px; padding: 2px 6px; }
.close-btn:hover { color: #fff; }
.modal-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.field { display: flex; flex-direction: column; gap: 4px; }
label { font-size: 12px; color: #aaa; }
input, select { background: #1e1e1e; border: 1px solid #3a3a3a; border-radius: 5px; color: #e0e0e0; padding: 7px 10px; font-size: 13px; }
input:focus, select:focus { outline: none; border-color: #1a73e8; }
.error { font-size: 12px; color: #e74c3c; }
.modal-footer { display: flex; justify-content: flex-end; gap: 8px; padding: 12px 16px; border-top: 1px solid #3a3a3a; }
.btn-primary { padding: 7px 18px; background: #1a73e8; color: #fff; border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 600; }
.btn-primary:hover { background: #1557b0; }
.btn-secondary { padding: 7px 18px; background: #3a3a3a; color: #ccc; border-radius: 6px; font-size: 13px; cursor: pointer; }
.btn-secondary:hover { background: #444; }
</style>
