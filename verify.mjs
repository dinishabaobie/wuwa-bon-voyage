import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { chromium } from 'playwright-core'
import { TIMELINE_EVENTS, TIMELINE_PHASES } from './src/timeline.js'
import { CHRONOLOGY_EVENTS, CHRONOLOGY_ERAS } from './src/chronology.js'

// 期望条目数直接从数据源算出，加新版本内容后不用手改测试
const tideSource = readFileSync(new URL('./src/tide.js', import.meta.url), 'utf8')
const ENTRY_VERS = [...tideSource.matchAll(/^    ver: '([^']+)'/gm)].map((m) => m[1])
if (!ENTRY_VERS.length) throw new Error('verify.mjs: 没能从 src/tide.js 的 ENTRIES 里读到任何 ver（缩进或写法变了？）')
const observationSource = readFileSync(new URL('./src/observation.js', import.meta.url), 'utf8')
const subjectsBlock = observationSource.match(/const SUBJECTS = \[([\s\S]*?)\n\]/)?.[1] || ''
const SUBJECT_COUNT = (subjectsBlock.match(/\{ code: 'S-/g) || []).length
if (!SUBJECT_COUNT) throw new Error('verify.mjs: 没能从 src/observation.js 的 SUBJECTS 里数出观测对象')
const relationNodes = JSON.parse(readFileSync(new URL('./src/relations.canvas', import.meta.url), 'utf8')).nodes || []
const EXPECTED = {
  subjects: SUBJECT_COUNT,
  timeline: TIMELINE_EVENTS.length,
  timelineDeepLinks: TIMELINE_EVENTS.filter((event) => ENTRY_VERS.includes(event.analysisVer)).length,
  archive: ENTRY_VERS.length,
  chronology: CHRONOLOGY_EVENTS.length,
  deepLinks: CHRONOLOGY_EVENTS.filter((event) => ENTRY_VERS.includes(event.analysisVer)).length,
  present: CHRONOLOGY_EVENTS.filter((event) => event.era === 'present').length,
  // 深度计：海面 + 每个有记录的地区 + 每个有残响的纪元 + 地底星空
  depthMarks: 2
    + TIMELINE_PHASES.filter((phase) => TIMELINE_EVENTS.some((event) => event.phase === phase.id)).length
    + CHRONOLOGY_ERAS.filter((era) => CHRONOLOGY_EVENTS.some((event) => event.era === era.id)).length,
  relations: relationNodes.filter((node) => node.type === 'text' && node.text && node.text.trim()).length,
}

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
  await page.waitForURL(/\/(?:index\.html)?(?:#home)?$/)
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
  await page.waitForURL(/\/observation\.html$/)
  assert.equal(await page.locator('.subject-card').count(), EXPECTED.subjects)
  assert.equal(await page.locator('.subject-card[role="button"][tabindex="0"]').count(), EXPECTED.subjects)

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

  const observationPage = await browser.newPage({ viewport: { width: 1280, height: 720 } })
  await observationPage.goto(`${BASE_URL}/observation.html`)
  const observationRoot = observationPage.locator('#view-root')
  assert.equal(await observationRoot.evaluate((element) => getComputedStyle(element).overflowY), 'auto')
  const standaloneSubject = observationPage.locator('.subject-card').first()
  await standaloneSubject.click()
  await observationPage.locator('.prof-overlay.show').waitFor()
  await observationPage.keyboard.press('Escape')
  await observationPage.locator('.prof-overlay.show').waitFor({ state: 'hidden' })
  assert.equal(
    await observationRoot.evaluate((element) => getComputedStyle(element).overflowY),
    'auto',
    'closing a profile must restore the standalone observation scroll container',
  )
  await observationPage.mouse.move(1100, 650)
  await observationPage.mouse.wheel(0, 600)
  await observationPage.waitForTimeout(100)
  assert.ok(
    await observationRoot.evaluate((element) => element.scrollTop) > 0,
    'trackpad-style vertical wheel input must scroll the standalone observation page',
  )
  await observationPage.close()

  await page.getByRole('link', { name: '观潮', exact: true }).click()
  await page.locator('.view-overlay.show').waitFor()
  await page.waitForURL(/\/tide\.html$/)
  await page.mouse.move(320, 220)
  assert.equal(
    await page.locator('#cursor').evaluate((element) => getComputedStyle(element).display),
    'block',
    'the shared custom cursor must remain visible in the tide view',
  )
  assert.equal(
    await page.locator('#cursor').evaluate((element) => element.style.translate),
    '320px 220px',
    'the shared custom cursor must track the pointer without interpolation',
  )
  assert.equal(await page.locator('.tide-v').count(), EXPECTED.timeline)
  assert.equal(
    await page.locator('.tide-v .tide-deep-link').count(),
    EXPECTED.timelineDeepLinks,
    'every timeline event with analysisVer must link to an existing deep analysis entry',
  )
  assert.equal(await page.locator('.tide-echo').count(), EXPECTED.chronology)
  assert.equal(await page.locator('.tide-echo .tide-deep-link').count(), EXPECTED.deepLinks)
  assert.equal(await page.locator('#tide-era-present .tide-echo').count(), EXPECTED.present)
  assert.equal(await page.locator('.tide-star').count(), EXPECTED.archive)
  assert.equal(
    await page.locator('.tide-gauge-mark').count(),
    EXPECTED.depthMarks,
    'the depth gauge must list the surface, every region and era, and the star sky',
  )
  await page.locator('.tide-star').last().click()
  await page.locator('.tide-entry .tide-doc').waitFor()
  await page.waitForFunction(
    () => document.activeElement?.classList.contains('tide-entry-title'),
    null,
    { timeout: 3_000 },
  )
  await page.locator('.tide-toindex').click()
  await page.locator('.tide-descent').waitFor()
  await page.waitForFunction(
    () => document.activeElement?.classList.contains('tide-star'),
    null,
    { timeout: 3_000 },
  )
  await closeModule(page)

  await page.getByRole('link', { name: '群像', exact: true }).click()
  await page.locator('.view-overlay.show').waitFor()
  await page.waitForURL(/\/relation\.html$/)
  assert.equal(await page.locator('.bcard').count(), EXPECTED.relations)
  assert.equal(await page.locator('.bcard[role="button"][tabindex="0"]').count(), EXPECTED.relations)
  const firstRelation = page.locator('.bcard').first()
  await firstRelation.focus()
  await firstRelation.press('Enter')
  assert.equal(await firstRelation.evaluate((element) => element.classList.contains('is-src')), true)

  assert.deepEqual(consoleErrors, [], `browser errors:\n${consoleErrors.join('\n')}`)
  console.log('PASS: navigation, timeline, module content, modal focus, and observation trackpad scrolling')
} finally {
  await browser?.close()
  server.kill('SIGTERM')
}
