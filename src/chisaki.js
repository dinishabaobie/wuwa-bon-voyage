import './chisaki.css'

const artworks = [
  { file: 'threads', author: 'Dusk冥', id: '133561429', title: '触及崩毁的弦线' },
  { file: 'autumn', author: '天機', id: '136877590', title: '枫色中的回望' },
  { file: 'blade', author: 'Hosun', id: '135326672', title: '执刃之时' },
  { file: 'spring', author: 'RIruru', id: '140151203', title: '花开之后' },
  { file: 'cat', author: 'Ui', title: '与猫共度的片刻' },
  { file: 'reunion', author: 'Ui', title: '那天所见的樱花' },
  { file: 'swing', author: '作者待确认', title: '花影间的秋千' },
]
const path = (art) => `photos/chisaki-${art.file}.jpg`
export function renderChisaki(root, data) {
  root.classList.add('chisaki')
  const source = document.createElement('div')
  source.innerHTML = data.body
  const sections = [...source.querySelectorAll(':scope > section')]
  const chapters = [
    { title: '她想回家', sub: '归途 / 从一个愿望认识她', range: [0, 1], art: 1 },
    { title: '世界变了脸', sub: '苇原 / 善意之后发生的事', range: [1, 2], art: 2 },
    { title: '走出那间教室', sub: '离乡 / 可以喘息的地方', range: [2, 3], art: 6 },
    { title: '没有走完的夏天', sub: '旧穗波 / 陪伴与告别', range: [3, 4], art: 5 },
    { title: '线由她来选', sub: '此后 / 为还没发生的事留白', range: [4, 5], art: 3 },
  ]
  root.innerHTML = `
    <header class="cs-top"><a class="prof-back" href="#">← <span>观测对象</span></a><span class="cs-top-label">泰提斯 / 人物档案</span><span>S–002 <i></i> 已归档</span></header>
    <section class="cs-hero" id="cs-cover">
      <img class="cs-hero-art" src="${path(artworks[0])}" alt="Dusk冥绘制的千咲与红色丝线" fetchpriority="high">
      <div class="cs-hero-shade"></div><div class="cs-vertical" aria-hidden="true">線の向こうへ。</div>
      <div class="cs-hero-copy"><p class="cs-eyebrow">PERSONNEL ARCHIVE / 002</p><p class="cs-fullname">朽叶千咲 · CHISAKI</p><h1 id="profile-title">千咲<span>。</span></h1><p class="cs-deck">从独自剪断丝线，<br>到愿意再次伸出手。</p><button class="cs-enter" data-jump="cs-story">循线，走进她的故事 <span>↓</span></button></div>
      <div class="cs-hero-foot"><span>湮灭 <b>／</b> 长刃 <b>／</b> 五星共鸣者</span><span>ILLUSTRATION © Dusk冥</span></div>
    </section>
    <nav class="cs-nav" aria-label="千咲档案章节"><a href="#cs-cover" data-jump="cs-cover" class="cs-nav-name">千咲 <span>CHISAKI</span></a>${chapters.map((c,i)=>`<button data-jump="cs-chapter-${i}"><small>0${i+1}</small>${c.title}</button>`).join('')}<button data-jump="cs-gallery">插画收藏 ↗</button><button class="cs-close" data-close aria-label="关闭千咲档案">×</button><div class="cs-progress"></div></nav>
    <div class="cs-paper" id="cs-story"><div class="cs-intro"><p class="cs-eyebrow">THE THREAD THAT REMAINS</p><h2>她曾经退开。<br>后来，又向前一步。</h2><div><p>接入记录 S–002 / 朽叶千咲。</p><p>我想从她的一个愿望开始：回家。一个曾经选择离开的人，为什么又想与旧日的生活相见？循着这个问题，记录向过去展开。</p><small>记录视角 / 守岸人<br>基于本站既有故事素材重写，未逐条核对官方文本<br>守岸人视角为同人创作；观测手记为解读 · 含剧情剧透</small></div></div>
    ${chapters.map((c,i)=>`<section class="cs-chapter" id="cs-chapter-${i}"><div class="cs-chapter-heading"><span>0${i+1}</span><div><p>${c.sub}</p><h2>${c.title}</h2></div><span class="cs-chapter-mark" aria-hidden="true">糸</span></div><div class="cs-chapter-layout"><aside>${c.art !== undefined ? `<figure><img src="${path(artworks[c.art])}" alt="千咲插画：${artworks[c.art].title}" loading="lazy"><figcaption>${artworks[c.art].author === '作者待确认' ? '插画作者待确认' : `插画 © ${artworks[c.art].author}`} <span>0${i+1} / MEMORY</span></figcaption></figure>` : `<div class="cs-amber"><span>OBSERVER’S NOTES</span><p>${i === 2 ? '先离开。<br>让生活有机会改变。' : '时间停在那一天。<br>有人仍在等一个明天。'}</p><b>${i === 2 ? '远行' : '琥珀'}</b></div>`}</aside><div class="cs-prose">${sections.slice(...c.range).map(s=>s.outerHTML).join('')}</div></div></section>`).join('')}
    <div class="cs-sign"><p class="cs-eyebrow">OBSERVER’S EPILOGUE</p><h2>档案到这里。<br>她的生活还在继续。</h2>${source.querySelector('.prof-sign').innerHTML}<span>记录者 / 守岸人</span></div></div>
    <section class="cs-gallery" id="cs-gallery"><div class="cs-gallery-title"><div><p class="cs-eyebrow">COLLECTED MOMENTS</p><h2>线之外的她。</h2></div><p>七幅插画，七个被留下的瞬间。<br>选一张，让目光停留片刻。</p></div><figure class="cs-gallery-main"><img src="${path(artworks[0])}" alt="千咲插画：${artworks[0].title}" loading="lazy"><figcaption><span class="cs-art-label"></span><a class="cs-art-link" target="_blank" rel="noopener noreferrer">查看画师原作 ↗</a></figcaption></figure><div class="cs-thumbs">${artworks.map((a,i)=>`<button data-art="${i}" aria-pressed="${i===0}" aria-label="查看${a.author}的千咲插画"><img src="${path(a)}" alt="" loading="lazy"><span>0${i+1} <b>${a.author}</b></span></button>`).join('')}</div><p class="cs-gallery-note">插画标题为本站编排用语；作品版权归原作者所有。</p></section>
    <footer class="cs-footer"><span>旅途愉快 / 泰提斯观测档案</span><p>下一页，留给她自己。</p><button data-jump="cs-cover">回到卷首 ↑</button></footer>`
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const jump = (event) => {
    const button = event.target.closest('[data-jump]')
    if (!button) return
    event.preventDefault()
    const target = root.querySelector(`#${button.dataset.jump}`)
    const offset = target.getBoundingClientRect().top-root.getBoundingClientRect().top+root.scrollTop-74
    root.scrollTo({top: Math.max(0, offset), behavior:reduce?'auto':'smooth'})
  }
  const choose = (index) => {
    const art = artworks[index]
    const img = root.querySelector('.cs-gallery-main img')
    img.src = path(art); img.alt = `千咲插画：${art.title}`
    root.querySelector('.cs-art-label').textContent = `0${index+1} / ${art.title} — ${art.author === '作者待确认' ? art.author : `© ${art.author}`}`
    const link = root.querySelector('.cs-art-link')
    link.href = art.id ? `https://www.pixiv.net/artworks/${art.id}` : path(art)
    link.textContent = art.id ? '查看画师原作 ↗' : '查看完整图片 ↗'
    root.querySelectorAll('[data-art]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.art)===index)))
  }
  const select = e => { if(e.target.closest('[data-close]')) {root.querySelector('.prof-back').click();return} const b=e.target.closest('[data-art]');if(b) choose(Number(b.dataset.art)) }
  choose(0)
  root.addEventListener('click',jump);root.addEventListener('click',select)
  const onScroll = () => {
    root.style.setProperty('--cs-progress',String(root.scrollTop/Math.max(1,root.scrollHeight-root.clientHeight)))
    let current='cs-cover'
    root.querySelectorAll('.cs-chapter, .cs-gallery').forEach(el=>{if(el.getBoundingClientRect().top<root.clientHeight*.4)current=el.id})
    root.querySelectorAll('.cs-nav [data-jump]').forEach(b=>{if(b.dataset.jump===current)b.setAttribute('aria-current','location');else b.removeAttribute('aria-current')})
  }
  root.addEventListener('scroll',onScroll,{passive:true});onScroll()
  return ()=>{root.removeEventListener('click',jump);root.removeEventListener('click',select);root.removeEventListener('scroll',onScroll)}
}
