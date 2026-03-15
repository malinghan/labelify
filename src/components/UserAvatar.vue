<template>
  <div class="avatar-wrap" ref="wrapRef">
    <button class="avatar" :style="{ background: authStore.user!.avatarColor }" @click="open = !open">
      {{ initial }}
    </button>
    <div v-if="open" class="dropdown">
      <div class="user-info">
        <div class="uname">{{ authStore.user!.username }}</div>
        <div class="uemail">{{ authStore.user!.email }}</div>
      </div>
      <div class="divider" />
      <button class="logout-btn" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()
const open = ref(false)
const wrapRef = ref<HTMLElement | null>(null)

const initial = computed(() => authStore.user?.username?.[0]?.toUpperCase() ?? '?')

function logout() {
  authStore.logout()
  open.value = false
}

function onClickOutside(e: MouseEvent) {
  if (wrapRef.value && !wrapRef.value.contains(e.target as Node)) open.value = false
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<style scoped>
.avatar-wrap { position: relative; }
.avatar {
  width: 28px; height: 28px; border-radius: 50%; color: #fff;
  font-size: 12px; font-weight: 700; cursor: pointer; border: none;
  display: flex; align-items: center; justify-content: center;
}
.avatar:hover { opacity: 0.85; }
.dropdown {
  position: absolute; right: 0; top: 34px; background: #2c2c2c;
  border: 1px solid #444; border-radius: 8px; min-width: 180px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.4); z-index: 1000; overflow: hidden;
}
.user-info { padding: 12px 14px; }
.uname { font-size: 13px; color: #e0e0e0; font-weight: 600; }
.uemail { font-size: 11px; color: #888; margin-top: 2px; }
.divider { height: 1px; background: #3a3a3a; }
.logout-btn { width: 100%; padding: 10px 14px; text-align: left; font-size: 13px; color: #e0e0e0; cursor: pointer; }
.logout-btn:hover { background: #3a3a3a; }
</style>
