const KEY = 'theme.v1';
const NAMES = ['light', 'dark'];

export function getTheme(storage) {
  const v = storage.getItem(KEY);
  return NAMES.includes(v) ? v : 'light';
}

export function setTheme(storage, name) {
  if (!NAMES.includes(name)) throw new Error(`unknown theme: ${name}`);
  storage.setItem(KEY, name);
}
