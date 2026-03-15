<template>
  <div class="gallery-page">
    <!-- Header -->
    <header class="gallery-header">
      <div class="header-left">
        <h1>Labelify</h1>
        <p>跨境电商标签设计器</p>
      </div>
      <div class="header-right">
        <button class="btn-new" @click="goEditor">+ 新建空白标签</button>
        <template v-if="authStore.isLoggedIn">
          <UserAvatar />
        </template>
        <template v-else>
          <button class="btn-login" @click="showAuth = true">登录 / 注册</button>
        </template>
      </div>
    </header>

    <div class="gallery-body">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-title">分类</div>
          <button
            v-for="cat in categories"
            :key="cat"
            class="sidebar-item"
            :class="{ active: activeCategory === cat }"
            @click="selectCategory(cat)"
          >{{ cat }}</button>
        </div>
        <div v-if="allTags.length" class="sidebar-section">
          <div class="sidebar-title">标签</div>
          <div class="tag-cloud">
            <span
              v-for="tag in allTags"
              :key="tag"
              class="tag"
              :class="{ active: activeTag === tag }"
              @click="toggleTag(tag)"
            >{{ tag }}</span>
          </div>
        </div>
      </aside>

      <!-- Main -->
      <main class="main-area">
        <div class="toolbar-row">
          <input v-model="search" class="search-input" placeholder="搜索模板名称或描述…" />
          <span class="result-count">{{ filteredTemplates.length }} 个模板</span>
        </div>

        <div v-if="filteredTemplates.length === 0" class="empty-state">
          <p>没有找到匹配的模板</p>
        </div>

        <div class="template-grid">
          <div
            v-for="tpl in filteredTemplates"
            :key="tpl.id"
            class="template-card"
          >
            <div class="card-preview" @click="openPreview(tpl)">
              <img v-if="tpl.thumbnail" :src="tpl.thumbnail" class="thumb-img" />
              <canvas v-else :ref="el => registerCanvas(tpl.id, el as HTMLCanvasElement)" width="200" height="130" />
            </div>
            <div class="card-info">
              <div class="card-name">{{ tpl.name }}</div>
              <div class="card-desc">{{ tpl.description }}</div>
              <div class="card-meta">
                <span class="badge">{{ tpl.size.widthMm }}×{{ tpl.size.heightMm }}mm</span>
                <span class="badge cat">{{ tpl.category }}</span>
              </div>
            </div>
            <div class="card-actions">
              <button class="btn-use" @click="loadTemplate(tpl)">使用模板</button>
              <button class="btn-preview" @click="openPreview(tpl)">预览</button>
              <button v-if="canDelete(tpl)" class="btn-delete" @click.stop="deleteTemplate(tpl.id)" title="删除">✕</button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <TemplatePreviewModal v-if="previewTpl" :tpl="previewTpl" @close="previewTpl = null" />
    <AuthModal v-if="showAuth" @close="showAuth = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useElementStore } from '../store/element'
import { useCanvasStore } from '../store/canvas'
import { useTemplateStore } from '../store/template'
import { useAuthStore } from '../store/auth'
import type { Template } from '../store/template'
import { BUILTIN_TEMPLATES } from '../data/templates/builtins'
import { renderFrame } from '../canvas/render'
import TemplatePreviewModal from '../components/TemplatePreviewModal.vue'
import AuthModal from '../components/AuthModal.vue'
import UserAvatar from '../components/UserAvatar.vue'

const router = useRouter()
const elementStore = useElementStore()
const canvasStore = useCanvasStore()
const templateStore = useTemplateStore()
const authStore = useAuthStore()

const activeCategory = ref('全部')
const activeTag = ref('')
const search = ref('')
const previewTpl = ref<Template | null>(null)
const showAuth = ref(false)
const canvasRefs = new Map<string, HTMLCanvasElement>()

const categories = computed(() => {
  const cats = [...new Set(templateStore.templates.map(t => t.category))]
  const result = ['全部', ...cats]
  if (authStore.isLoggedIn && templateStore.userTemplates.some(t => t.authorId === authStore.user?.id)) {
    result.push('我的模板')
  }
  return result
})

const allTags = computed(() => {
  const set = new Set<string>()
  for (const t of templateStore.templates) t.tags.forEach(tag => set.add(tag))
  return [...set].slice(0, 20)
})

const filteredTemplates = computed(() => {
  let list = templateStore.templates
  if (activeCategory.value === '我的模板') {
    list = list.filter(t => t.authorId === authStore.user?.id)
  } else if (activeCategory.value !== '全部') {
    list = list.filter(t => t.category === activeCategory.value)
  }
  if (activeTag.value) {
    list = list.filter(t => t.tags.includes(activeTag.value))
  }
  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase()
    list = list.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
  }
  return list
})

function selectCategory(cat: string) {
  activeCategory.value = cat
  activeTag.value = ''
}

function toggleTag(tag: string) {
  activeTag.value = activeTag.value === tag ? '' : tag
}

function registerCanvas(id: string, el: HTMLCanvasElement | null) {
  if (el) canvasRefs.set(id, el)
}

function renderPreviews() {
  for (const tpl of filteredTemplates.value) {
    if (tpl.thumbnail) continue
    const canvas = canvasRefs.get(tpl.id)
    if (!canvas) continue
    const ctx = canvas.getContext('2d')
    if (!ctx) continue
    const scale = Math.min(200 / (tpl.size.widthMm * 3.7795), 130 / (tpl.size.heightMm * 3.7795))
    renderFrame({ ctx, elements: tpl.elements, viewport: { x: 0, y: 0, zoom: scale }, labelSize: tpl.size, selectedIds: [], hoveredId: null, bindings: {}, previewMode: false })
  }
}

