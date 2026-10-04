// ── S-003 莫宁 · 专武「宙算仪轨」开场动画 ──
// 复刻游戏里的武器展示：星云流星 → 彗星冲向镜头 → 带着碎光飞远 → 黑场 →
// 地平线上亮起一颗星 → 地球日出：光沿大气层铺开、照亮地表，宙算仪的刻度环与指针浮现。
// 为了流畅与圆润：彗星光体、地表、刻度环、星云都预先画进离屏画布（一次性、可空闲时预热），
// 每帧只做十几次贴图和几条矢量弧线；主画布按像素预算限制分辨率。
// 播到尾声时回调 onReveal 打开档案，再把遮罩淡出；点击 / Esc / 回车 / 空格可跳过；
// 开启「减少动态效果」的用户直接进入档案。没有音效。

const SW = 1920, SH = 1080                     // 舞台坐标：按 16:9 设计，运行时映射到视口
const T_REVEAL = 4.3                           // 打开档案的时刻（秒）
const LEAVE_MS = 650                           // 遮罩淡出时长
const CORE = { x: 1300, y: 332 }               // 地平线上的日出点
const ARC = { cx: 1200, cy: 2930, r: 2600 }    // 地球（大圆），弧顶在 (1200, 330)
const PIXEL_BUDGET = 3.0e6                     // 主画布最多约 300 万像素，高分屏上也不掉帧
const TAU = Math.PI * 2
const DEG = Math.PI / 180

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const seg = (t, a, b) => clamp((t - a) / (b - a))
const lerp = (a, b, k) => a + (b - a) * k
const smooth = (k) => k * k * (3 - 2 * k)
const easeOut = (k) => 1 - Math.pow(1 - k, 3)
const easeInOut = (k) => (k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2)
const arcY = (x) => ARC.cy - Math.sqrt(ARC.r * ARC.r - (x - ARC.cx) * (x - ARC.cx))

function rng(seed) {
  return () => {
    seed = (seed + 0x6D2B79F5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// 关键帧轨道：Catmull-Rom 插值，让位置 / 尺寸连续平滑；超出首尾时间返回 null
function makeTrack(keys) {
  const cr = (p0, p1, p2, p3, u) => {
    const u2 = u * u, u3 = u2 * u
    return .5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3)
  }
  return (t) => {
    if (t < keys[0][0] || t > keys[keys.length - 1][0]) return null
    let i = 1
    while (i < keys.length - 1 && t > keys[i][0]) i++
    const [t1, v1] = keys[i - 1], [t2, v2] = keys[i]
    const v0 = (keys[i - 2] || keys[i - 1])[1], v3 = (keys[i + 1] || keys[i])[1]
    const u = (t - t1) / (t2 - t1)
    const out = {}
    for (const k in v1) out[k] = cr(v0[k], v1[k], v2[k], v3[k], u)
    out.B = clamp(out.B)
    return out
  }
}

// 主彗星：先从左下冲向镜头（又大又过曝），再被镜头跟住、带着碎光飞向右上远处
const comet = makeTrack([
  [.72, { x: -120, y: 1220, a: -40, L: 700, T: 300, B: 0, c: .05 }],
  [.84, { x: 380, y: 880, a: -38, L: 1000, T: 290, B: 1, c: .05 }],
  [.95, { x: 820, y: 600, a: -34, L: 1100, T: 240, B: 1, c: .06 }],
  [1.05, { x: 900, y: 505, a: -30, L: 1050, T: 190, B: 1, c: .06 }],
  [1.15, { x: 990, y: 440, a: -27, L: 950, T: 140, B: 1, c: .07 }],
  [1.25, { x: 1060, y: 400, a: -25, L: 880, T: 96, B: 1, c: .08 }],
  [1.4, { x: 1100, y: 378, a: -24, L: 840, T: 60, B: 1, c: .08 }],
  [1.7, { x: 1085, y: 390, a: -23, L: 1000, T: 34, B: 1, c: .1 }],
  [2.05, { x: 1075, y: 392, a: -22, L: 1150, T: 26, B: .95, c: .11 }],
  [2.25, { x: 1140, y: 365, a: -21, L: 900, T: 19, B: .7, c: .11 }],
  [2.44, { x: 1330, y: 328, a: -20, L: 400, T: 10, B: 0, c: .1 }],
])
// 第二道光：贴着镜头右下方一扫而过
const sweep = makeTrack([
  [1.26, { x: 1250, y: 1220, a: -16, L: 1300, T: 190, B: 0, c: .03 }],
  [1.4, { x: 1560, y: 880, a: -14, L: 1300, T: 170, B: .6, c: .03 }],
  [1.55, { x: 1900, y: 760, a: -12, L: 1200, T: 140, B: .5, c: .03 }],
  [1.74, { x: 2380, y: 690, a: -10, L: 1100, T: 110, B: 0, c: .03 }],
])

// 开场的细流星（左下 → 右上），其中一道弯着上扬
const METEORS = [
  { t0: .1, dur: .7, a: [1250, 160], b: [1760, -20], w: 1.2, trail: .32 },
  { t0: .16, dur: .62, a: [120, 760], b: [1320, 330], w: 2.6, trail: .38 },
  { t0: .22, dur: .58, a: [520, 610], b: [1560, 240], w: 2, trail: .34 },
  { t0: .3, dur: .55, a: [-60, 900], b: [1000, 520], w: 2.2, trail: .4 },
  { t0: .38, dur: .5, a: [900, 560], b: [1700, 270], w: 1.6, trail: .3 },
  { t0: .44, dur: .52, a: [260, 1180], c: [420, 720], b: [980, 470], w: 3.2, trail: .5 },
  { t0: .52, dur: .45, a: [1150, 700], b: [1760, 480], w: 1.3, trail: .3 },
]

// ────────────────────────── 预渲染素材（与屏幕尺寸无关，只做一次） ──────────────────────────

const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
const supportsFilter = (() => {
  try { return typeof mk(1, 1).getContext('2d').filter === 'string' } catch { return false }
})()

// 模糊一张画布：支持 ctx.filter 就用高斯模糊；否则缩小再放大，近似柔化（Safari 走这条）
function blurred(src, px) {
  const out = mk(src.width, src.height)
  const g = out.getContext('2d')
  if (supportsFilter) {
    g.filter = `blur(${px}px)`
    g.drawImage(src, 0, 0)
    g.filter = 'none'
    return out
  }
  const k = Math.max(2, px / 1.4)
  const tmp = mk(Math.max(1, Math.round(src.width / k)), Math.max(1, Math.round(src.height / k)))
  const tg = tmp.getContext('2d')
  tg.imageSmoothingQuality = 'high'
  tg.drawImage(src, 0, 0, tmp.width, tmp.height)
  g.imageSmoothingQuality = 'high'
  g.drawImage(tmp, 0, 0, out.width, out.height)
  return out
}

function radial(size, stops) {
  const c = mk(size, size)
  const g = c.getContext('2d')
  const r = size / 2
  const grd = g.createRadialGradient(r, r, 0, r, r, r)
  stops.forEach(([o, col]) => grd.addColorStop(o, col))
  g.fillStyle = grd
  g.fillRect(0, 0, size, size)
  return c
}

// 值噪声 + fbm，用于星云与地表
function makeNoise(seed) {
  const R = rng(seed)
  const grid = new Float32Array(64 * 64).map(() => R())
  const at = (i, j) => grid[((j & 63) << 6) + (i & 63)]
  const vn = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi
    const u = smooth(xf), v = smooth(yf)
    return lerp(lerp(at(xi, yi), at(xi + 1, yi), u), lerp(at(xi, yi + 1), at(xi + 1, yi + 1), u), v)
  }
  // gain ≠ .5 时按振幅总和归一化，保证结果仍落在 0–1 附近
  return (x, y, oct = 5, gain = .5) => {
    let a = .5, f = 1, s = 0, tot = 0
    for (let o = 0; o < oct; o++) { s += a * vn(x * f, y * f); tot += a; f *= 2.03; a *= gain }
    return gain === .5 ? s : s / tot
  }
}

// 星云：斜贯画面的一条银河带，低分辨率生成，放大后自然柔化
function* makeNebula() {
  const w = 320, h = 180
  const c = mk(w, h)
  const g = c.getContext('2d')
  const img = g.createImageData(w, h)
  const fbm = makeNoise(3003)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const nx = x / w, ny = y / h
      const d = ny - (.8 - .64 * nx)
      const band = Math.exp(-(d * d) / .05)
      const n = fbm(nx * 6 + 3, ny * 3.4)
      const wisp = Math.pow(clamp((fbm(nx * 11 + 7, ny * 6 + 3) - .47) * 2.4), 2) * band
      const v = clamp(band * Math.pow(n, 2.1) * 1.7 + .12 * Math.pow(n, 3))
      const i = (y * w + x) * 4
      img.data[i] = 9 + 34 * v + 46 * wisp
      img.data[i + 1] = 9 + 34 * v + 54 * wisp
      img.data[i + 2] = 26 + 92 * v + 96 * wisp
      img.data[i + 3] = 255
    }
    if (y % 45 === 44) yield                     // 分批生成，预热时不长时间占住主线程
  }
  g.putImageData(img, 0, 0)
  return c
}

