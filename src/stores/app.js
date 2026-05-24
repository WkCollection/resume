import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 全局加载状态
  const loading = ref(false)
  // 主题模式
  const theme = ref('light')

  function setLoading(val) {
    loading.value = val
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { loading, theme, setLoading, toggleTheme }
}, {
  persist: {
    key: 'zc_app',
    pick: ['theme']
  }
})
