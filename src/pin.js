import { KEY, listNotes } from './notes.js';

export function togglePin(storage, id) {
  const notes = listNotes(storage);
  const note = notes.find((n) => n.id === id);
  if (!note) return false;
  note.pinned = !note.pinned;
  storage.setItem(KEY, JSON.stringify(notes));
  return note.pinned;
}

export function sortPinned(notes) {
  return [...notes.filter((n) => n.pinned), ...notes.filter((n) => !n.pinned)];
}