// 彗星光体贴图：尖头朝右，向左渐宽再渐隐。body 为清晰的光体，glow 为大范围柔光
const CS = { W: 1300, H: 420, TIP: 1230, CY: 210, LEN: 1140, T0: 150 }
function makeCometSprites() {
  const shape = (g, mult, sc = 1) => {
    const top = [], bot = []
    for (let i = 0; i <= 140; i++) {
      const u = i / 140, d = u * CS.LEN
      const x = (CS.TIP - d) * sc, y = CS.CY * sc
      const hw = CS.T0 * .5 * mult * Math.pow(Math.min(1, d / (CS.T0 * 1.7 + 30)), .72) * (1 - .45 * u) * sc
      top.push([x, y - hw]); bot.push([x, y + hw])
    }
    g.beginPath()
    g.moveTo(CS.TIP * sc, CS.CY * sc)
    top.forEach((p) => g.lineTo(p[0], p[1]))
    for (let i = bot.length - 1; i >= 0; i--) g.lineTo(bot[i][0], bot[i][1])
    g.closePath()
  }
  const grad = (g, sc, stops) => {
    const grd = g.createLinearGradient(CS.TIP * sc, 0, (CS.TIP - CS.LEN) * sc, 0)
    stops.forEach(([o, col]) => grd.addColorStop(o, col))
    return grd
  }
  const BODY_STOPS = [[0, 'rgba(255,255,255,1)'], [.12, 'rgba(238,241,255,.96)'], [.4, 'rgba(162,174,255,.6)'], [.74, 'rgba(112,98,240,.16)'], [1, 'rgba(80,60,200,0)']]

  const base = mk(CS.W, CS.H)
  const g = base.getContext('2d')
  g.globalCompositeOperation = 'lighter'
  g.fillStyle = grad(g, 1, BODY_STOPS)
  for (let k = 0; k < 16; k++) {           // 横截面由外向内叠亮：边缘柔、中心过曝
    g.globalAlpha = .075
    shape(g, 1.25 - k * .07)
    g.fill()
  }
  g.fillStyle = grad(g, 1, [[0, 'rgba(255,255,255,1)'], [.45, 'rgba(255,255,255,0)']])
  g.globalAlpha = .55
  shape(g, .26)
  g.fill()
  const body = blurred(base, 3)

  const gs = .5                               // 柔光用半分辨率，放大后更虚
  const gb = mk(CS.W * gs, CS.H * gs)
  const gg = gb.getContext('2d')
  gg.fillStyle = grad(gg, gs, [[0, 'rgba(235,238,255,1)'], [.3, 'rgba(150,150,255,.55)'], [1, 'rgba(90,70,220,0)']])
  gg.globalAlpha = .9
  shape(gg, 1.9, gs)
  gg.fill()
  const glow = blurred(gb, 16)
  return { body, glow }
}

