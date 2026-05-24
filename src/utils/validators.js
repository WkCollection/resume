/**
 * 表单校验工具
 */

/**
 * 校验手机号
 */
export function isValidPhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 校验邮箱
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * 校验日期范围（结束日期不能早于开始日期）
 */
export function isValidDateRange(startDate, endDate) {
  if (!startDate || !endDate) return true
  return new Date(endDate) >= new Date(startDate)
}

/**
 * 校验必填字段
 */
export function isRequired(value) {
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return value !== null && value !== undefined
}

/**
 * 校验简历完整性
 * 返回各项完整度评分
 */
export function validateResumeCompleteness(modules) {
  const checks = {
    hasName: !!(modules.personalInfo?.name),
    hasPhone: !!(modules.personalInfo?.phone),
    hasEmail: !!(modules.personalInfo?.email),
    hasEducation: modules.education?.length > 0,
    hasWorkExperience: modules.workExperience?.length > 0,
    hasSkills: modules.skills?.length > 0
  }

  const total = Object.keys(checks).length
  const passed = Object.values(checks).filter(Boolean).length
  const score = Math.round((passed / total) * 100)

  return { checks, score, total, passed }
}
