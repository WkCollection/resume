<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- 顶部工具栏 -->
    <EditorToolbar
      v-if="currentResume"
      :template-id="currentResume.templateId"
      @toggle-template="showTemplateDialog = true"
      @toggle-style="showStylePanel = !showStylePanel; showScorePanel = false"
      @toggle-score="showScorePanel = !showScorePanel; showStylePanel = false"
      @preview="openPreview"
      @export="handleExport"
    />

    <!-- 加载中 -->
    <div v-if="!currentResume" class="flex items-center justify-center h-[60vh]">
      <el-icon class="animate-spin text-primary-500" :size="32"><Loading /></el-icon>
    </div>

    <div v-if="currentResume" class="flex h-[calc(100vh-3rem)]">
      <!-- 左侧编辑面板 -->
      <div class="w-full lg:w-[480px] bg-white border-r border-gray-200 flex flex-col overflow-hidden" :class="{ 'hidden lg:flex': showPreview }">
        <!-- 模块导航标签 -->
        <div class="border-b border-gray-200 px-4 pt-3">
          <!-- 模块排序开关 -->
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">所有模块</span>
            <el-button size="small" text @click="showModuleOrder = !showModuleOrder">
              <el-icon class="mr-1"><Setting /></el-icon>
              {{ showModuleOrder ? '完成排序' : '模块排序' }}
            </el-button>
          </div>

          <!-- 模块拖拽排序面板 -->
          <div v-if="showModuleOrder" class="mb-3">
            <ModuleToggle
              :module-order="currentResume.moduleOrder"
              :hidden-modules="currentResume.hiddenModules"
              @update:module-order="updateModuleOrder"
              @update:hidden-modules="updateHiddenModules"
            />
          </div>

          <!-- 模块标签页 -->
          <div v-else class="flex items-center gap-1 pb-2">
            <div class="overflow-hidden flex-1 tab-scroll-wrapper">
              <div
                class="flex gap-1 transition-transform duration-300 ease-in-out tab-scroll-inner"
                :style="{ transform: `translateX(-${tabOffset}px)` }"
              >
                <button
                  v-for="mod in visibleModules"
                  :key="mod.key"
                  class="px-2 py-1.5 text-xs font-medium whitespace-nowrap transition-colors no-underline border-0 cursor-pointer shrink-0"
                  :class="activeModule === mod.key
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:bg-gray-100'"
                  @click="activeModule = mod.key"
                >
                  {{ mod.label }}
                </button>
              </div>
            </div>
            <button
              v-if="canSlideRight || tabOffset > 0"
              class="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-all border-0 cursor-pointer"
              @click="tabOffset > 0 ? slideTabs(-1) : slideTabs(1)"
            >
              <el-icon :size="12"><component :is="tabOffset > 0 ? 'ArrowLeft' : 'ArrowRight'" /></el-icon>
            </button>
          </div>
        </div>

        <!-- 编辑表单区域 -->
        <div class="flex-1 overflow-y-auto p-4">
          <!-- 样式编辑面板 -->
          <div v-if="showStylePanel">
            <StyleEditor
              :style-config="currentResume.style"
              @update="handleStyleUpdate"
            />
          </div>
          <!-- 简历评分面板 -->
          <div v-else-if="showScorePanel">
            <ResumeScore
              :modules="currentResume.modules"
              :job-intention="currentResume.modules.jobIntention"
            />
          </div>
          <!-- 字段编辑面板 -->
          <div v-else>
            <FieldEditor
              :data="currentResume.modules"
              :active-module="activeModule"
              @update="handleModulesUpdate"
            />
          </div>
        </div>
      </div>

      <!-- 右侧预览区域 -->
      <div class="flex-1 overflow-hidden flex flex-col bg-gray-100" :class="{ 'hidden lg:flex': !showPreview }">
        <!-- 缩放控制 -->
        <div class="flex items-center justify-center gap-2 py-1.5 bg-gray-50 border-b border-gray-200">
          <el-button :icon="ZoomOut" circle size="small" text :disabled="previewScale <= 0.3" @click="previewScale = Math.max(0.3, previewScale - 0.1)" />
          <span class="text-xs text-gray-500 w-12 text-center">{{ Math.round(previewScale * 100) }}%</span>
          <el-button :icon="ZoomIn" circle size="small" text :disabled="previewScale >= 1.5" @click="previewScale = Math.min(1.5, previewScale + 0.1)" />
          <el-divider direction="vertical" />
          <el-button size="small" text @click="previewScale = 1">重置</el-button>
          <el-button size="small" text @click="previewScale = fitScale">适应宽度</el-button>
          <el-button size="small" text @click="fitHeight">适应高度</el-button>
        </div>
        <!-- 预览内容 -->
        <div class="flex-1 overflow-auto p-6" ref="previewContainerRef">
          <div class="flex justify-center" :style="{ transform: `scale(${previewScale})`, transformOrigin: 'top center' }">
            <div class="bg-white shadow-lg" style="width: 210mm; min-height: 297mm;">
              <component
                :is="templateComponent"
                :data="currentResume.modules"
                :style-config="currentResume.style"
                :module-order="currentResume.moduleOrder"
                :hidden-modules="currentResume.hiddenModules"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 移动端预览切换 -->
    <div v-if="currentResume" class="lg:hidden fixed bottom-6 right-6 z-50">
      <el-button
        type="primary"
        :icon="View"
        circle
        size="large"
        @click="showPreview = !showPreview"
      />
    </div>

    <!-- 模板切换弹窗 -->
    <el-dialog v-model="showTemplateDialog" title="切换模板" width="500px">
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="tpl in templateList"
          :key="tpl.id"
          class="border-2 rounded-lg p-4 cursor-pointer text-center transition-all relative"
          :class="currentResume.templateId === tpl.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'"
          @click="switchTemplate(tpl.id)"
        >
          <span v-if="!tpl.isFree" class="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none shadow">VIP</span>
          <el-icon :size="32" class="mb-2" :class="currentResume.templateId === tpl.id ? 'text-primary-600' : 'text-gray-400'">
            <component :is="tplIcons[tpl.id]" />
          </el-icon>
          <p class="text-sm font-medium" :class="currentResume.templateId === tpl.id ? 'text-primary-600' : 'text-gray-600'">
            {{ tpl.name }}
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useResumeStore } from '@/stores/resume'
import { useAuthStore } from '@/stores/auth'
import { templates as templateList, moduleConfig } from '@/config/templates'
import { exportToPDF } from '@/utils/export-pdf'
import EditorToolbar from '@/components/editor/EditorToolbar.vue'
import ModuleToggle from '@/components/editor/ModuleToggle.vue'
import FieldEditor from '@/components/editor/FieldEditor.vue'
import StyleEditor from '@/components/editor/StyleEditor.vue'
import ResumeScore from '@/components/editor/ResumeScore.vue'
import BasicTemplate from '@/templates/BasicTemplate.vue'
import ModernTemplate from '@/templates/ModernTemplate.vue'
import ClassicTemplate from '@/templates/ClassicTemplate.vue'
import { ElMessage } from 'element-plus'
import { View, ZoomIn, ZoomOut } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const resumeStore = useResumeStore()
const authStore = useAuthStore()

