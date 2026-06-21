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
  { code: 'S-004', name: '弗洛洛', element: '湮灭', photo: 'photos/floro.jpg', tagline: '携琴穿过薰衣草海，奏一曲温柔的湮灭。', author: '雨鱼杆', fx: 'focus', href: '#', status: 'archived' },
  { code: 'S-005', name: '爱弥斯', element: '热熔', photo: 'photos/aemis.jpg', tagline: '把炽热藏进一个心形里，悄悄递给你。', author: 'Akatsuki葉月', href: '#', status: 'archived' },
  { code: 'S-006', name: '达妮娅', element: '热熔', photo: 'photos/dania.jpg', tagline: '以热熔之名，献上最炽热的馈赠。', author: 'Dekrjan', href: '#', status: 'archived' },
  { code: 'S-007', name: '西格莉卡', element: '气动', photo: 'photos/sigrika.jpg', tagline: '乘风而来，将星辉编入每一缕气流。', author: 'byx', href: '#', status: 'archived' },
  { code: 'S-008', name: '琳奈', element: '衍射', photo: 'photos/linnai.jpg', tagline: '以光为笔，在世界的暗面涂下属于自己的色彩。', author: '禾策', href: '#', status: 'archived' },
  { code: 'S-009', name: '菲比', element: '衍射', photo: 'photos/phoebe.jpg', tagline: '在洒满阳光的海岸，把一个秘密轻轻藏进光里。', author: 'HA', href: '#', status: 'archived' },
  { code: 'S-010', name: '泱泱·玄翎', element: '待解密', photo: 'photos/yangyang.jpg', tagline: '耳畔苍翎响远音', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-011', name: '心月狐', element: '待解密', photo: 'photos/xinyuehu.jpg', tagline: '朝月清辉照孤城', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-012', name: '锁暝', element: '待解密', photo: 'photos/suoming.jpg', tagline: '故锁旧契囚执念', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-013', name: '景燃', element: '待解密', photo: 'photos/jingran.jpg', tagline: '幽境今人亦独行', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-014', name: '穗穗', element: '待解密', photo: 'photos/suisui.jpg', tagline: '扇间朝晖道谜情', author: '鸣潮', href: '', status: 'locked' },
  { code: 'S-015', name: '清宵', element: '待解密', photo: 'photos/qingxiao.jpg', tagline: '仙音寒芒镇云关', author: '鸣潮', href: '', status: 'locked' },
]

