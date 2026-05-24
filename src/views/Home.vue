<template>
  <div>
    <!-- Hero 区域 -->
    <section class="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-20 w-96 h-96 bg-accent-400 rounded-full blur-3xl"></div>
      </div>
      <div class="container-app relative py-20 md:py-28">
        <div class="flex items-center gap-12 lg:gap-16">
          <!-- 左侧文字 -->
          <div class="flex-1 min-w-0">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              专业简历<br />
              <span class="text-primary-200">{{ typedText }}<span class="animate-blink">|</span></span>
            </h1>
            <p class="mt-6 text-lg md:text-xl text-primary-100 max-w-xl leading-relaxed">
              多行业商用模板、可视化编辑、高清PDF导出。零门槛打造让HR眼前一亮的专业简历。
            </p>
            <div class="mt-8 flex flex-wrap gap-4">
              <el-button
                type="primary"
                size="large"
                round
                @click="handleStartCreate"
                class="!bg-white !text-primary-700 !font-semibold hover:!bg-primary-50"
              >
                <el-icon class="mr-1"><Edit /></el-icon>
                免费开始制作
              </el-button>
              <el-button
                size="large"
                round
                class="!bg-white !text-primary-700 !font-semibold hover:!bg-primary-50"
                @click="scrollToTemplates"
              >
                浏览模板
              </el-button>
            </div>
            <div class="mt-10 flex items-center space-x-6 text-sm text-primary-200">
              <span class="flex items-center"><el-icon class="mr-1"><Check /></el-icon>免费使用</span>
              <span class="flex items-center"><el-icon class="mr-1"><Check /></el-icon>无需注册即可体验</span>
              <span class="flex items-center"><el-icon class="mr-1"><Check /></el-icon>数据本地安全存储</span>
            </div>
          </div>

          <!-- 右侧 3D 轮播 -->
          <div class="hidden lg:block flex-shrink-0 w-[320px] xl:w-[380px]">
            <div class="carousel-scene">
              <div class="carousel-track" :style="{ transform: `rotateY(${-activeSlide * 120}deg)` }">
                <!-- 经典简约 -->
                <div class="carousel-card">
                  <div class="bg-white rounded-lg shadow-2xl overflow-hidden" style="width:240px; height:320px; padding:20px;">
                    <div class="h-2.5 w-1/3 bg-gray-800 rounded-sm mx-auto mb-2"></div>
                    <div class="flex justify-center gap-3 mb-3">
                      <div class="h-1.5 w-12 bg-gray-300 rounded-full"></div>
                      <div class="h-1.5 w-12 bg-gray-300 rounded-full"></div>
                    </div>
                    <div class="border-t-2 border-blue-500 mb-2 pt-2">
                      <div class="h-1.5 w-1/4 bg-blue-500 rounded-full mb-1.5"></div>
                      <div class="h-1 bg-gray-200 rounded-full mb-1"></div>
                      <div class="flex gap-4 mb-2">
                        <div class="flex-1"><div class="h-1 bg-gray-700 rounded-full mb-1"></div><div class="h-1 w-2/3 bg-gray-300 rounded-full"></div></div>
                        <div class="flex-1"><div class="h-1 bg-gray-700 rounded-full mb-1"></div><div class="h-1 w-2/3 bg-gray-300 rounded-full"></div></div>
                      </div>
                    </div>
                    <div class="border-t-2 border-blue-500 mb-2 pt-2">
                      <div class="h-1.5 w-1/4 bg-blue-500 rounded-full mb-1.5"></div>
                      <div class="h-1 bg-gray-200 rounded-full mb-1"></div>
                      <div class="h-1 bg-gray-200 rounded-full mb-1 w-4/5"></div>
                      <div class="h-1 bg-gray-200 rounded-full w-3/5"></div>
                    </div>
                    <div class="border-t-2 border-blue-500 pt-2">
                      <div class="h-1.5 w-1/4 bg-blue-500 rounded-full mb-1.5"></div>
                      <div class="h-1 bg-gray-200 rounded-full mb-1"></div>
                      <div class="h-1 bg-gray-200 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>

                <!-- 现代双栏 -->
                <div class="carousel-card">
                  <div class="bg-white rounded-lg shadow-2xl overflow-hidden" style="width:240px; height:320px;">
                    <div class="flex h-full">
                      <div class="w-[38%] bg-blue-600 p-3 flex flex-col">
                        <div class="w-8 h-8 rounded-full bg-white/30 mx-auto mb-2"></div>
                        <div class="h-1.5 w-3/4 bg-white/60 rounded-full mb-2 mx-auto"></div>
                        <div class="h-1 bg-white/30 rounded-full mb-1"></div>
                        <div class="h-1 bg-white/30 rounded-full mb-1 w-3/4"></div>
                        <div class="h-1 bg-white/30 rounded-full mb-3 w-1/2"></div>
                        <div class="h-1.5 w-1/2 bg-white/50 rounded-full mb-1.5"></div>
                        <div class="bg-white/20 rounded-full h-1 mb-1"><div class="bg-white rounded-full h-1 w-3/4"></div></div>
                        <div class="bg-white/20 rounded-full h-1 mb-1"><div class="bg-white rounded-full h-1 w-1/2"></div></div>
                      </div>
                      <div class="flex-1 p-3">
                        <div class="h-1.5 w-1/3 bg-blue-600 rounded-full mb-1"></div>
                        <div class="border-b-2 border-blue-200 mb-2 pb-1">
                          <div class="h-1 bg-gray-300 rounded-full mb-1"></div>
                          <div class="h-1 bg-gray-200 rounded-full w-4/5 mb-1"></div>
                          <div class="h-1 bg-gray-200 rounded-full w-3/5"></div>
                        </div>
                        <div class="h-1.5 w-1/3 bg-blue-600 rounded-full mb-1"></div>
                        <div class="border-b-2 border-blue-200 mb-2 pb-1">
                          <div class="h-1 bg-gray-300 rounded-full mb-1"></div>
                          <div class="h-1 bg-gray-200 rounded-full w-4/5 mb-1"></div>
                        </div>
                        <div class="h-1.5 w-1/3 bg-blue-600 rounded-full mb-1"></div>
                        <div class="h-1 bg-gray-200 rounded-full mb-1 w-4/5"></div>
                        <div class="h-1 bg-gray-200 rounded-full w-3/5"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 商务精英 -->
                <div class="carousel-card">
                  <div class="bg-white rounded-lg shadow-2xl overflow-hidden" style="width:240px; height:320px;">
                    <div class="bg-blue-600 p-3 rounded-t-lg">
                      <div class="flex justify-between items-start">
                        <div>
                          <div class="h-2 w-16 bg-white/80 rounded-full mb-1.5"></div>
                          <div class="h-1 w-20 bg-white/40 rounded-full"></div>
                        </div>
                        <div class="text-right">
                          <div class="h-1 w-14 bg-white/40 rounded-full mb-1 ml-auto"></div>
                          <div class="h-1 w-10 bg-white/30 rounded-full ml-auto"></div>
                        </div>
                      </div>
                    </div>
                    <div class="p-3">
                      <div class="flex items-center gap-1 mb-1.5">
                        <div class="w-0.5 h-2.5 bg-blue-600 rounded"></div>
                        <div class="h-1.5 w-1/4 bg-blue-600 rounded-full"></div>
                      </div>
                      <div class="h-1 bg-gray-200 rounded-full mb-1 w-3/4"></div>
                      <div class="h-1 bg-gray-200 rounded-full mb-3 w-1/2"></div>
                      <div class="flex items-center gap-1 mb-1.5">
                        <div class="w-0.5 h-2.5 bg-blue-600 rounded"></div>
                        <div class="h-1.5 w-1/4 bg-blue-600 rounded-full"></div>
                      </div>
                      <div class="h-1 bg-gray-200 rounded-full mb-1"></div>
                      <div class="h-1 bg-gray-200 rounded-full mb-1 w-4/5"></div>
                      <div class="h-1 bg-gray-200 rounded-full mb-3 w-3/5"></div>
                      <div class="flex items-center gap-1 mb-1.5">
                        <div class="w-0.5 h-2.5 bg-blue-600 rounded"></div>
                        <div class="h-1.5 w-1/4 bg-blue-600 rounded-full"></div>
                      </div>
                      <div class="h-1 bg-gray-200 rounded-full mb-1"></div>
                      <div class="h-1 bg-gray-200 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心功能区 -->
    <section class="py-20 bg-white">
      <div class="container-app">
        <div class="text-center mb-14">
          <h2 class="section-title">为什么选择职创在线？</h2>
          <p class="section-subtitle">从模板到导出，一站式解决简历制作全流程</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="card-hover p-6 text-center"
          >
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              :class="feature.bgClass"
            >
              <el-icon :size="28" :class="feature.iconClass">
                <component :is="feature.icon" />
              </el-icon>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 模板展示区 -->
    <section id="templates" class="py-20 bg-gray-50">
      <div class="container-app">
        <div class="text-center mb-14">
          <h2 class="section-title">精选简历模板</h2>
          <p class="section-subtitle">覆盖主流行业，一键切换模板，数据自动保留</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="tpl in templateList"
            :key="tpl.id"
            class="card-hover group cursor-pointer"
            @click="handleUseTemplate(tpl)"
          >
            <!-- 模板预览区域 -->
            <div class="aspect-[3/4] bg-white relative overflow-hidden flex items-center justify-center p-6">
              <!-- 经典简约缩略图 -->
              <div v-if="tpl.id === 'basic'" class="w-full h-full flex flex-col">
                <div class="h-3 w-1/3 bg-gray-800 rounded-sm mx-auto mb-2"></div>
                <div class="flex justify-center gap-3 mb-3">
                  <div class="h-1.5 w-12 bg-gray-300 rounded-full"></div>
                  <div class="h-1.5 w-12 bg-gray-300 rounded-full"></div>
                  <div class="h-1.5 w-12 bg-gray-300 rounded-full"></div>
                </div>
                <div class="border-t-2 border-blue-500 mb-2 pt-2">
                  <div class="h-1.5 w-1/4 bg-blue-500 rounded-full mb-1.5"></div>
                  <div class="h-1 bg-gray-200 rounded-full mb-1"></div>
                  <div class="flex gap-4 mb-2">
                    <div class="flex-1">
                      <div class="h-1 bg-gray-700 rounded-full mb-1"></div>
                      <div class="h-1 w-2/3 bg-gray-300 rounded-full"></div>
                    </div>
                    <div class="flex-1">
                      <div class="h-1 bg-gray-700 rounded-full mb-1"></div>
                      <div class="h-1 w-2/3 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div class="border-t-2 border-blue-500 mb-2 pt-2">
                  <div class="h-1.5 w-1/4 bg-blue-500 rounded-full mb-1.5"></div>
                  <div class="h-1 bg-gray-200 rounded-full mb-1"></div>
                  <div class="h-1 bg-gray-200 rounded-full mb-1 w-4/5"></div>
                  <div class="h-1 bg-gray-200 rounded-full w-3/5"></div>
                </div>
                <div class="border-t-2 border-blue-500 pt-2">
                  <div class="h-1.5 w-1/4 bg-blue-500 rounded-full mb-1.5"></div>
                  <div class="h-1 bg-gray-200 rounded-full mb-1"></div>
                  <div class="h-1 bg-gray-200 rounded-full w-2/3"></div>
                </div>
              </div>
              <!-- 现代双栏缩略图 -->
              <div v-else-if="tpl.id === 'modern'" class="w-full h-full flex">
                <div class="w-[38%] bg-blue-600 rounded-l-sm p-3 flex flex-col">
                  <div class="w-8 h-8 rounded-full bg-white/30 mx-auto mb-2"></div>
                  <div class="h-1.5 w-3/4 bg-white/60 rounded-full mb-2 mx-auto"></div>
                  <div class="h-1 bg-white/30 rounded-full mb-1"></div>
                  <div class="h-1 bg-white/30 rounded-full mb-1 w-3/4"></div>
                  <div class="h-1 bg-white/30 rounded-full mb-3 w-1/2"></div>
                  <div class="h-1.5 w-1/2 bg-white/50 rounded-full mb-1.5"></div>
                  <div class="bg-white/20 rounded-full h-1 mb-1"><div class="bg-white rounded-full h-1 w-3/4"></div></div>
                  <div class="bg-white/20 rounded-full h-1 mb-1"><div class="bg-white rounded-full h-1 w-1/2"></div></div>
                  <div class="bg-white/20 rounded-full h-1"><div class="bg-white rounded-full h-1 w-full"></div></div>
                </div>
                <div class="flex-1 p-3">
                  <div class="h-1.5 w-1/3 bg-blue-600 rounded-full mb-1"></div>
                  <div class="border-b-2 border-blue-200 mb-2 pb-1">
                    <div class="h-1 bg-gray-300 rounded-full mb-1"></div>
                    <div class="h-1 bg-gray-200 rounded-full w-4/5 mb-1"></div>
                    <div class="h-1 bg-gray-200 rounded-full w-3/5"></div>
                  </div>
                  <div class="h-1.5 w-1/3 bg-blue-600 rounded-full mb-1"></div>
                  <div class="border-b-2 border-blue-200 mb-2 pb-1">
                    <div class="h-1 bg-gray-300 rounded-full mb-1"></div>
                    <div class="h-1 bg-gray-200 rounded-full w-4/5 mb-1"></div>
                    <div class="h-1 bg-gray-200 rounded-full w-2/3"></div>
                  </div>
                  <div class="h-1.5 w-1/3 bg-blue-600 rounded-full mb-1"></div>
                  <div class="h-1 bg-gray-200 rounded-full mb-1"></div>
                  <div class="h-1 bg-gray-200 rounded-full w-4/5 mb-1"></div>
                  <div class="h-1 bg-gray-200 rounded-full w-3/5"></div>
                </div>
              </div>
              <!-- 商务精英缩略图 -->
              <div v-else-if="tpl.id === 'classic'" class="w-full h-full flex flex-col">
                <div class="bg-blue-600 p-3 rounded-t-sm">
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="h-2 w-16 bg-white/80 rounded-full mb-1.5"></div>
                      <div class="h-1 w-20 bg-white/40 rounded-full"></div>
                    </div>
                    <div class="text-right">
                      <div class="h-1 w-14 bg-white/40 rounded-full mb-1 ml-auto"></div>
                      <div class="h-1 w-10 bg-white/30 rounded-full ml-auto"></div>
                    </div>
                  </div>
                </div>
                <div class="p-3 flex-1">
                  <div class="flex items-center gap-1 mb-1.5">
                    <div class="w-0.5 h-2.5 bg-blue-600 rounded"></div>
                    <div class="h-1.5 w-1/4 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="h-1 bg-gray-200 rounded-full mb-1 w-3/4"></div>
                  <div class="h-1 bg-gray-200 rounded-full mb-3 w-1/2"></div>
                  <div class="flex items-center gap-1 mb-1.5">
                    <div class="w-0.5 h-2.5 bg-blue-600 rounded"></div>
                    <div class="h-1.5 w-1/4 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="h-1 bg-gray-200 rounded-full mb-1"></div>
                  <div class="h-1 bg-gray-200 rounded-full mb-1 w-4/5"></div>
                  <div class="h-1 bg-gray-200 rounded-full mb-3 w-3/5"></div>
                  <div class="flex items-center gap-1 mb-1.5">
                    <div class="w-0.5 h-2.5 bg-blue-600 rounded"></div>
                    <div class="h-1.5 w-1/4 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="h-1 bg-gray-200 rounded-full mb-1"></div>
                  <div class="h-1 bg-gray-200 rounded-full w-2/3"></div>
                </div>
              </div>
              <!-- 悬浮遮罩 -->
              <div class="absolute inset-0 bg-primary-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <el-button type="primary" round class="!bg-white !text-primary-700">
                  使用此模板
                </el-button>
              </div>
              <!-- 付费标记 -->
              <el-tag
                v-if="!tpl.isFree"
                type="warning"
                effect="dark"
                size="small"
                class="absolute top-3 right-3"
              >
                VIP
              </el-tag>
              <el-tag
                v-else
                type="success"
                effect="dark"
                size="small"
                class="absolute top-3 right-3"
              >
                免费
              </el-tag>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900">{{ tpl.name }}</h3>
              <p class="text-sm text-gray-500 mt-1">{{ tpl.description }}</p>
              <div class="mt-3 flex flex-wrap gap-1">
                <el-tag v-for="tag in tpl.tags" :key="tag" size="small" type="info" effect="plain">
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 会员价格区 -->
    <section class="py-20 bg-white">
      <div class="container-app">
        <div class="text-center mb-14">
          <h2 class="section-title">选择适合你的方案</h2>
          <p class="section-subtitle">免费版已可满足基本需求，VIP 解锁全部高级功能</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <!-- 免费版 -->
          <div class="card p-8 flex flex-col">
            <h3 class="text-lg font-bold text-gray-900">免费版</h3>
            <div class="mt-4 mb-6">
              <span class="text-4xl font-bold text-gray-900">¥0</span>
              <span class="text-gray-500">/永久</span>
            </div>
            <ul class="space-y-3 mb-8 flex-1">
              <li v-for="f in membershipConfig.free.features" :key="f" class="flex items-start text-sm text-gray-600">
                <el-icon class="text-green-500 mr-2 mt-0.5"><Check /></el-icon>
                {{ f }}
              </li>
            </ul>
            <el-button round class="w-full" @click="handleStartCreate">免费开始</el-button>
          </div>

          <!-- VIP 版 -->
          <div class="card p-8 ring-2 ring-primary-500 relative flex flex-col">
            <el-tag type="warning" effect="dark" class="absolute top-0 left-6">推荐</el-tag>
            <h3 class="text-lg font-bold text-gray-900">VIP 会员</h3>
            <div class="mt-4 mb-6">
              <span class="text-4xl font-bold text-primary-600">¥29.9</span>
              <span class="text-gray-500">/月</span>
            </div>
            <ul class="space-y-3 mb-8 flex-1">
              <li v-for="f in membershipConfig.vip.features" :key="f" class="flex items-start text-sm text-gray-600">
                <el-icon class="text-primary-500 mr-2 mt-0.5"><Check /></el-icon>
                {{ f }}
              </li>
            </ul>
            <el-button type="primary" round class="w-full">立即升级</el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA 区域 -->
    <section class="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div class="container-app text-center">
        <h2 class="text-3xl md:text-4xl font-bold">开始制作你的专业简历</h2>
        <p class="mt-4 text-lg text-primary-100 max-w-xl mx-auto">
          无需下载安装，打开浏览器即可使用。三分钟打造让HR眼前一亮的完美简历。
        </p>
        <el-button
          size="large"
          round
          class="!bg-white !text-primary-700 !font-semibold mt-8 hover:!bg-primary-50"
          @click="handleStartCreate"
        >
          立即开始，免费使用
        </el-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { templates as templateList } from '@/config/templates'
