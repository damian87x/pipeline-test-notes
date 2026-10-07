# S-created evidence

| Acceptance box | How verified |
|---|---|
| Notes display creation dates in `data-id="created"` elements as `YYYY-MM-DD` | `index.html` renders the `createdAt` timestamp through `formatCreated` for each note. Missing or invalid timestamps produce an empty date, preserving legacy notes. |
| `src/created.js` exports `formatCreated(timestamp)` with tests, including invalid input | `test/created.test.mjs` covers a formatted UTC timestamp and invalid values. |

Tests: `timeout 600 npm test` exit 0; `git diff --check` exit 0.
