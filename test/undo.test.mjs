import test from 'node:test';
import assert from 'node:assert/strict';
import { startUndo } from '../src/undo.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('countdown goes from 3 to 2 after one real second', async () => {
  const ticks = [];
  const cancel = startUndo((n) => ticks.push(n), () => {});
  await sleep(1200);
  cancel();
  assert.equal(ticks[0], 3);
  assert.equal(ticks[1], 2);
});

test('onTick is called with 3,2,1,0 once per second, then onExpire', (t) => {
  t.mock.timers.enable({ apis: ['setInterval'] });
  const ticks = [];
  let expired = 0;
  startUndo((n) => ticks.push(n), () => { expired += 1; });
  assert.deepEqual(ticks, [3]);
  t.mock.timers.tick(1000);
  assert.deepEqual(ticks, [3, 2]);
  t.mock.timers.tick(1000);
  assert.deepEqual(ticks, [3, 2, 1]);
  t.mock.timers.tick(1000);
  assert.deepEqual(ticks, [3, 2, 1, 0]);
  assert.equal(expired, 0);
  t.mock.timers.tick(1000);
  assert.equal(expired, 1);
  assert.deepEqual(ticks, [3, 2, 1, 0]);
});

test('cancel stops the countdown and onExpire never fires', (t) => {
  t.mock.timers.enable({ apis: ['setInterval'] });
  const ticks = [];
  let expired = 0;
  const cancel = startUndo((n) => ticks.push(n), () => { expired += 1; });
  t.mock.timers.tick(1000);
  cancel();
  t.mock.timers.tick(5000);
  assert.deepEqual(ticks, [3, 2]);
  assert.equal(expired, 0);
});
