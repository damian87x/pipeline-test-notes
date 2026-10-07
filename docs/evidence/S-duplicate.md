# S-duplicate evidence

| Acceptance | How verified |
|---|---|
| Each note exposes a Duplicate button and selecting it creates a same-text copy immediately after the source | `index.html` renders a Duplicate button and its click handler saves the result and places the new list item after the source. `src/duplicate.js` gives the copy a fresh id and current `createdAt`. |
| Unknown note ids leave the list unchanged | `test/duplicate.test.mjs`: `duplicateNote returns the original list unchanged for an unknown id`. |
| Duplication helper behavior is covered by unit tests | `test/duplicate.test.mjs`: `duplicateNote inserts a same-text copy immediately after its source with a fresh id` and the unknown-id test. |

Unit-test path/command: `test/duplicate.test.mjs`; `timeout 600 npm test`.

QA screenshot: ![Story 30 duplicate-note QA screenshot](https://raw.githubusercontent.com/damian87x/pipeline-test-notes/qa-30/docs/qa/story-30-duplicate.png)
