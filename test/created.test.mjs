import test from 'node:test';
import assert from 'node:assert/strict';
import { formatCreated } from '../src/created.js';

test('formats a timestamp as YYYY-MM-DD', () => {
  assert.equal(formatCreated(Date.UTC(2024, 0, 9, 23, 45)), '2024-01-09');
});

test('returns no date for an invalid timestamp', () => {
  assert.equal(formatCreated('not a timestamp'), '');
  assert.equal(formatCreated(Number.NaN), '');
});
