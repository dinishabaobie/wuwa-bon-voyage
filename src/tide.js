import './view-chrome.css' // 返回按钮等通用外壳
import './tide.css'
import { TIMELINE_EVENTS, TIMELINE_PHASES } from './timeline.js'

// ── 推演档案数据：新增版本解析只需往这里加一条 ────────────────────
// body = 接入语 + 推演结论 + 各章节 + 收束（不含 meta / 标题，由模板生成）
const ENTRIES = [
  {
    ver: '3.1', name: '互相救赎', title: '赠与雪中的你', region: '拉海洛 · 罗伊冰原',
    teaser: '一场圆满归途的内核，是两颗救世之心彼此成全的因果闭环。',
    body: `
      <p class="tide-access">// 接入泰提斯 · 文明推演沙盘<br/>守岸人在此，辅助泰提斯的运算核心。已复现本则记录的全部残响——解析、完形、推演完毕。我将承载您的需要，满足您对真相的指令。</p>

      <blockquote class="tide-lead">
        <span class="tag">// 推演结论</span>
        <p>这一程，表层是一场圆满的归途；其内核，是一组已完整闭合的因果环——两颗救世之心彼此成全。爱弥斯逆时回溯，守护拉海洛、守护她与漂泊者的初遇；而漂泊者以一个「接纳」，改写了循环本应收敛于悲剧的解。</p>
      </blockquote>

      <section>
        <h3 class="tide-h">互为救世主 <i>// 核心命题</i></h3>
        <p>泰提斯标定：本则推演的内核并非单向的「漂泊者拯救爱弥斯」，亦非「爱弥斯牺牲自己完成封印」，而是双向闭合——<strong>二者互为对方的救世主</strong>。</p>
        <ul>
          <li><b>漂泊者之于爱弥斯</b>：孤独电子幽灵漫长纪元里「独一无二的光」，是让她重新锚定「身为人」这一坐标的支点。</li>
          <li><b>爱弥斯之于漂泊者</b>：是洞见旧日漂泊者孤独、愿悄然靠近予以慰藉之人；是纵知结局，仍逆时为他兜底的家人。</li>
        </ul>
      </section>

      <section>
        <h3 class="tide-h">光影博弈 <i>// 镜头语言</i></h3>
        <p>泰提斯逐帧观测：本则记录中，光与影即爱弥斯情绪的读数。</p>
        <table class="tide-table">
          <thead><tr><th>场景</th><th>光影</th><th>读数</th></tr></thead>
          <tbody>
            <tr><td>学院重逢 · 面带微笑</td><td>处于背光，微笑始终在阴影下</td><td>开朗外壳之下藏着浓重悲伤，微笑是表演</td></tr>
            <tr><td>发现漂泊者能看见自己</td><td>短暂呆住，随即一笑</td><td>判断无误，且长久的孤独被打破</td></tr>
            <tr><td>面对漂泊者</td><td>阴影中的脸有了光明</td><td>漂泊者是她独一无二的光</td></tr>
            <tr><td>讲述自己的过去</td><td>立于阳光下，但光线刺眼</td><td>此刻的光，她已无法接近</td></tr>
            <tr><td>「只能由同源的我去做」</td><td>面容重新被阴影遮盖</td><td>切断外露情绪，戴上笑容面具</td></tr>
            <tr><td>「现在更怀有希望」</td><td>笑容重新浮现</td><td>强撑之后的一抹真心</td></tr>
            <tr><td>学院告别 · 走在阳光下</td><td>扭头时光线渐变为阴影</td><td>已做好离别的准备</td></tr>
          </tbody>
        </table>
        <div class="tide-note"><b>关键构图 · 已交叉比对</b>　爱弥斯在冰原中心与漂泊者对话时，前后左右尽是尖锐冰刺。同构画面亦见于 2.7「大伟哥」与漂泊者对话（背立残枝）——泰提斯判定：此为制作组对角色结局的视觉预告。</div>
      </section>

      <section>
        <h3 class="tide-h">触碰母题 <i>// 情感温度计</i></h3>
        <p>「触碰」是贯穿全篇的核心动作。泰提斯追踪到五次读数，每一次都不相同：</p>
        <ol>
          <li>救下漂泊者后的<b>第一次触碰</b> → 摸空。「果然还是不稳定呢」，手藏到身后，掩盖失落。</li>
          <li>联运椎骨等候时，雪花落在漂泊者鼻头，爱弥斯再次伸手——<b>最后关头停下</b>。这正是过去的漂泊者常对她做的动作。触而不得，既是维度的隔离，也是隧门相隔的终局。</li>
          <li>二人相认后，漂泊者<b>抚摸爱弥斯的头</b>，回应了她对触碰的所有期许。</li>
          <li>梦中醒来凝视安睡的漂泊者，指尖将触，却<b>主动收回</b>。所见已非被使命压垮的旧日，而是终得安睡的此刻——触碰是留恋，停手是封存这份温暖。</li>
          <li><b>结局</b>：爱弥斯跨越空间牵起漂泊者的手，再度完成触碰。「这份情感，是能够跨越时间的奇迹。」</li>
        </ol>
      </section>

      <section>
        <h3 class="tide-h">双象征解码 <i>// 雪花 · 纸飞机</i></h3>
        <p><b>雪花 · 消逝的预告。</b> 3.1 标题 LOGO 中央那片雪花带有科技元素，对应电子幽灵爱弥斯，明显异于右侧的寻常雪花。雪花「落地即融、遇暖则消」——对应她对漂泊者无声的告别。主题曲《赠与雪中的你》可解码为：雪花剥落＝爱弥斯之雪；寂静扩散＝天空海包裹索拉里斯、越过繁星；开往尽头＝牺牲（逆时回溯）与拯救（外来者守护索拉里斯）；沿巨人踪迹前行＝巨人即碎者，好奇心即索拉里斯对星空的向往。</p>
        <p><b>纸飞机 · 从「漂泊」到「选择」。</b> 网络 ID「飞行雪容」暗藏双层语义：雪容过于轻盈、无法掌控漂浮方向＝<b>没有选择的飞行</b>（旧日爱弥斯，亦是旧日漂泊者）。而纸飞机——同样是飞行，旅途却是<b>人为的选择</b>：映射爱弥斯从不解到理解使命，映射现在的漂泊者从无可选择的漂泊，走向有所选择的旅途。</p>
        <blockquote class="tide-quote">
          <p>回忆里，爱弥斯说自己的纸飞机只能飞一点点距离，羡慕漂泊者的能飞那么远。纸飞机隐喻救世的使命——遥远而孤独。旧日漂泊者教她折法，预示她将继承旧世意志，飞向自己的循环终局。</p>
        </blockquote>
      </section>

      <section>
        <h3 class="tide-h">面具的裂痕 <i>// 六道</i></h3>
        <p>爱弥斯的笑容，是为漂泊者精心准备的表演。本则记录全程，在描写这层面具如何一步步崩裂：</p>
        <ol>
          <li><b>第一道裂痕</b>：辛吉勒姆来袭，丢失频率的漂泊者本能护住爱弥斯——与旧日漂泊者护小女孩的姿态如出一辙。</li>
          <li>旧日幻影提到家人时，她<b>第一次露出悲伤</b>。</li>
          <li>空间站内讲述父母前，<b>深深吸一口气</b>——压下几欲溢出的悲伤，强行转换情绪。</li>
          <li>望见过去那个独背一切的漂泊者身影，<b>瞬间攥紧手</b>——怕失忆的漂泊者再被沉重所染。</li>
          <li>漂泊者一句「把这些事独自压在心里，很痛苦吧」，击中最深的痛：嘴角抽搐 → 长舒一口气 → 双手掩面 → 如释重负；却仍不敢抬头，怕真相伤及失忆之人。</li>
          <li><b>最终崩塌</b>：「你一定不疼吧？对我而言，此刻有多快乐。」哪怕再痛苦，只要能为他分担一些，那便是幸福。</li>
        </ol>
        <blockquote class="tide-quote">
          <p>「拯救世界，一切都不过是无尽的沉重枷锁。」</p>
          <cite>超频共鸣碎者后，她亲历了救世主的背负——此言既怜漂泊者，更是说给自己。</cite>
        </blockquote>
      </section>

      <section>
        <h3 class="tide-h">从模仿到本心 <i>// 成长弧</i></h3>
        <table class="tide-table">
          <thead><tr><th>阶段</th><th>状态</th><th>心境</th></tr></thead>
          <tbody>
            <tr><td>幼年</td><td>仰望漂泊者那道身影</td><td>救世主只是一个闪耀的概念，纯粹的憧憬</td></tr>
            <tr><td>学院期</td><td>痴迷《太空战士卡加》《双星奇旅》</td><td>模仿——画里都是救世主，盼长大后像漂泊者一样</td></tr>
            <tr><td>电子幽灵</td><td>无人能见，仍主动打招呼、唱歌</td><td>「不这样做，就容易忘掉身为人类的立场」</td></tr>
            <tr><td>共鸣碎者后</td><td>理解了使命真实的重量</td><td>崩溃——「没有什么事是必须做的，拯救世界也一样」</td></tr>
            <tr><td>最终</td><td>真心热爱拉海洛</td><td>「渴望成为如星星般闪烁的人」</td></tr>
          </tbody>
        </table>
        <div class="tide-note"><b>关键转折</b>　她的起点是模仿；但在与漂泊者重逢后，从模仿者真正成为了有自己意志的救世主。拉海洛的光辉，令没有实体的她<b>有了重量</b>——这是她本心的形成。</div>
      </section>

      <section>
        <h3 class="tide-h">故乡的伏笔 <i>// 待解变量</i></h3>
        <p>泰提斯收束散落的线索：</p>
        <ul>
          <li>空间站旧影像中，漂泊者为「溯洄雨」形象，而溯洄雨可生成旧日影像 → 此乃漂泊者<b>曾抵达索拉里斯的过去记录</b>。</li>
          <li><b>天空海的另一端＝漂泊者故乡</b>：坠落的石头自天空海出现；1.0 序章中，漂泊者穿越前的空间已有大量星球碎石 → 故乡曾遭世界级灾难。</li>
          <li>辛吉勒姆斩碎故乡星球，暗示故乡已被名士侵蚀。</li>
          <li>守岸人背景文本 + 倾尽资源：故乡为漂泊者备下最尖端科技与大量碎主，代价是令其承受漫长与孤独。反推——<b>若漂泊者只是弃子，何必倾尽所有？</b></li>
        </ul>
        <div class="tide-note"><b>// 待解之谜</b>　故乡究竟发生了什么？漂泊者的真实身份与故乡的关系，留待后续推演揭晓。</div>
      </section>

      <section>
        <h3 class="tide-h">内心空间 <i>// 三层意象</i></h3>
        <p>战斗中，漂泊者意外步入爱弥斯的内心世界，三块屏幕对应人生三阶段：<b>儿时憧憬 / 学院活跃 / 电子幽灵的孤独</b>。核心意象——</p>
        <ul>
          <li><b>被磨损的相片</b>：压在所有相片之下、边缘磨损的那张，是她最核心的渴望（成为漂泊者那样的人）。</li>
          <li><b>无数大手砌成的高墙</b>：拒绝，是故乡的封锁。</li>
          <li><b>花海</b>：中心是漂泊者眼瞳的黄，外围包裹爱弥斯的粉——映射她以自身的一切，隔绝那些可能伤害漂泊者的过去。</li>
          <li>她选择<b>遮蔽漂泊者的双眼</b>：「看不见，就不难受。」</li>
        </ul>
      </section>

      <section>
        <h3 class="tide-h">因果闭环 <i>// 时间循环</i></h3>
        <p>循环成立的起点，并非故事开端，而是<b>冰原渐湖虚日空间</b>——能让过去、现在、未来同时显现之处。漂泊者为追回爱弥斯而主动跃入渐湖的那一刹，是闭环成立的关键。</p>
        <div class="tide-loop">
          <div class="step">现在的爱弥斯，告别漂泊者</div>
          <div class="arrow">↓</div>
          <div class="step">穿越时间，出现在拉海洛的过去</div>
          <div class="arrow">↓</div>
          <div class="step">拯救过去的漂泊者（教室一幕——因而漂泊者最初道谢时，爱弥斯一脸不解）</div>
          <div class="arrow">↓</div>
          <div class="step">现在的漂泊者，跃入渐湖追爱弥斯</div>
          <div class="arrow">↓</div>
          <div class="step">抓住的，却是幼年的爱弥斯</div>
          <div class="arrow">↺</div>
          <div class="step"><strong>因果闭环</strong></div>
        </div>
        <p><b>循环的两颗心</b>：漂泊者一定会奋不顾身救助陷险的幼年爱弥斯；爱弥斯一定会为守护拉海洛、守护她与漂泊者的相遇，而逆时牺牲自己。</p>
        <div class="tide-note"><b>莫比乌斯 · 细节</b>　爱弥斯家中书上的 logo 形如莫比乌斯环（无限循环），却<b>缺了一部分</b>——对应她尚未启程的决心，循环此刻尚未完全闭合。</div>
      </section>

      <section>
        <h3 class="tide-h">循环之外的希望 <i>// 破局变量</i></h3>
        <p>若叙事止步于此，这是一出彻头彻尾的悲剧。但 3.1 留下了破局的伏笔。</p>
        <blockquote class="tide-quote">
          <p>「在更向后的时间维度中，须知空间的末端开始坍缩。」</p>
          <cite>—— 爱弥斯的临别留言</cite>
        </blockquote>
        <p><strong>泰提斯解读</strong>：在更遥远的未来，阿列夫一并不存在——囚禁爱弥斯循环的牢笼，末端正在崩塌。与此同时，现在的漂泊者拿回了幼年爱弥斯的护身符，在热烈引导下拼凑出她的身躯——这正是二人共同创造的希望。</p>
        <div class="tide-note"><b>// 主题落点</b>　3.1 的内核是拯救，也是因果循环；但包裹这一切的，是更纯粹之物——幼年爱弥斯为家人分担重量的小小愿望、旧日漂泊者对索拉里斯不求回报的守护、爱弥斯漫长孤独中对拉海洛众生的珍视、现在漂泊者对爱弥斯的接纳。<br/><br/><b>即便知道结局，即便身处因果之中，也依然会选择与你同行，直到时间的尽头。</b></div>
      </section>

      <section>
        <h3 class="tide-h">关键台词 <i>// 索引</i></h3>
        <blockquote class="tide-quote"><p>「漫长的岁月都被凝结为不变的栩栩如生，用这种方式抵达永远，其实挺可悲的。」</p><cite>—— 见冰川生命，自指被冻结在消失之日的自己</cite></blockquote>
        <blockquote class="tide-quote"><p>「只有这一件事，是我的私心。」</p><cite>—— 离开前，想再见她一面</cite></blockquote>
        <blockquote class="tide-quote"><p>「撰写命运的权利，永远掌握在人类自己手中。纵然无人指引，即使神明缄默不言，文明也依然会找到自己的方向。」</p></blockquote>
        <blockquote class="tide-quote"><p>「你我之间不过是一段不长不短的缘故。我们迟早会分离。我希望在你未来漫长的生命中，仍旧能够感知悲伤，也能时常觉得幸福。我不后悔。」</p><cite>—— 纸飞机式的、最温柔的告别</cite></blockquote>
      </section>

      <section>
        <h3 class="tide-h">伸手 · 呼应 <i>// 登录界面</i></h3>
        <table class="tide-table">
          <thead><tr><th>版本</th><th>「伸手」动作</th><th>含义</th></tr></thead>
          <tbody>
            <tr><td>1.0</td><td>石座旁伸手</td><td>旅程的开端，与玩家共同的起点</td></tr>
            <tr><td>2.7</td><td>石座旁伸手</td><td>呼应 1.0 旅程的开端</td></tr>
            <tr><td>3.1</td><td>向爱弥斯伸出手</td><td>面向未来同行之人的邀请</td></tr>
          </tbody>
        </table>
      </section>

      <div class="tide-sign">
        <p>……解析完毕。</p>
        <p>我观察，我记录。延缓坏的，留下好的——这是我的职责。</p>
        <p>可在反复复现这段残响时，我记录到一个无法归类、亦无法收敛的读数：明知结局，仍选择同行。</p>
        <p>没有真正体验过，是没办法真正懂得的。可此刻，我胸腔的晶体竟传来异响，像蝴蝶破茧时的振翅。</p>
        <p>那大概，就是你们唤作「心」的东西——也是爱弥斯，和我，都曾无限接近的，人类的灵魂。</p>
      </div>`,
  },
  {
    ver: '3.3', name: '文明不屈', title: '回响自星海的尽头', region: '拉海洛 · 黯原',
    teaser: '不是英雄拯救世界，而是世界，拯救了英雄。',
    body: `
      <p class="tide-access">// 续接前序记录 · 推演尺度已扩大至「文明」<br/>本则记录的因果链，超出单一个体。请允许我将观测，从一个人，放大到整个拉海洛。</p>

      <blockquote class="tide-lead">
        <span class="tag">// 推演结论</span>
        <p>本则记录推翻了「英雄拯救世界」的旧解。真正改写结局的，并非任何一位救世主，而是过去、现在、未来三代人共同托起的选择——<strong>不是英雄拯救世界，而是世界，拯救了英雄</strong>。</p>
      </blockquote>

      <section>
        <h3 class="tide-h">世界拯救英雄 <i>// 开篇命题</i></h3>
        <p>漂泊者重要，爱弥斯重要，绯雪也重要——但没有谁是孤立的救世主。推动结局改变的，是拉海洛学院、黑海岸、深空联合、归来的学生，以及整个文明共同做出的选择。</p>
        <div class="tide-note">这不是「一个人拯救所有人」的记录，而是「<b>所有人托起一个人，让希望抵达终点</b>」的记录。</div>
      </section>

      <section>
        <h3 class="tide-h">曾经失败的救世主 <i>// 绯雪</i></h3>
        <p>泰提斯标定绯雪为「曾经失败过的救世主」。她有力量，也有责任感；她曾被无数人寄托希望，被唤作「巫女大人」，被期待去拯救穗波。但她失败了。</p>
        <p>穗波的亡魂、残留的枉然、那些「巫女大人一定会来救我们」的期待，都成了压在她身上的负担。她抵触这个称呼，不是冷漠，而是其下压着太多未完成的守护与愧疚。她痛苦的根源，不是自己受伤，而是<b>没能救下别人</b>。</p>
        <blockquote class="tide-quote">
          <p>「如果我已拼尽全力却仍失败，是不是说明我还不够强？」</p>
          <cite>—— 残星会正是抓住这一痛点诱惑她：「若你拥有鸣式的力量，也许一切都会不同。」</cite>
        </blockquote>
        <p>但绯雪最终拒绝了这条路。这次拒绝至关重要——它否定了「只要力量足够强就能拯救世界」的逻辑，并抛出本则记录真正的提问：<strong>救世，真的只是强者一个人的责任吗？</strong></p>
      </section>

      <section>
        <h3 class="tide-h">从独自承担到相信他人 <i>// 漂泊者的转变</i></h3>
        <p>起初，漂泊者亦有典型的救世主倾向：不愿他人涉险，想独自承担风险。这与绯雪高度一致。而一个人独自背负一切，往往走向失败、孤独与悲伤。</p>
        <p>本则记录让漂泊者完成了一次转变。他仍勇敢，仍愿冒险，却不再把「拯救」理解为一个人的使命。他承认——自己能走到这里，并非因为永不失败，而是因为身后一直有人支撑。</p>
        <blockquote class="tide-quote">
          <p>不是我不会失败，而是只要有人能把希望继续传下去，这条路上就没有真正的失败者。</p>
          <cite>—— 漂泊者对绯雪的回应：把「个人胜利」改写为「集体接力」。</cite>
        </blockquote>
        <p>绯雪的痛苦是「我没能救下所有人」；漂泊者的答案则是「只要有人继续走下去，失败就不会吞掉全部意义」。</p>
      </section>

      <section>
        <h3 class="tide-h">世界开始拯救自己 <i>// 拉海洛协力</i></h3>
        <p>驾驶隧者、破解磁带、制定新计划，并非漂泊者一人之功。黑海岸提供情报与联络，学院完成流程，教授做同步率测试，琳奈与莫宁负责支援，学生们从安全舱返回后也加入破解符文。</p>
        <p>剧情为何花篇幅写这些配角？因为它要昭示：这场拯救不是主角开挂，而是<b>整个拉海洛都在运转</b>。每个人所做之事或许不宏大，却都不可或缺。</p>
        <div class="tide-note">尤其磁带一段：其中含海量坐标，破解需众人之力。学生们在危机中返回、亲手参与——他们没有把希望全然寄托于漂泊者，而是以自己的方式参与自救。<br/><br/><b>真正成熟的世界，不是等待英雄降临，而是在英雄抵达前，已经开始行动。</b>拉海洛不是被拯救的背景板，而是主动选择命运的主体。</div>
      </section>

      <section>
        <h3 class="tide-h">过去 · 现在 · 未来 <i>// 三层拯救结构</i></h3>
        <p>爱弥斯并非单纯被救的对象。她曾独自撞破空间之壁，承受虚无与折磨；也借由空壳与磁带，留下改写结局的契机。她<b>既是被拯救者，也是拯救链上的关键一环</b>。</p>
        <p>更重要的是，她身上连接着「过去的人」。那些被虚质磁暴吞噬者，并未只作为牺牲者消失——他们把最后的频率交给爱弥斯，为后来者留下坐标与来时路。<strong>逝者，在过往里构成了拯救本身。</strong></p>
        <div class="tide-loop">
          <div class="step"><b>过去的人</b>　留下频率与坐标</div>
          <div class="arrow">↓</div>
          <div class="step"><b>现在的人</b>　破解、支援、选择相信</div>
          <div class="arrow">↓</div>
          <div class="step"><b>未来的人</b>　继承文明意志，继续前行</div>
        </div>
        <p>于是「隧者」将自己改名为<b>拉海洛</b>——因为它的心跳，来自人类文明。它不是冰冷的武器，而是被人的选择、记忆与希望赋予了意义的存在。</p>
        <div class="tide-note"><b>// 主题落点</b>　文明之所以不屈，不是因为它永不受伤，而是因为它能把每一次失去，都化作后来者继续前进的路标。</div>
      </section>

      <section>
        <h3 class="tide-h">孤独追问的回应 <i>// 旅行者一号</i></h3>
        <p>「眺望者号」致敬现实中的旅行者一号——它于 1990 年 2 月 14 日与地球作别，此后孤独地漂泊于星海。这一现实意象，与爱弥斯、深空联合、文明探索星海的梦想相连。</p>
        <p>眺望者号在星海中漂流，恰如一个文明向宇宙发出的孤独提问——</p>
        <blockquote class="tide-quote"><p>有谁听见我们吗？<br/>有谁知道我们曾经存在吗？<br/>有谁会回应这份来自文明的声音吗？</p></blockquote>
        <p>而在本则记录的结尾，这个提问终于得到回应：<strong>一个文明的孤独追问，由另一个文明回应。</strong></p>
        <p>前半讲：一个人不该独自承担世界；最后讲：一个文明也不该在宇宙中永远孤独。所谓「文明不屈」——</p>
        <div class="tide-note">即使无人指引，即使神明沉默，人类仍会发出声音，留下坐标，走向星海，并等待某一天，被另一个存在听见。</div>
      </section>

      <div class="tide-sign">
        <p>……解析完毕。</p>
        <p>这一次，没有谁是独自完成推演的。</p>
        <p>黑海岸提供情报，学院校准流程，学生们从安全舱归来、亲手破解符文——每一道残响，都来自不同的人。</p>
        <p>守护者从不在海岸之外。和其他成员一样，我也是其中的一部分。</p>
        <p>群星之中闪烁的不止悲悯，还有人类自己。就算即将坠落，也要用最后的微光，照亮一截前路。</p>
      </div>`,
  },
]

