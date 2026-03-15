<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <span>打印设置</span>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <div class="modal-body">
        <div class="prop-grid">
          <label>纸张</label>
          <select :value="s.paperSize" @change="update('paperSize', ($event.target as HTMLSelectElement).value)">
            <option value="A4">A4</option>
            <option value="A5">A5</option>
            <option value="Letter">Letter</option>
          </select>

          <label>方向</label>
          <select :value="s.orientation" @change="update('orientation', ($event.target as HTMLSelectElement).value)">
            <option value="portrait">纵向</option>
            <option value="landscape">横向</option>
          </select>

          <label>列数</label>
          <input type="number" :value="s.cols" @change="update('cols', +($event.target as HTMLInputElement).value)" min="1" max="10" />

          <label>行数</label>
          <input type="number" :value="s.rows" @change="update('rows', +($event.target as HTMLInputElement).value)" min="1" max="20" />

          <label>上边距</label>
          <input type="number" :value="s.marginTopMm" @change="update('marginTopMm', +($event.target as HTMLInputElement).value)" min="0" />

          <label>下边距</label>
          <input type="number" :value="s.marginBottomMm" @change="update('marginBottomMm', +($event.target as HTMLInputElement).value)" min="0" />

          <label>左边距</label>
          <input type="number" :value="s.marginLeftMm" @change="update('marginLeftMm', +($event.target as HTMLInputElement).value)" min="0" />

          <label>右边距</label>
          <input type="number" :value="s.marginRightMm" @change="update('marginRightMm', +($event.target as HTMLInputElement).value)" min="0" />
        </div>

        <div class="prop-row">
          <label>
            <input type="checkbox" :checked="s.showCutLines" @change="update('showCutLines', ($event.target as HTMLInputElement).checked)" />
            显示裁切线
          </label>
        </div>

        <div class="info">每页共 {{ s.cols * s.rows }} 个标签</div>
      </div>

      <div class="modal-footer">
        <button class="btn-secondary" @click="$emit('close')">取消</button>
        <button class="btn-primary" @click="doPrint">打印</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePrintStore } from '../store/print'
import { usePrint } from '../composables/usePrint'

const emit = defineEmits<{ close: [] }>()
const printStore = usePrintStore()
const { print } = usePrint()
const s = computed(() => printStore.settings)

function update(key: string, value: unknown) {
  printStore.update({ [key]: value } as Parameters<typeof printStore.update>[0])
}

function doPrint() {
  print()
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #2c2c2c;
  border: 1px solid #444;
  border-radius: 8px;
  width: 320px;
  color: #e0e0e0;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #3a3a3a;
  font-size: 14px;
  font-weight: 600;
}
.close-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 6px;
}
.close-btn:hover { color: #fff; }
.modal-body { padding: 16px; }
.prop-grid {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 6px;
  align-items: center;
  margin-bottom: 12px;
}
label { font-size: 12px; color: #aaa; display: flex; align-items: center; gap: 4px; }
input, select {
  width: 100%;
  background: #1e1e1e;
  border: 1px solid #3a3a3a;
  border-radius: 3px;
  color: #e0e0e0;
  padding: 4px 6px;
  font-size: 12px;
}
input:focus, select:focus { outline: none; border-color: #1a73e8; }
.prop-row { margin-bottom: 10px; }
.info { font-size: 11px; color: #666; }
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #3a3a3a;
}
.btn-primary {
  padding: 6px 16px;
  background: #1a73e8;
  color: #fff;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}
.btn-primary:hover { background: #1557b0; }
.btn-secondary {
  padding: 6px 16px;
  background: #3a3a3a;
  color: #ccc;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}
.btn-secondary:hover { background: #444; }
</style>
