import test from 'node:test';
import assert from 'node:assert/strict';
import { getTheme, setTheme } from '../src/theme.js';

const memory = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)) }; };

test('defaults to light', () => { assert.equal(getTheme(memory()), 'light'); });
test('set dark then get returns dark', () => {
  const s = memory();
  setTheme(s, 'dark');
  assert.equal(getTheme(s), 'dark');
});
test('set light after dark returns light', () => {
  const s = memory();
  setTheme(s, 'dark'); setTheme(s, 'light');
  assert.equal(getTheme(s), 'light');
});
test('unknown stored value falls back to light', () => {
  const s = memory(); s.setItem('theme.v1', 'purple');
  assert.equal(getTheme(s), 'light');
});
test('setTheme rejects unknown names and keeps the old choice', () => {
  const s = memory();
  setTheme(s, 'dark');
  assert.throws(() => setTheme(s, 'purple'));
  assert.equal(getTheme(s), 'dark');
});
