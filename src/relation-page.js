// 独立访问 relation.html 时的入口（直接打开/分享用）。
// SPA 内打开则由主页 main.js 调 mountRelation，不走这里。
import './page.css'
import './subshell.js'   // 自定义光标 + BGM 续播
import { mountRelation } from './relation.js'

document.documentElement.style.setProperty('--accent', '#ffb066')
mountRelation(document.getElementById('view-root'), () => { location.href = './index.html#home' })
