import './view-chrome.css' // 返回按钮等通用外壳
import './observation.css'  // 监测墙样式
import gsap from 'gsap'

/* 鸣潮属性体系 —— 六大属性 + 核心 */
const ELEMENTS = {
  冷凝: '#5ec5e8', 热熔: '#e8693f', 导电: '#a06be8',
  气动: '#4fd6a0', 衍射: '#e8c84f', 湮灭: '#d45a9a', 核心: '#5a6ee6',
}
const ELEMENT_ORDER = Object.keys(ELEMENTS)
const LOCK_COLOR = '#6b6f86'
const colorOf = (el) => ELEMENTS[el] || LOCK_COLOR

const SUBJECTS = [
  { code: 'S-001', name: '守岸人', element: '核心', photo: 'photos/shorekeeper.jpg', tagline: '漫长守望的终点，是第一个愿意回头的旅人。', author: '腐朽的书', fx: 'butterfly', href: '#', status: 'archived' },
  { code: 'S-002', name: '千咲', element: '湮灭', photo: 'photos/chisaki-1.jpg', tagline: '命运精心编织的线索，最难忘的那一笔。', author: 'TheNotoSeed', href: '#', status: 'archived' },
  { code: 'S-003', name: '莫宁', element: '热熔', photo: 'photos/mornie.jpg', tagline: '晨光里苏醒的炽焰，温柔，亦灼人。', author: 'zutto_烧烤垃圾桶', href: '#', status: 'archived' },
  { code: 'S-004', name: '弗洛洛', element: '湮灭', photo: 'photos/floro.jpg', tagline: '携琴穿过薰衣草海，奏一曲温柔的湮灭。', author: '雨鱼杆', fx: 'focus', href: '#', status: 'archived' },
  { code: 'S-005', name: '爱弥斯', element: '热熔', photo: 'photos/aemis.jpg', tagline: '把炽热藏进一个心形里，悄悄递给你。', author: 'Akatsuki葉月', href: '#', status: 'archived' },
  { code: 'S-006', name: '达妮娅', element: '热熔', photo: 'photos/dania.jpg', tagline: '以热熔之名，献上最炽热的馈赠。', author: 'Dekrjan', href: '#', status: 'archived' },
  { code: 'S-007', name: '西格莉卡', element: '气动', photo: 'photos/sigrika.jpg', tagline: '乘风而来，将星辉编入每一缕气流。', author: 'byx', href: '#', status: 'archived' },
  { code: 'S-008', name: '琳奈', element: '衍射', photo: 'photos/linnai.jpg', tagline: '以光为笔，在世界的暗面涂下属于自己的色彩。', author: '禾策', href: '#', status: 'archived' },
  { code: 'S-009', name: '菲比', element: '衍射', photo: 'photos/phoebe.jpg', tagline: '在洒满阳光的海岸，把一个秘密轻轻藏进光里。', author: 'HA', href: '#', status: 'archived' },
  { code: 'S-010', name: '泱泱·玄翎', element: '待解密', photo: 'photos/yangyang.jpg', tagline: '耳畔苍翎响远音', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-011', name: '心月狐', element: '待解密', photo: 'photos/xinyuehu.jpg', tagline: '朝月清辉照孤城', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-012', name: '锁暝', element: '待解密', photo: 'photos/suoming.jpg', tagline: '故锁旧契囚执念', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-013', name: '景燃', element: '待解密', photo: 'photos/jingran.jpg', tagline: '幽境今人亦独行', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-014', name: '穗穗', element: '待解密', photo: 'photos/suisui.jpg', tagline: '扇间朝晖道谜情', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-015', name: '清宵', element: '待解密', photo: 'photos/qingxiao.jpg', tagline: '仙音寒芒镇云关', author: '鸣潮', href: '', status: 'locked' },
]

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

// 把观测对象监测墙渲染进 root（root 同时是滚动容器）。onBack 为「返回」回调。
export function mountObservation(root, onBack) {
  root.innerHTML = `
    <a class="back" href="./index.html#home"><span aria-hidden="true">◂</span> 返回泰提斯终端</a>
    <main class="obs-main">
      <section class="subjects-hero">
        <p class="subjects-kicker">TETHYS · OBSERVATION LOG</p>
        <h1 class="subjects-heading">观测对象</h1>
        <div class="subjects-rule"></div>
        <p class="subjects-desc">以下档案由泰缇斯系统自动记录，内容已通过黑海岸权限核验。</p>
        <div class="aimi-tag" aria-hidden="true">
          <div class="aimi-portrait" data-text="UNKNOWN ACCESS"></div>
          <div class="aimi-meta">
            <p class="aimi-glitch" data-text="小爱到此一游">小爱到此一游</p>
            <p class="aimi-sub">⚠ INTRUSION · AIMI</p>
          </div>
        </div>
      </section>
      <section class="subjects-wall">
        <div class="wall-toolbar">
          <p class="wall-counter">已观测 <span class="count-archived">0</span><em>·</em>待解密 <span class="count-locked">0</span></p>
          <div class="wall-filters" role="tablist" aria-label="筛选"></div>
        </div>
        <div class="wall-grid"></div>
      </section>
    </main>`
  root.querySelector('.back').addEventListener('click', (e) => { e.preventDefault(); onBack && onBack() })

  gsap.from(root.querySelector('.subjects-kicker'), { opacity: 0, y: -12, duration: 0.7, delay: 0.2, ease: 'power2.out' })
  gsap.from(root.querySelector('.subjects-heading'), { opacity: 0, y: 24, duration: 0.9, delay: 0.4, ease: 'power3.out' })
  gsap.from([root.querySelector('.subjects-rule'), root.querySelector('.subjects-desc')], { opacity: 0, y: 16, duration: 0.7, delay: 0.65, stagger: 0.1, ease: 'power2.out' })

  const grid = root.querySelector('.wall-grid')
  grid.innerHTML = SUBJECTS.map(cardHTML).join('')
  const cards = Array.from(grid.querySelectorAll('.subject-card'))

  // 守岸人 · 蝴蝶来访
  const guardianIndex = SUBJECTS.findIndex((s) => s.fx === 'butterfly')
  if (guardianIndex >= 0) {
    const guardianCard = cards[guardianIndex]
    let butterflyActive = false
    guardianCard.addEventListener('pointerenter', () => {
      if (butterflyActive) return
      butterflyActive = true
      const rr = root.getBoundingClientRect()
      const cr = guardianCard.getBoundingClientRect()
      // 转为 root 内容坐标（随滚动）
      const lx = cr.left - rr.left + root.scrollLeft + cr.width * 0.62 - 38
      const ly = cr.top - rr.top + root.scrollTop + cr.height * 0.10
      const bf = document.createElement('div')
      bf.className = 'visiting-butterfly'
      bf.innerHTML = '<img src="photos/butterfly.png" alt="" />'
      root.appendChild(bf)
      const offX = root.scrollLeft + root.clientWidth
      gsap.set(bf, { x: offX + 80, y: ly - 130, rotation: -22, opacity: 0 })
      gsap.timeline({ onComplete: () => { bf.remove(); butterflyActive = false } })
        .to(bf, { opacity: 1, duration: 0.3 }, 0)
        .to(bf, { x: lx + 75, y: ly - 65, rotation: -14, duration: 0.55, ease: 'sine.inOut' })
        .to(bf, { x: lx - 38, y: ly - 22, rotation: 12, duration: 0.5, ease: 'sine.inOut' })
        .to(bf, { x: lx, y: ly, rotation: 0, duration: 0.4, ease: 'power2.out', onComplete: () => bf.classList.add('landed') })
        .to(bf, { duration: 2 })
        .add(() => bf.classList.remove('landed'))
        .to(bf, { x: lx - 70, y: ly - 110, rotation: -16, duration: 0.45, ease: 'power1.in' })
        .to(bf, { x: root.scrollLeft - 150, y: ly - 320, rotation: -10, opacity: 0, duration: 0.85, ease: 'power1.in' })
    })
  }

  // 空状态
  const emptyTip = document.createElement('p')
  emptyTip.className = 'wall-empty'
  emptyTip.textContent = '该属性暂无观测记录'
  grid.after(emptyTip)

  // 计数
  root.querySelector('.count-archived').textContent = SUBJECTS.filter((s) => s.status === 'archived').length
  root.querySelector('.count-locked').textContent = SUBJECTS.filter((s) => s.status === 'locked').length

  // 筛选
  const filters = ['全部', ...ELEMENT_ORDER]
  const filterBar = root.querySelector('.wall-filters')
  filterBar.innerHTML = filters.map((el, i) => {
    const accent = el === '全部' ? '' : ` style="--chip-accent:${colorOf(el)}"`
    return `<button class="wall-chip${i === 0 ? ' is-active' : ''}" data-filter="${el}"${accent} role="tab">${el}</button>`
  }).join('')
  const chips = Array.from(filterBar.querySelectorAll('.wall-chip'))
  const wall = root.querySelector('.subjects-wall')

  function applyFilter(filter) {
    const targetY = wall.offsetTop - 90
    if (root.scrollTop > targetY + 4) root.scrollTo({ top: targetY, behavior: 'smooth' })
    let shown = 0
    cards.forEach((c) => {
      const show = filter === '全部' || c.dataset.element === filter
      if (show) {
        shown++
        c.style.display = ''
        gsap.fromTo(c, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out', overwrite: true })
      } else {
        gsap.set(c, { opacity: 0 })
        c.style.display = 'none'
      }
    })
    emptyTip.classList.toggle('is-visible', shown === 0)
  }
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'))
      chip.classList.add('is-active')
      applyFilter(chip.dataset.filter)
    })
  })

  // 点击：跳转 / 锁定抖动
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

  // 入场：卡片随滚动逐个浮现（IntersectionObserver，root 为滚动容器）
  gsap.set(cards, { opacity: 0, y: 36 })
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        gsap.to(en.target, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', overwrite: true })
        io.unobserve(en.target)
      }
    })
  }, { root, rootMargin: '0px 0px -8% 0px' })
  cards.forEach((c) => io.observe(c))

  return () => io.disconnect()
}
