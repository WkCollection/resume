import CryptoJS from 'crypto-js'

// 加密密钥（生产环境应使用更安全的密钥管理方式）
const SECRET_KEY = 'zhichuang-resume-2026-secret'

/**
 * 加密数据
 * @param {*} data - 要加密的数据
 * @returns {string} 加密后的字符串
 */
export function encryptData(data) {
  if (typeof data !== 'string') {
    data = JSON.stringify(data)
  }
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
}

/**
 * 解密数据
 * @param {string} encryptedData - 加密的字符串
 * @returns {*} 解密后的原始数据
 */
export function decryptData(encryptedData) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    if (!decrypted) return null
    try {
      return JSON.parse(decrypted)
    } catch {
      return decrypted
    }
  } catch {
    return null
  }
}
