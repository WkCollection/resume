<template>
  <div class="container-app py-8 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 mb-8">个人设置</h1>

    <!-- 个人信息 -->
    <div class="card p-6 mb-6">
      <h2 class="text-base font-semibold text-gray-900 mb-4">个人信息</h2>
      <div class="flex items-center space-x-4 mb-6">
        <el-avatar :size="64" class="bg-primary-100 text-primary-600 text-2xl">
          {{ authStore.username?.charAt(0) }}
        </el-avatar>
        <div>
          <p class="font-medium text-gray-900">{{ authStore.username }}</p>
          <p class="text-sm text-gray-400">{{ authStore.currentUser?.username }}</p>
        </div>
      </div>
      <el-form label-position="top">
        <el-form-item label="昵称">
          <el-input v-model="nickname" placeholder="输入昵称" />
        </el-form-item>
        <el-button type="primary" size="small" @click="handleSaveNickname">保存昵称</el-button>
      </el-form>
    </div>

    <!-- 会员状态 -->
    <div class="card p-6 mb-6">
      <h2 class="text-base font-semibold text-gray-900 mb-4">会员状态</h2>
      <div class="flex items-center justify-between p-4 rounded-lg" :class="authStore.isVip ? 'bg-amber-50' : 'bg-gray-50'">
        <div>
          <div class="flex items-center gap-2">
            <el-tag v-if="authStore.isVip" type="warning" effect="dark">VIP 会员</el-tag>
            <el-tag v-else effect="plain">免费版</el-tag>
          </div>
          <p v-if="authStore.isVip && authStore.currentUser?.membership?.expireDate" class="text-sm text-gray-500 mt-2">
            到期时间：{{ formatDate(authStore.currentUser.membership.expireDate) }}
          </p>
        </div>
        <el-button v-if="!authStore.isVip" type="primary" round size="small" @click="showVipDialog = true">
          升级 VIP
        </el-button>
        <el-button v-else type="warning" round size="small" plain>续费</el-button>
      </div>
    </div>

    <!-- 数据管理 -->
    <div class="card p-6 mb-6">
      <h2 class="text-base font-semibold text-gray-900 mb-4">数据管理</h2>
      <p class="text-sm text-gray-500 mb-4">所有数据存储在浏览器本地，建议定期备份以防丢失。</p>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-700">备份数据</p>
            <p class="text-xs text-gray-400">导出所有简历数据为 JSON 文件</p>
          </div>
          <el-button size="small" @click="handleExportBackup">
            <el-icon class="mr-1"><Download /></el-icon>导出备份
          </el-button>
        </div>
        <el-divider />
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-700">恢复数据</p>
            <p class="text-xs text-gray-400">从备份文件导入简历数据</p>
          </div>
          <el-button size="small" @click="triggerImportBackup">
            <el-icon class="mr-1"><Upload /></el-icon>导入备份
          </el-button>
        </div>
        <input ref="fileInputRef" type="file" accept=".json" class="hidden" @change="handleImportBackup" />
      </div>
    </div>

    <!-- 账号操作 -->
    <div class="card p-6 mb-6">
      <h2 class="text-base font-semibold text-gray-900 mb-4">账号操作</h2>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-700">清除所有数据</p>
            <p class="text-xs text-gray-400">删除本地存储的所有简历数据</p>
          </div>
          <el-button size="small" type="danger" plain @click="handleClearData">清除数据</el-button>
        </div>
        <el-divider />
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-700">退出登录</p>
            <p class="text-xs text-gray-400">退出当前账号</p>
          </div>
          <el-button size="small" @click="handleLogout">退出登录</el-button>
        </div>
      </div>
    </div>

    <!-- VIP 升级弹窗（演示用） -->
    <el-dialog v-model="showVipDialog" title="升级 VIP 会员" width="420px">
      <div class="text-center py-4">
        <el-icon :size="48" class="text-amber-400 mb-4"><Crown /></el-icon>
        <h3 class="text-xl font-bold text-gray-900 mb-2">VIP 会员权益</h3>
        <p class="text-sm text-gray-500 mb-6">解锁全部高级功能，提升求职竞争力</p>
        <ul class="text-left max-w-xs mx-auto space-y-2 mb-6">
          <li v-for="f in vipFeatures" :key="f" class="flex items-center text-sm text-gray-600">
            <el-icon class="text-amber-500 mr-2"><Check /></el-icon>{{ f }}
          </li>
        </ul>
        <div class="text-3xl font-bold text-primary-600 mb-1">
          ¥29.9<span class="text-base font-normal text-gray-400">/月</span>
        </div>
      </div>
      <template #footer>
        <el-button @click="showVipDialog = false">暂不升级</el-button>
        <el-button type="primary" round @click="handleActivateVip">
          <el-icon class="mr-1"><Crown /></el-icon>激活 VIP（演示）
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useResumeStore } from '@/stores/resume'
import { membershipConfig } from '@/config/membership'
import { exportBackup, downloadBackup, importBackup, restoreBackup, clearAllStorage } from '@/utils/storage'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()
const resumeStore = useResumeStore()

