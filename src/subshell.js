// 独立访问子页面(.html)时的外壳：自定义四芒星光标 + BGM 跨页续播。
// SPA 内打开视图时不走这里（光标/音乐由主页统一管理）。

// ── 自定义四芒星光标 ──────────────────────────────────────────────
const cursor = document.createElement('div')
cursor.id = 'cursor'
cursor.setAttribute('aria-hidden', 'true')
document.body.appendChild(cursor)

const pos = { x: innerWidth / 2, y: innerHeight / 2 }
const tgt = { ...pos }
let cursorReady = false
cursor.style.opacity = '0'
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
const HOVER_SEL = 'a, button, .bcard, .subject-card, .wall-chip'
document.addEventListener('pointerover', (e) => { if (e.target.closest(HOVER_SEL)) cursor.classList.add('is-active') })
document.addEventListener('pointerout', (e) => {
  if (e.target.closest(HOVER_SEL) && !e.relatedTarget?.closest(HOVER_SEL)) cursor.classList.remove('is-active')
})

// ── BGM 跨页续播 ─────────────────────────────────────────────────
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
