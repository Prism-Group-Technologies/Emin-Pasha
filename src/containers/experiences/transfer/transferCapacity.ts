import type { Vehicle } from "@/containers/experiences/transfer/copy/fleet";

/** "1 passenger" / "3 cases" — the one pluralisation rule the quote copy needs. */
export const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

/**
 * `null` when the party fits the chosen car; otherwise the smallest car in
 * fleet order that does, or a convoy note when none can. Split from
 * `transferQuote.ts` so each stays inside the repo's line ceiling; tested in
 * `transferQuote.test.ts`.
 */
export function capacityWarning(
  vehicle: Vehicle,
  passengers: number,
  bags: number,
  fleet: readonly Vehicle[],
) {
  if (passengers <= vehicle.seats && bags <= vehicle.bags) {
    return null;
  }
  const party = `${plural(passengers, "passenger")} and ${plural(bags, "case")}`;
  const fits = fleet.find((car) => passengers <= car.seats && bags <= car.bags);
  return fits
    ? `${party} won't fit the ${vehicle.className} — the ${fits.className} will.`
    : `${party} need more than one car — reservations will arrange a convoy.`;
}
