import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyMessage } from '../src/emptystate.js';

test('emptyMessage describes an empty notes list', () => {
  assert.equal(emptyMessage([]), 'No notes yet');
});

test('emptyMessage disappears as soon as a note exists', () => {
  assert.equal(emptyMessage([{ id: 1, text: 'hello' }]), '');
});
