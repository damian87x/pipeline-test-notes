export function filterNotes(notes, query) {
  const q = String(query ?? '').trim().toLowerCase();
  if (!q) return notes;
  return notes.filter((n) => String(n.text).toLowerCase().includes(q));
}
