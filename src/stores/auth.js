import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { encryptData, decryptData } from '@/utils/encrypt'
import { getStorageItem, setStorageItem } from '@/utils/storage'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const currentUser = ref(null)
  const isLoggedIn = ref(false)
  const guestId = ref(null)

  // 计算属性
  const isVip = computed(() => {
    if (!currentUser.value) return false
    const { membership } = currentUser.value
    return membership.level === 'vip' && new Date(membership.expireDate) > new Date()
  })

  const username = computed(() => currentUser.value?.nickname || currentUser.value?.username || '')

  const isGuest = computed(() => !isLoggedIn.value && !!guestId.value)

  const effectiveUserId = computed(() => currentUser.value?.id || guestId.value || null)

  // 初始化游客 ID
  function ensureGuest() {
    if (guestId.value) return guestId.value
    guestId.value = 'guest_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
    return guestId.value
  }

  // 清除游客 ID
  function clearGuest() {
    guestId.value = null
  }

  // 获取所有用户列表
  function getAllUsers() {
    const encrypted = getStorageItem('zc_users')
    if (!encrypted) return []
    return decryptData(encrypted) || []
  }

  // 保存用户列表
  function saveAllUsers(users) {
    setStorageItem('zc_users', encryptData(users))
  }

  // 注册
  function register({ username, password, nickname }) {
    const users = getAllUsers()
    // 检查用户名是否已存在
    if (users.find(u => u.username === username)) {
      return { success: false, message: '用户名已存在' }
    }
    // 创建新用户
    const newUser = {
      id: generateId(),
      username,
      password: encryptData(password),
      nickname: nickname || username,
      avatar: '',
      membership: { level: 'free', expireDate: '' },
      createdAt: new Date().toISOString(),
      preferences: { theme: 'light', language: 'zh-CN' }
    }
    users.push(newUser)
    saveAllUsers(users)
    // 自动登录
    currentUser.value = { ...newUser }
    isLoggedIn.value = true
    return { success: true, message: '注册成功' }
  }

  // 登录
  function login({ username, password }) {
    const users = getAllUsers()
    const user = users.find(u => u.username === username)
    if (!user) {
      return { success: false, message: '用户名不存在' }
    }
    const decryptedPwd = decryptData(user.password)
    if (decryptedPwd !== password) {
      return { success: false, message: '密码错误' }
    }
    currentUser.value = { ...user }
    isLoggedIn.value = true
    return { success: true, message: '登录成功' }
  }

  // 退出登录
  function logout() {
    currentUser.value = null
    isLoggedIn.value = false
  }

  // 更新用户信息
  function updateUser(updates) {
    if (!currentUser.value) return
    Object.assign(currentUser.value, updates)
    // 同步到用户列表
    const users = getAllUsers()
    const index = users.findIndex(u => u.id === currentUser.value.id)
    if (index !== -1) {
      users[index] = { ...currentUser.value }
      saveAllUsers(users)
    }
  }

  // 生成唯一 ID
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
  }

  return {
    currentUser,
    isLoggedIn,
    guestId,
    isVip,
    username,
    isGuest,
    effectiveUserId,
    ensureGuest,
    clearGuest,
    register,
    login,
    logout,
    updateUser
  }
}, {
  persist: {
    key: 'zc_auth',
    pick: ['currentUser', 'isLoggedIn', 'guestId']
  }
})
