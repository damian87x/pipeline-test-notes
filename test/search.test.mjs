import test from 'node:test';
import assert from 'node:assert/strict';
import { filterNotes } from '../src/search.js';

const notes = [{ id: 1, text: 'Buy Milk' }, { id: 2, text: 'call mom' }, { id: 3, text: 'MILKshake recipe' }];

test('matches case-insensitively', () => {
  assert.deepEqual(filterNotes(notes, 'milk').map((n) => n.id), [1, 3]);
  assert.deepEqual(filterNotes(notes, 'CALL').map((n) => n.id), [2]);
});
test('empty query returns every note', () => {
  assert.deepEqual(filterNotes(notes, ''), notes);
  assert.deepEqual(filterNotes(notes, undefined), notes);
});
test('no match returns empty list', () => { assert.deepEqual(filterNotes(notes, 'zzz'), []); });
