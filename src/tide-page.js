// 独立访问 tide.html 时的入口（占位）。
import './page.css'
import './subshell.js'
import { mountPlaceholder } from './page.js'

document.documentElement.style.setProperty('--accent', '#4ef0e0')
mountPlaceholder(document.getElementById('view-root'), 'tide', () => { location.href = './index.html#home' })
