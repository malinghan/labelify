<template>
  <div class="editor-layout">
    <TopToolbar />
    <div class="editor-body">
      <LeftPanel />
      <CanvasArea />
      <RightPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopToolbar from './TopToolbar.vue'
import LeftPanel from './LeftPanel.vue'
import CanvasArea from './CanvasArea.vue'
import RightPanel from './RightPanel.vue'
import { useKeyboardShortcuts } from '../composables/useKeyboardShortcuts'

useKeyboardShortcuts()
</script>

<style scoped>
.editor-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.editor-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>
