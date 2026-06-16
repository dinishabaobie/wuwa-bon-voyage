import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { TrailBackground } from './trail.js'

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// 章节数据 —— 文案、配色、照片都在这里改
// ============================================================
const CHAPTERS = [
  {
    id: 'v30', num: '3.0', title: '我们生而眺望',
    en: 'WE WERE BORN TO GAZE',
    desc: '知心预言中<br/>拉海洛将要面临灾难<br/>也终将不会由爱弥斯独自承受<br/>因为在不起眼的课堂<br/>真正的御者已经来临<br/>而他也会和爱弥斯一起打破宿命的囚笼',
    cast: ['琳奈', '莫宁'],
    bg: '#0b0e2a', accent: '#8b9aff', photo: 'photos/3-0.jpg',
  },
  {
    id: 'v31', num: '3.1', title: '旅途愉快',
    en: 'BON VOYAGE',
    desc: '踏进去便是永远放逐在隧门之外<br/>可唯有如此，拉海洛才得以存续<br/>漂泊者冲上前攥住即将离去的小女孩的手<br/>拼命将她向上托起，可一切都来不及了<br/>爱弥斯 我只希望你轻松快乐的活着',
    cast: ['爱弥斯'],
    bg: '#2a0e1f', accent: '#ff8fc0', photo: 'photos/3-1.jpg', bigFig: true,
  },
  {
    id: 'v32', num: '3.2', title: '鸣潮往复  文明不屈',
    en: 'RESOLVE GLEAMING IN THE SHADOW',
    desc: '一个文明的孤独追问，由另一个文明回应<br/>也许在未来的某一天<br/>文明会在星际间探索穿行，再度与旅行者一号重逢',
    cast: ['西格莉卡'],
    bg: '#150f2e', accent: '#b48cff', photo: 'photos/3-2.jpg',
  },
  {
    id: 'v33', num: '3.3', title: '我 Chovy  到底谁才是反派啊',
    en: 'ECHOING FROM THE END OF THE STAR SEA',
    desc: '终于<br/>这个没有情感的女孩<br/>迎来了她的第一次微笑',
    cast: ['绯雪', '达妮娅'],
    bg: '#26130a', accent: '#ffb066', photo: 'photos/3-3.jpg',
  },
  {
    id: 'v34', num: '3.4', title: '赛博朋克-边缘幻梦',
    en: 'CYBERPUNK · EDGE OF DREAMS',
    desc: '人们都说夜之城没有活着的传奇，但这次鸣潮却要告诉你——<br/>勇敢的向前奔跑吧，露西，你所珍视的人已为你扫平前路荆棘，而你深爱的人正在路的尽头等你。',
    cast: ['露西', '丽贝卡'],
    bg: '#0a1f24', accent: '#4ef0e0', photo: 'photos/3-4.jpg',
    wide: 'photos/3-4-wide.jpg', wideAlt: '月面之上，四人遥望地球',
  },
  {
    id: 'cyberpunk', num: 'cyberpunk', title: '赛博朋克-边缘幻梦',
    en: 'CYBERPUNK · EDGE OF DREAMS',
    desc: '人们都说夜之城没有活着的传奇，但这次鸣潮却要告诉你——<br/>勇敢的向前奔跑吧，露西，你所珍视的人已为你扫平前路荆棘，而你深爱的人正在路的尽头等你。',
    cast: ['露西', '丽贝卡'],
    bg: '#0a1f24', accent: '#4ef0e0', photo: 'photos/3-4.jpg',
    wide: 'photos/3-4-wide.jpg', wideAlt: '月面之上，四人遥望地球',
  },
  {
    id: 'anyuan', num: 'anyuan', title: '我 Chovy  到底谁才是反派啊',
    en: 'ECHOING FROM THE END OF THE STAR SEA',
    desc: '终于<br/>这个没有情感的女孩<br/>迎来了她的第一次微笑',
    cast: ['绯雪', '达妮娅'],
    bg: '#26130a', accent: '#ffb066', photo: 'photos/3-3.jpg',
  },
]

const HERO = { bg: '#05060f', accent: '#8b9aff' }
const ENDING = {
  bg: '#04050c', accent: '#cdd3ff', photo: 'photos/ending.jpg',
  title: '拉海洛篇章落幕',
  line: '各位星炬学院的眺望者，我们终会于无垠星海里再次相会。',
}

