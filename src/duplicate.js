export function duplicateNote(notes, id) {
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) return notes;

  const source = notes[index];
  const newId = notes.length ? Math.max(...notes.map((note) => note.id)) + 1 : 1;
  const copy = { ...source, id: newId, createdAt: Date.now() };
  return [...notes.slice(0, index + 1), copy, ...notes.slice(index + 1)];
}
