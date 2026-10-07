# S-wrap evidence

| Acceptance box | How verified |
|---|---|
| List note text uses `data-id="note-text"` and shows up to 100 characters followed by an ellipsis when longer | `index.html` renders the note-text span through `truncateNote(n.text, 100)`. The page integration test checks short, exactly 100-character, and longer notes. |
| `src/truncate.js` exports `truncateNote(text, max)` with tests that fail without the change | `test/truncate.test.mjs` covers empty/short text, the 100-character boundary, longer notes, custom limits, and page rendering. Before the helper existed, `timeout 600 node --test test/truncate.test.mjs` exited 1 with `ERR_MODULE_NOT_FOUND`. |
| Truncation applies after reload while the full note remains saved | The integration test executes the actual inline page module twice with fresh DOM stubs and shared localStorage data. Both renders show truncated text, and saved notes retain their original full text. |

Tests: `NODE_OPTIONS=--max-old-space-size=4096 timeout 600 npm test` exit 0; `git diff --check` exit 0.

Browser validation gap: local HTTP serving was denied with `listen EPERM`; a file-based headless Chrome attempt also failed because socket operations were denied. Reload coverage uses the dependency-free page integration test; no browser screenshot was captured.