import { membershipConfig } from '@/config/membership'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()

// 打字机效果
const typedText = ref('')
const phrases = ['一键生成', '高效制作', '轻松导出', '极速创建']
let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let typeTimer = null

function typeEffect() {
  const currentPhrase = phrases[phraseIndex]
  if (!isDeleting) {
    typedText.value = currentPhrase.substring(0, charIndex + 1)
    charIndex++
    if (charIndex === currentPhrase.length) {
      typeTimer = setTimeout(() => { isDeleting = true; typeEffect() }, 2000)
      return
    }
    typeTimer = setTimeout(typeEffect, 120)
  } else {
    typedText.value = currentPhrase.substring(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      typeTimer = setTimeout(typeEffect, 400)
      return
    }
    typeTimer = setTimeout(typeEffect, 60)
  }
}

onMounted(() => { typeEffect() })
onUnmounted(() => { clearTimeout(typeTimer); clearInterval(carouselTimer) })

// 3D 轮播
const activeSlide = ref(0)
let carouselTimer = null

onMounted(() => {
  carouselTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % 3
  }, 3000)
})

const features = [
  {
    title: '专业模板',
    desc: '覆盖互联网、金融、教育等主流行业，持续更新',
    icon: 'Files',
    bgClass: 'bg-primary-50',
    iconClass: 'text-primary-600'
  },
  {
    title: '可视化编辑',
    desc: '所见即所得的编辑体验，拖拽排序，实时预览',
    icon: 'Edit',
    bgClass: 'bg-green-50',
    iconClass: 'text-green-600'
  },
  {
    title: '高清导出',
    desc: '标准A4尺寸PDF导出，高清打印，一键分享',
    icon: 'Download',
    bgClass: 'bg-purple-50',
    iconClass: 'text-purple-600'
  },
  {
    title: '安全存储',
    desc: '数据本地加密存储，平台不采集上传，隐私无忧',
    icon: 'Lock',
    bgClass: 'bg-amber-50',
    iconClass: 'text-amber-600'
  }
]

function handleStartCreate() {
  if (!authStore.isLoggedIn) {
    authStore.ensureGuest()
  }
  router.push('/dashboard')
}

function handleUseTemplate(tpl) {
  if (!tpl.isFree && !authStore.isVip) {
    // 非 VIP 使用付费模板时提示升级
    ElMessageBox.alert('该模板为 VIP 专属模板，请升级会员后使用', '提示', {
      confirmButtonText: '知道了',
      type: 'info'
    })
    return
  }
  handleStartCreate()
}

function scrollToTemplates() {
  const el = document.getElementById('templates')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-blink {
  animation: blink 0.8s step-end infinite;
}

/* 3D 轮播 */
.carousel-scene {
  perspective: 1000px;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-track {
  width: 240px;
  height: 320px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-card {
  position: absolute;
  width: 240px;
  height: 360px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  backface-visibility: hidden;
}

.carousel-card:nth-child(1) {
  transform: rotateY(0deg) translateZ(220px);
}

.carousel-card:nth-child(2) {
  transform: rotateY(120deg) translateZ(220px);
}

.carousel-card:nth-child(3) {
  transform: rotateY(240deg) translateZ(220px);
}
</style>
