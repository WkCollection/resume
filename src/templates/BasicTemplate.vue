<template>
  <!-- 经典简约模板 - 复刻版 -->
  <div class="template-preview bg-white" :style="pageStyle" style="height: auto;">
    <!-- 标题 -->
    <div class="text-center py-6 relative" :style="{ borderBottom: `2px solid ${primaryColor}` }">
      <h1 class="text-[1.5em] font-semibold inline-block px-6" :style="{ color: primaryColor, letterSpacing: '0.5em' }">个人简历</h1>
      <p class="text-[0.6em] text-gray-400 mt-1.5" style="letter-spacing: 0.3em;">PERSONAL RESUME</p>
    </div>

    <!-- 顶部信息区 -->
    <header class="px-10 pt-6 pb-5 flex items-start gap-8">
      <!-- 左侧：信息网格 -->
      <div class="flex-1 min-w-0">
        <div class="grid grid-cols-2 gap-x-12 text-[0.75em]">
          <template v-for="(row, ri) in infoRows" :key="ri">
            <div v-for="(item, ci) in row" :key="ci" class="flex gap-3 py-0.5">
              <span class="text-gray-400 whitespace-nowrap">{{ item.label }}</span>
              <span class="text-gray-700" :class="{ 'text-[1em] text-gray-900': ri === 0 && ci === 0 }">{{ item.value }}</span>
            </div>
          </template>
        </div>
      </div>
      <!-- 右侧：证件照 -->
      <div class="shrink-0">
        <img
          v-if="data.personalInfo?.avatar"
          :src="data.personalInfo.avatar"
          class="w-[85px] h-[119px] object-contain border border-gray-200 bg-white"
        />
        <div
          v-else
          class="w-[85px] h-[119px] bg-white border border-gray-200 flex items-center justify-center"
        >
          <span class="text-gray-300 text-[0.79em]">证件照</span>
        </div>
      </div>
    </header>

    <!-- 内容区域 -->
    <div class="px-10 pb-8">
      <template v-for="modKey in orderedModules" :key="modKey">

        <!-- 教育经历 -->
        <section v-if="modKey === 'education' && isVisible('education') && data.education?.length" class="mb-7">
          <div class="section-bar flex items-center gap-2 px-4 py-2 rounded-sm text-white text-[0.86em] font-bold" :style="{ backgroundColor: primaryColor }">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
            教育经历
          </div>
          <div class="mt-4">
            <div v-for="(edu, i) in data.education" :key="i" class="mb-4">
              <div class="flex items-baseline">
                <div class="text-[0.86em] font-bold" :style="{ color: primaryColor }">{{ edu.school }}</div>
                <div class="flex-1 text-center text-[0.79em] text-gray-600">{{ edu.major }}（{{ edu.degree }}）</div>
                <div class="text-[0.75em] text-gray-400">{{ fmtDate(edu.startDate) }} - {{ fmtDate(edu.endDate) }}</div>
              </div>
              <p v-if="edu.description" class="text-[0.75em] text-gray-500 mt-1 whitespace-pre-line leading-relaxed">
                <span v-for="(line, li) in edu.description.split('\n')" :key="li" class="block">{{ line }}</span>
              </p>
            </div>
          </div>
        </section>

        <!-- 工作经历 -->
        <section v-if="modKey === 'workExperience' && isVisible('workExperience') && data.workExperience?.length" class="mb-7">
          <div class="section-bar flex items-center gap-2 px-4 py-2 rounded-sm text-white text-[0.86em] font-bold" :style="{ backgroundColor: primaryColor }">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
            工作经历
          </div>
          <div class="mt-4">
            <div v-for="(work, i) in data.workExperience" :key="i" class="mb-4">
              <div class="flex justify-between items-baseline">
                <span class="text-[0.86em] font-bold" :style="{ color: primaryColor }">{{ work.company }}</span>
                <span class="text-[0.79em] text-gray-600">{{ work.position }}</span>
                <span class="text-[0.75em] text-gray-400">{{ fmtDate(work.startDate) }} - {{ fmtDate(work.endDate) }}</span>
              </div>
              <div v-if="work.description" class="text-[0.75em] text-gray-500 mt-1 leading-relaxed resume-md" v-html="renderMarkdown(work.description, primaryColor)"></div>
            </div>
          </div>
        </section>

        <!-- 项目经验 -->
        <section v-if="modKey === 'projects' && isVisible('projects') && data.projects?.length" class="mb-7">
          <div class="section-bar flex items-center gap-2 px-4 py-2 rounded-sm text-white text-[0.86em] font-bold" :style="{ backgroundColor: primaryColor }">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
            项目经验
          </div>
          <div class="mt-4">
            <div v-for="(proj, i) in data.projects" :key="i" class="mb-4">
              <div class="flex items-baseline">
                <div class="text-[0.86em] font-bold" :style="{ color: primaryColor }">{{ proj.name }}</div>
                <div v-if="proj.role" class="flex-1 text-center text-[0.79em] text-gray-600">{{ proj.role }}</div>
                <div class="text-[0.75em] text-gray-400">{{ fmtDate(proj.startDate) }} - {{ fmtDate(proj.endDate) }}</div>
              </div>
              <div v-if="proj.description" class="text-[0.75em] text-gray-500 mt-1.5 leading-relaxed resume-md" v-html="renderMarkdown(proj.description, primaryColor)"></div>
            </div>
          </div>
        </section>

        <!-- 技能特长 -->
        <section v-if="modKey === 'skills' && isVisible('skills') && data.skills?.length" class="mb-7">
          <div class="section-bar flex items-center gap-2 px-4 py-2 rounded-sm text-white text-[0.86em] font-bold" :style="{ backgroundColor: primaryColor }">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
            技能特长
          </div>
          <div class="mt-4">
            <div v-for="(skill, i) in data.skills" :key="i" class="flex items-center gap-2 text-[0.79em] text-gray-600 mb-1.5">
              <span>{{ skill.name }}</span>
              <span class="text-gray-400 text-[0.71em]">{{ skill.level }}</span>
            </div>
          </div>
        </section>

        <!-- 技能证书 -->
        <section v-if="modKey === 'certificates' && isVisible('certificates') && data.certificates?.length" class="mb-7">
          <div class="section-bar flex items-center gap-2 px-4 py-2 rounded-sm text-white text-[0.86em] font-bold" :style="{ backgroundColor: primaryColor }">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>
            技能证书
          </div>
          <div class="mt-4">
            <div v-for="(cert, i) in data.certificates" :key="i" class="flex items-center gap-2 text-[0.79em] text-gray-600 mb-1.5 pl-3 relative"><span class="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full inline-block" :style="{ backgroundColor: accentColor }"></span>
              <span>{{ cert.name }}</span>
              <span class="text-gray-400 text-[0.71em] ml-auto">{{ fmtDate(cert.date) }}</span>
            </div>
          </div>
        </section>

        <!-- 作品集 -->
        <section v-if="modKey === 'portfolios' && isVisible('portfolios') && data.portfolios?.length" class="mb-7">
          <div class="section-bar flex items-center gap-2 px-4 py-2 rounded-sm text-white text-[0.86em] font-bold" :style="{ backgroundColor: primaryColor }">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            作品集
          </div>
          <div class="mt-4">
            <div v-for="(port, i) in data.portfolios" :key="i" class="mb-2">
              <div class="flex items-center gap-2">
                <span class="text-[0.79em] font-bold text-gray-700">{{ port.title }}</span>
              </div>
              <div v-if="port.url" class="text-[0.71em] ml-3.5 mt-0.5" :style="{ color: accentColor }">{{ port.url }}</div>
              <p v-if="port.description" class="text-[0.75em] text-gray-500 mt-0.5 ml-3.5">{{ port.description }}</p>
            </div>
          </div>
        </section>

        <!-- 自我评价 -->
        <section v-if="modKey === 'selfEvaluation' && isVisible('selfEvaluation') && data.selfEvaluation" class="mb-7">
          <div class="section-bar flex items-center gap-2 px-4 py-2 rounded-sm text-white text-[0.86em] font-bold" :style="{ backgroundColor: primaryColor }">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            自我评价
          </div>
          <p class="mt-3 text-[0.79em] text-gray-600 whitespace-pre-line leading-[1.8]">{{ data.selfEvaluation }}</p>
        </section>
      </template>
    </div>
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

