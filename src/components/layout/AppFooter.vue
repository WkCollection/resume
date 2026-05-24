<template>
  <footer class="bg-gray-900 text-gray-400 mt-auto">
    <div class="container-app py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 品牌信息 -->
        <div class="md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <el-icon :size="24" class="text-primary-400"><Document /></el-icon>
            <span class="text-lg font-bold text-white">职创在线</span>
          </div>
          <p class="text-sm leading-relaxed max-w-md">
            专业在线简历制作平台，提供多行业商用模板、可视化编辑器、高清PDF导出，
            助您打造完美简历，提升求职竞争力。
          </p>
        </div>

        <!-- 快捷链接 -->
        <div>
          <h4 class="text-white font-medium mb-4">快捷入口</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/" class="hover:text-white transition-colors no-underline text-gray-400">首页</router-link></li>
            <li><router-link to="/dashboard" class="hover:text-white transition-colors no-underline text-gray-400">开始制作</router-link></li>
            <li><router-link to="/login" class="hover:text-white transition-colors no-underline text-gray-400">登录注册</router-link></li>
          </ul>
        </div>

        <!-- 关于 -->
        <div>
          <h4 class="text-white font-medium mb-4">关于我们</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="javascript:void(0)" class="hover:text-white transition-colors no-underline text-gray-400">用户服务协议</a></li>
            <li><a href="javascript:void(0)" class="hover:text-white transition-colors no-underline text-gray-400">隐私政策</a></li>
            <li><a href="javascript:void(0)" class="hover:text-white transition-colors no-underline text-gray-400">会员权益说明</a></li>
          </ul>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p>&copy; {{ currentYear }} 职创在线. All rights reserved.</p>
        <p class="mt-2 sm:mt-0">本平台所有模板仅供本系统商用，禁止私自盗用</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