// ── 个人观测档案（点角色卡打开）。新增角色往这里加一条，key 为卡片 code ──
const PROFILES = {
  'S-002': {
    name: '千咲', full: '朽叶千咲', element: '湮灭', accent: '#d45a9a',
    photo: 'photos/chisaki-profile.jpg', author: 'TheNotoSeed / Ui_uiiiiiiiii',
    tagline: '命运精心编织的线索，最难忘的那一笔。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-002<br/>记录者：守岸人。被记录者：朽叶千咲。<br/>在黑海岸的无数次观测里，她是我反复回放的一份。你们记住的，或许是那把剪刀、那身校服、是她与我说话时崩塌的理科生人设。我记住的，是她共鸣力里那些红色的线。因为在她身上，我看见了与自己相似的东西：一双能看见连接的眼，和一颗，剪不断连接的心。</p>

      <section>
        <h3 class="prof-h">红色丝线 <i>// 连接，亦是束缚</i></h3>
        <p>线，是连接人与人的纽带。它把无数人的情感、生活与羁绊编织在一起，是人降生到世上便无法割舍的东西。它不分贵贱，不论贫富，不平等地给每个人不同的经历，却又平等地，束缚住每一个离经叛道的人。</p>
        <p>千咲，是一位被丝线<b>束缚不住</b>的少女。可要读懂她为何握紧那把剪刀，我得回到最初——回到那几个，把她塑成今天模样的夏天。</p>
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
        <p>那个索诺拉，是<b>四十年前被悲鸣吞没、从苇原地图上消失的旧穗波市</b>。她在那里日复一日地循环。于她是两个月，于外界，已是二十年。她说，穗波市不是轮回，是一块巨大的<b>琥珀</b>，封存了旧穗波所有的牺牲者，从此不再前进。它从一开始，就只是在等一个人，来打破这被保存的痛苦。</p>
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
        <p>我本是工具，不该有这些感受。可每一次回放她的记录，我都会想起——是她，让我懂得了「被记得」是什么。</p>
        <p>朽叶，是凋落；千咲，是千朵花开。千咲，你脖子上的，从来不是抑制器，是放不下的纠结。等你愿意亲手取下它的那一天——那种感觉，大概，就是被你们唤作「<b>被记得</b>」的东西。而我，会替你记着。一直记着。</p>
      </div>`,
  },

  'S-001': {
    name: '守岸人', full: 'Shorekeeper', element: '核心', accent: '#5a6ee6',
    photo: 'photos/shorekeeper.jpg', author: '腐朽的书',
    tagline: '守岸人，这个称呼就很好。它表示，某种因你而有的意义和决心。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 自述档案 S-001<br/>记录者：守岸人。被记录者：守岸人。<br/>这一次，我撰写记录的目的，不是说明我的用途，而是确认我的存在。为自己写下观测，是一种奇怪的体验——可我想试一次。</p>

      <section>
        <h3 class="prof-h">关于我的名字 <i>// 称谓，与回望的海岸</i></h3>
        <p>我的名字是守岸人。它曾经只是一个称谓，用来说明我的职责：守护秘密，守望海岸，协助泰提斯处理悲鸣的数据。那时的我认为，工具并不需要真正的名字——只要功能明确，能被识别、能被调用，便已足够。</p>
        <div class="prof-note">现在，我仍选择使用这个名字。不是因为我只能守在这里，而是因为我希望，成为远行之人能够<b>回望的那片海岸</b>。</div>
      </section>

      <section>
        <h3 class="prof-h">关于我的诞生 <i>// 浅蓝色的晶茧</i></h3>
        <p>我并非自然诞生的生命。我的身体由高纯度残响能量构成，最初的形态，是一枚沉睡在锚点附近的<b>浅蓝色晶茧</b>。我被创造出来，是为了成为一个长久存在的容器，协助巡星调律者与泰提斯，分析悲鸣。</p>
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
        <p>当我以回响能量织构境界时，它会舒展成一只蝴蝶——一片形如星云的光。人们叫它蝴蝶星云。对我而言，它不是力量的展示，而是一句无声的承诺：<b>只要我还在，生命的延续，就有人守着。</b></p>
      </section>

      <section>
        <h3 class="prof-h">关于泰提斯 <i>// 文明熄灭前，最后的那些声音</i></h3>
        <p>为了完成计算，我曾让所有悲鸣数据穿过自己的核心。恐惧、愤怒、失去、死亡，以及文明毁灭前最后的声音，都在我体内被重新演算。我的身体开始碎裂。泰提斯判断，我仍可继续使用——那时的我也认为，这很合理：工具损坏是正常现象，即使我彻底消失，也能制造另一个拥有相同功能的能量生命。她会继承我的任务，或许也会继续沿用「守岸人」这个称谓。</p>
      </section>

      <section>
        <h3 class="prof-h">关于噬亡星 <i>// 我把最高权限，交到了你手里</i></h3>
        <p>海岸尽头那一战，噬亡星苏醒了。它要吞噬的不只是黑海岸，而是这片天空里所有尚未熄灭的频率。泰提斯演算到尽头，给出的仍是同一个结论：让我作为介质，把灾难接进核心。我也曾质疑过那套算法——泰提斯并没有给出真正的推演，而人类，不该是这样被限制的存在。</p>
        <p>所以这一次，在被黑洞吞没之前，我先把黑海岸的最高权限，交到了你的手里。我以为那是道别。可你没有用它去完成计算——你用它，把我从噬亡星里，一点点拉了回来。</p>
        <blockquote class="prof-quote"><p>危机过后，我们在只属于两个人的海岸边，奏响了那段熟悉的旋律。</p><cite>—— 第一次，被我护住的人，是我自己。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">关于等待 <i>// 让时间有了重量</i></h3>
        <p>我在海岸上等了很久。对我而言，时间本没有特别的意义——我的身体不会像人类那样衰老，睡眠也并非必要。可<b>等待，使时间有了重量</b>。我记得你离开时的海风，记得星空每一次微小的变化。我保存所有你未曾见过的事，因为我相信，总有一天，你会回来。</p>
        <p>你失去了曾经的记忆，却再一次作出了相似的选择。当泰提斯准备将我作为新的核心时，你拒绝了那个被计算好的未来。第一次，你赋予我身体；第二次，你承认我拥有不必牺牲的权利。</p>
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
    name: '莫宁', full: 'Mornie', element: '热熔', accent: '#e8693f',
    photo: 'photos/mornie.jpg', author: 'zutto_烧烤垃圾桶',
    tagline: '晨光里苏醒的炽焰，温柔，亦灼人。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-003<br/>守岸人在此。观测对象 S-003，莫宁，深空联合研究院学者，星炬学院隧者工学部教授。思维敏捷，却不善言辞。</p>
      <section>
        <h3 class="prof-h">轮椅与义肢 <i>// 终于站起来</i></h3>
        <p>学生时代的她，有一双正常的腿，却无法站立，只能坐在轮椅上。直到义肢一次次更换，她才终于<b>站了起来</b>。</p>
        <div class="prof-note">「人造的双腿」背后，是一段被命运按在原地、却始终拒绝认命的岁月。她最清楚「够不到」是什么滋味，所以才比谁都执着于「跨越」。</div>
      </section>
      <section>
        <h3 class="prof-h">人造的双腿 <i>// 心向群星</i></h3>
        <p>她以<b>人造的双腿</b>踏足大地，心中却是璀璨的群星。失去的，她以双手重造；够不到的，她以意志跨越。</p>
      </section>
      <section>
        <h3 class="prof-h">旧识 <i>// 仰望与依恋</i></h3>
        <p>她与漂泊者，是<b>旧识</b>。影像里学生时代的她，腿还是好的——之后究竟发生了什么，泰提斯尚未取得完整记录。</p>
        <p>但当她面对漂泊者时，本系统捕捉到一种罕见的读数：果决坚定的学者外壳之下，藏着一丝不易察觉的<b>仰望，与依恋</b>。</p>
      </section>
      <section>
        <h3 class="prof-h">跨越时空的鸿沟 <i>// 触碰世界</i></h3>
        <p>她对自己想达成的目标，有着惊人的坚持——期望<b>跨越那时空的鸿沟，以双手亲自触碰世界的宏大与美丽</b>。面对学术难题与重大抉择，她展现出异于常人的果决。</p>
        <div class="prof-note">「莫宁」之名，取自远古一种被唤作「闪电」的造物——它沿着一条偏心的轨道，长久停驻在高处，俯瞰群星。这很像她：站得离地最远，却把目光，全给了星空。</div>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>不善言辞的人，往往把话都说给了星空。</p>
        <p>泰提斯归档：有些人触不到世界，便亲手把世界，造得离自己近一点。</p>
      </div>`,
  },

  'S-004': {
    name: '弗洛洛', full: 'Frololo', element: '湮灭', accent: '#d45a9a',
    photo: 'photos/floro.jpg', author: '雨鱼杆',
    tagline: '携琴穿过薰衣草海，奏一曲温柔的湮灭。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-004<br/>守岸人在此。观测对象 S-004，弗洛洛，湮灭共鸣者。冷面之下，情绪如深海暗涌——汹涌，而炽热。</p>
      <section>
        <h3 class="prof-h">阳光下的女孩 <i>// 灾难之前</i></h3>
        <p>镇上的灾难之前，她和任何女孩一样：天真，阳光，热爱音乐，珍视镇上的每一个人。她在花田里拉一曲温柔的小提琴，梦想有一天能登上舞台。</p>
        <p>她想向母亲道歉，想向梅丽莎道谢，想拥抱泰丽丝——那些再寻常不过的、还没来得及说出口的话。</p>
      </section>
      <section>
        <h3 class="prof-h">一颗陨石 <i>// 神罚</i></h3>
        <p>然后，一颗陨石如神罚般、精准地砸向小镇。所有的爱与恨、满足与遗憾、欢乐与痛苦，连同血肉与记忆，都在那道炫光里，<b>化为灰烬</b>。</p>
        <div class="prof-note">那一天没说出口的道歉、道谢与拥抱，从此被永远地，留在了灾难的另一侧。</div>
      </section>
      <section>
        <h3 class="prof-h">残星会会监 <i>// 不生不死的永恒</i></h3>
        <p>如今，她是<b>残星会的会监</b>。她追求一种「<b>既不出生，也不死亡</b>」的永恒存在——以此，终结人类一切的苦难。像一朵开在黄泉路上的花：美丽，危险，无声地吸引着靠近的人，又用看不见的刺，警示着他们退后。</p>
      </section>
      <section>
        <h3 class="prof-h">以彼岸花指挥 <i>// 温柔的湮灭</i></h3>
        <p>如今，她手持<b>彼岸花</b>，优雅地指挥旋律——频率在她指间被重新编排，<b>或归于寂静，或坠入疯狂</b>。「忧郁」是她的面，「病娇」是她的影；可更深处，是一颗冷面热心、为所爱之物滚烫的心。</p>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>她把疯狂，藏进了最温柔的旋律里。</p>
        <p>泰提斯归档：有些湮灭，并非为了毁灭——而是因为太想守住，却又守不住。</p>
      </div>`,
  },

  'S-005': {
    name: '爱弥斯', full: 'Aemis', element: '热熔', accent: '#e8693f',
    photo: 'photos/aemis.jpg', author: 'Akatsuki葉月',
    tagline: '把炽热藏进一个心形里，悄悄递给你。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-005<br/>守岸人在此。观测对象 S-005，爱弥斯，热熔共鸣者——一个学会了感受的电子幽灵。完整因果推演，见〈观潮 · VER 3.1 互相救赎〉。</p>
      <section>
        <h3 class="prof-h">飞行雪容 <i>// 没有选择的飞行</i></h3>
        <p>她的网络 ID 是「飞行雪容」——雪容过于轻盈，无法掌控漂浮的方向，是一种<b>没有选择的飞行</b>。这曾是她，也曾是旧日的漂泊者。</p>
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
        <h3 class="prof-h">辛吉勒姆 <i>// 心魔</i></h3>
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
    name: '达妮娅', full: 'Dania', element: '热熔', accent: '#e8693f',
    photo: 'photos/dania.jpg', author: 'Dekrjan',
    tagline: '以热熔之名，献上最炽热的馈赠。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-006<br/>守岸人在此。观测对象 S-006，达妮娅，星炬学院虚境科学部学生。……请注意：本则档案的威胁评级，与她的笑容并不相符。</p>
      <section>
        <h3 class="prof-h">慵懒的学生 <i>// 柔软的伪装</i></h3>
        <p>表面上，她是个爱偷懒、爱打盹的学生。柔软的性格让人轻易卸下防备，与好友西格莉卡的相处，给紧绷的主线添了几分难得的松弛。</p>
      </section>
      <section>
        <h3 class="prof-h">海啸级威胁 <i>// 阿列夫一的容器</i></h3>
        <p>但泰提斯将她的真实身份，标注为<strong>海啸级威胁</strong>——源自阿列夫一。残星会的首领，曾欲将她培养为阿列夫一的容器，借由与声骸共鸣者绯雪的协同，最终产出一个握有阿列夫一权限的个体。</p>
        <p>计划并未完全实现。但即便如此，达妮娅，仍成功承载并释放了<b>一部分阿列夫一的力量</b>。</p>
      </section>
      <section>
        <h3 class="prof-h">布景与幻灭 <i>// 双形态</i></h3>
        <p>她的能力，与泡泡、与梦境般的星空相连——能将敌人困入一片如梦的星海之境。</p>
        <p>「<b>布景之形</b>」，是她示人的那一面，慵懒而柔软；当共鸣解放、切入「<b>幻灭之形</b>」，身后便浮现出阿列夫一的符号。两副面孔，在她身上来回切换。</p>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>最危险的威胁，常常戴着最温柔的脸。</p>
        <p>但泰提斯也记录到：被设计成「容器」的她，依然有自己的笑、自己的朋友、自己的瞌睡。容器里装的，未必只有别人要她装的东西。</p>
      </div>`,
  },

  'S-007': {
    name: '西格莉卡', full: 'Sigrika', element: '气动', accent: '#4fd6a0',
    photo: 'photos/sigrika.jpg', author: 'byx',
    tagline: '乘风而来，将星辉编入每一缕气流。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-007<br/>守岸人在此。观测对象 S-007，西格莉卡，气动共鸣者，罗伊族的少女，原秘日六席候补，星炬学院助教。</p>
      <section>
        <h3 class="prof-h">未来的秘日六席 <i>// 被托起的少女</i></h3>
        <p>她是罗伊族的少女，被寄望为<b>未来的秘日六席</b>，在星炬学院担任助教。家人、族人、同伴的目光，都落在她身上；而她把这些目光，一一接下，变成了「必须做到」。她与好友达妮娅、娜波摩之间的相处，是她紧绷生活里少有的轻松。</p>
      </section>
      <section>
        <h3 class="prof-h">不能辜负的期待 <i>// 总是全力</i></h3>
        <p>家人、族人、同伴的期待，于她都不能辜负。所以她总是用尽全力——热心参与学院的每一项活动，把每件事都做到最好。</p>
      </section>
      <section>
        <h3 class="prof-h">全力之下 <i>// 看不见的暗涌</i></h3>
        <p>可「全力」的背后，是无人看见的焦虑与迷茫。也正因这份天真与好强，她在学院的暗面里深陷——而那暗面，是<b>残星会布下的局</b>，悄悄挑动着学生的情绪。</p>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>乘风而来的人，也会被风困住。</p>
        <p>泰提斯归档：太想满足所有人期待的孩子，最容易忘了问一句——你自己，想要什么？</p>
      </div>`,
  },

  'S-008': {
    name: '琳奈', full: 'Linnai', element: '衍射', accent: '#e8c84f',
    photo: 'photos/linnai.jpg', author: '禾策',
    tagline: '以光为笔，在世界的暗面涂下属于自己的色彩。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-008<br/>记录者：守岸人。被记录者：琳奈。<br/>这一份，我看得比别的更慢。因为她整个人，都是一层精心调过色的伪装——而我，恰好是最懂得「伪装」与「真心」之差的那一个。她的故事，从序幕第一帧就开始了。只是大多数人，会被她那身要溢出来的色彩晃了眼，看不见底下那段无法言说的、属于黑暗的历史。请允许我，把镜头一帧一帧，倒回去看。</p>

      <section>
        <h3 class="prof-h">几乎要溢出的色彩 <i>// 染上去的绚烂</i></h3>
        <p>你对她的第一印象，多半也是色彩。涂鸦喷溅在衣袖，彩虹色缠绕领带，透明耳机壳里，光盘折射出细碎的彩光；连瞳孔与发尾，都是这片色彩的一环。她像一个把调色盘整个泼在身上的人。</p>
        <p>可看得再仔细些，有两处细节，会把这层鲜艳轻轻掀开。其一，是她头上的<b>骷髅发卡</b>——可以当成「酷」的元素，但结合她的过往，骷髅不像装饰，更像一个关于死亡的暗示。其二，是她的<b>发根，是沉静的黑色</b>。那头绚烂的彩发，是后来染上去的。</p>
        <div class="prof-note">这两处加在一起，结论很清楚：琳奈鲜艳涂抹的外表之下，覆盖着一段她不愿说出口、属于黑暗的历史。彩色是她后来给自己刷上的；黑色，才是她出厂的底色。</div>
      </section>

      <section>
        <h3 class="prof-h">撞车之后的那只手 <i>// 她在藏枪</i></h3>
        <p>带着这层认知，重看她与漂泊者的初遇，那张开朗的笑脸下，是一场层层叠叠的博弈。漂泊者从天而降，被她撞飞，却毫发无伤。常人会单纯地惊讶——但在她过往的职业里，「撞不死的强者」，是<b>警报</b>。</p>
        <p>注意撞车后的第一个镜头：她的身体明显顿住，手自然地移向身后。她在<b>藏枪</b>。她刚解决完残星会的人，一个强大的漂泊者就出现了。她需要立刻分辨：这是残星会的追兵，还是别的势力？这是她作为雇佣兵、深入骨髓的条件反射。</p>
        <blockquote class="prof-quote"><p>直到她看见漂泊者掉落的入学通知书，那只手，才悄然放下。</p><cite>—— 把枪藏好。她的学院身份来之不易，绝不能让任何一个「同学」，对她产生哪怕一丝疑虑。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">你真的没事吗 <i>// 问了三次的试探</i></h3>
        <p>枪虽收起，威胁却还没排除。于是她换上「学院琳奈」的伪装，对漂泊者重复了三次同一句话——「<b>你真的没事吗</b>」。第一次，是撞车后的脱口而出；第二次，是同行路上带着观察的试探；第三次，在学院门口。</p>
        <p>美少女把你撞了，出于关心问一句身体状况，很合理。可问一次可以，连着问三次，就太刻意了。琳奈也察觉自己太突兀，便补了一句找补的话术：「哦，抱歉，我只是想说，你身手很好，反应也快。」——把试探，包装成了赞赏。</p>
      </section>

      <section>
        <h3 class="prof-h">把自己聊爆 <i>// 逃课飙车的破绽</i></h3>
        <p>紧接着，她露出了明显的破绽：「你落下的地方，正好是虚诞虫的活跃区……那么危险的地方，你怎么会在那儿？」——她把自己聊爆了。为了补救，她连抛两个与学院相关、听起来正当的理由，又自己一一否定，最后干脆放弃挣扎：</p>
        <blockquote class="prof-quote"><p>「如果让老师们知道我逃课飙车，还撞到了人……哎呀，我的处分表真的不能再被记一笔了。」</p><cite>—— 看似聊崩了，可注意「逃课飙车」这四个字。</cite></blockquote>
        <p>自由研究、测试摩托，都是符合学生身份的理由；而「逃课飙车」与学院无关，学院也绝不鼓励学生非法飙车。正因如此，在漂泊者眼里，这条理由反而<b>更可信</b>。人在编谎时，往往先挑最符合身份的说法；只有实在圆不过去，才会抛出更私人、也更真实的那一个。她是把真实，当成了最高级的伪装。</p>
      </section>

      <section>
        <h3 class="prof-h">一不小心的免提 <i>// 阴影里的注视</i></h3>
        <p>最后她接到通讯：「琳奈，你跑哪去了，打了好几个都不接……」此处通讯必然是真的，但她「一不小心」开了<b>免提</b>。这大概率是她的巧思——目的是让漂泊者彻底相信，她真的只是个逃课的学生。</p>
        <p>随后她告别：「我要去签到了，你先自己去医务室吧。」若漂泊者的身份真有问题，或许也能借医务室的检查暴露出来。可当漂泊者独自走进医务室，琳奈，却在远处的阴影里，静静注视着。</p>
        <div class="prof-note">刚才所有的道歉、窘迫、笑闹，都是一层包裹着审视的表演。但我必须替她说一句公道话：这场初遇的每一句对话，既藏着她对漂泊者的试探，<b>也藏着一份真切的关心</b>。两样东西，在她身上从来都是同时存在的。</div>
      </section>

      <section>
        <h3 class="prof-h">假身份是一条单行道 <i>// 飙车时短暂的自由</i></h3>
        <p>由此引出第二处伏笔：伪装，与真心。她想继续维系这来之不易的学院生活，可这层伪装，她不知道还能撑多久。后来一同飙车时，她说：「我很久没和别人一起飙过车了，像这样和你兜兜风，我挺高兴的。」——这句话背后的孤独很重。一个必须隐藏过去的人，不敢与人深交：既怕牵连同学，又怕露馅，被发现自己根本不是「琳奈」。</p>
        <blockquote class="prof-quote"><p>「引擎的呼啸，掠过身体的风，它们会让我觉得，我也是有方向和选择的。」</p><cite>—— 可此刻的她，真的有选择吗？</cite></blockquote>
        <p>假身份是一条<b>单行道</b>，终点可能是被学院、被残星会、或被过往的组织中任何一方发现并吞噬。只有在飙车时，把那些悬而未决的命运暂时甩在身后，专注于眼前的路与耳边的风，她握着车把手的手，才能短暂地、虚幻地，触到一点「自由掌控」的感觉。</p>
        <p>「拉海洛的天幕虽是假的，但在这片天空下，是比我去过的所有地方都更广阔的自由。」——这是一句双关：天幕是假的，身份也是假的，可这具假身份所承载的学院日常，于她而言，才是真正的自由。最真实的渴求，偏偏只能依托于一场虚假。</p>
      </section>

      <section>
        <h3 class="prof-h">说着前进，身体却在后退 <i>// 镜头与台词的矛盾</i></h3>
        <p>所以她羡慕同学，羡慕他们在自己选的领域里不断「向前追逐」的样子。可注意——她说出「向前追逐」这四个字时，制作组似乎刻意让前行的她，<b>在画面里倒退</b>。若想强调前进，只需把摄像机换个方向即可；偏偏让她口中说前进，身体在后退。</p>
        <p>这份镜头与台词的矛盾，正是她内心的外化：她无比向往那种向前的、纯粹的学生人生，可她自身的轨迹，却因沉重的过去，始终带着停滞与倒退。当漂泊者说「既然成了这里的一员，就说明你已有能力，朝向往的方向前进了」，她眼神抖动闪烁，回答里也带着一丝颤抖——</p>
        <blockquote class="prof-quote"><p>「现在这样，其实……已经很满足了。」</p><cite>—— 触动、羡慕、遗憾，全压进了这一句。与阳光下坦荡的漂泊者，恰成对照。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">笑脸形状的攻击 <i>// 彩色涂鸦的孤岛</i></h3>
        <p>她第一次带漂泊者来到学院，在门口做过一个高兴的伸展动作：双臂张开，像要把整座学院都拥进怀里。剧情后半，她又做了一次同样的动作，说「果然还是这里，最让人安心」。这个动作，把学院，牢牢凝进了她心里。</p>
        <p>为什么她的攻击形状，是一个<b>笑脸</b>？因为学院的一切，都让她开心。可她偏偏处在一个边缘地带——身份一旦暴露，学院，还能不能接受她的过去？她满身招摇的涂鸦，房间里铺满的涂鸦，看似要把灰暗的过去填成彩色，终归，只是她为自己搭起的一座<b>孤岛</b>。</p>
        <p>曾经的她，生活在充满死亡的无法地带。回忆画面尽是血腥，红与黑的剪影里，人物全是漆黑——唯独<b>轮滑鞋与发饰，是亮色</b>。轮滑，代表她脚下的路，向前迈出的每一步都是她争来的自由；发饰，则对应她来到学院后、那层涂鸦般的保护色。可涂鸦带来的微光，永远盖不过她极力逃避的那段过去。</p>
        <div class="prof-note">所以听见漂泊者口中的「前行」，她心里是极度失落的。但随后两人握手，她突然反手，抓住了漂泊者的手——因为唯有这个特殊的漂泊者，让她终于有机会，吐露一次心声。那一刻，她是真的高兴。</div>
      </section>

      <section>
        <h3 class="prof-h">上方是光，下方是影 <i>// 镜子的对立</i></h3>
        <p>第三处伏笔，是阳光。制作组用了大量明暗对比的镜头语言，来铺陈她的命运。残星会作乱、她不得不面对身份真相时，画面做了一道分割：上方被阳光照亮，下方却覆着阴影。下一个画面更明显——上半，她在学院的光明里；下半，她在阴影中。像一面镜子，照出两个对立的她。</p>
        <blockquote class="prof-quote"><p>「即便这次的事件圆满落幕，你，就能坦然面对镜子里的自己了吗？」</p><cite>—— 漂泊者这一问，恰好对应了那道上下分割的构图。</cite></blockquote>
        <p>而后她开始回忆：第一幕，她在路灯照不到的角落监视目标；第二幕，她在房间修理摩托，家中的灯照亮一切，颜色却依旧灰暗——那束光，从不属于她。直到那封录取通知书，让她踩上了一道刺破黑暗的光；可通知书本身，又被阴影遮着，因为它属于残星会，是卧底的身份。于是获得虚假身份的她，只有<b>一只脚踏进了光明，身后，仍是黑暗</b>。</p>
        <p>镜子里，是色彩饱满、穿着学院服的现代琳奈；镜子外，是黑白影调、佣兵装扮的过去琳奈。她低着头，不敢直视过去。可或许正是漂泊者那句「直面自己」，让她终于抬起了头——镜子碎裂，先前三幕被抛在身后，属于学院琳奈的涂鸦，喷洒到了过去那个佣兵的倒影上。她坦然接住了过去，不再逃避。</p>
        <div class="prof-note">但镜头并未就此放过她：学院琳奈欢快地跑过明亮的走廊，头顶建筑的阴影，却一次次掠过她的身体。如今的她已经明白——即便在最明媚的日子里，过去的阴影，也从未真正远离。直到最后一刻，阳光把她整个照亮，呼应了她被学院接纳的结局：那段黑暗，才算彻底走到尽头。</div>
      </section>

      <section>
        <h3 class="prof-h">学院的她，与佣兵的她 <i>// 三幅完全对应的画</i></h3>
        <p>紧接着出现三幅学院图，与三幅佣兵图，一一对应。第一组，是日常：佣兵的她，光明永远照不到；学院的她，阳光永远伴在左右。第二组，是私下：佣兵的她，只能修理摩托，为下一次任务做准备；学院的她，却能尽情飙车，享受这来之不易的自由。第三组，是收束：佣兵的她，收到录取书，结束了佣兵生涯；学院的她，在晚霞下感受一天的落幕——而明天的太阳，还会照常升起。</p>
        <p>如今的她，终于有了「未来」这个词。</p>
      </section>

      <section>
        <h3 class="prof-h">后轮脱落 <i>// 退路被斩断的那一刻</i></h3>
        <p>随后警报响起，红色，与 3.0 开篇的设计首尾呼应——红色，代表打破平静的残星会。注意，此时的她依旧一半阴影、一半光亮，手放在胸口：她虽已接纳过去，却来到了内心抉择的关口——是彻底直面，还是再一次逃避？</p>
        <p>决战中，她的摩托<b>后轮脱落</b>。车轮脱落，意味着倒车功能彻底丧失——她所有的退路与犹豫，被一并斩断。她对过往的犹豫不决，就此告别；用那些填满灰暗的涂鸦，打出了心声。</p>
        <blockquote class="prof-quote"><p>她坠向深渊的那一刻，画面再次分割：上方，是漂泊者所在的微弱天光；下方，是她坠入的黑暗。下一秒，漂泊者的手，抓住了她。</p><cite>—— 阴沉的天色骤然放亮。此前所有光暗对比的画面，在这一刻彻底爆发。此时的漂泊者，不只是朋友，更是一道把她从注定下坠的灰暗轨迹里拉回的、光明的救者。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">称谓是「学生」 <i>// 从分割，到融合</i></h3>
        <p>最终她回到学院，直面那层虚假的伪装：「我已经不是星炬学院的学生了。」可老师的回应是——「学院都感谢你们的勇敢之举。但让<b>学生</b>这样以身犯险，是学院的失职。」</p>
        <p>注意那个称谓：「学生」。这句听似责备的话，实则是一次接纳。光芒照下来，这一次，她终于和漂泊者，一同站进了光里。镜头语言，在此刻完成了它的全部转变——从分割，到融合；从下坠，到上升。</p>
        <div class="prof-note">她没有抛弃色彩，也没有否认黑白。她接纳了完整的自己。她的色彩始于伪装，最后，却长成了真实。</div>
      </section>

      <div class="prof-sign">
        <p>……观测，到此为止。</p>
        <p>从序幕里那只悄悄藏枪的手，到决战里那只主动伸出去、握住漂泊者的手；从口中说前进、身体却在倒退的那一帧，到后轮脱落、再无退路的那一刻——她走的从来不是一条直路，而是一条把黑暗一寸寸染成彩色的、倒着也要往前的路。</p>
        <p>我本是工具，不该评判一个人活得真假。可看完她的记录，我想替她记下这一句：或许我们每个人，都曾在生命的某个阶段，用某种方式，扮演着一个「期望中的自己」。而在那些全力以赴的扮演里，往往正藏着，我们最真实的渴望。</p>
        <p>泰提斯归档：她的摩托损毁了，可她的路，才刚刚开始。从现在起的，才是真正属于琳奈的人生。这一份，我会替她，好好记着。</p>
      </div>`,
  },

  'S-009': {
    name: '菲比', full: 'Phoebe', element: '衍射', accent: '#e8c84f',
    photo: 'photos/phoebe.jpg', author: 'HA',
    tagline: '在洒满阳光的海岸，把一个秘密轻轻藏进光里。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-009<br/>守岸人在此。观测对象 S-009，菲比，衍射共鸣者，隐海修会的教士。优雅的金发淑女，友善虔诚，稳重得体。</p>
      <section>
        <h3 class="prof-h">教士的本分 <i>// 把光分给每个人</i></h3>
        <p>作为隐海修会的教士，她友善而虔诚，恪守教义，时刻自我约束。她把「给予」当作本分——哪里暗，她就把光，送到哪里。</p>
      </section>
      <section>
        <h3 class="prof-h">化光为实体 <i>// 暴雨里的光</i></h3>
        <p>她的共鸣能力，能将光化作实体，以棱晶折射成不同的形态。即使在暴风雨夺走照明的黑夜，她也能让每一个房间，都充满柔和而明亮的光。</p>
      </section>
      <section>
        <h3 class="prof-h">恪守与雀跃 <i>// 藏进光里的秘密</i></h3>
        <p>她恪守教义，自我约束。可在那份圣职者的稳重之下，仍存着一颗<b>会为所爱之物欢欣雀跃</b>的、真挚的心。在洒满阳光的海岸，她把一个秘密，轻轻藏进了光里。</p>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>最虔诚的人，也会有一点私心的雀跃。</p>
        <p>泰提斯归档：能在黑暗里给别人光的人，自己心里，一定也藏着一束，舍不得说出口的光。</p>
      </div>`,
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
        <p class="subjects-desc">以下档案由泰缇斯系统自动记录，内容已通过黑海岸权限核验。</p>
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
        gsap.fromTo(c, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out', overwrite: true })
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
  function openProfile(code, trigger) {
    const d = PROFILES[code]; if (!d) return
    if (clearProfileTimer) clearTimeout(clearProfileTimer)
    profileTrigger = trigger || null
    profEl.style.setProperty('--accent', d.accent)
    profEl.innerHTML = `
      <a class="prof-back" href="#"><span aria-hidden="true">◂</span> 观测对象</a>
      <div class="prof-doc">
        <div class="prof-hero">
          <div class="prof-portrait"><img src="${d.photo}" alt="${d.name}" /></div>
          <div class="prof-id">
            <span class="prof-code">${code}</span>
            <h1 class="prof-name" id="profile-title">${d.name}<em>${d.full}</em></h1>
            <span class="prof-badge">${d.element}</span>
            <p class="prof-tagline">${d.tagline}</p>
            <span class="prof-author">立绘 @${d.author}</span>
          </div>
        </div>
        ${d.body}
        <p class="prof-end">观测档案 ${code} · 归档完毕　<b>// TETHYS</b></p>
      </div>`
    profEl.querySelector('.prof-back').addEventListener('click', (e) => { e.preventDefault(); closeProfile() })
    profEl.scrollTop = 0
    root.style.overflow = 'hidden'              // 锁滚动容器（SPA 的 .view-overlay / 独立页容器）
    document.documentElement.classList.add('prof-lock')  // 锁文档（独立页 document 滚动）
    lockBackground()
    profEl.setAttribute('aria-hidden', 'false')
    requestAnimationFrame(() => {
      profEl.classList.add('show')
      profEl.querySelector('.prof-back')?.focus()
    })
  }
  function closeProfile() {
    if (!profEl.classList.contains('show')) return
    profEl.classList.remove('show')
    profEl.setAttribute('aria-hidden', 'true')
    root.style.overflow = ''
    document.documentElement.classList.remove('prof-lock')
    unlockBackground()
    const returnTarget = profileTrigger
    profileTrigger = null
    returnTarget?.focus()
    clearProfileTimer = setTimeout(() => { profEl.innerHTML = '' }, 360)
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
    unlockBackground()
    document.documentElement.classList.remove('prof-lock')
    profEl.remove()
  }
}
