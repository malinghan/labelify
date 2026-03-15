import { watch } from 'vue'
import { useElementStore } from '../store/element'
import { useCanvasStore } from '../store/canvas'

const STORAGE_KEY = 'labelify_state'

export function useLocalStorage() {
  const elementStore = useElementStore()
  const canvasStore = useCanvasStore()

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        elements: elementStore.elements,
        labelSize: canvasStore.labelSize,
      }))
    } catch { /* quota exceeded, ignore */ }
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const data = JSON.parse(raw)
      if (data.elements) elementStore.loadSnapshot(data.elements)
      if (data.labelSize) canvasStore.setLabelSize(data.labelSize)
    } catch { /* corrupt data, ignore */ }
  }

  function startAutoSave() {
    watch(() => elementStore.elements, save, { deep: true })
    watch(() => canvasStore.labelSize, save, { deep: true })
  }

  return { save, load, startAutoSave }
}
