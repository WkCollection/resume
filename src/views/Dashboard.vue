<template>
  <div class="container-app py-8">
    <!-- 顶部操作区 -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">我的简历</h1>
        <p class="text-sm text-gray-500 mt-1">
          共 {{ resumeStore.resumeCount }} 份简历
          <span v-if="!authStore.isVip" class="text-amber-600">（免费用户最多 5 份）</span>
        </p>
      </div>
      <div class="flex items-center space-x-2 flex-wrap gap-y-2">
        <el-button text @click="handleExportBackup">
          <el-icon class="mr-1"><Download /></el-icon>备份数据
        </el-button>
        <el-button text @click="triggerImportBackup">
          <el-icon class="mr-1"><Upload /></el-icon>恢复数据
        </el-button>
        <input ref="fileInputRef" type="file" accept=".json" class="hidden" @change="handleImportBackup" />
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="resumeStore.userResumes.length === 0" class="text-center py-20">
      <el-empty description="还没有简历，快来创建第一份吧">
        <el-button type="primary" round @click="showCreateDialog = true">
          新建简历
        </el-button>
      </el-empty>
    </div>

    <!-- 简历卡片列表 -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="resume in resumeStore.userResumes"
        :key="resume.id"
        class="card-hover group cursor-pointer"
      >
        <!-- 缩略图区域 -->
        <div
          ref="thumbRefs"
          class="relative overflow-hidden cursor-pointer"
          :style="{ paddingBottom: '141%' }"
          @click="openEditor(resume.id)"
        >
          <div class="absolute inset-0 overflow-hidden">
            <div :ref="el => setThumbScale(el, resume.id)" style="width: 794px; transform-origin: top left;">
              <component
                :is="getTemplateComponent(resume.templateId)"
                :data="resume.modules"
                :style-config="resume.style"
                :module-order="resume.moduleOrder"
                :hidden-modules="resume.hiddenModules"
              />
            </div>
          </div>
          <!-- 悬浮操作 -->
          <div class="absolute inset-0 bg-primary-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-3 pointer-events-none group-hover:pointer-events-auto">
            <el-button round size="small" class="!bg-white !text-primary-700" @click.stop="openEditor(resume.id)">
              编辑
            </el-button>
            <el-button round size="small" class="!bg-white !text-primary-700" @click.stop="openPreview(resume.id)">
              预览
            </el-button>
          </div>
        </div>

        <!-- 信息区域 -->
        <div class="p-4">
          <h3 class="font-semibold text-gray-900 truncate">{{ resume.title }}</h3>
          <p class="text-xs text-gray-400 mt-1">
            更新于 {{ formatDate(resume.updatedAt) }}
          </p>
          <div class="mt-3 flex justify-between items-center">
            <el-tag size="small" type="info" effect="plain">
              {{ getTemplateName(resume.templateId) }}
            </el-tag>
            <el-dropdown trigger="click" @command="(cmd) => handleCommand(cmd, resume)">
              <el-button :icon="MoreFilled" circle size="small" text />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="rename">
                    <el-icon><Edit /></el-icon>重命名
                  </el-dropdown-item>
                  <el-dropdown-item command="duplicate">
                    <el-icon><CopyDocument /></el-icon>复制
                  </el-dropdown-item>
                  <el-dropdown-item command="delete" divided class="!text-red-500">
                    <el-icon><Delete /></el-icon>删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>

    <!-- 新建简历弹窗 -->
    <el-dialog v-model="showCreateDialog" title="新建简历" width="460px" :close-on-click-modal="false">
      <el-form ref="createFormRef" :model="createForm" :rules="createRules" label-position="top">
        <el-form-item label="简历名称" prop="title">
          <el-input v-model="createForm.title" placeholder="例如：前端开发工程师简历" />
        </el-form-item>
        <el-form-item label="选择模板" prop="templateId">
          <div class="grid grid-cols-3 gap-3 w-full">
            <div
              v-for="tpl in templateList"
              :key="tpl.id"
              class="border-2 rounded-lg p-3 cursor-pointer text-center transition-all"
              :class="createForm.templateId === tpl.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'"
              @click="createForm.templateId = tpl.id"
            >
              <el-icon :size="24" class="mb-1" :class="createForm.templateId === tpl.id ? 'text-primary-600' : 'text-gray-400'">
                <Document />
              </el-icon>
              <p class="text-xs font-medium" :class="createForm.templateId === tpl.id ? 'text-primary-600' : 'text-gray-600'">
                {{ tpl.name }}
              </p>
              <el-tag v-if="!tpl.isFree && !authStore.isVip" type="warning" size="small" effect="dark" class="mt-1">
                VIP
              </el-tag>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreateDialog = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">创建</el-button>
      </template>
    </el-dialog>

    <!-- 重命名弹窗 -->
    <el-dialog v-model="showRenameDialog" title="重命名简历" width="400px">
      <el-input v-model="renameTitle" placeholder="请输入新名称" />
      <template #footer>
        <el-button @click="showRenameDialog = false">取消</el-button>
        <el-button type="primary" @click="handleRename">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useResumeStore } from '@/stores/resume'
