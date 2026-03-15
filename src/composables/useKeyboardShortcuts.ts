import { onMounted, onUnmounted } from 'vue'
import { useToolbarStore } from '../store/toolbar'
import { useElementStore } from '../store/element'
import { useSelectionStore } from '../store/selection'
import type { ToolType } from '../types'

const keyToolMap: Record<string, ToolType> = {
  v: 'select',
  t: 'text',
  b: 'barcode',
  r: 'rect',
  i: 'image',
  l: 'line',
}

export function useKeyboardShortcuts() {
  const toolbar = useToolbarStore()
  const elementStore = useElementStore()
  const selectionStore = useSelectionStore()

  function onKeyDown(e: KeyboardEvent) {
    const tag = (e.target as HTMLElement).tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA') return

    // Tool switch
    const tool = keyToolMap[e.key.toLowerCase()]
    if (tool && !e.metaKey && !e.ctrlKey) {
      toolbar.setTool(tool)
      return
    }

    // Undo/Redo
    if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
      e.preventDefault()
      if (e.shiftKey) elementStore.redo()
      else elementStore.undo()
      return
    }

    if (e.ctrlKey && e.key === 'y') {
      e.preventDefault()
      elementStore.redo()
      return
    }

    // Delete selected
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (selectionStore.selectedIds.length > 0) {
        elementStore.removeMany(selectionStore.selectedIds)
        selectionStore.clearSelection()
      }
      return
    }

    // Copy
    if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
      const selected = elementStore.elements.filter(el =>
        selectionStore.selectedIds.includes(el.id),
      )
      if (selected.length > 0) selectionStore.copy(selected)
      return
    }

    // Paste
    if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
      const pasted = selectionStore.paste()
      for (const el of pasted) elementStore.add(el)
      selectionStore.selectMany(pasted.map(el => el.id))
      return
    }

    // Escape — back to select tool
    if (e.key === 'Escape') {
      toolbar.setTool('select')
      selectionStore.clearSelection()
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeyDown))
  onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
}
