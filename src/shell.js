// 通用外壳：自定义四芒星光标 + BGM 跨页续播。
// 主页(main.js)与独立子页(subshell.js)共用，避免两份逻辑各改各的悄悄分叉。

// 悬停放大的交互元素（主页与子页的并集，页面里不存在的选择器自然匹配不到）
const HOVER_SEL = 'a, button, .bcard, .subject-card, .wall-chip, .hero-module, .tl-item'

// 接管 #cursor 元素：lerp 跟随 + 悬停放大。初始隐藏，首次移动时在指针处现身，
// 避免开屏时一颗四芒星孤零零停在屏幕正中。
export function setupCursor(cursor) {
  const pos = { x: innerWidth / 2, y: innerHeight / 2 }
  const tgt = { ...pos }
  let ready = false
  cursor.style.opacity = '0'
  window.addEventListener('pointermove', (e) => {
    tgt.x = e.clientX
    tgt.y = e.clientY
    if (!ready) { pos.x = tgt.x; pos.y = tgt.y; cursor.style.opacity = '1'; ready = true }
  })
  ;(function loop() {
    pos.x += (tgt.x - pos.x) * 0.18
    pos.y += (tgt.y - pos.y) * 0.18
    cursor.style.translate = `${pos.x}px ${pos.y}px`
    requestAnimationFrame(loop)
  })()
  document.addEventListener('pointerover', (e) => { if (e.target.closest(HOVER_SEL)) cursor.classList.add('is-active') })
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(HOVER_SEL) && !e.relatedTarget?.closest(HOVER_SEL)) cursor.classList.remove('is-active')
  })
}

// 接管 #bgm-toggle 按钮：播放/暂停、跨页恢复进度、持续写回 sessionStorage。
// 返回 { soundOn, soundOff, resumeIfOn }；resumeIfOn 在上一页音乐开着时接续播放，
// 被浏览器自动播放策略拦下时，改在首次交互瞬间补播。
export function setupBGM(btn) {
  const bgm = new Audio('bgm.mp3')
  bgm.preload = 'metadata'
  bgm.loop = true
  bgm.volume = 0.7
  const savedT = parseFloat(sessionStorage.getItem('bgmTime') || '0')
  if (savedT) bgm.addEventListener('loadedmetadata', () => { try { bgm.currentTime = savedT } catch {} })

  const ui = (on) => {
    btn.classList.toggle('playing', on)
    btn.querySelector('.bgm-label').textContent = on ? '音乐 开' : '音乐 关'
  }
  const soundOn = () => bgm.play().then(() => { ui(true); sessionStorage.setItem('bgmOn', '1') }).catch(() => {})
  const soundOff = () => { bgm.pause(); ui(false); sessionStorage.setItem('bgmOn', '0') }
  btn.addEventListener('click', () => (bgm.paused ? soundOn() : soundOff()))

  setInterval(() => { if (!bgm.paused) sessionStorage.setItem('bgmTime', String(bgm.currentTime)) }, 1000)
  window.addEventListener('pagehide', () => sessionStorage.setItem('bgmTime', String(bgm.currentTime)))

  const resumeIfOn = () => {
    if (sessionStorage.getItem('bgmOn') !== '1') return
    soundOn()
    const kick = () => { if (bgm.paused) soundOn() }
    ;['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((ev) =>
      window.addEventListener(ev, kick, { once: true, passive: true }))
  }
  return { soundOn, soundOff, resumeIfOn }
}
