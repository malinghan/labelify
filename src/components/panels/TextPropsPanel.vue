<template>
  <div class="panel-section">
    <div class="panel-title">Text</div>
    <div class="prop-col">
      <label>Content</label>
      <textarea :value="element.content" @input="update('content', ($event.target as HTMLTextAreaElement).value)" rows="3" />
    </div>
    <div class="prop-grid">
      <label>Font</label>
      <select :value="element.fontFamily" @change="update('fontFamily', ($event.target as HTMLSelectElement).value)">
        <option>Arial</option>
        <option>Helvetica</option>
        <option>Times New Roman</option>
        <option>Courier New</option>
        <option>Georgia</option>
      </select>
      <label>Size</label>
      <input type="number" :value="element.fontSize" @change="update('fontSize', +($event.target as HTMLInputElement).value)" min="6" max="200" />
      <label>Color</label>
      <input type="color" :value="element.color" @input="update('color', ($event.target as HTMLInputElement).value)" />
      <label>Align</label>
      <select :value="element.align" @change="update('align', ($event.target as HTMLSelectElement).value)">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </div>
    <div class="prop-row">
      <label>
        <input type="checkbox" :checked="element.fontWeight === 'bold'" @change="update('fontWeight', ($event.target as HTMLInputElement).checked ? 'bold' : 'normal')" />
        Bold
      </label>
      <label>
        <input type="checkbox" :checked="element.fontStyle === 'italic'" @change="update('fontStyle', ($event.target as HTMLInputElement).checked ? 'italic' : 'normal')" />
        Italic
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TextElement } from '../../types'
import { useElementStore } from '../../store/element'

const props = defineProps<{ element: TextElement }>()
const elementStore = useElementStore()

function update(key: string, value: unknown) {
  elementStore.update(props.element.id, { [key]: value } as Partial<TextElement>)
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
.prop-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}
.prop-grid {
  display: grid;
  grid-template-columns: 40px 1fr;
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
textarea, input, select {
  width: 100%;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 3px;
  color: #e0e0e0;
  padding: 3px 5px;
  font-size: 12px;
  resize: vertical;
}
textarea:focus, input:focus, select:focus {
  outline: none;
  border-color: #1a73e8;
}
input[type="color"] {
  padding: 1px 2px;
  height: 24px;
  cursor: pointer;
}
</style>
