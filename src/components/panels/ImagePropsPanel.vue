<template>
  <div class="panel-section">
    <div class="panel-title">Image</div>
    <div class="prop-col">
      <label>Source URL</label>
      <input type="text" :value="element.src" @input="update('src', ($event.target as HTMLInputElement).value)" placeholder="https://..." />
    </div>
    <div class="prop-grid">
      <label>Fit</label>
      <select :value="element.objectFit" @change="update('objectFit', ($event.target as HTMLSelectElement).value)">
        <option value="fill">Fill</option>
        <option value="contain">Contain</option>
        <option value="cover">Cover</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImageElement } from '../../types'
import { useElementStore } from '../../store/element'

const props = defineProps<{ element: ImageElement }>()
const elementStore = useElementStore()

function update(key: string, value: unknown) {
  elementStore.update(props.element.id, { [key]: value } as Partial<ImageElement>)
}
</script>

<style scoped>
.panel-section { padding: 10px; border-bottom: 1px solid #2a2a2a; }
.panel-title { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
.prop-col { display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px; }
.prop-grid { display: grid; grid-template-columns: 40px 1fr; gap: 4px; align-items: center; }
label { font-size: 11px; color: #888; }
input, select { width: 100%; background: #2a2a2a; border: 1px solid #3a3a3a; border-radius: 3px; color: #e0e0e0; padding: 3px 5px; font-size: 12px; }
input:focus, select:focus { outline: none; border-color: #1a73e8; }
</style>
