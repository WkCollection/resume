<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader v-if="!hideLayout" />
    <main class="flex-1">
      <router-view />
    </main>
    <AppFooter v-if="!hideLayout" />

    <!-- 返回顶部 -->
    <transition name="fade">
      <div
        v-if="showBackTop && !hideLayout"
        class="fixed bottom-8 right-8 z-50"
      >
        <el-tooltip content="返回顶部" placement="left">
          <el-button
            circle
            size="large"
            class="!w-10 !h-10 shadow-lg !bg-white !border-gray-200 hover:!bg-primary-50 hover:!border-primary-300 hover:!text-primary-600"
            @click="scrollToTop"
          >
            <el-icon :size="18"><Top /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Top } from '@element-plus/icons-vue'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'

const route = useRoute()
const hideLayout = computed(() => route.meta.noLayout)

const showBackTop = ref(false)

function handleScroll() {
  showBackTop.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
