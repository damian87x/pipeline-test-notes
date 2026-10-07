import test from 'node:test';
import assert from 'node:assert/strict';
import { createNote, listNotes } from '../src/notes.js';
import { deleteNote, renderDeleteButton } from '../src/delete.js';

const memory = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)) }; };

test('delete button carries aria-label="Delete note"', () => {
  const html = renderDeleteButton({ id: 1, text: 'x' });
  assert.ok(html.includes('aria-label="Delete note"'));
});
test('deleteNote removes only the note with that id', () => {
  const s = memory();
  const a = createNote(s, 'a');
  createNote(s, 'b');
  deleteNote(s, a.id);
  assert.deepEqual(listNotes(s).map((n) => n.text), ['b']);
});
test('deleteNote with unknown id leaves notes unchanged', () => {
  const s = memory();
  createNote(s, 'a');
  deleteNote(s, 99);
  assert.deepEqual(listNotes(s).map((n) => n.text), ['a']);
});
