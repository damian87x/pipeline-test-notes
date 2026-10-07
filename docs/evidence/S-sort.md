# S-sort evidence

| Acceptance box | How verified |
|---|---|
| index.html has a select with data-id="sort" with options newest and oldest | `<select data-id="sort">` added to `<header>` with `<option value="newest">` and `<option value="oldest">`. Checked by reading the diff. |
| `src/sort.js` exports sortNotes(notes, order), unit tested, a test fails without the change | `test/sort.test.mjs` (6 tests: both orders, id tie-break, no input mutation, pinned stay first via sortPinned, persisted order). Run before src/sort.js existed: `timeout 600 npm test` exit 1 (module not found). After: exit 0. |
| The chosen order is persisted across a reload | `change` handler calls `setSort(localStorage, ...)` (key `sort.v1`); on load `sortSel.value = getSort(localStorage)` restores it, and render sorts with it. Round trip covered by the persistence unit test. |
