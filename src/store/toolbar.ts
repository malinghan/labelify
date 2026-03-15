import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ToolType } from '../types'

export const useToolbarStore = defineStore('toolbar', () => {
  const activeTool = ref<ToolType>('select')

  function setTool(tool: ToolType) {
    activeTool.value = tool
  }

  return { activeTool, setTool }
})
