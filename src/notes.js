const KEY = 'notes.v1';

export function listNotes(storage) {
  try {
    const parsed = JSON.parse(storage.getItem(KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function createNote(storage, text) {
  const notes = listNotes(storage);
  const note = { id: notes.length ? Math.max(...notes.map((n) => n.id)) + 1 : 1, text: String(text), createdAt: Date.now() };
  notes.push(note);
  storage.setItem(KEY, JSON.stringify(notes));
  return note;
}
