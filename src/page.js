import './page.css'

// 三个模块子页面的数据。内容后续往各自的 body 里填即可。
const PAGES = {
  observation: {
    cn: '观测对象', en: 'OBJECT ARCHIVE',
    desc: '角色档案 · 频率特征 · 个体记录',
    accent: '#8b9aff',
  },
  tide: {
    cn: '观潮', en: 'TIDE ANALYSIS',
    desc: '版本解析 · 剧情回溯 · 潮汐事件',
    accent: '#4ef0e0',
  },
  relation: {
    cn: '群像', en: 'RELATION MAP',
    desc: '势力关系 · 人物连接 · 阵营网络',
    accent: '#ffb066',
  },
}

const root = document.getElementById('page')
const data = PAGES[root.dataset.page]

document.documentElement.style.setProperty('--accent', data.accent)
document.title = `${data.cn} | 泰提斯终端`

root.innerHTML = `
  <a class="back" href="./index.html"><span aria-hidden="true">◂</span> 返回泰提斯终端</a>
  <main class="sub">
    <p class="sub-kicker">${data.en}</p>
    <h1 class="sub-title">${data.cn}</h1>
    <p class="sub-desc">${data.desc}</p>
    <div class="sub-status">
      <span class="sub-flower" aria-hidden="true"></span>
      内容推演中 · CONTENT&nbsp;IN&nbsp;SIMULATION
    </div>
  </main>
`
