const KEY = 'sort.v1';
const ORDERS = ['newest', 'oldest'];

export function sortNotes(notes, order) {
  const dir = order === 'oldest' ? 1 : -1;
  return [...notes].sort((a, b) => dir * ((a.createdAt - b.createdAt) || (a.id - b.id)));
}

export function getSort(storage) {
  const v = storage.getItem(KEY);
  return ORDERS.includes(v) ? v : 'newest';
}

export function setSort(storage, order) {
  if (!ORDERS.includes(order)) throw new Error(`unknown order: ${order}`);
  storage.setItem(KEY, order);
}
