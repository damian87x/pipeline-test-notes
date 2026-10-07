# S-undo evidence

| Acceptance | How verified |
|---|---|
| src/undo.js exports startUndo(onTick, onExpire) that calls onTick with 3, 2, 1, 0 once per second | `src/undo.js`; test/undo.test.mjs "onTick is called with 3,2,1,0 once per second, then onExpire" uses mocked setInterval and asserts the exact tick list after each 1000 ms step, and that onExpire fires only after the 0 tick |
| test/undo.test.mjs waits one real second and asserts the countdown went from 3 to 2 | test "countdown goes from 3 to 2 after one real second": real `setTimeout` of 1200 ms, then asserts ticks[0] === 3 and ticks[1] === 2, then cancels the timer. Margin of 200 ms keeps it off tight timing |
| index.html shows the toast with an Undo button; pressing it restores the note | `index.html`: `[data-id=toast]` with `[data-id=undo]`. Delete now hides the note and starts startUndo; Undo cancels the countdown and re-renders, so the note reappears. Expiry runs deleteNote and hides the toast. A second delete during a countdown commits the first one |
| Cancel is needed so Undo stops the timer | test "cancel stops the countdown and onExpire never fires" |

RED first: test/undo.test.mjs was written before src/undo.js existed. `timeout 600 npm test` exited 1 with `ERR_MODULE_NOT_FOUND` for src/undo.js. After the change the suite passes.

Stability: `timeout 600 npm test` run 3 times, each exit 0, 23 pass, 0 fail.

Headless browser check (google-chrome via Playwright, served over http): Edit saves "alpha edited"; delete shows the toast and hides the note; Undo restores it and hides the toast; a 4.3 s wait deletes the note and hides the toast; Edit then Delete on the same note raises no page error.

Rebased onto main after PR #17 (S-edit). Suite re-run after rebase: 3 runs, exit 0, 29 pass each.
