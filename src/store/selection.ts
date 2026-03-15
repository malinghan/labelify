import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LabelElement } from '../types'

export const useSelectionStore = defineStore('selection', () => {
  const selectedIds = ref<string[]>([])
  const hoveredId = ref<string | null>(null)
  const isDragging = ref(false)
  const resizingHandle = ref<string | null>(null)
  const clipboard = ref<LabelElement[]>([])

  function select(id: string) {
    selectedIds.value = [id]
  }

  function selectMany(ids: string[]) {
    selectedIds.value = ids
  }

  function toggleSelect(id: string) {
    const idx = selectedIds.value.indexOf(id)
    if (idx === -1) selectedIds.value = [...selectedIds.value, id]
    else selectedIds.value = selectedIds.value.filter(i => i !== id)
  }

  function clearSelection() {
    selectedIds.value = []
  }

  function setHovered(id: string | null) {
    hoveredId.value = id
  }

  function copy(elements: LabelElement[]) {
    clipboard.value = JSON.parse(JSON.stringify(elements))
  }

  function paste(): LabelElement[] {
    return clipboard.value.map(el => ({
      ...el,
      id: crypto.randomUUID(),
      x: el.x + 10,
      y: el.y + 10,
    }))
  }

  return {
    selectedIds,
    hoveredId,
    isDragging,
    resizingHandle,
    clipboard,
    select,
    selectMany,
    toggleSelect,
    clearSelection,
    setHovered,
    copy,
    paste,
  }
})
