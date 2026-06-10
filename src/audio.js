// 切章星音（WebAudio 合成）。BGM 改用真实音频文件，在 main.js 里以 <audio> 播放。
export class ChimePlayer {
  constructor() {
    this.ctx = null
    this.on = false
  }

  ensureCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)()
      this.master = this.ctx.createGain()
      this.master.gain.value = 1
      this.master.connect(this.ctx.destination)
    }
    if (this.ctx.state === 'suspended') this.ctx.resume()
  }

  setOn(v) {
    this.on = v
    if (v) this.ensureCtx()
  }

  // 章节切换时的星形音效：一记带泛音的轻柔钟音
  chime(base = 880) {
    if (!this.on) return
    const ctx = this.ctx
    const t = ctx.currentTime
    ;[1, 2.01, 2.99].forEach((ratio, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = base * ratio
      g.gain.setValueAtTime(0.05 / (i + 1), t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6)
      o.connect(g)
      g.connect(this.master)
      o.start(t)
      o.stop(t + 1.7)
    })
  }
}
