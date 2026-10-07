# S-theme evidence

| Acceptance box | How verified |
|---|---|
| `<header>` has `button[data-id=theme]` switching light/dark colours | Button added inside `<header>` in index.html; click handler flips `data-theme` on `<html>`, CSS `:root[data-theme=dark]` changes background/text colours. Checked by reading the diff. |
| `src/theme.js` exports getTheme/setTheme, unit tested, a test fails without the change | `test/theme.test.mjs` (5 tests). Run before src/theme.js existed: suite failed (module not found). After: `timeout 600 npm test` exit 0. |
| Choice applied on load before first paint of the list | Blocking classic `<script>` in `<head>` sets `data-theme` from storage key `theme.v1` before `<body>` is parsed, so before the list renders (list render is in the later module script). |
