import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { wordCount } from '../src/words.js';
import { createNote, listNotes } from '../src/notes.js';

test('wordCount returns zero for no notes or blank text', () => {
  assert.equal(wordCount([]), 0);
  assert.equal(wordCount([{ text: '' }, { text: ' \t\n ' }]), 0);
});

test('wordCount totals words across all notes', () => {
  assert.equal(wordCount([{ text: 'Buy milk' }, { text: 'Call mom today' }]), 5);
  assert.equal(wordCount([{ text: 'hello' }]), 1);
});

test('wordCount separates words by whitespace and ignores surrounding whitespace', () => {
  assert.equal(wordCount([{ text: '  one\ttwo\nthree\r\nfour  five\u00a0six  ' }]), 6);
});

test('wordCount keeps punctuation and hyphens within words', () => {
  assert.equal(wordCount([{ text: "Hello, world! It's a well-written note." }]), 6);
});

test('wordCount recalculates from notes read back from storage', () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  createNote(storage, 'First saved note');
  createNote(storage, 'Another note');
  assert.equal(wordCount(listNotes(storage)), 5);
  const reloadedStorage = { getItem: (key) => values.get(key) ?? null };
  assert.equal(wordCount(listNotes(reloadedStorage)), 5);
});

test('page footer updates for saved notes, ignores search filtering, and survives reload', async () => {
  const htmlUrl = new URL('../index.html', import.meta.url);
  const html = await readFile(htmlUrl, 'utf8');
  assert.match(html, /<footer>[\s\S]*data-id="words"[\s\S]*<\/footer>/);
  const script = html.match(/<script type="module">([\s\S]*?)<\/script>/)[1]
    .replace(/import\s+\{([^}]+)\}\s+from\s+'([^']+)';/g,
      (_, names, path) => `const {${names}} = await import(${JSON.stringify(new URL(path, htmlUrl).href)});`);
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  const loadPage = async () => {
    const makeElement = () => ({
      dataset: {}, value: '', textContent: '', listeners: {},
      addEventListener(event, callback) { this.listeners[event] = callback; },
      append() {}, setAttribute() {}, insertAdjacentHTML() {},
    });
    const elements = new Map();
    const document = {
      documentElement: makeElement(),
      createElement: makeElement,
      querySelector(selector) {
        if (!elements.has(selector)) elements.set(selector, makeElement());
        return elements.get(selector);
      },
    };
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    await new AsyncFunction('document', 'localStorage', script)(document, storage);
    return (id) => document.querySelector(`[data-id=${id}]`);
  };
  const page = await loadPage();
  assert.equal(page('words').textContent, '0 words');
  page('text').value = 'First saved note';
  page('form').listeners.submit({ preventDefault() {} });
  assert.equal(page('words').textContent, '3 words');
  page('text').value = 'Another note';
  page('form').listeners.submit({ preventDefault() {} });
  assert.equal(page('words').textContent, '5 words');
  page('search').value = 'no matching notes';
  page('search').listeners.input();
  assert.equal(page('words').textContent, '5 words');
  const reloadedPage = await loadPage();
  assert.equal(reloadedPage('words').textContent, '5 words');
});
