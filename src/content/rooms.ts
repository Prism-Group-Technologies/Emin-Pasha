import { type PolicySection, policySectionSchema } from "@/schemas/content/policySection";
import { type RoomCategory, roomCategorySchema } from "@/schemas/content/roomCategory";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §4 — "the only publishable rate card."
 * All rates UGX. Room descriptions are `[DRAFT — VERIFY]` in the source and
 * may not publish without a DECISIONS.md approval entry (TODO(EMIN-Q15)) —
 * left undefined here.
 *
 * The general manager's four categories are the VIP Suite, Apartment Room,
 * Deluxe Room and Deluxe Suite; the §4 display order below is unchanged. Two
 * of the four were renamed without being repriced, so each keeps the rate,
 * capacity and `sellTo` its slot already carried — see the rename commit for
 * the old-to-new mapping.
 */
const commonInclusions = [
  "24/7 room service with a Special-Select In-Room Dining Menu",
  "fast unlimited fibre internet across a secure cabled and Wi-Fi network",
  "à la carte breakfast with a bespoke service offering",
  "in-room safe for valuables",
];

const raw: RoomCategory[] = [
  {
    id: "apartment-room",
    name: "Apartment Room",
    rateUgx: 350_000,
    capacity: "1–2 guests",
    sellTo: "Corporate, diplomatic, solo business travellers",
    inclusions: commonInclusions,
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    rateUgx: 250_000,
    capacity: "1–2 guests",
    sellTo: "Couples, leisure, first-time guests, value-conscious corporate",
    inclusions: commonInclusions,
  },
  {
    id: "deluxe-suites",
    name: "Deluxe Suites",
    rateUgx: 250_000,
    capacity: "2–3 guests",
    sellTo: "Families, extended stay, small groups",
    inclusions: commonInclusions,
  },
  {
    id: "vip-suite",
    name: "VIP Suite",
    rateUgx: 250_000,
    capacity: "1–3 guests",
    sellTo: "Long-stay executives, guests wanting a private lounge area",
    inclusions: commonInclusions,
  },
];

export const rooms: RoomCategory[] = raw.map((room) => roomCategorySchema.parse(room));

export const ratesFromCopy = "Rates from UGX 250,000 per night.";

/** docs/02_CONTENT_SOURCE_OF_TRUTH.md §12.3 — use verbatim. */
export const accommodationPageIntro =
  "Four ways to stay, one thing in common: the gardens outside your window and the quiet of Nakasero beyond them. Every room and suite comes with fast unlimited fibre, 24/7 room service and an à la carte breakfast served the way you like it. Rates from UGX 250,000 per night.";

export const childrenAndExtraBeds: PolicySection = policySectionSchema.parse({
  id: "children-and-extra-beds",
  title: "Children & extra beds",
  items: [
    "Children stay free while using existing bedding.",
    "Children may not be eligible for complimentary breakfast.",
    "Children under 16 may use the hotel pool accompanied by a parent or adult.",
    "Spa, Health Club and hydrothermal facilities are 16+.",
  ],
});

/**
 * TODO(EMIN-Q05): the source quotes rollaway/extra-bed pricing as "USD 10
 * per day" with the currency itself flagged unresolved. Never published in
 * USD (CLAUDE.md §0.1) — left undefined pending conversion to UGX or
 * confirmation that USD is intentional here.
 */
export const extraBedPriceUgx: number | undefined = undefined;
