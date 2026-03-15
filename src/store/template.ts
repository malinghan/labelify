import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { LabelElement, LabelSize } from '../types'
import { useAuthStore } from './auth'

export interface Template {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  size: LabelSize
  elements: LabelElement[]
  thumbnail?: string
  isBuiltin: boolean
  authorId?: string
  createdAt: number
  updatedAt: number
}

const USER_TEMPLATES_KEY = 'labelify_user_templates'

function loadUserTemplates(): Template[] {
  try { return JSON.parse(localStorage.getItem(USER_TEMPLATES_KEY) ?? '[]') } catch { return [] }
}

function persistUserTemplates(list: Template[]) {
  try { localStorage.setItem(USER_TEMPLATES_KEY, JSON.stringify(list)) } catch { /* quota */ }
}

export const useTemplateStore = defineStore('template', () => {
  const builtins = ref<Template[]>([])
  const userTemplates = ref<Template[]>(loadUserTemplates())

  const templates = computed(() => [...builtins.value, ...userTemplates.value])

  function loadBuiltins(list: Template[]) {
    builtins.value = list
  }

  function saveUserTemplate(tpl: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>): Template {
    const authStore = useAuthStore()
    const now = Date.now()
    const saved: Template = {
      ...tpl,
      id: crypto.randomUUID(),
      authorId: authStore.user?.id,
      createdAt: now,
      updatedAt: now,
    }
    userTemplates.value = [saved, ...userTemplates.value]
    persistUserTemplates(userTemplates.value)
    return saved
  }

  function deleteUserTemplate(id: string) {
    userTemplates.value = userTemplates.value.filter(t => t.id !== id)
    persistUserTemplates(userTemplates.value)
  }

  function updateUserTemplate(id: string, patch: Partial<Template>) {
    userTemplates.value = userTemplates.value.map(t =>
      t.id === id ? { ...t, ...patch, updatedAt: Date.now() } : t
    )
    persistUserTemplates(userTemplates.value)
  }

  return { templates, builtins, userTemplates, loadBuiltins, saveUserTemplate, deleteUserTemplate, updateUserTemplate }
})