// 地表贴图（参照轨道上拍的地球日出）：深蓝海面、棕色陆地、扭卷的白色云系，
// 以日出点为中心烘焙光照——日出下方有一道暖色的海面反光，地平线附近一层蓝色大气散射；
// 纵向按球面透视压扁，越靠近地平线纹理越扁。分批生成，预热时不占住主线程
// 夜面几乎全黑，只需覆盖日出点附近的一块；四周渐隐到 0，叠加（lighter）到暗色圆盘上不留接缝
const EB = { x0: 380, y0: 300, w: 1640, h: 400, k: 2 }
function* makeEarth() {
  const w = Math.round(EB.w / EB.k), h = Math.round(EB.h / EB.k)
  const c = mk(w, h)
  const g = c.getContext('2d')
  const img = g.createImageData(w, h)
  const fbm = makeNoise(7003)
  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      const x = EB.x0 + (px + .5) * EB.k, y = EB.y0 + (py + .5) * EB.k
      const d = y - arcY(x)
      const i = (py * w + px) * 4
      if (d < -4) { img.data[i + 3] = 0; continue }
      const dd = Math.max(0, d)
      const v = Math.sqrt(dd / 900) * 3.4                 // 球面透视
      const u = x / SW * 9
      // 陆地与云：先做一次扭曲（domain warp），云系才有卷曲的气旋感
      const q = fbm(u * .9 + 4, v * 1.6 + 8, 3)
      const land = fbm(u * 1.1 + 20 + q * .8, v * 1.5 + 5, 6, .58)
      // 云：大尺度气旋决定分布，高频细节决定纹理（沿地平线方向拉长成丝缕）
      const big = fbm(u * 2.2 + 3 + q * 1.6, v * 7 + 11 + q * 2, 6, .6)
      const fine = fbm(u * 16 + 9 + q, v * 44 + 2, 4, .6)
      const c1 = clamp((big - .5) * 3.2) * (.35 + .65 * clamp((fine - .38) * 2.4))
      const c2 = clamp((fine - .6) * 3) * clamp((big - .4) * 4) * .5
      const cloud = clamp(c1 + c2)
      const isLand = clamp((land + (fine - .5) * .06 - .54) * 9)
      const tex = fbm(u * 24 + 40, v * 50 + 17, 3)
      // 海 → 陆 → 云
      let r = lerp(5, 34 + 44 * tex, isLand), gg = lerp(16, 30 + 28 * tex, isLand), b = lerp(44, 24 + 14 * tex, isLand)
      r = lerp(r, 226, cloud); gg = lerp(gg, 230, cloud); b = lerp(b, 240, cloud)
      // 光照：只有贴着地平线的一窄条被照亮（日出点附近最宽最亮），往下很快沉入夜面
      const sx = (x - CORE.x) / 250
      const light = Math.exp(-sx * sx - dd / 55) * 1.6
        + Math.exp(-dd / 24) * .3 * Math.exp(-sx * sx / 2)
        + Math.exp(-dd / 300) * .012 + .006
      // 暖色：离太阳越近越偏橙
      const warm = Math.exp(-sx * sx * 1.5 - dd / 60)
      r *= light * (1 + .6 * warm); gg *= light * (1 + .15 * warm); b *= light * (1 - .4 * warm)
      // 日出正下方的海面反光（向下拉长的一道暖光）
      const glint = Math.exp(-(((x - CORE.x) / 70) ** 2)) * Math.exp(-dd / 80) * (1 - isLand * .6) * (1 - cloud * .5)
      // 贴近地平线的蓝色大气散射
      const scat = Math.exp(-dd / 18) * (.04 + .96 * Math.exp(-(((x - CORE.x) / 380) ** 2)))
      const wf = clamp((x - EB.x0) / 160) * clamp((EB.x0 + EB.w - x) / 160) * clamp((EB.y0 + EB.h - y) / 120)
      img.data[i] = clamp((r + 60 * scat + 200 * glint) * wf, 0, 255)
      img.data[i + 1] = clamp((gg + 140 * scat + 150 * glint) * wf, 0, 255)
      img.data[i + 2] = clamp((b + 255 * scat + 105 * glint) * wf, 0, 255)
      img.data[i + 3] = d < 0 ? 255 * (1 + d / 4) : 255
    }
    if (py % 10 === 9) yield
  }
  g.putImageData(img, 0, 0)
  return c
}

// 太阳的放射光芒：细长的楔形光束，略微模糊
function makeRays() {
  const size = 768, c = mk(size, size), g = c.getContext('2d'), R = rng(9003)
  g.translate(size / 2, size / 2)
  g.globalCompositeOperation = 'lighter'
  for (let n = 0; n < 46; n++) {
    const a = R() * TAU, len = size * (.14 + R() * .36), w = 1 + R() * 3.2
    const grd = g.createLinearGradient(0, 0, Math.cos(a) * len, Math.sin(a) * len)
    grd.addColorStop(0, `rgba(255,232,196,${(.3 + R() * .4).toFixed(2)})`)
    grd.addColorStop(.5, 'rgba(255,170,96,.18)')
    grd.addColorStop(1, 'rgba(240,130,70,0)')
    g.fillStyle = grd
    g.beginPath()
    g.moveTo(Math.cos(a + Math.PI / 2) * w, Math.sin(a + Math.PI / 2) * w)
    g.lineTo(Math.cos(a) * len, Math.sin(a) * len)
    g.lineTo(Math.cos(a - Math.PI / 2) * w, Math.sin(a - Math.PI / 2) * w)
    g.closePath()
    g.fill()
  }
  return blurred(c, 2.2)
}

// 宙算仪刻度环：外环（上半清楚、下半隐入地球）、刻度、半环与辐条
const RING = { size: 440, r: 180 }
function makeRing() {
  const s = 2                                  // 贴图按 2 倍精度画，缩放后依然锐利
  const c = mk(RING.size * s, RING.size * s)
  const g = c.getContext('2d')
  g.scale(s, s)
  const cx = RING.size / 2, cy = RING.size / 2
  g.strokeStyle = 'rgb(196,204,255)'
  g.lineCap = 'round'
  g.lineWidth = 1.4
  g.globalAlpha = .75
  g.beginPath(); g.arc(cx, cy, RING.r, Math.PI, TAU); g.stroke()
  g.globalAlpha = .28
  g.beginPath(); g.arc(cx, cy, RING.r, 0, Math.PI); g.stroke()
  g.globalAlpha = .55
  g.beginPath(); g.arc(cx, cy, RING.r - 38, -152 * DEG, -28 * DEG); g.stroke()
  for (let i = 0; i < 72; i++) {
    const a = i * 5 * DEG, major = i % 6 === 0
    const r0 = major ? RING.r - 17 : RING.r - 8
    g.globalAlpha = (Math.sin(a) > 0 ? .25 : .8)
    g.lineWidth = major ? 1.5 : .9
    g.beginPath()
    g.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0)
    g.lineTo(cx + Math.cos(a) * RING.r, cy + Math.sin(a) * RING.r)
    g.stroke()
  }
  g.globalAlpha = .6
  g.lineWidth = 1
  for (const d of [-124, -108, -66, -50]) {
    const a = d * DEG
    g.beginPath()
    g.moveTo(cx + Math.cos(a) * 34, cy + Math.sin(a) * 34)
    g.lineTo(cx + Math.cos(a) * (RING.r - 38), cy + Math.sin(a) * (RING.r - 38))
    g.stroke()
  }
  return c
}

