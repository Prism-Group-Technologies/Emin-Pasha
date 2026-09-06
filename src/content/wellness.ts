import { type Facility, facilitySchema } from "@/schemas/content/facility";
import { type SpaService, spaServiceSchema } from "@/schemas/content/spaService";

/** docs/02_CONTENT_SOURCE_OF_TRUTH.md §6. */
export const spa: Facility = facilitySchema.parse({
  id: "swanky-spa",
  name: "Swanky Spa & Wellness Centre",
  description:
    "Rejuvenate body and mind with signature treatments crafted to restore balance, beauty and inner calm; a team of professionals delivering the most calming and luxurious spa experience in the city.",
  hours: "Daily, 7:00am – 9:00pm",
});

export const spaPageIntro =
  "Rejuvenate body and mind with signature treatments crafted to restore balance, beauty and inner calm. At The Emin Pasha Swanky Spa and Wellness Centre our team of professionals delivers the most calming and luxurious spa experience in Kampala — tailored massage, facials, deep sea-salt treatments and a full, rejuvenating Turkish bath. Daily, 7:00am to 9:00pm.";

const rawServices: SpaService[] = [
  { id: "tailored-massage", name: "Tailored massage treatments" },
  { id: "facials", name: "Facials" },
  { id: "deep-sea-salt", name: "Deep sea-salt treatments" },
  { id: "turkish-bath", name: "A full, rejuvenating Turkish bath experience" },
];

export const spaServices: SpaService[] = rawServices.map((service) =>
  spaServiceSchema.parse(service),
);

export const gym: Facility = facilitySchema.parse({
  id: "emin-pasha-gym",
  name: "Emin Pasha Gym",
  description:
    "Newly renovated, state-of-the-art facility with cutting-edge equipment, personalised fitness programmes, group fitness classes and certified trainers. Membership available to non-resident members as well as hotel guests.",
  hours: "Daily, 6:00am – 9:00pm",
});

export const pool: Facility = facilitySchema.parse({
  id: "swimming-pool",
  name: "Swimming Pool",
  // "300ft" is approved marketing copy (§12.2 feature tiles) — the metric
  // conversion / precise dimension is TODO(EMIN-Q17), not this phrase.
  description:
    "Ultra-modern 300ft pool, accessorised with stone finishing and grating; set within serene poolside gardens, a lush tropical escape; open to both hotel guests and the general public, for a regular swim or as a venue for poolside parties and events.",
  rules: [
    "Maximum depth 1.60m",
    "There is no lifeguard on duty",
    "Children may use the pool only when accompanied by a parent, adult or guardian",
  ],
});

/**
 * The pool page's intro — the approved §6 description **with the "300ft"
 * figure omitted**.
 *
 * Q17 asks whether "300ft" is length, perimeter or something else, and there
 * is no approval entry in docs/DECISIONS.md resolving it. The Step 11 brief
 * is explicit: render the figure only in the form approved there, and
 * otherwise omit it. So this page states every verified attribute — the
 * stone finishing and grating, the poolside gardens, the public access — and
 * simply does not claim a dimension. `pool.description` above is untouched
 * and keeps the §12.2-approved marketing form for wherever that is licensed.
 * See DECISIONS.md D45.
 */
export const poolPageIntro =
  "An ultra-modern pool, accessorised with stone finishing and grating, set within serene poolside gardens — a lush tropical escape. Open to both hotel guests and the general public, for a regular swim or as a venue for poolside parties and events.";

/** docs/02_CONTENT_SOURCE_OF_TRUTH.md §6 — the four approved spa offerings. */
export const gymOfferings = [
  "Cutting-edge equipment",
  "Personalised fitness programmes",
  "Group fitness classes",
  "Certified trainers",
];
