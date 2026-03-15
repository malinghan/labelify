<template>
  <div class="gallery-page">
    <header class="gallery-header">
      <h1>Labelify</h1>
      <p>跨境电商标签设计器</p>
      <button class="btn-new" @click="goEditor()">+ 新建空白标签</button>
    </header>

    <div class="category-tabs">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >{{ cat }}</button>
    </div>

    <div class="template-grid">
      <div
        v-for="tpl in filteredTemplates"
        :key="tpl.id"
        class="template-card"
        @click="loadTemplate(tpl)"
      >
        <div class="card-preview">
          <canvas :ref="el => registerCanvas(tpl.id, el as HTMLCanvasElement)" width="160" height="100" />
        </div>
        <div class="card-info">
          <div class="card-name">{{ tpl.name }}</div>
          <div class="card-size">{{ tpl.size.widthMm }}×{{ tpl.size.heightMm }}mm</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useElementStore } from '../store/element'
import { useCanvasStore } from '../store/canvas'
import { useTemplateStore } from '../store/template'
import type { Template } from '../store/template'
import { BUILTIN_TEMPLATES } from '../data/templates/builtins'
import { renderFrame } from '../canvas/render'

const router = useRouter()
const elementStore = useElementStore()
const canvasStore = useCanvasStore()
const templateStore = useTemplateStore()

const activeCategory = ref('全部')
const canvasRefs = new Map<string, HTMLCanvasElement>()

const categories = computed(() => {
  const cats = [...new Set(templateStore.templates.map(t => t.category))]
  return ['全部', ...cats]
})

const filteredTemplates = computed(() =>
  activeCategory.value === '全部'
    ? templateStore.templates
    : templateStore.templates.filter(t => t.category === activeCategory.value)
)

function registerCanvas(id: string, el: HTMLCanvasElement | null) {
  if (el) canvasRefs.set(id, el)
}

function renderPreviews() {
  for (const tpl of templateStore.templates) {
    const canvas = canvasRefs.get(tpl.id)
    if (!canvas) continue
    const ctx = canvas.getContext('2d')
    if (!ctx) continue
    const scale = Math.min(160 / (tpl.size.widthMm * 3.78), 100 / (tpl.size.heightMm * 3.78))
    renderFrame({
      ctx,
      elements: tpl.elements,
      viewport: { x: 0, y: 0, zoom: scale },
      labelSize: tpl.size,
      selectedIds: [],
      hoveredId: null,
      bindings: {},
      previewMode: false,
    })
  }
}

function loadTemplate(tpl: Template) {
  elementStore.loadSnapshot(tpl.elements)
  canvasStore.setLabelSize(tpl.size)
  router.push('/editor')
}

function goEditor() {
  router.push('/editor')
}

onMounted(() => {
  templateStore.loadBuiltins(BUILTIN_TEMPLATES)
  nextTick(renderPreviews)
})
</script>

<style scoped>
.gallery-page {
  min-height: 100vh;
  background: #1a1a1a;
  color: #e0e0e0;
  padding: 0 0 40px;
}

.gallery-header {
  text-align: center;
  padding: 40px 20px 24px;
  border-bottom: 1px solid #2a2a2a;
}

.gallery-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 6px;
}

.gallery-header p {
  font-size: 14px;
  color: #888;
  margin: 0 0 16px;
}

.btn-new {
  padding: 8px 20px;
  background: #1a73e8;
  color: #fff;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.btn-new:hover { background: #1557b0; }

.category-tabs {
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  flex-wrap: wrap;
}

.category-tabs button {
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 13px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: #aaa;
  cursor: pointer;
}

.category-tabs button:hover { background: #3a3a3a; color: #fff; }
.category-tabs button.active { background: #1a73e8; color: #fff; border-color: #1a73e8; }

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 0 24px;
}

.template-card {
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.1s;
}

.template-card:hover {
  border-color: #1a73e8;
  transform: translateY(-2px);
}

.card-preview {
  background: #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  overflow: hidden;
}

.card-preview canvas {
  max-width: 100%;
  max-height: 100%;
}

.card-info {
  padding: 10px 12px;
}

.card-name {
  font-size: 13px;
  color: #e0e0e0;
  margin-bottom: 3px;
}

.card-size {
  font-size: 11px;
  color: #666;
}
</style>
