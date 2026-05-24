import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getStorageItem, setStorageItem } from '@/utils/storage'
import { useAuthStore } from './auth'

// 创建空简历模板
function createEmptyResume(templateId = 'basic') {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
    title: '未命名简历',
    templateId,
    modules: {
      personalInfo: {
        name: '',
        phone: '',
        email: '',
        avatar: '',
        address: '',
        website: '',
        birthday: '',
        ethnicity: '',
        height: '',
        politicalStatus: ''
      },
      jobIntention: {
        position: '',
        salary: '',
        city: '',
        availability: ''
      },
      education: [],
      workExperience: [],
      projects: [],
      skills: [],
      certificates: [],
      portfolios: [],
      selfEvaluation: ''
    },
    style: {
      theme: 'blue',
      fontFamily: 'default',
      fontSize: 18,
      lineHeight: 1.6,
      margin: 20,
      layout: 'single'
    },
    moduleOrder: [
      'personalInfo',
      'education',
      'workExperience',
      'projects',
      'certificates',
      'selfEvaluation'
    ],
    hiddenModules: [],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }
}

export const useResumeStore = defineStore('resume', () => {
  // 简历列表
  const resumes = ref([])

  // 获取当前用户的简历
  const userResumes = computed(() => {
    return resumes.value
  })

  // 简历数量
  const resumeCount = computed(() => resumes.value.length)

  // 从本地存储加载简历
  function loadResumes() {
    const authStore = useAuthStore()
    if (!authStore.currentUser) return
    const key = `zc_resumes_${authStore.currentUser.id}`
    const data = getStorageItem(key)
    resumes.value = data ? JSON.parse(data) : []
  }

  // 保存简历到本地存储
  function saveResumes() {
    const authStore = useAuthStore()
    if (!authStore.currentUser) return
    const key = `zc_resumes_${authStore.currentUser.id}`
    setStorageItem(key, JSON.stringify(resumes.value))
  }

  // 新建简历
  function createResume(templateId = 'basic', title = '未命名简历') {
    const authStore = useAuthStore()
    // 免费用户最多 5 份简历
    if (!authStore.isVip && resumes.value.length >= 5) {
      return { success: false, message: '免费用户最多创建 5 份简历，请升级会员' }
    }
    const resume = createEmptyResume(templateId)
    resume.title = title
    resumes.value.unshift(resume)
    saveResumes()
    return { success: true, data: resume }
  }

  // 获取单份简历
  function getResume(id) {
    return resumes.value.find(r => r.id === id)
  }

  // 更新简历
  function updateResume(id, updates) {
    const index = resumes.value.findIndex(r => r.id === id)
    if (index === -1) return false
    Object.assign(resumes.value[index], updates, { updatedAt: new Date().toISOString() })
    saveResumes()
    return true
  }

  // 更新简历模块数据
  function updateResumeModules(id, modules) {
    const index = resumes.value.findIndex(r => r.id === id)
    if (index === -1) return false
    resumes.value[index].modules = { ...resumes.value[index].modules, ...modules }
    resumes.value[index].updatedAt = new Date().toISOString()
    saveResumes()
    return true
  }

  // 复制简历
  function duplicateResume(id) {
    const authStore = useAuthStore()
    if (!authStore.isVip && resumes.value.length >= 5) {
      return { success: false, message: '免费用户最多创建 5 份简历，请升级会员' }
    }
    const source = resumes.value.find(r => r.id === id)
    if (!source) return { success: false, message: '简历不存在' }
    const copy = JSON.parse(JSON.stringify(source))
    copy.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
    copy.title = `${source.title} (副本)`
    copy.createdAt = new Date().toISOString()
    copy.updatedAt = new Date().toISOString()
    resumes.value.unshift(copy)
    saveResumes()
    return { success: true, data: copy }
  }

  // 删除简历
  function deleteResume(id) {
    const index = resumes.value.findIndex(r => r.id === id)
    if (index === -1) return false
    resumes.value.splice(index, 1)
    saveResumes()
    return true
  }

  // 重命名简历
  function renameResume(id, title) {
    const index = resumes.value.findIndex(r => r.id === id)
    if (index === -1) return false
    resumes.value[index].title = title
    resumes.value[index].updatedAt = new Date().toISOString()
    saveResumes()
    return true
  }

  return {
    resumes,
    userResumes,
    resumeCount,
    loadResumes,
    createResume,
    getResume,
    updateResume,
    updateResumeModules,
    duplicateResume,
    deleteResume,
    renameResume
  }
})
