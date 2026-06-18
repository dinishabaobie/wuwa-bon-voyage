import './view-chrome.css' // 返回按钮等通用外壳
import './relation.css'  // 关系看板样式
import canvasRaw from './relations.canvas?raw'

const PRESET = { '1': '#fb464c', '2': '#e9973f', '3': '#e0de71', '4': '#44cf6e', '5': '#53dfdd', '6': '#a882ff' }
const colorOf = (c, fb = '#5eadc8') => (!c ? fb : (PRESET[c] || c))

// 把群像关系看板渲染进 root，返回 cleanup 函数。onBack 为「返回」回调。
export function mountRelation(root, onBack) {
  root.innerHTML = `
    <a class="back" href="./index.html#home"><span aria-hidden="true">◂</span> 返回泰提斯终端</a>
    <header class="rel-head">
      <p class="rel-kicker">RELATION MAP</p>
      <h1 class="rel-title">群像</h1>
      <p class="rel-hint">势力人物关系总图　·　横向滚动 · 悬停预览 · 点击锁定关系</p>
    </header>
    <div class="board-wrap">
      <div class="board-inner">
        <svg class="board-lines" xmlns="http://www.w3.org/2000/svg"></svg>
        <div class="board-cols"></div>
      </div>
    </div>`
  root.querySelector('.back').addEventListener('click', (e) => { e.preventDefault(); onBack && onBack() })

  const data = JSON.parse(canvasRaw)
  const NODES = data.nodes || []
  const EDGES = data.edges || []

  const groups = NODES.filter((n) => n.type === 'group')
  const inside = (n, g) =>
    n.x >= g.x - 5 && n.y >= g.y - 5 &&
    n.x + n.width <= g.x + g.width + 5 && n.y + n.height <= g.y + g.height + 5
  const groupOf = (n) => { const g = groups.find((gp) => inside(n, gp)); return g ? g.label : null }

  const items = NODES
    .filter((n) => n.type === 'text' && n.text && n.text.trim())
    .map((n) => ({ id: n.id, color: colorOf(n.color), text: n.text, group: groupOf(n) }))
  const hasCard = new Set(items.map((i) => i.id))

  const rel = {}
  EDGES.forEach((e) => {
    if (!hasCard.has(e.fromNode) || !hasCard.has(e.toNode)) return
    const info = { color: colorOf(e.color, 'rgba(150,170,200,.7)'), label: e.label || '' }
    ;(rel[e.fromNode] = rel[e.fromNode] || new Map()).set(e.toNode, info)
    ;(rel[e.toNode] = rel[e.toNode] || new Map()).set(e.fromNode, info)
  })

  const mdHTML = (t) => t.split('\n').map((line) =>
    line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')).join('<br>')

  const BS = (groups.find((g) => /黑海岸/.test(g.label)) || {}).label
  const CENTER = (groups.find((g) => /主线/.test(g.label)) || {}).label
  const ANTAG = (groups.find((g) => /残星会/.test(g.label)) || {}).label
  const INTL = (groups.find((g) => /国际/.test(g.label)) || {}).label
  const pinnedCols = [BS, CENTER, ANTAG, INTL].filter(Boolean)
  const verKey = (label) => {
    const m = label.match(/(\d+)\.(\d+)/)
    return m ? parseInt(m[1], 10) * 100 + parseInt(m[2], 10) : -1
  }
  const rest = groups.map((g) => g.label).filter((l) => !pinnedCols.includes(l))
  rest.sort((a, b) => {
    const va = verKey(a), vb = verKey(b)
    if (va === vb) return 0
    if (va === -1) return 1
    if (vb === -1) return -1
    return vb - va
  })
  const order = [...pinnedCols, ...rest]

  const cols = root.querySelector('.board-cols')
  const cardById = {}
  function makeColumn(label, arr, gcol) {
    if (!arr.length) return
    const col = document.createElement('section')
    col.className = 'board-col'
    col.style.setProperty('--c', gcol)
    const head = document.createElement('h3')
    head.className = 'col-head'
    head.innerHTML = `<span>${label}</span><i>${arr.length}</i>`
    col.appendChild(head)
    arr.forEach((it) => {
      const card = document.createElement('article')
      card.className = 'bcard'
      card.style.setProperty('--c', it.color)
      card.dataset.id = it.id
      card.innerHTML = mdHTML(it.text)
      col.appendChild(card)
      cardById[it.id] = card
    })
    cols.appendChild(col)
  }
  const CAT_RANK = { '#1565C0': 1, '#2E7D32': 1, '#5D4037': 2, '#00838F': 3, '#8E24AA': 4, '#EF6C00': 5, '#455A64': 6 }
  const catSort = (arr) => arr.slice().sort((a, b) => (CAT_RANK[a.color] ?? 7) - (CAT_RANK[b.color] ?? 7))
  order.forEach((label) => {
    makeColumn(label, catSort(items.filter((i) => i.group === label)),
      colorOf((groups.find((g) => g.label === label) || {}).color))
  })
  const loose = items.filter((i) => i.group === null)
  if (loose.length) makeColumn('其它', catSort(loose), '#8aa0b8')

  const binner = root.querySelector('.board-inner')
  const lines = root.querySelector('.board-lines')
  const SVGNS = 'http://www.w3.org/2000/svg'
  function sizeLines() {
    lines.setAttribute('width', binner.scrollWidth)
    lines.setAttribute('height', binner.scrollHeight)
  }
  sizeLines()
  window.addEventListener('resize', sizeLines)

  function center(card) {
    const ir = binner.getBoundingClientRect()
    const r = card.getBoundingClientRect()
    return { x: r.left - ir.left + r.width / 2, y: r.top - ir.top + r.height / 2 }
  }
  function drawRelations(id) {
    lines.innerHTML = ''
    const m = rel[id]; if (!m) return
    const a = center(cardById[id])
    m.forEach((info, oid) => {
      const c = cardById[oid]; if (!c) return
      const b = center(c)
      const mx = (a.x + b.x) / 2
      const path = document.createElementNS(SVGNS, 'path')
      path.setAttribute('d', `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`)
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', info.color)
      path.setAttribute('stroke-width', '2')
      path.setAttribute('stroke-opacity', '.9')
      lines.appendChild(path)
      if (info.label) {
        const tx = document.createElementNS(SVGNS, 'text')
        tx.setAttribute('x', mx); tx.setAttribute('y', (a.y + b.y) / 2 - 4)
        tx.setAttribute('text-anchor', 'middle'); tx.setAttribute('class', 'edge-label')
        tx.setAttribute('fill', info.color)
        tx.textContent = info.label
        lines.appendChild(tx)
      }
    })
  }

  let pinned = null
  function setFocus(id) {
    clearFocusUI()
    const card = cardById[id]; if (!card) return
    binner.classList.add('focusing')
    card.classList.add('hl', 'is-src')
    const m = rel[id]
    if (m) m.forEach((_, oid) => cardById[oid] && cardById[oid].classList.add('hl'))
    drawRelations(id)
  }
  function clearFocusUI() {
    binner.classList.remove('focusing')
    root.querySelectorAll('.bcard.hl, .bcard.is-src').forEach((c) => c.classList.remove('hl', 'is-src'))
    lines.innerHTML = ''
  }

  Object.entries(cardById).forEach(([id, card]) => {
    card.addEventListener('pointerenter', () => { if (!pinned) setFocus(id) })
    card.addEventListener('pointerleave', () => { if (!pinned) clearFocusUI() })
    card.addEventListener('click', (e) => {
      e.stopPropagation()
      if (pinned === id) { pinned = null; clearFocusUI() }
      else { pinned = id; setFocus(id) }
    })
  })
  binner.addEventListener('click', () => { if (pinned) { pinned = null; clearFocusUI() } })

  return () => window.removeEventListener('resize', sizeLines)
}