const REGION_LABELS = {
  '3.0': '瑝珑',
  '3.1': '拉古那',
  '3.2': '七丘',
  '3.3': '拉海洛',
  '3.4': '冰原地表',
  cyberpunk: '赛博朋克-边缘幻梦',
  anyuan: '黯原',
}

// ============================================================
// 工具
// ============================================================
function splitChars(el) {
  const text = el.textContent
  el.textContent = ''
  return [...text].map((ch) => {
    const span = document.createElement('span')
    span.textContent = ch === ' ' ? ' ' : ch
    el.appendChild(span)
    return span
  })
}

// ============================================================
// 渲染 DOM
// ============================================================
const app = document.getElementById('app')

app.innerHTML = `
  <section id="hero" data-bg="${HERO.bg}" data-accent="${HERO.accent}" data-nav="hero">
    <div class="terminal-frame">
      <div class="terminal-bar" aria-hidden="true">
        <span>ACCESS CONFIRMED</span>
      </div>
      <div class="hero-core">
        <h1 class="hero-title">欢迎回家</h1>
      </div>
      <div class="module-grid" aria-label="泰提斯终端模块">
        <article class="hero-module">
          <p class="module-code">OBJECT-01</p>
          <h2>观测对象</h2>
          <p>角色档案、频率特征、个体记录</p>
          <span>ROLE ARCHIVE</span>
        </article>
        <article class="hero-module">
          <p class="module-code">TIDE-02</p>
          <h2>观潮</h2>
          <p>版本解析、剧情回溯、潮汐事件</p>
          <span>VERSION ANALYSIS</span>
        </article>
        <article class="hero-module">
          <p class="module-code">RELATION-03</p>
          <h2>群像</h2>
          <p>势力关系、人物连接、阵营网络</p>
          <span>RELATION MAP</span>
        </article>
      </div>
    </div>
    <p class="hero-hint">SCROLL</p>
  </section>
  ${CHAPTERS.map((c) => `
    <section class="chapter${c.bigFig ? ' chapter--bigfig' : ''}" id="${c.id}" data-bg="${c.bg}" data-accent="${c.accent}" data-nav="${c.num}">
      <div class="chapter-inner">
        <div class="ver-num" aria-hidden="true">${REGION_LABELS[c.num] || c.num}</div>
        <div class="ch-text">
          <p class="ch-kicker">${c.en}</p>
          <h2 class="ch-title">${c.title}</h2>
          <p class="ch-desc">${c.desc}</p>
          <p class="ch-cast">${c.cast.map((n) => `<b>${n}</b>`).join('<span> · </span>')}</p>
        </div>
        <figure class="ch-figure">
          <img src="${c.photo}" alt="${c.title}" loading="lazy" />
          <figcaption class="fig-tag">${REGION_LABELS[c.num] || c.num}</figcaption>
        </figure>
        ${c.wide ? `
        <figure class="ch-wide">
          <img src="${c.wide}" alt="${c.wideAlt || c.title}" loading="lazy" />
        </figure>` : ''}
      </div>
    </section>
  `).join('')}
  <section id="ending" data-bg="${ENDING.bg}" data-accent="${ENDING.accent}" data-nav="end">
    <figure class="end-figure"><img src="${ENDING.photo}" alt="${ENDING.title}" loading="lazy" /></figure>
    <p class="end-kicker">FINALE</p>
    <h2 class="end-title">${ENDING.title}</h2>
    <p class="end-line">${ENDING.line}</p>
    <div class="end-star"></div>
  </section>
`

// 时间轴导航
const timeline = document.getElementById('timeline')
const navSections = [...document.querySelectorAll('[data-nav]')]
const NAV_LABELS = {
  hero: 'TOP',
  '3.0': '瑝珑',
  '3.1': '拉古那',
  '3.2': '七丘',
  '3.3': '拉海洛',
  '3.4': '冰原地表',
  cyberpunk: '赛博朋克-边缘幻梦',
  anyuan: '黯原',
  end: '旅途愉快',
}
timeline.innerHTML = navSections
  .map((s) => {
    const key = s.dataset.nav
    const label = NAV_LABELS[key] || key
    return `<button class="tl-item" data-target="${s.id}"><span class="dot"></span>${label}</button>`
  })
  .join('')

