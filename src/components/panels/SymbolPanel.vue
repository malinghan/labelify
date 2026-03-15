<template>
  <div class="panel-section">
    <div class="panel-title">标识库</div>
    <div class="symbol-grid">
      <div
        v-for="sym in SYMBOLS"
        :key="sym.id"
        class="symbol-item"
        @click="insertSymbol(sym)"
        :title="sym.name"
      >
        <div class="symbol-icon" v-html="sym.svg" />
        <div class="symbol-name">{{ sym.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SYMBOLS } from '../../data/symbols'
import { useElementStore } from '../../store/element'
import { mmToPx } from '../../canvas/units'

const elementStore = useElementStore()

function insertSymbol(sym: typeof SYMBOLS[0]) {
  const base64 = btoa(unescape(encodeURIComponent(sym.svg)))
  const dataUrl = `data:image/svg+xml;base64,${base64}`
  elementStore.add({
    id: crypto.randomUUID(),
    type: 'image',
    x: mmToPx(5),
    y: mmToPx(5),
    width: mmToPx(20),
    height: mmToPx(20),
    rotation: 0,
    locked: false,
    visible: true,
    zIndex: Date.now(),
    src: dataUrl,
    objectFit: 'contain',
    opacity: 1,
  })
}
</script>

<style scoped>
.panel-section { padding: 10px; }
.panel-title { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
.symbol-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.symbol-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px 4px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 4px;
  cursor: pointer;
}
.symbol-item:hover { border-color: #1a73e8; }
.symbol-icon { width: 36px; height: 36px; }
.symbol-icon :deep(svg) { width: 100%; height: 100%; }
.symbol-name { font-size: 9px; color: #888; text-align: center; line-height: 1.2; }
</style>
