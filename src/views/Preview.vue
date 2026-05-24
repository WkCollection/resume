<template>
  <div class="bg-gray-100 min-h-screen py-8">
    <div class="container-app">
      <!-- 操作栏 -->
      <div class="flex items-center justify-between mb-6">
        <el-button @click="$router.back()">
          <el-icon class="mr-1"><ArrowLeft /></el-icon>返回
        </el-button>
        <div class="flex items-center space-x-3">
          <el-button @click="handleExport">
            <el-icon class="mr-1"><Printer /></el-icon>打印 / 导出 PDF
          </el-button>
        </div>
      </div>

      <!-- 简历预览 -->
      <div class="flex justify-center">
        <div ref="previewRef" class="bg-white shadow-lg" style="width: 210mm; min-height: 297mm;">
          <component
            :is="templateComponent"
            :data="resume.modules"
            :style-config="resume.style"
            :module-order="resume.moduleOrder"
            :hidden-modules="resume.hiddenModules"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useResumeStore } from '@/stores/resume'
import { exportToPDF } from '@/utils/export-pdf'
import BasicTemplate from '@/templates/BasicTemplate.vue'
import ModernTemplate from '@/templates/ModernTemplate.vue'
import ClassicTemplate from '@/templates/ClassicTemplate.vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const resumeStore = useResumeStore()
const previewRef = ref(null)

const templateMap = {
  basic: BasicTemplate,
  modern: ModernTemplate,
  classic: ClassicTemplate
}

const resume = ref({
  modules: {},
  style: {},
  moduleOrder: [],
  hiddenModules: [],
  templateId: 'basic',
  title: '简历预览'
})

const templateComponent = computed(() => templateMap[resume.value.templateId] || BasicTemplate)

onMounted(() => {
  resumeStore.loadResumes()
  const data = resumeStore.getResume(route.params.id)
  if (!data) {
    ElMessage.error('简历不存在')
    router.push('/dashboard')
    return
  }
  resume.value = data
})

function handleExport() {
  exportToPDF()
}
</script>
