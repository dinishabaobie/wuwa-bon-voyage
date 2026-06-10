// WebAudio 合成的环境 BGM（无需音频文件）：低频双振荡器 pad + 章节切换星音。
export class AmbientAudio {
  constructor() {
    this.ctx = null
    this.playing = false
  }

  ensureCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0
      this.master.connect(this.ctx.destination)
    }
    if (this.ctx.state === 'suspended') this.ctx.resume()
  }

  start() {
    this.ensureCtx()
    if (this.playing) return
    this.playing = true
    const ctx = this.ctx

    this.padGain = ctx.createGain()
    this.padGain.gain.value = 0.05
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 320
    filter.Q.value = 2

    this.oscs = [
      { f: 65.4, type: 'triangle', detune: 0 },   // C2
      { f: 98.0, type: 'sine', detune: 4 },        // G2
      { f: 130.8, type: 'sine', detune: -6 },      // C3
    ].map(({ f, type, detune }) => {
      const o = ctx.createOscillator()
      o.type = type
      o.frequency.value = f
      o.detune.value = detune
      o.connect(filter)
      o.start()
      return o
    })

    // 缓慢扫动滤波器，让 pad 有呼吸感
    this.lfo = ctx.createOscillator()
    this.lfo.frequency.value = 0.06
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 140
    this.lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    this.lfo.start()

    filter.connect(this.padGain)
    this.padGain.connect(this.master)
    this.master.gain.cancelScheduledValues(ctx.currentTime)
    this.master.gain.linearRampToValueAtTime(1, ctx.currentTime + 2.5)
  }

  stop() {
    if (!this.playing) return
    this.playing = false
    const ctx = this.ctx
    this.master.gain.cancelScheduledValues(ctx.currentTime)
    this.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1)
    const oscs = this.oscs
    const lfo = this.lfo
    setTimeout(() => { oscs.forEach((o) => o.stop()); lfo.stop() }, 1200)
  }

  // 章节切换时的星形音效：一记带泛音的轻柔钟音
  chime(base = 880) {
    if (!this.playing) return
    const ctx = this.ctx
    const t = ctx.currentTime
    ;[1, 2.01, 2.99].forEach((ratio, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = base * ratio
      g.gain.setValueAtTime(0.06 / (i + 1), t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6)
      o.connect(g)
      g.connect(this.master)
      o.start(t)
      o.stop(t + 1.7)
    })
  }
}
