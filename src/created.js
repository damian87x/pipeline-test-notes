export function formatCreated(timestamp) {
  if (!Number.isFinite(timestamp)) return '';
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return '';
  const iso = date.toISOString();
  return /^\d{4}-\d{2}-\d{2}T/.test(iso) ? iso.slice(0, 10) : '';
}
