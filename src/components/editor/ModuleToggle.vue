<template>
  <div class="space-y-1">
    <div
      v-for="mod in orderedModules"
      :key="mod.key"
      class="flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-move hover:bg-gray-50 transition-colors"
      draggable="true"
      @dragstart="onDragStart($event, mod.key)"
      @dragover.prevent="onDragOver($event, mod.key)"
      @drop="onDrop($event, mod.key)"
    >
      <div class="flex items-center space-x-2">
        <el-icon class="text-gray-400 cursor-grab"><Rank /></el-icon>
        <span :class="{ 'text-gray-400': isHidden(mod.key) }">{{ mod.label }}</span>
      </div>
      <el-switch
        :model-value="!isHidden(mod.key)"
        size="small"
        @change="(val) => toggleModule(mod.key, val)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { moduleConfig } from '@/config/templates'

const props = defineProps({
  moduleOrder: { type: Array, default: () => [] },
  hiddenModules: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:moduleOrder', 'update:hiddenModules'])

const orderedModules = computed(() => {
  return props.moduleOrder
    .filter(key => moduleConfig[key])
    .map(key => ({ key, ...moduleConfig[key] }))
})

function isHidden(key) {
  return props.hiddenModules.includes(key)
}

function toggleModule(key, visible) {
  let updated = [...props.hiddenModules]
  if (visible) {
    updated = updated.filter(k => k !== key)
  } else {
    updated.push(key)
  }
  emit('update:hiddenModules', updated)
}

// 拖拽排序
let draggedKey = null

function onDragStart(event, key) {
  draggedKey = key
  event.dataTransfer.effectAllowed = 'move'
}

function onDragOver(event) {
  event.dataTransfer.dropEffect = 'move'
}

function onDrop(event, targetKey) {
  if (!draggedKey || draggedKey === targetKey) return
  const order = [...props.moduleOrder]
  const fromIndex = order.indexOf(draggedKey)
  const toIndex = order.indexOf(targetKey)
  if (fromIndex === -1 || toIndex === -1) return
  order.splice(fromIndex, 1)
  order.splice(toIndex, 0, draggedKey)
  emit('update:moduleOrder', order)
  draggedKey = null
}
</script>