// ============================================================
// Lenis 丝滑滚动 + ScrollTrigger 同步
// ============================================================
const lenis = new Lenis({ duration: 1.35, smoothWheel: true })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
lenis.stop() // 加载动画期间锁定滚动

timeline.querySelectorAll('.tl-item').forEach((btn) => {
  btn.addEventListener('click', () => {
    lenis.scrollTo('#' + btn.dataset.target, { duration: 1.8 })
  })
})

// ============================================================
// Three.js 光标拖痕 / 音频 / 自定义光标
// ============================================================
const trail = new TrailBackground(document.getElementById('trail-canvas'))

// BGM：「远航星的告别」，打开网站即自动播放；被浏览器拦截时在首次交互瞬间开播
const bgm = new Audio('bgm.mp3')
bgm.loop = true
bgm.volume = 0.7
const bgmBtn = document.getElementById('bgm-toggle')
let autoplayArmed = true

function setSoundUI(on) {
  bgmBtn.classList.toggle('playing', on)
  bgmBtn.querySelector('.bgm-label').textContent = on ? '音乐 开' : '音乐 关'
}
function soundOn() {
  bgm.play().then(() => setSoundUI(true)).catch(() => {})
}
function soundOff() {
  autoplayArmed = false
  bgm.pause()
  setSoundUI(false)
}

bgmBtn.addEventListener('click', () => (bgm.paused ? soundOn() : soundOff()))

soundOn()
const gestureKick = () => { if (autoplayArmed && bgm.paused) soundOn() }
;['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((ev) =>
  window.addEventListener(ev, gestureKick, { once: true, passive: true })
)

const cursor = document.getElementById('cursor')
const cursorPos = { x: innerWidth / 2, y: innerHeight / 2 }
const cursorTarget = { ...cursorPos }
window.addEventListener('pointermove', (e) => {
  cursorTarget.x = e.clientX
  cursorTarget.y = e.clientY
})
gsap.ticker.add(() => {
  cursorPos.x += (cursorTarget.x - cursorPos.x) * 0.18
  cursorPos.y += (cursorTarget.y - cursorPos.y) * 0.18
  cursor.style.translate = `${cursorPos.x}px ${cursorPos.y}px`
})
document.querySelectorAll('button, a').forEach((el) => {
  el.addEventListener('pointerenter', () => cursor.classList.add('is-active'))
  el.addEventListener('pointerleave', () => cursor.classList.remove('is-active'))
})

// ============================================================
// 颜色流转 + 导航高亮
// ============================================================
let currentNav = null

navSections.forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 55%',
    end: 'bottom 55%',
    onToggle: (self) => {
      if (!self.isActive) return
      const { bg, accent, nav } = section.dataset
      gsap.to(document.documentElement, {
        '--bg': bg,
        '--accent': accent,
        duration: 1.1,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      trail.setTint(accent)
      timeline.querySelectorAll('.tl-item').forEach((b) =>
        b.classList.toggle('active', b.dataset.target === section.id)
      )
      currentNav = nav
    },
  })
})

// ============================================================
// 章节动画
// ============================================================
CHAPTERS.forEach((c) => {
  const section = document.getElementById(c.id)
  const titleChars = splitChars(section.querySelector('.ch-title'))
  const figure = section.querySelector('.ch-figure')
  const img = figure.querySelector('img')

  gsap.set(titleChars, { y: 34 })
  gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 62%', toggleActions: 'play none none reverse' },
  })
    .fromTo(figure, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.35, ease: 'power3.inOut' })
    .fromTo(section.querySelector('.ch-kicker'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .8, ease: 'power2.out' }, 0.15)
    .to(titleChars, { opacity: 1, y: 0, duration: .5, ease: 'power3.out', stagger: 0.045 }, 0.3)
    .fromTo(section.querySelector('.ch-desc'), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .9, ease: 'power2.out' }, 0.6)
    .fromTo(section.querySelector('.ch-cast'), { opacity: 0 }, { opacity: 1, duration: .8 }, 0.9)

  // 照片视差 + 巨大版本号反向漂移（scrub 跟随滚动）
  gsap.fromTo(img, { yPercent: -9 }, {
    yPercent: -1, ease: 'none',
    scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
  })
  gsap.fromTo(section.querySelector('.ver-num'), { yPercent: 26 }, {
    yPercent: -26, ease: 'none',
    scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
  })

  // 章节下方的全幅宽图：自左向右擦除揭示，完整展示不裁切
  const wide = section.querySelector('.ch-wide')
  if (wide) {
    gsap.fromTo(wide,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)', duration: 1.7, ease: 'power3.inOut',
        scrollTrigger: { trigger: wide, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    )
  }
})

