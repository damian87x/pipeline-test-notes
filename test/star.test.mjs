import test from 'node:test';
import assert from 'node:assert/strict';
import { filterStarred, toggleStar } from '../src/star.js';
import { KEY, createNote, listNotes } from '../src/notes.js';
import { filterNotes } from '../src/search.js';
import { filterByTag } from '../src/tags.js';

const memory = () => {
  const values = new Map();
  return {
    getItem: (key) => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
  };
};

const notes = [
  { id: 1, text: 'Milk #shopping', starred: true },
  { id: 2, text: 'Milk #shopping', starred: false },
  { id: 3, text: 'Call #family' },
  { id: 4, text: 'Eggs #shopping', starred: true },
];

test('filterStarred shows only starred notes when on, preserving order', () => {
  assert.deepEqual(filterStarred(notes, true).map((note) => note.id), [1, 4]);
});

test('filterStarred returns all notes when off, including legacy notes', () => {
  assert.deepEqual(filterStarred(notes, false), notes);
});

test('filterStarred handles empty lists and lists without stars', () => {
  assert.deepEqual(filterStarred([], true), []);
  assert.deepEqual(filterStarred([], false), []);
  assert.deepEqual(filterStarred(notes.slice(1, 3), true), []);
});

test('filterStarred does not mutate notes or their star state', () => {
  const input = Object.freeze(notes.map((note) => Object.freeze({ ...note })));
  filterStarred(input, true);
  filterStarred(input, false);
  assert.deepEqual(input, notes);
});

test('star filter composes with search and tag filters', () => {
  assert.deepEqual(filterStarred(filterByTag(filterNotes(notes, 'milk'), 'shopping'), true).map((note) => note.id), [1]);
  assert.deepEqual(filterStarred(filterByTag(notes, 'family'), true), []);
});

test('toggleStar stars and unstars a note, surviving fresh storage reads', () => {
  const storage = memory();
  const first = createNote(storage, 'Important');
  createNote(storage, 'Ordinary');
  assert.equal(toggleStar(storage, first.id), true);
  assert.deepEqual(filterStarred(listNotes(storage), true).map((note) => note.id), [first.id]);
  assert.equal(toggleStar(storage, first.id), false);
  assert.deepEqual(filterStarred(listNotes(storage), true), []);
  assert.equal(listNotes(storage)[1].starred, undefined);
});

test('toggleStar on an unknown note leaves storage unchanged', () => {
  const storage = memory();
  createNote(storage, 'Ordinary');
  const before = storage.getItem(KEY);
  assert.equal(toggleStar(storage, 99), false);
  assert.equal(storage.getItem(KEY), before);
});