const activeModule = ref('personalInfo')
const showModuleOrder = ref(false)
const showPreview = ref(false)
const showTemplateDialog = ref(false)
const showStylePanel = ref(false)
const showScorePanel = ref(false)

const previewScale = ref(1)
const fitScale = ref(0.5)
const previewContainerRef = ref(null)

const tabOffset = ref(0)
const canSlideRight = ref(false)

function recalcSlide() {
  const wrapper = document.querySelector('.tab-scroll-wrapper')
  const inner = document.querySelector('.tab-scroll-inner')
  if (!wrapper || !inner) return
  const maxOffset = Math.max(0, inner.scrollWidth - wrapper.clientWidth)
  tabOffset.value = Math.min(tabOffset.value, maxOffset)
  canSlideRight.value = tabOffset.value < maxOffset
}

function slideTabs(dir) {
  const wrapper = document.querySelector('.tab-scroll-wrapper')
  const inner = document.querySelector('.tab-scroll-inner')
  if (!wrapper || !inner) return
  const step = wrapper.clientWidth * 0.6
  const maxOffset = Math.max(0, inner.scrollWidth - wrapper.clientWidth)
  if (dir > 0) {
    tabOffset.value = Math.min(tabOffset.value + step, maxOffset)
  } else {
    tabOffset.value = Math.max(tabOffset.value - step, 0)
  }
  canSlideRight.value = tabOffset.value < maxOffset
}

