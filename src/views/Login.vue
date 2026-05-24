<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-primary-50">
    <div class="w-full max-w-md">
      <!-- 卡片 -->
      <div class="card p-8">
        <div class="text-center mb-8">
          <img src="/logo.svg" alt="职创在线" class="w-12 h-12 mx-auto mb-3" />
          <h2 class="text-2xl font-bold text-gray-900">
            {{ isLoginMode ? '欢迎回来' : '创建账号' }}
          </h2>
          <p class="text-sm text-gray-500 mt-2">
            {{ isLoginMode ? '登录你的职创在线账号' : '注册职创在线，开始制作简历' }}
          </p>
        </div>

        <!-- 表单 -->
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-position="top"
          size="large"
          @submit.prevent="handleSubmit"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="formData.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
            />
          </el-form-item>

          <el-form-item v-if="!isLoginMode" label="昵称" prop="nickname">
            <el-input
              v-model="formData.nickname"
              placeholder="请输入昵称（选填）"
            />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <el-form-item v-if="!isLoginMode" label="确认密码" prop="confirmPassword">
            <el-input
              v-model="formData.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <el-button
            type="primary"
            round
            class="w-full !mt-2"
            :loading="submitting"
            @click="handleSubmit"
          >
            {{ isLoginMode ? '登录' : '注册' }}
          </el-button>
        </el-form>

        <!-- 切换模式 -->
        <div class="text-center mt-6 text-sm text-gray-500">
          <span>{{ isLoginMode ? '还没有账号？' : '已有账号？' }}</span>
          <el-link type="primary" :underline="false" @click="toggleMode" class="ml-1">
            {{ isLoginMode ? '立即注册' : '去登录' }}
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useResumeStore } from '@/stores/resume'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const resumeStore = useResumeStore()

const formRef = ref(null)
const isLoginMode = ref(true)
const submitting = ref(false)

const formData = reactive({
  username: '',
  password: '',
  nickname: '',
  confirmPassword: ''
})

// 确认密码校验
const validateConfirmPassword = (rule, value, callback) => {
  if (!isLoginMode.value && value !== formData.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 30, message: '密码长度在 6 到 30 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

function toggleMode() {
  isLoginMode.value = !isLoginMode.value
  // 重置表单验证状态
  formRef.value?.resetFields()
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  try {
    let result
    if (isLoginMode.value) {
      result = authStore.login({
        username: formData.username,
        password: formData.password
      })
    } else {
      result = authStore.register({
        username: formData.username,
        password: formData.password,
        nickname: formData.nickname
      })
    }

    if (result.success) {
      // 迁移游客简历数据
      if (authStore.guestId) {
        resumeStore.migrateGuestResumes(authStore.currentUser.id)
        authStore.clearGuest()
      }
      ElMessage.success(result.message)
      // 跳转到之前的页面或控制台
      const redirect = route.query.redirect || '/dashboard'
      router.push(redirect)
    } else {
      ElMessage.error(result.message)
    }
  } finally {
    submitting.value = false
  }
}
</script>
