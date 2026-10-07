export function remaining(text, max) {
  return max - text.length;
}

export function canSave(text, max) {
  return remaining(text, max) >= 0;
}
