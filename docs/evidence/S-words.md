# S-words evidence

| Acceptance box | How verified |
|---|---|
| Footer has `data-id="words"` reading `N words` | `index.html` renders `${wordCount(notes)} words` from all saved notes before search/tag filtering. The page-script test verifies `0 words`, then `3 words` and `5 words` after form submissions, and `5 words` with a search that matches no notes. |
| `src/words.js` exports `wordCount(notes)` with unit tests that fail without the change | `test/words.test.mjs` covers empty/blank notes, multiple notes, mixed whitespace, punctuation/hyphens, and stored notes. Before adding the module, the targeted test command exited 1 (`ERR_MODULE_NOT_FOUND`). With the module present but the baseline `index.html`, the page integration test also exits 1 because the words footer is missing. |
| Works after page reload | The page-script test starts a fresh document using the same saved localStorage values and verifies `5 words`. The total is derived from existing `notes.v1` data, so no separate counter needs persistence. |

Tests: `NODE_OPTIONS=--max-old-space-size=4096 timeout 600 npm test` exit 0; `git diff --check` exit 0.

Validation limitation: page integration uses a minimal DOM stub executing the actual inline module script. A headless screenshot could not be captured: the sandbox rejected the local HTTP listener (`EPERM`) and Chrome exited when launched through a pipe.
