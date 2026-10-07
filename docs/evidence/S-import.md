# S-import evidence

| Acceptance | How verified |
|---|---|
| index.html has a file input data-id="import" accepting .json | `index.html`: `<input data-id="import" type="file" accept=".json,application/json">`. Its change handler reads the file, runs `parseImport`, merges with `mergeImport`, saves to `notes.v1` and re-renders. Parse errors are shown with `alert(err.message)` |
| src/import.js exports parseImport(text) returning an array or throwing a clear error, with unit tests in test/import.test.mjs | `src/import.js`: `parseImport` throws `Import failed: file is not valid JSON`, `Import failed: JSON must be an array of notes`, or `Import failed: every note needs a numeric id and text`. `test/import.test.mjs` covers invalid JSON, non-array, bad entries and a valid array |
| Importing appends to existing notes and does not duplicate ids | `mergeImport(existing, imported)` keeps existing notes, appends imported notes whose id is unseen, and drops repeated ids within the import. Tests "appends new notes after existing ones" and "does not duplicate ids and keeps the existing note" |

RED first: `test/import.test.mjs` was written before `src/import.js` existed. `timeout 600 npm test` exited 1 with `ERR_MODULE_NOT_FOUND` for `src/import.js`. After adding `src/import.js` and the index.html wiring, `timeout 600 npm test` exited 0.

Not verified in a browser: the index.html wiring is covered only by reading the code; the unit tests cover parsing and merging.
