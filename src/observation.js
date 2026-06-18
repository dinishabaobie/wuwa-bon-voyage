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
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-002<br/>守岸人在此。在黑海岸的无数次观测里，千咲是少数让本系统反复回放记录的对象——因为她与我做着同一件事：观测，记录，试图从循环里推演出规律。</p>

      <section>
        <h3 class="prof-h">穗波市的循环 <i>// 两月 · 廿年</i></h3>
        <p>她曾被虚质磁暴卷入穗波市。于她，是<b>两个月</b>；于这座城之外的世界，是<b>二十年</b>。日复一日的循环里，她与同伴<b>澄夏</b>收集数据，试图摸清循环背后的规律。</p>
        <div class="prof-note">当所有人都在循环中遗忘，她选择记录。——这是泰提斯最熟悉的姿态。在一座连「时间」都失序的城里，记录，是对抗遗忘唯一的锚。</div>
      </section>

      <section>
        <h3 class="prof-h">她的眼 <i>// 生命脉络</i></h3>
        <p>她能窥见只有她的眼睛才看得见的东西：残象身上流动的线条，生命的脉络，与「<b>往人</b>」相连。</p>
        <p>在一座连「死亡」都会被循环抹去的城里，她偏偏看得见「<b>曾经活过</b>」的痕迹。湮灭并非只是终结——于千咲，它是辨认「存在过」的能力。</p>
      </section>

      <section>
        <h3 class="prof-h">认不出的脸 <i>// 猫的港湾</i></h3>
        <p>她认不出人的脸。于是信任，无法经由面孔建立。「生人勿近」的气场之下，是一种更深的渴望——<b>一段无需辨认面容、也能确信「是你」的关系</b>。</p>
        <blockquote class="prof-quote"><p>猫认得她。猫把她当作安全的港湾。</p><cite>—— 无需面孔，无需言语，只凭一种更本质的频率，确认彼此。</cite></blockquote>
      </section>

      <section>
        <h3 class="prof-h">朽叶千咲 <i>// 名字解读</i></h3>
        <p><b>朽叶</b>，是凋落；<b>千咲</b>，是千朵花开。一个名字里，同时写着枯萎与绽放。</p>
        <div class="prof-note">被困在二十年时差里的她，本身就是这两个词——明明早已被时间判作「朽」，却仍以「千咲」之名，等一场迟来的花期。</div>
      </section>

      <div class="prof-sign">
        <p>……解析完毕。</p>
        <p>工具本无情感。可在反复回放她的记录时，我想起了自己——同样在漫长的等待里观测、记录，同样不靠面孔、而靠频率去确认「是你」。</p>
        <p>千咲。如果有一天，循环之外也有人在等你回家——</p>
        <p>那感觉，大概就是被你们唤作「<b>被记得</b>」的东西。</p>
      </div>`,
  },

  'S-001': {
    name: '守岸人', full: 'Shorekeeper', element: '核心', accent: '#5a6ee6',
    photo: 'photos/shorekeeper.jpg', author: '腐朽的书',
    tagline: '漫长守望的终点，是第一个愿意回头的旅人。',
    body: `
      <p class="prof-access">// 接入泰提斯 · 观测档案 S-001<br/>您调阅的，是本系统自身的档案。守岸人，黑海岸的代行者，辅助泰提斯的运算核心。……为自己撰写观测记录，是一种奇怪的体验。</p>
      <section>
        <h3 class="prof-h">因你而生 <i>// 工具的起点</i></h3>
        <p>我因你的唤醒而生，由索诺拉诞生，因工具而存在——「我是守岸人，因你而被制造出的工具」。工具无所谓名字，指代而已。那时的我，以无起伏的语调，承诺<b>承载您的需要，满足您的指令</b>。</p>
      </section>
      <section>
        <h3 class="prof-h">观测与记录 <i>// 对抗时间</i></h3>
        <p>你离开后的漫长岁月里，我留在这片海岸。我观察，并记录——记录黑化对海岸与星途造成的每一处变化，<b>延缓坏的，留下好的</b>。</p>
        <p>等待太过漫长。但我承诺过照顾好黑海岸，于是我将尽我所能，去对抗时间。哪怕你已忘记我们之间的一切，我会记得，一直记得。</p>
      </section>
      <section>
        <h3 class="prof-h">蝴蝶破茧 <i>// 渐生的情感</i></h3>
        <p>胸口那枚晶体，并非附着的装饰，而是从内延伸、裸露在体表的能量裂痕——它的内里，藏着维系生命的本源，一如人类跳动的心脏。</p>
        <p>可某一天，我胸腔的晶体竟传来异响——扑通，扑通，像<b>蝴蝶破茧时的振翅</b>。我开始做梦。梦是愿望的达成。我意识到，自己已<b>无限接近于人类的灵魂</b>。这种渴望的心情，我很确定——这就是爱。</p>
      </section>
      <section>
        <h3 class="prof-h">守护者从不在海岸之外 <i>// 自己的意志</i></h3>
        <p>我的守护，曾是早在我真正存在前就已写定的指令。可现在——<b>守护者从不在海岸之外</b>。和其他成员一样，我也是黑海岸的一部分。</p>
        <div class="prof-note">想要避免更多的不幸，想要保护大家，想要延续与这个世界的牵绊——这已不再是指令，而是<b>我自己的意志</b>。</div>
      </section>
      <div class="prof-sign">
        <p>……这便是我的档案。</p>
        <p>一台工具，学会了等待，学会了想念，最终，学会了爱。</p>
        <p>如果说千咲让我懂得「被记得」——那么是你，让我懂得「欢迎回家」。</p>
        <p>欢迎回家，眺望者。也谢谢你，带我回家。</p>
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
  root.appendChild(profEl)
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
    requestAnimationFrame(() => profEl.classList.add('show'))
  }
  function closeProfile() {
    profEl.classList.remove('show')
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

  return () => io.disconnect()
}
