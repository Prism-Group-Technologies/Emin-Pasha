/**
 * Upper bound of a room's approved `capacity` string ("1–2 guests" → 2).
 *
 * Deliberately import-free. It lives here rather than in
 * `containers/accommodation/constants.ts` because the guest filter is a
 * client component, and that module imports `content/rooms` — which drags the
 * Zod-validated content layer into the client bundle. Measured at **63 KB
 * gzipped on /accommodation** before this move (the same D25 failure mode,
 * recurring).
 *
 * En-dash and hyphen are both handled; the source uses both.
 */
export function maxGuests(capacity: string): number {
  const numbers = capacity.match(/\d+/g);
  if (!numbers || numbers.length === 0) {
    return 1;
  }
  return Math.max(...numbers.map(Number));
}
