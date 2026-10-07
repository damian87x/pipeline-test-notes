# S-delete evidence

| Acceptance | How verified |
|---|---|
| src/delete.js exports deleteNote(storage, id) and renderDeleteButton(note) returning an HTML string | `src/delete.js`; test/delete.test.mjs "deleteNote removes only the note with that id", "unknown id leaves notes unchanged" (storage round trip via listNotes) |
| Button carries aria-label="Delete note", asserted in test | test/delete.test.mjs "delete button carries aria-label=\"Delete note\"" asserts `html.includes('aria-label="Delete note"')`. RED first: before src/delete.js existed the file failed (module not found); after, 7/7 pass |
| index.html shows button on every note; click removes and re-renders | index.html `render()` appends renderDeleteButton(n) to each li; delegated click handler calls deleteNote(localStorage, id) then render() |

Command: `timeout 600 npm test` -> exit code 0 (7 tests pass).
