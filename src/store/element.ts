import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { LabelElement, HistoryEntry } from '../types'

const MAX_HISTORY = 50

export const useElementStore = defineStore('element', () => {
  const elements = ref<LabelElement[]>([])
  const past = ref<HistoryEntry[]>([])
  const future = ref<HistoryEntry[]>([])

  const sortedElements = computed(() =>
    [...elements.value].sort((a, b) => a.zIndex - b.zIndex),
  )

  function snapshot() {
    past.value.push({ elements: JSON.parse(JSON.stringify(elements.value)) })
    if (past.value.length > MAX_HISTORY) past.value.shift()
    future.value = []
  }

  function add(el: LabelElement) {
    snapshot()
    elements.value.push(el)
  }

  function remove(id: string) {
    snapshot()
    elements.value = elements.value.filter(e => e.id !== id)
  }

  function removeMany(ids: string[]) {
    snapshot()
    elements.value = elements.value.filter(e => !ids.includes(e.id))
  }

  function update(id: string, patch: Partial<LabelElement>) {
    snapshot()
    const idx = elements.value.findIndex(e => e.id === id)
    if (idx !== -1) {
      elements.value[idx] = { ...elements.value[idx], ...patch } as LabelElement
    }
  }

  function updateMany(patches: Record<string, Partial<LabelElement>>) {
    snapshot()
    for (const [id, patch] of Object.entries(patches)) {
      const idx = elements.value.findIndex(e => e.id === id)
      if (idx !== -1) {
        elements.value[idx] = { ...elements.value[idx], ...patch } as LabelElement
      }
    }
  }

  function bringForward(id: string) {
    snapshot()
    const el = elements.value.find(e => e.id === id)
    if (!el) return
    const above = elements.value
      .filter(e => e.zIndex > el.zIndex)
      .sort((a, b) => a.zIndex - b.zIndex)
    if (above.length > 0) {
      const tmp = el.zIndex
      el.zIndex = above[0].zIndex
      above[0].zIndex = tmp
    }
  }

  function sendBackward(id: string) {
    snapshot()
    const el = elements.value.find(e => e.id === id)
    if (!el) return
    const below = elements.value
      .filter(e => e.zIndex < el.zIndex)
      .sort((a, b) => b.zIndex - a.zIndex)
    if (below.length > 0) {
      const tmp = el.zIndex
      el.zIndex = below[0].zIndex
      below[0].zIndex = tmp
    }
  }

  function undo() {
    const entry = past.value.pop()
    if (!entry) return
    future.value.push({ elements: JSON.parse(JSON.stringify(elements.value)) })
    elements.value = entry.elements
  }

  function redo() {
    const entry = future.value.pop()
    if (!entry) return
    past.value.push({ elements: JSON.parse(JSON.stringify(elements.value)) })
    elements.value = entry.elements
  }

  function clear() {
    snapshot()
    elements.value = []
  }

  function loadSnapshot(els: LabelElement[]) {
    elements.value = JSON.parse(JSON.stringify(els))
    past.value = []
    future.value = []
  }

  return {
    elements,
    sortedElements,
    past,
    future,
    add,
    remove,
    removeMany,
    update,
    updateMany,
    bringForward,
    sendBackward,
    undo,
    redo,
    clear,
    loadSnapshot,
  }
})
