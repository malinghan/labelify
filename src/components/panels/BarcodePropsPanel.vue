<template>
  <div class="panel-section">
    <div class="panel-title">Barcode</div>
    <div class="prop-grid">
      <label>Type</label>
      <select :value="element.barcodeType" @change="update('barcodeType', ($event.target as HTMLSelectElement).value)">
        <option value="code128">Code 128</option>
        <option value="qrcode">QR Code</option>
      </select>
      <label>Data</label>
      <input type="text" :value="element.data" @input="update('data', ($event.target as HTMLInputElement).value)" />
    </div>
    <div class="prop-row">
      <label>
        <input type="checkbox" :checked="element.showText" @change="update('showText', ($event.target as HTMLInputElement).checked)" />
        Show text
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BarcodeElement } from '../../types'
import { useElementStore } from '../../store/element'

const props = defineProps<{ element: BarcodeElement }>()
const elementStore = useElementStore()

function update(key: string, value: unknown) {
  elementStore.update(props.element.id, { [key]: value } as Partial<BarcodeElement>)
}
</script>

<style scoped>
.panel-section { padding: 10px; border-bottom: 1px solid #2a2a2a; }
.panel-title { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
.prop-grid { display: grid; grid-template-columns: 40px 1fr; gap: 4px; align-items: center; }
.prop-row { display: flex; gap: 12px; margin-top: 6px; }
label { font-size: 11px; color: #888; display: flex; align-items: center; gap: 4px; }
input, select { width: 100%; background: #2a2a2a; border: 1px solid #3a3a3a; border-radius: 3px; color: #e0e0e0; padding: 3px 5px; font-size: 12px; }
input:focus, select:focus { outline: none; border-color: #1a73e8; }
</style>
