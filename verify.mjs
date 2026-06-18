import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { chromium } from 'playwright-core'

const HOST = '127.0.0.1'
const PORT = 5173
const BASE_URL = `http://${HOST}:${PORT}`
const consoleErrors = []

const server = spawn(process.execPath, [
  'node_modules/vite/bin/vite.js',
  '--host', HOST,
  '--port', String(PORT),
  '--strictPort',
], { stdio: ['ignore', 'pipe', 'pipe'] })

let serverOutput = ''
server.stdout.on('data', (chunk) => { serverOutput += chunk })
server.stderr.on('data', (chunk) => { serverOutput += chunk })

async function waitForServer() {
  const deadline = Date.now() + 15_000
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`Vite exited early:\n${serverOutput}`)
    try {
      const response = await fetch(BASE_URL)
      if (response.ok) return
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 150))
  }
  throw new Error(`Vite did not become ready:\n${serverOutput}`)
}

async function centerHits(page) {
  return page.locator('.hero-module').evaluateAll((links) => links.map((link) => {
    const rect = link.getBoundingClientRect()
    const top = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
    return top?.closest('a,button')?.textContent?.trim() || ''
  }))
}

async function closeModule(page) {
  await page.locator('.view-overlay .back').click()
  await page.locator('.view-overlay').waitFor({ state: 'detached' })
}

let browser
try {
  await waitForServer()
  browser = await chromium.launch({
    ...(process.env.CHROME_PATH
      ? { executablePath: process.env.CHROME_PATH }
      : { channel: 'chrome' }),
    headless: true,
  })
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => consoleErrors.push(String(error)))

  await page.goto(BASE_URL)
  await page.locator('.boot.done').waitFor({ timeout: 15_000 })

  const enter = page.locator('#enter-site')
  assert.equal(await enter.count(), 1, 'intro must expose one #enter-site control')
  assert.equal(await enter.evaluate((element) => element.tagName), 'BUTTON', 'intro control must be a button')
  await enter.focus()
  await enter.press('Enter')
  await page.locator('#loader').waitFor({ state: 'detached', timeout: 5000 })

  assert.deepEqual(
    await centerHits(page),
    ['观测对象', '观潮', '群像'],
    'desktop module links must receive their own center-point clicks',
  )

  await page.setViewportSize({ width: 390, height: 844 })
  assert.deepEqual(
    await centerHits(page),
    ['观测对象', '观潮', '群像'],
    'mobile module links must receive their own center-point clicks',
  )
  await page.setViewportSize({ width: 1280, height: 720 })

  await page.getByRole('link', { name: '观测对象', exact: true }).click()
  await page.locator('.view-overlay.show').waitFor()
  assert.equal(await page.locator('.subject-card').count(), 15)
  assert.equal(await page.locator('.subject-card[role="button"][tabindex="0"]').count(), 15)

  const firstSubject = page.locator('.subject-card').first()
  await firstSubject.focus()
  await firstSubject.press('Enter')
  const profile = page.locator('.prof-overlay.show')
  await profile.waitFor()
  assert.equal(await profile.getAttribute('role'), 'dialog')
  assert.equal(await profile.getAttribute('aria-modal'), 'true')
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('prof-back')), true)
  await page.keyboard.press('Escape')
  await profile.waitFor({ state: 'hidden' })
  assert.equal(await page.locator('.view-overlay.show').count(), 1, 'Escape must keep observation view open')
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('subject-card')), true)
  await closeModule(page)

  await page.getByRole('link', { name: '观潮', exact: true }).click()
  await page.locator('.view-overlay.show').waitFor()
  assert.equal(await page.locator('.tide-card').count(), 2)
  await closeModule(page)

  await page.getByRole('link', { name: '群像', exact: true }).click()
  await page.locator('.view-overlay.show').waitFor()
  assert.equal(await page.locator('.bcard').count(), 96)
  assert.equal(await page.locator('.bcard[role="button"][tabindex="0"]').count(), 96)
  const firstRelation = page.locator('.bcard').first()
  await firstRelation.focus()
  await firstRelation.press('Enter')
  assert.equal(await firstRelation.evaluate((element) => element.classList.contains('is-src')), true)

  assert.deepEqual(consoleErrors, [], `browser errors:\n${consoleErrors.join('\n')}`)
  console.log('PASS: homepage navigation, module content, keyboard cards, and modal focus')
} finally {
  await browser?.close()
  server.kill('SIGTERM')
}
