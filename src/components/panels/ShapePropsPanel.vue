<template>
  <div class="panel-section">
    <div class="panel-title">形状</div>
    <div class="prop-grid">
      <template v-if="element.type === 'rect'">
        <label>填充</label>
        <input type="color" :value="(element as RectElement).fillColor" @input="update('fillColor', ($event.target as HTMLInputElement).value)" />
        <label>边框</label>
        <input type="color" :value="(element as RectElement).strokeColor" @input="update('strokeColor', ($event.target as HTMLInputElement).value)" />
        <label>宽度</label>
        <input type="number" :value="(element as RectElement).strokeWidth" @change="update('strokeWidth', +($event.target as HTMLInputElement).value)" min="0" max="20" />
      </template>
      <template v-else>
        <label>颜色</label>
        <input type="color" :value="(element as LineElement).strokeColor" @input="update('strokeColor', ($event.target as HTMLInputElement).value)" />
        <label>宽度</label>
        <input type="number" :value="(element as LineElement).strokeWidth" @change="update('strokeWidth', +($event.target as HTMLInputElement).value)" min="1" max="20" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RectElement, LineElement } from '../../types'
import { useElementStore } from '../../store/element'

const props = defineProps<{ element: RectElement | LineElement }>()
const elementStore = useElementStore()

function update(key: string, value: unknown) {
  elementStore.update(props.element.id, { [key]: value } as Partial<RectElement | LineElement>)
}
</script>

<style scoped>
.panel-section { padding: 10px; border-bottom: 1px solid #2a2a2a; }
.panel-title { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
.prop-grid { display: grid; grid-template-columns: 40px 1fr; gap: 4px; align-items: center; }
label { font-size: 11px; color: #888; }
input { width: 100%; background: #2a2a2a; border: 1px solid #3a3a3a; border-radius: 3px; color: #e0e0e0; padding: 3px 5px; font-size: 12px; }
input[type="color"] { padding: 1px 2px; height: 24px; cursor: pointer; }
input:focus { outline: none; border-color: #1a73e8; }
</style>
