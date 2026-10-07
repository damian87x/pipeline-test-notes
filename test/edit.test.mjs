import test from 'node:test';
import assert from 'node:assert/strict';
import { createNote, listNotes } from '../src/notes.js';
import { editNote } from '../src/edit.js';

const memory = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)) }; };

test('editNote replaces the text of the note with that id', () => {
  const s = memory();
  const a = createNote(s, 'helo');
  createNote(s, 'other');
  assert.equal(editNote(s, a.id, 'hello'), true);
  assert.deepEqual(listNotes(s).map((n) => n.text), ['hello', 'other']);
});
test('editNote keeps the id and other fields of the edited note', () => {
  const s = memory();
  const a = createNote(s, 'x');
  editNote(s, a.id, 'y');
  const [n] = listNotes(s);
  assert.equal(n.id, a.id);
  assert.equal(n.createdAt, a.createdAt);
});
test('editNote with empty text is rejected and keeps the old text', () => {
  const s = memory();
  const a = createNote(s, 'keep me');
  assert.equal(editNote(s, a.id, ''), false);
  assert.deepEqual(listNotes(s).map((n) => n.text), ['keep me']);
});
test('editNote with whitespace-only text is rejected and keeps the old text', () => {
  const s = memory();
  const a = createNote(s, 'keep me');
  assert.equal(editNote(s, a.id, '   '), false);
  assert.deepEqual(listNotes(s).map((n) => n.text), ['keep me']);
});
test('editNote trims surrounding whitespace before saving', () => {
  const s = memory();
  const a = createNote(s, 'x');
  editNote(s, a.id, '  padded  ');
  assert.deepEqual(listNotes(s).map((n) => n.text), ['padded']);
});
test('editNote with unknown id leaves notes unchanged', () => {
  const s = memory();
  createNote(s, 'a');
  assert.equal(editNote(s, 99, 'b'), false);
  assert.deepEqual(listNotes(s).map((n) => n.text), ['a']);
});
