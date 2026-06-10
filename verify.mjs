import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

mkdirSync('shots', { recursive: true })

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto('http://localhost:5173')
await page.waitForTimeout(2200)
await page.screenshot({ path: 'shots/0-loader.png' })

await page.waitForTimeout(4200) // 等加载层退场、首屏入场

// 画一道光标拖痕
for (let i = 0; i <= 24; i++) {
  await page.mouse.move(260 + i * 46, 460 + Math.sin(i / 2.6) * 130, { steps: 2 })
  await page.waitForTimeout(16)
}
await page.waitForTimeout(250)
await page.screenshot({ path: 'shots/1-hero.png' })

const stops = [
  ['v30', '2-ver30'], ['v31', '3-ver31'], ['v32', '4-ver32'],
  ['v33', '5-ver33'], ['v34', '6-ver34'], ['ending', '7-ending-start'],
]
for (const [id, name] of stops) {
  await page.click(`.tl-item[data-target="${id}"]`)
  await page.waitForTimeout(3000)
  await page.screenshot({ path: `shots/${name}.png` })
}

// 在结尾固定段内继续滚动，看告别语逐字浮现
for (let i = 0; i < 10; i++) { await page.mouse.wheel(0, 320); await page.waitForTimeout(120) }
await page.waitForTimeout(2200)
await page.screenshot({ path: 'shots/8-ending-text.png' })

console.log(errors.length ? 'CONSOLE ERRORS:\n' + errors.join('\n') : 'NO CONSOLE ERRORS')
await browser.close()
