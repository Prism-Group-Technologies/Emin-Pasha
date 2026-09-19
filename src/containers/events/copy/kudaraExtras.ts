/**
 * Kudara Hall chargeable extras — the add-on line items the estimator prices
 * on top of hall hire and catering. Split out of `kudaraCatering.ts` to keep
 * both files inside the max-lines ceiling; they are separate concerns anyway
 * (what delegates eat vs. what the production costs).
 *
 * Import-free, like its sibling, so the pure `kudaraQuote.ts` and the
 * `useKudaraEstimator` client hook can both read it without pulling the
 * Zod-validated asset layer into the client bundle.
 *
 * Every rate is an indicative placeholder for planning only and is labelled as
 * such on the card, in the estimator and in the section copy.
 */
export interface KudaraExtra {
  id: string;
  label: string;
  hint: string;
  priceUgx: number;
  /** Multiply by the delegate count rather than charging once. */
  perDelegate?: boolean;
}

export const kudaraExtras: KudaraExtra[] = [
  {
    id: "premium-av",
    label: "Premium AV package",
    hint: "Extra LED, broadcast cameras, a show caller",
    priceUgx: 4_500_000,
  },
  {
    id: "streaming",
    label: "Managed live stream",
    hint: "Multi-camera program feed to your platform",
    priceUgx: 2_800_000,
  },
  {
    id: "translation",
    label: "Interpretation booths",
    hint: "Two booths with delegate receivers",
    priceUgx: 3_200_000,
  },
  {
    id: "welcome",
    label: "Welcome reception",
    hint: "Canapés and a bar on the terrace",
    priceUgx: 60000,
    perDelegate: true,
  },
  {
    id: "rooms",
    label: "Delegate room block",
    hint: "Held bedrooms at the group rate",
    priceUgx: 320000,
    perDelegate: true,
  },
];
