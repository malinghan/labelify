<template>
  <div class="panel-section">
    <div class="panel-title">条码</div>
    <div class="prop-grid">
      <label>类型</label>
      <select :value="element.barcodeType" @change="update('barcodeType', ($event.target as HTMLSelectElement).value)">
        <option value="code128">Code 128</option>
        <option value="code39">Code 39</option>
        <option value="ean13">EAN-13</option>
        <option value="ean8">EAN-8</option>
        <option value="upca">UPC-A</option>
        <option value="qrcode">QR Code</option>
      </select>
      <label>平台</label>
      <select :value="element.platform" @change="handlePlatformChange">
        <option value="custom">自定义</option>
        <option value="amazon-fnsku">亚马逊 FNSKU</option>
        <option value="amazon-transparent">亚马逊透明计划</option>
        <option value="ebay">eBay</option>
        <option value="aliexpress">速卖通/Shopee</option>
      </select>
      <label>内容</label>
      <input type="text" :value="element.data" @input="update('data', ($event.target as HTMLInputElement).value)" />
    </div>
    <div class="prop-row">
      <label>
        <input type="checkbox" :checked="element.showText" @change="update('showText', ($event.target as HTMLInputElement).checked)" />
        显示文字
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BarcodeElement, BarcodePlatform } from '../../types'
import { useElementStore } from '../../store/element'
import { mmToPx } from '../../canvas/units'

const props = defineProps<{ element: BarcodeElement }>()
const elementStore = useElementStore()

function update(key: string, value: unknown) {
  elementStore.update(props.element.id, { [key]: value } as Partial<BarcodeElement>)
}

function handlePlatformChange(e: Event) {
  const platform = (e.target as HTMLSelectElement).value as BarcodePlatform
  const updates: Partial<BarcodeElement> = { platform }

  // Apply platform-specific presets
  switch (platform) {
    case 'amazon-fnsku':
      updates.barcodeType = 'code128'
      updates.width = mmToPx(57)
      updates.height = mmToPx(32)
      updates.showText = true
      break
    case 'amazon-transparent':
      updates.barcodeType = 'qrcode'
      updates.width = mmToPx(25)
      updates.height = mmToPx(25)
      updates.showText = false
      break
    case 'ebay':
      updates.barcodeType = 'ean13'
      updates.width = mmToPx(37)
      updates.height = mmToPx(25)
      updates.showText = true
      break
    case 'aliexpress':
      updates.barcodeType = 'code128'
      updates.width = mmToPx(40)
      updates.height = mmToPx(20)
      updates.showText = true
      break
  }

  elementStore.update(props.element.id, updates)
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
