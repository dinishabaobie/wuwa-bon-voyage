// 子页面共享外壳：自定义四芒星光标 + BGM 跨页续播
// 在各子页面脚本顶部 import './subshell.js' 即可。
// 若被主页以 iframe 浮层方式打开（IN_FRAME），则音乐由主页统一播放（无缝），
// 本页不再创建音频，返回按钮改为通知主页关闭浮层。
const IN_FRAME = window.self !== window.top

// ── 自定义四芒星光标 ──────────────────────────────────────────────
const cursor = document.createElement('div')
cursor.id = 'cursor'
cursor.setAttribute('aria-hidden', 'true')
document.body.appendChild(cursor)

const pos = { x: innerWidth / 2, y: innerHeight / 2 }
const tgt = { ...pos }
let cursorReady = false
cursor.style.opacity = '0' // 首次移动前隐藏，避免从中心缓动滑入造成「乱飞」
window.addEventListener('pointermove', (e) => {
  tgt.x = e.clientX; tgt.y = e.clientY
  if (!cursorReady) { pos.x = tgt.x; pos.y = tgt.y; cursor.style.opacity = '1'; cursorReady = true }
})
;(function loop() {
  pos.x += (tgt.x - pos.x) * 0.2
  pos.y += (tgt.y - pos.y) * 0.2
  cursor.style.translate = `${pos.x}px ${pos.y}px`
  requestAnimationFrame(loop)
})()
// 悬停交互元素时放大（事件委托，兼容动态生成的卡片）
const HOVER_SEL = 'a, button, .bcard, .subject-card, .wall-chip'
document.addEventListener('pointerover', (e) => {
  if (e.target.closest(HOVER_SEL)) cursor.classList.add('is-active')
})
document.addEventListener('pointerout', (e) => {
  if (e.target.closest(HOVER_SEL) && !e.relatedTarget?.closest(HOVER_SEL)) cursor.classList.remove('is-active')
})

if (IN_FRAME) {
  // 作为主页浮层打开：音乐由主页统一播放，返回按钮 = 关闭浮层
  document.addEventListener('click', (e) => {
    const back = e.target.closest('.back')
    if (back) {
      e.preventDefault()
      // 回传鼠标坐标，让主页光标精确归位，避免缓动滑动
      window.parent.postMessage({ type: 'close-overlay', x: e.clientX, y: e.clientY }, '*')
    }
  })
} else {
  // ── 独立访问子页面：自管 BGM 跨页续播 ───────────────────────────
  const bgm = new Audio('bgm.mp3')
  bgm.loop = true
  bgm.volume = 0.7
  const savedT = parseFloat(sessionStorage.getItem('bgmTime') || '0')
  if (savedT) bgm.addEventListener('loadedmetadata', () => { try { bgm.currentTime = savedT } catch {} })

  const btn = document.createElement('button')
  btn.id = 'bgm-toggle'
  btn.setAttribute('aria-label', '音乐开关')
  btn.innerHTML = '<span class="bgm-bars"><i></i><i></i><i></i><i></i></span><span class="bgm-label">音乐 关</span>'
  document.body.appendChild(btn)

  const ui = (on) => {
    btn.classList.toggle('playing', on)
    btn.querySelector('.bgm-label').textContent = on ? '音乐 开' : '音乐 关'
  }
  const on = () => bgm.play().then(() => { ui(true); sessionStorage.setItem('bgmOn', '1') }).catch(() => {})
  const off = () => { bgm.pause(); ui(false); sessionStorage.setItem('bgmOn', '0') }
  btn.addEventListener('click', () => (bgm.paused ? on() : off()))

  if (sessionStorage.getItem('bgmOn') === '1') {
    on()
    const kick = () => { if (bgm.paused) on() }
    ;['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((ev) =>
      window.addEventListener(ev, kick, { once: true, passive: true }))
  }
  setInterval(() => { if (!bgm.paused) sessionStorage.setItem('bgmTime', String(bgm.currentTime)) }, 1000)
  window.addEventListener('pagehide', () => sessionStorage.setItem('bgmTime', String(bgm.currentTime)))
}
