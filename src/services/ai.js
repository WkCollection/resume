const STORAGE_KEY = 'zc_ai_api_key'
const API_URL = 'https://api.deepseek.com/chat/completions'
const MODEL = 'deepseek-chat'

export function getApiKey() {
  return localStorage.getItem(STORAGE_KEY) || ''
}

export function setApiKey(key) {
  if (key) {
    localStorage.setItem(STORAGE_KEY, key)
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export async function generateContent(userPrompt) {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error('请先在「个人设置」中配置 DeepSeek API Key')
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: '你是一位专业的简历撰写助手。请根据用户提供的背景信息，生成简洁、专业、有说服力的简历内容。使用 Markdown 列表格式，突出关键成果和技能。不要使用标题、不要加粗整体内容，直接输出正文。控制在 3-5 条要点，每条不超过 80 字。' },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    })
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `API 请求失败 (${res.status})`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content?.trim() || ''
}
