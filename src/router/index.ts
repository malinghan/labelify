import { createRouter, createWebHashHistory } from 'vue-router'
import TemplateGallery from '../pages/TemplateGallery.vue'
import EditorPage from '../pages/EditorPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: TemplateGallery },
    { path: '/editor', component: EditorPage },
  ],
})

export default router