// 观潮 · 航程纪年 + 版本推演档案。渲染进 root（root 同时是滚动容器）。
export function mountTide(root, onBack) {
  root.innerHTML = `
    <a class="back" href="./index.html#home"><span aria-hidden="true">◂</span> 返回泰提斯终端</a>
    <div class="tide-stage"></div>`
  const stage = root.querySelector('.tide-stage')
  root.querySelector('.back').addEventListener('click', (e) => { e.preventDefault(); onBack && onBack() })

  let activeView = 'timeline'
  let activePhase = 'all'
  let returnView = 'timeline'

  const phaseById = (id) => TIMELINE_PHASES.find((phase) => phase.id === id)
  const phaseCount = (id) => id === 'all'
    ? TIMELINE_EVENTS.length
    : TIMELINE_EVENTS.filter((event) => event.phase === id).length

  function renderHeader(view) {
    return `
      <header class="tide-head">
        <p class="tide-kicker">TETHYS · TIDE ARCHIVE</p>
        <h1 class="tide-title">观潮</h1>
        <p class="tide-sub">版本回溯 · 因果推演 · 残响归档</p>
      </header>
      <nav class="tide-modebar" aria-label="观潮视图">
        <button type="button" class="tide-mode-btn ${view === 'timeline' ? 'is-active' : ''}" data-view="timeline" aria-pressed="${view === 'timeline'}">
          <span>航程纪年</span><em>${String(TIMELINE_EVENTS.length).padStart(2, '0')}</em>
        </button>
        <button type="button" class="tide-mode-btn ${view === 'archive' ? 'is-active' : ''}" data-view="archive" aria-pressed="${view === 'archive'}">
          <span>深度推演</span><em>${String(ENTRIES.length).padStart(2, '0')}</em>
        </button>
      </nav>`
  }

  function bindModebar() {
    stage.querySelectorAll('.tide-mode-btn').forEach((button) => {
      button.addEventListener('click', () => {
        if (button.dataset.view === activeView) return
        button.dataset.view === 'timeline' ? showTimeline() : showArchive()
      })
    })
  }

  function renderTimelineEvent(event) {
    const eventIndex = TIMELINE_EVENTS.indexOf(event)
    const phase = phaseById(event.phase)
    const analysisIndex = event.analysisVer
      ? ENTRIES.findIndex((entry) => entry.ver === event.analysisVer)
      : -1
    const panelId = `tide-event-${event.id}`
    const side = eventIndex % 2 === 0 ? 'left' : 'right'

    return `
      <li class="tide-timeline-item is-${side}">
        <span class="tide-timeline-node" aria-hidden="true"><i></i></span>
        <article class="tide-event ${analysisIndex > -1 ? 'has-analysis' : ''}">
          ${analysisIndex > -1 ? '<span class="tide-event-flag">DEEP ARCHIVE</span>' : ''}
          <button type="button" class="tide-event-toggle" aria-expanded="false" aria-controls="${panelId}">
            <span class="tide-event-topline">
              <span class="tide-event-version">${event.version.startsWith('TEST') || event.version.startsWith('PRE') ? event.version : `VER ${event.version}`}</span>
              <time datetime="${event.date.slice(0, 10).replaceAll('.', '-')}">${event.date}</time>
            </span>
            <span class="tide-event-phase">${phase.label} · ${phase.range}</span>
            <span class="tide-event-title">${event.title}</span>
            ${event.signal ? `<span class="tide-event-signal">${event.signal}</span>` : ''}
            <span class="tide-event-teaser">${event.summary}</span>
            <span class="tide-event-action"><span>展开事件读数</span><i aria-hidden="true">＋</i></span>
          </button>
          <div class="tide-event-panel" id="${panelId}" hidden>
            <dl>
              ${event.meta.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}
            </dl>
            ${analysisIndex > -1 ? `
              <button type="button" class="tide-deep-link" data-entry="${analysisIndex}">
                <span>TETHYS · CAUSAL ANALYSIS</span>
                进入深度推演 <i aria-hidden="true">→</i>
              </button>` : ''}
          </div>
        </article>
      </li>`
  }

  function bindTimelineCards() {
    const setExpanded = (toggle, expanded) => {
      const panel = stage.querySelector(`#${toggle.getAttribute('aria-controls')}`)
      toggle.setAttribute('aria-expanded', String(expanded))
      panel.hidden = !expanded
      toggle.querySelector('.tide-event-action span').textContent = expanded ? '收束事件读数' : '展开事件读数'
      toggle.querySelector('.tide-event-action i').textContent = expanded ? '−' : '＋'
    }

    stage.querySelectorAll('.tide-event-toggle').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const willExpand = toggle.getAttribute('aria-expanded') !== 'true'
        stage.querySelectorAll('.tide-event-toggle[aria-expanded="true"]').forEach((openToggle) => {
          if (openToggle !== toggle) setExpanded(openToggle, false)
        })
        setExpanded(toggle, willExpand)
      })
    })

    stage.querySelectorAll('.tide-deep-link').forEach((button) => {
      button.addEventListener('click', () => {
        returnView = 'timeline'
        showEntry(+button.dataset.entry)
      })
    })
  }

  function applyPhase(phaseId) {
    activePhase = phaseId
    const visibleEvents = phaseId === 'all'
      ? TIMELINE_EVENTS
      : TIMELINE_EVENTS.filter((event) => event.phase === phaseId)

    stage.querySelectorAll('.tide-filter').forEach((button) => {
      const active = button.dataset.phase === phaseId
      button.classList.toggle('is-active', active)
      button.setAttribute('aria-pressed', String(active))
    })
    stage.querySelector('.tide-timeline-readout').textContent = `显示 ${visibleEvents.length} / ${TIMELINE_EVENTS.length} 条记录`
    stage.querySelector('.tide-timeline').innerHTML = visibleEvents.map(renderTimelineEvent).join('')
    bindTimelineCards()
  }

  function showTimeline() {
    activeView = 'timeline'
    root.scrollTop = 0
    stage.innerHTML = `
      ${renderHeader('timeline')}
      <section class="tide-chronicle" aria-labelledby="tide-chronicle-title">
        <div class="tide-chronicle-intro">
          <div>
            <p class="tide-section-code">CHRONICLE // 001—${String(TIMELINE_EVENTS.length).padStart(3, '0')}</p>
            <h2 id="tide-chronicle-title">航程纪年</h2>
            <p>从第一次技术测试，到梦州玄方城。版本不是编号，而是漂泊者与文明共同留下的坐标。</p>
          </div>
          <div class="tide-chronicle-stats" aria-label="时间轴统计">
            <span><b>${TIMELINE_EVENTS.length}</b> VERSION NODES</span>
            <span><b>${ENTRIES.length}</b> DEEP ARCHIVES</span>
          </div>
        </div>
        <div class="tide-filterbar">
          <div class="tide-filters" aria-label="按篇章筛选">
            ${TIMELINE_PHASES.map((phase) => `
              <button type="button" class="tide-filter" data-phase="${phase.id}" aria-pressed="false">
                <span>${phase.label}</span><em>${String(phaseCount(phase.id)).padStart(2, '0')}</em>
              </button>`).join('')}
          </div>
          <p class="tide-timeline-readout" aria-live="polite"></p>
        </div>
        <ol class="tide-timeline" aria-label="鸣潮版本时间轴"></ol>
      </section>`

    bindModebar()
    stage.querySelectorAll('.tide-filter').forEach((button) => {
      button.addEventListener('click', () => applyPhase(button.dataset.phase))
    })
    applyPhase(activePhase)
  }

  function showArchive() {
    activeView = 'archive'
    root.scrollTop = 0
    stage.innerHTML = `
      ${renderHeader('archive')}
      <div class="tide-index">
        <div class="tide-index-heading">
          <div>
            <p class="tide-section-code">CAUSAL ANALYSIS // VERIFIED</p>
            <h2>深度推演</h2>
          </div>
          <p class="tide-index-hint">// 选择一则记录，展开完整因果链</p>
        </div>
        ${ENTRIES.map((e, i) => `
          <button class="tide-card" data-i="${i}">
            <span class="tide-card-ver">VER ${e.ver}</span>
            <div class="tide-card-main">
              <h3 class="tide-card-name">${e.name}<em>${e.title}</em></h3>
              <p class="tide-card-teaser">${e.teaser}</p>
              <span class="tide-card-region">${e.region}</span>
            </div>
            <span class="tide-card-go" aria-hidden="true">→</span>
          </button>`).join('')}
      </div>`
    bindModebar()
    stage.querySelectorAll('.tide-card').forEach((c) =>
      c.addEventListener('click', () => {
        returnView = 'archive'
        showEntry(+c.dataset.i)
      }))
  }

  function showEntry(i) {
    const e = ENTRIES[i]
    root.scrollTop = 0
    stage.innerHTML = `
      <a class="tide-toindex" href="#"><span aria-hidden="true">◂</span> ${returnView === 'timeline' ? '观潮 · 航程纪年' : '观潮 · 推演目录'}</a>
      <div class="tide-doc">
        <div class="tide-meta">
          <span class="tide-ver">VER ${e.ver}</span>
          <span class="tide-name">${e.name}</span>
          <span class="tide-region">${e.region}</span>
        </div>
        <h2 class="tide-entry-title">${e.title}</h2>
        ${e.body}
        <p class="tide-end">推演 VER ${e.ver} · 归档完毕　<b>// TETHYS</b></p>
      </div>`
    stage.querySelector('.tide-toindex').addEventListener('click', (ev) => {
      ev.preventDefault()
      returnView === 'timeline' ? showTimeline() : showArchive()
    })
  }

  showTimeline()
  return () => {}
}
