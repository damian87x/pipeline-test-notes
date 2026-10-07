import test from 'node:test';
import assert from 'node:assert/strict';
import { remaining, canSave } from '../src/limit.js';

test('remaining counts down from max', () => {
  assert.equal(remaining('', 280), 280);
  assert.equal(remaining('abc', 280), 277);
});
test('boundary: 280 characters leaves 0 and can save', () => {
  const t = 'a'.repeat(280);
  assert.equal(remaining(t, 280), 0);
  assert.equal(canSave(t, 280), true);
});
test('boundary: 281 characters is -1 and cannot save', () => {
  const t = 'a'.repeat(281);
  assert.equal(remaining(t, 280), -1);
  assert.equal(canSave(t, 280), false);
});
test('canSave is true for short text', () => {
  assert.equal(canSave('hi', 280), true);
});
