// 泰提斯数据洪流：Matrix 式字符雨，用 Solaris3 通用语字形 + 数字
// 跑在开场代码后面，配合径向遮罩让中间文字区淡出，不干扰内容阅读。
export class DataRain {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    // 字母经 Solaris3 渲染为外星字形；数字走回退字体，呼应「数据」感
    this.glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
    this.fontSize = 18
    this.stepMs = 55          // 字符下落节奏
    this._acc = 0
    this._last = performance.now()
    this.running = true
    this._onResize = () => this.resize()
    window.addEventListener('resize', this._onResize)
    this.resize()
    this._loop = this._loop.bind(this)
    // 等字体就绪再开跑，避免首帧用回退字形
    if (document.fonts && document.fonts.load) {
      document.fonts.load(`${this.fontSize}px Solaris3`).finally(() => this._raf = requestAnimationFrame(this._loop))
    } else {
      this._raf = requestAnimationFrame(this._loop)
    }
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.w = window.innerWidth
    this.h = window.innerHeight
    this.canvas.width = this.w * dpr
    this.canvas.height = this.h * dpr
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    this.cols = Math.ceil(this.w / this.fontSize)
    // 每列一个下落进度（行号），随机错开起点
    this.drops = Array.from({ length: this.cols }, () => Math.floor(Math.random() * -40))
    this.speed = Array.from({ length: this.cols }, () => 0.6 + Math.random() * 0.9)
  }

  _loop(now) {
    if (!this.running) return
    const dt = now - this._last
    this._last = now
    this._acc += dt
    if (this._acc >= this.stepMs) {
      this._acc = 0
      this._draw()
    }
    this._raf = requestAnimationFrame(this._loop)
  }

  _draw() {
    const ctx = this.ctx
    const fs = this.fontSize
    // 半透明暗色叠层形成拖尾
    ctx.fillStyle = 'rgba(4, 5, 12, 0.16)'
    ctx.fillRect(0, 0, this.w, this.h)
    ctx.font = `${fs}px Solaris3, monospace`
    ctx.textBaseline = 'top'

    for (let i = 0; i < this.cols; i++) {
      const x = i * fs
      const y = this.drops[i] * fs
      const ch = this.glyphs[(Math.random() * this.glyphs.length) | 0]
      if (y > 0) {
        // 领头字符更亮（青白），拖尾偏蓝紫
        ctx.fillStyle = 'rgba(190, 225, 255, 0.95)'
        ctx.fillText(ch, x, y)
        // 紧随其后再补一个偏暗的，加强流动感
        ctx.fillStyle = 'rgba(120, 150, 255, 0.35)'
        ctx.fillText(this.glyphs[(Math.random() * this.glyphs.length) | 0], x, y - fs)
      }
      this.drops[i] += this.speed[i]
      // 落到底后随机重置
      if (y > this.h && Math.random() > 0.965) {
        this.drops[i] = Math.floor(Math.random() * -20)
      }
    }
  }

  destroy() {
    this.running = false
    cancelAnimationFrame(this._raf)
    window.removeEventListener('resize', this._onResize)
  }
}
