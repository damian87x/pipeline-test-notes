import test from 'node:test';
import assert from 'node:assert/strict';
import { createNote, listNotes } from '../src/notes.js';
import { togglePin, sortPinned } from '../src/pin.js';

const memory = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)) }; };

test('togglePin pins then unpins and persists in storage', () => {
  const s = memory();
  createNote(s, 'a'); const b = createNote(s, 'b');
  assert.equal(togglePin(s, b.id), true);
  assert.deepEqual(listNotes(s).filter((n) => n.pinned).map((n) => n.id), [b.id]);
  assert.equal(togglePin(s, b.id), false);
  assert.deepEqual(listNotes(s).filter((n) => n.pinned), []);
});
test('togglePin on unknown id changes nothing', () => {
  const s = memory(); createNote(s, 'a');
  assert.equal(togglePin(s, 99), false);
  assert.equal(listNotes(s).some((n) => n.pinned), false);
});
test('pinned state survives a reload (fresh read of same storage)', () => {
  const s = memory(); createNote(s, 'a'); createNote(s, 'b');
  togglePin(s, 2);
  assert.deepEqual(sortPinned(listNotes(s)).map((n) => n.id), [2, 1]);
});
test('sortPinned puts pinned first and keeps relative order', () => {
  const notes = [{ id: 1 }, { id: 2, pinned: true }, { id: 3 }, { id: 4, pinned: true }, { id: 5 }];
  assert.deepEqual(sortPinned(notes).map((n) => n.id), [2, 4, 1, 3, 5]);
});
test('sortPinned does not mutate input and handles none pinned', () => {
  const notes = [{ id: 1 }, { id: 2 }];
  assert.deepEqual(sortPinned(notes).map((n) => n.id), [1, 2]);
  assert.deepEqual(notes.map((n) => n.id), [1, 2]);
});
