<template>
  <div class="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 sticky top-16 z-40">
    <div class="flex items-center space-x-3">
      <el-button text @click="$router.push('/dashboard')">
        <el-icon class="mr-1"><ArrowLeft /></el-icon>返回
      </el-button>
      <el-divider direction="vertical" />
      <span class="text-sm text-gray-500">当前模板：</span>
      <el-tag effect="plain">{{ currentTemplateName }}</el-tag>
    </div>
    <div class="flex items-center space-x-2">
      <el-tooltip content="样式设置">
        <el-button :icon="Brush" circle text @click="$emit('toggle-style')" />
      </el-tooltip>
      <el-tooltip content="简历评分">
        <el-button :icon="DataAnalysis" circle text @click="$emit('toggle-score')" />
      </el-tooltip>
      <el-tooltip content="切换模板">
        <el-button :icon="Grid" circle text @click="$emit('toggle-template')" />
      </el-tooltip>
      <el-tooltip content="预览">
        <el-button :icon="View" circle text @click="$emit('preview')" />
      </el-tooltip>
      <el-button type="primary" round size="small" @click="$emit('export')">
        <el-icon class="mr-1"><Download /></el-icon>导出 PDF
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { templates as templateList } from '@/config/templates'
import { Grid, Brush, DataAnalysis, View, Download } from '@element-plus/icons-vue'

const props = defineProps({
  templateId: { type: String, default: 'basic' }
})

defineEmits(['toggle-template', 'toggle-style', 'toggle-score', 'preview', 'export'])

const currentTemplateName = computed(() => {
  const tpl = templateList.find(t => t.id === props.templateId)
  return tpl ? tpl.name : '经典简约'
})
</script>
