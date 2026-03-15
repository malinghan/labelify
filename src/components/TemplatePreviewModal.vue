<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-left">
        <div class="preview-wrap">
          <canvas ref="canvasRef" :width="previewW" :height="previewH" />
        </div>
      </div>
      <div class="modal-right">
        <div class="meta">
          <div class="tpl-name">{{ tpl.name }}</div>
          <div class="tpl-desc">{{ tpl.description }}</div>
          <div class="tpl-size">{{ tpl.size.widthMm }} × {{ tpl.size.heightMm }} mm</div>
          <div class="tpl-tags">
            <span v-for="tag in tpl.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="actions">
          <button class="btn-primary" @click="use">使用模板</button>
          <button class="btn-secondary" @click="$emit('close')">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useElementStore } from '../store/element'
import { useCanvasStore } from '../store/canvas'
import { renderFrame } from '../canvas/render'
import type { Template } from '../store/template'

const props = defineProps<{ tpl: Template }>()
const emit = defineEmits<{ close: [] }>()

const router = useRouter()
const elementStore = useElementStore()
const canvasStore = useCanvasStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)

const MAX = 400
const previewW = computed(() => {
  const ratio = props.tpl.size.widthMm / props.tpl.size.heightMm
  return ratio >= 1 ? MAX : Math.round(MAX * ratio)
})
const previewH = computed(() => {
  const ratio = props.tpl.size.widthMm / props.tpl.size.heightMm
  return ratio < 1 ? MAX : Math.round(MAX / ratio)
})

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!
  const scale = previewW.value / (props.tpl.size.widthMm * 3.7795)
  renderFrame({ ctx, elements: props.tpl.elements, viewport: { x: 0, y: 0, zoom: scale }, labelSize: props.tpl.size, selectedIds: [], hoveredId: null, bindings: {}, previewMode: false })
})

function use() {
  elementStore.loadSnapshot(props.tpl.elements)
  canvasStore.setLabelSize(props.tpl.size)
  emit('close')
  router.push('/editor')
}
</script>

<style scoped>
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal { display: flex; background: #2c2c2c; border: 1px solid #444; border-radius: 10px; overflow: hidden; max-width: 90vw; max-height: 90vh; }
.modal-left { background: #e8e8e8; display: flex; align-items: center; justify-content: center; padding: 24px; }
.preview-wrap canvas { display: block; max-width: 400px; max-height: 400px; }
.modal-right { width: 220px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; flex-shrink: 0; }
.tpl-name { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.tpl-desc { font-size: 12px; color: #aaa; line-height: 1.5; margin-bottom: 12px; }
.tpl-size { font-size: 11px; color: #666; margin-bottom: 10px; }
.tpl-tags { display: flex; flex-wrap: wrap; gap: 4px; }
.tag { padding: 2px 8px; background: #3a3a3a; border-radius: 10px; font-size: 11px; color: #aaa; }
.actions { display: flex; flex-direction: column; gap: 8px; }
.btn-primary { padding: 8px; background: #1a73e8; color: #fff; border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 600; }
.btn-primary:hover { background: #1557b0; }
.btn-secondary { padding: 8px; background: #3a3a3a; color: #ccc; border-radius: 6px; font-size: 13px; cursor: pointer; }
.btn-secondary:hover { background: #444; }
</style>
