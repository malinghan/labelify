<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <div class="tabs">
          <button :class="{ active: tab === 'login' }" @click="tab = 'login'">登录</button>
          <button :class="{ active: tab === 'register' }" @click="tab = 'register'">注册</button>
        </div>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <div class="modal-body">
        <!-- Login -->
        <form v-if="tab === 'login'" @submit.prevent="doLogin">
          <div class="field">
            <label>邮箱</label>
            <input v-model="loginEmail" type="email" placeholder="your@email.com" autocomplete="email" />
          </div>
          <div class="field">
            <label>密码</label>
            <input v-model="loginPassword" type="password" placeholder="••••••" autocomplete="current-password" />
          </div>
          <div v-if="error" class="error">{{ error }}</div>
          <button type="submit" class="btn-primary">登录</button>
        </form>

        <!-- Register -->
        <form v-else @submit.prevent="doRegister">
          <div class="field">
            <label>用户名</label>
            <input v-model="regUsername" type="text" placeholder="你的昵称" autocomplete="username" />
          </div>
          <div class="field">
            <label>邮箱</label>
            <input v-model="regEmail" type="email" placeholder="your@email.com" autocomplete="email" />
          </div>
          <div class="field">
            <label>密码</label>
            <input v-model="regPassword" type="password" placeholder="至少 6 位" autocomplete="new-password" />
          </div>
          <div class="field">
            <label>确认密码</label>
            <input v-model="regConfirm" type="password" placeholder="再输一次" autocomplete="new-password" />
          </div>
          <div v-if="error" class="error">{{ error }}</div>
          <button type="submit" class="btn-primary">注册</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'

const emit = defineEmits<{ close: [] }>()
const authStore = useAuthStore()

const tab = ref<'login' | 'register'>('login')
const error = ref('')

const loginEmail = ref('')
const loginPassword = ref('')

const regUsername = ref('')
const regEmail = ref('')
const regPassword = ref('')
const regConfirm = ref('')

function doLogin() {
  error.value = ''
  const result = authStore.login(loginEmail.value, loginPassword.value)
  if (result.ok) emit('close')
  else error.value = result.error ?? '登录失败'
}

function doRegister() {
  error.value = ''
  if (regPassword.value !== regConfirm.value) { error.value = '两次密码不一致'; return }
  const result = authStore.register(regUsername.value, regEmail.value, regPassword.value)
  if (result.ok) emit('close')
  else error.value = result.error ?? '注册失败'
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.65);
  display: flex; align-items: center; justify-content: center; z-index: 2000;
}
.modal { background: #2c2c2c; border: 1px solid #444; border-radius: 10px; width: 340px; color: #e0e0e0; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px 0; }
.tabs { display: flex; gap: 4px; }
.tabs button { padding: 5px 16px; border-radius: 6px; font-size: 13px; color: #888; cursor: pointer; }
.tabs button.active { background: #1a73e8; color: #fff; }
.tabs button:hover:not(.active) { background: #3a3a3a; color: #fff; }
.close-btn { background: none; border: none; color: #666; cursor: pointer; font-size: 16px; padding: 2px 6px; }
.close-btn:hover { color: #fff; }
.modal-body { padding: 20px 20px 24px; }
form { display: flex; flex-direction: column; gap: 12px; }
.field { display: flex; flex-direction: column; gap: 4px; }
label { font-size: 12px; color: #aaa; }
input {
  background: #1e1e1e; border: 1px solid #3a3a3a; border-radius: 5px;
  color: #e0e0e0; padding: 7px 10px; font-size: 13px;
}
input:focus { outline: none; border-color: #1a73e8; }
.error { font-size: 12px; color: #e74c3c; }
.btn-primary {
  margin-top: 4px; padding: 8px; background: #1a73e8; color: #fff;
  border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 600;
}
.btn-primary:hover { background: #1557b0; }
</style>