function loadTemplate(tpl: Template) {
  elementStore.loadSnapshot(tpl.elements)
  canvasStore.setLabelSize(tpl.size)
  router.push('/editor')
}

function openPreview(tpl: Template) {
  previewTpl.value = tpl
}

function canDelete(tpl: Template) {
  return !tpl.isBuiltin && authStore.isLoggedIn && tpl.authorId === authStore.user?.id
}

function deleteTemplate(id: string) {
  if (confirm('删除这个模板？')) templateStore.deleteUserTemplate(id)
}

function goEditor() {
  router.push('/editor')
}

watch(filteredTemplates, () => nextTick(renderPreviews))

onMounted(() => {
  templateStore.loadBuiltins(BUILTIN_TEMPLATES)
  nextTick(renderPreviews)
})
</script>

<style scoped>
.gallery-page { min-height: 100vh; background: #1a1a1a; color: #e0e0e0; display: flex; flex-direction: column; }

.gallery-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 24px; border-bottom: 1px solid #2a2a2a; flex-shrink: 0;
}
.header-left h1 { font-size: 22px; font-weight: 700; color: #fff; margin: 0 0 2px; }
.header-left p { font-size: 12px; color: #666; margin: 0; }
.header-right { display: flex; align-items: center; gap: 10px; }
.btn-new { padding: 7px 16px; background: #1a73e8; color: #fff; border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 600; }
.btn-new:hover { background: #1557b0; }
.btn-login { padding: 7px 16px; background: #2a2a2a; border: 1px solid #3a3a3a; color: #ccc; border-radius: 6px; font-size: 13px; cursor: pointer; }
.btn-login:hover { background: #3a3a3a; color: #fff; }

.gallery-body { display: flex; flex: 1; overflow: hidden; }

.sidebar { width: 200px; flex-shrink: 0; border-right: 1px solid #2a2a2a; padding: 16px 0; overflow-y: auto; }
.sidebar-section { margin-bottom: 20px; }
.sidebar-title { font-size: 10px; font-weight: 700; color: #555; text-transform: uppercase; letter-spacing: 0.8px; padding: 0 16px 6px; }
.sidebar-item { display: block; width: 100%; text-align: left; padding: 7px 16px; font-size: 13px; color: #aaa; cursor: pointer; border-radius: 0; }
.sidebar-item:hover { background: #2a2a2a; color: #fff; }
.sidebar-item.active { background: #1a3a6a; color: #4a9eff; font-weight: 600; }
.tag-cloud { padding: 0 12px; display: flex; flex-wrap: wrap; gap: 5px; }
.tag { padding: 3px 8px; background: #2a2a2a; border: 1px solid #3a3a3a; border-radius: 10px; font-size: 11px; color: #888; cursor: pointer; }
.tag:hover { border-color: #555; color: #ccc; }
.tag.active { background: #1a3a6a; border-color: #1a73e8; color: #4a9eff; }

.main-area { flex: 1; overflow-y: auto; padding: 16px 20px; }
.toolbar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.search-input { flex: 1; max-width: 320px; background: #2a2a2a; border: 1px solid #3a3a3a; border-radius: 6px; color: #e0e0e0; padding: 7px 12px; font-size: 13px; }
.search-input:focus { outline: none; border-color: #1a73e8; }
.result-count { font-size: 12px; color: #555; }

.empty-state { text-align: center; padding: 60px 0; color: #555; font-size: 14px; }

.template-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }

.template-card {
  background: #2a2a2a; border: 1px solid #3a3a3a; border-radius: 8px;
  overflow: hidden; transition: border-color 0.15s, transform 0.1s;
  display: flex; flex-direction: column;
}
.template-card:hover { border-color: #1a73e8; transform: translateY(-2px); }

.card-preview {
  background: #e8e8e8; height: 130px; display: flex;
  align-items: center; justify-content: center; overflow: hidden; cursor: pointer;
}
.card-preview canvas, .thumb-img { max-width: 100%; max-height: 100%; object-fit: contain; }

.card-info { padding: 10px 12px; flex: 1; }
.card-name { font-size: 13px; color: #e0e0e0; font-weight: 600; margin-bottom: 3px; }
.card-desc { font-size: 11px; color: #777; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.card-meta { display: flex; gap: 4px; flex-wrap: wrap; }
.badge { padding: 2px 6px; background: #333; border-radius: 4px; font-size: 10px; color: #888; }
.badge.cat { background: #1a3a6a; color: #4a9eff; }

.card-actions { display: flex; gap: 4px; padding: 8px 10px; border-top: 1px solid #333; }
.btn-use { flex: 1; padding: 5px; background: #1a73e8; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer; font-weight: 600; }
.btn-use:hover { background: #1557b0; }
.btn-preview { padding: 5px 10px; background: #333; color: #ccc; border-radius: 4px; font-size: 12px; cursor: pointer; }
.btn-preview:hover { background: #444; }
.btn-delete { padding: 5px 8px; background: #3a1a1a; color: #e74c3c; border-radius: 4px; font-size: 12px; cursor: pointer; }
.btn-delete:hover { background: #5a2a2a; }
</style>
