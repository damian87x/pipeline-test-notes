import { listNotes, KEY } from './notes.js';

export function editNote(storage, id, text) {
  const next = String(text).trim();
  if (!next) return false;
  const notes = listNotes(storage);
  const note = notes.find((n) => n.id === id);
  if (!note) return false;
  note.text = next;
  storage.setItem(KEY, JSON.stringify(notes));
  return true;
}
