import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { truncateNote } from '../src/truncate.js';
import { createNote, listNotes } from '../src/notes.js';

test('keeps empty and short notes unchanged', () => {
  assert.equal(truncateNote('', 100), '');
  assert.equal(truncateNote('A short note', 100), 'A short note');
});

test('keeps notes exactly at the limit unchanged', () => {
  assert.equal(truncateNote('a'.repeat(100), 100), 'a'.repeat(100));
});

test('shows the first 100 characters and an ellipsis for longer notes', () => {
  assert.equal(truncateNote('a'.repeat(100) + 'b', 100), 'a'.repeat(100) + '…');
  assert.equal(truncateNote('a'.repeat(280), 100), 'a'.repeat(100) + '…');
});

test('uses the supplied maximum', () => {
  assert.equal(truncateNote('abcdef', 3), 'abc…');
  assert.equal(truncateNote('abc', 0), '…');
});

test('the page truncates saved notes on initial render and reload', async () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
  };
  const texts = ['Short note', 'b'.repeat(100), 'a'.repeat(100) + ' full text remains saved'];
  for (const text of texts) createNote(storage, text);
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const script = html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
  const bindings = {};
  for (const match of script.matchAll(/import \{([^}]+)\} from '([^']+)';/g)) {
    const module = await import(new URL('../' + match[2], import.meta.url));
    for (const name of match[1].split(',').map((name) => name.trim())) bindings[name] = module[name];
  }
  const executable = script.replace(/^\s*import .*;$/gm, '');
  const element = () => ({
    dataset: {}, children: [], value: '', textContent: '',
    set innerHTML(value) { this.children = []; },
    append(...children) { this.children.push(...children); },
    setAttribute() {}, addEventListener() {}, insertAdjacentHTML() {},
  });
  const loadPage = () => {
    const elements = new Map();
    const document = {
      documentElement: element(),
      createElement: element,
      querySelector(selector) {
        if (!elements.has(selector)) elements.set(selector, element());
        return elements.get(selector);
      },
    };
    runInNewContext(executable, { ...bindings, document, localStorage: storage });
    return elements.get('[data-id=list]').children.map((li) =>
      li.children.find((child) => child.dataset?.id === 'note-text')?.textContent);
  };
  const expected = ['a'.repeat(100) + '…', texts[1], texts[0]];
  assert.deepEqual(loadPage(), expected);
  assert.deepEqual(loadPage(), expected);
  assert.deepEqual(listNotes(storage).map((note) => note.text), texts);
});
