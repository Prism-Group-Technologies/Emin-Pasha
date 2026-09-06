import { type PolicySection, policySectionSchema } from "@/schemas/content/policySection";
import { type RoomCategory, roomCategorySchema } from "@/schemas/content/roomCategory";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §4 — "the only publishable rate card."
 * All rates UGX. Room descriptions are `[DRAFT — VERIFY]` in the source and
 * may not publish without a DECISIONS.md approval entry (TODO(EMIN-Q15)) —
 * left undefined here; the draft text is kept separately below, clearly
 * marked, for whoever makes that call.
 */
const commonInclusions = [
  "24/7 room service with a Special-Select In-Room Dining Menu",
  "fast unlimited fibre internet across a secure cabled and Wi-Fi network",
  "à la carte breakfast with a bespoke service offering",
  "in-room safe for valuables",
];

const raw: RoomCategory[] = [
  {
    id: "superior-room",
    name: "Superior Room",
    rateUgx: 350_000,
    capacity: "1–2 guests",
    sellTo: "Corporate, diplomatic, solo business travellers",
    inclusions: commonInclusions,
  },
  {
    id: "garden-room",
    name: "Garden Room",
    rateUgx: 250_000,
    capacity: "1–2 guests",
    sellTo: "Couples, leisure, first-time guests, value-conscious corporate",
    inclusions: commonInclusions,
  },
  {
    id: "garden-suites",
    name: "Garden Suites",
    rateUgx: 250_000,
    capacity: "2–3 guests",
    sellTo: "Families, extended stay, small groups",
    inclusions: commonInclusions,
  },
  {
    id: "superior-suites",
    name: "Superior Suites",
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

/**
 * CLAUDE.md §0.4 / this step's item 3: legacy USD categories are superseded
 * and NOT published. Kept only as an internal reference so nobody re-derives
 * them from a stale source doc — never imported, never exported beyond this
 * module, never rendered. check:content asserts no "USD" string reaches any
 * exported content value; this constant is deliberately outside that surface.
 *
 * DO NOT PUBLISH. DO NOT EXPORT. DO NOT IMPORT THIS ELSEWHERE.
 */
const LEGACY_ROOMS_DO_NOT_PUBLISH = [
  { name: "Two-bedroom Apartment", rate: "USD 180" },
  { name: "Superior Suite", rate: "USD 200" },
  { name: "Deluxe Suite", rate: "USD 145" },
] as const;
void LEGACY_ROOMS_DO_NOT_PUBLISH;

/**
 * [DRAFT — VERIFY] in the source (§4). Not wired into `rooms` above pending
 * a DECISIONS.md approval entry — TODO(EMIN-Q15). Kept here, clearly marked,
 * so approval doesn't require re-transcribing the draft copy.
 *
 * DRAFT — UNAPPROVED. DO NOT PUBLISH WITHOUT A DECISIONS.md ENTRY.
 */
const ROOM_DESCRIPTIONS_DRAFT_UNVERIFIED = {
  "superior-room":
    "Our most generously appointed room. Superior Rooms pair the hotel's signature heritage detailing with the comforts of a thoroughly modern stay: a plush king bed, a spacious ensuite, a dedicated work area with fibre connectivity, and windows that open onto the quiet of Nakasero. Ideal for the business traveller who does not want to feel like one.",
  "garden-room":
    "Set closest to the landscaped grounds, Garden Rooms open onto greenery. Wake to birdsong rather than traffic, step out into the gardens before breakfast, and return to a calm, characterful interior at the end of the day. Our best-value entry into the Emin Pasha experience.",
  "garden-suites":
    "A suite with the gardens at its doorstep. Separate living and sleeping areas give couples, small families and extended-stay guests room to spread out, while the garden setting keeps the city at a comfortable distance. Accommodates up to three guests.",
  "superior-suites":
    "Space, quiet and the hotel's most characterful interiors. A separate lounge area makes the Superior Suite equally suited to a long stay, a small private meeting or an evening in with room service and the In-Room Dining Menu. Accommodates up to three guests.",
} as const;
void ROOM_DESCRIPTIONS_DRAFT_UNVERIFIED;
