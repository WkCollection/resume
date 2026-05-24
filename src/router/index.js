import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// 路由配置
const routes = [
  {
    path: '/',
    component: () => import('@/components/layout/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页 - 职创在线' }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: { title: '登录注册 - 职创在线', guest: true }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: '简历仓库 - 职创在线', requiresAuth: true }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue'),
        meta: { title: '个人设置 - 职创在线', requiresAuth: true }
      },
      {
        path: 'editor/:id',
        name: 'Editor',
        component: () => import('@/views/Editor.vue'),
        meta: { title: '编辑简历 - 职创在线', requiresAuth: true }
      },
      {
        path: 'preview/:id',
        name: 'Preview',
        component: () => import('@/views/Preview.vue'),
        meta: { title: '预览简历 - 职创在线', requiresAuth: true }
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '页面不存在 - 职创在线' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || '职创在线 - 专业简历制作平台'

  const authStore = useAuthStore()

  // 需要登录的页面
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  // 已登录用户不能访问游客页面（如登录页）
  if (to.meta.guest && authStore.isLoggedIn) {
    next({ name: 'Dashboard' })
    return
  }

  next()
})

export default router
