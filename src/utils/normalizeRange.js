export function normalizeRange(fromRaw, toRaw) {
  let from = fromRaw === '' ? undefined : Number(fromRaw);
  let to   = toRaw   === '' ? undefined : Number(toRaw);
  if (from != null && to != null && from > to) {
    const turnOver = from; from = to; to = turnOver;
  }
  return { from, to };
}
