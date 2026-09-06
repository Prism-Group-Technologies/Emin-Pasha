import { type Offer, offerSchema } from "@/schemas/content/offer";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §10. "Reopening packages" is
 * deliberately omitted — Q08's recommendation (standing Offers page) was
 * followed rather than publishing a possibly-stale campaign. Happy Hour
 * days are TODO(EMIN-Q07); the schedule field is left undefined rather than
 * guessing between the source's conflicting day ranges.
 */
const raw: Offer[] = [
  {
    id: "friday-band-night",
    name: "Friday Band Night",
    description:
      "Live music, a full bar and the Emin Pasha gardens after dark. Kampala's most characterful Friday night out.",
    priceUgx: 85_000,
  },
  {
    id: "equatorial-sunset-happy-hour",
    name: "Equatorial Sunset Happy Hour",
    description: "Sunset Combo UGX 60,000; House Cocktails UGX 20,000.",
    schedule: "3:00pm – 8:00pm",
  },
];

export const offers: Offer[] = raw.map((offer) => offerSchema.parse(offer));

export const offersPageIntro =
  "Live music on a Friday. Cocktails as the equatorial sun goes down. Packages built for the way people actually want to use this hotel.";