const primaryColor = computed(() => {
  const theme = themeColors.find(t => t.id === props.styleConfig.theme) || themeColors[0]
  return theme.primary
})

const accentColor = computed(() => {
  const theme = themeColors.find(t => t.id === props.styleConfig.theme) || themeColors[0]
  return theme.secondary
})

const orderedModules = computed(() => {
  return props.moduleOrder.filter(key => key !== 'personalInfo')
})

const infoRows = computed(() => {
  const p = props.data.personalInfo || {}
  const layout = [
    [{ label: '姓　　名', value: p.name }, { label: '出生年月', value: p.birthday }],
    [{ label: '身　　高', value: p.height ? p.height + 'cm' : '' }, { label: '民　　族', value: p.ethnicity }],
    [{ label: '电　　话', value: p.phone }, { label: '邮　　箱', value: p.email }],
    [{ label: '家庭住址', value: p.address }, { label: '政治面貌', value: p.politicalStatus }]
  ]
  return layout
    .map(row => row.filter(f => f.value))
    .filter(row => row.length > 0)
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
</script>

<style>
.resume-md p { margin: 0 0 2px; }
.resume-md p:last-child { margin-bottom: 0; }
.resume-md strong { font-weight: 600; color: #374151; }
.resume-md code { font-size: 0.9em; color: #dc2626; }
</style>
