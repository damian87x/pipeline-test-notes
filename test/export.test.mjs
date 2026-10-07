import test from 'node:test';
import assert from 'node:assert/strict';
import { toJson } from '../src/export.js';

const notes = [
  { id: 1, text: 'alpha #work', createdAt: 1700000000000 },
  { id: 2, text: 'beta', createdAt: 1700000001000, pinned: true },
];

test('toJson of no notes is an empty array', () => {
  assert.equal(toJson([]), '[]');
});

test('toJson of missing notes is an empty array', () => {
  assert.equal(toJson(undefined), '[]');
});

test('toJson round-trips the notes through JSON.parse', () => {
  assert.deepEqual(JSON.parse(toJson(notes)), notes);
});
