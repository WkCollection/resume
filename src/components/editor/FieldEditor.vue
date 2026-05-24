<template>
  <div class="space-y-4">
    <!-- 个人信息 -->
    <section v-if="activeModule === 'personalInfo'" class="space-y-4">
      <h3 class="font-semibold text-gray-900 flex items-center">
        <el-icon class="mr-2"><User /></el-icon>个人信息
      </h3>

      <!-- 头像上传 -->
      <div class="flex items-center gap-4 mb-2">
        <div class="relative group">
          <div
            v-if="data.personalInfo.avatar"
            class="w-[52px] h-[72px] bg-white bg-contain bg-center shadow-sm"
            :style="{ backgroundImage: `url(${data.personalInfo.avatar})` }"
          ></div>
          <div
            v-else
            class="w-[52px] h-[72px] bg-primary-50 flex items-center justify-center"
          >
            <el-icon :size="22" class="text-primary-300"><User /></el-icon>
          </div>
          <label class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <el-icon class="text-white" :size="16"><Camera /></el-icon>
            <input type="file" accept="image/*" class="hidden" @change="handleAvatarUpload" />
          </label>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-700">个人照片</p>
          <p class="text-xs text-gray-400 mt-1">建议使用正方形照片，支持 JPG/PNG 格式</p>
          <el-button v-if="data.personalInfo.avatar" size="small" text type="danger" @click="removeAvatar" class="mt-1">移除照片</el-button>
        </div>
      </div>

      <el-form label-position="top" size="default">
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="data.personalInfo.name" placeholder="请输入姓名" @input="emitUpdate" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生年月">
              <el-date-picker v-model="data.personalInfo.birthday" type="month" placeholder="请选择" format="YYYY.MM" value-format="YYYY.MM" @change="emitUpdate" class="!w-full" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="民族">
              <el-select v-model="data.personalInfo.ethnicity" placeholder="请选择" @change="emitUpdate" class="w-full">
                <el-option v-for="item in ethnicityOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="身高">
              <el-input v-model="data.personalInfo.height" placeholder="例如：177" @input="emitUpdate">
                <template #append>cm</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="政治面貌">
              <el-select v-model="data.personalInfo.politicalStatus" placeholder="请选择" @change="emitUpdate" class="w-full">
                <el-option label="群众" value="群众" />
                <el-option label="共青团员" value="共青团员" />
                <el-option label="中共党员" value="中共党员" />
                <el-option label="中共预备党员" value="中共预备党员" />
                <el-option label="民主党派" value="民主党派" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号">
              <el-input v-model="data.personalInfo.phone" placeholder="请输入手机号" @input="emitUpdate" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="邮箱">
              <el-input v-model="data.personalInfo.email" placeholder="请输入邮箱" @input="emitUpdate" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地址">
              <el-input v-model="data.personalInfo.address" placeholder="请输入地址" @input="emitUpdate" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="网站">
              <el-input v-model="data.personalInfo.website" placeholder="个人主页/博客/GitHub等" @input="emitUpdate" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>

    <!-- 教育经历 -->
    <section v-if="activeModule === 'education'" class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-900 flex items-center">
          <el-icon class="mr-2"><School /></el-icon>教育经历
        </h3>
        <el-button size="small" type="primary" text @click="addItem('education')">
          <el-icon class="mr-1"><Plus /></el-icon>添加
        </el-button>
      </div>
      <div v-for="(item, index) in data.education" :key="index" class="p-4 bg-gray-50 rounded-lg relative">
        <el-button
          v-if="data.education.length > 1"
          :icon="Delete"
          circle size="small" text type="danger"
          class="!absolute !top-2 !right-2 !z-10"
          @click="removeItem('education', index)"
        />
        <el-form label-position="top" size="default">
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="学校">
                <el-input v-model="item.school" placeholder="请输入学校名称" @input="emitUpdate" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专业">
                <el-input v-model="item.major" placeholder="请输入专业" @input="emitUpdate" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="16">
            <el-col :span="8">
              <el-form-item label="学历">
                <el-select v-model="item.degree" placeholder="选择学历" @change="emitUpdate" class="w-full">
                  <el-option label="高中" value="高中" />
                  <el-option label="大专" value="大专" />
                  <el-option label="本科" value="本科" />
                  <el-option label="硕士" value="硕士" />
                  <el-option label="博士" value="博士" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间">
                <el-date-picker v-model="item.startDate" type="month" placeholder="开始时间" format="YYYY-MM" value-format="YYYY-MM" @change="emitUpdate" class="!w-full" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束时间">
                <el-date-picker v-model="item.endDate" type="month" placeholder="结束时间" format="YYYY-MM" value-format="YYYY-MM" @change="emitUpdate" class="!w-full" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="描述">
            <el-input v-model="item.description" type="textarea" :rows="2" placeholder="主修课程、荣誉奖项等" @input="emitUpdate" />
          </el-form-item>
        </el-form>
      </div>
      <el-empty v-if="data.education.length === 0" description="暂无教育经历" :image-size="60">
        <el-button size="small" type="primary" text @click="addItem('education')">添加教育经历</el-button>
      </el-empty>
    </section>

    <!-- 工作经历 -->
    <section v-if="activeModule === 'workExperience'" class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-900 flex items-center">
          <el-icon class="mr-2"><Briefcase /></el-icon>工作经历
        </h3>
        <el-button size="small" type="primary" text @click="addItem('workExperience')">
          <el-icon class="mr-1"><Plus /></el-icon>添加
        </el-button>
      </div>
      <div v-for="(item, index) in data.workExperience" :key="index" class="p-4 bg-gray-50 rounded-lg relative">
        <el-button
          :icon="Delete"
          circle size="small" text type="danger"
          class="!absolute !top-2 !right-2 !z-10"
          @click="removeItem('workExperience', index)"
        />
        <el-form label-position="top" size="default">
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="公司">
                <el-input v-model="item.company" placeholder="请输入公司名称" @input="emitUpdate" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职位">
                <el-input v-model="item.position" placeholder="请输入职位" @input="emitUpdate" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="开始时间">
                <el-date-picker v-model="item.startDate" type="month" placeholder="开始时间" format="YYYY-MM" value-format="YYYY-MM" @change="emitUpdate" class="!w-full" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间">
                <el-date-picker v-model="item.endDate" type="month" placeholder="结束时间" format="YYYY-MM" value-format="YYYY-MM" @change="emitUpdate" class="!w-full" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="工作描述">
            <div class="w-full">
              <div class="flex items-center gap-2 mb-1.5">
                <el-radio-group :model-value="getDescMode(item)" size="small" @change="(v) => setDescMode(item, v)">
                  <el-radio-button value="edit">编辑</el-radio-button>
                  <el-radio-button value="preview">预览</el-radio-button>
                </el-radio-group>
                <span class="text-xs text-gray-400">支持 Markdown 语法</span>
              </div>
              <el-input v-if="getDescMode(item) !== 'preview'" v-model="item.description" type="textarea" :rows="5" placeholder="支持 Markdown 语法&#10;- 使用 **粗体** 强调关键内容&#10;- 使用 - 开头创建列表项&#10;- 使用 `代码` 标注技术名词" @input="emitUpdate" />
              <div v-else class="markdown-preview p-3 bg-white border border-gray-200 rounded min-h-[100px] text-sm" v-html="renderMd(item.description)"></div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-empty v-if="data.workExperience.length === 0" description="暂无工作经历" :image-size="60">
        <el-button size="small" type="primary" text @click="addItem('workExperience')">添加工作经历</el-button>
      </el-empty>
    </section>

    <!-- 项目经验 -->
    <section v-if="activeModule === 'projects'" class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-900 flex items-center">
          <el-icon class="mr-2"><Files /></el-icon>项目经验
        </h3>
        <el-button size="small" type="primary" text @click="addItem('projects')">
          <el-icon class="mr-1"><Plus /></el-icon>添加
        </el-button>
      </div>
      <div v-for="(item, index) in data.projects" :key="index" class="p-4 bg-gray-50 rounded-lg relative">
        <el-button
          :icon="Delete"
          circle size="small" text type="danger"
          class="!absolute !top-2 !right-2 !z-10"
          @click="removeItem('projects', index)"
        />
        <el-form label-position="top" size="default">
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="项目名称">
                <el-input v-model="item.name" placeholder="请输入项目名称" @input="emitUpdate" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="担任角色">
                <el-input v-model="item.role" placeholder="请输入角色" @input="emitUpdate" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="开始时间">
                <el-date-picker v-model="item.startDate" type="month" placeholder="开始时间" format="YYYY-MM" value-format="YYYY-MM" @change="emitUpdate" class="!w-full" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间">
                <el-date-picker v-model="item.endDate" type="month" placeholder="结束时间" format="YYYY-MM" value-format="YYYY-MM" @change="emitUpdate" class="!w-full" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="项目描述">
            <div class="w-full">
              <div class="flex items-center gap-2 mb-1.5">
                <el-radio-group :model-value="getDescMode(item)" size="small" @change="(v) => setDescMode(item, v)">
                  <el-radio-button value="edit">编辑</el-radio-button>
                  <el-radio-button value="preview">预览</el-radio-button>
                </el-radio-group>
                <span class="text-xs text-gray-400">支持 Markdown 语法</span>
              </div>
              <el-input v-if="getDescMode(item) !== 'preview'" v-model="item.description" type="textarea" :rows="5" placeholder="支持 Markdown 语法&#10;- 使用 **粗体** 强调关键内容&#10;- 使用 - 开头创建列表项&#10;- 使用 `代码` 标注技术名词" @input="emitUpdate" />
              <div v-else class="markdown-preview p-3 bg-white border border-gray-200 rounded min-h-[100px] text-sm" v-html="renderMd(item.description)"></div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-empty v-if="data.projects.length === 0" description="暂无项目经验" :image-size="60">
        <el-button size="small" type="primary" text @click="addItem('projects')">添加项目经验</el-button>
      </el-empty>
    </section>

    <!-- 技能特长 -->
    <section v-if="activeModule === 'skills'" class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-900 flex items-center">
          <el-icon class="mr-2"><Trophy /></el-icon>技能特长
        </h3>
        <el-button size="small" type="primary" text @click="addItem('skills')">
          <el-icon class="mr-1"><Plus /></el-icon>添加
        </el-button>
      </div>
      <div v-for="(item, index) in data.skills" :key="index" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <el-input v-model="item.name" placeholder="技能名称" class="flex-1" @input="emitUpdate" />
        <el-select v-model="item.level" placeholder="熟练度" style="width: 120px" @change="emitUpdate">
          <el-option label="了解" value="了解" />
          <el-option label="熟悉" value="熟悉" />
          <el-option label="掌握" value="掌握" />
          <el-option label="精通" value="精通" />
        </el-select>
        <el-button :icon="Delete" circle size="small" text type="danger" @click="removeItem('skills', index)" />
      </div>
      <el-empty v-if="data.skills.length === 0" description="暂无技能" :image-size="60">
        <el-button size="small" type="primary" text @click="addItem('skills')">添加技能</el-button>
      </el-empty>
    </section>

    <!-- 证书资质 -->
    <section v-if="activeModule === 'certificates'" class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-900 flex items-center">
          <el-icon class="mr-2"><Medal /></el-icon>证书资质
        </h3>
        <el-button size="small" type="primary" text @click="addItem('certificates')">
          <el-icon class="mr-1"><Plus /></el-icon>添加
        </el-button>
      </div>
      <div v-for="(item, index) in data.certificates" :key="index" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <el-input v-model="item.name" placeholder="证书名称" class="flex-1" @input="emitUpdate" />
        <el-date-picker v-model="item.date" type="month" placeholder="获得时间" format="YYYY-MM" value-format="YYYY-MM" @change="emitUpdate" style="width: 150px" />
        <el-button :icon="Delete" circle size="small" text type="danger" @click="removeItem('certificates', index)" />
      </div>
      <el-empty v-if="data.certificates.length === 0" description="暂无证书" :image-size="60">
        <el-button size="small" type="primary" text @click="addItem('certificates')">添加证书</el-button>
      </el-empty>
    </section>

    <!-- 作品集 -->
    <section v-if="activeModule === 'portfolios'" class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-900 flex items-center">
          <el-icon class="mr-2"><Picture /></el-icon>作品集
        </h3>
        <el-button size="small" type="primary" text @click="addItem('portfolios')">
          <el-icon class="mr-1"><Plus /></el-icon>添加
        </el-button>
      </div>
      <div v-for="(item, index) in data.portfolios" :key="index" class="p-4 bg-gray-50 rounded-lg relative">
        <el-button
          :icon="Delete"
          circle size="small" text type="danger"
          class="!absolute !top-2 !right-2 !z-10"
          @click="removeItem('portfolios', index)"
        />
        <el-form label-position="top" size="default">
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="作品标题">
                <el-input v-model="item.title" placeholder="作品标题" @input="emitUpdate" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="链接">
                <el-input v-model="item.url" placeholder="作品链接" @input="emitUpdate" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="描述">
            <el-input v-model="item.description" type="textarea" :rows="2" placeholder="简要描述" @input="emitUpdate" />
          </el-form-item>
        </el-form>
      </div>
      <el-empty v-if="data.portfolios.length === 0" description="暂无作品" :image-size="60">
        <el-button size="small" type="primary" text @click="addItem('portfolios')">添加作品</el-button>
      </el-empty>
    </section>

    <!-- 自我评价 -->
    <section v-if="activeModule === 'selfEvaluation'" class="space-y-4">
      <h3 class="font-semibold text-gray-900 flex items-center">
        <el-icon class="mr-2"><ChatDotRound /></el-icon>自我评价
      </h3>
      <el-input
        v-model="data.selfEvaluation"
        type="textarea"
        :rows="6"
        placeholder="简要介绍自己的优势、特长、职业目标等"
        @input="emitUpdate"
      />
    </section>
  </div>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { renderMarkdown } from '@/utils/markdown'

