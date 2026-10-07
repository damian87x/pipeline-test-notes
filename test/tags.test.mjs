import test from 'node:test';
import assert from 'node:assert/strict';
import { extractTags, filterByTag } from '../src/tags.js';

test('extractTags returns lowercase unique #tags in first-seen order', () => {
  assert.deepEqual(extractTags('Buy milk #Shopping and #home, then #shopping again'), ['shopping', 'home']);
});
test('extractTags ignores text without a hash and bare hash symbols', () => {
  assert.deepEqual(extractTags('no tags here'), []);
  assert.deepEqual(extractTags('price is # 5'), []);
});
test('extractTags accepts digits, underscores and hyphens inside a tag', () => {
  assert.deepEqual(extractTags('#work-2026 #a_b'), ['work-2026', 'a_b']);
});
test('extractTags handles empty and non-string input', () => {
  assert.deepEqual(extractTags(''), []);
  assert.deepEqual(extractTags(undefined), []);
});

const notes = [
  { id: 1, text: 'Buy milk #shopping' },
  { id: 2, text: 'call mom #family' },
  { id: 3, text: 'eggs #Shopping #family' },
];

test('filterByTag keeps notes carrying the tag, case-insensitively', () => {
  assert.deepEqual(filterByTag(notes, 'shopping').map((n) => n.id), [1, 3]);
  assert.deepEqual(filterByTag(notes, '#FAMILY').map((n) => n.id), [2, 3]);
});
test('filterByTag with an empty tag returns every note', () => {
  assert.deepEqual(filterByTag(notes, ''), notes);
  assert.deepEqual(filterByTag(notes, undefined), notes);
});
test('filterByTag with an unknown tag returns empty list', () => {
  assert.deepEqual(filterByTag(notes, 'zzz'), []);
});
