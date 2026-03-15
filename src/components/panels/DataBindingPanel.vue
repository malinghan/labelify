<template>
  <div class="panel-section">
    <div class="panel-title">数据填写</div>
    <template v-if="variables.length > 0">
      <div class="prop-grid">
        <template v-for="key in variables" :key="key">
          <label :title="key">{{ key }}</label>
          <input
            type="text"
            :value="bindings[key] ?? ''"
            :placeholder="`{{${key}}}`"
            @input="store.setBinding(key, ($event.target as HTMLInputElement).value)"
          />
        </template>
      </div>
      <button class="preview-btn" :class="{ active: store.previewMode }" @click="store.setPreviewMode(!store.previewMode)">
        {{ store.previewMode ? '退出预览' : '预览' }}
      </button>
    </template>
    <div v-else class="empty-state">模板中无变量占位符</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useElementStore } from '../../store/element'
import { useDataBindingStore } from '../../store/dataBinding'

const elementStore = useElementStore()
const store = useDataBindingStore()

const bindings = computed(() => store.bindings)

const variables = computed(() => {
  const seen = new Set<string>()
  const re = /\{\{(\w+)\}\}/g
  for (const el of elementStore.elements) {
    const text = el.type === 'text' ? el.content : el.type === 'barcode' ? el.data : ''
    let m: RegExpExecArray | null
    re.lastIndex = 0
    while ((m = re.exec(text)) !== null) seen.add(m[1])
  }
  return [...seen]
})
</script>

<style scoped>
.panel-section { padding: 10px; border-bottom: 1px solid #2a2a2a; }
.panel-title { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
.prop-grid { display: grid; grid-template-columns: 60px 1fr; gap: 4px; align-items: center; margin-bottom: 8px; }
label { font-size: 11px; color: #888; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
input { width: 100%; background: #2a2a2a; border: 1px solid #3a3a3a; border-radius: 3px; color: #e0e0e0; padding: 3px 5px; font-size: 12px; }
input:focus { outline: none; border-color: #1a73e8; }
.preview-btn { width: 100%; padding: 5px; background: #2a2a2a; border: 1px solid #3a3a3a; border-radius: 3px; color: #ccc; font-size: 12px; cursor: pointer; }
.preview-btn.active { background: #1a73e8; border-color: #1a73e8; color: #fff; }
.preview-btn:hover:not(.active) { border-color: #555; }
.empty-state { font-size: 11px; color: #555; text-align: center; padding: 8px 0; }
</style>
