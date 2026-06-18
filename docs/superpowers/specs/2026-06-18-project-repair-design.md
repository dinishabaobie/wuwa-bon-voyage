# Wuwa Bon Voyage Project Repair Design

## Goal

Repair the confirmed functional, verification, accessibility, dependency, and loading issues without redesigning the site or changing the duplicated `cyberpunk` and `anyuan` chapter content.

## Scope

- Keep all existing chapter data and visual styling.
- Prevent the fixed BGM control from covering the homepage module links at desktop and mobile widths.
- Make the intro entry control, observation cards, relation cards, and profile overlay keyboard-operable.
- Give the profile overlay dialog semantics, focus entry, focus return, Escape handling, and background isolation.
- Replace the stale screenshot-only checks with one deterministic browser regression command.
- Run that regression command in GitHub Pages deployment before upload.
- Upgrade Vite to a non-vulnerable supported major version and regenerate the lockfile.
- Reduce avoidable initial loading without changing visible image or audio quality.

## Approach

Use a minimal layout correction rather than restructuring the header: reserve a non-overlapping position for the BGM control at desktop widths and move it below the header on narrow screens. Add explicit semantic controls and shared keyboard activation behavior while retaining the current card markup and CSS appearance.

Convert the existing `verify.mjs` file into an assertion-driven browser regression runner. It will start from the intro, enter the site, exercise every module at desktop and mobile widths, verify expected content, check keyboard paths, and exit non-zero on browser errors or failed assertions. The obsolete narrow-purpose scripts remain outside the primary command and are not part of CI.

## Components and Data Flow

1. `index.html` exposes the intro as a real button while preserving the existing loader container and animation.
2. `src/main.js` handles both pointer and keyboard entry, returns focus when module overlays close, and treats Escape as closing only the topmost visible layer.
3. `src/style.css` separates module navigation and BGM hit areas and adds focus-visible styles and reduced-motion behavior.
4. `src/observation.js` gives cards button semantics, opens a modal profile with focus management, and restores focus to the originating card.
5. `src/relation.js` makes relationship cards keyboard focusable and supports Enter/Space activation.
6. `verify.mjs` provides the end-to-end regression contract used by `npm test` and CI.
7. `package.json`, `package-lock.json`, and `.github/workflows/deploy.yml` define the safe dependency and verification pipeline.

## Error Handling

- Browser verification records console/page errors and fails the process after cleanup.
- The local server and browser are closed in `finally` blocks so failures do not leave processes running.
- Module loading failures release the busy state, remove partial overlays, and restore homepage rendering controls.
- Audio playback rejection remains non-fatal because browser autoplay policy can legitimately block playback.

## Testing

- First run the new regression against the current code and confirm failures for the blocked module links and keyboard-only entry.
- After implementation, run the same regression at 1280x720 and 390x844.
- Run JavaScript syntax checks, `npm test`, `npm audit`, and `npm run build`.
- Confirm the original repository receives only intended files and remains free of temporary screenshots, caches, and build output.

## Non-goals

- No changes to duplicated chapter content.
- No visual redesign, copy rewrite, or image/audio recompression.
- No unrelated refactoring of the large chapter/profile data files.
