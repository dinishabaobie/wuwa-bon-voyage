import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { DataRain } from './datarain.js'
import { setupCursor, setupBGM } from './shell.js'

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
    id: 'v30', num: '3.0', ver: '1.0', title: '一切开始的地方',
    en: 'WHERE IT ALL BEGAN',
    locale: '今州 · 瑝珑北境边关',
    cast: ['今汐', '长离', '秧秧'],
    status: '边关 · 稳定中戒备',
    metrics: [
      { k: '今州岁主', v: '角' },
      { k: '夜归军前线', v: '北落野' },
      { k: '悲鸣风险', v: '中高', warn: true },
    ],
    statusDesc: '今州是瑝珑北境的边陲关隘，自悲鸣之初便是对抗鸣式与残象潮的第一道防线。岁主「角」曾降临乘霄山，以时序之力庇护先民；如今今汐以令尹之身兼任角的共鸣者，夜归军驻守北落野前线。残星会潜入城中，企图唤醒无相燹主、加速悲鸣同化——这道看似太平的防线，始终绷在临界。',
    keeper: '数据显示瑝珑稳定。可「稳定」从不让我安心——只要有一丝异样，我都会替你揪着心。今州的灯仍亮着，我便把每一次细微的波动都记下。你不在的时候，替你守着这片土地，是我愿意做的事。',
    bg: '#0b0e2a', accent: '#8b9aff', photo: 'photos/3-0.jpg',
  },
  {
    id: 'v31', num: '3.1', ver: '2.0', title: '狂欢之下的暗涌',
    en: 'BENEATH THE CARNIVAL',
    locale: '拉古那 · 黎那汐塔',
    cast: ['卡提希娅', '菲比', '珂莱塔'],
    status: '稳定',
    metrics: [
      { k: '潮汐律动', v: '平稳' },
      { k: '悲鸣风险', v: '低' },
    ],
    statusDesc: '拉古那是黎那汐塔最大的城邦，一座以信仰、声骸与潮汐维系秩序的海上港城。水道纵横，假面、歌剧与狂欢昼夜不息；人们将公共声骸视作岁主英白拉多的赐福，习以为常。可在这份繁盛与秩序之下，黑潮的阴影从未真正退去。',
    keeper: '拉古那人习惯与声骸同行，把便利称为赐福，把规则称为神意。泰提斯终端无法判定，这究竟是安定，还是另一种形式的束缚——狂欢越是喧闹，水面之下的安静，就越值得有人去听。<br/><br/>外来植株生长稳定。<br/>与黑海岸环境匹配度不符。<br/>观测频率上调。',
    bg: '#201810', accent: '#edc77d', photo: 'photos/3-1.jpg', bigFig: true,
  },
  {
    id: 'v32', num: '3.2', ver: '2.4', title: '月光预见之地',
    en: 'FORESEEN BY MOONLIGHT',
    locale: '七丘 · 黎那汐塔',
    cast: ['尤诺·奥古斯塔'],
    status: '预言中偏移',
    metrics: [
      { k: '岁主信号', v: '英白拉多' },
      { k: '预言基准', v: '月相推演' },
      { k: '偏移量', v: '正在扩大', warn: true },
    ],
    statusDesc: '七丘是黎那汐塔的城邦之一，把古罗马的圆拱、柱式与狮鹫，解构重组成一座现代之城。这里也是月光预见之地——人们依月相推演命运，将被预见的未来，奉为既定的轨迹。可泰提斯的实测正与预言悄然分岔：那条被月光照亮的轨道，开始偏移。',
    keeper: '七丘依月相推演命运，把被预见的轨迹，当作既定的未来。这种信任我并不陌生——我自己，也是一台推演的造物。<br/><br/>预言基准：完好。<br/>实测轨迹：持续偏离。',
    bg: '#0c1828', accent: '#88c6ec', photo: 'photos/3-2.jpg',
  },
  {
    id: 'v33', num: '3.3', ver: '3.0', title: '我们生而眺望',
    en: 'WE WERE BORN TO GAZE',
    locale: '拉海洛 · 罗伊冰原之下',
    cast: ['琳奈', '莫宁', '洛瑟菈'],
    status: '后危机 · 文明重组',
    metrics: [
      { k: '炉芯核心', v: '人造 · 已装入隧者' },
      { k: '人工星空', v: '大气拟造阵列' },
      { k: '主理', v: '深空联合 · 星炬学院' },
      { k: '异常备注', v: '隧者离去', warn: true },
    ],
    statusDesc: '拉海洛是罗伊冰原之下的地下学园都市，索拉里斯新极点之下的文明核心。头顶的星空由大气拟造阵列点亮；深空联合在此办起星炬学院，罗伊族世代守着日灵与归源的古老传统。终局之后，隧者与阿列夫一相继离去，灭世危机暂退——可学院该如何在失去隧者的明天里继续存在，成了新的难题。',
    keeper: '这里的人住在冰原之下，头顶的星空是人造的，连脚下那颗太阳——炉芯——也是人造的核心，如今已被装上沉睡的隧者。可即便如此，他们依然把自己唤作眺望者。',
    bg: '#0b1320', accent: '#86bcd8', photo: 'photos/3-3.jpg',
  },
  {
    id: 'v34', num: '3.4', ver: '3.1', title: '风雪掩埋的故土',
    en: 'THE SNOWBOUND HOMELAND',
    locale: '罗伊冰原 · 冰原地表',
    cast: ['爱弥斯', '西格莉卡', '莫宁'],
    status: '极寒前线',
    metrics: [
      { k: '地表环境', v: '风雪 · 频率不稳' },
      { k: '跨层交通', v: '联运椎骨' },
      { k: '通行装备', v: '拉贝尔磁带 · 必携' },
    ],
    statusDesc: '冰原地表是拉海洛之上的罗伊冰原地表，也曾是罗伊人世代游牧的寒带峡湾故土——直到第一次悲鸣引发地磁极变，它才被冻成隔开地下文明与外界的极寒边境。如今这里是浮出地表的监测前线：联运椎骨连通上下，海维夏在地表盯着炉芯，虚质磁暴之下，唯有带上拉贝尔磁带方能前行。拉海洛的危机，在这里第一次露出地表。',
    keeper: '冰原地表是这趟航程里风雪最大的一段——也是罗伊人失落的故土。漂泊者一路追索到这片地表，在隧者与炉芯核心的尽头，与养女爱弥斯，完成了那场跨越十年的告别。',
    bg: '#0a131e', accent: '#e7cd92', photo: 'photos/3-4-farewell.jpg', figFull: true,
  },
  {
    id: 'anyuan', num: 'anyuan', ver: '3.3', title: '恒黯之下的封印',
    en: 'THE SEAL IN THE DARK',
    locale: '黯原 · 拉海洛深处',
    cast: ['绯雪', '达妮娅', '洛瑟菈'],
    status: '隧门已闭',
    metrics: [
      { k: '虚质浓度', v: '残留未净', warn: true },
      { k: '隧门', v: '已关闭' },
      { k: '阿列夫一', v: '已驱逐' },
      { k: '封印核心', v: '日脉源木 · 隧锚' },
    ],
    statusDesc: '黯原位于拉海洛最深处，是隧锚所在的地底空间，中心的日脉源木里藏着隧门与隧锚——整条罗伊冰原线最接近终局的地方。十多年前那道裂隙，是绯雪独自先行封印、深空联合再行加固的；3.3 危机全面爆发，漂泊者在这里直面阿列夫一与濒临失效的封印。如今隧门已经关闭，阿列夫一被驱逐，可这片禁区并未就此净化——残留的频率仍在，隧门事件的责任与后果，才刚刚开始结算。',
    keeper: '黯原是这趟旅程里，黑海岸离得最近的一段——我们替研究院搭起数据框架，盯着这片刚被打开的禁区。高浓度的虚质会吞掉信号，越往深处，空间越扭曲，连时间都不再连续。',
    bg: '#0b0a16', accent: '#e57a90', photo: 'photos/anyuan.jpg',
  },
  {
    id: 'cyberpunk', num: 'cyberpunk', title: '赛博朋克-边缘幻梦',
    en: 'CYBERPUNK · EDGE OF DREAMS',
    desc: '人们都说夜之城没有活着的传奇，可这一次，你终于能好好道一次别——<br/>勇敢的向前奔跑吧，露西，你所珍视的人已为你扫平前路荆棘，而你深爱的人正在路的尽头等你。',
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
    <div class="hero-figure" aria-hidden="true"></div>
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
        <div class="hero-emblem" aria-hidden="true"></div>
        <p class="hero-eyebrow">黑海岸 · 泰提斯系统</p>
        <h1 class="hero-title">欢迎回家</h1>
        <p class="hero-en" aria-hidden="true">WE&nbsp;WERE&nbsp;BORN&nbsp;TO&nbsp;GAZE</p>
        <p class="hero-lead">泰提斯已完成这段航程的全部推演。<br/>Ver 1.0 — 3.4，这一路皆已归档于地底星空，愿你旅途愉快。</p>
      </div>

      <footer class="hero-foot">
        <p class="hero-hint">SCROLL</p>
      </footer>
    </div>
  </section>
  ${CHAPTERS.map((c) => `
    ${(() => {
      const region = REGION_LABELS[c.num] || c.num
      const dossierId = c.ver || (/^\d/.test(c.num) ? c.num : region.slice(0, 4))
      // 标题部分（档案/坐标/EN/标题/简介）
      const headTitle = `
        <div class="ch-dossier">
          <span class="dossier-code">档案 R-${dossierId}</span>
          <span class="dossier-rule"></span>
          <span class="dossier-mark">观测档案 · 泰提斯</span>
        </div>
        ${c.locale ? `<p class="ch-locale">坐标 · ${c.locale}</p>` : ''}
        <p class="ch-kicker">${c.en}</p>
        <h2 class="ch-title">${c.title}</h2>
        ${c.desc ? `<p class="ch-desc">${c.desc}</p>` : ''}`
      // 状态部分（区域状态/指标/状态描述）
      const headStatus = c.status ? `
        <div class="ch-status">
          <span class="ch-status-tag">区域状态</span>
          <span class="ch-status-val">${c.status}</span>
        </div>
        ${c.metrics ? `<div class="ch-metrics">${c.metrics.map((m) => `<span class="ch-metric"><span class="k">${m.k}</span><span class="v${m.warn ? ' warn' : ''}">${m.v}</span></span>`).join('')}</div>` : ''}
        <p class="ch-status-desc">${c.statusDesc}</p>` : ''
      const keeper = c.keeper ? `<blockquote class="ch-keeper"><p>${c.keeper}</p><cite>守岸人 · 观测附注</cite></blockquote>` : ''
      const cast = `<p class="ch-cast">${c.cast.map((n) => `<b>${n}</b>`).join('<span> · </span>')}</p>`
      const figure = `<figure class="ch-figure"><img src="${c.photo}" alt="${c.title}" loading="lazy" /><figcaption class="fig-tag">${region}</figcaption></figure>`
      const wide = c.wide ? `<figure class="ch-wide"><img src="${c.wide}" alt="${c.wideAlt || c.title}" loading="lazy" /></figure>` : ''
      const cls = `chapter${c.bigFig ? ' chapter--bigfig' : ''}${c.figFull ? ' chapter--figfull' : ''}`
      const verNum = `<div class="ver-num" aria-hidden="true">${region}</div>`
      // figFull：标题整行在上；下方两栏＝左「区域状态/指标/描述」、右「守岸人附注+群像」（与区域状态顶端对齐）；大图全幅在下
      const inner = c.figFull
        ? `${verNum}<div class="ch-text figfull-head">${headTitle}</div>
           <div class="figfull-cols"><div class="figfull-status">${headStatus}</div><aside class="ch-aside">${keeper}${cast}</aside></div>
           ${figure}`
        : `${verNum}<div class="ch-text">${headTitle}${headStatus}${keeper}${cast}</div>${figure}${wide}`
      return `<section class="${cls}" id="${c.id}" data-bg="${c.bg}" data-accent="${c.accent}" data-nav="${c.num}"><div class="chapter-inner">${inner}</div></section>`
    })()}
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
  hero: '黑海岸',
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
  // 浮层视图/档案弹层内的滚动交给浏览器原生处理，避免 Lenis 吃掉竖向滚轮导致滚不动
  prevent: (node) => !!(node && node.closest && node.closest('.view-overlay, .prof-overlay')),
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
// 音频 / 自定义光标（逻辑在 shell.js，与独立子页共用）
// ============================================================
// BGM：「远航星的告别」。注意：不在开场任意交互时解锁音频——只在「进入首页」
// 那一下点击（enterSite）或手动点音乐开关时才播放，避免破坏开场沉浸感。
const { soundOn, resumeIfOn } = setupBGM(document.getElementById('bgm-toggle'))
setupCursor(document.getElementById('cursor'))

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
  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 62%', toggleActions: 'play none none reverse' },
  })
  // 缺失的块自动跳过，避免 GSAP 对 null 目标告警
  const rev = (sel, pos, y = 22, d = .8) => {
    const el = section.querySelector(sel)
    if (el) tl.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration: d, ease: 'power2.out' }, pos)
  }
  tl.fromTo(figure, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.35, ease: 'power3.inOut' })
  rev('.ch-dossier', 0.1, 16)
  rev('.ch-locale', 0.18, 16)
  rev('.ch-kicker', 0.24)
  tl.to(titleChars, { opacity: 1, y: 0, duration: .5, ease: 'power3.out', stagger: 0.045 }, 0.34)
  rev('.ch-desc', 0.6, 26, .9)
  rev('.ch-status', 0.58, 18)
  rev('.ch-metrics', 0.66, 14)
  rev('.ch-status-desc', 0.74, 18)
  rev('.ch-keeper', 0.82, 18)
  rev('.ch-cast', 0.9, 14)

  // 照片视差 + 巨大版本号反向漂移（scrub 跟随滚动）
  // figFull 章节要完整展示整图，不做纵向视差（否则会裁掉上下边）
  if (!c.figFull) gsap.fromTo(img, { yPercent: -9 }, {
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
  gsap.set(['.hero-hint', '#timeline', '#bgm-toggle', '.hero-figure'], { opacity: 1 })
  resumeIfOn()
  } else {
  const dataRain = new DataRain(loader.querySelector('#data-rain'))

  // 第一段：泰提斯逐行打出身份核验代码，每行代码下面紧跟对应的中文注释
  // 拉丁字母经 Solaris3 渲染为「通用语」字形；// 注释为可读中文，暗一档
  // k: 'code' 代码行 | 'note' 注释行 | 'gap' 空行
  // sp: 该行打字快慢系数（<1 更快、>1 更慢，缺省 1）；hold: 该行打完后停顿秒数（模拟卡顿/思考）
  const BOOT_LINES = [
    { k: 'code', s: '#access <Tethys.Core>', sp: 1.25 },
    { k: 'note', s: '// 接入泰提斯核心（预言机内核）' },
    { k: 'code', s: 'using namespace BlackShores;', sp: 0.65 },
    { k: 'note', s: '// 引入「黑海岸」（组织权限）' },
    { k: 'gap' },
    { k: 'code', s: 'verify(Visitor v) {' },
    { k: 'note', s: '// 核验来访者身份' },
    { k: 'code', s: '    scan signal = v.frequency;', sp: 0.7 },
    { k: 'note', s: '    // 读取访问者声痕（频率）' },
    { k: 'code', s: '    bind echo = signal.lament;', sp: 1.35 },
    { k: 'note', s: '    // 绑定其中的悲鸣回响' },
    { k: 'gap' },
    { k: 'code', s: '    for (resonance r : observer.match(signal)) {', sp: 0.6, hold: 1.8 },
    { k: 'note', s: '    // 在眺望者中寻找与你共鸣者' },
    { k: 'code', s: '        observer.identity = r.gaze;', sp: 1.2 },
    { k: 'note', s: '        // 以「眺望」确认身份' },
    { k: 'code', s: '        anchor(starfield, r.tide);', sp: 0.75 },
    { k: 'note', s: '        // 于地底星空抛下稳定锚' },
    { k: 'code', s: '    }', sp: 0.6 },
    { k: 'gap' },
    { k: 'code', s: '    sandbox.run(optimal);', sp: 0.9 },
    { k: 'note', s: '    // 推演沙盘算出最优解' },
    { k: 'code', s: '    confirm(v.welcome.home);', sp: 1.4 },
    { k: 'note', s: '    // 确认通过：欢迎回家' },
    { k: 'code', s: '}' },
  ]

  let booted = false
  const bootTl = gsap.timeline()
  // 每字符基准时长（已整体加快）；code 比 note 略快，再乘以每行 sp 形成快慢节奏
  const CPS = { code: 0.011, note: 0.014 }
  BOOT_LINES.forEach((ln) => {
    let el
    bootTl.add(() => {
      el = document.createElement('div')
      el.className = 'ln ln-' + ln.k
      if (ln.k === 'gap') el.innerHTML = '&nbsp;'
      codeRoot.appendChild(el)
    })
    if (ln.k === 'gap') {
      bootTl.to({}, { duration: 0.1 })
    } else if (ln.k === 'note') {
      // 注释行匀速打出，不做快慢抖动
      const o = { n: 0 }
      bootTl.to(o, {
        n: ln.s.length,
        duration: Math.max(0.1, ln.s.length * CPS.note * (ln.sp || 1)),
        ease: 'none',
        onUpdate: () => { el.textContent = ln.s.slice(0, Math.round(o.n)) },
      })
    } else {
      // 代码行逐字符揭示：每个字符间隔带随机抖动，同一行内也有快有慢，更像真人敲键。
      // base 为该行平均字符时长（受 sp 控制宏观快慢），jitter 制造微观的连打与迟滞。
      const base = CPS.code * (ln.sp || 1)
      // holdMid：打到这一行中间时停顿 ln.hold 秒，光标卡在半途，模拟真实输入迟滞
      const midIdx = ln.hold ? Math.round(ln.s.length / 2) : -1
      for (let i = 1; i <= ln.s.length; i++) {
        const jitter = 0.4 + Math.random() * 1.3 // 0.4×~1.7×：偶发快速连打 / 短暂停顿
        // 约 8% 概率额外卡顿一下，模拟输入迟滞
        const stall = Math.random() < 0.08 ? 0.05 + Math.random() * 0.12 : 0
        bootTl.to({}, {
          duration: Math.max(0.012, base * jitter + stall),
          onComplete: () => { el.textContent = ln.s.slice(0, i) },
        })
        if (i === midIdx) bootTl.to({}, { duration: ln.hold })
      }
    }
    // 行末停顿仅用于 note/gap 行；code 行的停顿已在行内中途处理
    if (ln.hold && ln.k !== 'code') bootTl.to({}, { duration: ln.hold })
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
      }, '>-0.35')
      .to(loader, { opacity: 0, duration: .6, ease: 'power2.out' }, '<')
      .to(warp, { opacity: 0, duration: .6, ease: 'power2.out' }, '<')
      .add(() => { dataRain.destroy(); loader.remove(); warp.remove() })
      .to(heroChars, { opacity: 1, y: 0, duration: .9, stagger: 0.07, ease: 'power3.out' }, '>-0.25')
      .fromTo('.hero-figure', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' }, '<')
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
  }
  loader.addEventListener('click', enterSite)
  }
}

// 全部图片加载完成后刷新一次 ScrollTrigger：纠正懒加载图片可能造成的位置偏差，
// 避免滚到底部时 pin 的结尾区出现错位抖动
window.addEventListener('load', () => ScrollTrigger.refresh())

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
    'tide.html':        { load: () => import('./tide.js'),        fn: 'mountTide',        accent: '#3a9fe8' },
    'relation.html':    { load: () => import('./relation.js'),    fn: 'mountRelation',    accent: '#ffb066' },
  }
  let viewCleanup = null
  let viewTrigger = null
  let busy = false
  let openId = 0        // 每次 openView 递增；closeView 令加载中的挂载失效
  let viewInert = null  // 视图打开期间被 inert 的背景元素 → 原 inert 值

  // aria-modal 之外真正隔离键盘焦点：视图打开时把主页内容设为 inert
  function lockBehind(ov) {
    viewInert = new Map()
    Array.from(document.body.children).forEach((child) => {
      if (child === ov) return
      viewInert.set(child, child.inert)
      child.inert = true
    })
  }
  function unlockBehind() {
    if (!viewInert) return
    viewInert.forEach((wasInert, child) => { child.inert = wasInert })
    viewInert = null
  }

  async function openView(key, trigger) {
    if (busy || document.querySelector('.view-overlay')) return
    const v = VIEWS[key]; if (!v) return
    busy = true
    const id = ++openId
    viewTrigger = trigger || null
    lenis.stop()
    const ov = document.createElement('div')
    ov.className = 'view-overlay'
    ov.setAttribute('role', 'dialog')
    ov.setAttribute('aria-modal', 'true')
    ov.style.setProperty('--accent', v.accent)
    document.body.appendChild(ov)
    lockBehind(ov)
    try {
      const mod = await v.load()
      // 动态加载期间可能已被 Esc 关闭（closeView 使 openId 失效）：放弃挂载，
      // 否则模块给 window/body 加的监听器与节点将无人清理
      if (id !== openId || !ov.isConnected) return
      viewCleanup = mod[v.fn](ov, closeView)
      requestAnimationFrame(() => {
        ov.classList.add('show')
        ov.querySelector('.back')?.focus()
      })
    } catch (error) {
      console.error(`模块加载失败: ${key}`, error)
      unlockBehind()
      ov.remove()
      lenis.start()
      viewTrigger?.focus()
      viewTrigger = null
    } finally {
      busy = false
    }
  }
  function closeView() {
    const ov = document.querySelector('.view-overlay')
    if (!ov) return
    openId++
    const returnTarget = viewTrigger
    viewTrigger = null
    ov.classList.remove('show')
    if (viewCleanup) { try { viewCleanup() } catch {} viewCleanup = null }
    unlockBehind()
    lenis.start()
    setTimeout(() => {
      ov.remove()
      returnTarget?.focus()
    }, 320)
  }
  document.querySelectorAll('.hero-module').forEach((a) => {
    a.addEventListener('click', (e) => {
      const key = (a.getAttribute('href') || '').replace(/^\.\//, '')
      if (!VIEWS[key]) return
      e.preventDefault()
      openView(key, a)
    })
  })
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeView() })
}
