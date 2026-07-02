// 独立访问子页面(.html)时的外壳：创建光标/音乐按钮的 DOM，逻辑走 shell.js 公共模块。
// SPA 内打开视图时不走这里（DOM 已在 index.html 里，由主页统一管理）。
import { setupCursor, setupBGM } from './shell.js'

const cursor = document.createElement('div')
cursor.id = 'cursor'
cursor.setAttribute('aria-hidden', 'true')
document.body.appendChild(cursor)
setupCursor(cursor)

const btn = document.createElement('button')
btn.id = 'bgm-toggle'
btn.setAttribute('aria-label', '音乐开关')
btn.innerHTML = '<span class="bgm-bars"><i></i><i></i><i></i><i></i></span><span class="bgm-label">音乐 关</span>'
document.body.appendChild(btn)
setupBGM(btn).resumeIfOn()
