import { siteConfigSchema } from "@/schemas/content/siteConfig";

import { identity } from "./identity";

/**
 * Source: docs/02_CONTENT_SOURCE_OF_TRUTH.md §2 (positioning), §3 (setting),
 * §11 (segments/USPs), §12.2 (homepage). Copy is verbatim — do not edit here
 * without updating the source doc first, per CLAUDE.md §3.
 */
export const site = siteConfigSchema.parse({
  identity,
  positioning: {
    statement:
      "For the discerning traveller, diplomat, executive and Kampala local who wants luxury with a soul rather than luxury off a shelf, The Emin Pasha Hotel & Spa is a boutique hotel and spa set in landscaped gardens in the heart of Nakasero that blends historic charm with modern comfort, bespoke service and a genuine appreciation of Uganda's heritage. Unlike the international chain hotels that dominate Kampala's upper tier, Emin Pasha is independent, intimate, garden-set and rooted in a specific Ugandan story — a place where guests feel they have arrived somewhere, not merely checked in.",
    oneLiner: "A collage of history, culture and nature — in a pouch of serenity.",
    elevatorPitch:
      "The Emin Pasha Hotel & Spa is Kampala's boutique landmark: a garden estate in the heart of Nakasero with three restaurants, two bars, a full spa and wellness centre, a 300ft pool and some of the city's most characterful event spaces. It is named after Emin Pasha — the physician and naturalist who came to this region not to conquer it but to understand it — and that spirit of curiosity, humanity and warmth is what our guests actually feel when they stay with us.",
  },
  pillars: [
    {
      name: "History",
      description:
        "architecture and interiors that journey through time, tasteful décor infused with Uganda's heritage, outlets named for the people and places in the story (Hakki Pasha, Sir Samuel Baker, Mehmed Pasha, Acropole).",
      cues: [
        "heritage",
        "journey through time",
        "colonial-era charm",
        "storied",
        "landmark",
        "legacy",
      ],
    },
    {
      name: "Culture",
      description:
        "a menu of Asian, European and African influences; a gift shop dedicated to authentic Ugandan art; the belief that art speaks a language that cuts across all cultures and in so doing unites us all.",
      cues: ["authentic", "Ugandan", "artisanal", "curated", "collage", "unity"],
    },
    {
      name: "Nature",
      description:
        "landscaped gardens with diverse flora, the Equatorial Gardens, poolside gardens as a lush tropical escape, scenic views from the Mehmed Pasha Lounge.",
      cues: ["lush", "verdant", "tropical", "serene", "garden estate", "oasis", "equatorial"],
    },
    {
      name: "Serenity",
      description:
        "a peaceful retreat close to the city's business and cultural attractions; a destination for the individual desiring to close out clutter and be in sync with the mind and thoughts.",
      cues: ["sanctuary", "retreat", "calm", "tranquil", "unwind", "rejuvenate", "homecoming"],
    },
  ],
  setting: {
    description:
      "Set within beautifully landscaped gardens in the heart of Nakasero — Kampala's embassy, government and business quarter, and the greenest and quietest of the city's central hills. A peaceful retreat, minutes from the commercial district and cultural attractions. The main building dates back to 2004 and reflects Uganda's rich architectural heritage. Interiors move between vintage rustic and modern contemporary; the grounds hold diverse flora, a fountain, poolside gardens and the Equatorial Gardens.",
    whySells:
      "Nakasero is the address of choice for embassies, NGOs, development agencies and corporate headquarters; everything is close (business district, government offices, cultural attractions, restaurants, nightlife); yet the property is enclosed, gardened and quiet — a genuine buffer from the city rather than a hotel that simply sits inside it.",
  },
  targetSegments: [
    {
      id: "corporate-diplomatic",
      name: "Corporate & diplomatic (primary, highest value)",
      description:
        "embassy staff, NGO and development-agency personnel, multinational executives, government contractors, consultants.",
      leadWith: [
        "Superior Room",
        "Business Centre",
        "airport transfer",
        "fibre",
        "security",
        "LPO billing",
      ],
      notes: "Watch for long-stay and repeat bookings.",
    },
    {
      id: "mice-corporate-events",
      name: "MICE & corporate events",
      description: "conferences, launches, board meetings, offsites, year-end functions.",
      leadWith: [
        "Kudara Hall",
        "the gardens",
        "the dedicated F&B team",
        "all-in-one venue plus accommodation",
      ],
      notes: "Group terms: 14-day confirmation, 50% deposit above 10 rooms.",
    },
    {
      id: "weddings-private-celebrations",
      name: "Weddings & private celebrations",
      description:
        "Kampala and diaspora couples, milestone birthdays, anniversaries, private dinners.",
      leadWith: [
        "Equatorial Gardens",
        "photography",
        "Sir Samuel Baker fine dining",
        "suite blocks",
      ],
    },
    {
      id: "leisure-heritage-travellers",
      name: "Leisure & heritage travellers",
      description:
        "international leisure, safari pre/post stays, culturally curious travellers, honeymooners.",
      leadWith: [
        "the Emin Pasha story",
        "garden setting",
        "spa",
        "art",
        'the "collage" line',
        "complimentary transfer on stays over a week",
      ],
    },
    {
      id: "kampala-local-market",
      name: "The Kampala local market (underused)",
      description:
        "residents using the pool, gym, spa, restaurants, lounges and Friday Band Night.",
      leadWith: [
        "Band Night",
        "Happy Hour",
        "gym membership",
        "public pool",
        "Manutea",
        "The Rooftop Terrace",
      ],
    },
  ],
  usps: [
    "a story no competitor can copy",
    "a garden estate in the middle of the capital",
    "depth of F&B for a boutique property",
    "a genuine spa and wellness offering",
    "business capability without corporate coldness",
    "independent and bespoke",
    "open to the city",
  ],
  homepage: {
    heroOptions: [
      {
        id: "A",
        headline: "A collage of history, culture and nature in a pouch of serenity",
        subheadline: "Kampala's boutique landmark, in the heart of Nakasero",
        ctaLabel: "Check Availability",
      },
      {
        id: "B",
        headline: "A garden estate in the heart of Kampala",
        subheadline: "Boutique luxury, heritage architecture and genuine Ugandan warmth",
        ctaLabel: "Book Your Stay",
      },
      {
        id: "C",
        headline: "He came not to conquer, but to understand",
        subheadline: "The hotel named for one of Uganda's most extraordinary characters",
        ctaLabel: "Discover Emin Pasha",
      },
    ],
    defaultHeroId: "A",
    introParagraphs: [
      "The Emin Pasha Hotel & Spa is one of Kampala's most distinguished boutique hotels, blending historic charm with modern luxury. Set within beautifully landscaped gardens in the heart of Nakasero, the hotel offers a peaceful retreat while remaining close to the city's business and cultural attractions.",
      "Named after Emin Pasha — the renowned physician, naturalist and linguist who lived and worked in East Africa — the hotel embodies his spirit of curiosity, humanity and appreciation for nature. Today, guests enjoy elegant accommodation, exceptional dining, wellness facilities and personalised service, in an atmosphere that celebrates Uganda's history and culture.",
    ],
    introCtas: ["Our Story", "View Rooms"],
    featureTiles: [
      {
        id: "rooms",
        headline: "Stay",
        supportingLine: "Four room and suite categories, from UGX 250,000 per night.",
        ctaLabel: "View rooms",
      },
      {
        id: "dining",
        headline: "Dine",
        supportingLine:
          "Three restaurants, two bars and a rooftop terrace. Asian, European and African influences.",
        ctaLabel: "Explore dining",
      },
      {
        id: "spa",
        headline: "Unwind",
        supportingLine: "Turkish bath, tailored massage, deep sea-salt treatments. Daily, 7am–9pm.",
        ctaLabel: "Book the spa",
      },
      {
        id: "pool",
        headline: "Swim",
        supportingLine:
          "An ultra-modern 300ft pool in lush tropical gardens. Open to guests and the public.",
        ctaLabel: "See the pool",
      },
      {
        id: "events",
        headline: "Celebrate",
        supportingLine:
          "Kudara Hall, the Equatorial Gardens, and the best outdoor picture spot in the city.",
        ctaLabel: "Plan your event",
      },
      {
        id: "story",
        headline: "Discover",
        supportingLine: "The physician who refused to be rescued from the country he loved.",
        ctaLabel: "Read our history",
      },
    ],
    closing: {
      text: "Your table, your treatment, your suite — all waiting. Reserve directly with us for the best available rate.",
      ctaLabel: "Book Now",
    },
  },
});
