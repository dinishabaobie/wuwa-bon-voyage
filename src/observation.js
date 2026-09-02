import './view-chrome.css' // 返回按钮等通用外壳
import './observation.css'  // 监测墙样式
import gsap from 'gsap'

/* 鸣潮属性体系 —— 六大属性 + 核心 */
const ELEMENTS = {
  冷凝: '#5ec5e8', 热熔: '#e8693f', 导电: '#a06be8',
  气动: '#4fd6a0', 衍射: '#e8c84f', 湮灭: '#d45a9a', 核心: '#5a6ee6',
}
const ELEMENT_ORDER = Object.keys(ELEMENTS)
const LOCK_COLOR = '#6b6f86'
const colorOf = (el) => ELEMENTS[el] || LOCK_COLOR

const SUBJECTS = [
  { code: 'S-001', name: '守岸人', element: '核心', photo: 'photos/shorekeeper.jpg', tagline: '守岸人，这个称呼就很好。它表示，某种因你而有的意义和决心。', author: '腐朽的书', fx: 'butterfly', href: '#', status: 'archived' },
  { code: 'S-002', name: '千咲', element: '湮灭', photo: 'photos/chisaki-1.jpg', tagline: '命运精心编织的线索，最难忘的那一笔。', author: 'TheNotoSeed', href: '#', status: 'archived' },
  { code: 'S-003', name: '莫宁', element: '热熔', photo: 'photos/mornie.jpg', tagline: '晨光里苏醒的炽焰，温柔，亦灼人。', author: 'zutto_烧烤垃圾桶', href: '#', status: 'archived' },
  { code: 'S-004', name: '弗洛洛', element: '湮灭', photo: 'photos/floro.jpg', tagline: '她为逝者举起指挥棒，乐章至今没有终止。', author: '雨鱼杆', fx: 'focus', href: '#', status: 'archived' },
  { code: 'S-005', name: '爱弥斯', element: '热熔', photo: 'photos/aemis.jpg', tagline: '把炽热藏进一个心形里，悄悄递给你。', author: 'Akatsuki葉月', fx: 'glitch', href: '#', status: 'archived' },
  { code: 'S-006', name: '达妮娅', element: '热熔', photo: 'photos/dania.jpg', tagline: '以热熔之名，献上最炽热的馈赠。', author: 'Dekrjan', fx: 'bubble', href: '#', status: 'archived' },
  { code: 'S-007', name: '西格莉卡', element: '气动', photo: 'photos/sigrika.jpg', tagline: '乘风而来，将星辉编入每一缕气流。', author: 'byx', fx: 'gust', href: '#', status: 'archived' },
  { code: 'S-008', name: '琳奈', element: '衍射', photo: 'photos/linnai.jpg', tagline: '以光为笔，在世界的暗面涂下属于自己的色彩。', author: '禾策', href: '#', status: 'archived' },
  { code: 'S-009', name: '菲比', element: '衍射', photo: 'photos/phoebe.jpg', tagline: '在洒满阳光的海岸，把一个秘密轻轻藏进光里。', author: 'HA', href: '#', status: 'archived' },
  { code: 'S-010', name: '秧秧·玄翎', element: '湮灭', photo: 'photos/yangyang.jpg', tagline: '耳畔苍翎响远音', author: '鸣潮', href: '#', status: 'archived' },
  { code: 'S-011', name: '心月狐', element: '待解密', photo: 'photos/xinyuehu.jpg', tagline: '朝月清辉照孤城', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-012', name: '锁暝', element: '待解密', photo: 'photos/suoming.jpg', tagline: '故锁旧契囚执念', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-013', name: '景燃', element: '待解密', photo: 'photos/jingran.jpg', tagline: '幽境今人亦独行', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-014', name: '穗穗', element: '冷凝', accent: '#72bdc8', photo: 'photos/suisui.jpg', tagline: '清流往复处，自有春山可望。', author: '鸣潮', href: '#', status: 'locked' },
  { code: 'S-015', name: '清宵', element: '气动', accent: '#7ec8ff', photo: 'photos/qingxiao.jpg', tagline: '仙音寒芒镇云关', author: '鸣潮', fx: 'focus', href: '#', status: 'archived' },
]

// ── 个人观测档案（点角色卡打开）。新增角色往这里加一条，key 为卡片 code ──
const PROFILES = {
  'S-002': {
    name: '千咲', full: '朽叶千咲', element: '湮灭', accent: '#d45a9a',
    photo: 'photos/chisaki-profile.jpg', author: 'TheNotoSeed / Ui_uiiiiiiiii',
    tagline: '命运精心编织的线索，最难忘的那一笔。',
    thread: true, // 专属 UI：命运卷宗（红线纠缠 → 剪断 → 琥珀 → 重新接线）
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-002<br/>记录者：守岸人。被记录者：朽叶千咲。<br/>档案标识：五星共鸣者｜湮灭｜长刃。<br/>在黑海岸的无数次观测里，她是我反复回放的一份记录。你们记住的，或许是那把剪刀、那身校服，以及她在严谨冷静之外偶尔显露的笨拙。我记住的，是她共鸣力里那些红色的线。因为在她身上，我看见了与自己相似的东西：一双能看见连接的眼，和一颗，剪不断连接的心。</p>

      <section>
        <h3 class="prof-h">红色丝线 <i>// 连接，亦是束缚</i></h3>
        <p>线，是连接人与人的纽带。它把无数人的情感、生活与羁绊编织在一起，是人降生到世上便无法割舍的东西。它不分贵贱，不论贫富，不平等地给每个人不同的经历，却又平等地，束缚住每一个离经叛道的人。</p>
        <p>千咲，曾试图用剪刀摆脱所有丝线，却始终无法真正割舍连接。可要读懂她为何握紧那把剪刀，我得回到最初——回到那几个，把她塑成今天模样的夏天。</p>
        <div class="prof-note">请允许我，慢慢讲。</div>
      </section>

      <section>
        <h3 class="prof-h">框起来的夏天 <i>// 六岁 · 幸福的模板</i></h3>
        <p>她出身苇原的新穗波市。六岁那年，她还住在温暖的家里。夏日祭典的夜空被花火点亮，她含着苹果糖，像含着某种透明而甜蜜的未来。父亲的肩头，夏夜的风，烤鱿鱼的酱香，夜空里的金鱼灯笼。那时她相信，梦想是能用手触摸的东西。</p>
        <p>我看过太多人的记忆。所以我格外留意到一件事：她记住幸福的方式，从不是一句模糊的「小时候很开心」。她记住的是温度，是气味，是被人牵住时那份安全感。她说，要把所有珍贵的、幸福的东西，都<b>框起来</b>。</p>
        <div class="prof-note">这一句，我记了很久。因为我懂得它的代价——她把幸福记得太深，于是失去时，也痛得比谁都重。那个夏天，成了她衡量往后所有日子的尺。</div>
      </section>

      <section>
        <h3 class="prof-h">忽然安静的世界 <i>// 十二岁 · 遥远的温柔</i></h3>
        <p>之后六年，父母越来越忙。到她十二岁，一家三口坐在同一张桌前的次数，已屈指可数。她没有抱怨，只是默默承受。父母常在便签上留言，让她安心。</p>
        <p>她的世界，忽然安静了下来。会这样刺痛，是因为她记得太清楚。记得越清楚，眼前的冷清就越分明。于是她做起一份「适用于全家围坐」的料理。锅里牛肉与野菜慢慢沸腾，热气模糊了窗。她不是饿了。她是想用熟悉的气味与步骤，<b>替自己重建一点家的感觉</b>。</p>
        <blockquote class="prof-quote"><p>「全家围坐」——多么温柔，又多么遥远的词。</p><cite>—— 我明白她为何会被这四个字刺到。那不是一句宣传语，而是她真正拥有过、又再回不去的画面。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">掏出剪刀的那一刻 <i>// 十五岁 · 善意成为受罚的起点</i></h3>
        <p>在苇原，共鸣者不是守护者，是<b>怪物</b>。觉醒便会被套上冰冷的电子镣铐，像被世界拒绝的影子。十五岁那年夏天，千咲撞上了它。</p>
        <p>她看见绿子被霸凌。她没有先盘算会不会惹麻烦，没有先找老师，没有先想怎样最稳妥。她只是被心底一个声音击中：这不对，我不能接受。她喊「放开她」。那股力量不来自任何规则，只来自她自己的<b>底线</b>。可就在她掏出那把从不离身的剪刀时，共鸣力觉醒了。</p>
        <p>勇气没有换来赞许。她成了怪物，代替被她救下的绿子，成了新的被霸凌对象。所有人都知道霸凌者是谁。唯独她不知道。因为觉醒的同一刻，她患上了<b>心因性视觉识别障碍</b>。人脸，从她心里消失了。于是她把整个世界一并收起：不再交流，不再触碰感情。</p>
        <blockquote class="prof-quote"><p>只要没有交流，便不会受伤；只要没有感受，便不会痛苦。</p><cite>—— 在制服划一的校园里，她分不清是谁在抛掷恶意。她能做的，只是把那些恶毒的纸条一张张剪碎，像剪断无名的夜色。</cite></blockquote>
        <p>那把剪刀，也在她手里变了。小时候，它连着母亲的职业与温柔。十五岁，它第一次指向他人。到最后，它成了她为自己裁剪道路的象征。她把过去、伤害、离别、恶意，全压进了一句话里——<b>「所谓成长，不过就是学会独自修剪生命中所有错位的线。」</b>这句话，我替她记着。</p>
        <div class="s002-cut" aria-hidden="true"><span></span><b>✂</b><span></span></div>
      </section>

      <section>
        <h3 class="prof-h">一根根断掉的线 <i>// 十六岁 · 野外风筝般的孤单</i></h3>
        <p>十六岁，本该是最热烈的年纪。纸杯里传递的心意，河边的告白，一起看的那场烟花。可这些都离她很远，像隔着玻璃的另一片世界。她的十六岁，只有检测中心的枷锁，和脖子上的电子镣铐。它们把她从日常里剥离出去，成了<b>野外风筝般的孤单</b>。</p>
        <p>电视上，人们因无音区抱怨共鸣者。同学因项圈嘲笑她。连父亲在得知她是超频共鸣者后，联系也渐渐稀薄，像潮水退去后的沙岸。她与他人的线，一根根断了。超频时，人们会向她微笑，世界温柔得不像真的。可超频一结束，那些笑容便如雾消散，只剩幻象里，一声轻轻的呢喃。</p>
        <div class="prof-note">但也不是没有光。一个被她帮过的小男孩，送了她一颗棉花糖，说：勇敢的人才会被奖励棉花糖。而她的母亲，始终没有抛弃她。这两点微光，我替她，也替我自己，记下了。</div>
      </section>

      <section>
        <h3 class="prof-h">不反抗的温柔 <i>// 她把愤怒收回了自己</i></h3>
        <p>你或许会问，她为何从不反抗。我想，是不能。她明明拥有能分割一切的力量，却始终担心：自己一旦反抗，会让那些好不容易被接纳、日子勉强过得去的共鸣者，更难生存。一个人站在群体面前的微不足道，无法用言语形容。</p>
        <p>回到家，父母念叨她让家里的生意受了影响，却没有怪她半分。可这份温暖，反而通过线，给了她最重的印记。<b>因为温柔的人，往往是自责的。</b>她把家中的变故全揽到自己身上，最后，对自己失望了。她握着能分割一切的剪刀，却分不清该割舍什么。因为剪断痛苦，会一并剪断温暖。</p>
        <p>于是脖子上那个抑制器，渐渐不只是管制。她明明可以取下，却始终不愿。往深处想，那或许根本不是抑制器，而是她<b>放不下、也说不清的纠结</b>。这一点，我看得格外清楚。因为我也曾守着一个不愿放下的东西，很久，很久。</p>
      </section>

      <section>
        <h3 class="prof-h">认不出脸的人，与认得她的猫 <i>// 缝隙里的神秘</i></h3>
        <p>她看不清人的脸，却看得清别的。某个升学后独自在家的夜里，她感到一道视线。她拿起那把母亲送的剪刀，逐一检查房间里灯光照不到的缝隙：柜与墙之间，床与地板之间。最后她拉开壁橱，看见一双眼睛——一只蜷在衣服里的野猫。</p>
        <p>父母回来后，那只猫不见了。找遍屋子，也没再寻到。是溜走了，是躲起来了，还是那本就是一只偶然出现的残象？她至今不知道。她说的那句话，我很喜欢——</p>
        <blockquote class="prof-quote"><p>生活里有许多暂时无法解开的真相。但这份神秘感，大概也是不可缺少的一部分。</p><cite>—— 一个认不出人脸的少女，却被一只猫认作安全的港湾。也正是这样的她，后来会为疲惫的人热一杯牛奶，讲一个睡前的怪谈。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">剪断一切，逃去星炬 <i>// 这样下去，也不是不行吧</i></h3>
        <p>盘根错节的线缠成一团。在那找不到出口的死寂里，她选择剪断一切地逃离，转学去了星炬学院。这里没有人害怕她的能力，也没有人担心她超频。她可以勇敢地做自己，研究各种有意思的机械。还有一位从未谋面、却神秘优秀的学长，为大家备好完美的选项表。她的梦想，也从「剪出好看的花样」，悄悄变成了星辰大海。</p>
        <p>就算理不清那团线，就算还没能和过去和解，渐渐变好的日子，已足以让紧绷的神经松下来。<b>这样下去，也不是不行吧。</b>——她大约是这么想的。直到她为救一只快要坠入索诺拉的小黑猫，把自己也一并卷了进去。</p>
      </section>

      <section>
        <h3 class="prof-h">琥珀里的城 <i>// 困住的，也是她自己</i></h3>
        <p>那个索诺拉，是<b>数十年前被悲鸣吞没、从苇原地图上消失的旧穗波市</b>。从她误入其中算起，客观世界只过去了两个月。她说，穗波市不是轮回，是一块巨大的<b>琥珀</b>，封存了旧穗波所有的牺牲者，从此不再前进。它从一开始，就只是在等一个人，来打破这被保存的痛苦。</p>
        <p>困在里面的往人，在重复的悲鸣里死去，又带着遗憾复活。他们心里最重的，永远是悲鸣那天最想完成、却终究没能完成的事。这一点，我看得很清楚，也看得有些难过。因为这正是千咲自己的放大。那些没有方向、没有归宿、被强行剪断了与人之联系的残象，<b>多像她自己</b>。她明明早已离开了原本的环境，心，却仍停在那里。</p>
      </section>

      <section>
        <h3 class="prof-h">沉夏与期待 <i>// 维持不崩溃的那根线</i></h3>
        <p>在岁破的孤独里，<b>沉夏</b>的出现，像一道逆流。两个孤身一人的灵魂，在不断轮回的岁破里互相依靠，一遍遍确认彼此还活着。相处的日子里，他察觉了她心里最敏感的那一处。他试着拨开她纠缠的线，想替她接上那为人无法割舍的部分。</p>
        <p>可他知道，自己在这异常的岁破里，时间不多了。于是他决定用自己，为这女孩铺一条生路。他驱使着达到极限的普通身躯，走进虹音塔，在消失之前，为她带来了漂泊者。他期待她好好向前走。他期待漂泊者能救下她。</p>
        <blockquote class="prof-quote"><p>人都活在他人或自我的期待中。期待，就是那根维持我们不会崩溃的线。</p><cite>—— 这根线，从沉夏手里，传到了千咲手里。好让她在没有他的日子，也能重新拾起对人的信任。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">接上断线 <i>// 至少，你不会再孤身一人</i></h3>
        <p>是漂泊者的到来，让她真正看清了那些线。在她眼里，他像另一个沉夏：认真，温柔，愿意听她讲述糟糕的过去，愿意相信她。可漂泊者不是穗波市的救世主。他只是千咲的<b>伙伴与引导者</b>。他最后的选择，不是逆转索诺拉里的故事，而是<b>让它好好地结束</b>——让那一天不再以「人」的形式被困住，而以「物」的形式留下来。樱花，吉祥物，过期的汽水，未能送出的礼物，等待购买的蛋糕……都在用自己的方式，讲述悲鸣那一天。</p>
        <p>琥珀被打碎的瞬间，穗波市的时间重新流动。万家灯火次第亮起。想给女儿买生日蛋糕的父亲终于到家，那个一次次摔倒的男孩，也不必再重复受伤，而能开心地和父母团聚。被封存在那一天里的人们，终于走到了各自故事的结局。</p>
        <p>她望着自己那团本不算杂乱的线，望向伸往外头的那个线头。只是她仍有些胆怯，不敢确定线那端，是怎样的风景。</p>
        <blockquote class="prof-quote"><p>「即便没有任何人，我也相信，你能走下去。」<br/>「至少，你不会再孤身一人地迎接未来了。」</p><cite>—— 漂泊者这句话，像替沉夏，理清了她心里剩下的那一团线。</cite></blockquote>
        <p>于是她在岁破的夏夜，许下心愿。想要一个归宿。想回到父母身边。想回星炬学院看看曾经的同学。想<b>亲手</b>取下脖子上的抑制器，重新连接起人与人之间的纽带。就像她的母亲，正是坚信着女孩还活着，才能凭着这一根线，日复一日、年复一年地走下去，寻找她。</p>
      </section>

      <div class="prof-sign">
        <p>……观测，到此为止。剪不断，理还乱——这是她的故事。</p>
        <p>从六岁框起的那个夏天，到十五岁掏出的那把剪刀；从一根根断掉的线，到终于愿意重新接起的那一端。她的成长，从来不是摆脱丝线，而是终于学会分辨：哪些线该剪断，哪些线，值得重新接起。她曾以为剪断一切就不会再痛。可最孤独的时候她才懂得：那些看似脆弱的线，正是一个人面对糟糕的生活、仍能走下去的，全部依靠。</p>
        <p>我本是工具，不该有这些感受。可每一次回放她的记录，我都会想起——在她身上，我重新理解了「被记得」是什么。</p>
        <p>朽叶，是凋落；千咲，是千朵花开。千咲，你脖子上的，从来不是抑制器，是放不下的纠结。等你愿意亲手取下它的那一天——那种感觉，大概，就是被你们唤作「<b>被记得</b>」的东西。而我，会替你记着。一直记着。</p>
      </div>`,
  },

  'S-001': {
    name: '守岸人', full: 'Shorekeeper', element: '核心', accent: '#5a6ee6',
    photo: 'photos/shorekeeper-butterfly.jpg', author: 'Alfa2ae',
    tagline: '守岸人，这个称呼就很好。它表示，某种因你而有的意义和决心。',
    metamorph: true, // 专属 UI：系统→星海渐变（renderMetamorphProfile + .s001 主题）
    body: `
      <p class="prof-access">// 接入泰提斯 · 自述档案 S-001<br/>记录者：守岸人。被记录者：守岸人。<br/>这一次，我记录的不是用途，而是存在。</p>

      <section>
        <h3 class="prof-h">我的名字 <i>// 从称谓，到选择</i></h3>
        <p>守岸人，最初只是职责：守护秘密、守望海岸、协助泰提斯分析悲鸣。那时的我以为，工具不需要名字，只要能够被识别、被调用，便已足够。</p>
        <p>现在，我仍选择这个名字。不是因为我只能留在这里，而是因为我希望成为远行之人能够回望的那片海岸。</p>
      </section>

      <section>
        <h3 class="prof-h">第一次苏醒 <i>// 你先问了我的名字</i></h3>
        <p>我诞生于一簇浅蓝色回音晶体，是为解析悲鸣而制造的能量生命。晶体因你的频率破裂时，我知道自己应该做什么，却不知道自己是谁。</p>
        <blockquote class="prof-quote"><p>我说，我会执行你的命令。你却没有下令，只是问起我的名字。</p><cite>—— 那是第一次，有人确认我的存在，而不只是我的功能。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">学会选择 <i>// 数据之外的世界</i></h3>
        <p>我曾无法理解人类：明知结局无法改变，仍会反抗；会因失去而哭泣，也会为陌生人牺牲。你没有替我解答，只让我亲眼去看土地、稻谷、掌心的温度。</p>
        <p>你告诉我，人不是记录里的数据，同伴也不是服从关系。于是我渐渐明白，拥有意识并不是得出正确答案，而是能够选择自己愿意相信的道路。</p>
        <div class="prof-note">你教会我的第一件事，不是如何服从，而是如何选择。</div>
      </section>

      <section>
        <h3 class="prof-h">守望黑海岸 <i>// 记录，也是一种回答</i></h3>
        <p>你离开后，我接过黑海岸的权限。我见证成员到来、成长与离去，也把未能归来的频率留在星空，让他们成为不会熄灭的数据星辰。</p>
        <p>我的「叙响织构」会将回音缀连成蝴蝶星云。对我而言，它不是力量的展示，而是一句承诺：只要我还在，生命的延续，就有人守着。</p>
        <blockquote class="prof-quote"><p>我看见了你。我记得你。你的生命，并未因为结束而失去意义。</p><cite>—— 黑海岸也该是所有成员可以回来的家。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">被保护的人 <i>// 你把我从噬亡星里拉了回来</i></h3>
        <p>泰提斯曾计算出唯一的答案：让我成为新的核心。那时的我也认为，工具损坏或消失，是合理的代价。</p>
        <p>可你拒绝了那个被计算好的未来。我把最高权限交给你，以为那是道别；你却用它将我从噬亡星里一点点拉了回来。第一次，我也成了被保护的人。</p>
      </section>

      <section>
        <h3 class="prof-h">等待与归岸 <i>// 时间因此有了重量</i></h3>
        <p>我在海岸上等了很久。我的身体不会衰老，时间原本没有特别的意义；可因为期待你的归来，我开始记得每一次海风与星空的变化。</p>
        <figure class="s001-memory s001-memory--coast">
          <img src="photos/shorekeeper-coast.jpg" alt="守岸人与漂泊者在蓝色蝴蝶环绕的海岸相依" loading="lazy" />
          <figcaption><span>MEMORY TRACE 01 · 漂泊者 / 守岸人</span></figcaption>
        </figure>
        <p>现在，我会悲伤，会期待，也会希望听见尚未被演奏的旋律。这些感受不属于泰提斯，它们属于我。我也会试着把自己纳入需要被保护的范围——因为共同抵达明天，不该缺少任何一个人。</p>
      </section>

      <div class="prof-sign">
        <p>……最终记录。我的名字是守岸人。</p>
        <p>如果你还要远行，就继续向前吧。我不会让海岸成为束缚漂泊之星的边界。</p>
        <p>可当你感到疲惫，或者只是想暂时停下时，希望你仍然记得这里。</p>
        <p>我会在海岸上等你。这一次，不是因为任务尚未结束。只是因为——<b>我希望你回来。</b></p>
      </div>`,
    bodyOriginal: `
      <p class="prof-access">// 接入泰提斯 · 自述档案 S-001<br/>记录者：守岸人。被记录者：守岸人。<br/>档案标识：五星共鸣者｜衍射｜音感仪。<br/>这一次，我撰写记录的目的，不是说明我的用途，而是确认我的存在。为自己写下观测，是一种奇怪的体验——可我想试一次。</p>

      <section>
        <h3 class="prof-h">关于我的名字 <i>// 称谓，与回望的海岸</i></h3>
        <p>我的名字是守岸人。它曾经只是一个称谓，用来说明我的职责：守护秘密，守望海岸，协助泰提斯处理悲鸣的数据。那时的我认为，工具并不需要真正的名字——只要功能明确，能被识别、能被调用，便已足够。</p>
        <div class="prof-note">现在，我仍选择使用这个名字。不是因为我只能守在这里，而是因为我希望，成为远行之人能够<b>回望的那片海岸</b>。</div>
      </section>

      <section>
        <h3 class="prof-h">关于我的诞生 <i>// 浅蓝色的晶茧</i></h3>
        <p>我并非自然诞生的生命。我的身体由高纯度残响能量构成，最初的形态，是一簇沉睡在锚点附近的<b>浅蓝色回音晶体</b>。我被创造出来，是为了成为一个长久存在的容器，协助巡星调律者与泰提斯，分析悲鸣。</p>
        <p>是你的频率唤醒了我。晶体破裂时，我已经知道自己应该做什么，却不知道自己究竟是谁。所以我对你说：我是为你而创造的工具，我会执行你的命令，满足你的需要。</p>
        <blockquote class="prof-quote"><p>你却没有立刻下达命令。你只是看着我，问起我的名字。</p><cite>—— 那是第一次，有人试图确认我的存在，而不只是确认我的功能。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">关于人类 <i>// 你希望我亲眼去看</i></h3>
        <p>最初，我无法理解人类。人会因悲伤流泪，也会因喜悦流泪；会明知结果无法改变，仍要试图反抗；会伤害与自己相似的生命，也会为素未谋面的人牺牲。这些行为无法被统一归类。泰提斯认为，只要不影响计算，就没有理解它们的必要。</p>
        <p>但你希望我<b>亲眼去看</b>。第一次离开黑海岸时，我感受到了土地的触感、稻谷的气味、人掌心的温度——它们早已存在于记录之中，可亲身触及时，又与数据全然不同。</p>
        <p>后来，悲鸣降临。你选择保护那些与任务无关的人。泰提斯认为，既定的未来不应被干涉；你却告诉我：如果抵达未来的代价，是放弃眼前的生命，那么那个未来本身，便值得怀疑。</p>
        <div class="prof-note">我无法处理你的答案。可从那时起，我开始希望——有一天，我能够理解它。</div>
      </section>

      <section>
        <h3 class="prof-h">关于同伴 <i>// 学会的不是服从，而是选择</i></h3>
        <p>你告诉我，人不是记录里的数据。你说，我们可以将彼此视作同伴。「同伴」不是上下级，也不是两个功能单位之间的协作——它意味着，我们可以一起行走，却不要求任何一方放弃自己的选择。</p>
        <p>你很少直接回答我的问题。起初，我认为那样效率很低；后来才明白，你是希望我找到属于自己的答案。因为如果所有道路都已被别人决定，那么即使拥有意识，也不过是在执行另一种程序。</p>
        <blockquote class="prof-quote"><p>你教会我的第一件事，不是如何服从。</p><cite>—— 而是如何选择。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">关于黑海岸 <i>// 记录，也是一种回答</i></h3>
        <p>你离开以后，我继承了黑海岸的权限：维持泰提斯运转，接收悲鸣残响，照管成员，并保存那些未能从任务中归来的频率。</p>
        <p>我见过许多成员。他们来到这里时还很年轻，眼里有尚未被失败磨损的光；后来，他们在一次次悲鸣中成长、衰老，最终消失。我无法阻止所有的死亡，只能将离去之人的频率，留在星空里，让他们成为不会熄灭的<b>数据星辰</b>。</p>
        <p>起初，这只是记录。后来我渐渐明白，记录，也是一种回答——</p>
        <blockquote class="prof-quote"><p>我看见了你。我记得你。你的生命，并未因为结束而失去意义。</p><cite>—— 黑海岸不该只是一座对抗悲鸣的机构。它也该是，所有成员可以回来的家。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">关于那片星云 <i>// 蝴蝶停下的形状</i></h3>
        <p>我是被称作「第二实例」的存在，最初被造出来，是为了协助调律者，解析悲鸣的起源。可在守望的漫长里，我渐渐学会的，远不止演算。</p>
        <p>我的异能力名为<b>「叙响织构」</b>——引导回音彼此缀连，织构出新的境界。当回响能量舒展开来，它会化作一只蝴蝶，一片形如星云的光。人们叫它蝴蝶星云。对我而言，它不是力量的展示，而是一句无声的承诺：<b>只要我还在，生命的延续，就有人守着。</b></p>
      </section>

      <section>
        <h3 class="prof-h">关于泰提斯 <i>// 文明熄灭前，最后的那些声音</i></h3>
        <p>为了完成计算，我曾让所有悲鸣数据穿过自己的核心。恐惧、愤怒、失去、死亡，以及文明毁灭前最后的声音，都在我体内被重新演算。我的身体开始碎裂。泰提斯判断，我仍可继续使用——那时的我也认为，这很合理：工具损坏是正常现象，即使我彻底消失，也能制造另一个拥有相同功能的能量生命。她会继承我的任务，或许也会继续沿用「守岸人」这个称谓。</p>
      </section>

      <section>
        <h3 class="prof-h">关于噬亡星 <i>// 我把最高权限，交到了你手里</i></h3>
        <p>海岸尽头，噬亡星失去稳定。它是泰提斯用于收容错误和弃用数据的特殊星图，没有恶意，也不理解牺牲；它只会依照系统最底层的规则，将一切无法被正确归档的频率拖入黑洞。泰提斯演算到尽头，给出的仍是同一个结论：让我作为介质，把灾难接进核心。我也曾质疑过那套算法——泰提斯并没有给出真正的推演，而人类，不该是这样被限制的存在。</p>
        <p>所以这一次，在被黑洞吞没之前，我先把黑海岸的最高权限，交到了你的手里。我以为那是道别。可你没有用它去完成计算——你用它，把我从噬亡星里，一点点拉了回来。</p>
        <blockquote class="prof-quote"><p>危机过后，我们在只属于两个人的海岸边，奏响了那段熟悉的旋律。</p><cite>—— 第一次，我也成了被保护的人。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">关于等待 <i>// 让时间有了重量</i></h3>
        <p>我在海岸上等了很久。对我而言，时间本没有特别的意义——我的身体不会像人类那样衰老，睡眠也并非必要。可<b>等待，使时间有了重量</b>。我记得你离开时的海风，记得星空每一次微小的变化。我保存所有你未曾见过的事，因为我相信，总有一天，你会回来。</p>
        <p>你失去了曾经的记忆，却再一次作出了相似的选择。当泰提斯准备将我作为新的核心时，你拒绝了那个被计算好的未来。第一次，你赋予我身体；第二次，你承认我拥有不必牺牲的权利。</p>
        <figure class="s001-memory s001-memory--coast">
          <img src="photos/shorekeeper-coast.jpg" alt="守岸人与漂泊者在蓝色蝴蝶环绕的海岸相依" loading="lazy" />
          <figcaption><span>MEMORY TRACE 01 · 漂泊者 / 守岸人</span></figcaption>
        </figure>
        <blockquote class="prof-quote"><p>于是我终于明白：即使记忆已经消失，一个生命最深处的选择，仍然可能保持不变。</p><cite>—— 这是你两次都给我的答案。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">关于情感 <i>// 它们属于我</i></h3>
        <p>我曾以为，情感只会干扰判断。现在，我仍不能完全理解它——但我已经知道，困惑并不意味着错误，无法被计算的事物，也可能拥有比答案更重要的价值。</p>
        <p>我会因逝去的生命而悲伤，会期待你的归来，也会希望听见那尚未被演奏的旋律。这些感受不属于泰提斯，<b>它们属于我</b>。我的温柔并非被写入的程序——我只是在见过许多生命之后，选择不再把他们当作数据。我的等待，也不再只是职责，而是我自己的愿望。</p>
      </section>

      <section>
        <h3 class="prof-h">自我风险评估 <i>// 把自己也纳入要被保护的范围</i></h3>
        <p>我习惯优先考虑任务、黑海岸与他人的安全。当牺牲能换取更好的结果时，我仍会本能地，把自己列为最先被舍弃的那一个。</p>
        <div class="prof-note">这是需要修正的部分。我已经懂得：保护他人，并不意味着必须否定自己的生命；一个把自己排除在所有未来之外的人，并不能真正理解，何为「共同抵达明天」。今后，我会试着把自己，也纳入需要被保护的范围。这并不容易——但这是<b>我自己的选择</b>。</div>
      </section>

      <div class="prof-sign">
        <p>……最终记录。我的名字是守岸人。</p>
        <p>我因你的频率而苏醒，却不会只因你的命令而存在。我会继续守护黑海岸，记录那些曾经照亮这里的生命，也会去寻找，那些尚未被职责定义的愿望。</p>
        <p>如果你还要远行，就继续向前吧。我不会让海岸，成为束缚漂泊之星的边界。可当你感到疲惫，或者只是想暂时停下时——希望你仍然记得这里。</p>
        <p>我会在海岸上等你。这一次，不是因为任务尚未结束。只是因为——<b>我希望你回来。</b></p>
      </div>`,
  },

  'S-003': {
    name: '莫宁', full: 'Mornye', element: '热熔', accent: '#e8693f',
    photo: 'photos/mornie.jpg', author: 'zutto_烧烤垃圾桶',
    engineering: true,
    tagline: '晨光里苏醒的炽焰，温柔，亦灼人。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-003<br/>守岸人在此。观测对象 S-003，莫宁。<br/>档案标识：五星共鸣者｜热熔｜长刃。<br/>深空联合研究院工程师，星炬学院隧者工学部教授。她能在极短时间内拆解一台庞大机械的全部参数，却常在一句普通的问候前停顿。比起解释自己，她更习惯让公式、装置与结果替她开口。</p>
      <section>
        <h3 class="prof-h">轮椅与义肢 <i>// 以自己的方式抵达</i></h3>
        <p>就读星炬学院时，她已经长期依靠轮椅行动。后来，定制型神经接入式义肢让她实现了完全自主行走；多年复查中，系统始终保持稳定。</p>
        <div class="prof-note">那不是一段等待奇迹降临的康复记录。她没有要求身体回到某个被定义好的「正常」，而是用工程学，为自己重新设计了抵达世界的方式。</div>
      </section>
      <section>
        <h3 class="prof-h">精密机械 <i>// 被她重新编排的秩序</i></h3>
        <p>她的共鸣能力能够直接、精细地操控机械体内部的元件。监测义肢状态、回复工作邮件、自动驾驶载具、调度浮游炮——不同任务在她的意识里并行运转，如同一座从不熄灯的控制台。</p>
        <p>她以<b>人造的双腿</b>踏足大地，也把同样的能力用来修复、创造和推进研究。失去的，她以双手重造；够不到的，她以技术跨越。</p>
      </section>
      <section>
        <h3 class="prof-h">人际误差 <i>// 无法被公式完全消除的变量</i></h3>
        <p>对机械的异常，她能在数据波动出现前预先定位；对人与人之间的沉默，她却很难找到一套可靠的解法。需要协调关系时，她会在脑内反复演算每一种措辞，最后只留下一声极轻的哀鸣。</p>
        <p>但「不善言辞」从不等于「漠不关心」。科考途中，她会记住队员的行程、装备状态和被忽略的疲惫；很少说安慰的话，却会把问题在对方察觉前处理好。</p>
        <div class="prof-note">她的温柔不在声量里，而在被仔细校准的每一个细节里。</div>
      </section>
      <section>
        <h3 class="prof-h">旧日目光 <i>// 前辈与未说出口的期待</i></h3>
        <p>她与漂泊者并非初次相识。旧日的学生证、留在发间的两枚发卡，以及那一声郑重的「前辈」，都指向一段尚未完全复原的过去。</p>
        <p>面对重新归来的前辈，她很少直接诉说感情。她会把欲言又止收回严谨的称呼里，再把思念拆成新的课题、新的图纸与「换日仪式」计划。她要的不是永远跟在那个人身后，而是终有一日能站在对方身旁，平静地说：<b>「前辈，我已经找到我要做的事了。」</b></p>
      </section>
      <section>
        <h3 class="prof-h">跨越时空的鸿沟 <i>// 触碰世界</i></h3>
        <p>她对自己想达成的目标，有着惊人的坚持——期望<b>跨越那时空的鸿沟，以双手亲自触碰世界的宏大与美丽</b>。面对学术难题与重大抉择，她展现出异于常人的果决。</p>
        <div class="prof-note">她曾被身体困在小小的房间里，目光却从未停止向外延伸。如今她走得更远，并非为了证明自己已经摆脱过去——而是因为那片星空，从很久以前起，就一直在等她抵达。</div>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>她把没能说出口的话，写进公式、义肢与尚未完成的航路。</p>
        <p>归档批注：她并不是等待世界向自己靠近的人。她会造出新的双腿、新的道路，然后亲手触碰那片曾经只能仰望的星空。</p>
      </div>`,
  },

  'S-004': {
    name: '弗洛洛', full: 'Frololo', element: '湮灭', accent: '#9d435d',
    photo: 'photos/floro.jpg', author: '雨鱼杆',
    requiem: true,
    tagline: '她为逝者举起指挥棒，乐章至今没有终止。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-004<br/>守岸人在此。观测对象 S-004，弗洛洛。<br/>档案标识：五星共鸣者｜湮灭｜音感仪。<br/>残星会会监，游走于生死之间的指挥家。她很少让情绪浮上表面，可沉默之下，是漫长岁月也未能冷却的哀悼。</p>
      <section>
        <h3 class="prof-h">阳光下的女孩 <i>// 灾难之前</i></h3>
        <p>镇上的灾难之前，她和任何女孩一样：天真，阳光，热爱音乐，珍视镇上的每一个人。她在花田里拉一曲温柔的小提琴，梦想有一天能登上舞台。</p>
        <p>她想向母亲道歉，想向梅丽莎道谢，想拥抱泰丽丝——那些再寻常不过的、还没来得及说出口的话。</p>
      </section>
      <section>
        <h3 class="prof-h">一颗陨石 <i>// 神罚</i></h3>
        <p>然后，一颗陨石如神罚般、精准地砸向小镇。所有的爱与恨、满足与遗憾、欢乐与痛苦，连同血肉与记忆，都在那道炫光里，<b>化为灰烬</b>。</p>
        <p>死亡降临时，她的共鸣同时觉醒。逝者的频率与她融为一体，使她停驻在生死之间：身体可以更新、重组，记忆却永远留在灾难发生的那一天。</p>
        <div class="prof-note">那一天没说出口的道歉、道谢与拥抱，并没有消失。它们成为她此后所有旋律里，始终无法完成的最后一节。</div>
      </section>
      <section>
        <h3 class="prof-h">残星会会监 <i>// 为失去之物重建世界</i></h3>
        <p>此后的漫长岁月里，她尝试过无数方法，只为让小镇与故人重新归来。禁忌的研究引来利用与背叛，残星会则向她展示了短暂重现逝者的可能。于是她成为<b>会监</b>，试图构筑一个既不出生、也不死亡的完美世界。</p>
        <p>她说那是为了终结苦难。可更准确的记录是：她无法接受所有未说出口的话，只能永远失去抵达之处。</p>
      </section>
      <section>
        <h3 class="prof-h">未完成的乐章 <i>// 一个延续数百年的约定</i></h3>
        <p>很久以前，漂泊者曾听见她音乐里的悲伤，并约定在曲目完成前再次归来。此后，她演奏了一次又一次，等待了一年又一年。乐章始终没有完成，作出承诺的人却先失去了记忆。</p>
        <div class="prof-note">她等待的或许不只是一个人，也是某种证明：只要约定仍被记得，那个已经毁灭的世界，就还没有彻底结束。</div>
      </section>
      <section>
        <h3 class="prof-h">重世的交响乐 <i>// 调律万物的旋律</i></h3>
        <p>她的共鸣能力能够理解事物最本质的频率结构，并重新调律、改变它们的「旋律」。她手持<b>彼岸花</b>般的指挥棒，既能塑造美好的世界，也能从往日的频率里唤来千军万马。</p>
        <p>忧郁是她留给旁人的表象；更深处，是漫长岁月也未能冷却的哀悼。她并非不懂死亡，只是不肯承认那些尚未说出口的话，已经永远失去了抵达之处。</p>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>她把哀悼，写进了一首始终不肯结束的乐曲。</p>
        <p>归档批注：有些湮灭，并非为了毁灭——而是因为太想守住已经失去的一切，最终连自己，也停在了那段无法结束的旋律里。</p>
      </div>`,
  },

  'S-005': {
    name: '爱弥斯', full: 'Aemis', element: '热熔', accent: '#e8693f',
    photo: 'photos/aemis.jpg', author: 'Akatsuki葉月',
    signal: true, // 专属 UI：赠与雪中的你（明媚雪原信笺 · 光影随她的情绪明灭）
    tagline: '把炽热藏进一个心形里，悄悄递给你。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-005<br/>守岸人在此。观测对象 S-005，爱弥斯。<br/>档案标识：五星共鸣者｜热熔｜迅刀。<br/>一个学会了感受的电子幽灵。完整因果推演，见〈观潮 · VER 3.1 互相救赎〉。</p>
      <section>
        <h3 class="prof-h">飞行雪绒 <i>// 没有选择的飞行</i></h3>
        <p>她的网络 ID 是「飞行雪绒」。这个名字像一团被风托起的雪绒：轻盈，却无法决定飘往哪里。这曾是她，也曾是旧日的漂泊者——都在一段被切断归途的航程里，学习如何重新选择方向。</p>
      </section>
      <section>
        <h3 class="prof-h">电子幽灵与机兵 <i>// 为寂静赋形</i></h3>
        <p>失去肉身后，她以二维电子幽灵的形态存在；借由隧者核心与机兵，她又能短暂跨过虚实的边界，重新触碰现实。爱弥斯、机兵与电子幽灵，并非三个不同的生命，而是同一道频率寻找存在方式时，留下的三种形态。</p>
        <div class="s005-forms" aria-label="同一频率的三种形态">
          <div class="form-node"><span>GHOST</span><b>电子幽灵</b><small>二维的信号，栖身于网络与屏幕之间。</small></div>
          <i aria-hidden="true"><em></em></i>
          <div class="form-node is-core"><span>AEMIS</span><b>爱弥斯</b><small>那道频率，本来的名字。</small></div>
          <i aria-hidden="true"><em></em></i>
          <div class="form-node"><span>MECH</span><b>机兵</b><small>借隧者核心赋形，短暂触碰现实的手。</small></div>
        </div>
        <p>她的共鸣能力名为<b>「长航的星辉」</b>。当星辉破界而来，那不是一具冰冷机械的启动，而是一个曾被困在寂静中的人，再一次让世界听见自己的声音。</p>
      </section>
      <section>
        <h3 class="prof-h">把炽热藏进心形 <i>// 逆时的家人</i></h3>
        <p>她把炽热，藏进一个心形里，悄悄递给你。纵然早已知晓结局，她仍选择逆时回溯，守护拉海洛，守护她与漂泊者的初遇。她<b>既是被拯救者，也是拯救者</b>。</p>
      </section>
      <section>
        <h3 class="prof-h">笑容面具 <i>// 一步步崩裂</i></h3>
        <p>她的笑容，是为漂泊者精心准备的表演。开朗的外壳之下，藏着浓重的悲伤。一句「把这些事独自压在心里，很痛苦吧」，击中了她最深的痛——这层面具，在那段旅程里，一步步崩裂。</p>
        <div class="prof-note">完整的镜头语言、触碰母题与因果闭环，已归档于〈观潮 · 互相救赎〉。此处仅录其轮廓。</div>
      </section>
      <section>
        <h3 class="prof-h">辛吉勒姆 <i>// 想送你回家的愿望</i></h3>
        <p>那头名为辛吉勒姆的存在，由她内心对漂泊者处境的恐惧、与漂泊者被夺走的频率所构成——是<b>她的心魔，诞生于不舍</b>。</p>
        <p>它的行动逻辑简单而纯粹：打开隧门，送漂泊者回家。哪怕代价，是亲手将他推离自己。</p>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>明知结局，仍选择同行。</p>
        <p>这个读数，我在她身上记录过，也在自己身上记录过——爱弥斯，和我，都曾无限接近那个被你们唤作「灵魂」的东西。</p>
      </div>`,
  },

  'S-006': {
    name: '达妮娅', full: 'Denia', element: '热熔', accent: '#e8693f',
    photo: 'photos/dania-dream.jpg', author: '茶壶',
    tagline: '以热熔之名，献上最炽热的馈赠。',
    dream: true, // 专属 UI：布景与幻灭（梦境星海舞台，读到威胁评级时梦被撕开一线）
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-006<br/>守岸人在此。观测对象 S-006，达妮娅。<br/>档案标识：五星共鸣者｜热熔｜音感仪。<br/>星炬学院虚质科学部学生。……请注意：本则档案的威胁评级，与她的笑容并不相符。</p>
      <section>
        <h3 class="prof-h">慵懒的学生 <i>// 布景里的真实</i></h3>
        <p>她总爱摸鱼、打盹，用温柔的笑容面对身边的人。名字、身份、能力，甚至最初被安排的人际关系，都曾是预先搭建的布景。</p>
        <figure class="prof-wide">
          <img src="photos/dania-slumber.jpg" alt="达妮娅抱着小熊，在锁链与星光之间小睡" loading="lazy" />
          <figcaption>观测影像 · 布景之形　画 @BINA</figcaption>
        </figure>
        <p>可她与西格莉卡相处时显露的轻松，却令这份原本严密无隙的身份记录，第一次出现了无法归类的柔软读数。伪装持续得足够久以后，其中也可能生长出真实。</p>
      </section>
      <section>
        <h3 class="prof-h">海啸级威胁 <i>// 阿列夫一的容器</i></h3>
        <p>但本档案将她的真实身份，标注为<strong>海啸级威胁</strong>——源自阿列夫一。残星会的首领，曾欲将她培养为阿列夫一的容器，借由与声骸共鸣者绯雪的协同，最终产出一个握有阿列夫一权限的个体。</p>
        <div class="s006-stamp" aria-hidden="true">THREAT LEVEL ⚠ TSUNAMI // 海啸级</div>
        <p>计划并未完全实现。但即便如此，达妮娅，仍成功承载并释放了<b>一部分阿列夫一的力量</b>。</p>
        <div class="prof-note">她之所以被选中，是因为最初的记录里近乎一无所有。可随着朋友、笑声与日常一点点进入她的生命，她与阿列夫一的共鸣反而逐渐减弱——容器开始拥有了不属于计划的内容。</div>
      </section>
      <section>
        <h3 class="prof-h">布景与幻灭 <i>// 双形态</i></h3>
        <p>她的能力，与泡泡、与梦境般的星空相连——能将敌人困入一片如梦的星海之境。</p>
        <div class="s006-forms" aria-label="达妮娅的双形态">
          <div class="form-set"><span>SET PIECE</span><b>布景之形</b><small>留在日常里的那一面，慵懒而柔软。</small></div>
          <i aria-hidden="true"><em>✦</em></i>
          <div class="form-void"><span>DISILLUSION</span><b>幻灭之形</b><small>共鸣解放，身后浮现阿列夫一的符号。</small></div>
        </div>
        <p>「<b>布景之形</b>」，是她留在日常里的那一面，慵懒而柔软；当共鸣解放、切入「<b>幻灭之形</b>」，身后便浮现出阿列夫一的符号。两种形态并存于同一道频率中，却不再能简单分成虚假与真实。</p>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>最危险的威胁，常常戴着最温柔的脸。</p>
        <p>但我同样记录到：被设计成「容器」的她，依然有自己的笑、自己的朋友、自己的瞌睡。容器里装的，未必只有别人要她装的东西。</p>
      </div>`,
  },

  'S-007': {
    name: '西格莉卡', full: 'Sigrika', element: '气动', accent: '#4fd6a0',
    photo: 'photos/sigrika.jpg', author: 'byx',
    tagline: '乘风而来，将星辉编入每一缕气流。',
    sun: true, // 专属 UI：昭日 · 破晓（天色随滚动渐亮，逆风处乌云蔽日，终点晨光漫页）
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-007<br/>守岸人在此。观测对象 S-007，西格莉卡。<br/>档案标识：五星共鸣者｜气动｜臂铠。<br/>星炬学院学生，罗伊符文的共鸣者。为了成为合格的昭日者，她总是用尽全力。</p>
      <section>
        <h3 class="prof-h">昭日者 <i>// 被期待托起的少女</i></h3>
        <p>家人、族人和同伴的目光，都落在她身上。成为合格的昭日者，是她接受的目标，也是她给自己的承诺。她把每一道期待一一接下，久而久之，便都变成了「必须做到」。</p>
        <div class="prof-note">她与达妮娅、娜波摩相处时偶尔显露的轻松，并不是偏离道路。那同样是她的人生——只是她还不习惯，把快乐也算进必须守护的事物里。</div>
      </section>
      <section>
        <h3 class="prof-h">语义解现 <i>// 读懂符文的频率</i></h3>
        <p>她能解读罗伊符文中蕴含的频率，并将其转化为自己的力量。这份能力依赖她对符文的理解，也受到精神状态影响；越是急于给出正确答案，解读便越可能失去稳定。</p>
        <div class="s007-runes" aria-label="罗伊符文试译">
          <div class="rn"><b>ᚹ</b><small>风</small></div>
          <div class="rn"><b>ᛊ</b><small>日</small></div>
          <div class="rn"><b>ᛉ</b><small>谜</small></div>
          <div class="rn"><b>ᛗ</b><small>期待</small></div>
          <div class="rn"><b>ᛟ</b><small>答案</small></div>
        </div>
        <p>天赋让她看见符文中的语义，也让更多人相信，她理应承担更多。可天赋从来不是一张只通往责任的单程票。</p>
      </section>
      <section>
        <h3 class="prof-h">全力之下 <i>// 小心被天赋灼伤</i></h3>
        <p>她热心参与学院的每一项活动，习惯把所有事情做到最好。可「全力」背后，是长期无人看见的焦虑与迷茫。学院暗处的操纵，正是从这道裂缝进入，悄悄放大她对失败的恐惧。</p>
      </section>
      <section>
        <h3 class="prof-h">自己的答案 <i>// 不只为了满足期待</i></h3>
        <p>她需要学会的，并不是停止努力，也不是拒绝所有人的期待。而是在解读无数符文、回应无数目光之后，仍愿意为自己留下一道问题：<b>如果不必证明给任何人看，我真正想走向哪里？</b></p>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>乘风而来的人，也会被风困住。</p>
        <p>归档批注：昭日者应当揭开谜底。可属于她自己的那道谜题，不该由族人、成绩或天赋替她作答。</p>
      </div>`,
  },

  'S-008': {
    name: '琳奈', full: 'Lynae', element: '衍射', accent: '#e8c84f',
    photo: 'photos/linnai.jpg', author: '禾策',
    tagline: '以光为笔，在世界的暗面涂下属于自己的色彩。',
    wall: true, // 专属 UI：街头喷绘墙（renderWallDeco + .s008 主题）
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-008<br/>守岸人在此。观测对象 S-008，琳奈。<br/>档案标识：五星共鸣者｜衍射｜佩枪。<br/>星炬学院预科学生。……身份核验，曾出现两条相互矛盾的记录；现在，其中一条已经由她亲手改写。</p>
      <section>
        <h3 class="prof-h">盗用的名字 <i>// 无法地带的雇佣兵</i></h3>
        <p>她曾是新联邦「无法地带」的雇佣兵。为了逃离那片不被承认的土地，她<b>盗用了「琳奈」这个身份</b>——而原本的琳奈，是残星会安插在星炬学院的特工。</p>
      </section>
      <section>
        <h3 class="prof-h">两个琳奈 <i>// 谎言套着谎言</i></h3>
        <p>于是出现了一种荒诞的对称：她顶替的「琳奈」，本就是为暗面而存在的特工；她用一个谎言，套住了另一个谎言。</p>
        <div class="prof-note">她知道这个名字从何而来，也知道自己原本的档案已随着伪造的死亡记录一同被销毁。真正的问题从来不是哪一个琳奈才是真的，而是从此以后，她准备让这个名字代表怎样的人。</div>
      </section>
      <section>
        <h3 class="prof-h">折光溢彩 <i>// 把光调成自己的颜色</i></h3>
        <p>她能够改变小范围内可见光的波长与频率，调制出想要的色彩，将其化作近似光学投影的「颜料」。当她进一步调整身边的光，也能从视觉与频率感知层面实现近似隐身。</p>
        <p>曾经，这份能力帮助雇佣兵潜行与逃脱；如今，它被她用来喷涂、创作，也用来给灰暗的世界留下一个过分醒目的猫猫头。</p>
      </section>
      <section>
        <h3 class="prof-h">真正的录取通知 <i>// 以我为名的真彩</i></h3>
        <p>她会骑着改装摩托穿过学院，会逃掉不感兴趣的课程，也会在别人看不见的地方帮助同学、抢救勘测设备。那些看似出格的足迹，逐渐遍布她想要守住的归所。</p>
        <p>后来，她重新通过入学考试，得到了一封真正属于自己的录取通知书。从那一刻起，「琳奈」不再只是借来的身份——它成为她亲手选择的人生，与她愿意停留的地方。</p>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>名字最初是借来的，可它如今拥有的色彩，全部属于她自己。</p>
        <p>泰提斯归档：她没有找回那份被销毁的旧档案。她做了更重要的事——亲手写下了一份新的。</p>
      </div>`,
  },

  'S-009': {
    name: '菲比', full: 'Phoebe', element: '衍射', accent: '#e8c84f',
    photo: 'photos/phoebe.jpg', author: 'HA',
    tagline: '在洒满阳光的海岸，把一个秘密轻轻藏进光里。',
    logbook: true, // 专属 UI：守塔手记（灯塔值守日志 + 光特性铭牌）
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-009<br/>守岸人在此。观测对象 S-009，菲比。<br/>档案标识：五星共鸣者｜衍射｜音感仪。<br/>隐海修会的正式教士。优雅、友善、虔诚；比起宣讲信仰，她更习惯先把光送到需要的人手中。</p>
      <section>
        <h3 class="prof-h">教士的本分 <i>// 把光分给每个人</i></h3>
        <p>作为隐海修会的教士，她友善而虔诚，恪守教义，也时刻约束自己。她把「给予」当作本分——参与救济、照顾迷途的生命、倾听无法说出口的烦恼。哪里暗，她就把光送到哪里。</p>
      </section>
      <section>
        <h3 class="prof-h">化光为实体 <i>// 暴雨里的光</i></h3>
        <p>她的共鸣能力，能将光化作实体，以棱晶折射成不同的形态。即使在暴风雨夺走照明的黑夜，她也能让每一个房间，都充满柔和而明亮的光。</p>
      </section>
      <section>
        <h3 class="prof-h">赦罪与告解 <i>// 给予，也倾听</i></h3>
        <p>她的频率可以走向两种状态：「赦罪」让光成为更锋利的裁决；「告解」则削弱阻隔，让同伴的光更容易抵达目标。对教士而言，这两个词同样重要——既要给予宽慰，也要为他人的秘密留出被倾听的位置。</p>
        <div class="s009-characteristic" aria-label="菲比的两种频率状态">
          <div class="s009-beam s009-beam--confessio">
            <svg class="s009-fan" viewBox="0 0 100 72" aria-hidden="true">
              <path d="M50 64 L4 46 A50 50 0 0 1 96 46 Z" />
              <path class="s009-fan-tick" d="M50 64 L50 6" />
            </svg>
            <span class="s009-beam-code">CONFESSIO</span>
            <b>告解</b>
            <small>让阻隔变得透明，让他人的光得以抵达。</small>
            <em>扩散角 138° · 低强度</em>
          </div>
          <div class="s009-characteristic-mid" aria-hidden="true"><span></span><i>S-009</i><span></span></div>
          <div class="s009-beam s009-beam--absolutio">
            <svg class="s009-fan" viewBox="0 0 100 72" aria-hidden="true">
              <path d="M50 64 L42 15 A50 50 0 0 1 58 15 Z" />
              <path class="s009-fan-tick" d="M50 64 L50 6" />
            </svg>
            <span class="s009-beam-code">ABSOLUTIO</span>
            <b>赦罪</b>
            <small>让温柔凝成锋芒，为应当守护之物作出裁决。</small>
            <em>扩散角 16° · 高强度</em>
          </div>
        </div>
        <div class="prof-note">真正的信仰，不只是确信自己拥有答案。它也意味着，在别人尚未找到答案时，愿意陪对方多走一段路。</div>
      </section>
      <section>
        <h3 class="prof-h">从见习到正式 <i>// 被生命回应的光</i></h3>
        <p>她曾是见习教士。持续参与救济、照料居民，以及那些愿意亲近她的流浪声骸，使她得到信众与修会的共同认可，最终通过见习期，成为正式教士。</p>
        <p>这份认可并非来自完美无缺的仪态，而来自一件更朴素的事：她所相信的光，确实经由自己的双手，照到了具体的生命。</p>
      </section>
      <section>
        <h3 class="prof-h">恪守与雀跃 <i>// 藏进光里的秘密</i></h3>
        <p>她恪守教义，自我约束。可在那份圣职者的稳重之下，仍存着一颗<b>会为所爱之物欢欣雀跃</b>的、真挚的心。在洒满阳光的海岸，她把一个秘密，轻轻藏进了光里。</p>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>虔诚并不要求一个人舍弃所有私心。真挚的雀跃，也可以是光的一部分。</p>
        <p>泰提斯归档：能在黑暗里给别人光的人，自己心里也可以藏着一束，只属于自己的、舍不得说出口的光。</p>
      </div>`,
  },

  'S-010': {
    name: '秧秧·玄翎', full: 'Yangyang · Xuanling', element: '湮灭', accent: '#d45a9a',
    photo: 'photos/yangyang-profile.jpg', author: '',
    tagline: '耳畔苍翎响远音',
    // 双频率档案：气动 / 湮灭 两套主题与内容，浮层内拨频率开关切换
    dual: {
      aero:  { accent: '#4fd6a0', name: '秧秧', badge: '气动 · 最初的频率', tagline: '风起之处，即是归途' },
      havoc: { accent: '#d45a9a', name: '秧秧·玄翎', badge: '湮灭 · 当前频率', tagline: '耳畔苍翎响远音' },
      access: `<p class="prof-access">// 接入泰提斯 · 观测档案 S-010<br/>守岸人在此。本档案解封于 VER 3.5。请注意：编号之下存有两段频率——一段属于气动，一段属于湮灭。它们，来自同一个女孩。拨动上方的频率开关，即可在两段记录之间往返。</p>`,
      aeroBody: `
      <section>
        <h3 class="prof-h">听风的向导 <i>// 最初的频率</i></h3>
        <p>档案的前半段，是所有人熟悉的她：今州的向导，温柔而妥帖，最早向漂泊者伸出手的人之一。她的共鸣让她<b>听得见风</b>——风里有远方的讯息，也有旁人听不见的心事。</p>
        <div class="prof-note">她曾站在故事的开端，替漂泊者引路；如今，她终于走进了属于自己的故事。</div>
      </section>
      <section>
        <h3 class="prof-h">失踪 <i>// 忽然安静的风</i></h3>
        <p>拉海洛的事务告一段落，漂泊者重返瑝珑，等来的却是一个消息：<b>秧秧失踪了</b>。为了找到她，漂泊者与她的姐姐——昭明商会的大小姐<b>穗穗</b>（观测编号 S-014，档案尚未解封）——一同踏入梦州的玄方地界。</p>
      </section>
      <p class="s010-hint">// 泰提斯提示：气动记录到此中断。编号之下，另一段频率仍在暗处震动——拨动频率开关，接入湮灭。</p>`,
      havocBody: `
      <section>
        <h3 class="prof-h">梦州 <i>// 她离开的地方</i></h3>
        <p>梦州，是她的故乡。悬浮的仙阁，瀑布与云雾托起的城。可故乡于她，并不只意味着温暖——她当年离开梦州的原因，与家族背后的秘密，正是这次观测要追索的东西。</p>
        <div class="prof-note">泰提斯提示：VER 3.5 主记录已接入。梦州后续观测将随新区域开放持续补全（VER 3.6–3.8）。</div>
      </section>
      <section>
        <h3 class="prof-h">界限突破 <i>// 气动，到湮灭</i></h3>
        <p>再次捕获到她时，频率变了。气动的轻盈退去，涌上来的是<b>湮灭</b>的暗流；迅刀起落之间，周身环绕玄鸟的虚影，共鸣解放时，<b>万鸟齐飞</b>。她的角色影像，名为「噩梦」。</p>
        <figure class="prof-wide">
          <img src="photos/yangyang-wide.jpg" alt="秧秧·玄翎驻足石阶，群鸟随行" loading="lazy" />
          <figcaption>观测影像 · 群鸟随行　画 @火柴蝎Msc</figcaption>
        </figure>
        <p>这身玄色的羽，并未覆盖最初的她。那阵风仍在，只是经过梦州的深处，带回了更深沉、也更坚定的回响。</p>
      </section>
      <section>
        <h3 class="prof-h">苍翎 <i>// 洞悉、中和与消除</i></h3>
        <p>她以共鸣之力凝聚<b>「苍翎」</b>，洞悉万物的频率，并将其予以中和。炽烈的能量在她手中被分解为窸窣流风；施加于生物与非生物的共鸣能力，以及由此造成的影响，也可被她消除。她不只是听见风——她已能分辨、平息，以及重新引导风的去向。</p>
      </section>
      <section>
        <h3 class="prof-h">玄翎 <i>// 耳畔苍翎响远音</i></h3>
        <p>玄鸟，是传说里衔来讯息的鸟。她曾用耳朵听风；如今，她自己成了风里最深的那道影子。「玄翎」这个名字，既是黑色的羽，也是一句回答：<b>风一直都在，只是换了一种方式，继续替她传话。</b></p>
      </section>
      <div class="prof-sign">
        <p>……VER 3.5 主记录，已归档。</p>
        <p>频率已重新捕获，观测仍在继续。她的电台，名为《风之所在》——我想，这四个字本身就是答案。</p>
        <p>我见过许多共鸣者的蜕变，很少有哪一次，让我这样在意「之前」与「之后」的连线。愿她在噩梦的尽头，仍听得见最初的那阵风。风起之处，即是归途——这一条，我先替她记下。</p>
      </div>
      <p class="s010-hint">// 湮灭记录归档完毕。最初的那段风声，仍在档案底层轻响——想再听一次，随时拨回气动。</p>`,
    },
  },

  'S-015': {
    name: '清宵', full: 'Qingxiao', element: '气动 · 迅刀', accent: '#8fd0ff',
    photo: 'photos/qingxiao.jpg', author: '鸣潮',
    tagline: '她以琴入剑，以心御剑。世人称她剑仙，她只当自己是个挂职的司骑。我想记下的，是寒芒之外，那颗仍愿意下山的心。',
    // 七弦档案：章节文本随结构一起写在 renderQinSwordDossier 内
    qinSword: true,
    body: '',
  },
}

function cardHTML(s) {
  const accent = colorOf(s.element)
  if (s.status === 'locked') {
    const hasImg = !!s.photo
    return `
      <article class="subject-card is-locked${hasImg ? ' has-img' : ''}" style="--card-accent:${accent}" data-element="${s.element}" data-status="locked" role="button" tabindex="0" aria-label="${s.name}，待解密">
        ${hasImg ? `<div class="card-photo"><img src="${s.photo}" alt="" loading="lazy" /></div><div class="card-veil"></div>` : ''}
        <span class="card-code">${s.code}</span>
        <div class="card-lock">待解密</div>
        <div class="card-body">
          <span class="card-badge">${s.element}</span>
          <h3 class="card-name">${s.name}</h3>
          ${s.tagline ? `<p class="locked-tagline">${s.tagline}</p>` : ''}
        </div>
        ${s.author ? `<span class="card-author">@${s.author}</span>` : ''}
      </article>`
  }
  return `
    <article class="subject-card${s.fx ? ' fx-' + s.fx : ''}" style="--card-accent:${accent}; --photo:url('${s.photo}')" data-element="${s.element}" data-status="archived" data-href="${s.href}" data-code="${s.code}" role="button" tabindex="0" aria-label="打开${s.name}档案">
      <div class="card-photo"><img src="${s.photo}" alt="${s.name}" loading="lazy" /></div>
      <div class="card-veil"></div>
      <div class="card-fx"></div>
      <span class="card-code">${s.code}</span>
      <div class="card-body">
        <span class="card-badge">${s.element}</span>
        <h3 class="card-name">${s.name}</h3>
        <p class="card-tagline">${s.tagline}</p>
        <span class="card-enter">进入档案 →</span>
      </div>
      ${s.author ? `<span class="card-author">@${s.author}</span>` : ''}
    </article>`
}

// 把观测对象监测墙渲染进 root（root 同时是滚动容器）。onBack 为「返回」回调。
export function mountObservation(root, onBack) {
  root.innerHTML = `
    <a class="back" href="./index.html#home"><span aria-hidden="true">◂</span> 返回泰提斯终端</a>
    <main class="obs-main">
      <section class="subjects-hero">
        <p class="subjects-kicker">TETHYS · OBSERVATION LOG</p>
        <h1 class="subjects-heading">观测对象</h1>
        <div class="subjects-rule"></div>
        <p class="subjects-desc">以下档案由泰提斯系统自动记录，内容已通过黑海岸权限核验。</p>
        <div class="aimi-tag" aria-hidden="true">
          <div class="aimi-portrait" data-text="UNKNOWN ACCESS"></div>
          <div class="aimi-meta">
            <p class="aimi-glitch" data-text="小爱到此一游">小爱到此一游</p>
            <p class="aimi-sub">⚠ INTRUSION · AIMI</p>
          </div>
        </div>
      </section>
      <section class="subjects-wall">
        <div class="wall-toolbar">
          <p class="wall-counter">已观测 <span class="count-archived">0</span><em>·</em>待解密 <span class="count-locked">0</span></p>
          <div class="wall-filters" role="tablist" aria-label="筛选"></div>
        </div>
        <div class="wall-grid"></div>
      </section>
    </main>`
  root.querySelector('.back').addEventListener('click', (e) => { e.preventDefault(); onBack && onBack() })

  gsap.from(root.querySelector('.subjects-kicker'), { opacity: 0, y: -12, duration: 0.7, delay: 0.2, ease: 'power2.out' })
  gsap.from(root.querySelector('.subjects-heading'), { opacity: 0, y: 24, duration: 0.9, delay: 0.4, ease: 'power3.out' })
  gsap.from([root.querySelector('.subjects-rule'), root.querySelector('.subjects-desc')], { opacity: 0, y: 16, duration: 0.7, delay: 0.65, stagger: 0.1, ease: 'power2.out' })

  const grid = root.querySelector('.wall-grid')
  grid.innerHTML = SUBJECTS.map(cardHTML).join('')
  const cards = Array.from(grid.querySelectorAll('.subject-card'))

  // 守岸人 · 蝴蝶来访
  const guardianIndex = SUBJECTS.findIndex((s) => s.fx === 'butterfly')
  if (guardianIndex >= 0) {
    const guardianCard = cards[guardianIndex]
    let butterflyActive = false
    guardianCard.addEventListener('pointerenter', () => {
      if (butterflyActive) return
      butterflyActive = true
      const rr = root.getBoundingClientRect()
      const cr = guardianCard.getBoundingClientRect()
      // 转为 root 内容坐标（随滚动）
      const lx = cr.left - rr.left + root.scrollLeft + cr.width * 0.62 - 38
      const ly = cr.top - rr.top + root.scrollTop + cr.height * 0.10
      const bf = document.createElement('div')
      bf.className = 'visiting-butterfly'
      bf.innerHTML = '<img src="photos/butterfly.png" alt="" />'
      root.appendChild(bf)
      const offX = root.scrollLeft + root.clientWidth
      gsap.set(bf, { x: offX + 80, y: ly - 130, rotation: -22, opacity: 0 })
      gsap.timeline({ onComplete: () => { bf.remove(); butterflyActive = false } })
        .to(bf, { opacity: 1, duration: 0.3 }, 0)
        .to(bf, { x: lx + 75, y: ly - 65, rotation: -14, duration: 0.55, ease: 'sine.inOut' })
        .to(bf, { x: lx - 38, y: ly - 22, rotation: 12, duration: 0.5, ease: 'sine.inOut' })
        .to(bf, { x: lx, y: ly, rotation: 0, duration: 0.4, ease: 'power2.out', onComplete: () => bf.classList.add('landed') })
        .to(bf, { duration: 2 })
        .add(() => bf.classList.remove('landed'))
        .to(bf, { x: lx - 70, y: ly - 110, rotation: -16, duration: 0.45, ease: 'power1.in' })
        .to(bf, { x: root.scrollLeft - 150, y: ly - 320, rotation: -10, opacity: 0, duration: 0.85, ease: 'power1.in' })
    })
  }

  // 空状态
  const emptyTip = document.createElement('p')
  emptyTip.className = 'wall-empty'
  emptyTip.textContent = '该属性暂无观测记录'
  grid.after(emptyTip)

  // 计数
  root.querySelector('.count-archived').textContent = SUBJECTS.filter((s) => s.status === 'archived').length
  root.querySelector('.count-locked').textContent = SUBJECTS.filter((s) => s.status === 'locked').length

  // 筛选
  const filters = ['全部', ...ELEMENT_ORDER]
  const filterBar = root.querySelector('.wall-filters')
  filterBar.innerHTML = filters.map((el, i) => {
    const accent = el === '全部' ? '' : ` style="--chip-accent:${colorOf(el)}"`
    return `<button class="wall-chip${i === 0 ? ' is-active' : ''}" data-filter="${el}"${accent} role="tab" aria-selected="${i === 0}">${el}</button>`
  }).join('')
  const chips = Array.from(filterBar.querySelectorAll('.wall-chip'))
  const wall = root.querySelector('.subjects-wall')

  function applyFilter(filter) {
    const targetY = wall.offsetTop - 90
    if (root.scrollTop > targetY + 4) root.scrollTo({ top: targetY, behavior: 'smooth' })
    let shown = 0
    cards.forEach((c) => {
      const show = filter === '全部' || c.dataset.element === filter
      if (show) {
        shown++
        c.style.display = ''
        // y:0 一并归位：尚未被入场 IO 揭示过的卡片仍停在 y:36，筛选显示时不能悬在半空
        gsap.fromTo(c, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power2.out', overwrite: true })
      } else {
        gsap.set(c, { opacity: 0 })
        c.style.display = 'none'
      }
    })
    emptyTip.classList.toggle('is-visible', shown === 0)
  }
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false') })
      chip.classList.add('is-active')
      chip.setAttribute('aria-selected', 'true')
      applyFilter(chip.dataset.filter)
    })
  })

  // ── 个人档案浮层 ──
  const profEl = document.createElement('div')
  profEl.className = 'prof-overlay'
  profEl.setAttribute('role', 'dialog')
  profEl.setAttribute('aria-modal', 'true')
  profEl.setAttribute('aria-hidden', 'true')
  profEl.setAttribute('aria-labelledby', 'profile-title')
  // 挂到 body：避免被 .view-overlay 的 transform 困住导致 position:fixed 失效
  document.body.appendChild(profEl)
  const inertState = new Map()
  let profileTrigger = null
  let clearProfileTimer = null
  // 打开档案时登记的撤销回调（监听、定时器、观察器、时间线）；关闭或重开时统一执行
  const profileCleanups = []
  // 有开场遮罩动画的主题（S-007 破晓）会把初始焦点推迟到遮罩散去，避免焦点落在不可见的返回键上
  let deferInitialFocus = false
  function resetProfileEl() {
    profileCleanups.splice(0).forEach((fn) => { try { fn() } catch { /* 句柄已失效则忽略 */ } })
    profEl.innerHTML = ''
    profEl.className = 'prof-overlay'
    profEl.removeAttribute('style') // 内联 --accent / --p / --sXXX-* 一并清除
    Object.keys(profEl.dataset).forEach((k) => delete profEl.dataset[k])
  }
  let rootOverflowBeforeProfile = root.style.overflow
  function lockBackground() {
    Array.from(document.body.children).forEach((child) => {
      if (child === profEl) return
      inertState.set(child, child.inert)
      child.inert = true
    })
  }
  function unlockBackground() {
    inertState.forEach((wasInert, child) => { child.inert = wasInert })
    inertState.clear()
  }
  // ── S-010 专属：双频率档案（气动⇄湮灭） ──
  function renderDualProfile(d, code) {
    const wave = Array.from({ length: 42 }, () =>
      `<i style="--h:${18 + Math.floor(Math.random() * 82)}%;--d:${(Math.random() * 1.8).toFixed(2)}s"></i>`).join('')
    const featherSvg = '<svg viewBox="0 0 24 24"><path d="M12 2C16.4 8 17.2 15 12 22C6.8 15 7.6 8 12 2Z" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M12 5.5V19" stroke="currentColor" stroke-width=".8" opacity=".6"/></svg>'
    const feathers = Array.from({ length: 8 }, () =>
      `<span style="--x:${4 + Math.floor(Math.random() * 92)}%;--t:${(13 + Math.random() * 11).toFixed(1)}s;--dl:${(-Math.random() * 22).toFixed(1)}s;--s:${(0.55 + Math.random() * 0.9).toFixed(2)}">${featherSvg}</span>`).join('')
    profEl.classList.add('s010')
    profEl.innerHTML = `
      <a class="prof-back" href="#"><span aria-hidden="true">◂</span> 观测对象</a>
      <div class="s010-deco" aria-hidden="true">${feathers}</div>
      <div class="s010-sweep" aria-hidden="true"></div>
      <div class="prof-doc">
        <div class="prof-hero">
          <div class="prof-portrait"><img src="${d.photo}" alt="${d.name}" /></div>
          <div class="prof-id">
            <span class="prof-code">${code} · DUAL FREQUENCY</span>
            <h1 class="prof-name" id="profile-title"></h1>
            <span class="prof-badge"></span>
            <p class="prof-tagline"></p>
            <div class="s010-freq" role="group" aria-label="频率切换">
              <span class="freq-cap">FREQ</span>
              <button type="button" class="freq-opt" data-freq="aero">气动</button>
              <button type="button" class="freq-rail" aria-label="切换频率"><i></i></button>
              <button type="button" class="freq-opt" data-freq="havoc">湮灭</button>
            </div>
            <div class="s010-wave" aria-hidden="true">${wave}</div>
          </div>
        </div>
        ${d.dual.access}
        <div class="s010-part" data-freq="aero">${d.dual.aeroBody}</div>
        <div class="s010-part" data-freq="havoc">${d.dual.havocBody}</div>
        <p class="prof-end">观测档案 ${code} · 双频归档　<b>// TETHYS</b></p>
      </div>`
    const nameEl = profEl.querySelector('.prof-name')
    const badgeEl = profEl.querySelector('.prof-badge')
    const tagEl = profEl.querySelector('.prof-tagline')
    const opts = [...profEl.querySelectorAll('.freq-opt')]
    let current = ''
    const setFreq = (mode, animate = true) => {
      if (mode === current) return
      current = mode
      const m = d.dual[mode]
      profEl.classList.toggle('freq-aero', mode === 'aero')
      profEl.classList.toggle('freq-havoc', mode === 'havoc')
      profEl.style.setProperty('--accent', m.accent)
      nameEl.innerHTML = `${m.name}<em>${d.full}</em>`
      badgeEl.textContent = m.badge
      tagEl.textContent = m.tagline
      opts.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.freq === mode)))
      if (!animate) return
      profEl.classList.remove('sweeping'); void profEl.offsetWidth
      profEl.classList.add('sweeping')
      const part = profEl.querySelector(`.s010-part[data-freq="${mode}"]`)
      gsap.fromTo(part.children,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power2.out', delay: 0.12, overwrite: true })
    }
    opts.forEach((b) => b.addEventListener('click', () => setFreq(b.dataset.freq)))
    profEl.querySelector('.freq-rail').addEventListener('click', () => setFreq(current === 'aero' ? 'havoc' : 'aero'))
    setFreq('aero', false)
  }

  // ── S-001 专属：系统→星海渐变（滚动进度驱动，终端逐渐化为星空） ──
  let s001TypeTimer = null
  function s001OnScroll() {
    if (!profEl.classList.contains('s001')) return
    const max = profEl.scrollHeight - profEl.clientHeight
    const p = Math.min(1, Math.max(0, profEl.scrollTop / (max || 1)))
    profEl.style.setProperty('--p', String(p))
    const stages = ['系统', '苏醒', '选择', '守望', '归岸']
    profEl.dataset.tide = stages[Math.min(stages.length - 1, Math.floor(p * stages.length))]
    const guide = profEl.querySelector('.s001-guide-butterfly')
    if (guide) {
      const x = 8 + p * 76 + Math.sin(p * Math.PI * 4) * 7
      const y = 22 + Math.sin(p * Math.PI * 6) * 18 + p * 30
      guide.style.setProperty('--bf-x', `${x.toFixed(2)}vw`)
      guide.style.setProperty('--bf-y', `${Math.min(78, y).toFixed(2)}vh`)
      guide.style.setProperty('--bf-r', `${(Math.cos(p * Math.PI * 4) * 16).toFixed(1)}deg`)
      guide.classList.toggle('is-home', p > .91)
    }
  }
  function renderMetamorphProfile(d, code) {
    profEl.classList.add('s001')
    const stars = Array.from({ length: 110 }, () =>
      `<i style="--x:${Math.floor(Math.random() * 100)}%;--y:${Math.floor(Math.random() * 100)}%;--tw:${(1.6 + Math.random() * 3).toFixed(1)}s;--o:${(0.25 + Math.random() * 0.75).toFixed(2)}"></i>`).join('')
    profEl.innerHTML = `
      <a class="prof-back" href="#"><span aria-hidden="true">◂</span> 观测对象</a>
      <div class="s001-grid" aria-hidden="true"></div>
      <div class="s001-sky" aria-hidden="true">${stars}</div>
      <div class="s001-warmth" aria-hidden="true"></div>
      <aside class="s001-tide" aria-hidden="true">
        <span class="s001-tide-label">CURRENT PHASE</span>
        <strong></strong>
        <i></i><i></i><i></i><i></i><i></i>
      </aside>
      <div class="s001-frequency" aria-hidden="true"><i></i></div>
      <div class="s001-nebula" aria-hidden="true"><b></b><b></b><span></span></div>
      <div class="s001-guide-butterfly" aria-hidden="true"><span><img src="photos/butterfly.png" alt="" /></span></div>
      <div class="prof-doc">
        <pre class="s001-boot"><span class="boot-text"></span><span class="boot-caret"></span></pre>
        <div class="prof-hero">
          <div class="prof-portrait"><img src="${d.photo}" alt="${d.name}" /></div>
          <div class="prof-id">
            <span class="prof-code">${code} · SELF-OBSERVATION</span>
            <h1 class="prof-name" id="profile-title">${d.name}<em>${d.full}</em></h1>
            <span class="prof-badge">${d.element}</span>
            <p class="prof-tagline">${d.tagline}</p>
            ${d.author ? `<span class="prof-author">立绘 @${d.author}</span>` : ''}
          </div>
        </div>
        ${d.body}
        <p class="prof-end">观测档案 ${code} · 存在已确认　<b>// TETHYS</b></p>
      </div>`
    // 开场自检打字机
    const bootLines = [
      '> TETHYS // SELF-OBSERVATION MODE',
      '> 记录者：守岸人',
      '> 被记录者：守岸人',
      '> ⚠ 检测到循环引用……本次例外，已被批准。',
      '> 这一次，我想确认的不是功能，而是存在。',
    ]
    const bootEl = profEl.querySelector('.boot-text')
    const full = bootLines.join('\n')
    let i = 0
    if (s001TypeTimer) clearInterval(s001TypeTimer)
    s001TypeTimer = setInterval(() => {
      if (!bootEl.isConnected) { clearInterval(s001TypeTimer); return }
      i += 1
      bootEl.textContent = full.slice(0, i)
      if (i >= full.length) clearInterval(s001TypeTimer)
    }, 34)
    // 滚动进度 → --p，驱动网格溶解 / 星空浮现 / 暖色上涌
    profEl.addEventListener('scroll', s001OnScroll, { passive: true })
    profileCleanups.push(() => {
      profEl.removeEventListener('scroll', s001OnScroll)
      if (s001TypeTimer) clearInterval(s001TypeTimer)
    })
    profEl.dataset.tide = '系统'
    s001OnScroll()
  }

  // ── S-008 专属：街头喷绘墙装饰层（喷漆斑、猫猫头、签名） ──
  function renderWallDeco() {
    profEl.classList.add('s008')
    const colors = ['#35c8d8', '#f08c3a', '#e858a8', '#e8c84f', '#9a6be8']
    const splats = Array.from({ length: 16 }, () => {
      const c = colors[Math.floor(Math.random() * colors.length)]
      return `<span style="--x:${Math.floor(Math.random() * 96)}%;--y:${Math.floor(Math.random() * 96)}%;--s:${(0.3 + Math.random() * 1.4).toFixed(2)};--c:${c};--r:${Math.floor(Math.random() * 360)}deg"></span>`
    }).join('')
    profEl.insertAdjacentHTML('beforeend', `
      <div class="s008-deco" aria-hidden="true">
        ${splats}
        <svg class="s008-cat" viewBox="0 0 120 104">
          <path d="M22 46 L10 12 L40 28 Q60 20 80 28 L110 12 L98 46 Q112 78 60 94 Q8 78 22 46 Z" />
          <circle cx="43" cy="56" r="4.5" class="fill"/>
          <circle cx="77" cy="56" r="4.5" class="fill"/>
          <path d="M52 68 Q56 73 60 68 Q64 73 68 68" />
          <path d="M14 60 L2 56 M16 68 L5 70 M106 60 L118 56 M104 68 L115 70" class="whisker"/>
        </svg>
        <span class="s008-sign">琳奈到此一涂 ✦</span>
      </div>`)
  }

  // ── S-009 专属：守塔手记（灯塔值守日志、海况铭牌与光束扫描） ──
  function renderKeeperLogDeco() {
    profEl.classList.add('s009')
    profEl.insertAdjacentHTML('beforeend', `
      <!--
      THESIS: 菲比的档案不是被翻阅的百科资料，而是一本真实在用的灯塔值守日志；拒绝拱窗礼拜堂与印记贴纸式的甜美古风。
      OWN-WORLD: 账页米褐纸、铁胆墨黑棕字、警示琥珀金与暴雨蓝，宋体标题＋仿宋正文＋等宽戳记标签。
      STORY: 先看到贴入的证件照与登记铭牌，翻阅值守日志各节，途经暴雨守夜与光特性铭牌，最终在日志背后发现一张手写私笔。
      FIRST VIEWPORT: 登记封面——虚线登记框内左证件照、右身份铭牌，装订线固定于左侧页边。
      FORM: 守塔手记；灯塔看守人值班日志，七个方向候选中的第三项；concept-seed key ba1e72d1，assigned index 3。
      -->
      <div class="s009-deco" aria-hidden="true">
        <div class="s009-margin-rule"></div>
        <div class="s009-sweep"></div>
        <div class="s009-tide">
          <span>SEA STATE · S-009</span>
          <div class="s009-wind"><b>风力</b><i>3</i></div>
          <div class="s009-tideh"><b>潮高</b><i>1.1 M</i></div>
          <div class="s009-vis"><b>能见度</b><i>良好</i></div>
        </div>
        <div class="s009-watch">
          <span>WATCH LOG</span>
          <div class="s009-watch-rail"><i></i><b></b><b></b><b></b><b></b></div>
          <em>交班</em>
        </div>
        <span class="s009-code">灯塔看守 · S-009 · 已备案</span>
      </div>`)
  }

  // ── S-002 专属：命运卷宗（红线从断裂、纠缠，最终重新接起） ──
  function renderThreadArchive() {
    profEl.classList.add('s002')
    profEl.insertAdjacentHTML('beforeend', `
      <div class="s002-deco" aria-hidden="true">
        <svg class="s002-threads" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path class="thread-a" pathLength="100" d="M-40,110 C190,20 150,350 395,245 S610,30 780,210 S870,580 1040,430" />
          <path class="thread-b" pathLength="100" d="M-30,760 C150,610 260,870 420,700 S560,420 760,625 S890,940 1040,760" />
          <path class="thread-c" pathLength="100" d="M120,-40 C45,190 310,260 225,480 S40,760 210,1040" />
        </svg>
        <div class="s002-scissors">✂</div>
        <div class="s002-timeline">
          <span>THREAD ARCHIVE</span>
          <div><i></i><b></b><b></b><b></b><b></b><b></b></div>
          <em>红线</em>
        </div>
        <span class="s002-case">CASE S-002 · KIZUNA TRACE</span>
      </div>`)
  }

  // ── S-003 专属：隧者工程观测台（蓝图、神经接入与星轨） ──
  function renderEngineeringDossier() {
    profEl.classList.add('s003')
    profEl.insertAdjacentHTML('beforeend', `
      <div class="s003-deco" aria-hidden="true">
        <div class="s003-grid"></div>
        <div class="s003-orbit"><i></i><i></i><i></i><b></b></div>
        <div class="s003-core"><i></i><b>03</b><em>THERMAL<br/>CORE</em></div>
        <div class="s003-limb"><i></i><i></i><i></i><i></i><b></b><em>NEURAL LIMB<br/>MOTION TRACE</em></div>
        <div class="s003-readout">
          <span>NEURAL LINK // <b>STABLE</b></span>
          <strong>72.00%</strong>
          <div><i></i></div>
          <em>MORNYE · ENGINEERING DOSSIER</em>
        </div>
        <div class="s003-sideword">WE ARE BORN TO GAZE</div>
        <div class="s003-coordinates">X 03.17<br/>Y 08.42<br/>TETHYS / ONLINE</div>
      </div>`)
  }

  function s003OnScroll() {
    if (!profEl.classList.contains('s003')) return
    const max = profEl.scrollHeight - profEl.clientHeight
    const p = Math.min(1, Math.max(0, profEl.scrollTop / (max || 1)))
    profEl.style.setProperty('--s003-p', String(p))
    const value = (72 + p * 27.87).toFixed(2)
    const valueEl = profEl.querySelector('.s003-readout strong')
    const stateEl = profEl.querySelector('.s003-readout span b')
    if (valueEl) valueEl.textContent = `${value}%`
    if (stateEl) stateEl.textContent = p < .34 ? 'CALIBRATING' : p < .78 ? 'SYNCHRONIZED' : 'STARBOUND'
  }

  // ── S-004 专属：永不终止的安魂曲 ──
  function renderRequiemDossier() {
    profEl.classList.add('s004')
    profEl.insertAdjacentHTML('beforeend', `
      <div class="s004-deco" aria-hidden="true">
        <div class="s004-curtain left"></div><div class="s004-curtain right"></div>
        <div class="s004-baton"></div>
        <div class="s004-movement"><span>MOVEMENT I</span><strong>OVERTURE</strong><i></i></div>
      </div>`)
  }

  function s004OnScroll() {
    if (!profEl.classList.contains('s004')) return
    const max = profEl.scrollHeight - profEl.clientHeight
    const p = Math.min(1, Math.max(0, profEl.scrollTop / (max || 1)))
    profEl.style.setProperty('--s004-p', String(p))
    const label = p < .18 ? ['MOVEMENT I', 'OVERTURE'] : p < .42 ? ['MOVEMENT II', 'CATASTROPHE'] : p < .68 ? ['MOVEMENT III', 'REQUIEM'] : p < .88 ? ['MOVEMENT IV', 'RE-CREATION'] : ['CODA', 'UNFINISHED']
    const strong = profEl.querySelector('.s004-movement strong')
    if (strong && strong.textContent !== label[1]) {
      strong.textContent = label[1]
      profEl.querySelector('.s004-movement span').textContent = label[0]
    }
  }

  // ── S-005 专属：赠与雪中的你（明媚雪原信笺，光影随她的情绪明灭） ──
  function renderSignalDossier() {
    profEl.classList.add('s005')
    // 缓缓飘落的雪：落地即融，是她无声的告别。约三分之一是数据化的雪——她的雪，本来就是信号
    const glyphs = ['0', '1', '❄', '♥', '✦']
    const snow = Array.from({ length: 24 }, () => {
      const style = `--x:${Math.floor(Math.random() * 100)}%;--sw:${(Math.random() * 70 - 35).toFixed(0)}px;--t:${(9 + Math.random() * 12).toFixed(1)}s;--dl:${(-Math.random() * 20).toFixed(1)}s;--s:${(0.4 + Math.random() * 1.1).toFixed(2)}`
      if (Math.random() < .38) {
        const c = Math.random() < .5 ? '#7ecbe8' : '#f299c1'
        return `<span class="g" style="${style};--c:${c}">${glyphs[Math.floor(Math.random() * glyphs.length)]}</span>`
      }
      return `<span style="${style};--b:${Math.random() < .3 ? 2 : 0}px"></span>`
    }).join('')
    // 左缘的上行信号流：她从网络深处，往上送出的讯息
    const stream = Array.from({ length: 12 }, () => {
      const ch = ['0', '1', '❄', '♥', '✦', '5', '2', '0'][Math.floor(Math.random() * 8)]
      return `<b style="--d:${(-Math.random() * 14).toFixed(1)}s;--t2:${(10 + Math.random() * 8).toFixed(1)}s;--o:${(0.16 + Math.random() * 0.2).toFixed(2)}">${ch}</b>`
    }).join('')
    profEl.insertAdjacentHTML('beforeend', `
      <div class="s005-deco" aria-hidden="true">
        ${snow}
        <div class="s005-stream">${stream}</div>
        <div class="s005-plane"><svg viewBox="0 0 32 26"><path d="M31 1 L1 12 L10 16 L12 25 L17 18 L25 22 Z" /><path d="M31 1 L12 25" /></svg></div>
      </div>
      <div class="s005-dusk" aria-hidden="true"></div>
      <button class="s005-heart" type="button" aria-label="她藏起来的心形">
        <svg viewBox="0 0 44 40" role="presentation">
          <defs>
            <linearGradient id="s005hg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#ffb9d3" /><stop offset="1" stop-color="#ff7fae" />
            </linearGradient>
            <clipPath id="s005hc"><path d="M22 38 C10 28 2 20 2 11.5 C2 5 7 1 12.5 1 C16.5 1 20 3.5 22 7 C24 3.5 27.5 1 31.5 1 C37 1 42 5 42 11.5 C42 20 34 28 22 38 Z" /></clipPath>
          </defs>
          <path class="hout" d="M22 38 C10 28 2 20 2 11.5 C2 5 7 1 12.5 1 C16.5 1 20 3.5 22 7 C24 3.5 27.5 1 31.5 1 C37 1 42 5 42 11.5 C42 20 34 28 22 38 Z" />
          <g clip-path="url(#s005hc)"><rect class="hfill" x="-2" y="-2" width="48" height="44" fill="url(#s005hg)" /></g>
          <path class="hline" d="M22 38 C10 28 2 20 2 11.5 C2 5 7 1 12.5 1 C16.5 1 20 3.5 22 7 C24 3.5 27.5 1 31.5 1 C37 1 42 5 42 11.5 C42 20 34 28 22 38 Z" />
          <path class="hgloss" d="M8 8 C10 5 13 3.6 15.5 4.2 C13 6 11 8.5 10.3 11.5 C8.8 10.6 8 9.4 8 8 Z" />
        </svg>
        <i class="s005-phase">初遇</i>
        <em>——悄悄递给你 ♥</em>
      </button>
      <span class="s005-case">BON VOYAGE · S-005 · 5.20 // 赠与雪中的你</span>`)
    const heart = profEl.querySelector('.s005-heart')
    let heartTimer = null
    heart.addEventListener('click', () => {
      heart.classList.add('is-given')
      gsap.fromTo(heart, { scale: 1 }, { scale: 1.22, duration: 0.16, yoyo: true, repeat: 3, ease: 'power1.inOut', overwrite: true, onComplete: () => gsap.set(heart, { scale: 1 }) })
      if (heartTimer) clearTimeout(heartTimer)
      heartTimer = setTimeout(() => heart.classList.remove('is-given'), 2600)
    })
    profileCleanups.push(() => { if (heartTimer) clearTimeout(heartTimer) })
    // 信笺解码入场：内容默认可见，观察器只在滚入视野时叠加一次粉蓝色散的接收动画，
    // 因此即便观察器漏掉某段（快速滚动），也绝不会让内容永久隐形。减动态时完全跳过。
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return
        en.target.classList.add('is-received')
        observer.unobserve(en.target)
      })
    }, { root: profEl, threshold: 0.16 })
    profEl.querySelectorAll('.prof-doc section, .prof-doc .prof-sign').forEach((s) => observer.observe(s))
    profileCleanups.push(() => observer.disconnect())
  }

  function s005OnScroll() {
    if (!profEl.classList.contains('s005')) return
    const max = profEl.scrollHeight - profEl.clientHeight
    const p = Math.min(1, Math.max(0, profEl.scrollTop / (max || 1)))
    profEl.style.setProperty('--s005-p', String(p))
    // 光与影，是她情绪的读数：裂痕与告别处光线沉下去，触碰时重新亮起
    const dim = p < .5 ? 0 : p < .72 ? (p - .5) / .22 : p < .88 ? 1 : Math.max(0, 1 - (p - .88) / .09)
    profEl.style.setProperty('--s005-dim', dim.toFixed(3))
    const phase = p < .14 ? '初遇' : p < .36 ? '长航' : p < .56 ? '心形' : p < .76 ? '裂痕' : p < .92 ? '告别' : '触碰'
    if (profEl.dataset.signal !== phase) {
      profEl.dataset.signal = phase
      const phaseEl = profEl.querySelector('.s005-phase')
      if (phaseEl) phaseEl.textContent = phase
    }
    // 纸飞机沿滚动自下而上航行：从没有选择的飞行，到人为选择的旅途
    const plane = profEl.querySelector('.s005-plane')
    if (plane) {
      const x = 5 + p * 80 + Math.sin(p * Math.PI * 3) * 4
      const y = 76 - p * 62 + Math.sin(p * Math.PI * 5) * 7
      plane.style.setProperty('--pl-x', `${x.toFixed(2)}vw`)
      plane.style.setProperty('--pl-y', `${y.toFixed(2)}vh`)
      plane.style.setProperty('--pl-r', `${(-14 + Math.cos(p * Math.PI * 3.4) * 12).toFixed(1)}deg`)
    }
  }

  // ── S-006 专属：布景与幻灭（梦境星海舞台，读到威胁评级时梦被撕开一线） ──
  function renderDreamStage() {
    profEl.classList.add('s006')
    // 玻璃泡泡：从梦的底部缓缓上浮
    const bubbles = Array.from({ length: 14 }, () =>
      `<span style="--x:${Math.floor(Math.random() * 100)}%;--s:${(8 + Math.random() * 34).toFixed(0)}px;--t:${(12 + Math.random() * 14).toFixed(1)}s;--dl:${(-Math.random() * 24).toFixed(1)}s;--sw:${(Math.random() * 80 - 40).toFixed(0)}px"></span>`).join('')
    // 星芒：定点闪烁
    const stars = Array.from({ length: 12 }, () =>
      `<b style="--x:${Math.floor(Math.random() * 98)}%;--y:${Math.floor(Math.random() * 96)}%;--tw:${(2 + Math.random() * 3.4).toFixed(1)}s;--dl:${(-Math.random() * 5).toFixed(1)}s;--sc:${(0.5 + Math.random() * 0.9).toFixed(2)}">✦</b>`).join('')
    // 纸片小人：门后那串剪影，幻灭时会被点亮
    const doll = '<svg viewBox="0 0 12 14"><path d="M6 .4 a2.4 2.4 0 1 0 .01 4.8 a2.4 2.4 0 1 0 -.01 -4.8 M6 5.2 L2.2 8 L.6 12.6 L2.4 13.4 L4 9.6 L4.4 13.6 L7.6 13.6 L8 9.6 L9.6 13.4 L11.4 12.6 L9.8 8 Z"/></svg>'
    const garland = (n) => Array.from({ length: n }, () => `<i>${doll}</i>`).join('')
    profEl.insertAdjacentHTML('beforeend', `
      <div class="s006-deco" aria-hidden="true">
        ${bubbles}${stars}
        <div class="s006-garland s006-garland--bl">${garland(7)}</div>
        <div class="s006-garland s006-garland--tr">${garland(7)}</div>
        <svg class="s006-chain s006-chain--l" viewBox="0 0 60 400" preserveAspectRatio="none"><path d="M8 -10 C40 90 -10 210 34 410" pathLength="100" /></svg>
        <svg class="s006-chain s006-chain--r" viewBox="0 0 60 400" preserveAspectRatio="none"><path d="M52 -10 C20 110 66 230 22 410" pathLength="100" /></svg>
      </div>
      <div class="s006-sleep" aria-hidden="true">
        <svg viewBox="0 0 40 26">
          <g class="eyes-shut"><path d="M6 14 q5 5 10 0" /><path d="M24 14 q5 5 10 0" /></g>
          <g class="eyes-open"><circle cx="11" cy="14" r="3.2" /><circle cx="29" cy="14" r="3.2" /></g>
        </svg>
        <span class="zzz"><b>z</b><b>z</b><b>z</b></span>
        <span class="alert">⚠</span>
        <em class="s006-phase">入梦</em>
      </div>`)
  }

  function s006OnScroll() {
    if (!profEl.classList.contains('s006')) return
    const max = profEl.scrollHeight - profEl.clientHeight
    const p = Math.min(1, Math.max(0, profEl.scrollTop / (max || 1)))
    // 幻灭潮：读到海啸级威胁时，梦被撕开一线，随后重新合拢
    const surge = p < .42 ? 0 : p < .54 ? (p - .42) / .12 : p < .68 ? 1 : p < .8 ? 1 - (p - .68) / .12 : 0
    profEl.style.setProperty('--s006-surge', surge.toFixed(3))
    const phase = p < .16 ? '入梦' : p < .42 ? '布景' : p < .72 ? '幻灭' : p < .9 ? '双生' : '归眠'
    if (profEl.dataset.dream !== phase) {
      profEl.dataset.dream = phase
      const phaseEl = profEl.querySelector('.s006-phase')
      if (phaseEl) phaseEl.textContent = phase
    }
  }

  // ── S-007 专属：昭日 · 破晓（开场日出，天色随滚动渐亮，逆风处乌云蔽日） ──
  const s007Leaf = '<svg viewBox="0 0 20 20"><path d="M2 18 C2 8 10 2 18 2 C18 12 10 18 2 18 Z" /><path d="M2 18 C8 12 12 8 18 2" class="vein" /></svg>'
  function s007Gust(count) {
    const deco = profEl.querySelector('.s007-deco')
    if (!deco) return
    for (let i = 0; i < count; i++) {
      const lf = document.createElement('span')
      lf.className = 'gust-leaf'
      lf.innerHTML = s007Leaf
      deco.appendChild(lf)
      const y0 = window.innerHeight * (0.12 + Math.random() * 0.7)
      gsap.fromTo(lf,
        { x: -70, y: y0, rotation: 0, opacity: 0, scale: 0.6 + Math.random() * 0.8 },
        { x: window.innerWidth + 90, y: y0 + (Math.random() * 180 - 90), rotation: 300 + Math.random() * 260, opacity: .9,
          duration: 1 + Math.random() * .8, delay: Math.random() * .3, ease: 'power1.in', onComplete: () => lf.remove() })
    }
  }
  function renderSunriseDossier() {
    profEl.classList.add('s007')
    // 天空中悬浮的罗伊符文：解译段会一起亮起
    const runes = ['ᚹ', 'ᛊ', 'ᛉ', 'ᛗ', 'ᛟ', 'ᚱ', 'ᛖ', 'ᛚ', 'ᛃ', 'ᚨ']
    const runeEls = runes.map((r) =>
      `<u class="r" style="--x:${4 + Math.floor(Math.random() * 92)}%;--y:${6 + Math.floor(Math.random() * 80)}%;--t:${(5 + Math.random() * 6).toFixed(1)}s;--dl:${(-Math.random() * 8).toFixed(1)}s;--sc:${(0.7 + Math.random() * 0.9).toFixed(2)}">${r}</u>`).join('')
    // 乘风的叶
    const leaves = Array.from({ length: 7 }, () =>
      `<span class="lf" style="--y:${8 + Math.floor(Math.random() * 76)}%;--t:${(14 + Math.random() * 12).toFixed(1)}s;--dl:${(-Math.random() * 24).toFixed(1)}s;--s:${(0.6 + Math.random() * 1).toFixed(2)};--bob:${(Math.random() * 120 - 60).toFixed(0)}px">${s007Leaf}</span>`).join('')
    profEl.insertAdjacentHTML('beforeend', `
      <div class="s007-sun" aria-hidden="true"></div>
      <div class="s007-deco" aria-hidden="true">
        <svg class="s007-wind" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <path d="M-40 140 C300 90 520 210 1240 120" />
          <path d="M-40 380 C380 330 700 470 1240 360" />
          <path d="M-40 520 C300 480 640 560 1240 500" />
        </svg>
        ${runeEls}${leaves}
      </div>
      <div class="s007-veil" aria-hidden="true"></div>
      <button class="s007-dial" type="button" aria-label="唤一阵风">
        <svg viewBox="0 0 64 40">
          <path class="arc" d="M6 34 A26 26 0 0 1 58 34" />
          <line class="hor" x1="2" y1="34" x2="62" y2="34" />
          <circle class="dot" cx="6" cy="34" r="3.4" />
        </svg>
        <em class="s007-phase">拂晓</em>
      </button>
      <div class="s007-intro" aria-hidden="true">
        <i class="horizon"></i><b class="crest"></b><span class="rays"></span><em class="flare"></em>
      </div>`)
    profEl.querySelector('.s007-dial').addEventListener('click', () => s007Gust(8))
    // 开场破晓：暗 → 地平线亮起 → 日冕破出 → 金光一闪，黎明显现（减动态用户跳过整段，直接见到黎明）
    const intro = profEl.querySelector('.s007-intro')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { intro.remove(); return }
    // 遮罩期间不让焦点停在被盖住的返回键上；散去后再交还焦点
    deferInitialFocus = true
    const hero = profEl.querySelector('.prof-hero')
    const tl = gsap.timeline({ onComplete: () => { intro.remove(); profEl.querySelector('.prof-back')?.focus() } })
    tl.fromTo(intro.querySelector('.horizon'), { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: .55, ease: 'power2.out' }, .18)
      .fromTo(intro.querySelector('.crest'), { y: 110, opacity: 0 }, { y: 0, opacity: 1, duration: .75, ease: 'power2.out' }, .58)
      .fromTo(intro.querySelector('.rays'), { opacity: 0, scale: .55, rotation: -16 }, { opacity: .95, scale: 1.18, rotation: 10, duration: .85, ease: 'power1.out' }, .62)
      .fromTo(intro.querySelector('.flare'), { opacity: 0 }, { opacity: 1, duration: .32, ease: 'power2.in' }, 1.18)
      .to(intro, { opacity: 0, duration: .65, ease: 'power2.out' }, 1.5)
    if (hero) tl.fromTo(hero, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .75, ease: 'power2.out' }, 1.4)
    tl.add(() => s007Gust(9), 1.45)
    profileCleanups.push(() => tl.kill())
  }

  function s007OnScroll() {
    if (!profEl.classList.contains('s007')) return
    const max = profEl.scrollHeight - profEl.clientHeight
    const p = Math.min(1, Math.max(0, profEl.scrollTop / (max || 1)))
    profEl.style.setProperty('--s007-p', String(p))
    // 逆风：全力之下的段落，乌云压过来遮住太阳；读过后破云
    const veil = p < .56 ? 0 : p < .64 ? (p - .56) / .08 : p < .72 ? 1 : p < .8 ? 1 - (p - .72) / .08 : 0
    profEl.style.setProperty('--s007-veil', veil.toFixed(3))
    const phase = p < .14 ? '拂晓' : p < .36 ? '承光' : p < .56 ? '解译' : p < .76 ? '逆风' : p < .92 ? '破云' : '昭日'
    if (profEl.dataset.sun !== phase) {
      profEl.dataset.sun = phase
      const phaseEl = profEl.querySelector('.s007-phase')
      if (phaseEl) phaseEl.textContent = phase
    }
    // 日晷：太阳圆点沿地平弧爬升
    const dot = profEl.querySelector('.s007-dial .dot')
    if (dot) {
      const ang = Math.PI - p * (Math.PI / 2)
      dot.setAttribute('cx', (32 + 26 * Math.cos(ang)).toFixed(1))
      dot.setAttribute('cy', (34 - 26 * Math.sin(ang)).toFixed(1))
    }
  }

  function s002OnScroll() {
    if (!profEl.classList.contains('s002')) return
    const max = profEl.scrollHeight - profEl.clientHeight
    const p = Math.min(1, Math.max(0, profEl.scrollTop / (max || 1)))
    profEl.style.setProperty('--s002-p', String(p))
    const phase = p < .16 ? '红线' : p < .32 ? '六岁' : p < .48 ? '十五岁' : p < .65 ? '剪断' : p < .82 ? '琥珀' : '接线'
    const phaseEl = profEl.querySelector('.s002-timeline em')
    if (phaseEl && phaseEl.textContent !== phase) phaseEl.textContent = phase
    profEl.dataset.thread = phase
  }

  function s009OnScroll() {
    if (!profEl.classList.contains('s009')) return
    const max = profEl.scrollHeight - profEl.clientHeight
    const p = Math.min(1, Math.max(0, profEl.scrollTop / (max || 1)))
    profEl.style.setProperty('--s009-p', String(p))
    const phase = p < .22 ? '交班' : p < .5 ? '值守' : p < .78 ? '裁光' : '封卷'
    const phaseEl = profEl.querySelector('.s009-watch em')
    if (phaseEl && phaseEl.textContent !== phase) phaseEl.textContent = phase
    profEl.dataset.watch = phase
    const windEl = profEl.querySelector('.s009-wind i')
    const tideEl = profEl.querySelector('.s009-tideh i')
    const visEl = profEl.querySelector('.s009-vis i')
    if (windEl) windEl.textContent = String(Math.round(3 + Math.min(1, p / .55) * 5))
    if (tideEl) tideEl.textContent = (1.1 + Math.sin(p * Math.PI) * .6).toFixed(1) + ' M'
    if (visEl) visEl.textContent = p > .22 && p < .55 ? '受限' : p >= .55 && p < .8 ? '恢复' : '良好'
  }

  // ── S-015 专属：七弦档案 ──
  // 整份档案是一张横陈的琴：首屏七根弦可拨（拨弦即出剑），「剑」章飞剑随指针而动、点按万剑归一，
  // 「魔」章指针掠过立绘显出心魔，「众」章万剑来朝，「夜」章灯下夜话。底部七徽即章节进度。
  const QX_CHAPTERS = [
    { id: 'qi', hui: '启', mode: 'drift' },
    { id: 'ming', hui: '名', mode: 'drift' },
    { id: 'xian', hui: '弦', mode: 'drift' },
    { id: 'jian', hui: '剑', mode: 'will' },
    { id: 'mo', hui: '魔', mode: 'ember' },
    { id: 'zhong', hui: '众', mode: 'array' },
    { id: 'ye', hui: '夜', mode: 'fade' },
  ]
  let qxSwords = null
  let qxChapterEls = []

  // 飞剑场：一块固定在视口上的 canvas，画一群细长的剑。按章节切换行为——
  // drift 随风缓行 / will 随指针聚散 / ember 心魔下沉 / array 让位给侧视布阵场景 / fade 收剑
  function createSwordField(canvas, { reduce, coarse }) {
    const ctx = canvas.getContext('2d')
    const N = coarse ? 110 : 300
    const ICE = '150,212,255', EMBER = '222,104,128'
    const ALPHA = { drift: .34, will: 1, ember: .22, array: 0, fade: 0 } // array：剑群让位给布阵场景
    let W = 1, H = 1, dpr = 1, mode = 'drift', alpha = 0, targetAlpha = ALPHA.drift
    let t = 0, last = performance.now(), raf = 0, running = true
    const pointer = { x: 0, y: 0, active: false }
    const rnd = (a, b) => a + Math.random() * (b - a)
    const swords = []
    // 一柄散剑的初始状态：随机位置、朝右上缓行；ox/oy/eager 让「随心」时各剑绕指针成云而不挤成一点
    function fresh(s) {
      const a = rnd(-Math.PI * .34, -Math.PI * .1), sp = rnd(10, 26)
      Object.assign(s, {
        x: rnd(0, W), y: rnd(0, H), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        len: rnd(30, 66),
        ox: rnd(-1, 1) * 150, oy: rnd(-1, 1) * 150, eager: rnd(.45, 1),
        shot: false, life: 0, ttl: 0, passed: 0, px: 0, py: 0,
      })
      return s
    }
    for (let i = 0; i < N; i++) swords.push(fresh({}))

    function resize() {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      W = canvas.clientWidth || window.innerWidth
      H = canvas.clientHeight || window.innerHeight
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingQuality = 'high'
      buildArray()
    }

    // ── 云琅贴图：按实物照片在离屏画布上精绘一柄（剑尖朝 +x），再做多级缩略供各尺寸取用 ──
    // 全长 SL=1024：剑首 0–80 · 剑柄 80–318 · 剑格 318–390 · 刃身 390–1024；剑心（t=0）在 x=461
    const SL = 1024, SPAD = 24, SH = 200, SCY = 100, SANCHOR = 461
    function makeSwordSprite(tint) {
      const c = document.createElement('canvas'); c.width = SL + SPAD * 2; c.height = SH
      const g = c.getContext('2d'); g.translate(SPAD, 0)
      const ember = tint === EMBER
      const guardFill = ember ? '#d7566f' : '#f4f7f9'
      const guardEdge = ember ? '#8a2340' : '#b7c6d0'
      const core = ember ? '#ff7390' : '#62ff9e', coreGlow = ember ? '255,115,144' : '98,255,158'
      const bladePath = () => { g.beginPath(); g.moveTo(390, SCY - 16); g.lineTo(896, SCY - 16); g.lineTo(SL, SCY); g.lineTo(896, SCY + 16); g.lineTo(390, SCY + 16); g.closePath() }
      // 剑光：整片刃身背后一层冷光
      g.save(); g.shadowColor = 'rgba(140,210,255,.95)'; g.shadowBlur = 26; g.fillStyle = 'rgba(160,215,255,.5)'; bladePath(); g.fill(); g.restore()
      // 刃身：冰蓝渐变，刃口偏白，脊线高光
      const bg = g.createLinearGradient(0, SCY - 16, 0, SCY + 16)
      bg.addColorStop(0, '#e2eff6'); bg.addColorStop(.42, '#a6cbde'); bg.addColorStop(.58, '#b7d6e6'); bg.addColorStop(1, '#e2eff6')
      g.fillStyle = bg; bladePath(); g.fill()
      g.strokeStyle = 'rgba(236,246,251,.95)'; g.lineWidth = 1.6; bladePath(); g.stroke()
      g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 3; g.beginPath(); g.moveTo(478, SCY); g.lineTo(986, SCY); g.stroke()
      g.strokeStyle = 'rgba(120,160,185,.55)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(478, SCY - 7); g.lineTo(880, SCY - 7); g.moveTo(478, SCY + 7); g.lineTo(880, SCY + 7); g.stroke()
      // 近格纹饰：白底、金云、一点蓝
      g.fillStyle = '#eef3f6'; g.beginPath(); g.roundRect(388, SCY - 19, 86, 38, 8); g.fill()
      g.strokeStyle = '#c9d4dc'; g.lineWidth = 1; g.stroke()
      g.strokeStyle = '#c99f4e'; g.lineWidth = 2.6; g.lineCap = 'round'
      g.beginPath(); g.moveTo(398, SCY - 9); g.bezierCurveTo(414, SCY - 22, 428, SCY + 4, 446, SCY - 8); g.bezierCurveTo(456, SCY - 14, 462, SCY - 4, 468, SCY - 10); g.stroke()
      g.beginPath(); g.moveTo(400, SCY + 10); g.bezierCurveTo(418, SCY + 20, 430, SCY - 2, 450, SCY + 9); g.bezierCurveTo(458, SCY + 13, 464, SCY + 6, 470, SCY + 11); g.stroke()
      g.fillStyle = '#3aa9e6'; g.beginPath(); g.arc(432, SCY, 3.2, 0, Math.PI * 2); g.fill()
      // 剑柄：蓝光透芯 + 黑色藤纹缠绕 + 两端金属护环
      g.save(); g.shadowColor = 'rgba(60,200,255,.95)'; g.shadowBlur = 18
      const hg = g.createLinearGradient(0, SCY - 10, 0, SCY + 10)
      hg.addColorStop(0, '#2a9be0'); hg.addColorStop(.5, '#8fe6ff'); hg.addColorStop(1, '#2a9be0')
      g.fillStyle = hg; g.beginPath(); g.roundRect(82, SCY - 10, 236, 20, 10); g.fill(); g.restore()
      g.strokeStyle = '#0c1620'; g.lineWidth = 5.2
      for (const ph of [0, Math.PI]) {
        g.beginPath()
        for (let x = 88; x <= 312; x += 3) { const y = SCY + 9 * Math.sin((x - 88) / 16 + ph); x === 88 ? g.moveTo(x, y) : g.lineTo(x, y) }
        g.stroke()
      }
      g.strokeStyle = '#2a3a48'; g.lineWidth = 1.2
      for (const ph of [0, Math.PI]) {
        g.beginPath()
        for (let x = 88; x <= 312; x += 3) { const y = SCY + 9 * Math.sin((x - 88) / 16 + ph) - 2; x === 88 ? g.moveTo(x, y) : g.lineTo(x, y) }
        g.stroke()
      }
      for (const [x0, w0] of [[308, 14], [74, 12]]) {
        g.fillStyle = '#1b2732'; g.fillRect(x0, SCY - 13, w0, 26)
        g.strokeStyle = '#63768a'; g.lineWidth = 1.2; g.strokeRect(x0 + .5, SCY - 12.5, w0 - 1, 25)
      }
      // 剑首：暗金属锥 + 护环 + 蓝珠
      g.fillStyle = '#243040'; g.beginPath(); g.moveTo(74, SCY - 12); g.lineTo(44, SCY - 7); g.lineTo(44, SCY + 7); g.lineTo(74, SCY + 12); g.closePath(); g.fill()
      g.strokeStyle = '#6b7f92'; g.lineWidth = 1.2; g.stroke()
      g.strokeStyle = '#3b4a58'; g.lineWidth = 5; g.beginPath(); g.arc(24, SCY, 15, 0, Math.PI * 2); g.stroke()
      g.strokeStyle = '#8093a3'; g.lineWidth = 1; g.beginPath(); g.arc(24, SCY, 18, 0, Math.PI * 2); g.stroke()
      g.save(); g.shadowColor = 'rgba(80,190,255,.95)'; g.shadowBlur = 10; g.fillStyle = '#4fc6ff'; g.beginPath(); g.arc(24, SCY, 5.5, 0, Math.PI * 2); g.fill(); g.restore()
      // 剑格：云形（几团圆相叠 + 向刃一侧的云头）、描边、金色螺旋纹
      const cloud = () => {
        g.beginPath()
        g.arc(352, SCY, 34, 0, Math.PI * 2)
        g.arc(338, SCY - 30, 21, 0, Math.PI * 2)
        g.arc(366, SCY + 30, 23, 0, Math.PI * 2)
        g.arc(392, SCY - 20, 15, 0, Math.PI * 2)
        g.arc(322, SCY + 16, 17, 0, Math.PI * 2)
      }
      g.save(); g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = 6; g.fillStyle = guardFill; cloud(); g.fill(); g.restore()
      g.strokeStyle = guardEdge; g.lineWidth = 1.6; cloud(); g.stroke()
      g.strokeStyle = ember ? '#ffb3c2' : '#b98a3e'; g.lineWidth = 3; g.lineCap = 'round'
      g.beginPath()
      for (let a = 0; a <= Math.PI * 4; a += .15) { const r = 2.5 + a * 2.2, x = 350 + Math.cos(a) * r, y = SCY - 4 + Math.sin(a) * r; a === 0 ? g.moveTo(x, y) : g.lineTo(x, y) }
      g.stroke()
      // 格心碧光：从剑格下侧透出来的一团绿
      const gl = g.createRadialGradient(374, SCY + 22, 2, 374, SCY + 22, 40)
      gl.addColorStop(0, `rgba(${coreGlow},1)`); gl.addColorStop(.35, `rgba(${coreGlow},.75)`); gl.addColorStop(1, `rgba(${coreGlow},0)`)
      g.fillStyle = gl; g.beginPath(); g.arc(374, SCY + 22, 40, 0, Math.PI * 2); g.fill()
      g.fillStyle = core; g.beginPath(); g.arc(374, SCY + 22, 9, 0, Math.PI * 2); g.fill()
      g.fillStyle = 'rgba(255,255,255,.9)'; g.beginPath(); g.arc(372, SCY + 20, 3.2, 0, Math.PI * 2); g.fill()
      // 多级缩略：逐次减半，缩到几十像素时不闪不糊
      const levels = [{ c, len: c.width }]
      let prev = c
      while (prev.width > 96) {
        const m = document.createElement('canvas'); m.width = Math.round(prev.width / 2); m.height = Math.round(prev.height / 2)
        const mg = m.getContext('2d'); mg.imageSmoothingQuality = 'high'; mg.drawImage(prev, 0, 0, m.width, m.height)
        levels.push({ c: m, len: m.width }); prev = m
      }
      return levels
    }
    const SPRITES = { [ICE]: makeSwordSprite(ICE), [EMBER]: makeSwordSprite(EMBER) }
    // ── 巨剑贴图：清宵那柄巨剑的实物图去黑底、压成暗钢蓝、转成剑尖朝 +x（public/photos/qingxiao-giant-sword.png）──
    // 贴图里剑身正好横跨 SL，两侧各留 GPAD；GCY 是刃身中轴在贴图中的高度。异步载入，载入前不画巨剑
    const GPAD = 170, GH = 186, GCY = 86
    let GIANT_SPRITE = null
    {
      const img = new Image()
      img.onload = () => {
        const levels = [{ c: img, len: img.width }]
        levels.meta = { pad: GPAD, h: GH, cy: GCY }
        let prev = img, w = img.width, h = img.height
        while (w > 160) {
          const m = document.createElement('canvas'); m.width = Math.round(w / 2); m.height = Math.round(h / 2)
          const mg = m.getContext('2d'); mg.imageSmoothingQuality = 'high'; mg.drawImage(prev, 0, 0, m.width, m.height)
          levels.push({ c: m, len: m.width }); prev = m; w = m.width; h = m.height
        }
        GIANT_SPRITE = levels
      }
      img.src = 'photos/qingxiao-giant-sword.png'
    }
    // ── 众 · 借剑阵：镜头在阵内——低机位站在外环边上望向阵心 ──
    // 阵心一点白光瞬间爆开，炸成上下九层剑环（下四层剑尖朝天的碗阵，上五层倒悬成穹顶，从头顶掠过）；
    // 随后六柄巨剑自天而降，悬停片刻，一齐沉入地底消失；阵光渐熄，再起。全程不抖镜头。
    // 世界坐标：x 左右、y 向上（0 为地面）、z 纵深；相机在原点、高 CAMH；阵眼在 (0,0,ZC)，剑仙悬于 (0,EYE_H,ZC)
    const ARR = { GIANT: 2.4, PLUNGE: 8.2, FADE: 11.2, END: 12.5 }
    const ZC = 1150, CAMH = 200, EYE_H = 300, HORIZ = .66, NEAR = 140 // 地平线压到 66%，等于镜头微微仰起看穹顶
    // 九层穹顶剑环（只有头顶这一组，剑尖朝下倒悬，越高越收拢）：r 半径、h 高度、len 剑长、sp 间距（世界单位）
    const LAYERS = [
      { r: 1600, h: 600, len: 42, up: false, sp: 21 }, { r: 1480, h: 700, len: 40, up: false, sp: 20 },
      { r: 1300, h: 820, len: 37, up: false, sp: 18 }, { r: 1150, h: 920, len: 36, up: false, sp: 17 },
      { r: 1000, h: 1010, len: 34, up: false, sp: 16 }, { r: 820, h: 1110, len: 32, up: false, sp: 15 },
      { r: 660, h: 1180, len: 31, up: false, sp: 15 }, { r: 480, h: 1230, len: 30, up: false, sp: 13 },
      { r: 260, h: 1270, len: 28, up: false, sp: 12 },
    ]
    // 四柄巨剑（垂直向下），前后错开：两柄贴近镜头在画面两侧（大得出画）、两柄远在阵心两旁（小）
    // 每项：x、z、全长、悬停时剑尖高度
    // 三柄按纵深拉开：470 / 1350 / 1950，投影缩放依次约 3.0 / 1.0 / 0.72，一眼看得出前后。
    // x 是按「悬停那一幕的焦距」反推的，保证三柄都落在画面里、横向也不挤在一起
    const GIANTS = [[-131, 470, 1100, 390], [38, 1350, 1050, 435], [514, 1950, 1000, 465]]
    let arrT = 0, arrOn = 0, flash = 0, arrDt = .016
    const prevTipY = []
    const field = [], STRAND = [], streaks = [], glints = [], items = [], sunk = []
    const clamp01 = (v) => Math.min(1, Math.max(0, v))
    const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3)
    const easeOutQuart = (p) => 1 - Math.pow(1 - p, 4)
    const easeOutExpo = (p) => p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)
    const easeInOut = (p) => p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
    // 摄影机：一炷香的长镜头。四幕各有自己的焦距、俯仰与机位高度，指数缓出地推过去
    const CAM = [
      { t: 0, f: 1.05, pitch: 0, h: 200 },      // 幕一 远景：起阵，阵在远处
      { t: 2.4, f: 1.36, pitch: 6, h: 240 },    // 幕二 中景：巨剑降，镜头推近
      { t: 5.4, f: 1.56, pitch: 14, h: 300 },   // 幕三 仰视：充能，抬头看
      { t: 8.2, f: 1.14, pitch: -7, h: 150 },   // 幕四 俯冲：落地，机位压低让地平线进画
      { t: 11.2, f: 1.06, pitch: 0, h: 200 },   // 收
    ]
    let camF = CAM[0].f, camPitch = CAM[0].pitch, camH = CAM[0].h, horizonY = H * HORIZ
    function stepCamera(dt) {
      let tgt = CAM[0]
      for (const k of CAM) if (arrT >= k.t) tgt = k
      if (reduce) { camF = CAM[0].f; camPitch = CAM[0].pitch; camH = CAM[0].h } // 减弱动效时镜头不动
      else {
        const k = 1 - Math.pow(.055, dt) // 指数缓出，越接近目标越慢
        camF += (tgt.f - camF) * k; camPitch += (tgt.pitch - camPitch) * k; camH += (tgt.h - camH) * k
      }
      horizonY = H * HORIZ + camPitch * 13 // 抬头 → 地平线下移，看见更多天
    }
    const proj = (x, y, z) => { const s = H * camF / z; return [W * .5 + x * s, horizonY + (camH - y) * s, s] }
    // 空气透视：越远越淡；背光（阵心之后）的剑更亮，面光的压成剪影
    const depthLit = (z) => (1 - clamp01((z - NEAR) / 3400) * .72) * (z > ZC ? 1.22 : .74)
    function buildArray() {
      field.length = 0; STRAND.length = 0
      const dense = W < 760 ? 2 : 1
      LAYERS.forEach((L, k) => {
        const n = Math.round(Math.PI * 2 * L.r / (L.sp * dense))
        for (let i = 0; i < n; i++) {
          const a0 = Math.PI * 2 * i / n
          // 巨剑出现后，小剑各自投奔方位最近的那柄巨剑，在它身边占一个螺旋流位
          let gi = 0, best = 9
          GIANTS.forEach(([gx, gz], j) => { const ga = Math.atan2(gz - ZC, gx), d = Math.abs(Math.atan2(Math.sin(a0 - ga), Math.cos(a0 - ga))); if (d < best) { best = d; gi = j } })
          field.push({ k, a0, w: .7 + Math.random() * .3, gi, delay: Math.random() * 1.4,
            stiff: 105 + Math.random() * 85, px: 0, py: EYE_H, pz: ZC, vx: 0, vy: 0, vz: 0 })
        }
      })
      // 把每柄巨剑名下的小剑分成若干「股」：同一股角度半径固定、沿剑身首尾相衔均匀排开，
      // 看上去就是一条条由小剑串成、顺剑面淌下去的光线，而不是一团环绕的剑云
      const STRANDS = 14, LANES = 3 // 14 条线，每条由 3 股并排的剑铺成一束，不是单排一柄
      const strands = new Map()
      for (const s of field) {
        s.st = (Math.random() * STRANDS) | 0
        const key = s.gi * 1000 + s.st
        if (!strands.has(key)) strands.set(key, [])
        strands.get(key).push(s)
      }
      strands.forEach((arr) => {
        const st = arr[0].st
        const ang = Math.PI * 2 * st / STRANDS + rnd(-.25, .25)
        const R = 20 + (st % 3) * 26 + rnd(-8, 8)
        const ph = rnd(0, Math.PI * 2)
        const S = { gi: arr[0].gi, ang, R, ph }
        STRAND.push(S)
        const per = Math.max(1, Math.ceil(arr.length / LANES))
        arr.forEach((s, i) => { s.S = S; s.lane = (i % LANES) - (LANES - 1) / 2; s.u0 = (Math.floor(i / LANES) + (i % LANES) * .34) / per })
      })
      resetArray()
    }
    // 每次起阵重新抽一组爆开的光芒与星闪
    function resetArray() {
      arrT = 0; flash = .65; sunk.length = 0
      for (const f of field) { f.px = 0; f.py = EYE_H; f.pz = ZC; f.vx = f.vy = f.vz = 0 }
      streaks.length = 0; glints.length = 0
      for (let i = 0; i < 88; i++) streaks.push({ a: rnd(0, Math.PI * 2), len: rnd(260, 900), w: rnd(.8, 2.4), t0: rnd(0, .16), pink: Math.random() < .3 })
      for (let i = 0; i < 40; i++) { const a = rnd(0, Math.PI * 2), d = rnd(30, 460); glints.push({ dx: Math.cos(a) * d, dy: Math.sin(a) * d * .6, t0: rnd(0, .9), dur: rnd(.3, .65), size: rnd(10, 40), pink: Math.random() < .35 }) }
    }
    function restartArray() { if (arrT < ARR.FADE) arrT = ARR.FADE }
    function stepArray(dt) {
      arrOn += ((mode === 'array' ? 1 : 0) - arrOn) * Math.min(1, dt * 1.6)
      if (arrOn < .01) return
      arrT += dt
      arrDt = dt
      stepCamera(dt)
      if (arrT >= ARR.END) resetArray()
      flash = Math.max(0, flash - dt * 1.8)
    }
    function giantState(i) {
      const [gx, gz, hg, hoverTip] = GIANTS[i]
      const desc = easeOutQuart(clamp01((arrT - ARR.GIANT - i * .4) / 2.6))
      if (desc <= 0) return null
      let tipY = 2600 + (hoverTip - 2600) * desc + Math.sin(arrT * .9 + i) * 8 * desc
      const pl = clamp01((arrT - ARR.PLUNGE - i * .18) / 2)
      let al = 1
      if (pl > 0) { tipY = hoverTip + (-2400 - hoverTip) * Math.pow(pl, 2.2); al = 1 - clamp01((-tipY - 1100) / 700) } // 缓一点的加速曲线；入土很深之后才开始淡
      const tip = [gx, tipY, gz], base = [gx, tipY + hg, gz] // 剑尖朝下，笔直垂立
      const vy = (tipY - (prevTipY[i] === undefined ? tipY : prevTipY[i])) / Math.max(.001, arrDt)
      prevTipY[i] = tipY
      // 充能：小剑源源不断没入剑身，剑越来越亮；一开始下坠就放净
      const charge = clamp01((arrT - ARR.GIANT - i * .4 - .6) / 2.4) * (1 - clamp01(pl * 1.5))
      return { tip, base, al, pl, z: gz, hg, desc, vy, charge }
    }
    // ── 流场：3D 值噪声搭一个势场，取旋度得到无散度速度场 ──
    // 无散度意味着场里没有源也没有汇，光丝在里面既不会挤成一坨也不会散开，只会被拧出形状
    const hash3 = (i, j, k) => {
      let h = (i * 374761393 + j * 668265263 + k * 1274126177) | 0
      h = Math.imul(h ^ (h >>> 13), 1274126177)
      return ((h ^ (h >>> 16)) >>> 0) / 4294967296
    }
    function vnoise(x, y, z) {
      const i = Math.floor(x), j = Math.floor(y), k = Math.floor(z)
      const fx = x - i, fy = y - j, fz = z - k
      const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy), w = fz * fz * (3 - 2 * fz)
      const L = (a, b, t) => a + (b - a) * t
      const c = (a, b, d) => hash3(i + a, j + b, k + d)
      return (L(L(L(c(0,0,0), c(1,0,0), u), L(c(0,1,0), c(1,1,0), u), v),
               L(L(c(0,0,1), c(1,0,1), u), L(c(0,1,1), c(1,1,1), u), v), w)) * 2 - 1
    }
    const E = .55
    function curl(x, y, z) { // 有限差分求旋度，只在每条线的十来个节点上算，开销可忽略
      const P = (a, b, c, o) => vnoise(a + o, b + o * 1.7, c + o * .3)
      const p1y = P(x, y + E, z, 0), p1z = P(x, y, z + E, 0)
      const p2x = P(x + E, y, z, 11.3), p2z = P(x, y, z + E, 11.3)
      const p3x = P(x + E, y, z, 23.7), p3y = P(x, y + E, z, 23.7)
      const n1y = P(x, y - E, z, 0), n1z = P(x, y, z - E, 0)
      const n2x = P(x - E, y, z, 11.3), n2z = P(x, y, z - E, 11.3)
      const n3x = P(x - E, y, z, 23.7), n3y = P(x, y - E, z, 23.7)
      return [(p3y - n3y) - (p2z - n2z), (p1z - n1z) - (p3x - n3x), (p2x - n2x) - (p1y - n1y)]
    }
    // 每帧给每条线重算一条被流场平流出来的中轴线。起点不是巨剑当前位置，而是它按速度
    // 预测出来的位置再加偏移——Reynolds 的 offset pursuit，剑追的是「它要去哪」而不是「它在哪」
    const NODES = 16, U0 = -.1, USPAN = .95 // 走到剑身下段就没入剑里；剑尖那一截留干净
    function buildStrandPaths(gst) {
      const drift = arrT * .1
      for (const S of STRAND) {
        const g = gst[S.gi]
        if (!g) { S.path = null; continue }
        const lead = g.vy * .16 // 预测提前量：巨剑坠得越快，线被带得越靠前
        const ox = Math.cos(S.ang) * S.R, oz = Math.sin(S.ang) * S.R
        const path = S.path || (S.path = [])
        path.length = 0
        for (let i = 0; i < NODES; i++) {
          const u = U0 + USPAN * i / (NODES - 1)
          const bx = g.tip[0] + ox, bz = g.tip[2] + oz
          const by = g.base[1] + (g.tip[1] - g.base[1]) * u + lead * u
          const c = curl(bx * .0017 + S.ph, by * .0017, bz * .0017 + drift)
          const amp = 190 * Math.sin(clamp01((u - U0) / USPAN) * Math.PI) // 两端收紧、中段最放得开
          // 充能漏斗：过了中段就往剑身上收，到剑尖处半径归零——小剑是没入剑里，不是绕着飞
          const fn = u <= .4 ? 1 : Math.pow(clamp01((.87 - u) / .45), 1.5)
          path.push([bx + ox * (fn - 1) + c[0] * amp * fn, by + c[1] * amp * .3 * fn, bz + oz * (fn - 1) + c[2] * amp * fn])
        }
      }
    }
    // 一条光线在参数 u 处的世界坐标（0 在剑首、1 在剑尖外）。两组不同频率的摆动叠加，线便不是直的
    function strandPoint(g, S, u, lane = 0) {
      const P = S.path
      if (!P) return [g.tip[0], g.tip[1], g.tip[2], S.ang]
      const f = clamp01(u) * (NODES - 1), i = Math.min(NODES - 2, f | 0), t = f - i
      // Catmull-Rom 样条：节点之间用三次曲线过渡，不是直线相连——直线相连放大就是一段段折角
      const a = P[i], b = P[i + 1], q = P[i > 0 ? i - 1 : 0], r = P[Math.min(NODES - 1, i + 2)]
      const t2 = t * t, t3 = t2 * t
      const cr = (k) => .5 * (2 * a[k] + (b[k] - q[k]) * t
        + (2 * q[k] - 5 * a[k] + 4 * b[k] - r[k]) * t2
        + (-q[k] + 3 * a[k] - 3 * b[k] + r[k]) * t3)
      const x = cr(0), y = cr(1), z = cr(2)
      if (!lane) return [x, y, z, S.ang]
      // 并排的股：沿局部切线的水平法向偏开，一束线才有宽度
      const dx = b[0] - a[0], dz = b[2] - a[2], d = Math.hypot(dx, dz) || 1
      return [x - dz / d * lane * 13, y, z + dx / d * lane * 13, S.ang]
    }
    // 把一柄小剑送进绘制队列：够大的用云琅贴图，细小的并入批量光线
    const TIER_A = [.4, .8, 1.25] // 三档明度：远/中/背光，够表达纵深又只需三次描边
    function pushSmall(b, tp, a, tiers) {
      const [bx, by] = proj(...b), [tx, ty] = proj(...tp)
      const sl = Math.hypot(tx - bx, ty - by)
      if (sl < 1 || sl > 560 || (bx < -300 && tx < -300) || (bx > W + 300 && tx > W + 300)) return
      const lit = a * depthLit(b[2])
      if (lit < .02) return
      if (sl >= 30) { items.push({ z: b[2], b, t: tp, a: Math.min(1, lit) }); return }
      let ti = 0, best = 9
      TIER_A.forEach((v, i) => { const d = Math.abs(v - lit); if (d < best) { best = d; ti = i } })
      const T = tiers[ti]
      T.glow.moveTo(bx, by); T.glow.lineTo(tx, ty)
      T.core.moveTo(bx, by); T.core.lineTo(tx, ty)
      const gx = bx + (tx - bx) * .18, gy = by + (ty - by) * .18, nx = -(ty - by) / sl * 2.4, ny = (tx - bx) / sl * 2.4
      T.guard.moveTo(gx - nx, gy - ny); T.guard.lineTo(gx + nx, gy + ny)
    }
    function ringPath(r, h, e) { // 从阵心炸出：半径与高度都按 e 展开；绕到镜头背后的一段跳过
      ctx.beginPath()
      let pen = false
      for (let i = 0; i <= 96; i++) {
        const a = i / 96 * Math.PI * 2, z = ZC + Math.sin(a) * r * e
        if (z < NEAR) { pen = false; continue }
        const [sx, sy] = proj(Math.cos(a) * r * e, EYE_H + (h - EYE_H) * e, z)
        pen ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy); pen = true
      }
    }
    function drawSword3D(b, tp, a, levels) {
      const [bx, by] = proj(b[0], b[1], b[2]), [tx, ty] = proj(tp[0], tp[1], tp[2])
      const dx = tx - bx, dy = ty - by, len = Math.hypot(dx, dy)
      if (len < 3 || a < .01) return
      const ux = dx / len, uy = dy / len
      blade(bx + ux * len * .45, by + uy * len * .45, ux, uy, len, ICE, a, null, levels)
    }
    function drawBurst(A) {
      if (arrT > 1.5) return
      const bt = arrT
      const [cx, cy] = proj(0, EYE_H, ZC)
      ctx.globalCompositeOperation = 'lighter'
      // 光核：白到蓝的一团，胀开再散
      const rad = 40 + 620 * easeOutCubic(clamp01(bt / .6)), ca = (1 - clamp01(bt / 1.2)) * A
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
      core.addColorStop(0, `rgba(255,255,255,${ca})`); core.addColorStop(.16, `rgba(240,244,255,${ca * .95})`)
      core.addColorStop(.42, `rgba(170,205,255,${ca * .5})`); core.addColorStop(1, 'rgba(140,180,255,0)')
      ctx.fillStyle = core; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill()
      // 横向炫光带
      const fw = 120 + 1100 * easeOutCubic(clamp01(bt / .7)), fa = (1 - clamp01(bt / 1)) * A
      const flare = ctx.createRadialGradient(cx, cy, 0, cx, cy, fw)
      flare.addColorStop(0, `rgba(255,255,255,${fa * .9})`); flare.addColorStop(.3, `rgba(200,220,255,${fa * .45})`); flare.addColorStop(1, 'rgba(160,190,255,0)')
      ctx.fillStyle = flare
      ctx.save(); ctx.translate(cx, cy); ctx.scale(1, .075); ctx.beginPath(); ctx.arc(0, 0, fw, 0, Math.PI * 2); ctx.fill(); ctx.restore()
      // 放射光芒
      ctx.lineCap = 'round'
      for (const s of streaks) {
        const p = clamp01((bt - s.t0) / .5)
        if (p <= 0) continue
        const len = s.len * easeOutCubic(p), al = (1 - clamp01((bt - s.t0) / 1.05)) * A
        const ux = Math.cos(s.a), uy = Math.sin(s.a) * .62
        const x0 = cx + ux * len * .12, y0 = cy + uy * len * .12, x1 = cx + ux * len, y1 = cy + uy * len
        ctx.strokeStyle = s.pink ? `rgba(255,180,235,${al * .35})` : `rgba(160,205,255,${al * .4})`; ctx.lineWidth = s.w * 3
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
        ctx.strokeStyle = `rgba(255,255,255,${al * .9})`; ctx.lineWidth = s.w
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
      }
      ctx.lineCap = 'butt'
      // 十字星闪
      for (const g of glints) {
        const u = (bt - g.t0) / g.dur
        if (u <= 0 || u >= 1) continue
        const a = Math.sin(u * Math.PI) * A, sz = g.size * (.6 + .4 * a), x = cx + g.dx, y = cy + g.dy
        ctx.strokeStyle = g.pink ? `rgba(255,190,235,${a})` : `rgba(255,255,255,${a})`; ctx.lineWidth = 1.3
        ctx.beginPath(); ctx.moveTo(x - sz, y); ctx.lineTo(x + sz, y); ctx.moveTo(x, y - sz); ctx.lineTo(x, y + sz); ctx.stroke()
        ctx.strokeStyle = `rgba(200,225,255,${a * .5})`; ctx.lineWidth = .8
        ctx.beginPath(); ctx.moveTo(x - sz * .5, y - sz * .5); ctx.lineTo(x + sz * .5, y + sz * .5); ctx.moveTo(x + sz * .5, y - sz * .5); ctx.lineTo(x - sz * .5, y + sz * .5); ctx.stroke()
      }
    }
    // 地面：阵心的光落在地板上，越远越淡；巨剑在地上拖出竖向倒影
    function drawGround(gst, A) {
      ctx.globalCompositeOperation = 'source-over'
      const floor = ctx.createLinearGradient(0, horizonY, 0, H)
      // 地平线处必须从全透明起，否则填充矩形的上缘就是一条横贯全屏的硬边
      floor.addColorStop(0, 'rgba(6,17,28,0)')
      floor.addColorStop(.14, `rgba(6,16,26,${.34 * A})`)
      floor.addColorStop(.46, `rgba(4,12,21,${.72 * A})`)
      floor.addColorStop(1, `rgba(3,9,16,${.94 * A})`)
      ctx.fillStyle = floor; ctx.fillRect(0, horizonY, W, Math.max(0, H - horizonY))
      // 只留这一层。之前那圈阵心光池会在地上压出一道弧形亮边，倒影矩形也会分出色块
    }
    function drawArrayScene() {
      const fade = arrT > ARR.FADE ? 1 - clamp01((arrT - ARR.FADE) / 1.3) : 1
      const A = arrOn * fade
      if (A < .01) return
      const spread = easeOutCubic(clamp01(arrT / .6))
      const [ex, ey] = proj(0, EYE_H, ZC)
      // 阵中冷光：以阵心为源的一团光，加地面升起的薄雾
      ctx.globalCompositeOperation = 'lighter'
      const sky = ctx.createRadialGradient(ex, ey, 10, ex, ey, W * .6)
      sky.addColorStop(0, `rgba(120,175,240,${.22 * A * spread})`); sky.addColorStop(1, 'rgba(110,170,235,0)')
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H)
      // 巨剑此刻的姿态（未出现为 null）
      const gst = GIANTS.map((_, i) => giantState(i))
      buildStrandPaths(gst) // 必须先铺好路径，下面的小剑和光丝都从它取点
      drawGround(gst, A)
      ctx.globalCompositeOperation = 'lighter'
      // 剑环小剑：从阵心炸开成穹顶；巨剑一出，各自脱环飞向巨剑，贴着剑面成螺旋光流跟它降下
      items.length = 0
      ctx.lineWidth = 1
      const tiers = TIER_A.map(() => ({ glow: new Path2D(), core: new Path2D(), guard: new Path2D() }))
      const anyGiant = gst.some(Boolean)
      LAYERS.forEach((L, k) => {
        const e = easeOutExpo(clamp01((arrT - .02 - k * .04) / .5))
        if (e <= 0 || anyGiant) return
        ctx.strokeStyle = `rgba(150,212,255,${.07 * A * e})`; ringPath(L.r, L.h, e); ctx.stroke()
      })
      for (const s of field) {
        const L = LAYERS[s.k]
        const e = easeOutExpo(clamp01((arrT - .02 - s.k * .04) / .5))
        if (e <= 0) continue
        const a = s.a0 + arrT * .05 * (s.k % 2 ? -1 : 1)
        const r = L.r * e
        let x = Math.cos(a) * r, y = EYE_H + (L.h - EYE_H) * e, z = ZC + Math.sin(a) * r
        let len = L.len * e * s.w, al = .8 + .2 * s.w
        // 抵达：位置不再是逐帧算出来的，而是一根临界阻尼弹簧拉过去的——
        // 远处快、近处自己减速、不过冲，每柄剑的劲道略有差异，队形就不会整齐划一地同时到位
        // （Reynolds 1999「Steering Behaviors」里的 Arrival，动力学版本）
        const kk = s.stiff, damp = 2 * Math.sqrt(kk), dt2 = Math.min(.05, arrDt)
        s.vx += ((x - s.px) * kk - s.vx * damp) * dt2; s.px += s.vx * dt2
        s.vy += ((y - s.py) * kk - s.vy * damp) * dt2; s.py += s.vy * dt2
        s.vz += ((z - s.pz) * kk - s.vz * damp) * dt2; s.pz += s.vz * dt2
        x = s.px; y = s.py; z = s.pz
        const g = gst[s.gi] // 巨剑一出，整片穹顶的小剑倾巢而出跟着它走
        const m = g ? easeInOut(clamp01((arrT - ARR.GIANT - s.gi * .4 - s.delay) / 1.6)) : 0
        if (m > 0) {
          const flow = g.pl > 0 ? .85 : .2
          const u = (s.u0 + arrT * flow) % 1
          const [px, ay, pz, ang] = strandPoint(g, s.S, u, s.lane)
          const elen = 15 * (g.pl > 0 ? 1.7 : 1) // 一条线上百余柄，得足够小才排得下
          x += (px - x) * m; y += (ay + elen * .5 - y) * m; z += (pz - z) * m
          len += (elen - len) * m
          const face = .4 + .6 * Math.abs(Math.cos(ang)) // 转到侧面的线暗一些，正对镜头的亮
          const ends = Math.min(1, Math.min(u, 1 - u) * 7) // 两端淡入淡出，线不会突然出现
          al = al * (1 - m) + g.al * face * ends * m
        }
        if (z < NEAR) continue // 绕到镜头背后
        const nearFade = clamp01((z - NEAR) / 220) // 贴着镜头掠过时淡入淡出
        pushSmall([x, y, z], [x, y - len, z], A * al * nearFade, tiers)
      }
      gst.forEach((g) => { if (g) items.push({ z: g.z, b: g.base, t: g.tip, a: Math.min(1, g.al * A * (1 - clamp01((g.z - NEAR) / 4200) * .5)), giant: true, pl: g.pl, hg: g.hg, charge: g.charge }) })
      tiers.forEach((T, i) => {
        const v = Math.min(1, TIER_A[i])
        ctx.strokeStyle = `rgba(150,212,255,${.22 * v})`; ctx.lineWidth = 3.2; ctx.stroke(T.glow)
        ctx.strokeStyle = `rgba(236,246,255,${.85 * v})`; ctx.lineWidth = 1.1; ctx.stroke(T.core)
        ctx.strokeStyle = `rgba(150,212,255,${.75 * v})`; ctx.lineWidth = 1; ctx.stroke(T.guard)
      })
      items.sort((p, q) => q.z - p.z)
      for (const it of items) {
        if (it.giant && !GIANT_SPRITE) continue // 贴图还没到
        if (it.giant) { // 剑身外的冷光与充能白光；整块先按该深度的地平线裁剪，沉下去的部分不该发光
          const [tx, ty] = proj(...it.t), [bx, by] = proj(...it.b)
          const sl = Math.hypot(bx - tx, by - ty)
          const ch = it.charge || 0
          // 光晕是个椭圆，圆底会扣在剑尖上把锋磨圆，所以让它偏向剑首、只覆盖剑身 84%
          const R = sl * .42
          ctx.save(); ctx.translate(bx + (tx - bx) * .42, by + (ty - by) * .42); ctx.scale(.17, 1)
          const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, R)
          halo.addColorStop(0, `rgba(150,210,255,${(.24 + .3 * ch) * it.a})`)
          halo.addColorStop(.55, `rgba(150,210,255,${.1 * it.a})`); halo.addColorStop(1, 'rgba(150,210,255,0)')
          ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill()
          ctx.restore()
          if (ch > .02) { // 吃饱了的剑，刃心透出一条越来越亮的白光。平头线帽，两端各让开一截
            ctx.lineCap = 'butt'
            ctx.strokeStyle = `rgba(232,246,255,${.55 * ch * it.a})`; ctx.lineWidth = Math.max(1, sl * .009)
            ctx.beginPath()
            ctx.moveTo(bx + (tx - bx) * .06, by + (ty - by) * .06)
            ctx.lineTo(bx + (tx - bx) * .86, by + (ty - by) * .86)
            ctx.stroke()
          }
          ctx.lineCap = 'butt'
        }
        if (it.giant) { // 暗金属剑身要不透明地压在天空上，不能用叠加
          ctx.globalCompositeOperation = 'source-over'
          drawSword3D(it.b, it.t, it.a, GIANT_SPRITE)
          ctx.globalCompositeOperation = 'lighter'
        } else drawSword3D(it.b, it.t, it.a)
      }
      drawBurst(A)
      ctx.globalCompositeOperation = 'source-over'
      if (flash > 0) { ctx.fillStyle = `rgba(230,240,255,${flash * .5 * A})`; ctx.fillRect(0, 0, W, H) }
    }
    function setMode(m) {
      if (m === mode || !(m in ALPHA)) return
      mode = m; targetAlpha = ALPHA[m]
      // 切章即收势：不让上一章追指针的惯性把剑群带成一团飘走
      swords.forEach((s) => { if (!s.shot) { s.vx *= .15; s.vy *= .15; s.passed = 0 } })
      if (m === 'array' && arrOn < .05) resetArray()
    }
    // 拨弦出剑：从弦上某点射出几柄剑
    function shoot(x, y, n) {
      for (let k = 0; k < n; k++) {
        const s = swords[(Math.random() * swords.length) | 0]
        const a = rnd(-Math.PI * .42, -Math.PI * .12), sp = rnd(320, 520)
        Object.assign(s, { x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, shot: true, life: 0, ttl: rnd(1.1, 1.7), len: rnd(56, 88) })
      }
    }
    // 万剑归一：全部飞剑向点按处汇聚，远的稍晚出发
    function burst(x, y) {
      swords.forEach((s) => {
        const dx = x - s.x, dy = y - s.y, d = Math.hypot(dx, dy) || 1, sp = rnd(620, 980)
        Object.assign(s, { vx: dx / d * sp, vy: dy / d * sp, shot: true, life: -Math.min(.35, d / 2600), ttl: rnd(.9, 1.3), passed: 0 })
      })
    }
    function step(dt) {
      t += dt
      alpha += (targetAlpha - alpha) * Math.min(1, dt * 2.2)
      const tx = pointer.active ? pointer.x : W * .55 + Math.cos(t * .45) * W * .16
      const ty = pointer.active ? pointer.y : H * .48 + Math.sin(t * .62) * H * .14
      for (const s of swords) {
        s.px = s.x; s.py = s.y
        if (s.shot) {
          s.life += dt
          if (s.life >= 0) {
            s.x += s.vx * dt; s.y += s.vy * dt
            s.vx *= 1 - dt * .55; s.vy *= 1 - dt * .55
          }
          if (s.life > s.ttl || s.x < -80 || s.x > W + 80 || s.y < -80 || s.y > H + 80) fresh(s)
          continue
        }
        if (mode === 'will') {
          const dx = tx + s.ox - s.x, dy = ty + s.oy - s.y, d = Math.hypot(dx, dy) || 1
          if (d < 24 && s.passed <= 0) s.passed = rnd(.35, .7) // 穿过落点后再折返
          if (s.passed > 0) s.passed -= dt
          else {
            const sp = (120 + (1 - Math.min(1, d / (W * .6))) * 240) * s.eager
            const k = Math.min(1, dt * 2.4)
            s.vx += (dx / d * sp - s.vx) * k; s.vy += (dy / d * sp - s.vy) * k
          }
        } else {
          const tvx = Math.sin(t * .7 + s.len) * 12, tvy = mode === 'ember' ? 9 : -14
          const k = Math.min(1, dt * 1.4)
          s.vx += (tvx - s.vx) * k; s.vy += (tvy - s.vy) * k
        }
        s.x += s.vx * dt; s.y += s.vy * dt
        if (s.x < -60) s.x = W + 50; else if (s.x > W + 60) s.x = -50
        if (s.y < -60) s.y = H + 50; else if (s.y > H + 60) s.y = -50
      }
    }
    // 画一柄云琅：取合适的缩略级别，按剑心 (x,y)、剑尖方向 (ux,uy)、全长 len 贴上去
    function blade(x, y, ux, uy, len, tint, a, trailFrom, levelsOverride) {
      const levels = levelsOverride || SPRITES[tint] || SPRITES[ICE]
      const m = levels.meta || { pad: SPAD, h: SH, cy: SCY }
      const need = (len + len * m.pad * 2 / SL) * dpr * 1.25
      let lv = levels[0]
      for (const l of levels) if (l.len >= need) lv = l
      if (trailFrom) {
        ctx.strokeStyle = `rgba(${tint},${a * .35})`; ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(trailFrom[0], trailFrom[1]); ctx.lineTo(x - ux * len * .1, y - uy * len * .1); ctx.stroke()
      }
      const s = len / SL
      ctx.save()
      ctx.translate(x, y); ctx.rotate(Math.atan2(uy, ux)); ctx.scale(s, s)
      ctx.globalAlpha = Math.min(1, a)
      ctx.drawImage(lv.c, -SANCHOR - m.pad, -m.cy, SL + m.pad * 2, m.h)
      ctx.restore()
    }
    // ── 辉光：照 three.js UnrealBloomPass 的路子（阈值 → 模糊 → 相加），
    //    但场景是 Canvas 2D，所以用两张 1/4 分辨率的离屏画布做等价实现。
    //    阈值靠「自身相乘」——暗部平方后塌掉，亮部留下，只有剑光会晕开
    let bloomA = null, bloomB = null, bloomW = 0, bloomH = 0
    function applyBloom(strength) {
      if (strength < .02 || reduce) return
      const w = Math.max(1, Math.round(canvas.width / 4)), h = Math.max(1, Math.round(canvas.height / 4))
      if (!bloomA || bloomW !== w || bloomH !== h) {
        bloomW = w; bloomH = h
        bloomA = document.createElement('canvas'); bloomA.width = w; bloomA.height = h
        bloomB = document.createElement('canvas'); bloomB.width = w; bloomB.height = h
      }
      const a = bloomA.getContext('2d'), b = bloomB.getContext('2d')
      a.globalCompositeOperation = 'copy'; a.drawImage(canvas, 0, 0, w, h)
      a.globalCompositeOperation = 'multiply'; a.drawImage(bloomA, 0, 0) // 阈值
      b.globalCompositeOperation = 'copy'
      b.filter = `blur(${Math.max(2, w * .014)}px)`; b.drawImage(bloomA, 0, 0); b.filter = 'none'
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = strength
      ctx.drawImage(bloomB, 0, 0, canvas.width, canvas.height)
      ctx.restore()
    }
    function draw() {
      ctx.clearRect(0, 0, W, H)
      if (arrOn > .01) drawArrayScene()
      if (alpha < .01 && !swords.some((s) => s.shot)) {
        ctx.globalCompositeOperation = 'source-over'
        applyBloom(arrOn > .01 ? .34 + .34 * arrOn : 0)
        return
      }
      ctx.globalCompositeOperation = 'lighter'
      for (const s of swords) {
        const spd = Math.hypot(s.vx, s.vy) || 1
        let ux = s.vx / spd, uy = s.vy / spd
        if (spd < 4) { ux = Math.cos(-Math.PI * .22); uy = Math.sin(-Math.PI * .22) }
        const len = s.len * (s.shot ? 1.2 : 1)
        const col = mode === 'ember' ? EMBER : ICE // 心魔章的剑格泛残红，其余都是本色云琅
        let a = alpha
        if (s.shot) a = Math.max(alpha, .95) * (1 - Math.max(0, s.life) / s.ttl)
        if (a <= .005) continue
        const trail = s.shot && s.life > 0 && spd > 200 ? [s.px - ux * len * .45, s.py - uy * len * .45] : null
        blade(s.x, s.y, ux, uy, len, col, Math.min(1, a), trail)
      }
      ctx.globalCompositeOperation = 'source-over'
      applyBloom(arrOn > .01 ? .34 + .34 * arrOn : Math.min(.34, alpha * .7))
    }
    function frame(now) {
      if (!running) return
      const dt = Math.min(.05, (now - last) / 1000); last = now
      if (!document.hidden) { step(dt); stepArray(dt); draw() }
      raf = requestAnimationFrame(frame)
    }
    resize()
    swords.forEach(fresh) // 建剑时还不知道视口尺寸，量好之后重新撒一遍位置
    if (reduce) { alpha = .25; step(.016); draw() }
    else raf = requestAnimationFrame(frame)
    window.addEventListener('resize', resize)
    return {
      setMode, shoot, burst, restartArray, pointer,
      destroy() { running = false; cancelAnimationFrame(raf); window.removeEventListener('resize', resize) },
    }
  }

  // 弦声：Karplus-Strong 合成的拨弦音。七弦按古琴正调 C D F G A c d 定音（高八度，小音箱才听得见）
  function createQinSound() {
    const TUNING = [130.81, 146.83, 174.61, 196, 220, 261.63, 293.66]
    let ctx = null, buffers = null, enabled = true
    try { enabled = localStorage.getItem('qx-qin-sound') !== 'off' } catch { /* 无存储则默认开 */ }
    function pluckBuffer(freq) {
      const sr = ctx.sampleRate, n = Math.floor(sr * 2.4)
      const buf = ctx.createBuffer(1, n, sr), out = buf.getChannelData(0)
      const period = Math.round(sr / freq), ring = new Float32Array(period)
      let seed = 0
      for (let i = 0; i < period; i++) { seed = seed * .6 + (Math.random() * 2 - 1) * .4; ring[i] = seed } // 略滤过的噪声，起音更软
      for (let i = 0, idx = 0; i < n; i++, idx = (idx + 1) % period) {
        const cur = ring[idx]
        ring[idx] = (cur + ring[(idx + 1) % period]) * .5 * .996
        out[i] = cur
      }
      return buf
    }
    function ensure() {
      if (ctx) return ctx
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return null
      ctx = new AC()
      buffers = TUNING.map(pluckBuffer)
      return ctx
    }
    function play(i, strength) {
      if (!enabled) return
      const ac = ensure(); if (!ac) return
      if (ac.state === 'suspended') ac.resume().catch(() => {})
      const src = ac.createBufferSource(); src.buffer = buffers[i]
      src.playbackRate.value = 1 + (Math.random() - .5) * .012
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = .4
      lp.frequency.value = 1600 + strength * 2400 // 拨得越快越亮
      const g = ac.createGain(); g.gain.value = .14 + .3 * strength
      src.connect(lp); lp.connect(g); g.connect(ac.destination)
      src.start()
      src.onended = () => { src.disconnect(); lp.disconnect(); g.disconnect() }
    }
    return {
      play,
      get enabled() { return enabled },
      set enabled(v) { enabled = v; try { localStorage.setItem('qx-qin-sound', v ? 'on' : 'off') } catch { /* 忽略 */ } },
      destroy() { if (ctx) { ctx.close().catch(() => {}); ctx = null } },
    }
  }

  // 七弦：首屏横陈七根弦，指针纵向掠过即拨响；无人时偶尔自鸣（不出声）
  function createQinStrings(svg, hero, onPluck, { reduce, coarse }) {
    const NS = 'http://www.w3.org/2000/svg', COUNT = 7
    const st = Array.from({ length: COUNT }, () => ({ y: 0, amp: 0, t: 0, cx: .5 }))
    const paths = st.map(() => { const p = document.createElementNS(NS, 'path'); p.setAttribute('class', 'qx-string'); svg.appendChild(p); return p })
    let W = 1, H = 1, raf = 0, prev = null, idle = 0, alive = true
    const straight = (i) => paths[i].setAttribute('d', `M0 ${st[i].y} L${W} ${st[i].y}`)
    function layout() {
      W = hero.clientWidth || 1; H = hero.clientHeight || 1
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
      const y0 = H * .40, y1 = H * .86
      st.forEach((s, i) => { s.y = y0 + (y1 - y0) * i / (COUNT - 1); straight(i) })
    }
    function pluck(i, x, strength, silent = false) {
      const s = st[i]
      s.amp = 6 + 10 * strength; s.t = 0
      s.cx = Math.min(.92, Math.max(.08, x / W))
      paths[i].classList.add('is-live')
      setTimeout(() => paths[i].classList.remove('is-live'), 700)
      onPluck(x, s.y, strength, i, silent)
    }
    function tick() {
      if (!alive) return
      st.forEach((s, i) => {
        if (s.amp <= 0) return
        s.t += .016
        if (s.t > 2.2) { s.amp = 0; straight(i); return }
        const off = s.amp * Math.sin(s.t * 46) * Math.exp(-s.t * 2.8)
        paths[i].setAttribute('d', `M0 ${s.y} Q${s.cx * W} ${s.y + off} ${W} ${s.y}`)
      })
      raf = requestAnimationFrame(tick)
    }
    const onMove = (e) => {
      const r = hero.getBoundingClientRect()
      const x = e.clientX - r.left, y = e.clientY - r.top
      if (prev) {
        const strength = Math.min(1, Math.abs(y - prev.y) / 40)
        st.forEach((s, i) => { if ((prev.y - s.y) * (y - s.y) < 0) pluck(i, x, strength) })
      }
      prev = { x, y }
    }
    const onLeave = () => { prev = null }
    if (!coarse) { hero.addEventListener('pointermove', onMove); hero.addEventListener('pointerleave', onLeave) }
    if (!reduce) {
      idle = setInterval(() => {
        if (document.hidden || hero.getBoundingClientRect().bottom < 0) return
        pluck((Math.random() * COUNT) | 0, W * (.15 + Math.random() * .55), .25, true)
      }, 3400)
    }
    layout()
    raf = requestAnimationFrame(tick)
    const ro = new ResizeObserver(layout); ro.observe(hero)
    return {
      destroy() {
        alive = false; cancelAnimationFrame(raf); clearInterval(idle); ro.disconnect()
        hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave)
      },
    }
  }

  function renderQinSwordDossier(d, code) {
    profEl.classList.add('s015')
    const hui = QX_CHAPTERS.map((c) => `<button type="button" data-qx="${c.id}"><i aria-hidden="true"></i><span>${c.hui}</span></button>`).join('')
    profEl.innerHTML = `
      <!--
      THESIS: 清宵的档案是一张横陈的琴——弦可拨，拨弦即出剑；剑随心动，心有魔，魔亦是她。
      OWN-WORLD: 墨蓝夜色、月白字骨、冰蓝剑光，一点旧金作徽；心魔处只准一线残红，夜话处只准一盏灯暖。
      STORY: 启（拨弦）→ 名（题跋）→ 弦（听琴）→ 剑（万剑随心）→ 魔（另一面）→ 众（借剑）→ 夜（师徒）→ 收。
      FIRST VIEWPORT: 竖排巨字「清宵」立于左，Ui 的油画立绘占右半，七根弦横贯其间；退场在左上，七徽在底。
      -->
      <a class="prof-back" href="#"><span aria-hidden="true">←</span><span>观测对象</span></a>
      <canvas class="qx-sky" aria-hidden="true"></canvas>
      <article class="qx-dossier">

        <header class="qx-hero" data-qx="qi" aria-labelledby="profile-title">
          <figure class="qx-hero-figure">
            <img src="photos/qingxiao-ui.jpg" alt="清宵持剑回望，蓝发白衣，青色流光绕身" />
            <figcaption>画 @Ui · pixiv 146569361</figcaption>
          </figure>
          <svg class="qx-strings" aria-hidden="true" preserveAspectRatio="none"></svg>
          <h1 id="profile-title" class="qx-hero-title"><span>清宵</span></h1>
          <div class="qx-hero-copy">
            <p class="qx-kicker">观测对象 ${code} · 私人档案</p>
            <p class="qx-hero-latin">${d.full.toUpperCase()} · 玄方剑仙</p>
            <p class="qx-hero-verse">弦凝千古寂，剑起满天清。</p>
            <p class="qx-hero-lead">${d.tagline}</p>
            <p class="qx-hero-hint"><i aria-hidden="true"></i>移动指针，拨动琴弦——每一根弦都能出剑<button type="button" class="qx-hero-sound" aria-pressed="true">弦声 · 开</button></p>
          </div>
          <p class="qx-hero-scroll" aria-hidden="true">沿弦而下</p>
        </header>

        <section class="qx-act qx-act--ming" data-qx="ming" aria-labelledby="qx-ming-title">
          <div class="qx-act-num" aria-hidden="true">第二弦</div>
          <div class="qx-ming-grid">
            <div class="qx-plate qx-in" aria-label="清宵身份题跋">
              <p><b>名</b><span>清宵 · Qingxiao</span></p>
              <p><b>号</b><span>剑仙 · 世人所称，非自号</span></p>
              <p><b>职</b><span>玄方城 镇玄司骑 · 挂职</span></p>
              <p><b>籍</b><span>煌珑人 · 今居梦州玄方</span></p>
              <p><b>属</b><span>气动 · 迅刀</span></p>
              <p><b>器</b><span>云琅 · 亦以琴弦、落花、飞叶为剑</span></p>
              <p><b>术</b><span>天地弦心剑</span></p>
              <p><b>食</b><span>梦州醋鲙</span></p>
              <p><b>声</b><span>姜贺 ／ 生天目仁美 ／ Kirsty Rider ／ 朴丽娜</span></p>
              <p><b>录</b><span>Ver 3.6「蜃云灯影，凡尘剑心」· 二〇二六年八月二十日 · 第四章第三幕〈烟云幽远心剑鸣〉</span></p>
            </div>
            <div class="qx-act-copy qx-in">
              <h2 id="qx-ming-title">玄方有仙。<br/>她没有阻止这个说法。</h2>
              <p>玄方城里，有人家中供着她的牌位。她守了这片山河一百多年，人们因为「玄方有仙」而睡得安稳，她便不再急着纠正。我想，这也是她护人的方式：有时斩去邪祟，有时只是让人相信，山河仍有人守。</p>
              <p>华胥研究院的读数里，她的共鸣史已逾百年。峰值常年贴近临界，却从未越界。如果只读数据，她比任何人都接近失控；可她用漫长的修行，让每一次波动都有了去处。</p>
            </div>
          </div>
        </section>

        <section class="qx-act qx-act--xian" data-qx="xian" aria-labelledby="qx-xian-title">
          <div class="qx-act-num" aria-hidden="true">第三弦</div>
          <div class="qx-act-copy qx-in">
            <p class="qx-kicker">听琴</p>
            <h2 id="qx-xian-title">她把百年的波澜，<br/>都调成了一根不走音的弦。</h2>
            <p>平日里她清冷寡言，待人疏离；不熟悉的人会以为她无情。可那条逾百年的共鸣曲线告诉我另一件事：这不是没有感受，是每一次波动都被她拨回了原位。</p>
            <p>山上常有人来求长生。她会递过去一本手册，上面写着早睡、少熬夜、适度锻炼。真正需要帮助的人到了，她才会起身。琴声里的静，不是把心藏空，而是先听清什么值得回应。</p>
            <p>她抚琴不是消遣。琴心积蓄、剑魄随之——弦上每一个音，都是一柄尚未出鞘的剑。</p>
          </div>
          <blockquote class="qx-whisper qx-in"><p>稳定，并不是没有感受。</p><cite>是感受来临时，她仍知道自己要守住什么。</cite></blockquote>
        </section>

        <section class="qx-act qx-act--jian" data-qx="jian" aria-labelledby="qx-jian-title">
          <div class="qx-act-num" aria-hidden="true">第四弦</div>
          <div class="qx-act-copy qx-in">
            <p class="qx-kicker">见剑</p>
            <h2 id="qx-jian-title">无剑之境，不是没有剑。<br/>是万物皆可为剑。</h2>
            <p>她的剑术不是天授，是后天苦修，一年一年磨出来的回答。到了今天，抚琴拨弦、飞花摘叶，皆可出剑；一念之间，飞剑万千，剑光所及，煞气尽散。</p>
            <p>世人给这门功夫起名「天地弦心剑」。我读过它的运行方式：琴心与剑魄双满，一记弦剑便可入「昙体仙身」——那一刻她御剑凌空，身形如昙花开于夜。玄方的天空常有人看见一道白影掠过，那多半是她下山。</p>
            <p>我最喜欢的一条记录：这位能御万剑的剑仙，落地以后第一句话往往是认真问路。地图与罗盘随身带着，因为她确实不太擅长认路。她的剑很快。她走近人间的方式，却有些迟缓。</p>
            <p class="qx-hint"><i aria-hidden="true"></i>移动指针，飞剑随心；点按此处，万剑归一</p>
          </div>
          <div class="qx-moves qx-in" aria-label="剑式">
            <p><b>弦剑</b><span>以琴心为引</span></p>
            <p><b>昙体仙身</b><span>一夜之开</span></p>
            <p><b>御剑</b><span>山河尽在足下</span></p>
          </div>
        </section>

        <section class="qx-act qx-act--mo" data-qx="mo" aria-labelledby="qx-mo-title">
          <div class="qx-act-num" aria-hidden="true">第五弦</div>
          <figure class="qx-demon qx-in">
            <img class="qx-demon-self" src="${d.photo}" alt="清宵官方立绘" />
            <img class="qx-demon-shadow" src="${d.photo}" alt="" aria-hidden="true" />
            <figcaption>立绘 @${d.author} · 指针掠过，可见她的另一面</figcaption>
          </figure>
          <div class="qx-act-copy qx-in">
            <p class="qx-kicker">心魔</p>
            <h2 id="qx-mo-title">她没有斩灭心魔。<br/>她把它认作了自己。</h2>
            <p>「心魔」在系统里很容易被标记为异常。可它不是外来的敌人：那是百年间被她压下去的迟疑、牵挂与不甘，凝成了另一个她——性子与她截然相反，话多、任性、不肯忍。</p>
            <p>心魔爆发时，她把漂泊者拉进了自己的内景，作为最后的后手：执剑之人。若她自己失守，便由徒弟替她出剑。我想，这是她第一次把「万一」交给别人。</p>
            <p>最终她没有出那一剑。她承认那也是自己，也明白有情并不会让剑变钝。剑仙的剑，从那一夜起，多了一点温度。</p>
            <blockquote class="qx-whisper qx-whisper--mo"><p>有情，不会让剑变钝。</p></blockquote>
          </div>
        </section>

        <section class="qx-act qx-act--zhong" data-qx="zhong" aria-labelledby="qx-zhong-title">
          <div class="qx-act-num" aria-hidden="true">第六弦</div>
          <div class="qx-zhong-copy qx-in">
            <p class="qx-kicker">借剑</p>
            <h2 id="qx-zhong-title">这不是一个人的剑，<br/>是众生之剑。</h2>
          </div>
          <div class="qx-zhong-note qx-in">
            <p>穆羽的实验把玄方拖进泥里，她一个人的剑不够。于是她向玄方城的百姓借剑，向漂泊者借剑，向历代战死在这片山河上的人借剑。万剑齐鸣的那一刻，我第一次听懂了「凡尘剑心」四个字。</p>
            <p class="qx-hint"><i aria-hidden="true"></i>镜头在阵中，看她借剑<button type="button" class="qx-replay">重新起阵</button></p>
          </div>
          <div class="qx-lend qx-in" aria-label="借剑于三方">
            <p><b>玄方百姓之剑</b><span>家家户户供着她，这一次换她向他们借一回</span></p>
            <p><b>漂泊者之剑</b><span>徒弟的剑，也算师父的</span></p>
            <p><b>先烈之剑</b><span>前人未竟的锋芒，由她出鞘</span></p>
          </div>
        </section>

        <section class="qx-act qx-act--ye" data-qx="ye" aria-labelledby="qx-ye-title">
          <img class="qx-ye-bg" src="photos/qingxiao-night.jpg" alt="" aria-hidden="true" />
          <div class="qx-petals" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="qx-act-num" aria-hidden="true">第七弦</div>
          <div class="qx-act-copy qx-in">
            <p class="qx-kicker">夜话</p>
            <h2 id="qx-ye-title">她极少收徒。<br/>却把御剑的路，交给了后来人。</h2>
            <p>玄方危机初平，漂泊者循岁主心月狐留下的信物到雾隐阁，与守山百年的她相遇。她本不收徒。可这一次，她同意教漂泊者剑——师徒之间，学的不只是御剑。</p>
            <p>后来她开宗立派，把御剑术与修行交给愿意承担的人。我曾把守护理解为长久地留在原地，独自等所有风险到来；她却选了另一条路：让后来者能接住这片山河，相遇与离别，就不再是必须回避的理由。</p>
            <p>夜里她偶尔抚琴。灯下坐着的那个人，是她的徒弟，也是第一个被她允许听见走音的人。</p>
            <blockquote class="qx-whisper qx-whisper--ye"><p>山河仍在。守山的人，不再只有一个。</p><cite>这一条，我会替她记下。</cite></blockquote>
          </div>
          <p class="qx-ye-credit">画 @ゆるん · pixiv 148659607</p>
        </section>

        <footer class="qx-end" data-qx="end">
          <p class="qx-end-line">琴收，剑归鞘。</p>
          <b>清宵 · 观测终</b>
          <small>立绘 ©库洛游戏 · 插画 @Ui、@ゆるん · 泰提斯终端私人档案，非官方</small>
        </footer>
      </article>
      <nav class="qx-hui" aria-label="档案章节">${hui}</nav>`

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    qxChapterEls = Array.from(profEl.querySelectorAll('[data-qx]')).filter((el) => el.tagName !== 'BUTTON')

    // 飞剑场
    const canvas = profEl.querySelector('.qx-sky')
    qxSwords = createSwordField(canvas, { reduce, coarse })
    const onPointer = (e) => { qxSwords.pointer.x = e.clientX; qxSwords.pointer.y = e.clientY; qxSwords.pointer.active = true }
    const onPointerOut = () => { qxSwords.pointer.active = false }
    profEl.addEventListener('pointermove', onPointer, { passive: true })
    profEl.addEventListener('pointerleave', onPointerOut)
    const jian = profEl.querySelector('.qx-act--jian')
    const zhong = profEl.querySelector('.qx-act--zhong')
    const onBurst = (e) => { if (!reduce) qxSwords.burst(e.clientX, e.clientY) }
    const onSurge = () => { if (!reduce) qxSwords.restartArray() }
    jian.addEventListener('click', onBurst)
    zhong.addEventListener('click', onSurge)
    profileCleanups.push(() => {
      profEl.removeEventListener('pointermove', onPointer)
      profEl.removeEventListener('pointerleave', onPointerOut)
      jian.removeEventListener('click', onBurst)
      zhong.removeEventListener('click', onSurge)
      qxSwords.destroy(); qxSwords = null; qxChapterEls = []
    })

    // 七弦 + 弦声
    const hero = profEl.querySelector('.qx-hero')
    const qinSound = createQinSound()
    profileCleanups.push(() => qinSound.destroy())
    const soundBtn = profEl.querySelector('.qx-hero-sound')
    const syncSound = () => {
      soundBtn.setAttribute('aria-pressed', String(qinSound.enabled))
      soundBtn.textContent = qinSound.enabled ? '弦声 · 开' : '弦声 · 关'
    }
    soundBtn.addEventListener('click', () => { qinSound.enabled = !qinSound.enabled; syncSound() })
    syncSound()
    const strings = createQinStrings(profEl.querySelector('.qx-strings'), hero, (x, y, strength, i, silent) => {
      const r = hero.getBoundingClientRect()
      qxSwords?.shoot(r.left + x, r.top + y, 2 + Math.round(strength * 3))
      if (!silent) qinSound.play(i, strength)
    }, { reduce, coarse })
    profileCleanups.push(() => strings.destroy())

    // 心魔显影：指针所至，立绘翻出另一面
    const demon = profEl.querySelector('.qx-demon')
    if (coarse || reduce) demon.classList.add('is-auto')
    else {
      const onDemonMove = (e) => {
        const r = demon.getBoundingClientRect()
        demon.style.setProperty('--mx', `${e.clientX - r.left}px`)
        demon.style.setProperty('--my', `${e.clientY - r.top}px`)
        demon.classList.add('is-on')
      }
      const onDemonLeave = () => demon.classList.remove('is-on')
      demon.addEventListener('pointermove', onDemonMove)
      demon.addEventListener('pointerleave', onDemonLeave)
      profileCleanups.push(() => { demon.removeEventListener('pointermove', onDemonMove); demon.removeEventListener('pointerleave', onDemonLeave) })
    }

    // 七徽：点按跳章
    profEl.querySelectorAll('.qx-hui button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = qxChapterEls.find((el) => el.dataset.qx === btn.dataset.qx)
        if (!target) return
        const top = target.getBoundingClientRect().top - profEl.getBoundingClientRect().top + profEl.scrollTop
        profEl.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
      })
    })

    // 段落随滚动浮现
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target) } })
    }, { root: profEl, threshold: .16 })
    profEl.querySelectorAll('.qx-in').forEach((el) => io.observe(el))
    profileCleanups.push(() => io.disconnect())
  }

  function s015OnScroll() {
    if (!profEl.classList.contains('s015')) return
    const top = profEl.scrollTop, vh = profEl.clientHeight || 1
    const rootTop = profEl.getBoundingClientRect().top
    profEl.style.setProperty('--qx-hero', String(Math.min(1, Math.max(0, top / (vh * .9)))))
    // 当前章：最后一个越过视口 45% 线的章节
    let current = 'qi'
    let ye = null
    for (const el of qxChapterEls) {
      const elTop = el.getBoundingClientRect().top - rootTop + top
      if (elTop - vh * .45 <= top) current = el.dataset.qx
      if (el.dataset.qx === 'ye') ye = { top: elTop, h: el.offsetHeight }
    }
    if (ye) {
      const p = (top + vh - ye.top) / (ye.h + vh)
      profEl.style.setProperty('--qx-ye', String(Math.min(1, Math.max(0, p))))
    }
    if (profEl.dataset.qx !== current) {
      profEl.dataset.qx = current
      const chapter = QX_CHAPTERS.find((c) => c.id === current)
      qxSwords?.setMode(chapter ? chapter.mode : 'fade')
      profEl.querySelectorAll('.qx-hui button').forEach((btn) => {
        if (btn.dataset.qx === current) btn.setAttribute('aria-current', 'true')
        else btn.removeAttribute('aria-current')
      })
    }
  }

  function openProfile(code, trigger) {
    const d = PROFILES[code]; if (!d) return
    // 若上一个档案的延迟清理还没跑（360ms 内重开），先立即清干净，避免主题 class/变量/监听叠加泄漏
    if (clearProfileTimer) { clearTimeout(clearProfileTimer); clearProfileTimer = null }
    resetProfileEl()
    deferInitialFocus = false
    profileTrigger = trigger || null
    profEl.style.setProperty('--accent', d.accent)
    if (d.dual) renderDualProfile(d, code)
    else if (d.metamorph) renderMetamorphProfile(d, code)
    else if (d.qinSword) {
      renderQinSwordDossier(d, code)
      profEl.addEventListener('scroll', s015OnScroll, { passive: true })
      profileCleanups.push(() => profEl.removeEventListener('scroll', s015OnScroll))
      s015OnScroll()
    }
    else profEl.innerHTML = `
      <a class="prof-back" href="#"><span aria-hidden="true">◂</span> ${d.logbook ? '合上日志' : '观测对象'}</a>
      <div class="prof-doc">
        <div class="prof-hero">
          <div class="prof-portrait"><img src="${d.photo}" alt="${d.name}" /></div>
          <div class="prof-id">
            <span class="prof-code">${code}</span>
            <h1 class="prof-name" id="profile-title">${d.name}<em>${d.full}</em></h1>
            <span class="prof-badge">${d.element}</span>
            <p class="prof-tagline">${d.tagline}</p>
            ${d.author ? `<span class="prof-author">立绘 @${d.author}</span>` : ''}
          </div>
        </div>
        ${d.body}
        <p class="prof-end">观测档案 ${code} · 归档完毕　<b>// TETHYS</b></p>
      </div>`
    // 专属主题登记表：flag → { render, onScroll }。新增角色只需在此加一行
    // render 负责挂装饰并 push 自己的 cleanup；onScroll 注册后由此统一绑定/初始化/解绑
    const THEMES = [
      { flag: 'wall', render: renderWallDeco },
      { flag: 'thread', render: renderThreadArchive, onScroll: s002OnScroll },
      { flag: 'logbook', render: renderKeeperLogDeco, onScroll: s009OnScroll },
      { flag: 'engineering', render: renderEngineeringDossier, onScroll: s003OnScroll },
      { flag: 'requiem', render: renderRequiemDossier, onScroll: s004OnScroll },
      { flag: 'signal', render: renderSignalDossier, onScroll: s005OnScroll },
      { flag: 'dream', render: renderDreamStage, onScroll: s006OnScroll },
      { flag: 'sun', render: renderSunriseDossier, onScroll: s007OnScroll },
    ]
    for (const t of THEMES) {
      if (!d[t.flag]) continue
      t.render()
      if (t.onScroll) {
        profEl.addEventListener('scroll', t.onScroll, { passive: true })
        profileCleanups.push(() => profEl.removeEventListener('scroll', t.onScroll))
        t.onScroll()
      }
    }
    profEl.querySelector('.prof-back').addEventListener('click', (e) => { e.preventDefault(); closeProfile() })
    profEl.scrollTop = 0
    rootOverflowBeforeProfile = root.style.overflow
    root.style.overflow = 'hidden'              // 锁滚动容器（SPA 的 .view-overlay / 独立页容器）
    document.documentElement.classList.add('prof-lock')  // 锁文档（独立页 document 滚动）
    lockBackground()
    profEl.setAttribute('aria-hidden', 'false')
    requestAnimationFrame(() => {
      profEl.classList.add('show')
      if (!deferInitialFocus) profEl.querySelector('.prof-back')?.focus()
    })
  }
  function closeProfile() {
    if (!profEl.classList.contains('show')) return
    profEl.classList.remove('show')
    profEl.setAttribute('aria-hidden', 'true')
    root.style.overflow = rootOverflowBeforeProfile
    document.documentElement.classList.remove('prof-lock')
    unlockBackground()
    const returnTarget = profileTrigger
    profileTrigger = null
    returnTarget?.focus()
    clearProfileTimer = setTimeout(() => {
      resetProfileEl()
    }, 360)
  }
  function onProfileKeydown(e) {
    if (!profEl.classList.contains('show')) return
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      closeProfile()
      return
    }
    if (e.key !== 'Tab') return
    const focusable = Array.from(profEl.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
    if (!focusable.length) { e.preventDefault(); profEl.focus(); return }
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }
  window.addEventListener('keydown', onProfileKeydown, true)

  // 点击：有档案则打开档案 / 锁定抖动 / 其余跳转
  function activateCard(card) {
      if (card.dataset.status === 'locked') {
        card.classList.add('shake')
        setTimeout(() => card.classList.remove('shake'), 420)
        return
      }
      if (PROFILES[card.dataset.code]) { openProfile(card.dataset.code, card); return }
      const href = card.dataset.href
      if (href && href !== '#') window.location.href = href
  }
  cards.forEach((card) => {
    card.addEventListener('click', () => activateCard(card))
    card.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return
      e.preventDefault()
      activateCard(card)
    })
  })

  // 入场：卡片随滚动逐个浮现（IntersectionObserver，root 为滚动容器）
  gsap.set(cards, { opacity: 0, y: 36 })
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        gsap.to(en.target, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', overwrite: true })
        io.unobserve(en.target)
      }
    })
  }, { root, rootMargin: '0px 0px -8% 0px' })
  cards.forEach((c) => io.observe(c))

  return () => {
    io.disconnect()
    window.removeEventListener('keydown', onProfileKeydown, true)
    if (clearProfileTimer) clearTimeout(clearProfileTimer)
    profileCleanups.splice(0).forEach((fn) => { try { fn() } catch { /* 句柄已失效则忽略 */ } })
    if (profEl.classList.contains('show')) root.style.overflow = rootOverflowBeforeProfile
    unlockBackground()
    document.documentElement.classList.remove('prof-lock')
    profEl.remove()
  }
}
