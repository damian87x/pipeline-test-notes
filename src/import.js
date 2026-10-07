export function parseImport(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Import failed: file is not valid JSON');
  }
  if (!Array.isArray(data)) throw new Error('Import failed: JSON must be an array of notes');
  for (const n of data) {
    if (!n || typeof n !== 'object' || !Number.isFinite(n.id) || typeof n.text !== 'string') {
      throw new Error('Import failed: every note needs a numeric id and text');
    }
  }
  return data;
}

export function mergeImport(existing, imported) {
  const seen = new Set(existing.map((n) => n.id));
  const added = [];
  for (const n of imported) {
    if (seen.has(n.id)) continue;
    seen.add(n.id);
    added.push(n);
  }
  return [...existing, ...added];
}
