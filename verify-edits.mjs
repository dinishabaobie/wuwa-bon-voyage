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
await page.waitForTimeout(6500)

await page.click('.tl-item[data-target="v33"]')
await page.waitForTimeout(3000)
await page.screenshot({ path: 'shots/11-ver33-new.png' })

await page.click('.tl-item[data-target="v34"]')
await page.waitForTimeout(3000)
await page.screenshot({ path: 'shots/12-ver34-new.png' })

console.log(errors.length ? 'CONSOLE ERRORS:\n' + errors.join('\n') : 'NO CONSOLE ERRORS')
await browser.close()
