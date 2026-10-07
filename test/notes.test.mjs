import test from 'node:test';
import assert from 'node:assert/strict';
import { createNote, listNotes } from '../src/notes.js';

const memory = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)) }; };

test('starts empty', () => { assert.deepEqual(listNotes(memory()), []); });
test('create then list returns the note', () => {
  const s = memory();
  const n = createNote(s, 'hello');
  assert.equal(n.text, 'hello');
  assert.deepEqual(listNotes(s).map((x) => x.text), ['hello']);
});
test('ids increase', () => {
  const s = memory();
  createNote(s, 'a');
  assert.equal(createNote(s, 'b').id, 2);
});
test('corrupt storage lists as empty', () => {
  const s = memory(); s.setItem('notes.v1', '{not json');
  assert.deepEqual(listNotes(s), []);
});
