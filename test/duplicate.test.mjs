import test from 'node:test';
import assert from 'node:assert/strict';
import { duplicateNote } from '../src/duplicate.js';

test('duplicateNote inserts a same-text copy immediately after its source with a fresh id', () => {
  const notes = [
    { id: 1, text: 'first', createdAt: 10 },
    { id: 4, text: 'second', createdAt: 20 },
    { id: 8, text: 'third', createdAt: 30 },
  ];
  const result = duplicateNote(notes, 4);

  assert.deepEqual(result.map(({ id, text }) => ({ id, text })), [
    { id: 1, text: 'first' },
    { id: 4, text: 'second' },
    { id: 9, text: 'second' },
    { id: 8, text: 'third' },
  ]);
  assert.notEqual(result[2], notes[1]);
  assert.notEqual(result[2].createdAt, undefined);
  assert.deepEqual(notes.map((note) => note.id), [1, 4, 8]);
});

test('duplicateNote returns the original list unchanged for an unknown id', () => {
  const notes = [{ id: 1, text: 'first', createdAt: 10 }];
  assert.equal(duplicateNote(notes, 99), notes);
});