import { templates as templateList } from '@/config/templates'
import { MoreFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { exportBackup, downloadBackup, importBackup, restoreBackup } from '@/utils/storage'
import BasicTemplate from '@/templates/BasicTemplate.vue'
import ModernTemplate from '@/templates/ModernTemplate.vue'
import ClassicTemplate from '@/templates/ClassicTemplate.vue'

const router = useRouter()
const authStore = useAuthStore()
const resumeStore = useResumeStore()

const fileInputRef = ref(null)

// 新建弹窗
const showCreateDialog = ref(false)
const createFormRef = ref(null)
const createForm = reactive({
  title: '',
  templateId: 'basic'
})
const createRules = {
  title: [{ required: true, message: '请输入简历名称', trigger: 'blur' }]
}

// 重命名弹窗
const showRenameDialog = ref(false)
const renameTitle = ref('')
const renamingId = ref('')

onMounted(() => {
  resumeStore.loadResumes()
})

function formatDate(isoStr) {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const templateMap = {
  basic: BasicTemplate,
  modern: ModernTemplate,
  classic: ClassicTemplate
}

function getTemplateName(templateId) {
  const tpl = templateList.find(t => t.id === templateId)
  return tpl ? tpl.name : '经典简约'
}

function getTemplateComponent(templateId) {
  return templateMap[templateId] || BasicTemplate
}

const thumbScales = ref({})
function setThumbScale(el, resumeId) {
  if (!el) return
  nextTick(() => {
    const parent = el.parentElement
    if (!parent) return
    const scale = parent.clientWidth / 794
    el.style.transform = `scale(${scale})`
  })
}

function openEditor(id) {
  router.push(`/editor/${id}`)
}

function openPreview(id) {
  router.push(`/preview/${id}`)
}

async function handleCreate() {
  const valid = await createFormRef.value?.validate().catch(() => false)
  if (!valid) return

  // 检查模板权限
  const tpl = templateList.find(t => t.id === createForm.templateId)
  if (tpl && !tpl.isFree && !authStore.isVip) {
    ElMessage.warning('该模板为 VIP 专属，请升级会员')
    return
  }

  const result = resumeStore.createResume(createForm.templateId, createForm.title)
  if (result.success) {
    ElMessage.success('简历创建成功')
    showCreateDialog.value = false
    createForm.title = ''
    createForm.templateId = 'basic'
    resumeStore.loadResumes()
  } else {
    ElMessage.error(result.message)
  }
}

function handleCommand(command, resume) {
  switch (command) {
    case 'rename':
      renamingId.value = resume.id
      renameTitle.value = resume.title
      showRenameDialog.value = true
      break
    case 'duplicate':
      handleDuplicate(resume.id)
      break
    case 'delete':
      handleDelete(resume)
      break
  }
}

function handleRename() {
  if (!renameTitle.value.trim()) {
    ElMessage.warning('请输入名称')
    return
  }
  resumeStore.renameResume(renamingId.value, renameTitle.value.trim())
  showRenameDialog.value = false
  ElMessage.success('重命名成功')
}

function handleDuplicate(id) {
  const result = resumeStore.duplicateResume(id)
  if (result.success) {
    ElMessage.success('简历已复制')
  } else {
    ElMessage.error(result.message)
  }
}

function handleDelete(resume) {
  ElMessageBox.confirm(
    `确定要删除「${resume.title}」吗？此操作不可恢复。`,
    '确认删除',
    { confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning' }
  ).then(() => {
    resumeStore.deleteResume(resume.id)
    ElMessage.success('已删除')
  }).catch(() => {})
}

function handleExportBackup() {
  if (!authStore.currentUser) return
  const backup = exportBackup(authStore.currentUser.id)
  downloadBackup(backup)
  ElMessage.success('数据备份已下载')
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
      `检测到备份文件，包含 ${backup.resumes.length} 份简历。选择恢复方式：合并（保留现有数据）或覆盖。`,
      '恢复数据',
      {
        confirmButtonText: '合并',
        cancelButtonText: '覆盖',
        distinguishCancelAndClose: true,
        type: 'info'
      }
    )
    // 合并模式（confirm）
    const count = restoreBackup(backup, authStore.currentUser.id, { merge: true })
    resumeStore.loadResumes()
    ElMessage.success(`已合并 ${count} 份新简历`)
  } catch (action) {
    if (action === 'cancel') {
      // 覆盖模式
      try {
        await ElMessageBox.confirm('覆盖将清除所有现有简历数据，确定继续？', '警告', {
          confirmButtonText: '确定覆盖',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const count = restoreBackup(backup, authStore.currentUser.id, { merge: false })
        resumeStore.loadResumes()
        ElMessage.success(`已恢复 ${count} 份简历`)
      } catch {
        // 用户取消
      }
    }
  }

  // 重置 file input
  if (fileInputRef.value) fileInputRef.value.value = ''
}
</script>
