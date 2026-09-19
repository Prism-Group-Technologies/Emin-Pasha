/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface SpaEnhancement {
  id: string;
  name: string;
  /** One line: what it adds and who it is for. */
  description: string;
  /** Human duration added to the base treatment, e.g. "+15 min". */
  duration: string;
  /** Indicative price in UGX. Invented (§0.7) — flagged wherever it renders. */
  priceUgx: number;
}

/**
 * The upsell menu — small extensions our therapists add to any massage,
 * facial or bath. Every item is an ordinary spa enhancement, not a claim
 * about a product line this property stocks; prices are invented placeholders
 * (TODO(EMIN-Q11)) and the section copy flags them indicative and confirmed
 * on booking.
 */
export const spaEnhancements: SpaEnhancement[] = [
  {
    id: "scalp-ritual",
    name: "Scalp & hair-oil ritual",
    description: "A warm-oil scalp massage worked in at the end, left on for the walk home.",
    duration: "+15 min",
    priceUgx: 60000,
  },
  {
    id: "cbd-arnica",
    name: "CBD & arnica pressure work",
    description: "Swapped in over knots and sports strain, for a deeper release without more time.",
    duration: "+0 min",
    priceUgx: 80000,
  },
  {
    id: "hot-stone-back",
    name: "Hot-stone back focus",
    description: "Ten minutes of heated basalt along the spine before the main treatment starts.",
    duration: "+10 min",
    priceUgx: 70000,
  },
  {
    id: "lounge-hour",
    name: "An extra lounge hour",
    description: "Keep the robe and the relaxation lounge for an hour past your treatment.",
    duration: "+60 min",
    priceUgx: 45000,
  },
  {
    id: "couples-upgrade",
    name: "Side-by-side upgrade",
    description: "Move any single treatment into the couples' suite so two of you go together.",
    duration: "+0 min",
    priceUgx: 120000,
  },
];