// 大气辉光贴图：沿地平线的一圈蓝色散射光，预先高斯模糊，边缘完全柔和、没有分层。
// 做窄 / 宽两张（以日出点为中心的亮段宽度不同），播放时交叉淡变，表现光沿地平线铺开
const HB = { x0: -100, y0: 120, w: 2120, h: 760, k: 4 }
function makeHalo(spread) {
  const c = mk(Math.round(HB.w / HB.k), Math.round(HB.h / HB.k))
  const g = c.getContext('2d')
  g.setTransform(1 / HB.k, 0, 0, 1 / HB.k, -HB.x0 / HB.k, -HB.y0 / HB.k)
  const layer = (peak, base, rgb, width, dr) => {
    const grd = g.createLinearGradient(HB.x0, 0, HB.x0 + HB.w, 0)
    for (let i = 0; i <= 24; i++) {
      const x = HB.x0 + HB.w * i / 24
      const a = base + peak * Math.exp(-(((x - CORE.x) / spread) ** 2))
      grd.addColorStop(i / 24, `rgba(${rgb},${clamp(a).toFixed(3)})`)
    }
    g.strokeStyle = grd
    g.lineWidth = width
    g.beginPath()
    g.arc(ARC.cx, ARC.cy, ARC.r - dr, -2.25, -1.1)
    g.stroke()
  }
  layer(.32, .05, '56,120,255', 130, -64)     // 外层淡散射
  layer(.7, .12, '80,160,255', 30, -12)        // 贴边的亮蓝色大气
  layer(.45, .02, '96,168,255', 44, 18)        // 地表一侧的蓝色薄雾（只在日出附近）
  return blurred(c, 7)
}

// 宙算仪轨的机械结构：贴着地平线弧的一条亮刃 + 交织的细轨（在日出点附近织成一串「眼」形）
// + 下方一道副轨 + 日出点右侧的椭圆环。整条预先画进离屏画布，播放时按铺开的进度逐步显露
const MB = { x0: -60, y0: 270, w: 2040, h: 470 }
function* makeMech() {
  const line = mk(MB.w, MB.h)
  const g = line.getContext('2d')
  g.translate(-MB.x0, -MB.y0)
  g.lineCap = 'round'
  g.lineJoin = 'round'
  const env = (x, s) => Math.exp(-(((x - CORE.x) / s) ** 2))
  // 亮度沿弧线：日出点附近最亮，两端留一条淡淡的轨迹
  const grad = (rgb, s, base, peak) => {
    const gr = g.createLinearGradient(MB.x0, 0, MB.x0 + MB.w, 0)
    for (let i = 0; i <= 24; i++) {
      const x = MB.x0 + MB.w * i / 24
      gr.addColorStop(i / 24, `rgba(${rgb},${clamp(base + peak * env(x, s)).toFixed(3)})`)
    }
    return gr
  }
  const N = 900, A0 = -2.25, A1 = -1.1
  const pt = (a, dr) => [ARC.cx + (ARC.r - dr) * Math.cos(a), ARC.cy + (ARC.r - dr) * Math.sin(a)]
  const path = (drOf) => {
    g.beginPath()
    for (let i = 0; i <= N; i++) {
      const a = A0 + (A1 - A0) * i / N
      const [x0] = pt(a, 0)
      const [x, y] = pt(a, drOf(x0))
      i ? g.lineTo(x, y) : g.moveTo(x, y)
    }
  }
  // 1. 亮刃：外缘贴着弧线，越靠近日出点越厚
  g.beginPath()
  for (let i = 0; i <= N; i++) {
    const a = A0 + (A1 - A0) * i / N
    const [x, y] = pt(a, -1)
    i ? g.lineTo(x, y) : g.moveTo(x, y)
  }
  for (let i = N; i >= 0; i--) {
    const a = A0 + (A1 - A0) * i / N
    const [x0] = pt(a, 0)
    const [x, y] = pt(a, 2.5 + 20 * env(x0, 420))
    g.lineTo(x, y)
  }
  g.closePath()
  g.fillStyle = grad('238,236,255', 700, .3, .7)
  g.fill()
  yield
  // 2. 两条交织的细轨：以正弦相位相反，交叉处形成一串「眼」
  const wave = (x) => Math.sin((x - CORE.x) / 150 + .7) * 22 * Math.pow(env(x, 620), .8)
  g.lineWidth = 2.6
  g.strokeStyle = grad('214,210,255', 680, .14, .86)
  path((x) => 26 + 10 * env(x, 420) + wave(x)); g.stroke()
  path((x) => 26 + 10 * env(x, 420) - wave(x)); g.stroke()
  // 3. 下方的副轨
  g.lineWidth = 1.6
  g.strokeStyle = grad('170,176,255', 760, .06, .55)
  path((x) => 62 + 16 * env(x, 440) + 10 * Math.sin((x - CORE.x) / 260) * env(x, 560)); g.stroke()
  // 4. 刻度片：亮刃内侧的一排短横线
  g.lineWidth = 1.3
  for (let x = CORE.x - 760; x <= CORE.x + 760; x += 28) {
    const e = env(x, 480)
    if (e < .06) continue
    const a = Math.atan2(arcY(x) - ARC.cy, x - ARC.cx)
    const [ax, ay] = pt(a, 3 + 20 * env(x, 420))
    const [bx, by] = pt(a, 8 + 20 * env(x, 420) + 10 * e)
    g.strokeStyle = `rgba(214,212,255,${(.55 * e).toFixed(3)})`
    g.beginPath(); g.moveTo(ax, ay); g.lineTo(bx, by); g.stroke()
  }
  // 5. 日出点右侧的椭圆环（顺着弧线的切线方向）
  for (const [dx, dr, rx, ry, al, lw] of [[210, 30, 110, 24, .9, 2.4], [210, 30, 58, 11, .65, 1.6], [-250, 34, 70, 15, .55, 1.6]]) {
    const x = CORE.x + dx
    const a = Math.atan2(arcY(x) - ARC.cy, x - ARC.cx)
    const [ex, ey] = pt(a, dr)
    g.strokeStyle = `rgba(236,234,255,${al})`
    g.lineWidth = lw
    g.beginPath(); g.ellipse(ex, ey, rx, ry, a + Math.PI / 2, 0, TAU); g.stroke()
  }
  yield
  // 柔光层：半分辨率模糊后垫在线条下面，合成为一张图（播放时只贴一次）
  const half = mk(MB.w / 2, MB.h / 2)
  half.getContext('2d').drawImage(line, 0, 0, half.width, half.height)
  const glow = blurred(half, 5)
  const out = mk(MB.w, MB.h)
  const og = out.getContext('2d')
  og.globalCompositeOperation = 'lighter'
  og.globalAlpha = .8
  og.drawImage(glow, 0, 0, MB.w, MB.h)
  og.globalAlpha = 1
  og.drawImage(line, 0, 0)
  return out
}

