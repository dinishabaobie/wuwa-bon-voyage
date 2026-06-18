import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { TrailBackground } from './trail.js'
import { DataRain } from './datarain.js'

gsap.registerPlugin(ScrollTrigger)

// 关闭浏览器的滚动位置恢复：避免刷新后停留在原滚动位置，
// 导致开场结束、点击进入时不在顶部而是落到刷新前的中途位置。
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

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
    <div class="hero-stage">
      <header class="hero-head">
        <span class="hero-sign">泰提斯终端<i>TETHYS&nbsp;TERMINAL</i></span>
        <nav class="module-grid" aria-label="泰提斯终端模块">
          <a class="hero-module" href="./observation.html"><h2>观测对象</h2></a>
          <a class="hero-module" href="./tide.html"><h2>观潮</h2></a>
          <a class="hero-module" href="./relation.html"><h2>群像</h2></a>
        </nav>
      </header>

      <div class="hero-core">
        <p class="hero-eyebrow">黑海岸 · 泰提斯系统</p>
        <h1 class="hero-title">欢迎回家</h1>
        <p class="hero-en" aria-hidden="true">WE&nbsp;WERE&nbsp;BORN&nbsp;TO&nbsp;GAZE</p>
        <p class="hero-lead">泰提斯已完成这段航程的全部推演。<br/>Ver 1.0 — 3.4，这一路皆已归档于地底星空，愿你旅途愉快。</p>
      </div>

      <footer class="hero-foot">
        <p class="hero-hint">SCROLL</p>
      </footer>
    </div>
    <div class="aimi-tag" aria-hidden="true">
      <div class="aimi-portrait" data-text="UNKNOWN ACCESS"></div>
      <div class="aimi-meta">
        <p class="aimi-glitch" data-text="小爱到此一游">小爱到此一游</p>
        <p class="aimi-sub">⚠ INTRUSION · AIMI</p>
      </div>
    </div>
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
const lenis = new Lenis({
  duration: 1.35,
  smoothWheel: true,
  // 浮层视图内的滚动交给浏览器原生处理，避免 Lenis 吃掉竖向滚轮导致视图滚不动
  prevent: (node) => !!(node && node.closest && node.closest('.view-overlay')),
})
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
// 保留默认卡顿平滑：避免加载时主线程卡顿把时间差一次性灌给开场时间线、导致打字瞬间跑完
gsap.ticker.lagSmoothing(500, 33)
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
  bgm.play().then(() => { setSoundUI(true); sessionStorage.setItem('bgmOn', '1') }).catch(() => {})
}
function soundOff() {
  autoplayArmed = false
  bgm.pause()
  setSoundUI(false)
  sessionStorage.setItem('bgmOn', '0')
}

bgmBtn.addEventListener('click', () => (bgm.paused ? soundOn() : soundOff()))

// 跨页续播：恢复上次进度，并持续把进度写入 sessionStorage，供子页面接续
const _savedT = parseFloat(sessionStorage.getItem('bgmTime') || '0')
if (_savedT) bgm.addEventListener('loadedmetadata', () => { try { bgm.currentTime = _savedT } catch {} })
setInterval(() => { if (!bgm.paused) sessionStorage.setItem('bgmTime', String(bgm.currentTime)) }, 1000)
window.addEventListener('pagehide', () => sessionStorage.setItem('bgmTime', String(bgm.currentTime)))

