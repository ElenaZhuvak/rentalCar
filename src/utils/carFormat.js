export function parseCityCountry(address = '') {
  const parts = String(address).split(',').map(s => s.trim()).filter(Boolean);
  const country = parts.at(-1) || '';
  const city = parts.at(-2) || '';
  return { city, country };
}

export function formatMileage(value, locale = 'uk-UA') {
  if (value == null || Number.isNaN(Number(value))) return '';
  return new Intl.NumberFormat(locale).format(Number(value));
}

export function formatCarType(type = "") {
  const s = String(type).toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}