const ethnicityOptions = [
  '汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族',
  '布依族', '朝鲜族', '满族', '侗族', '瑶族', '白族', '土家族', '哈尼族',
  '哈萨克族', '傣族', '黎族', '傈僳族', '佤族', '畲族', '高山族', '拉祜族',
  '水族', '东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族', '达斡尔族',
  '仫佬族', '羌族', '布朗族', '撒拉族', '毛南族', '仡佬族', '锡伯族',
  '阿昌族', '普米族', '塔吉克族', '怒族', '乌孜别克族', '俄罗斯族',
  '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族', '独龙族',
  '鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族'
]

const props = defineProps({
  data: { type: Object, required: true },
  activeModule: { type: String, required: true }
})

const emit = defineEmits(['update'])

function emitUpdate() {
  emit('update', { ...props.data })
}

function handleAvatarUpload(e) {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    ElMessage.warning('图片大小不能超过 2MB')
    return
  }
  const reader = new FileReader()
  reader.onload = (ev) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const targetW = 250
      const targetH = 350
      canvas.width = targetW
      canvas.height = targetH
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, targetW, targetH)
      const scale = Math.min(targetW / img.width, targetH / img.height)
      const dw = img.width * scale
      const dh = img.height * scale
      const dx = (targetW - dw) / 2
      const dy = (targetH - dh) / 2
      ctx.drawImage(img, dx, dy, dw, dh)
      props.data.personalInfo.avatar = canvas.toDataURL('image/jpeg', 0.85)
      emitUpdate()
    }
    img.src = ev.target.result
  }
  reader.readAsDataURL(file)
}