// 素材按需生成、生成后缓存。预热时每个空闲时段只做一项，避免一次占住主线程太久
const R0 = rng(5003)
const BUILDERS = {
  GLOW: () => radial(256, [[0, 'rgba(255,255,255,1)'], [.16, 'rgba(238,240,255,.85)'], [.42, 'rgba(165,168,255,.3)'], [1, 'rgba(90,70,220,0)']]),
  HALO: () => radial(256, [[0, 'rgba(190,172,255,.5)'], [.4, 'rgba(128,108,255,.18)'], [1, 'rgba(60,40,180,0)']]),
  WARM: () => radial(512, [[0, 'rgba(255,248,236,1)'], [.1, 'rgba(255,214,160,.85)'], [.26, 'rgba(255,164,84,.42)'], [.55, 'rgba(236,112,48,.14)'], [1, 'rgba(200,80,40,0)']]),
  RAYS: makeRays,
  STARS: () => Array.from({ length: 170 }, () => ({ x: R0(), y: R0(), s: .6 + R0() * 1.5, a: .2 + R0() * .55, tw: 2 + R0() * 5 })),
  // 地平线上方的星空（只保留落在天空里的星）
  SKY: () => Array.from({ length: 700 }, () => ({ x: R0() * SW, y: -260 + R0() * 900, s: .6 + R0() * 1.4, a: .3 + R0() * .7 })).filter((st) => st.y < arcY(st.x) - 10),
  SPARKS: () => Array.from({ length: 115 }, () => ({
    t0: 1.1 + R0() * 1.28, life: .35 + R0() * .5, u: .05 + R0() * .6, off: R0() * 1.35 - .35, a: .45 + R0() * .55,
    sp: 260 + R0() * 620, drift: -R0() * 45, len: 10 + R0() * 26, w: 1 + R0() * 1.5,
  })),
  RING: makeRing,
  NEBULA: makeNebula,
  COMET: makeCometSprites,
  HALO_N: () => makeHalo(520),
  HALO_W: () => makeHalo(1000),
  EARTH: makeEarth,
  MECH: makeMech,
}
const ASSETS = {}
const JOBS = {}
// 推进一项素材的生成：普通函数一次完成；生成器函数每次推进一批。完成时返回 true
function stepAsset(k) {
  if (!JOBS[k]) {
    const r = BUILDERS[k]()
    if (!r || typeof r.next !== 'function') { ASSETS[k] = r; return true }
    JOBS[k] = r
  }
  const { value, done } = JOBS[k].next()
  if (!done) return false
  ASSETS[k] = value
  delete JOBS[k]
  return true
}
function assets() {
  for (const k in BUILDERS) while (!(k in ASSETS)) stepAsset(k)
  return ASSETS
}

// 空闲时预热：把一次性的离屏绘制分几次提前做掉，点开档案时不卡顿；返回取消函数
export function warmMornyeIntro() {
  const idle = window.requestIdleCallback || ((fn) => setTimeout(() => fn({ timeRemaining: () => 8 }), 60))
  const cancel = window.cancelIdleCallback || clearTimeout
  let id = 0
  const step = () => {
    const k = Object.keys(BUILDERS).find((key) => !(key in ASSETS))
    if (!k) return
    try { stepAsset(k) } catch { return /* 预热失败不影响正常播放 */ }
    id = idle(step, { timeout: 2000 })
  }
  id = idle(step, { timeout: 2000 })
  return () => cancel(id)
}

// ────────────────────────── 画面 ──────────────────────────

