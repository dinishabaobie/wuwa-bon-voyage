// 独立访问 observation.html 时的入口（直接打开/分享用）。
import './page.css'
import './subshell.js'   // 自定义光标 + BGM 续播
import { mountObservation } from './observation.js'

document.documentElement.style.setProperty('--accent', '#8b9aff')
const root = document.getElementById('view-root')
root.style.cssText = 'position:fixed;inset:0;overflow:auto'  // 作为滚动容器
mountObservation(root, () => { location.href = './index.html#home' })
