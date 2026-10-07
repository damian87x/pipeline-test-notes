# S-clear evidence

| Acceptance box | How verified |
|---|---|
| `index.html` has a `data-id="clear-all"` button that confirms before removing every note | The button calls `confirm('Clear all notes?')` and gates deletion through `shouldClear`. Integration tests execute the actual click handler, verify notes still exist when confirmation is requested, and check both acceptance and cancellation. The handler clears the complete stored list, independent of search/tag filters. |
| `src/clear.js` exports `shouldClear(confirmed, notes)` with unit tests | `test/clear.test.mjs` covers confirmed and cancelled decisions, empty lists, and unchanged input. Before adding the module, `timeout 600 node --test test/clear.test.mjs` exited 1 (`ERR_MODULE_NOT_FOUND`), proving the tests fail without the change. |
| Clearing persists after reload | The accepted handler writes `[]` to `notes.v1`; integration tests read the same backing store through a fresh storage wrapper and `listNotes`, obtaining an empty list. Cancellation preserves both notes. Confirmed clearing also cancels pending undo, hides the toast, resets editing, and rerenders. |

Tests: `NODE_OPTIONS=--max-old-space-size=4096 timeout 600 npm test` exit 0; `git diff --check` exit 0.

Browser validation gap: local HTTP server startup failed with `listen EPERM`; Chromium startup also failed with `Operation not permitted` in this sandbox. No running-app screenshot was captured. Reload persistence is verified at the storage/handler integration boundary; visual browser QA remains for the conductor.
