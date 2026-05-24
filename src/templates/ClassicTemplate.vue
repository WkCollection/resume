<template>
  <!-- 商务精英模板 - 美化版 -->
  <div class="template-preview" :style="pageStyle" style="min-height: 297mm;">
    <!-- 顶部横幅 -->
    <header class="relative overflow-hidden px-10 py-8 text-white" :style="bannerStyle">
      <!-- 装饰线条 -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-white/20"></div>
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/20"></div>
      <div class="absolute top-6 right-10 w-24 h-24 rounded-full border border-white/10"></div>
      <div class="absolute bottom-4 right-16 w-16 h-16 rounded-full border border-white/10"></div>

      <div class="relative flex items-center gap-6">
        <!-- 头像 -->
        <div class="shrink-0">
          <div
            v-if="data.personalInfo?.avatar"
            class="w-[80px] h-[80px] rounded-full bg-cover bg-center ring-3 ring-white/30 shadow-xl"
            :style="{ backgroundImage: `url(${data.personalInfo.avatar})` }"
          ></div>
          <div
            v-else
            class="w-[80px] h-[80px] rounded-full bg-white/15 flex items-center justify-center ring-3 ring-white/30"
          >
            <span class="text-3xl font-light">{{ (data.personalInfo?.name || '你')[0] }}</span>
          </div>
        </div>

        <!-- 姓名与职位 -->
        <div class="flex-1 min-w-0">
          <h1 class="text-2xl font-light tracking-[0.15em]">{{ data.personalInfo?.name || '你的姓名' }}</h1>
        </div>

        <!-- 联系方式 -->
        <div class="text-right text-xs space-y-1.5 opacity-85 shrink-0">
          <p v-if="data.personalInfo?.phone" class="flex items-center justify-end gap-2">
            <span>{{ data.personalInfo.phone }}</span>
            <svg class="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </p>
          <p v-if="data.personalInfo?.email" class="flex items-center justify-end gap-2">
            <span>{{ data.personalInfo.email }}</span>
            <svg class="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </p>
          <p v-if="data.personalInfo?.address" class="flex items-center justify-end gap-2">
            <span>{{ data.personalInfo.address }}</span>
            <svg class="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </p>
          <p v-if="data.personalInfo?.website" class="flex items-center justify-end gap-2">
            <span>{{ data.personalInfo.website }}</span>
            <svg class="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </p>
        </div>
      </div>
    </header>

    <!-- 内容区域 -->
    <div class="px-10 py-7">
      <template v-for="modKey in orderedModules" :key="modKey">
        <!-- 教育经历 -->
        <section v-if="modKey === 'education' && isVisible('education') && data.education?.length" class="mb-6">
          <h2 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-1.5 h-5 rounded-sm" :style="{ backgroundColor: themeColor }"></span>
            教育经历
          </h2>
          <div v-for="(edu, i) in data.education" :key="i" class="mb-3 pl-4">
            <div class="flex justify-between items-baseline">
              <div class="flex items-baseline gap-3">
                <span class="font-semibold text-sm text-gray-900">{{ edu.school }}</span>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="tagStyle">{{ edu.degree }}</span>
              </div>
              <span class="text-xs text-gray-400">{{ fmtDate(edu.startDate) }} - {{ fmtDate(edu.endDate) }}</span>
            </div>
            <div class="text-sm text-gray-500 mt-0.5">{{ edu.major }}</div>
            <p v-if="edu.description" class="text-xs text-gray-500 mt-1 whitespace-pre-line">{{ edu.description }}</p>
          </div>
        </section>

        <!-- 工作经历 -->
        <section v-if="modKey === 'workExperience' && isVisible('workExperience') && data.workExperience?.length" class="mb-6">
          <h2 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-1.5 h-5 rounded-sm" :style="{ backgroundColor: themeColor }"></span>
            工作经历
          </h2>
          <div v-for="(work, i) in data.workExperience" :key="i" class="mb-4 pl-4 border-l-2 relative" :style="{ borderColor: themeColor + '25' }">
            <div class="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm" :style="{ backgroundColor: themeColor }"></div>
            <div class="flex justify-between items-baseline">
              <div>
                <span class="font-semibold text-sm text-gray-900">{{ work.company }}</span>
                <span class="text-sm text-gray-400 ml-2">{{ work.position }}</span>
              </div>
              <span class="text-xs text-gray-400">{{ fmtDate(work.startDate) }} - {{ fmtDate(work.endDate) }}</span>
            </div>
            <div v-if="work.description" class="text-xs text-gray-500 mt-1 resume-md" v-html="renderMarkdown(work.description, themeColor)"></div>
          </div>
        </section>

        <!-- 项目经验 -->
        <section v-if="modKey === 'projects' && isVisible('projects') && data.projects?.length" class="mb-6">
          <h2 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-1.5 h-5 rounded-sm" :style="{ backgroundColor: themeColor }"></span>
            项目经验
          </h2>
          <div v-for="(proj, i) in data.projects" :key="i" class="mb-4 pl-4 border-l-2 relative" :style="{ borderColor: themeColor + '25' }">
            <div class="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm" :style="{ backgroundColor: themeColor }"></div>
            <div class="flex justify-between items-baseline">
              <div>
                <span class="font-semibold text-sm text-gray-900">{{ proj.name }}</span>
                <span v-if="proj.role" class="text-sm text-gray-400 ml-2">{{ proj.role }}</span>
              </div>
              <span class="text-xs text-gray-400">{{ fmtDate(proj.startDate) }} - {{ fmtDate(proj.endDate) }}</span>
            </div>
            <div v-if="proj.description" class="text-xs text-gray-500 mt-1 resume-md" v-html="renderMarkdown(proj.description, themeColor)"></div>
          </div>
        </section>

        <!-- 技能特长 -->
        <section v-if="modKey === 'skills' && isVisible('skills') && data.skills?.length" class="mb-6">
          <h2 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-1.5 h-5 rounded-sm" :style="{ backgroundColor: themeColor }"></span>
            技能特长
          </h2>
          <div class="grid grid-cols-2 gap-x-6 gap-y-2 pl-4">
            <div v-for="(skill, i) in data.skills" :key="i" class="flex items-center text-sm">
              <span class="text-gray-700 w-20 shrink-0 text-xs">{{ skill.name }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-1.5 mx-2 overflow-hidden">
                <div class="h-1.5 rounded-full" :style="{ width: skillLevelWidth(skill.level), background: `linear-gradient(to right, ${themeColor}, ${themeColor}aa)` }"></div>
              </div>
              <span class="text-[10px] text-gray-400 w-6 shrink-0">{{ skill.level }}</span>
            </div>
          </div>
        </section>

        <!-- 证书资质 -->
        <section v-if="modKey === 'certificates' && isVisible('certificates') && data.certificates?.length" class="mb-6">
          <h2 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-1.5 h-5 rounded-sm" :style="{ backgroundColor: themeColor }"></span>
            证书资质
          </h2>
          <div class="grid grid-cols-2 gap-2 text-sm pl-4">
            <div v-for="(cert, i) in data.certificates" :key="i" class="flex justify-between text-gray-600">
              <span>{{ cert.name }}</span>
              <span class="text-gray-400 text-xs">{{ fmtDate(cert.date) }}</span>
            </div>
          </div>
        </section>

        <!-- 作品集 -->
        <section v-if="modKey === 'portfolios' && isVisible('portfolios') && data.portfolios?.length" class="mb-6">
          <h2 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-1.5 h-5 rounded-sm" :style="{ backgroundColor: themeColor }"></span>
            作品集
          </h2>
          <div v-for="(port, i) in data.portfolios" :key="i" class="mb-2 text-sm pl-4">
            <span class="font-semibold text-gray-900">{{ port.title }}</span>
            <span v-if="port.url" class="text-xs ml-2" :style="{ color: themeColor }">{{ port.url }}</span>
            <p v-if="port.description" class="text-xs text-gray-500 mt-1">{{ port.description }}</p>
          </div>
        </section>

        <!-- 自我评价 -->
        <section v-if="modKey === 'selfEvaluation' && isVisible('selfEvaluation') && data.selfEvaluation" class="mb-6">
          <h2 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span class="w-1.5 h-5 rounded-sm" :style="{ backgroundColor: themeColor }"></span>
            自我评价
          </h2>
          <p class="text-sm text-gray-600 whitespace-pre-line leading-relaxed pl-4">{{ data.selfEvaluation }}</p>
        </section>
      </template>
    </div>

    <!-- 底部装饰线 -->
    <div class="h-1" :style="{ backgroundColor: themeColor }"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { themeColors } from '@/config/templates'
import { renderMarkdown } from '@/utils/markdown'

const props = defineProps({
  data: { type: Object, required: true },
  styleConfig: { type: Object, default: () => ({}) },
  moduleOrder: { type: Array, default: () => [] },
  hiddenModules: { type: Array, default: () => [] }
})

const themeColor = computed(() => {
  const theme = themeColors.find(t => t.id === props.styleConfig.theme) || themeColors[0]
  return theme.primary
})

const themeSecondary = computed(() => {
  const theme = themeColors.find(t => t.id === props.styleConfig.theme) || themeColors[0]
  return theme.secondary
})

const bannerStyle = computed(() => ({
  background: `linear-gradient(135deg, ${themeColor.value} 0%, ${adjustColor(themeColor.value, -40)} 100%)`
}))

const tagStyle = computed(() => ({
  backgroundColor: themeSecondary.value + '20',
  color: themeColor.value
}))

function adjustColor(hex, amount) {
  const num = parseInt(hex.slice(1), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount))
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount))
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`
}

const orderedModules = computed(() => {
  return props.moduleOrder.filter(key => key !== 'personalInfo')
})

const pageStyle = computed(() => ({
  fontFamily: props.styleConfig.fontFamily === 'default' ? 'inherit' : props.styleConfig.fontFamily,
  fontSize: `${props.styleConfig.fontSize || 18}px`,
  lineHeight: props.styleConfig.lineHeight || 1.6,
  padding: `${props.styleConfig.margin || 20}mm`
}))

function isVisible(moduleKey) {
  return !props.hiddenModules.includes(moduleKey)
}

function fmtDate(d) {
  return d ? d.replace(/-/g, '.') : ''
}

function skillLevelWidth(level) {
  const map = { '了解': '25%', '熟悉': '50%', '掌握': '75%', '精通': '100%' }
  return map[level] || '50%'
}
</script>

<style>
.resume-md p { margin: 0 0 2px; }
.resume-md p:last-child { margin-bottom: 0; }
.resume-md strong { font-weight: 600; color: #374151; }
.resume-md code { font-size: 0.9em; color: #dc2626; }
</style>