// 返回 { resize, draw, toScreen }。独立出来便于逐帧检查
export function createScene(canvas) {
  const A = assets()
  const ctx = canvas.getContext('2d', { alpha: false })
  let vw = 1, vh = 1, rs = 1, S = 1, OX = 0, OY = 0

  function resize(w, h) {
    vw = w; vh = h
    rs = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(PIXEL_BUDGET / Math.max(1, vw * vh)))
    canvas.width = Math.round(vw * rs)
    canvas.height = Math.round(vh * rs)
    if (vw / vh >= 1.2) {
      // 横屏：铺满（cover）
      S = Math.max(vw / SW, vh / SH)
      OX = (vw - SW * S) / 2
      OY = (vh - SH * S) / 2
    } else {
      // 竖屏：以日出点为中心取景，保证地平线和宙算仪完整
      S = Math.max(vw / 1150, (vh * .5) / SH)
      OX = vw / 2 - CORE.x * S
      OY = vh * .42 - CORE.y * S
    }
  }
  const toScreen = (x, y) => ({ x: OX + x * S, y: OY + y * S })
  const stage = () => ctx.setTransform(rs * S, 0, 0, rs * S, rs * OX, rs * OY)
  const screen = () => ctx.setTransform(rs, 0, 0, rs, 0, 0)

  function glowAt(img, x, y, size, alpha) {
    if (alpha <= .002 || size <= 0) return
    ctx.globalAlpha = Math.min(1, alpha)
    ctx.drawImage(img, x - size / 2, y - size / 2, size, size)
  }

  // 渐隐的光迹：pts 从尾到头，一笔画完（尾部透明、头部最亮），三层由粗到细叠出柔光与收尖
  function trail(pts, w, rgb, alpha) {
    const a = pts[0], b = pts[pts.length - 1]
    const g = ctx.createLinearGradient(a[0], a[1], b[0], b[1])
    g.addColorStop(0, `rgba(${rgb},0)`)
    g.addColorStop(.7, `rgba(${rgb},.45)`)
    g.addColorStop(1, `rgba(${rgb},1)`)
    ctx.strokeStyle = g
    const line = () => { ctx.beginPath(); ctx.moveTo(a[0], a[1]); for (const p of pts) ctx.lineTo(p[0], p[1]); ctx.stroke() }
    ctx.globalAlpha = alpha * .3
    ctx.lineWidth = w * 3.2
    line()
    ctx.globalAlpha = alpha * .6
    ctx.lineWidth = w
    line()
    ctx.globalAlpha = alpha
    ctx.lineWidth = w * .45
    line()
  }

  // 细彗星：随帧计算的光体（带一点弧度），几层由宽到窄叠出柔边
  function cometPath(s, mult) {
    const ang = s.a * DEG, dx = Math.cos(ang), dy = Math.sin(ang), px = -dy, py = dx
    const top = [], bot = []
    for (let k = 0; k <= 48; k++) {
      const u = k / 48, d = u * s.L, bend = s.c * u * u * s.L
      const bx = s.x - dx * d + px * bend, by = s.y - dy * d + py * bend
      const w = s.T * .5 * mult * Math.pow(Math.min(1, d / (s.T * 1.7 + 30)), .72) * (1 - .45 * u)
      top.push([bx + px * w, by + py * w]); bot.push([bx - px * w, by - py * w])
    }
    ctx.beginPath()
    ctx.moveTo(s.x, s.y)
    top.forEach((p) => ctx.lineTo(p[0], p[1]))
    for (let k = bot.length - 1; k >= 0; k--) ctx.lineTo(bot[k][0], bot[k][1])
    ctx.closePath()
  }

  function drawComet(s, soft = false) {
    if (!s || s.B <= .003) return
    const ang = s.a * DEG, dx = Math.cos(ang), dy = Math.sin(ang)
    // 粗大时用预渲染贴图（非常柔），变细后切到随帧计算的弯曲光体，中间交叉淡变
    const wS = soft ? 1 : smooth(seg(s.T, 45, 85))
    if (wS > 0) {
      const sx = s.L / CS.LEN, sy = s.T / CS.T0
      ctx.save()
      ctx.translate(s.x, s.y)
      ctx.rotate(ang)
      ctx.globalAlpha = s.B * wS * (soft ? .55 : .8)
      ctx.drawImage(A.COMET.glow, -CS.TIP * sx, -CS.CY * sy, CS.W * sx, CS.H * sy)
      const by = soft ? sy : sy * 1.2                  // 近镜时光体更饱满、过曝
      ctx.globalAlpha = s.B * wS * (soft ? .32 : 1)
      ctx.drawImage(A.COMET.body, -CS.TIP * sx, -CS.CY * by, CS.W * sx, CS.H * by)
      if (!soft) ctx.drawImage(A.COMET.body, -CS.TIP * sx, -CS.CY * by * .7, CS.W * sx, CS.H * by * .7)
      ctx.restore()
    }
    if (wS < 1) {
      const k = (1 - wS) * s.B
      const tx = s.x - dx * s.L, ty = s.y - dy * s.L
      const grd = ctx.createLinearGradient(s.x, s.y, tx, ty)
      grd.addColorStop(0, 'rgba(255,255,255,1)')
      grd.addColorStop(.12, 'rgba(236,240,255,.95)')
      grd.addColorStop(.42, 'rgba(160,172,255,.55)')
      grd.addColorStop(.76, 'rgba(112,98,240,.14)')
      grd.addColorStop(1, 'rgba(80,60,200,0)')
      ctx.fillStyle = grd
      for (const [m, a] of [[3.2, .06], [2.1, .12], [1.4, .3], [1, .75]]) {
        ctx.globalAlpha = a * k
        cometPath(s, m)
        ctx.fill()
      }
      const cg = ctx.createLinearGradient(s.x, s.y, s.x - dx * s.L * .5, s.y - dy * s.L * .5)
      cg.addColorStop(0, 'rgba(255,255,255,1)')
      cg.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = cg
      ctx.globalAlpha = .6 * k
      cometPath(s, .3)
      ctx.fill()
    }
    const hx = s.x - dx * s.T * .3, hy = s.y - dy * s.T * .3
    if (!soft) glowAt(A.HALO, hx, hy, s.T * 5 + 180, s.B * .5)
    glowAt(A.GLOW, hx, hy, s.T * 1.25 + 34, s.B * (soft ? .3 : .85))
  }

  function drawSpace(t) {
    const neb = smooth(seg(t, .06, .42)) * (1 - smooth(seg(t, 1.65, 2.15)))
    if (neb > 0) {
      // 星云随镜头前推、向左下漂；保持 16:9 铺满整个视口
      const z = 1 + .1 * seg(t, 0, 2.2)
      ctx.save()
      ctx.translate(SW / 2, SH / 2)
      ctx.scale(z, z)
      ctx.translate(-SW / 2 - 50 * t, -SH / 2 + 22 * t)
      const vwS = vw / S + 240, vhS = vh / S + 180
      const nw = Math.max(vwS, vhS * SW / SH), nh = nw * SH / SW
      const V = { x: -OX / S + vw / S / 2 - nw / 2, y: -OY / S + vh / S / 2 - nh / 2, w: nw, h: nh }
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = neb
      ctx.drawImage(A.NEBULA, V.x, V.y, V.w, V.h)
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = '#dfe4ff'
      for (const st of A.STARS) {
        ctx.globalAlpha = neb * st.a * (.7 + .3 * Math.sin(t * st.tw + st.x * 50))
        ctx.fillRect(V.x + st.x * V.w, V.y + st.y * V.h, st.s, st.s)
      }
      ctx.restore()
    }
    ctx.globalCompositeOperation = 'lighter'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    for (const m of METEORS) {
      const u = seg(t, m.t0, m.t0 + m.dur)
      if (u <= 0 || u >= 1) continue
      const env = smooth(seg(t, m.t0, m.t0 + .1)) * (1 - smooth(seg(u, .72, 1)))
      const pos = (k) => {
        if (!m.c) return [lerp(m.a[0], m.b[0], k), lerp(m.a[1], m.b[1], k)]
        const q = 1 - k
        return [q * q * m.a[0] + 2 * q * k * m.c[0] + k * k * m.b[0], q * q * m.a[1] + 2 * q * k * m.c[1] + k * k * m.b[1]]
      }
      const e = easeOut(u), from = Math.max(0, e - m.trail)
      const n = m.c ? 16 : 2
      const pts = Array.from({ length: n }, (_, i) => pos(lerp(from, e, i / (n - 1))))
      trail(pts, m.w, '205,214,255', env)
      const h = pts[pts.length - 1]
      glowAt(A.GLOW, h[0], h[1], m.w * 9, .5 * env)
    }

    // 彗星逼近时整屏被映成蓝紫
    const s = comet(t)
    if (s) {
      const wash = clamp((s.T - 70) / 220) * .16 * s.B
      if (wash > 0) {
        screen()
        ctx.globalAlpha = wash
        ctx.fillStyle = 'rgb(104,92,255)'
        ctx.fillRect(0, 0, vw, vh)
        stage()
      }
    }
    drawComet(sweep(t), true)
    drawComet(s)

    // 碎光：从彗体下侧剥落、向左下倒流的短光条（按亮度分四档合并绘制）
    if (s) {
      const buckets = [[], [], [], []]
      for (const p of A.SPARKS) {
        const age = t - p.t0
        if (age < 0 || age > p.life) continue
        const b = comet(p.t0)
        if (!b) continue
        const ang = b.a * DEG, dx = Math.cos(ang), dy = Math.sin(ang)
        const spread = b.T * 1.3 + 34
        const x = b.x - dx * p.u * b.L + (-dy) * p.off * spread - dx * p.sp * age + (-dy) * p.drift * age
        const y = b.y - dy * p.u * b.L + dx * p.off * spread - dy * p.sp * age + dx * p.drift * age
        const a = Math.sin(Math.PI * age / p.life) * p.a
        buckets[Math.min(3, Math.floor(a * 4))].push([x, y, x + dx * p.len, y + dy * p.len])
      }
      ctx.strokeStyle = 'rgb(196,210,255)'
      ctx.lineWidth = 1.6
      buckets.forEach((list, i) => {
        if (!list.length) return
        ctx.globalAlpha = ((i + .5) / 4) * s.B
        ctx.beginPath()
        for (const [x0, y0, x1, y1] of list) { ctx.moveTo(x0, y0); ctx.lineTo(x1, y1) }
        ctx.stroke()
      })
    }
  }

  // 沿弧线的横向渐变：以日出点为中心、宽度为 spread 的高斯亮度，另加一层全弧的底亮 base
  function arcGrad(peak, spread, rgb, base = 0) {
    const g = ctx.createLinearGradient(-120, 0, SW + 120, 0)
    for (let i = 0; i <= 20; i++) {
      const x = -120 + (SW + 240) * i / 20
      const a = base + peak * Math.exp(-(((x - CORE.x) / spread) ** 2))
      g.addColorStop(i / 20, `rgba(${rgb},${clamp(a).toFixed(3)})`)
    }
    return g
  }
  const A0 = -2.2, A1 = -1.15 // 覆盖整个画宽的弧段角度
  function strokeArc(style, width, dr = 0) {
    ctx.strokeStyle = style
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.arc(ARC.cx, ARC.cy, ARC.r - dr, A0, A1)
    ctx.stroke()
  }

  function drawHorizon(t) {
    const F = t < 2.55 ? 0
      : t < 2.72 ? easeOut(seg(t, 2.55, 2.72)) * 1.35
        : t < 3.15 ? lerp(1.35, 1.1, seg(t, 2.72, 3.15))
          : lerp(1.1, .5, smooth(seg(t, 3.15, 4.2)))
    const H = F * (1 - .8 * smooth(seg(t, 3.3, 4.0)))   // 横向光晕与光刺在日出铺开后退场
    const rimA = smooth(seg(t, 2.56, 2.92))
    const spread = lerp(260, 820, smooth(seg(t, 2.58, 3.05))) + 500 * easeOut(seg(t, 3.0, 3.8))
    const front = 60 + 1600 * easeOut(seg(t, 2.85, 3.7))
    const earthA = smooth(seg(t, 2.72, 3.75))
    const instA = smooth(seg(t, 2.75, 3.35))

    const z = 1 + .075 * easeInOut(seg(t, 2.5, 4.9))          // 缓慢推近
    ctx.save()
    ctx.translate(CORE.x, CORE.y)
    ctx.scale(z, z)
    ctx.translate(-CORE.x, -CORE.y + 8 * seg(t, 2.5, 4.9))
    ctx.lineCap = 'round'

    // 1. 地平线上方的星空（很淡）
    ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = '#dfe4ff'
    for (const st of A.SKY) {
      ctx.globalAlpha = st.a * rimA
      ctx.fillRect(st.x, st.y, st.s, st.s)
    }

    // 太阳在地平线后面：暖色光晕与光芒画在地球之下，被不透明的地球挡住，
    // 只洒在天空一侧（裁掉下半部分，少画一半像素）；地面上的暖光已烘焙进地表贴图
    const sunK = smooth(seg(t, 2.6, 3.3))
    if (F > 0) {
      ctx.save()
      ctx.beginPath(); ctx.rect(-600, -600, SW + 1200, CORE.y + 600 + 150); ctx.clip()
      glowAt(A.WARM, CORE.x, CORE.y + 4, (300 + 700 * sunK) * Math.max(F, .7), .55 + .4 * sunK)
      if (sunK > 0) {
        ctx.save()
        ctx.translate(CORE.x, CORE.y)
        ctx.rotate((t - 2.6) * .05)
        const rsz = 620 + 520 * sunK
        ctx.globalAlpha = .75 * sunK
        ctx.drawImage(A.RAYS, -rsz / 2, -rsz / 2, rsz, rsz)
        ctx.restore()
      }
      glowAt(A.HALO, CORE.x, CORE.y, 520 * F, .5)
      ctx.restore()
    }

    // 2. 地球：不透明的暗面，再叠上随日出亮起的地表（光照已烘焙在贴图里）
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
    ctx.fillStyle = '#03030a'
    ctx.beginPath(); ctx.arc(ARC.cx, ARC.cy, ARC.r, 0, TAU); ctx.fill()
    if (earthA > 0) {
      ctx.save()
      ctx.beginPath(); ctx.arc(ARC.cx, ARC.cy, ARC.r, 0, TAU); ctx.clip()
      ctx.globalCompositeOperation = 'lighter'
      ctx.globalAlpha = earthA
      ctx.drawImage(A.EARTH, EB.x0, EB.y0, EB.w, EB.h)
      ctx.restore()
    }

    // 3. 大气层：弧线外侧一圈蓝色散射光 + 贴边的亮线，从日出点向两侧铺开
    ctx.globalCompositeOperation = 'lighter'
    if (rimA > 0) {
      // 外侧散射光：由窄到宽、由亮到淡的几层叠出柔和的大气辉光，不留硬边
      const wide = easeOut(seg(t, 2.95, 3.8))
      if (wide < 1) {
        ctx.globalAlpha = rimA * (1 - wide)
        ctx.drawImage(A.HALO_N, HB.x0, HB.y0, HB.w, HB.h)
      }
      if (wide > 0) {
        ctx.globalAlpha = rimA * wide
        ctx.drawImage(A.HALO_W, HB.x0, HB.y0, HB.w, HB.h)
      }
      ctx.globalAlpha = 1
      strokeArc(arcGrad(rimA, spread * .8, '214,236,255', .3 * rimA), 2.2, 0)
      strokeArc(arcGrad(.95 * F, 170, '255,255,255'), 3.6, 0)
      // 宙算仪轨：光从日出点沿弧线向两侧铺开，机械结构随之显露（前沿正好落在亮点处）
      const mechA = smooth(seg(t, 2.85, 3.3))
      const half = front - 70
      if (mechA > 0 && half > 0) {
        ctx.save()
        ctx.beginPath(); ctx.rect(CORE.x - half, MB.y0 - 40, half * 2, MB.h + 80); ctx.clip()
        ctx.globalAlpha = mechA
        ctx.drawImage(A.MECH, MB.x0, MB.y0, MB.w, MB.h)
        ctx.restore()
      }
      // 铺开的前沿带一粒亮点
      const lead = (1 - smooth(seg(t, 3.4, 3.75))) * rimA * seg(t, 2.85, 2.95)
      for (const sgn of [-1, 1]) {
        const fx = CORE.x + sgn * (front - 70)
        if (fx > -80 && fx < SW + 80) glowAt(A.GLOW, fx, arcY(fx), 80, .7 * lead)
      }
    }

    // 4. 宙算仪：刻度环、倾斜轨道与指针，以日出点为中心
    if (instA > 0) {
      const rot = (t - 2.6) * .1
      ctx.save()
      ctx.translate(CORE.x, CORE.y)
      ctx.rotate(rot)
      ctx.globalAlpha = .55 * instA
      ctx.drawImage(A.RING, -RING.size / 2, -RING.size / 2, RING.size, RING.size)
      ctx.restore()
      ctx.strokeStyle = 'rgb(196,204,255)'
      ctx.lineWidth = 1.2
      ctx.globalAlpha = .18 * instA
      ctx.beginPath(); ctx.ellipse(CORE.x, CORE.y, RING.r, 60, -.32 + rot * .4, 0, TAU); ctx.stroke()
      const na = -84 * DEG, nl = 250 * easeOut(seg(t, 2.7, 3.3))
      const ng = ctx.createLinearGradient(CORE.x, CORE.y, CORE.x + Math.cos(na) * 250, CORE.y + Math.sin(na) * 250)
      ng.addColorStop(0, 'rgba(244,246,255,1)')
      ng.addColorStop(1, 'rgba(170,176,255,.1)')
      ctx.globalAlpha = .9 * instA
      ctx.strokeStyle = ng
      ctx.lineWidth = 1.9
      ctx.beginPath()
      ctx.moveTo(CORE.x, CORE.y)
      ctx.lineTo(CORE.x + Math.cos(na) * nl, CORE.y + Math.sin(na) * nl)
      ctx.stroke()
    }

    // 5. 日出的星芒：竖向光刺 + 横贯全屏的变形镜头光晕 + 带一点暖色的光核
    if (F > 0) {
      const hg = ctx.createLinearGradient(CORE.x - 1500, 0, CORE.x + 1500, 0)
      hg.addColorStop(0, 'rgba(150,150,255,0)')
      hg.addColorStop(.4, `rgba(196,202,255,${clamp(.4 * H)})`)
      hg.addColorStop(.5, `rgba(255,255,255,${clamp(.95 * H)})`)
      hg.addColorStop(.6, `rgba(196,202,255,${clamp(.4 * H)})`)
      hg.addColorStop(1, 'rgba(150,150,255,0)')
      ctx.globalAlpha = 1
      ctx.fillStyle = hg
      ctx.fillRect(CORE.x - 1500, CORE.y - .9, 3000, 1.8)
      ctx.globalAlpha = .2 * clamp(H)
      ctx.fillRect(CORE.x - 1500, CORE.y - 5, 3000, 10)
      const vg = ctx.createLinearGradient(0, CORE.y - 240, 0, CORE.y + 110)
      vg.addColorStop(0, 'rgba(210,214,255,0)')
      vg.addColorStop(.69, `rgba(255,255,255,${clamp(.9 * H)})`)
      vg.addColorStop(1, 'rgba(210,214,255,0)')
      ctx.globalAlpha = 1
      ctx.fillStyle = vg
      ctx.fillRect(CORE.x - .9, CORE.y - 240, 1.8, 350)
      // 暖色的太阳光晕与放射光芒（参照地球日出照片），再叠上游戏里冷色的镜头光
      // 越过地平线洒到地面上的一小团暖光
      glowAt(A.WARM, CORE.x, CORE.y + 10, 460 * Math.max(F, .7), .3 * sunK)
      glowAt(A.GLOW, CORE.x, CORE.y, 115 * F, .95)
      ctx.globalAlpha = .08 * F
      ctx.strokeStyle = 'rgb(190,196,255)'
      ctx.lineWidth = 1
      ctx.beginPath(); ctx.arc(CORE.x, CORE.y, 68, 0, TAU); ctx.stroke()
    }
    ctx.restore()

  }

  function draw(t) {
    screen()
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
    ctx.fillStyle = '#030208'
    ctx.fillRect(0, 0, vw, vh)
    stage()
    if (t < 2.5) drawSpace(t)
    else drawHorizon(t)
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }

  return { resize, draw, toScreen }
}