function removeAvatar() {
  props.data.personalInfo.avatar = ''
  emitUpdate()
}

// 各模块的空项模板
const itemTemplates = {
  education: { school: '', major: '', degree: '', startDate: '', endDate: '', description: '' },
  workExperience: { company: '', position: '', startDate: '', endDate: '', description: '', _descMode: 'edit' },
  projects: { name: '', role: '', startDate: '', endDate: '', description: '', _descMode: 'edit' },
  skills: { name: '', level: '掌握' },
  certificates: { name: '', date: '', issuer: '' },
  portfolios: { title: '', url: '', description: '' }
}

function renderMd(text) {
  return renderMarkdown(text)
}

function getDescMode(item) {
  return item._descMode || 'edit'
}

function setDescMode(item, mode) {
  item._descMode = mode
  emitUpdate()
}

function addItem(moduleKey) {
  if (!Array.isArray(props.data[moduleKey])) return
  props.data[moduleKey].push({ ...itemTemplates[moduleKey] })
  emitUpdate()
}

function removeItem(moduleKey, index) {
  props.data[moduleKey].splice(index, 1)
  emit('update', { ...props.data, [moduleKey]: [...props.data[moduleKey]] })
}
</script>

<style scoped>
.markdown-preview :deep(p) {
  margin: 0 0 4px;
}
.markdown-preview :deep(p:last-child) {
  margin-bottom: 0;
}
.markdown-preview :deep(ul),
.markdown-preview :deep(ol) {
  margin: 4px 0;
  padding-left: 20px;
}
.markdown-preview :deep(li) {
  margin: 2px 0;
}
.markdown-preview :deep(strong) {
  font-weight: 600;
  color: #1f2937;
}
.markdown-preview :deep(code) {
  background: #f3f4f6;
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 0.85em;
  color: #dc2626;
}
</style>
