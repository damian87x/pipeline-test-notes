import test from 'node:test';
import assert from 'node:assert/strict';
import { setColor } from '../src/color.js';

const memory = () => {
  const values = new Map();
  return {
    getItem: (key) => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
  };
};

test('setColor assigns the selected color to the matching note', () => {
  const notes = [{ id: 1, text: 'remember this' }];
  assert.equal(setColor(notes, 1, 'red'), true);
  assert.equal(notes[0].color, 'red');
});

test('setColor accepts none and each supported color', () => {
  for (const color of ['none', 'red', 'green', 'blue']) {
    const notes = [{ id: 1 }];
    assert.equal(setColor(notes, 1, color), true);
    assert.equal(notes[0].color, color);
  }
});

test('setColor rejects unknown colors without changing the note', () => {
  const notes = [{ id: 1, color: 'green' }];
  assert.throws(() => setColor(notes, 1, 'purple'), /unknown color/);
  assert.equal(notes[0].color, 'green');
});

test('setColor leaves an unknown note unchanged', () => {
  const notes = [{ id: 1, color: 'blue' }];
  assert.equal(setColor(notes, 2, 'red'), false);
  assert.equal(notes[0].color, 'blue');
});

test('selected color persists when notes are reloaded from storage', () => {
  const storage = memory();
  storage.setItem('notes.v1', JSON.stringify([{ id: 1, text: 'remember this' }]));
  const notes = JSON.parse(storage.getItem('notes.v1'));
  setColor(notes, 1, 'blue');
  storage.setItem('notes.v1', JSON.stringify(notes));
  assert.equal(JSON.parse(storage.getItem('notes.v1'))[0].color, 'blue');
});
