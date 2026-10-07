export function wordCount(notes) {
  return notes.reduce((total, note) => {
    const text = note.text.trim();
    return total + (text ? text.split(/\s+/).length : 0);
  }, 0);
}
