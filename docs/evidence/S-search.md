# S-search evidence

| Acceptance | How verified |
|---|---|
| `<header>` has `input[data-id="search"]`; typing hides non-matching notes, case-insensitive | Input added inside `<header>` in index.html; its `input` event re-renders the list through `filterNotes`. Case-insensitivity: test "matches case-insensitively" in test/search.test.mjs. |
| `src/search.js` exports `filterNotes(notes, query)` with unit tests; one fails without the change | test/search.test.mjs written first; `timeout 600 npm test` failed before src/search.js existed (module not found, 1 failing file), passes after. |
| Empty query shows every note | Test "empty query returns every note" (`''` and `undefined`). |

Final run: `timeout 600 npm test` exit code 0 (7 pass, 0 fail).
