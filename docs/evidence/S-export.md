# S-export evidence

| Acceptance | How verified |
|---|---|
| index.html has a button with data-id="export" that downloads notes.json | `index.html`: `<button data-id="export">Export notes.json</button>`. Its click handler builds a Blob from `toJson(listNotes(localStorage))`, and an `<a download="notes.json">` click triggers the download. Headless check below saw suggested filename `notes.json` |
| src/export.js exports toJson(notes) with unit tests in test/export.test.mjs | `src/export.js`: `toJson(notes)` returns `JSON.stringify(notes ?? [], null, 2)`. `test/export.test.mjs` has three tests (empty array, missing notes, round-trip through JSON.parse) |
| With no notes the file contains an empty array | test "toJson of no notes is an empty array" asserts `toJson([]) === '[]'`. Headless check: first export on empty storage read back as `[]` |

RED first: `src/export.js` was first a stub returning `'stub'`, with the tests written against it. `timeout 600 npm test` exited 1. The two empty-array tests failed with `AssertionError`, `actual: 'stub'`, `expected: '[]'`, and the round-trip test failed on `JSON.parse('stub')`. The module existed, so this was an assertion failure, not a missing module. The real implementation replaced the stub after that.

Headless browser check (google-chrome via Playwright, served over http at 127.0.0.1): first export on empty storage downloads `notes.json` containing `[]`. Then add "alpha #work" and "beta", edit the first to "alpha #work edited", filter by the #work tag (1 note shown) and toggle it off (2 shown), delete the second note (toast shown), Undo (note restored, toast hidden), export again: `notes.json` parses as a 2-element array with the edited text. Theme toggle still switches to dark. No page errors.
