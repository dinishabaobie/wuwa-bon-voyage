import { chromium } from 'playwright-core'

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto('http://localhost:5173')
await page.waitForTimeout(6500) // 等加载动画结束

await page.click('.tl-item[data-target="v34"]')
await page.waitForTimeout(3000)
await page.screenshot({ path: 'shots/9-ver34-top.png' })

// 继续向下滚，让宽图进入视口完成擦除动画
for (let i = 0; i < 5; i++) { await page.mouse.wheel(0, 160); await page.waitForTimeout(150) }
await page.waitForTimeout(2200)
await page.screenshot({ path: 'shots/10-ver34-wide.png' })

console.log(errors.length ? 'CONSOLE ERRORS:\n' + errors.join('\n') : 'NO CONSOLE ERRORS')
await browser.close()
