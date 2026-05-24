/**
 * LocalStorage 封装工具
 * 提供统一的本地存储读写接口
 */

/**
 * 获取存储项
 * @param {string} key - 存储键名
 * @returns {string|null} 存储的值
 */
export function getStorageItem(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * 设置存储项
 * @param {string} key - 存储键名
 * @param {string} value - 存储的值
 */
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    console.warn('LocalStorage 写入失败:', e)
  }
}

/**
 * 删除存储项
 * @param {string} key - 存储键名
 */
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key)
  } catch {
    // 忽略删除失败
  }
}

/**
 * 清除所有与项目相关的存储项
 */
export function clearAllStorage() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('zc_'))
  keys.forEach(k => localStorage.removeItem(k))
}

/**
 * 导出用户数据备份
 * @param {string} userId - 用户 ID
 * @returns {Object} 包含所有用户数据的备份对象
 */
export function exportBackup(userId) {
  const backup = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    userId,
    resumes: []
  }

  const key = `zc_resumes_${userId}`
  const data = getStorageItem(key)
  if (data) {
    backup.resumes = JSON.parse(data)
  }

  return backup
}

/**
 * 下载备份文件
 * @param {Object} backup - 备份数据
 * @param {string} filename - 文件名
 */
export function downloadBackup(backup, filename) {
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename || `职创在线_备份_${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * 从文件导入备份数据
 * @param {File} file - 备份文件
 * @returns {Promise<Object>} 解析后的备份数据
 */
export function importBackup(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (!data.version || !data.resumes) {
          reject(new Error('无效的备份文件格式'))
          return
        }
        resolve(data)
      } catch {
        reject(new Error('备份文件解析失败'))
      }
    }
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsText(file)
  })
}

/**
 * 恢复备份数据到本地存储
 * @param {Object} backup - 备份数据
 * @param {string} userId - 当前用户 ID
 * @param {Object} options - 选项
 * @param {boolean} options.merge - 是否合并（而非覆盖）
 */
export function restoreBackup(backup, userId, options = {}) {
  const key = `zc_resumes_${userId}`

  if (options.merge) {
    const existing = JSON.parse(getStorageItem(key) || '[]')
    const existingIds = new Set(existing.map(r => r.id))
    const newResumes = backup.resumes.filter(r => !existingIds.has(r.id))
    setStorageItem(key, JSON.stringify([...existing, ...newResumes]))
    return newResumes.length
  } else {
    setStorageItem(key, JSON.stringify(backup.resumes))
    return backup.resumes.length
  }
}
