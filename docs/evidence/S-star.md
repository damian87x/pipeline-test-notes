# S-star evidence

| Acceptance box | How verified |
|---|---|
| `index.html` has a toggle with `data-id="star-filter"` that shows only starred notes | The labelled "Starred only" checkbox re-renders through `filterStarred`, composed with existing search, tag, sort and pin behavior. Each note has a Star/Unstar button so users can mark important notes. Unit tests cover enabled/disabled filtering, empty results, legacy notes, order preservation, non-mutation and search/tag combinations. |
| `src/star.js` exports `filterStarred(notes, on)` with unit tests, including a test that fails without the change | `test/star.test.mjs` was added first. `NODE_OPTIONS=--max-old-space-size=4096 timeout 600 npm test` exited 1 before `src/star.js` existed (`ERR_MODULE_NOT_FOUND`); it exits 0 with the implementation. |
| Behavior survives a page reload where applicable | Star/Unstar saves `starred` in `notes.v1`; the checkbox saves its boolean preference in `star-filter.v1` and restores it before the initial render. Unit tests verify star/unstar persistence through fresh storage reads. A temporary Node VM harness executes the actual `index.html` module script with DOM stubs and shared storage, checking both filter settings after reload, star persistence, unstar removal and search/tag combinations. |

Tests: `NODE_OPTIONS=--max-old-space-size=4096 timeout 600 npm test` exit 0; `git diff --check` exit 0.

Page-script integration: `NODE_OPTIONS=--max-old-space-size=4096 timeout 600 node /tmp/S-star-page.mjs` exit 0. The temporary harness is outside the repository; no dependencies were added.

Browser validation gap: headless Chromium could not launch in this sandbox (`Operation not permitted`); browser rendering and a screenshot remain unverified. The page-script harness verifies logic and reload initialization, not browser rendering.
