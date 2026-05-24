<template>
  <!-- 现代双栏模板 - 美化版 -->
  <div class="template-preview flex" :style="pageStyle" style="min-height: 297mm;">
    <!-- 左侧边栏 -->
    <aside class="w-[35%] relative overflow-hidden" :style="sidebarStyle">
      <!-- 装饰圆形 -->
      <div class="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-10 bg-white"></div>
      <div class="absolute -bottom-10 -left-10 w-28 h-28 rounded-full opacity-10 bg-white"></div>

      <div class="relative p-7 text-white">
        <!-- 头像 -->
        <div class="flex justify-center mb-5">
          <div class="relative">
            <div
              v-if="data.personalInfo?.avatar"
              class="w-[88px] h-[88px] rounded-full bg-cover bg-center ring-3 ring-white/30 shadow-xl"
              :style="{ backgroundImage: `url(${data.personalInfo.avatar})` }"
            ></div>
            <div
              v-else
              class="w-[88px] h-[88px] rounded-full bg-white/15 flex items-center justify-center ring-3 ring-white/30 shadow-xl"
            >
              <span class="text-3xl font-bold">{{ (data.personalInfo?.name || '你')[0] }}</span>
            </div>
            <!-- 在线状态小圆点装饰 -->
            <div class="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 ring-2 ring-white/50"></div>
          </div>
        </div>

        <!-- 姓名 -->
        <h1 class="text-xl font-bold text-center mb-6">{{ data.personalInfo?.name || '你的姓名' }}</h1>

        <!-- 联系方式 -->
        <div class="mb-6">
          <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-60 flex items-center gap-2">
            <span class="flex-1 h-px bg-white/20"></span>
            联系方式
            <span class="flex-1 h-px bg-white/20"></span>
          </h3>
          <div class="space-y-2.5">
            <div v-if="data.personalInfo?.phone" class="flex items-center gap-2.5 text-xs">
              <div class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              {{ data.personalInfo.phone }}
            </div>
            <div v-if="data.personalInfo?.email" class="flex items-center gap-2.5 text-xs">
              <div class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              {{ data.personalInfo.email }}
            </div>
            <div v-if="data.personalInfo?.address" class="flex items-center gap-2.5 text-xs">
              <div class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              {{ data.personalInfo.address }}
            </div>
            <div v-if="data.personalInfo?.website" class="flex items-center gap-2.5 text-xs">
              <div class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              {{ data.personalInfo.website }}
            </div>
          </div>
        </div>

        <!-- 技能特长 -->
        <div v-if="isVisible('skills') && data.skills?.length" class="mb-6">
          <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-60 flex items-center gap-2">
            <span class="flex-1 h-px bg-white/20"></span>
            技能特长
            <span class="flex-1 h-px bg-white/20"></span>
          </h3>
          <div class="space-y-2.5">
            <div v-for="(skill, i) in data.skills" :key="i">
              <div class="flex justify-between text-xs mb-1">
                <span>{{ skill.name }}</span>
                <span class="opacity-60">{{ skill.level }}</span>
              </div>
              <div class="w-full bg-white/15 rounded-full h-1.5">
                <div class="bg-white/90 rounded-full h-1.5 transition-all" :style="{ width: skillLevelWidth(skill.level) }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 证书资质 -->
        <div v-if="isVisible('certificates') && data.certificates?.length" class="mb-6">
          <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-60 flex items-center gap-2">
            <span class="flex-1 h-px bg-white/20"></span>
            证书资质
            <span class="flex-1 h-px bg-white/20"></span>
          </h3>
          <div class="space-y-1.5 text-xs">
            <div v-for="(cert, i) in data.certificates" :key="i" class="flex items-center gap-2">
              <span class="w-1 h-1 rounded-full bg-white/60 shrink-0"></span>
              <span>{{ cert.name }}</span>
              <span class="opacity-50 ml-auto text-[10px]">{{ cert.date }}</span>
            </div>
          </div>
        </div>

        <!-- 自我评价 -->
        <div v-if="isVisible('selfEvaluation') && data.selfEvaluation">
          <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-60 flex items-center gap-2">
            <span class="flex-1 h-px bg-white/20"></span>
            自我评价
            <span class="flex-1 h-px bg-white/20"></span>
          </h3>
          <p class="text-xs leading-relaxed whitespace-pre-line opacity-85">{{ data.selfEvaluation }}</p>
        </div>
      </div>
    </aside>

    <!-- 右侧主内容 -->
    <main class="w-[65%] p-8">
      <template v-for="modKey in rightSideModules" :key="modKey">
        <!-- 教育经历 -->
        <section v-if="modKey === 'education' && isVisible('education') && data.education?.length" class="mb-6">
          <h2 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span class="w-4 h-4 rounded flex items-center justify-center" :style="{ backgroundColor: themeColor + '15' }">
              <svg class="w-2.5 h-2.5" :style="{ color: themeColor }" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
            </span>
            教育经历
          </h2>
          <div v-for="(edu, i) in data.education" :key="i" class="mb-4 pl-4 border-l-2 relative" :style="{ borderColor: themeColor + '30' }">
            <div class="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white" :style="{ backgroundColor: themeColor }"></div>
            <div class="flex justify-between items-baseline">
              <span class="font-semibold text-sm text-gray-900">{{ edu.school }}</span>
              <span class="text-xs text-gray-400">{{ fmtDate(edu.startDate) }} - {{ fmtDate(edu.endDate) }}</span>
            </div>
            <div class="text-sm text-gray-500 mt-0.5">{{ edu.major }} · {{ edu.degree }}</div>
            <p v-if="edu.description" class="text-xs text-gray-500 mt-1 whitespace-pre-line">{{ edu.description }}</p>
          </div>
        </section>

        <!-- 工作经历 -->
        <section v-if="modKey === 'workExperience' && isVisible('workExperience') && data.workExperience?.length" class="mb-6">
          <h2 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span class="w-4 h-4 rounded flex items-center justify-center" :style="{ backgroundColor: themeColor + '15' }">
              <svg class="w-2.5 h-2.5" :style="{ color: themeColor }" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
            </span>
            工作经历
          </h2>
          <div v-for="(work, i) in data.workExperience" :key="i" class="mb-4 pl-4 border-l-2 relative" :style="{ borderColor: themeColor + '30' }">
            <div class="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white" :style="{ backgroundColor: themeColor }"></div>
            <div class="flex justify-between items-baseline">
              <span class="font-semibold text-sm text-gray-900">{{ work.company }}</span>
              <span class="text-xs text-gray-400">{{ fmtDate(work.startDate) }} - {{ fmtDate(work.endDate) }}</span>
            </div>
            <div class="text-sm text-gray-500 mt-0.5">{{ work.position }}</div>
            <div v-if="work.description" class="text-xs text-gray-500 mt-1 resume-md" v-html="renderMarkdown(work.description, themeColor)"></div>
          </div>
        </section>

        <!-- 项目经验 -->
        <section v-if="modKey === 'projects' && isVisible('projects') && data.projects?.length" class="mb-6">
          <h2 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span class="w-4 h-4 rounded flex items-center justify-center" :style="{ backgroundColor: themeColor + '15' }">
              <svg class="w-2.5 h-2.5" :style="{ color: themeColor }" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
            </span>
            项目经验
          </h2>
          <div v-for="(proj, i) in data.projects" :key="i" class="mb-4 pl-4 border-l-2 relative" :style="{ borderColor: themeColor + '30' }">
            <div class="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white" :style="{ backgroundColor: themeColor }"></div>
            <div class="flex justify-between items-baseline">
              <span class="font-semibold text-sm text-gray-900">{{ proj.name }}</span>
              <span class="text-xs text-gray-400">{{ fmtDate(proj.startDate) }} - {{ fmtDate(proj.endDate) }}</span>
            </div>
            <div v-if="proj.role" class="text-sm text-gray-500 mt-0.5">{{ proj.role }}</div>
            <div v-if="proj.description" class="text-xs text-gray-500 mt-1 resume-md" v-html="renderMarkdown(proj.description, themeColor)"></div>
          </div>
        </section>

        <!-- 作品集 -->
        <section v-if="modKey === 'portfolios' && isVisible('portfolios') && data.portfolios?.length">
          <h2 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span class="w-4 h-4 rounded flex items-center justify-center" :style="{ backgroundColor: themeColor + '15' }">
              <svg class="w-2.5 h-2.5" :style="{ color: themeColor }" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            </span>
            作品集
          </h2>
          <div v-for="(port, i) in data.portfolios" :key="i" class="mb-3 pl-4 border-l-2 relative" :style="{ borderColor: themeColor + '30' }">
            <div class="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white" :style="{ backgroundColor: themeColor }"></div>
            <span class="font-semibold text-sm text-gray-900">{{ port.title }}</span>
            <p v-if="port.url" class="text-xs mt-0.5" :style="{ color: themeColor }">{{ port.url }}</p>
            <p v-if="port.description" class="text-xs text-gray-500 mt-1">{{ port.description }}</p>
          </div>
        </section>
      </template>
    </main>
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

const sidebarStyle = computed(() => {
  const theme = themeColors.find(t => t.id === props.styleConfig.theme) || themeColors[0]
  return {
    background: `linear-gradient(180deg, ${theme.primary} 0%, ${adjustColor(theme.primary, -30)} 100%)`
  }
})

function adjustColor(hex, amount) {
  const num = parseInt(hex.slice(1), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount))
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount))
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`
}

const rightSideModules = computed(() => {
  return props.moduleOrder.filter(key =>
    !['personalInfo', 'jobIntention', 'skills', 'certificates', 'selfEvaluation'].includes(key)
  )
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
