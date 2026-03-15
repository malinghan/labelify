<template>
  <div class="panel-section">
    <div class="panel-title">警告语库</div>
    <div class="category-tabs">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >{{ cat }}</button>
    </div>
    <div class="warning-list">
      <div
        v-for="item in filteredWarnings"
        :key="item.id"
        class="warning-item"
        @click="insertWarning(item)"
        :title="item.content"
      >
        <div class="warning-title">{{ item.title }}</div>
        <div class="warning-preview">{{ item.content.slice(0, 40) }}…</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { WARNINGS, WARNING_CATEGORIES } from '../../data/warnings'
import { useElementStore } from '../../store/element'
import { useCanvasStore } from '../../store/canvas'
import { mmToPx } from '../../canvas/units'

const elementStore = useElementStore()
const canvasStore = useCanvasStore()

const categories = ['全部', ...WARNING_CATEGORIES]
const activeCategory = ref('全部')

const filteredWarnings = computed(() =>
  activeCategory.value === '全部'
    ? WARNINGS
    : WARNINGS.filter(w => w.category === activeCategory.value)
)

function insertWarning(item: typeof WARNINGS[0]) {
  const { widthMm } = canvasStore.labelSize
  elementStore.add({
    id: crypto.randomUUID(),
    type: 'text',
    x: mmToPx(5),
    y: mmToPx(5),
    width: mmToPx(widthMm - 10),
    height: mmToPx(20),
    rotation: 0,
    locked: false,
    visible: true,
    zIndex: Date.now(),
    content: item.content,
    fontFamily: 'Arial',
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: '#000000',
    align: 'left',
  })
}
</script>

<style scoped>
.panel-section { padding: 10px; }
.panel-title { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
.category-tabs { display: flex; flex-wrap: wrap; gap: 3px; margin-bottom: 8px; }
.category-tabs button {
  padding: 2px 6px;
  font-size: 10px;
  border-radius: 3px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: #aaa;
  cursor: pointer;
}
.category-tabs button.active { background: #1a73e8; color: #fff; border-color: #1a73e8; }
.warning-list { display: flex; flex-direction: column; gap: 4px; }
.warning-item {
  padding: 6px 8px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 4px;
  cursor: pointer;
}
.warning-item:hover { border-color: #1a73e8; }
.warning-title { font-size: 11px; color: #ddd; margin-bottom: 2px; }
.warning-preview { font-size: 10px; color: #666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
