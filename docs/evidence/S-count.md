# S-count evidence

| Acceptance box | How verified |
|---|---|
| index.html has a footer with data-id="count" reading "1 note" or "N notes" | `<footer><p data-id="count">` in index.html; text comes from countText(notes.length) in render |
| src/count.js exports countText(n) with unit tests; at least one fails without the change | test/count.test.mjs (0, 1, 2, 12) written first; before src/count.js existed `node --test test/count.test.mjs` exited non-zero with ERR_MODULE_NOT_FOUND; after, `timeout 600 npm test` exit 0 |
| the line updates when a note is added | render() sets the footer text on every call and the add-form submit handler calls render() |

Tests: `timeout 600 npm test` exit 0.
