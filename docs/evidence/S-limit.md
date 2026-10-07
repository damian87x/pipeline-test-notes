# S-limit evidence

| Acceptance box | How verified |
|---|---|
| index.html shows data-id="remaining" next to the input, updated as I type | span data-id="remaining" beside the text input; an input listener sets it to remaining(value, 280) |
| src/limit.js exports remaining(text, max) and canSave(text, max) with unit tests; at least one fails without the change | test/limit.test.mjs written first; before src/limit.js existed `npm test` failed with ERR_MODULE_NOT_FOUND for src/limit.js; after, `timeout 600 npm test` exit 0; boundary tests at 280 (0 left, saves) and 281 (-1, rejected) |
| a note longer than 280 characters cannot be added | submit handler only calls createNote when canSave(input.value, 280) |

Tests: `timeout 600 npm test` exit 0.
