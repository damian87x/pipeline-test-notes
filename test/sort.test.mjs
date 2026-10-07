import test from 'node:test';
import assert from 'node:assert/strict';
import { sortNotes, getSort, setSort } from '../src/sort.js';
import { sortPinned } from '../src/pin.js';

const memory = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)) }; };
const notes = [{ id: 1, createdAt: 100 }, { id: 3, createdAt: 300 }, { id: 2, createdAt: 200 }];

test('newest puts the latest createdAt first', () => {
  assert.deepEqual(sortNotes(notes, 'newest').map((n) => n.id), [3, 2, 1]);
});
test('oldest puts the earliest createdAt first', () => {
  assert.deepEqual(sortNotes(notes, 'oldest').map((n) => n.id), [1, 2, 3]);
});
test('equal createdAt falls back to id', () => {
  const same = [{ id: 1, createdAt: 5 }, { id: 2, createdAt: 5 }];
  assert.deepEqual(sortNotes(same, 'newest').map((n) => n.id), [2, 1]);
  assert.deepEqual(sortNotes(same, 'oldest').map((n) => n.id), [1, 2]);
});
test('sortNotes does not mutate input', () => {
  const copy = JSON.stringify(notes);
  sortNotes(notes, 'newest');
  assert.equal(JSON.stringify(notes), copy);
});
test('pinned notes stay first after sorting (via sortPinned)', () => {
  const mixed = [{ id: 1, createdAt: 100, pinned: true }, { id: 2, createdAt: 200 }, { id: 3, createdAt: 300 }];
  assert.deepEqual(sortPinned(sortNotes(mixed, 'newest')).map((n) => n.id), [1, 3, 2]);
});
test('order defaults to newest, persists, and rejects unknown values', () => {
  const s = memory();
  assert.equal(getSort(s), 'newest');
  setSort(s, 'oldest');
  assert.equal(getSort(s), 'oldest');
  assert.throws(() => setSort(s, 'random'));
  assert.equal(getSort(s), 'oldest');
});
