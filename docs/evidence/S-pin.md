# S-pin evidence

| Acceptance box | How verified |
|---|---|
| src/pin.js exports togglePin(storage, id) and sortPinned(notes) with unit tests; at least one fails without the change | test/pin.test.mjs written first; before src/pin.js existed `npm test` failed with ERR_MODULE_NOT_FOUND for src/pin.js; after, `timeout 600 npm test` exit 0 |
| pinned notes listed first, relative order kept | test "sortPinned puts pinned first and keeps relative order" ([1,2p,3,4p,5] -> [2,4,1,3,5]); index.html render uses sortPinned after filterNotes |
| pinned state survives a reload | pinned flag is stored on the note in localStorage key notes.v1; test re-reads the same storage via listNotes and sorts |

Tests: `timeout 600 npm test` exit 0.
