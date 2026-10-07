export function toJson(notes) {
  return JSON.stringify(notes ?? [], null, 2);
}
