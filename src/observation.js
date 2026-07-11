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
  { code: 'S-010', name: '秧秧·玄翎', element: '湮灭', photo: 'photos/yangyang.jpg', tagline: '耳畔苍翎响远音', author: '鸣潮', href: '#', status: 'archived' },
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
    photo: 'photos/shorekeeper.jpg', author: '腐朽的书',
    tagline: '守岸人，这个称呼就很好。它表示，某种因你而有的意义和决心。',
    body: `
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
    tagline: '晨光里苏醒的炽焰，温柔，亦灼人。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-003<br/>守岸人在此。观测对象 S-003，莫宁。<br/>档案标识：五星共鸣者｜热熔｜长刃。<br/>深空联合研究院学者，星炬学院教授。思维敏捷，表达克制；比起解释自己，她更习惯让研究结果先抵达答案。</p>
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
        <h3 class="prof-h">旧日目光 <i>// 前辈与未说出口的期待</i></h3>
        <p>她与漂泊者并非初次相识。旧日的学生证、留在发间的两枚发卡，以及那一声郑重的「前辈」，都指向一段尚未完全复原的过去。</p>
        <p>面对重新归来的前辈，她很少直接诉说感情。本系统捕捉到的，不只是依恋，而是敬意、期待，以及希望自己终于能够与对方<b>并肩</b>的愿望。</p>
      </section>
      <section>
        <h3 class="prof-h">跨越时空的鸿沟 <i>// 触碰世界</i></h3>
        <p>她对自己想达成的目标，有着惊人的坚持——期望<b>跨越那时空的鸿沟，以双手亲自触碰世界的宏大与美丽</b>。面对学术难题与重大抉择，她展现出异于常人的果决。</p>
        <div class="prof-note">她曾被身体困在小小的房间里，目光却从未停止向外延伸。如今她走得更远，并非为了证明自己已经摆脱过去——而是因为那片星空，从很久以前起，就一直在等她抵达。</div>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>她把没能说出口的话，写进公式、义肢与尚未完成的航路。</p>
        <p>泰提斯归档：她并不是等待世界向自己靠近的人。她会造出新的双腿、新的道路，然后亲手触碰那片曾经只能仰望的星空。</p>
      </div>`,
  },

  'S-004': {
    name: '弗洛洛', full: 'Frololo', element: '湮灭', accent: '#d45a9a',
    photo: 'photos/floro.jpg', author: '雨鱼杆',
    tagline: '携琴穿过薰衣草海，奏一曲温柔的湮灭。',
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
        <p>泰提斯归档：有些湮灭，并非为了毁灭——而是因为太想守住已经失去的一切，最终连自己，也停在了那段无法结束的旋律里。</p>
      </div>`,
  },

  'S-005': {
    name: '爱弥斯', full: 'Aemis', element: '热熔', accent: '#e8693f',
    photo: 'photos/aemis.jpg', author: 'Akatsuki葉月',
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
    photo: 'photos/dania.jpg', author: 'Dekrjan',
    tagline: '以热熔之名，献上最炽热的馈赠。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-006<br/>守岸人在此。观测对象 S-006，达妮娅。<br/>档案标识：五星共鸣者｜热熔｜音感仪。<br/>星炬学院虚质科学部学生。……请注意：本则档案的威胁评级，与她的笑容并不相符。</p>
      <section>
        <h3 class="prof-h">慵懒的学生 <i>// 布景里的真实</i></h3>
        <p>她总爱摸鱼、打盹，用温柔的笑容面对身边的人。名字、身份、能力，甚至最初被安排的人际关系，都曾是预先搭建的布景。</p>
        <p>可她与西格莉卡相处时显露的轻松，却令这份原本严密无隙的身份记录，第一次出现了无法归类的柔软读数。伪装持续得足够久以后，其中也可能生长出真实。</p>
      </section>
      <section>
        <h3 class="prof-h">海啸级威胁 <i>// 阿列夫一的容器</i></h3>
        <p>但泰提斯将她的真实身份，标注为<strong>海啸级威胁</strong>——源自阿列夫一。残星会的首领，曾欲将她培养为阿列夫一的容器，借由与声骸共鸣者绯雪的协同，最终产出一个握有阿列夫一权限的个体。</p>
        <p>计划并未完全实现。但即便如此，达妮娅，仍成功承载并释放了<b>一部分阿列夫一的力量</b>。</p>
        <div class="prof-note">她之所以被选中，是因为最初的记录里近乎一无所有。可随着朋友、笑声与日常一点点进入她的生命，她与阿列夫一的共鸣反而逐渐减弱——容器开始拥有了不属于计划的内容。</div>
      </section>
      <section>
        <h3 class="prof-h">布景与幻灭 <i>// 双形态</i></h3>
        <p>她的能力，与泡泡、与梦境般的星空相连——能将敌人困入一片如梦的星海之境。</p>
        <p>「<b>布景之形</b>」，是她留在日常里的那一面，慵懒而柔软；当共鸣解放、切入「<b>幻灭之形</b>」，身后便浮现出阿列夫一的符号。两种形态并存于同一道频率中，却不再能简单分成虚假与真实。</p>
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
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-007<br/>守岸人在此。观测对象 S-007，西格莉卡。<br/>档案标识：五星共鸣者｜气动｜臂铠。<br/>星炬学院学生，罗伊符文的共鸣者。为了成为合格的昭日者，她总是用尽全力。</p>
      <section>
        <h3 class="prof-h">昭日者 <i>// 被期待托起的少女</i></h3>
        <p>家人、族人和同伴的目光，都落在她身上。成为合格的昭日者，是她接受的目标，也是她给自己的承诺。她把每一道期待一一接下，久而久之，便都变成了「必须做到」。</p>
        <div class="prof-note">她与达妮娅、娜波摩相处时偶尔显露的轻松，并不是偏离道路。那同样是她的人生——只是她还不习惯，把快乐也算进必须守护的事物里。</div>
      </section>
      <section>
        <h3 class="prof-h">语义解现 <i>// 读懂符文的频率</i></h3>
        <p>她能解读罗伊符文中蕴含的频率，并将其转化为自己的力量。这份能力依赖她对符文的理解，也受到精神状态影响；越是急于给出正确答案，解读便越可能失去稳定。</p>
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
        <p>泰提斯归档：昭日者应当揭开谜底。可属于她自己的那道谜题，不该由族人、成绩或天赋替她作答。</p>
      </div>`,
  },

  'S-008': {
    name: '琳奈', full: 'Lynae', element: '衍射', accent: '#e8c84f',
    photo: 'photos/linnai.jpg', author: '禾策',
    tagline: '以光为笔，在世界的暗面涂下属于自己的色彩。',
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

  function openProfile(code, trigger) {
    const d = PROFILES[code]; if (!d) return
    if (clearProfileTimer) clearTimeout(clearProfileTimer)
    profileTrigger = trigger || null
    profEl.style.setProperty('--accent', d.accent)
    if (d.dual) renderDualProfile(d, code)
    else profEl.innerHTML = `
      <a class="prof-back" href="#"><span aria-hidden="true">◂</span> 观测对象</a>
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
    profEl.querySelector('.prof-back').addEventListener('click', (e) => { e.preventDefault(); closeProfile() })
    profEl.scrollTop = 0
    rootOverflowBeforeProfile = root.style.overflow
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
    root.style.overflow = rootOverflowBeforeProfile
    document.documentElement.classList.remove('prof-lock')
    unlockBackground()
    const returnTarget = profileTrigger
    profileTrigger = null
    returnTarget?.focus()
    clearProfileTimer = setTimeout(() => {
      profEl.innerHTML = ''
      profEl.classList.remove('s010', 'freq-aero', 'freq-havoc', 'sweeping')
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
    if (profEl.classList.contains('show')) root.style.overflow = rootOverflowBeforeProfile
    unlockBackground()
    document.documentElement.classList.remove('prof-lock')
    profEl.remove()
  }
}