const nickname = ref(authStore.currentUser?.nickname || '')
const showVipDialog = ref(false)
const fileInputRef = ref(null)

const vipFeatures = membershipConfig.vip.features

function formatDate(isoStr) {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function handleSaveNickname() {
  if (!nickname.value.trim()) {
    ElMessage.warning('昵称不能为空')
    return
  }
  authStore.updateUser({ nickname: nickname.value.trim() })
  ElMessage.success('昵称已更新')
}

function handleExportBackup() {
  if (!authStore.currentUser) return
  const backup = exportBackup(authStore.currentUser.id)
  downloadBackup(backup)
  ElMessage.success('备份文件已下载')
}

function triggerImportBackup() {
  fileInputRef.value?.click()
}

async function handleImportBackup(event) {
  const file = event.target.files?.[0]
  if (!file) return

  let backup
  try {
    backup = await importBackup(file)
  } catch (e) {
    ElMessage.error(e.message || '备份文件解析失败')
    if (fileInputRef.value) fileInputRef.value.value = ''
    return
  }

  try {
    await ElMessageBox.confirm(
      `检测到 ${backup.resumes.length} 份简历。选择合并（保留现有）或覆盖？`,
      '恢复数据',
      { confirmButtonText: '合并', cancelButtonText: '覆盖', distinguishCancelAndClose: true, type: 'info' }
    )
    const count = restoreBackup(backup, authStore.currentUser.id, { merge: true })
    resumeStore.loadResumes()
    ElMessage.success(`已合并 ${count} 份新简历`)
  } catch (action) {
    if (action === 'cancel') {
      try {
        await ElMessageBox.confirm('覆盖将清除所有现有简历，确定？', '警告', {
          confirmButtonText: '确定覆盖', cancelButtonText: '取消', type: 'warning'
        })
        const count = restoreBackup(backup, authStore.currentUser.id, { merge: false })
        resumeStore.loadResumes()
        ElMessage.success(`已恢复 ${count} 份简历`)
      } catch { /* cancelled */ }
    }
  }

  if (fileInputRef.value) fileInputRef.value.value = ''
}

function handleClearData() {
  ElMessageBox.confirm(
    '此操作将清除本地所有简历数据，建议先备份。确定继续？',
    '确认清除',
    { confirmButtonText: '清除', cancelButtonText: '取消', type: 'warning' }
  ).then(() => {
    clearAllStorage()
    resumeStore.loadResumes()
    ElMessage.success('数据已清除')
  }).catch(() => {})
}

function handleLogout() {
  authStore.logout()
  router.push('/')
  ElMessage.success('已退出登录')
}

function handleActivateVip() {
  const expireDate = new Date()
  expireDate.setMonth(expireDate.getMonth() + 1)
  authStore.updateUser({
    membership: { level: 'vip', expireDate: expireDate.toISOString() }
  })
  showVipDialog.value = false
  ElMessage.success('VIP 已激活（演示模式）')
}
</script>
