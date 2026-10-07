import { listNotes } from './notes.js';

const KEY = 'notes.v1';

export function deleteNote(storage, id) {
  const notes = listNotes(storage).filter((n) => n.id !== id);
  storage.setItem(KEY, JSON.stringify(notes));
}

export function renderDeleteButton(note) {
  return `<button type="button" data-id="delete" data-note-id="${Number(note.id)}" aria-label="Delete note">Delete</button>`;
}
