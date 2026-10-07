# S-edit evidence

| Acceptance | How verified |
|---|---|
| src/edit.js exports editNote(storage, id, text) with unit tests in test/edit.test.mjs (at least one fails without the change) | `src/edit.js`; `test/edit.test.mjs` (6 tests: replace text, keep id/createdAt, empty rejected, whitespace rejected, trim, unknown id). RED first: test file written before src/edit.js; `npm test` exited 1 with `ERR_MODULE_NOT_FOUND: Cannot find module .../src/edit.js`. After implementation all pass. |
| index.html shows an Edit button per note that swaps the text for an input and saves on Enter | index.html: `render()` adds `button[data-id=edit]` per note; click sets `editingId` and re-renders with `input[data-id=edit-text]` prefilled; Enter calls `editNote` and re-renders. Browser check (headless Chrome, `ui-check` script against `python3 -m http.server` on the worktree): 2 Edit buttons for 2 notes; input shown with "helo"; typing "hello" + Enter showed "hello" in the list, input removed; localStorage `notes.v1` holds `"hello"` with the original id. Zero page errors. |
| Editing to an empty text is rejected and keeps the old text | Unit: test/edit.test.mjs "editNote with empty text is rejected and keeps the old text" and whitespace variant. Browser: second note edited to `   ` + Enter; list still shows "second"; localStorage unchanged. |

Commands:
- `timeout 600 npm test` -> exit code 0 (26 tests pass, 0 fail, including 6 for editNote).
- Headless UI check (not committed; run from a scratch directory) -> exit code 0, no page errors.
