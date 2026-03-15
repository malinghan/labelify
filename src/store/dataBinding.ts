import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DataBinding } from '../types'

export const useDataBindingStore = defineStore('dataBinding', () => {
  const bindings = ref<DataBinding>({})
  const previewMode = ref(false)

  function setBinding(key: string, value: string) {
    bindings.value = { ...bindings.value, [key]: value }
  }

  function removeBinding(key: string) {
    const next = { ...bindings.value }
    delete next[key]
    bindings.value = next
  }

  function setPreviewMode(val: boolean) {
    previewMode.value = val
  }

  function resolve(template: string): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => bindings.value[key] ?? `{{${key}}}`)
  }

  return { bindings, previewMode, setBinding, removeBinding, setPreviewMode, resolve }
})
