import test from 'node:test';
import assert from 'node:assert/strict';
import { parseImport, mergeImport } from '../src/import.js';

const a = { id: 1, text: 'alpha', createdAt: 1 };
const b = { id: 2, text: 'beta', createdAt: 2 };

test('parseImport rejects invalid JSON with a clear error', () => {
  assert.throws(() => parseImport('{not json'), /not valid JSON/);
});

test('parseImport rejects a non-array', () => {
  assert.throws(() => parseImport('{"id":1}'), /must be an array/);
});

test('parseImport rejects entries that are not notes', () => {
  assert.throws(() => parseImport('[{"text":"x"}]'), /id and text/);
});

test('parseImport returns a valid array', () => {
  assert.deepEqual(parseImport(JSON.stringify([a, b])), [a, b]);
});

test('mergeImport appends new notes after existing ones', () => {
  assert.deepEqual(mergeImport([a], [b]), [a, b]);
});

test('mergeImport does not duplicate ids and keeps the existing note', () => {
  const dup = { id: 1, text: 'changed', createdAt: 9 };
  assert.deepEqual(mergeImport([a], [dup, b, b]), [a, b]);
});
