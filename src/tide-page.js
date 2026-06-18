// 独立访问 tide.html 时的入口（直接打开/分享用）。
import './page.css'
import './subshell.js'
import { mountTide } from './tide.js'

document.documentElement.style.setProperty('--accent', '#3a9fe8')
const root = document.getElementById('view-root')
root.style.cssText = 'position:fixed;inset:0;overflow:auto'  // 作为滚动容器
mountTide(root, () => { location.href = './index.html#home' })
