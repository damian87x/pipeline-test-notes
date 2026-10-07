const TAG = /#([\p{L}\p{N}_-]+)/gu;

export function extractTags(text) {
  const found = [];
  for (const m of String(text ?? '').matchAll(TAG)) {
    const tag = m[1].toLowerCase();
    if (!found.includes(tag)) found.push(tag);
  }
  return found;
}

export function filterByTag(notes, tag) {
  const t = String(tag ?? '').trim().replace(/^#/, '').toLowerCase();
  if (!t) return notes;
  return notes.filter((n) => extractTags(n.text).includes(t));
}