let active = null

// 播放开场；返回取消函数（取消时不会打开档案）
export function playMornyeIntro({ onReveal } = {}) {
  if (active) return active
  let revealed = false
  const reveal = () => {
    if (revealed) return
    revealed = true
    try { onReveal?.() } catch (err) { console.error(err) }
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveal()
    return () => {}
  }

  const el = document.createElement('div')
  el.className = 'mornye-intro'
  el.setAttribute('role', 'dialog')
  el.setAttribute('aria-modal', 'true')
  el.setAttribute('aria-label', '接入观测档案 S-003 · 莫宁')
  el.innerHTML = `
    <canvas aria-hidden="true"></canvas>
    <button type="button" class="mi-skip">跳过<span aria-hidden="true">▸</span></button>`
  document.body.appendChild(el)
  const canvas = el.querySelector('canvas')
  const skipBtn = el.querySelector('.mi-skip')
  const scene = createScene(canvas)

  const layout = () => scene.resize(window.innerWidth, window.innerHeight)
  layout()
  window.addEventListener('resize', layout)

  const openedAt = performance.now()
  let start = 0, raf = 0, leaving = false, finished = false

  const finish = () => {
    if (finished) return
    finished = true
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', layout)
    window.removeEventListener('keydown', onKey, true)
    el.remove()
    active = null
  }
  const leave = () => {
    if (leaving) return
    leaving = true
    reveal()
    el.classList.add('is-leaving')
    setTimeout(finish, LEAVE_MS)
  }
  const skip = () => {
    if (leaving || performance.now() - openedAt < 350) return // 防止双击卡片时误跳过
    leave()
  }
  function onKey(e) {
    if (leaving) return
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      skip()
    } else if (e.key === 'Tab') {
      e.preventDefault()
      skipBtn.focus()
    }
  }
  window.addEventListener('keydown', onKey, true)
  el.addEventListener('click', skip)

  const frame = (now) => {
    if (!start) start = now
    const t = (now - start) / 1000
    scene.draw(t)
    if (t >= T_REVEAL) leave()
    // 淡出期间定格最后一帧：让出主线程给正在打开的档案页
    if (!finished && !leaving) raf = requestAnimationFrame(frame)
  }
  scene.draw(0)
  requestAnimationFrame(() => {
    el.classList.add('is-on')
    skipBtn.focus({ preventScroll: true })
    start = performance.now()
    raf = requestAnimationFrame(frame)
  })

  active = finish
  return active
}
