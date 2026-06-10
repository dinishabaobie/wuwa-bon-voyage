import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { TrailBackground } from './trail.js'
import { ChimePlayer } from './audio.js'

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
]

const HERO = { bg: '#05060f', accent: '#8b9aff' }
const ENDING = {
  bg: '#04050c', accent: '#cdd3ff', photo: 'photos/ending.jpg',
  title: '拉海洛篇章落幕',
  line: '各位星炬学院的眺望者，我们终会于无垠星海里再次相会。',
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
    <p class="hero-kicker">WUTHERING WAVES · CHAPTER OF LAHAILUO</p>
    <h1 class="hero-title">鸣潮·拉海洛篇章</h1>
    <p class="hero-sub">VER 3.0 — 3.4 · 一段眺望者的回望</p>
    <p class="hero-hint">SCROLL</p>
  </section>
  ${CHAPTERS.map((c) => `
    <section class="chapter${c.bigFig ? ' chapter--bigfig' : ''}" id="${c.id}" data-bg="${c.bg}" data-accent="${c.accent}" data-nav="${c.num}">
      <div class="chapter-inner">
        <div class="ver-num" aria-hidden="true">Ver ${c.num}</div>
        <div class="ch-text">
          <p class="ch-kicker">${c.en}</p>
          <h2 class="ch-title">${c.title}</h2>
          <p class="ch-desc">${c.desc}</p>
          <p class="ch-cast">${c.cast.map((n) => `<b>${n}</b>`).join('<span> · </span>')}</p>
        </div>
        <figure class="ch-figure">
          <img src="${c.photo}" alt="${c.title}" loading="lazy" />
          <figcaption class="fig-tag">VER ${c.num}</figcaption>
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
timeline.innerHTML = navSections
  .map((s) => {
    const key = s.dataset.nav
    const label = key === 'hero' ? 'TOP' : key === 'end' ? 'FIN' : key
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
const chimes = new ChimePlayer()
const bgmBtn = document.getElementById('bgm-toggle')
let autoplayArmed = true

function setSoundUI(on) {
  bgmBtn.classList.toggle('playing', on)
  bgmBtn.querySelector('.bgm-label').textContent = on ? 'SOUND ON' : 'SOUND OFF'
}
function soundOn() {
  bgm.play().then(() => {
    chimes.setOn(true)
    setSoundUI(true)
  }).catch(() => {})
}
function soundOff() {
  autoplayArmed = false
  bgm.pause()
  chimes.setOn(false)
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
// 颜色流转 + 导航高亮 + 切章音效
// ============================================================
const CHIME_NOTES = { hero: 660, '3.0': 880, '3.1': 988, '3.2': 740, '3.3': 830, '3.4': 1109, end: 660 }
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
      if (currentNav && currentNav !== nav) chimes.chime(CHIME_NOTES[nav] || 880)
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

  const intro = gsap.timeline()
  intro
    .fromTo('.loader-star', { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 1, ease: 'back.out(1.8)' })
    .to('.loader-star', { scale: .55, duration: .6, ease: 'power2.inOut' }, '>+0.2')
    .to(loaderChars, { opacity: 1, duration: .05, stagger: 0.06 }, '<')
    .to('.loader-sub', { opacity: 1, duration: .7 }, '<+0.4')
    .to(loader, { yPercent: -100, duration: 1.1, ease: 'power3.inOut', delay: .7 })
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
    .fromTo('.hero-kicker', { opacity: 0 }, { opacity: 1, duration: .8 })
    .to(heroChars, { opacity: 1, y: 0, duration: .9, stagger: 0.07, ease: 'power3.out' }, '<')
    .fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8 }, '<+0.6')
    .fromTo('.hero-hint', { opacity: 0 }, { opacity: 1, duration: .8 }, '<+0.3')
    .to('#timeline', { opacity: 1, duration: .8 }, '<')
    .to('#bgm-toggle', { opacity: 1, duration: .8 }, '<')
}

// 首屏标题滚动时上浮淡出，增强电影感
gsap.to('.hero-title, .hero-kicker, .hero-sub', {
  opacity: 0, y: -80, ease: 'none',
  scrollTrigger: { trigger: '#hero', start: '40% top', end: 'bottom top', scrub: true },
})
