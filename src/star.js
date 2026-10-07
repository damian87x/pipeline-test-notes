import { KEY, listNotes } from './notes.js';

export function filterStarred(notes, on) {
  return on ? notes.filter((note) => note.starred) : notes;
}

export function toggleStar(storage, id) {
  const notes = listNotes(storage);
  const note = notes.find((note) => note.id === id);
  if (!note) return false;
  note.starred = !note.starred;
  storage.setItem(KEY, JSON.stringify(notes));
  return note.starred;
}
