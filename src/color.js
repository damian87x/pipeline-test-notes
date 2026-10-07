const COLORS = ['none', 'red', 'green', 'blue'];

export function setColor(notes, id, color) {
  if (!COLORS.includes(color)) throw new Error(`unknown color: ${color}`);
  const note = notes.find((item) => item.id === id);
  if (!note) return false;
  note.color = color;
  return true;
}
