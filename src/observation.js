import './page.css'         // 复用子页面基底（:root 变量、body、返回按钮）
import './observation.css'  // 监测墙样式
import './subshell.js'      // 自定义光标 + BGM 续播
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 观测对象页强调色（与首页模块一致：蓝）
document.documentElement.style.setProperty('--accent', '#8b9aff')
document.documentElement.style.setProperty('--bg', '#05060f')

// 标题入场
gsap.from('.subjects-kicker',  { opacity: 0, y: -12, duration: 0.7, delay: 0.2, ease: 'power2.out' })
gsap.from('.subjects-heading', { opacity: 0, y: 24,  duration: 0.9, delay: 0.4, ease: 'power3.out' })
gsap.from(['.subjects-rule', '.subjects-desc'], {
  opacity: 0, y: 16, duration: 0.7, delay: 0.65, stagger: 0.1, ease: 'power2.out',
})

/* 鸣潮属性体系 —— 六大属性 + 核心（泰提斯专属） */
const ELEMENTS = {
  冷凝: '#5ec5e8', 热熔: '#e8693f', 导电: '#a06be8',
  气动: '#4fd6a0', 衍射: '#e8c84f', 湮灭: '#d45a9a', 核心: '#5a6ee6',
}
const ELEMENT_ORDER = Object.keys(ELEMENTS)
const LOCK_COLOR = '#6b6f86'
const colorOf = (el) => ELEMENTS[el] || LOCK_COLOR

/* 观测对象数据 —— 新增角色往这里加一条 */
const SUBJECTS = [
  { code: 'S-001', name: '守岸人', element: '核心', version: '1.x',
    photo: 'photos/shorekeeper.jpg', tagline: '漫长守望的终点，是第一个愿意回头的旅人。',
    author: '腐朽的书', fx: 'butterfly', href: '#', status: 'archived' },
  { code: 'S-002', name: '千咲', element: '湮灭', version: '1.x',
    photo: 'photos/chisaki-1.jpg', tagline: '命运精心编织的线索，最难忘的那一笔。',
    author: 'TheNotoSeed', href: '#', status: 'archived' },
  { code: 'S-003', name: '莫宁', element: '热熔', version: '1.x',
    photo: 'photos/mornie.jpg', tagline: '晨光里苏醒的炽焰，温柔，亦灼人。',
    author: 'zutto_烧烤垃圾桶', href: '#', status: 'archived' },
  { code: 'S-004', name: '弗洛洛', element: '湮灭', version: '1.x',
    photo: 'photos/floro.jpg', tagline: '携琴穿过薰衣草海，奏一曲温柔的湮灭。',
    author: '雨鱼杆', fx: 'focus', href: '#', status: 'archived' },
  { code: 'S-005', name: '爱弥斯', element: '热熔', version: '1.x',
    photo: 'photos/aemis.jpg', tagline: '把炽热藏进一个心形里，悄悄递给你。',
    author: 'Akatsuki葉月', href: '#', status: 'archived' },
  { code: 'S-006', name: '达妮娅', element: '热熔', version: '1.x',
    photo: 'photos/dania.jpg', tagline: '以热熔之名，献上最炽热的馈赠。',
    author: 'Dekrjan', href: '#', status: 'archived' },
  { code: 'S-007', name: '西格莉卡', element: '气动', version: '1.x',
    photo: 'photos/sigrika.jpg', tagline: '乘风而来，将星辉编入每一缕气流。',
    author: 'byx', href: '#', status: 'archived' },
  { code: 'S-008', name: '琳奈', element: '衍射', version: '1.x',
    photo: 'photos/linnai.jpg', tagline: '以光为笔，在世界的暗面涂下属于自己的色彩。',
    author: '禾策', href: '#', status: 'archived' },
  { code: 'S-009', name: '菲比', element: '衍射', version: '1.x',
    photo: 'photos/phoebe.jpg', tagline: '在洒满阳光的海岸，把一个秘密轻轻藏进光里。',
    author: 'HA', href: '#', status: 'archived' },
  { code: 'S-010', name: '泱泱·玄翎', element: '待解密', version: '2.x',
    photo: 'photos/yangyang.jpg', tagline: '耳畔苍翎响远音', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-011', name: '心月狐', element: '待解密', version: '2.x',
    photo: 'photos/xinyuehu.jpg', tagline: '朝月清辉照孤城', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-012', name: '锁暝', element: '待解密', version: '2.x',
    photo: 'photos/suoming.jpg', tagline: '故锁旧契囚执念', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-013', name: '景燃', element: '待解密', version: '2.x',
    photo: 'photos/jingran.jpg', tagline: '幽境今人亦独行', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-014', name: '穗穗', element: '待解密', version: '2.x',
    photo: 'photos/suisui.jpg', tagline: '扇间朝晖道谜情', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-015', name: '清宵', element: '待解密', version: '2.x',
    photo: 'photos/qingxiao.jpg', tagline: '仙音寒芒镇云关', author: '鸣潮', href: '', status: 'locked' },
]

// ── 渲染卡片 ──────────────────────────────────────────────────────
const grid = document.getElementById('wall-grid')

