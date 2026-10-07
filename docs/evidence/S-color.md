# S-color evidence

| Acceptance box | How verified |
|---|---|
| Choose a color for a note | Each note has an accessible color selector (`none`, `red`, `green`, or `blue`) in `index.html`. On change, the handler applies the value with `setColor` from `src/color.js`. |
| The selected color is visible | Rendering sets the note row's `data-color` attribute; CSS gives red, green, and blue rows distinct backgrounds in both light and dark themes. `none` uses the default background. |
| The choice persists after reload | The change handler saves the updated note list under `notes.v1` in `localStorage`. `listNotes` reads that same key when the app initializes, and rendering reapplies the stored color. The unit test verifies color survives serialization to and reload from storage. |
| Unit test | `test/color.test.mjs` covers supported and rejected colors, missing notes, and persistence through storage serialization. Run with `timeout 600 npm test` (exit code 0). |
| QA screenshot | ![S-color QA screenshot](https://raw.githubusercontent.com/damian87x/pipeline-test-notes/qa-32/qa-32-color-persist.png) |
