import './view-chrome.css'

// 占位子页面（暂未填内容的模块，如观潮）
const PAGES = {
  observation: { cn: '观测对象', en: 'OBJECT ARCHIVE', desc: '角色档案 · 频率特征 · 个体记录', accent: '#8b9aff' },
  tide: { cn: '观潮', en: 'TIDE ANALYSIS', desc: '版本解析 · 剧情回溯 · 潮汐事件', accent: '#4ef0e0' },
  relation: { cn: '群像', en: 'RELATION MAP', desc: '势力关系 · 人物连接 · 阵营网络', accent: '#ffb066' },
}

// 把占位页渲染进 root，返回 cleanup。onBack 为「返回」回调。
export function mountPlaceholder(root, key, onBack) {
  const d = PAGES[key]
  root.innerHTML = `
    <a class="back" href="./index.html#home"><span aria-hidden="true">◂</span> 返回泰提斯终端</a>
    <main class="sub">
      <p class="sub-kicker">${d.en}</p>
      <h1 class="sub-title">${d.cn}</h1>
      <p class="sub-desc">${d.desc}</p>
      <div class="sub-status">
        <span class="sub-flower" aria-hidden="true"></span>
        内容推演中 · CONTENT&nbsp;IN&nbsp;SIMULATION
      </div>
    </main>`
  root.querySelector('.back').addEventListener('click', (e) => { e.preventDefault(); onBack && onBack() })
  return () => {}
}