function cardHTML(s) {
  const accent = colorOf(s.element)
  if (s.status === 'locked') {
    const hasImg = !!s.photo
    return `
      <article class="subject-card is-locked${hasImg ? ' has-img' : ''}" style="--card-accent:${accent}" data-element="${s.element}" data-status="locked">
        ${hasImg ? `<div class="card-photo"><img src="${s.photo}" alt="" loading="lazy" /></div><div class="card-veil"></div>` : ''}
        <span class="card-code">${s.code}</span>
        <div class="card-lock">待解密</div>
        <div class="card-body">
          <span class="card-badge">${s.element}</span>
          <h3 class="card-name">${s.name}</h3>
          ${s.tagline ? `<p class="locked-tagline">${s.tagline}</p>` : ''}
        </div>
        ${s.author ? `<span class="card-author">@${s.author}</span>` : ''}
      </article>`
  }
  return `
    <article class="subject-card${s.fx ? ' fx-' + s.fx : ''}" style="--card-accent:${accent}; --photo:url('${s.photo}')" data-element="${s.element}" data-status="archived" data-href="${s.href}">
      <div class="card-photo"><img src="${s.photo}" alt="${s.name}" loading="lazy" /></div>
      <div class="card-veil"></div>
      <div class="card-fx"></div>
      <span class="card-code">${s.code}</span>
      <div class="card-body">
        <span class="card-badge">${s.element}</span>
        <h3 class="card-name">${s.name}</h3>
        <p class="card-tagline">${s.tagline}</p>
        <span class="card-enter">进入档案 →</span>
      </div>
      ${s.author ? `<span class="card-author">@${s.author}</span>` : ''}
    </article>`
}

grid.innerHTML = SUBJECTS.map(cardHTML).join('')
const cards = Array.from(grid.querySelectorAll('.subject-card'))

// ── 守岸人 · 蝴蝶来访：hover 时一只蝴蝶从屏幕外飞入，停 2 秒再离开 ──
const guardianIndex = SUBJECTS.findIndex((s) => s.fx === 'butterfly')
if (guardianIndex >= 0) {
  const guardianCard = cards[guardianIndex]
  let butterflyActive = false
  guardianCard.addEventListener('pointerenter', () => {
    if (butterflyActive) return
    butterflyActive = true
    const rect = guardianCard.getBoundingClientRect()
    const ox = window.scrollX, oy = window.scrollY
    const lx = rect.left + ox + rect.width * 0.62 - 38
    const ly = rect.top + oy + rect.height * 0.10
    const bf = document.createElement('div')
    bf.className = 'visiting-butterfly'
    bf.innerHTML = '<img src="photos/butterfly.png" alt="" />'
    document.body.appendChild(bf)
    gsap.set(bf, { x: ox + window.innerWidth + 80, y: ly - 130, rotation: -22, opacity: 0 })
    gsap.timeline({ onComplete: () => { bf.remove(); butterflyActive = false } })
      .to(bf, { opacity: 1, duration: 0.3 }, 0)
      .to(bf, { x: lx + 75, y: ly - 65, rotation: -14, duration: 0.55, ease: 'sine.inOut' })
      .to(bf, { x: lx - 38, y: ly - 22, rotation: 12, duration: 0.5, ease: 'sine.inOut' })
      .to(bf, { x: lx, y: ly, rotation: 0, duration: 0.4, ease: 'power2.out',
        onComplete: () => bf.classList.add('landed') })
      .to(bf, { duration: 2 })
      .add(() => bf.classList.remove('landed'))
      .to(bf, { x: lx - 70, y: ly - 110, rotation: -16, duration: 0.45, ease: 'power1.in' })
      .to(bf, { x: ox - 150, y: ly - 320, rotation: -10, opacity: 0, duration: 0.85, ease: 'power1.in' })
  })
}

// 空状态提示
const emptyTip = document.createElement('p')
emptyTip.className = 'wall-empty'
emptyTip.textContent = '该属性暂无观测记录'
grid.after(emptyTip)

// 计数器
document.getElementById('count-archived').textContent =
  SUBJECTS.filter((s) => s.status === 'archived').length
document.getElementById('count-locked').textContent =
  SUBJECTS.filter((s) => s.status === 'locked').length

// ── 筛选栏（全部 + 鸣潮六大属性 + 核心）─────────────────────────
const filters = ['全部', ...ELEMENT_ORDER]
const filterBar = document.getElementById('wall-filters')
filterBar.innerHTML = filters
  .map((el, i) => {
    const accent = el === '全部' ? '' : ` style="--chip-accent:${colorOf(el)}"`
    return `<button class="wall-chip${i === 0 ? ' is-active' : ''}" data-filter="${el}"${accent} role="tab">${el}</button>`
  })
  .join('')
const chips = Array.from(filterBar.querySelectorAll('.wall-chip'))
const wall = document.querySelector('.subjects-wall')

function applyFilter(filter) {
  const targetY = wall.getBoundingClientRect().top + window.scrollY - 90
  if (window.scrollY > targetY + 4) window.scrollTo({ top: targetY, behavior: 'smooth' })
  let shown = 0
  cards.forEach((c) => {
    const show = filter === '全部' || c.dataset.element === filter
    if (show) {
      shown++
      c.style.display = ''
      gsap.fromTo(c, { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out', overwrite: true })
    } else {
      gsap.set(c, { opacity: 0 })
      c.style.display = 'none'
    }
  })
  emptyTip.classList.toggle('is-visible', shown === 0)
  ScrollTrigger.refresh()
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('is-active'))
    chip.classList.add('is-active')
    applyFilter(chip.dataset.filter)
  })
})

// ── 点击：跳转个人档案 / 锁定卡抖动 ──────────────────────────────
cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (card.dataset.status === 'locked') {
      card.classList.add('shake')
      setTimeout(() => card.classList.remove('shake'), 420)
      return
    }
    const href = card.dataset.href
    if (href && href !== '#') window.location.href = href
  })
})

// ── 入场动画：卡片随滚动逐个浮现 ────────────────────────────────
gsap.set(cards, { opacity: 0, y: 36 })
ScrollTrigger.batch(cards, {
  start: 'top 92%',
  onEnter: (batch) =>
    gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', overwrite: true }),
})
