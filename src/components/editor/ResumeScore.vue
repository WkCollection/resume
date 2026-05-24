<template>
  <div class="space-y-5">
    <h3 class="font-semibold text-gray-900 flex items-center">
      <el-icon class="mr-2"><DataAnalysis /></el-icon>简历评分
    </h3>

    <!-- 综合得分 -->
    <div class="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
      <div class="relative w-24 h-24 mx-auto mb-3">
        <svg class="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" stroke-width="8" />
          <circle
            cx="50" cy="50" r="42" fill="none"
            :stroke="scoreColor"
            stroke-width="8"
            stroke-linecap="round"
            :stroke-dasharray="`${score * 2.64} 264`"
          />
        </svg>
        <span class="absolute inset-0 flex items-center justify-center text-2xl font-bold" :class="scoreTextColor">
          {{ score }}
        </span>
      </div>
      <p class="text-sm font-medium text-gray-700">{{ scoreLabel }}</p>
    </div>

    <!-- 检查项 -->
    <div class="space-y-2">
      <div
        v-for="item in checkItems"
        :key="item.key"
        class="flex items-center gap-3 p-3 rounded-lg text-sm"
        :class="item.passed ? 'bg-green-50' : 'bg-gray-50'"
      >
        <el-icon :class="item.passed ? 'text-green-500' : 'text-gray-400'">
          <CircleCheckFilled v-if="item.passed" />
          <CircleCloseFilled v-else />
        </el-icon>
        <span :class="item.passed ? 'text-green-700' : 'text-gray-500'">{{ item.label }}</span>
      </div>
    </div>

    <!-- 优化建议 -->
    <div v-if="suggestions.length" class="space-y-2">
      <h4 class="text-sm font-medium text-gray-700">优化建议</h4>
      <div
        v-for="(tip, i) in suggestions"
        :key="i"
        class="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg"
      >
        <el-icon class="mt-0.5 flex-shrink-0"><Warning /></el-icon>
        <span>{{ tip }}</span>
      </div>
    </div>

    <!-- 关键词分析 (VIP) -->
    <div class="border-t border-gray-200 pt-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-sm font-medium text-gray-700">关键词分析</h4>
        <el-tag v-if="!authStore.isVip" type="warning" size="small" effect="dark">VIP</el-tag>
      </div>
      <div v-if="authStore.isVip" class="space-y-2">
        <div v-if="extractedKeywords.length" class="flex flex-wrap gap-2">
          <el-tag
            v-for="kw in extractedKeywords"
            :key="kw"
            size="small"
            effect="plain"
          >
            {{ kw }}
          </el-tag>
        </div>
        <p v-else class="text-sm text-gray-400">填写更多内容后可分析关键词</p>
      </div>
      <div v-else class="text-center py-4 bg-gray-50 rounded-lg">
        <p class="text-sm text-gray-400 mb-2">升级 VIP 解锁关键词分析</p>
        <el-button type="primary" size="small" round>升级会员</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { validateResumeCompleteness } from '@/utils/validators'

const props = defineProps({
  modules: { type: Object, required: true },
  jobIntention: { type: Object, default: () => ({}) }
})

const authStore = useAuthStore()

const result = computed(() => validateResumeCompleteness(props.modules))
const score = computed(() => result.value.score)

const scoreColor = computed(() => {
  if (score.value >= 80) return '#059669'
  if (score.value >= 60) return '#2563eb'
  if (score.value >= 40) return '#d97706'
  return '#dc2626'
})

const scoreTextColor = computed(() => {
  if (score.value >= 80) return 'text-green-600'
  if (score.value >= 60) return 'text-primary-600'
  if (score.value >= 40) return 'text-amber-600'
  return 'text-red-600'
})

const scoreLabel = computed(() => {
  if (score.value >= 90) return '优秀简历'
  if (score.value >= 75) return '良好简历'
  if (score.value >= 60) return '合格简历'
  return '需要完善'
})

const checkItems = computed(() => [
  { key: 'name', label: '填写了姓名', passed: result.value.checks.hasName },
  { key: 'phone', label: '填写了手机号', passed: result.value.checks.hasPhone },
  { key: 'email', label: '填写了邮箱', passed: result.value.checks.hasEmail },
  { key: 'education', label: '添加了教育经历', passed: result.value.checks.hasEducation },
  { key: 'work', label: '添加了工作经历', passed: result.value.checks.hasWorkExperience },
  { key: 'skills', label: '添加了技能特长', passed: result.value.checks.hasSkills }
])

const suggestions = computed(() => {
  const tips = []
  const m = props.modules

  if (!m.personalInfo?.name) tips.push('建议填写真实姓名，增加可信度')
  if (!m.personalInfo?.phone) tips.push('手机号是必填项，HR 需要联系方式')
  if (!m.personalInfo?.email) tips.push('填写邮箱方便企业发送面试通知')
  if (!m.education?.length) tips.push('添加教育经历，展示你的学历背景')
  if (!m.workExperience?.length && !m.projects?.length) tips.push('添加工作经历或项目经验，展示你的能力')
  if (!m.skills?.length) tips.push('添加技能特长，让 HR 快速了解你的专长')
  if (!m.selfEvaluation) tips.push('添加自我评价，突出你的个人优势')
  if (m.workExperience?.length && m.workExperience.some(w => !w.description)) tips.push('工作经历建议补充具体描述和业绩')
  if (m.projects?.length && m.projects.some(p => !p.description)) tips.push('项目经验建议补充详细描述和技术栈')

  return tips
})

const extractedKeywords = computed(() => {
  const keywords = new Set()
  const position = props.jobIntention?.position || ''

  // 从技能中提取关键词
  props.modules.skills?.forEach(s => { if (s.name) keywords.add(s.name) })

  // 从项目描述中提取常见技术关键词
  const techKeywords = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C++',
    'Vue', 'React', 'Angular', 'Node.js', 'Express', 'Spring',
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
    'Docker', 'Kubernetes', 'AWS', 'Linux',
    'HTML', 'CSS', 'Tailwind', 'Webpack', 'Vite',
    'Git', 'CI/CD', 'RESTful', 'GraphQL', '微服务',
    'React', 'Flutter', 'Swift', 'Kotlin',
    'TensorFlow', 'PyTorch', 'AI', 'ML',
    'Figma', 'UI/UX', 'Agile', 'Scrum'
  ]

  const allText = [
    ...props.modules.workExperience?.map(w => w.description || '') || [],
    ...props.modules.projects?.map(p => p.description || '') || []
  ].join(' ')

  techKeywords.forEach(kw => {
    if (allText.toLowerCase().includes(kw.toLowerCase())) {
      keywords.add(kw)
    }
  })

  if (position) keywords.add(position)

  return [...keywords].slice(0, 15)
})
</script>
