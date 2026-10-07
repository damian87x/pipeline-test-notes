# Agents

This repo is run under the hard rules in /home/damian-linux/workspace/billioner-coder/docs/contracts/hard-rules.md.
Stage branch: main. The only merge path is `node /home/damian-linux/workspace/billioner-coder/apps/merge-gate/bin/merge-gate.mjs merge --repo damian87x/pipeline-test-notes --pr <n> --stage main`.
Every story PR: `Closes #n`, a `## Tests` section with commands and exit codes, a test that fails without the change.
Reviews: three Sonnet 5.5 review comments, each starting `Review k/3`, naming the head SHA (7 chars), ending `Verdict: PASS` or `Verdict: FAIL` with findings as file:line.
QA: a comment on the story issue starting `QA report`, with a headless screenshot of the running app (`![...](url)`) and a Lavish page link.
Never pass DOM nodes to assert.equal. Run suites with `timeout 600`.
