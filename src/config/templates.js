/**
 * 简历模板配置
 * 前端可配置模板上下架
 */
export const templates = [
  {
    id: 'basic',
    name: '经典简约',
    description: '适合大多数行业的经典单栏布局，简约大方',
    category: '通用',
    style: 'minimal',
    isFree: true,
    thumbnail: '',
    tags: ['通用', '简约', '应届生']
  },
  {
    id: 'modern',
    name: '现代双栏',
    description: '互联网、IT行业首选双栏布局，突出技能与项目',
    category: '互联网',
    style: 'modern',
    isFree: true,
    thumbnail: '',
    tags: ['互联网', '双栏', 'IT']
  },
  {
    id: 'classic',
    name: '商务精英',
    description: '金融、管理岗位首选，正式商务风格',
    category: '金融',
    style: 'professional',
    isFree: false,
    thumbnail: '',
    tags: ['金融', '商务', '管理']
  }
]

/**
 * 模块配置
 * 定义简历各模块的元信息
 */
export const moduleConfig = {
  personalInfo: { label: '个人信息', icon: 'User', required: true },
  education: { label: '教育经历', icon: 'School', required: false },
  workExperience: { label: '工作经历', icon: 'Briefcase', required: false },
  projects: { label: '项目经验', icon: 'Files', required: false },
  certificates: { label: '技能证书', icon: 'Medal', required: false },
  selfEvaluation: { label: '自我评价', icon: 'ChatDotRound', required: false }
}

/**
 * 主题配色方案
 */
export const themeColors = [
  { id: 'blue', name: '商务蓝', primary: '#2C3E50', secondary: '#3498DB' },
  { id: 'sky', name: '天空蓝', primary: '#2563eb', secondary: '#60a5fa' },
  { id: 'green', name: '清新绿', primary: '#16a34a', secondary: '#4ade80' },
  { id: 'purple', name: '优雅紫', primary: '#7c3aed', secondary: '#a78bfa' },
  { id: 'red', name: '热情红', primary: '#dc2626', secondary: '#f87171' },
  { id: 'gray', name: '沉稳灰', primary: '#374151', secondary: '#9ca3af' }
]
