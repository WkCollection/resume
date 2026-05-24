<template>
  <footer class="bg-gray-900 text-gray-400 mt-auto">
    <div class="container-app py-12">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
        <!-- 品牌信息 -->
        <div class="md:col-span-5">
          <div class="flex items-center space-x-2 mb-4">
            <img src="/logo.svg" alt="职创在线" class="w-8 h-8 brightness-0 invert" />
            <span class="text-xl font-bold text-white">职创在线</span>
          </div>
          <p class="text-sm leading-relaxed max-w-sm text-gray-500">
            专业在线简历制作平台，提供多行业商用模板、可视化编辑器、高清PDF导出，助您打造完美简历。
          </p>
          <div class="flex items-center gap-4 mt-5 text-xs text-gray-600">
            <span>v{{ siteConfig.version }}</span>
            <span class="w-px h-3 bg-gray-700"></span>
            <span>数据本地存储</span>
            <span class="w-px h-3 bg-gray-700"></span>
            <span>无需安装</span>
          </div>
        </div>

        <!-- 产品服务 -->
        <div class="md:col-span-3">
          <h4 class="text-white font-medium mb-4 text-sm">产品服务</h4>
          <ul class="space-y-2.5 text-sm">
            <li><router-link to="/#templates" class="hover:text-white transition-colors no-underline text-gray-500">模板中心</router-link></li>
            <li><router-link to="/dashboard" class="hover:text-white transition-colors no-underline text-gray-500">开始制作</router-link></li>
            <li><a href="javascript:void(0)" class="hover:text-white transition-colors no-underline text-gray-500">会员权益</a></li>
          </ul>
        </div>

        <!-- 关于 -->
        <div class="md:col-span-4">
          <h4 class="text-white font-medium mb-4 text-sm">关于我们</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="javascript:void(0)" class="hover:text-white transition-colors no-underline text-gray-500">用户服务协议</a></li>
            <li><a href="javascript:void(0)" class="hover:text-white transition-colors no-underline text-gray-500">隐私政策</a></li>
            <li><a href="javascript:void(0)" class="hover:text-white transition-colors no-underline text-gray-500">帮助与反馈</a></li>
          </ul>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="border-t border-gray-800 mt-10 pt-6 flex flex-col items-center text-xs text-gray-600">
        <p>&copy; {{ currentYear }} 职创在线. All rights reserved.</p>
        <p class="mt-1.5">本平台所有模板仅供本系统商用，禁止私自盗用</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { siteConfig } from '@/config/site'

const currentYear = new Date().getFullYear()
</script>