// 注意：不在开场任意交互时解锁音频。BGM 只在「进入首页」那一下点击（enterSite）
// 或手动点音乐开关时才播放——避免开场点击就把音乐放出来，破坏沉浸感。

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
// 悬停交互元素放大（事件委托，兼容动态渲染的视图元素）
const CURSOR_HOVER = 'a, button, .bcard, .subject-card, .wall-chip, .hero-module, .tl-item'
document.addEventListener('pointerover', (e) => { if (e.target.closest(CURSOR_HOVER)) cursor.classList.add('is-active') })
document.addEventListener('pointerout', (e) => {
  if (e.target.closest(CURSOR_HOVER) && !e.relatedTarget?.closest(CURSOR_HOVER)) cursor.classList.remove('is-active')
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
  const boot = loader.querySelector('.boot')
  const codeRoot = loader.querySelector('.boot-code code')
  const heroChars = splitChars(document.querySelector('.hero-title'))
  gsap.set(heroChars, { y: 60 })
  gsap.set(['.hero-eyebrow', '.hero-en', '.hero-lead'], { opacity: 0, y: 20 })

  if (location.hash === '#home') {
  // ── 从子页面「返回泰提斯终端」：跳过开场动画，直接进入已入场的首屏 ──
  history.replaceState(null, '', location.pathname)
  loader.remove()
  lenis.start()
  gsap.set(heroChars, { opacity: 1, y: 0 })
  gsap.set(['.hero-eyebrow', '.hero-en', '.hero-lead'], { opacity: 1, y: 0 })
  document.querySelectorAll('.hero-module').forEach((m) => m.classList.add('is-online'))
  gsap.set(['.hero-hint', '#timeline', '#bgm-toggle', '.aimi-tag'], { opacity: 1 })
  if (sessionStorage.getItem('bgmOn') === '1') {
    soundOn()
    const kick = () => { if (bgm.paused) soundOn() }
    ;['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((ev) =>
      window.addEventListener(ev, kick, { once: true, passive: true }))
  }
  } else {
  const dataRain = new DataRain(loader.querySelector('#data-rain'))

  // 第一段：泰提斯逐行打出身份核验代码，每行代码下面紧跟对应的中文注释
  // 拉丁字母经 Solaris3 渲染为「通用语」字形；// 注释为可读中文，暗一档
  // k: 'code' 代码行 | 'note' 注释行 | 'gap' 空行
  const BOOT_LINES = [
    { k: 'code', s: '#access <Tethys.Core>' },
    { k: 'note', s: '// 接入泰提斯核心（预言机内核）' },
    { k: 'code', s: 'using namespace BlackShores;' },
    { k: 'note', s: '// 引入「黑海岸」（组织权限）' },
    { k: 'gap' },
    { k: 'code', s: 'verify(Visitor v) {' },
    { k: 'note', s: '// 核验来访者身份' },
    { k: 'code', s: '    scan signal = v.frequency;' },
    { k: 'note', s: '    // 读取访问者声痕（频率）' },
    { k: 'code', s: '    bind echo = signal.lament;' },
    { k: 'note', s: '    // 绑定其中的悲鸣回响' },
    { k: 'gap' },
    { k: 'code', s: '    for (resonance r : observer.match(signal)) {' },
    { k: 'note', s: '    // 在眺望者中寻找与你共鸣者' },
    { k: 'code', s: '        observer.identity = r.gaze;' },
    { k: 'note', s: '        // 以「眺望」确认身份' },
    { k: 'code', s: '        anchor(starfield, r.tide);' },
    { k: 'note', s: '        // 于地底星空抛下稳定锚' },
    { k: 'code', s: '    }' },
    { k: 'gap' },
    { k: 'code', s: '    sandbox.run(optimal);' },
    { k: 'note', s: '    // 推演沙盘算出最优解' },
    { k: 'code', s: '    confirm(v.welcome.home);' },
    { k: 'note', s: '    // 确认通过：欢迎回家' },
    { k: 'code', s: '}' },
  ]

  let booted = false
  const bootTl = gsap.timeline()
  BOOT_LINES.forEach((ln) => {
    let el
    bootTl.add(() => {
      el = document.createElement('div')
      el.className = 'ln ln-' + ln.k
      if (ln.k === 'gap') el.innerHTML = '&nbsp;'
      codeRoot.appendChild(el)
    })
    if (ln.k === 'gap') {
      bootTl.to({}, { duration: 0.12 })
    } else {
      const o = { n: 0 }
      bootTl.to(o, {
        n: ln.s.length,
        duration: Math.max(0.12, ln.s.length * (ln.k === 'note' ? 0.022 : 0.016)),
        ease: 'none',
        onUpdate: () => { el.textContent = ln.s.slice(0, Math.round(o.n)) },
      })
    }
  })
  bootTl
    .add(() => { boot.classList.add('done'); booted = true })
    .to('.boot-bar-state', { opacity: .4, duration: .3 }, '<')
    .fromTo('.boot-confirm', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out' }, '+=0.15')
    .fromTo('.loader-star', { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: .8, ease: 'back.out(1.8)' }, '<')

  // 第二段：点击后开音乐 → 黑花绽放吞屏转场 → 首屏入场
  // 代码未打完之前不响应点击，保护开场沉浸感
  let entered = false
  const enterSite = () => {
    if (!booted || entered) return
    entered = true
    soundOn()
    // 克隆一朵花精确叠在原花上做放大转场；原花与整个 loader 保持不动，
    // 直到最后一起平滑淡出——避免抽离原花导致确认区布局跳动、花骤然消失。
    const star = loader.querySelector('.loader-star')
    const rect = star.getBoundingClientRect()
    const warp = star.cloneNode(true)
    warp.style.setProperty('--accent', '#8b9aff') // 与开场锁定的品牌蓝一致
    document.body.appendChild(warp)
    gsap.set(warp, {
      position: 'fixed',
      left: rect.left + rect.width / 2, top: rect.top + rect.height / 2,
      width: rect.width, height: rect.height,
      xPercent: -50, yPercent: -50, margin: 0, zIndex: 200, scale: 1,
    })
    gsap.timeline()
      // 克隆花从原位放大、辉光增强，胀满整屏（原 loader 仍静止在后方）
      .to(warp, { scale: 56, duration: 1.15, ease: 'power3.in' })
      .to(warp, { filter: 'drop-shadow(0 0 80px var(--accent)) brightness(1.7)', duration: .95, ease: 'power2.in' }, '<')
      // 胀满后：暗色 loader 整层淡出露出首页，花同步溶解
      .add(() => {
        window.scrollTo(0, 0)
        lenis.scrollTo(0, { immediate: true })
        lenis.start()
        // 开场在屏幕中央撒一串星，宣告拖痕效果的存在
        const cx = innerWidth / 2
        const cy = innerHeight / 2
        ;[0, 120, 240, 360, 480].forEach((delay, i) => {
          setTimeout(() => trail.burst(cx + (i - 2) * 130, cy + Math.sin(i * 2.1) * 60, 150 - Math.abs(i - 2) * 30), delay)
        })
      }, '>-0.35')
      .to(loader, { opacity: 0, duration: .6, ease: 'power2.out' }, '<')
      .to(warp, { opacity: 0, duration: .6, ease: 'power2.out' }, '<')
      .add(() => { dataRain.destroy(); loader.remove(); warp.remove() })
      .to(heroChars, { opacity: 1, y: 0, duration: .9, stagger: 0.07, ease: 'power3.out' }, '>-0.25')
      .to('.hero-eyebrow', { opacity: 1, y: 0, duration: .7, ease: 'power2.out' }, 0.1)
      .to('.hero-en', { opacity: 1, y: 0, duration: .8, ease: 'power2.out' }, '>-0.2')
      .to('.hero-lead', { opacity: 1, y: 0, duration: .9, ease: 'power2.out' }, '<+0.15')
      .add(() => {
        document.querySelectorAll('.hero-module').forEach((module, i) => {
          setTimeout(() => module.classList.add('is-online'), i * 140)
        })
      }, '<+0.55')
      .fromTo('.hero-hint', { opacity: 0 }, { opacity: 1, duration: .8 }, '<+0.3')
      .to('#timeline', { opacity: 1, duration: .8 }, '<')
      .to('#bgm-toggle', { opacity: 1, duration: .8 }, '<')
      .fromTo('.aimi-tag', { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: .7 }, '<')
  }
  loader.addEventListener('click', enterSite)
  }
}

// 首屏标题滚动时上浮淡出，增强电影感
gsap.to('.hero-title', {
  opacity: 0, y: -80, ease: 'none',
  scrollTrigger: { trigger: '#hero', start: '40% top', end: 'bottom top', scrub: true },
})

// ============================================================
// 模块入口 = 单页视图(SPA)：渲染进同文档的容器，主页/音乐/光标全程不卸载
// ============================================================
{
  const VIEWS = {
    'observation.html': { load: () => import('./observation.js'), fn: 'mountObservation', accent: '#8b9aff' },
    'tide.html':        { load: () => import('./page.js'),        fn: 'mountPlaceholder', accent: '#4ef0e0', arg: 'tide' },
    'relation.html':    { load: () => import('./relation.js'),    fn: 'mountRelation',    accent: '#ffb066' },
  }
  let viewCleanup = null
  let busy = false

  async function openView(key) {
    if (busy || document.querySelector('.view-overlay')) return
    const v = VIEWS[key]; if (!v) return
    busy = true
    trail.pause(); lenis.stop()
    const ov = document.createElement('div')
    ov.className = 'view-overlay'
    ov.style.setProperty('--accent', v.accent)
    document.body.appendChild(ov)
    const mod = await v.load()
    viewCleanup = v.arg ? mod[v.fn](ov, v.arg, closeView) : mod[v.fn](ov, closeView)
    requestAnimationFrame(() => ov.classList.add('show'))
    busy = false
  }
  function closeView() {
    const ov = document.querySelector('.view-overlay')
    if (!ov) return
    ov.classList.remove('show')
    if (viewCleanup) { try { viewCleanup() } catch {} viewCleanup = null }
    trail.resume(); lenis.start()
    setTimeout(() => ov.remove(), 320)
  }
  document.querySelectorAll('.hero-module').forEach((a) => {
    a.addEventListener('click', (e) => {
      const key = (a.getAttribute('href') || '').replace(/^\.\//, '')
      if (!VIEWS[key]) return
      e.preventDefault()
      openView(key)
    })
  })
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeView() })
}
