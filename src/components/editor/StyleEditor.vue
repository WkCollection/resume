<template>
  <div class="space-y-5">
    <h3 class="font-semibold text-gray-900 flex items-center">
      <el-icon class="mr-2"><Brush /></el-icon>样式设置
    </h3>

    <!-- 主题配色 -->
    <div>
      <label class="text-sm font-medium text-gray-700 mb-2 block">主题配色</label>
      <div class="flex gap-3">
        <button
          v-for="color in themeColors"
          :key="color.id"
          class="w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center"
          :class="styleConfig.theme === color.id ? 'border-gray-800 scale-110' : 'border-transparent hover:border-gray-300'"
          :style="{ backgroundColor: color.primary }"
          :title="color.name"
          @click="updateStyle('theme', color.id)"
        >
          <el-icon v-if="styleConfig.theme === color.id" class="text-white" :size="14"><Check /></el-icon>
        </button>
      </div>
    </div>

    <!-- 字体选择 -->
    <div>
      <label class="text-sm font-medium text-gray-700 mb-2 block">字体</label>
      <el-select
        :model-value="styleConfig.fontFamily"
        placeholder="选择字体"
        class="w-full"
        @update:model-value="updateStyle('fontFamily', $event)"
      >
        <el-option
          v-for="font in fontOptions"
          :key="font.value"
          :label="font.label"
          :value="font.value"
        />
      </el-select>
    </div>

    <!-- 字号 -->
    <div>
      <div class="flex justify-between items-center mb-2">
        <label class="text-sm font-medium text-gray-700">字号</label>
        <span class="text-xs text-gray-400">{{ styleConfig.fontSize || 18 }}px</span>
      </div>
      <el-slider
        :model-value="styleConfig.fontSize || 18"
        :min="18"
        :max="24"
        :step="1"
        :show-tooltip="false"
        @update:model-value="updateStyle('fontSize', $event)"
      />
    </div>

    <!-- 行高 -->
    <div>
      <div class="flex justify-between items-center mb-2">
        <label class="text-sm font-medium text-gray-700">行高</label>
        <span class="text-xs text-gray-400">{{ styleConfig.lineHeight || 1.6 }}</span>
      </div>
      <el-slider
        :model-value="styleConfig.lineHeight || 1.6"
        :min="1.2"
        :max="2.0"
        :step="0.1"
        :show-tooltip="false"
        @update:model-value="updateStyle('lineHeight', $event)"
      />
    </div>

    <!-- 页边距 -->
    <div>
      <div class="flex justify-between items-center mb-2">
        <label class="text-sm font-medium text-gray-700">页边距</label>
        <span class="text-xs text-gray-400">{{ styleConfig.margin || 20 }}mm</span>
      </div>
      <el-slider
        :model-value="styleConfig.margin || 20"
        :min="10"
        :max="40"
        :step="5"
        :show-tooltip="false"
        @update:model-value="updateStyle('margin', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { themeColors } from '@/config/templates'

const props = defineProps({
  styleConfig: { type: Object, required: true }
})

const emit = defineEmits(['update'])

const fontOptions = [
  { label: '默认（苹方/微软雅黑）', value: 'default' },
  { label: '宋体', value: '"SimSun", "Songti SC", serif' },
  { label: '黑体', value: '"SimHei", "Heiti SC", sans-serif' },
  { label: '楷体', value: '"KaiTi", "STKaiti", serif' },
  { label: '仿宋', value: '"FangSong", "STFangsong", serif' },
  { label: '等线', value: '"DengXian", sans-serif' }
]

function updateStyle(key, value) {
  emit('update', { ...props.styleConfig, [key]: value })
}
</script>
