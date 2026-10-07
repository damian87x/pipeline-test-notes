# S-tags evidence

| Acceptance box | How verified |
|---|---|
| src/tags.js exports extractTags(text) and filterByTag(notes, tag) with unit tests in test/tags.test.mjs; at least one fails without the change | test/tags.test.mjs written first. Before src/tags.js existed, `timeout 600 npm test` exited 1 with `ERR_MODULE_NOT_FOUND ... src/tags.js`. After adding it, `timeout 600 npm test` exits 0 (27 pass, 0 fail). |
| index.html shows each tag as a clickable chip that filters the list | Headless Chromium (playwright, served by python http.server) with localStorage notes: chips `#shopping` and `#family` rendered; clicking `#shopping` left only the two notes carrying that tag (case-insensitive: `#Shopping` matched). No page errors. |
| a second click on the active chip clears the filter | Same run: second click on `#shopping` set `aria-pressed=false` and restored all 3 notes. |

Tests: `timeout 600 npm test` exit 0.
