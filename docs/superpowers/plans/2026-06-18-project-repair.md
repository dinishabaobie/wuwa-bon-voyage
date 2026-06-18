# Project Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repair the confirmed interaction, verification, accessibility, dependency, and initial-loading issues without changing chapter content or redesigning the site.

**Architecture:** Keep the current Vite multi-page structure. Establish one assertion-driven Playwright regression runner, make the smallest semantic and layout corrections in existing modules, then wire that runner into package scripts and deployment.

**Tech Stack:** Vite, vanilla JavaScript/CSS, GSAP, Lenis, Three.js, Playwright Core, Node.js assertions.

---

### Task 1: Browser regression contract

**Files:**
- Modify: `verify.mjs`
- Modify: `package.json`

- [ ] **Step 1: Replace screenshot-only verification with failing assertions**

Create cases that launch Chrome with `channel: 'chrome'`, visit `http://127.0.0.1:5173`, and assert:

```js
assert.equal(await page.locator('#enter-site').evaluate((el) => el.tagName), 'BUTTON')
assert.deepEqual(await centerHits(page), ['观测对象', '观潮', '群像'])
assert.equal(await page.locator('.subject-card[tabindex="0"]').count(), 15)
assert.equal(await page.locator('.bcard[tabindex="0"]').count(), 96)
```

Add `"test": "node verify.mjs"` to `package.json`.

- [ ] **Step 2: Run the regression and verify RED**

Run: `npm test`

Expected: FAIL because `#enter-site` is not a button, homepage module hit targets are covered, and cards are not keyboard focusable.

- [ ] **Step 3: Commit the regression contract**

Run:

```bash
git add verify.mjs package.json
git commit -m "test: cover homepage and keyboard regressions"
```

### Task 2: Homepage navigation and intro accessibility

**Files:**
- Modify: `index.html:11-28`
- Modify: `src/main.js:1-550`
- Modify: `src/style.css:18-25, 128-165, 182-243, 489-544, 593-605`

- [ ] **Step 1: Implement the smallest homepage fix**

Change the intro prompt to a real button:

```html
<button class="loader-enter" id="enter-site" type="button">▸ 点击任意处接入</button>
```

Move `#bgm-toggle` to a bottom-right fixed position so it cannot overlap the header. Add `:focus-visible` styles and reduced-motion fallbacks. In `openView`, use `try/catch/finally` so failed imports release `busy`, remove the partial overlay, and resume Lenis/trail state.

- [ ] **Step 2: Defer optional Three.js initialization**

Remove the static `TrailBackground` import and initialize it through:

```js
let trail = null
async function ensureTrail() {
  if (!trail) {
    const { TrailBackground } = await import('./trail.js')
    trail = new TrailBackground(document.getElementById('trail-canvas'))
  }
  return trail
}
```

Use optional calls before initialization and set BGM preload to `metadata`.

- [ ] **Step 3: Run targeted regression**

Run: `npm test`

Expected: Homepage intro and navigation assertions pass; card accessibility assertions remain failing until Task 3.

- [ ] **Step 4: Commit homepage repairs**

Run:

```bash
git add index.html src/main.js src/style.css
git commit -m "fix: restore homepage module access"
```

### Task 3: Keyboard cards and modal focus

**Files:**
- Modify: `src/observation.js:420-615`
- Modify: `src/observation.css:88-204, 312-385`
- Modify: `src/relation.js:73-170`
- Modify: `src/relation.css:63-78`
- Modify: `src/subshell.js:30-58`

- [ ] **Step 1: Add semantic keyboard activation**

Give observation and relation cards `role="button"` and `tabindex="0"`. Route click, Enter, and Space through one activation function per card. Add visible focus styling.

- [ ] **Step 2: Add profile dialog focus lifecycle**

Set `role="dialog"`, `aria-modal="true"`, and an accessible label on `.prof-overlay`. On open, inert other body children, remember the originating card, and focus `.prof-back`. On Escape, close only the profile; on close, restore inert states and return focus to the originating card.

- [ ] **Step 3: Run regression and verify GREEN**

Run: `npm test`

Expected: All browser regression cases pass with zero page or console errors.

- [ ] **Step 4: Commit accessibility repairs**

Run:

```bash
git add src/observation.js src/observation.css src/relation.js src/relation.css src/subshell.js
git commit -m "fix: add keyboard and dialog accessibility"
```

### Task 4: Dependency and deployment safety

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `.github/workflows/deploy.yml:24-35`

- [ ] **Step 1: Upgrade Vite and regenerate the lockfile**

Run: `npm install --save-dev vite@^8.0.16`

Expected: `package.json` and `package-lock.json` use Vite 8.0.16 or newer in the compatible major.

- [ ] **Step 2: Add regression execution to deployment**

Insert after build:

```yaml
      - run: npm test
```

- [ ] **Step 3: Run full verification**

Run:

```bash
npm audit
npm test
npm run build
```

Expected: audit reports zero vulnerabilities, browser regression passes, and production build exits 0 without the previous 545 KB main-chunk warning.

- [ ] **Step 4: Commit dependency and CI repairs**

Run:

```bash
git add package.json package-lock.json .github/workflows/deploy.yml
git commit -m "chore: secure build and deployment checks"
```

### Task 5: Integrate and verify original repository

**Files:**
- Copy all committed changed files from the isolated checkout to `/Users/dinisha/wuwa-bon-voyage/`.

- [ ] **Step 1: Review isolated diff**

Run: `git diff origin/main...HEAD --check`

Expected: no whitespace errors and no chapter-data changes.

- [ ] **Step 2: Copy intended files only**

Copy the design, plan, source, test, package, lock, and workflow files. Do not copy `node_modules`, `dist`, `shots`, or `.npm-cache`.

- [ ] **Step 3: Verify the original repository**

Run in `/Users/dinisha/wuwa-bon-voyage`:

```bash
npm ci
npm audit
npm test
npm run build
git diff --check
git status --short
```

Expected: install, audit, regression, and build pass; Git shows only the intended repair files.
