import { type SeoMeta, seoMetaSchema } from "@/schemas/content/seoMeta";

/** docs/02_CONTENT_SOURCE_OF_TRUTH.md §13 — approved titles and descriptions. */
const raw: SeoMeta[] = [
  {
    page: "home",
    title: "Emin Pasha Hotel & Spa | Boutique Hotel Kampala",
    description:
      "Kampala's distinguished boutique hotel in Nakasero. Gardens, spa, three restaurants and a 300ft pool. Rooms from UGX 250,000. Book direct.",
  },
  {
    page: "accommodation",
    title: "Rooms & Suites | Emin Pasha Hotel Kampala",
    description:
      "Superior Rooms, Garden Rooms and Suites from UGX 250,000 per night. Fibre internet, 24/7 room service and à la carte breakfast included.",
  },
  {
    page: "dining",
    title: "Restaurants & Bars | Emin Pasha Hotel Kampala",
    description:
      "Three restaurants and two bars in Nakasero. Asian, European and African influences, fine dining and a rooftop terrace with city views.",
  },
  {
    page: "spa",
    title: "Swanky Spa & Wellness | Emin Pasha Kampala",
    description:
      "Turkish bath, tailored massage, facials and deep sea-salt treatments. Open daily 7am–9pm in the heart of Nakasero, Kampala.",
  },
  {
    page: "meetings",
    title: "Conference & Event Venue | Emin Pasha Kampala",
    description:
      "Kudara Hall, private meeting rooms and the Equatorial Gardens. Kampala's most characterful venue for conferences, launches and weddings.",
  },
  {
    page: "weddings",
    title: "Wedding Venue Kampala | Emin Pasha Hotel & Spa",
    description:
      "Say yes in landscaped gardens in the heart of Kampala. Ceremony, reception, fine dining and accommodation at one boutique address.",
  },
  {
    page: "pool",
    title: "Swimming Pool | Emin Pasha Hotel Kampala",
    description:
      "An ultra-modern 300ft pool in lush tropical gardens, open to guests and the public. Poolside parties and events welcome.",
  },
  {
    page: "our-story",
    title: "Our History | The Emin Pasha Hotel & Spa",
    description:
      "The physician, naturalist and linguist who refused to be rescued from the country he loved — and the Kampala hotel that carries his name.",
  },
  {
    page: "contact",
    title: "Contact & Location | Emin Pasha Hotel Kampala",
    description:
      "Plot 27 Akii Bua Road, Nakasero, Kampala. Call +256 312 264 712 or email info@eminpasha.com to book.",
  },
];

export const seoMeta: SeoMeta[] = raw.map((meta) => seoMetaSchema.parse(meta));

/**
 * Keyword clusters, §13 — reference only, not rendered as page copy.
 * TODO(EMIN-Q13): starRating omitted from all JSON-LD until verified.
 */
export const keywordClusters = {
  head: [
    "boutique hotel Kampala",
    "luxury hotel Kampala",
    "hotels in Nakasero",
    "Emin Pasha Hotel",
  ],
  commercialIntent: [
    "hotel with pool Kampala",
    "spa in Kampala",
    "conference venue Kampala",
    "wedding venue Kampala",
    "hotel near Entebbe airport transfer",
    "fine dining Kampala",
    "rooftop bar Kampala",
  ],
  longTail: [
    "best boutique hotel in Kampala Uganda",
    "hotel with gardens in Kampala",
    "Turkish bath Kampala",
    "gym membership Kampala Nakasero",
    "swimming pool open to public Kampala",
    "outdoor event space Kampala",
    "business centre with meeting rooms Kampala",
    "hotel for embassy staff Kampala",
  ],
  brandAndStory: [
    "Emin Pasha history",
    "who was Emin Pasha",
    "Emin Pasha Uganda",
    "Emin Pasha Relief Expedition",
  ],
} as const;
