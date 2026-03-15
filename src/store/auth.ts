import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types'

interface StoredUser extends User {
  passwordHash: string
}

interface Session {
  userId: string
  token: string
  expiresAt: number
}

const USERS_KEY = 'labelify_users'
const SESSION_KEY = 'labelify_session'
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000

const AVATAR_COLORS = ['#e74c3c','#e67e22','#f1c40f','#2ecc71','#1abc9c','#3498db','#9b59b6','#e91e63']

function hashPassword(email: string, password: string): string {
  return btoa(email.toLowerCase() + ':' + password)
}

function loadUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]') } catch { return [] }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  function restoreSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      if (!raw) return
      const session: Session = JSON.parse(raw)
      if (Date.now() > session.expiresAt) { localStorage.removeItem(SESSION_KEY); return }
      const users = loadUsers()
      const stored = users.find(u => u.id === session.userId)
      if (!stored) return
      const { passwordHash: _, ...u } = stored
      user.value = u
      token.value = session.token
    } catch { /* ignore */ }
  }

  function register(username: string, email: string, password: string): { ok: boolean; error?: string } {
    if (!username.trim()) return { ok: false, error: '用户名不能为空' }
    if (!email.includes('@')) return { ok: false, error: '邮箱格式不正确' }
    if (password.length < 6) return { ok: false, error: '密码至少 6 位' }
    const users = loadUsers()
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: '该邮箱已注册' }
    }
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      username: username.trim(),
      email: email.toLowerCase(),
      createdAt: Date.now(),
      avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      passwordHash: hashPassword(email, password),
    }
    saveUsers([...users, newUser])
    return _startSession(newUser)
  }

  function login(email: string, password: string): { ok: boolean; error?: string } {
    const users = loadUsers()
    const stored = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!stored) return { ok: false, error: '邮箱未注册' }
    if (stored.passwordHash !== hashPassword(email, password)) return { ok: false, error: '密码错误' }
    return _startSession(stored)
  }

  function _startSession(stored: StoredUser): { ok: boolean } {
    const { passwordHash: _, ...u } = stored
    user.value = u
    token.value = crypto.randomUUID()
    const session: Session = { userId: u.id, token: token.value, expiresAt: Date.now() + SESSION_TTL }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    return { ok: true }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem(SESSION_KEY)
  }

  return { user, token, isLoggedIn, register, login, logout, restoreSession }
})