// 当前简历数据（本地响应式副本）
const currentResume = ref(null)

// 模板组件映射
const templateMap = {
  basic: BasicTemplate,
  modern: ModernTemplate,
  classic: ClassicTemplate
}

const tplIcons = {
  basic: 'Document',
  modern: 'Grid',
  classic: 'Briefcase'
}

const templateComponent = computed(() => {
  return templateMap[currentResume.value?.templateId] || BasicTemplate
})

// 可见模块列表
const visibleModules = computed(() => {
  if (!currentResume.value) return []
  return currentResume.value.moduleOrder
    .filter(key => !currentResume.value.hiddenModules.includes(key) && moduleConfig[key])
    .map(key => ({ key, ...moduleConfig[key] }))
})

onMounted(() => {
  resumeStore.loadResumes()
  const resume = resumeStore.getResume(route.params.id)
  if (!resume) {
    ElMessage.error('简历不存在')
    router.push('/dashboard')
    return
  }
  // 深拷贝避免直接修改 store 数据
  currentResume.value = JSON.parse(JSON.stringify(resume))
  nextTick(() => {
    recalcSlide()
    calcFitScale()
  })
})

function calcFitScale() {
  const container = previewContainerRef.value
  if (!container) return
  const containerWidth = container.clientWidth - 48
  const a4Width = 794
  fitScale.value = Math.round((containerWidth / a4Width) * 10) / 10
}

function fitHeight() {
  const container = previewContainerRef.value
  if (!container) return
  const containerHeight = container.clientHeight - 48
  const a4Height = 1123
  previewScale.value = Math.round((containerHeight / a4Height) * 10) / 10
}

// 防抖自动保存
let saveTimer = null
function debouncedSave() {
  clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    if (currentResume.value) {
      resumeStore.updateResume(currentResume.value.id, {
        modules: currentResume.value.modules,
        style: currentResume.value.style,
        moduleOrder: currentResume.value.moduleOrder,
        hiddenModules: currentResume.value.hiddenModules,
        templateId: currentResume.value.templateId
      })
    }
  }, 500)
}

// 监听数据变化自动保存
watch(
  () => currentResume.value?.modules,
  () => debouncedSave(),
  { deep: true }
)

function handleModulesUpdate(modules) {
  currentResume.value.modules = modules
  debouncedSave()
}

function handleStyleUpdate(style) {
  currentResume.value.style = style
  debouncedSave()
}

function updateModuleOrder(order) {
  currentResume.value.moduleOrder = order
  debouncedSave()
}

function updateHiddenModules(hidden) {
  currentResume.value.hiddenModules = hidden
  debouncedSave()
}

function switchTemplate(templateId) {
  const tpl = templateList.find(t => t.id === templateId)
  if (tpl && !tpl.isFree && !authStore.isVip) {
    ElMessage.warning('该模板为 VIP 专属，请升级会员')
    return
  }
  currentResume.value.templateId = templateId
  showTemplateDialog.value = false
  debouncedSave()
}

function openPreview() {
  router.push(`/preview/${currentResume.value.id}`)
}

async function handleExport() {
  exportToPDF()
}
</script>

<style scoped>
/* 隐藏滚动条 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
