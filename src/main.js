import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

// 创建 Pinia 实例并注册持久化插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 创建 Vue 应用实例
const app = createApp(App)

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册插件
app.use(pinia)
app.use(router)
app.use(ElementPlus, { locale: zhCn })

// 挂载应用
app.mount('#app')
