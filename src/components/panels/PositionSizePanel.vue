<template>
  <div class="panel-section">
    <div class="panel-title">位置与尺寸</div>
    <div class="prop-grid">
      <label>X</label>
      <input type="number" :value="round(pxToMm(element.x))" @change="update('x', mmToPx(+($event.target as HTMLInputElement).value))" />
      <label>Y</label>
      <input type="number" :value="round(pxToMm(element.y))" @change="update('y', mmToPx(+($event.target as HTMLInputElement).value))" />
      <label>宽</label>
      <input type="number" :value="round(pxToMm(element.width))" @change="update('width', mmToPx(+($event.target as HTMLInputElement).value))" />
      <label>高</label>
      <input type="number" :value="round(pxToMm(element.height))" @change="update('height', mmToPx(+($event.target as HTMLInputElement).value))" />
    </div>
    <div class="prop-row">
      <label>
        <input type="checkbox" :checked="element.locked" @change="update('locked', ($event.target as HTMLInputElement).checked)" />
        锁定
      </label>
      <label>
        <input type="checkbox" :checked="element.visible" @change="update('visible', ($event.target as HTMLInputElement).checked)" />
        显示
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LabelElement } from '../../types'
import { useElementStore } from '../../store/element'
import { mmToPx, pxToMm } from '../../canvas/units'

const props = defineProps<{ element: LabelElement }>()
const elementStore = useElementStore()

function round(v: number) { return Math.round(v * 10) / 10 }

function update(key: string, value: unknown) {
  elementStore.update(props.element.id, { [key]: value } as Partial<LabelElement>)
}
</script>

<style scoped>
.panel-section {
  padding: 10px;
  border-bottom: 1px solid #2a2a2a;
}

.panel-title {
  font-size: 11px;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.prop-grid {
  display: grid;
  grid-template-columns: 20px 1fr 20px 1fr;
  gap: 4px;
  align-items: center;
}

.prop-row {
  display: flex;
  gap: 12px;
  margin-top: 6px;
}

label {
  font-size: 11px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 4px;
}

input[type="number"] {
  width: 100%;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 3px;
  color: #e0e0e0;
  padding: 3px 5px;
  font-size: 12px;
}

input[type="number"]:focus {
  outline: none;
  border-color: #1a73e8;
}
</style>
