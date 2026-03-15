import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LabelElement, LabelSize } from '../types'

export interface Template {
  id: string
  name: string
  category: string
  size: LabelSize
  elements: LabelElement[]
}

export const useTemplateStore = defineStore('template', () => {
  const templates = ref<Template[]>([])

  function loadBuiltins(list: Template[]) {
    templates.value = list
  }

  return { templates, loadBuiltins }
})
