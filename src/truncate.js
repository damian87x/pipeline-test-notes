export function truncateNote(text, max) {
  return text.length > max ? text.slice(0, max) + '…' : text;
}
