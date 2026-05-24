<template>
  <header class="bg-white border-b border-gray-100 sticky top-0 z-50">
    <div class="container-app">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 no-underline">
          <img src="/logo.svg" alt="职创在线" class="w-8 h-8" />
          <span class="text-xl font-bold text-gray-900">职创在线</span>
        </router-link>

        <!-- 桌面端导航 -->
        <nav class="hidden md:flex items-center space-x-6">
          <a
            v-for="item in navItems"
            :key="item.label"
            class="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors no-underline cursor-pointer flex items-center gap-1"
            :class="{ 'text-primary-600': $route.path === item.path && !item.hash }"
            @click="handleNav(item)"
          >
            <el-icon :size="16"><component :is="item.icon" /></el-icon>
            {{ item.label }}
          </a>
        </nav>

        <!-- 用户区域 -->
        <div class="flex items-center space-x-4">
          <template v-if="authStore.isLoggedIn">
            <el-dropdown trigger="click">
              <span class="flex items-center space-x-2 cursor-pointer">
                <el-avatar :size="32" class="bg-primary-100 text-primary-600">
                  {{ authStore.username?.charAt(0) }}
                </el-avatar>
                <span class="hidden sm:inline text-sm font-medium text-gray-700">
                  {{ authStore.username }}
                </span>
                <el-tag v-if="authStore.isVip" type="warning" size="small" effect="dark" class="ml-1">VIP</el-tag>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/dashboard')">
                    <el-icon><FolderOpened /></el-icon>简历仓库
                  </el-dropdown-item>
                  <el-dropdown-item @click="$router.push('/settings')">
                    <el-icon><Setting /></el-icon>个人设置
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">
                    <el-icon><SwitchButton /></el-icon>退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <router-link to="/login">
              <el-button type="primary" round>登录 / 注册</el-button>
            </router-link>
          </template>

          <!-- 移动端菜单按钮 -->
          <el-button
            class="md:hidden"
            :icon="Expand"
            circle
            size="small"
            @click="showMobileMenu = !showMobileMenu"
          />
        </div>
      </div>

      <!-- 移动端导航菜单 -->
      <transition name="slide">
        <div v-if="showMobileMenu" class="md:hidden pb-4 border-t border-gray-100">
          <nav class="flex flex-col space-y-1 pt-2">
            <a
              v-for="item in navItems"
              :key="item.label"
              class="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary-600 no-underline cursor-pointer flex items-center gap-2"
              @click="handleNav(item)"
            >
              <el-icon :size="16"><component :is="item.icon" /></el-icon>
              {{ item.label }}
            </a>
          </nav>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Expand } from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()
const showMobileMenu = ref(false)

const navItems = [
  { label: '首页', path: '/', icon: 'House' },
  { label: '模板中心', path: '/', hash: '#templates', icon: 'Notebook' },
  { label: '开始制作', path: '/dashboard', icon: 'Edit' }
]

function handleNav(item) {
  if (item.hash) {
    if (router.currentRoute.value.path !== item.path) {
      router.push(item.path)
      setTimeout(() => {
        const el = document.getElementById('templates')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      const el = document.getElementById('templates')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    router.push(item.path)
  }
  showMobileMenu.value = false
}

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
