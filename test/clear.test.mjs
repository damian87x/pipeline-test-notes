import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { shouldClear } from '../src/clear.js';
import { KEY, createNote, listNotes } from '../src/notes.js';

const notes = [{ id: 1, text: 'first' }, { id: 2, text: 'second' }];

test('shouldClear allows clearing a nonempty list after confirmation', () => {
  assert.equal(shouldClear(true, notes), true);
});

test('shouldClear rejects a cancelled confirmation', () => {
  assert.equal(shouldClear(false, notes), false);
});

test('shouldClear does nothing for an empty list', () => {
  assert.equal(shouldClear(true, []), false);
  assert.equal(shouldClear(false, []), false);
});

test('shouldClear leaves the notes unchanged for either decision', () => {
  const original = structuredClone(notes);
  shouldClear(true, notes);
  shouldClear(false, notes);
  assert.deepEqual(notes, original);
});

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const handlerSource = html.match(/document\.querySelector\('\[data-id=clear-all\]'\)\.addEventListener\('click', \(\) => \{[\s\S]*?\n  \}\);/)?.[0];

function clearApp(confirmed) {
  const values = new Map();
  const localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  createNote(localStorage, 'first');
  createNote(localStorage, 'second');
  let click;
  let confirmations = 0;
  let cancelled = 0;
  let renders = 0;
  const context = {
    document: { querySelector: () => ({ addEventListener: (event, handler) => { assert.equal(event, 'click'); click = handler; } }) },
    confirm: (message) => {
      assert.equal(message, 'Clear all notes?');
      assert.equal(listNotes(localStorage).length, 2, 'notes must exist when confirmation is requested');
      confirmations += 1;
      return confirmed;
    },
    shouldClear, listNotes, localStorage, KEY,
    pending: { id: 1, cancel: () => { cancelled += 1; } },
    toast: { hidden: false }, editingId: 2,
    render: () => { renders += 1; },
  };
  assert.match(html, /<button\b[^>]*data-id="clear-all"[^>]*>Clear all<\/button>/);
  assert.equal(typeof handlerSource, 'string', 'Clear all must have a click handler');
  runInNewContext(handlerSource, context);
  click();
  return { context, values, confirmations, cancelled, renders };
}

test('Clear all confirms, persists an empty list for reload, and cancels pending undo', () => {
  const { context, values, confirmations, cancelled, renders } = clearApp(true);
  assert.equal(confirmations, 1);
  assert.equal(values.get(KEY), '[]');
  const reloadedStorage = { getItem: (key) => values.get(key) ?? null };
  assert.deepEqual(listNotes(reloadedStorage), []);
  assert.equal(cancelled, 1);
  assert.equal(context.pending, null);
  assert.equal(context.toast.hidden, true);
  assert.equal(context.editingId, null);
  assert.equal(renders, 1);
});

test('cancelling Clear all preserves saved notes and pending edit/undo state', () => {
  const { context, values, confirmations, cancelled, renders } = clearApp(false);
  assert.equal(confirmations, 1);
  const reloadedStorage = { getItem: (key) => values.get(key) ?? null };
  assert.deepEqual(listNotes(reloadedStorage).map(note => note.text), ['first', 'second']);
  assert.equal(cancelled, 0);
  assert.equal(context.pending.id, 1);
  assert.equal(context.toast.hidden, false);
  assert.equal(context.editingId, 2);
  assert.equal(renders, 0);
});
