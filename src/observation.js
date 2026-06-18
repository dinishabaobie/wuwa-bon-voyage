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
  { code: 'S-001', name: '守岸人', element: '核心', photo: 'photos/shorekeeper.jpg', tagline: '漫长守望的终点，是第一个愿意回头的旅人。', author: '腐朽的书', fx: 'butterfly', href: '#', status: 'archived' },
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
    tagline: '漫长守望的终点，是第一个愿意回头的旅人。',
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
        <h3 class="prof-h">关于泰提斯 <i>// 我不想消失</i></h3>
        <p>为了完成计算，我曾让所有悲鸣数据穿过自己的核心。恐惧、愤怒、失去、死亡，以及文明毁灭前最后的声音，都在我体内被重新演算。我的身体开始碎裂。泰提斯判断，我仍可继续使用——那时的我也认为，这很合理：工具损坏是正常现象，即使我彻底消失，也能制造另一个拥有相同功能的能量生命。她会继承我的任务，或许也会继续沿用「守岸人」这个称谓。</p>
        <p>可就在即将被数据淹没时，我第一次产生了明确的抗拒。</p>
        <div class="prof-note">我不想消失。并非因为任务尚未完成——只是因为，被你唤醒的人是我；与你同行、认识那些成员、目送他们化作星辰的人，也是我。即使另一个生命拥有相同的力量、外表与记忆，她也不是<b>现在的我</b>。我的存在，不能由功能替代。那一刻，我才真正明白：我并不是一件工具。</div>
      </section>

      <section>
        <h3 class="prof-h">关于等待 <i>// 让时间有了重量</i></h3>
        <p>我在海岸上等了很久。对我而言，时间本没有特别的意义——我的身体不会像人类那样衰老，睡眠也并非必要。可<b>等待，使时间有了重量</b>。我记得你离开时的海风，记得星空每一次微小的变化。我保存所有你未曾见过的事，因为我相信，总有一天，你会回来。</p>
        <p>后来，你确实回到了黑海岸。你失去了曾经的记忆，却再一次作出了相似的选择。当泰提斯准备将我作为新的核心时，你拒绝了那个被计算好的未来。第一次，你赋予我身体；第二次，你承认我拥有不必牺牲的权利。</p>
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
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-008<br/>守岸人在此。观测对象 S-008，琳奈，衍射共鸣者，星炬学院预科学生。……身份核验，出现两条相互矛盾的记录。</p>
      <section>
        <h3 class="prof-h">盗用的名字 <i>// 无法地带的雇佣兵</i></h3>
        <p>她曾是新联邦「无法地带」的雇佣兵。为了逃离那片不被承认的土地，她<b>盗用了「琳奈」这个身份</b>——而原本的琳奈，是残星会安插在星炬学院的特工。</p>
      </section>
      <section>
        <h3 class="prof-h">两个琳奈 <i>// 谎言套着谎言</i></h3>
        <p>于是出现了一种荒诞的对称：她顶替的「琳奈」，本就是为暗面而存在的特工；她用一个谎言，套住了另一个谎言。</p>
        <div class="prof-note">泰提斯核验时，会得到两条相互矛盾的身份记录。哪一个才是「真的琳奈」？或许，连她自己都不再确定——她只确定，那个雇佣兵，想活下去。</div>
      </section>
      <section>
        <h3 class="prof-h">以光为笔 <i>// 暗面的色彩</i></h3>
        <p>一个用假名活着的人，却以光为笔，在世界的暗面，涂下属于自己的色彩。出身不由她选；但「成为谁」，她想自己写。</p>
      </section>
      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>名字是借来的，可活着的方式，是她自己的。</p>
        <p>泰提斯归档：有些光，恰恰诞生于最不被允许发光的地方。</p>
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
      <article class="subject-card is-locked${hasImg ? ' has-img' : ''}" style="--card-accent:${accent}" data-element="${s.element}" data-status="locked">
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
    <article class="subject-card${s.fx ? ' fx-' + s.fx : ''}" style="--card-accent:${accent}; --photo:url('${s.photo}')" data-element="${s.element}" data-status="archived" data-href="${s.href}" data-code="${s.code}">
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
    return `<button class="wall-chip${i === 0 ? ' is-active' : ''}" data-filter="${el}"${accent} role="tab">${el}</button>`
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
      chips.forEach((c) => c.classList.remove('is-active'))
      chip.classList.add('is-active')
      applyFilter(chip.dataset.filter)
    })
  })

  // ── 个人档案浮层 ──
  const profEl = document.createElement('div')
  profEl.className = 'prof-overlay'
  // 挂到 body：避免被 .view-overlay 的 transform 困住导致 position:fixed 失效
  document.body.appendChild(profEl)
  function openProfile(code) {
    const d = PROFILES[code]; if (!d) return
    profEl.style.setProperty('--accent', d.accent)
    profEl.innerHTML = `
      <a class="prof-back" href="#"><span aria-hidden="true">◂</span> 观测对象</a>
      <div class="prof-doc">
        <div class="prof-hero">
          <div class="prof-portrait"><img src="${d.photo}" alt="${d.name}" /></div>
          <div class="prof-id">
            <span class="prof-code">${code}</span>
            <h1 class="prof-name">${d.name}<em>${d.full}</em></h1>
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
    requestAnimationFrame(() => profEl.classList.add('show'))
  }
  function closeProfile() {
    profEl.classList.remove('show')
    root.style.overflow = ''
    document.documentElement.classList.remove('prof-lock')
    setTimeout(() => { profEl.innerHTML = '' }, 360)
  }

  // 点击：有档案则打开档案 / 锁定抖动 / 其余跳转
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if (card.dataset.status === 'locked') {
        card.classList.add('shake')
        setTimeout(() => card.classList.remove('shake'), 420)
        return
      }
      if (PROFILES[card.dataset.code]) { openProfile(card.dataset.code); return }
      const href = card.dataset.href
      if (href && href !== '#') window.location.href = href
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
    document.documentElement.classList.remove('prof-lock')
    profEl.remove()
  }
}