// ============================================================
// 结尾章节：照片自黑暗中显现 → 标题 → 告别语逐字浮现
// ============================================================
{
  const ending = document.getElementById('ending')
  const lineChars = splitChars(ending.querySelector('.end-line'))

  gsap.timeline({
    scrollTrigger: {
      trigger: ending,
      start: 'top top',
      end: '+=220%',
      scrub: 0.6,
      pin: true,
    },
  })
    .to(ending.querySelector('.end-figure'), { filter: 'brightness(1)', scale: 1, duration: 2.2, ease: 'power2.out' })
    .to(ending.querySelector('.end-kicker'), { opacity: 1, duration: .6 }, 1.4)
    .to(ending.querySelector('.end-title'), { opacity: 1, duration: .9 }, 1.7)
    .to(lineChars, { opacity: 1, duration: .06, stagger: 0.07 }, 2.4)
    .to(ending.querySelector('.end-star'), { opacity: 1, scale: 1.4, duration: .8, ease: 'power2.out' }, '>+0.3')
    .to({}, { duration: .8 }) // 收尾停留
}

// ============================================================
// 开场 Loading → 首屏入场
// ============================================================
{
  const loader = document.getElementById('loader')
  const loaderChars = splitChars(loader.querySelector('.loader-title'))
  const heroChars = splitChars(document.querySelector('.hero-title'))
  gsap.set(heroChars, { y: 60 })

  // 第一段：黑花与站名亮起，等待访客点击并同时解锁浏览器的声音权限
  gsap.timeline()
    .fromTo('.loader-star', { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 1, ease: 'back.out(1.8)' })
    .to('.loader-star', { scale: .55, duration: .6, ease: 'power2.inOut' }, '>+0.2')
    .to(loaderChars, { opacity: 1, duration: .05, stagger: 0.06 }, '<')
    .to('.loader-status', { opacity: 1, duration: .65 }, '<+0.35')
    .to('.loader-status', { opacity: 0, duration: .35 }, '+=2')
    .to('.loader-confirm', { opacity: 1, duration: .45 }, '<+0.1')

  // 第二段：点击后开音乐、退场、首屏入场
  const enterSite = () => {
    soundOn()
    gsap.timeline()
      .to(loader, { yPercent: -100, duration: 1.1, ease: 'power3.inOut' })
      .add(() => {
        lenis.start()
        loader.remove()
        // 开场在屏幕中央撒一串星，宣告拖痕效果的存在
        const cx = innerWidth / 2
        const cy = innerHeight / 2
        ;[0, 120, 240, 360, 480].forEach((delay, i) => {
          setTimeout(() => trail.burst(cx + (i - 2) * 130, cy + Math.sin(i * 2.1) * 60, 150 - Math.abs(i - 2) * 30), delay)
        })
      }, '>-0.3')
      .to(heroChars, { opacity: 1, y: 0, duration: .9, stagger: 0.07, ease: 'power3.out' })
      .add(() => {
        document.querySelectorAll('.hero-module').forEach((module, i) => {
          setTimeout(() => module.classList.add('is-online'), i * 140)
        })
      }, '<+0.55')
      .fromTo('.hero-hint', { opacity: 0 }, { opacity: 1, duration: .8 }, '<+0.3')
      .to('#timeline', { opacity: 1, duration: .8 }, '<')
      .to('#bgm-toggle', { opacity: 1, duration: .8 }, '<')
  }
  loader.addEventListener('click', enterSite, { once: true })
}

// 首屏标题滚动时上浮淡出，增强电影感
gsap.to('.hero-title', {
  opacity: 0, y: -80, ease: 'none',
  scrollTrigger: { trigger: '#hero', start: '40% top', end: 'bottom top', scrub: true },
})
