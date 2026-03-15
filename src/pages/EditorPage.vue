<template>
  <div style="width:100%;height:100vh;display:flex;flex-direction:column;">
    <div class="editor-back">
      <button @click="router.push('/')">← 模板库</button>
    </div>
    <EditorLayout style="flex:1;overflow:hidden;" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EditorLayout from '../components/EditorLayout.vue'
import { useLocalStorage } from '../composables/useLocalStorage'

const router = useRouter()
const { load, startAutoSave } = useLocalStorage()

onMounted(() => {
  load()
  startAutoSave()
})
</script>

<style scoped>
.editor-back {
  background: #1e1e1e;
  border-bottom: 1px solid #111;
  padding: 4px 8px;
  flex-shrink: 0;
}
.editor-back button {
  font-size: 12px;
  color: #888;
  padding: 2px 8px;
  border-radius: 3px;
  cursor: pointer;
}
.editor-back button:hover { background: #2a2a2a; color: #fff; }
</style>
