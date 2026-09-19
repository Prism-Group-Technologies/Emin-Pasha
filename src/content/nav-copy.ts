import { type NavPanelCopy, navPanelCopySchema } from "@/schemas/content/navCopy";

/**
 * Header mega-menu merchandising copy, keyed by top-level section href.
 *
 * **Provenance, line by line.** Every description here is a short paraphrase
 * of an already-approved description in its own content module — `dining.ts`
 * §5, `wellness.ts` §6, `meetings.ts` §7, `story.ts` §12.5 — or, where the
 * source has no publishable description, a line written to the §2 voice that
 * states no fact at all.
 *
 * The rooms are the case worth spelling out: `rooms.ts` records that the
 * room descriptions in the source are `[DRAFT — VERIFY]` and may not publish
 * without a DECISIONS.md entry (TODO(EMIN-Q15)). So the four room lines below
 * claim nothing measurable. Each leans only on an attribute already approved
 * elsewhere — the Deluxe Room and Deluxe Suites lines reframe only those
 * rooms' approved `capacity` and `sellTo`; the Superior Suite's private
 * lounge area is in that room's approved `sellTo`. Nothing here invents a
 * feature, a size, a rate or a view.
 *
 * Status: TODO(EMIN-Q70) — pending client sign-off. Removing a section from
 * this map is safe: its panel falls back to labels alone.
 */
const raw: Record<string, NavPanelCopy> = {
  "/accommodation": {
    eyebrow: "Accommodation",
    intro: "Four ways to stay, with the gardens outside every window.",
    viewAllLabel: "View all rooms & suites",
    descriptions: {
      "/accommodation/superior-room": "A room for working and resting in equal measure.",
      "/accommodation/deluxe-room": "For couples and first-time guests, at our entry rate.",
      "/accommodation/deluxe-suites": "More room to spread out, for families and longer stays.",
      "/accommodation/superior-suites": "A private lounge to receive, to work, to unwind.",
    },
    assetIds: {
      "/accommodation/superior-room": "room-superior-room",
      "/accommodation/deluxe-room": "room-deluxe-room",
      "/accommodation/deluxe-suites": "room-deluxe-suites",
      "/accommodation/superior-suites": "room-superior-suites",
    },
  },

  "/dining": {
    eyebrow: "Dining",
    intro: "Three restaurants and two bars, across the estate.",
    viewAllLabel: "View all restaurants & bars",
    descriptions: {
      "/dining/hakki-pasha-restaurant-bar":
        "International and local flavours, vibrant and elegant.",
      "/dining/sir-samuel-baker-fine-dining":
        "The finest ingredients, meticulous attention to detail.",
      "/dining/rooftop-terrace": "Panoramic city views, and the calm to take them in.",
      "/dining/manutea-wine-whisky-lounge": "Fine wines and whiskies, carefully curated.",
      "/dining/in-room-dining": "Around the clock, in every room category.",
    },
    assetIds: {
      "/dining/hakki-pasha-restaurant-bar": "dining-hakki-pasha",
      "/dining/sir-samuel-baker-fine-dining": "dining-sir-samuel-baker",
      "/dining/rooftop-terrace": "dining-rooftop-terrace",
      "/dining/manutea-wine-whisky-lounge": "dining-manutea",
      "/dining/in-room-dining": "dining-in-room",
    },
  },

  "/spa-and-wellness": {
    eyebrow: "Spa & Wellness",
    intro: "Spa, gym and pool — the estate's quieter hours.",
    viewAllLabel: "View spa & wellness",
    descriptions: {
      "/spa": "Signature treatments that restore balance and calm.",
      "/gym": "Cutting-edge equipment and certified trainers.",
      "/swimming-pool": "An ultra-modern pool set in poolside gardens.",
      "/spa-etiquette": "How to make the most of your visit.",
    },
    assetIds: {
      "/spa": "spa-treatment-room",
      "/gym": "spa-gym",
      "/swimming-pool": "spa-pool",
    },
  },

  "/meetings-and-events": {
    eyebrow: "Meetings & Events",
    intro: "One address, every part of the event.",
    viewAllLabel: "View meetings & events",
    descriptions: {
      "/kudara-hall": "A state-of-the-art hall for conferences and events.",
      "/meeting-rooms": "Cutting-edge technology, dedicated F&B support.",
      "/business-centre": "Full office amenities for individuals and companies.",
      "/weddings": "The gardens for the ceremony, the estate for after.",
    },
    assetIds: {
      "/kudara-hall": "meetings-kudara-hall",
      "/meeting-rooms": "meetings-private-rooms",
      "/business-centre": "meetings-business-centre",
      "/weddings": "weddings-equatorial-gardens",
    },
  },

  // Not a desktop-bar entry, but the mobile drawer renders the full tree, so
  // the section still earns a panel there.
  "/lounges-and-spaces": {
    eyebrow: "Lounges & Spaces",
    intro: "Where the estate slows down.",
    viewAllLabel: "View lounges & spaces",
    descriptions: {
      "/lounges-and-spaces#acropole-lounge": "Soft lighting, plush furnishings, a fountain.",
      "/lounges-and-spaces#mehmed-pasha-lounge": "A scenic view directly onto the gardens.",
      "/lounges-and-spaces#equatorial-gardens": "Lush greenery, a haven amidst the city.",
    },
    assetIds: {
      "/lounges-and-spaces#acropole-lounge": "lounge-acropole",
      "/lounges-and-spaces#mehmed-pasha-lounge": "lounge-mehmed-pasha",
      "/lounges-and-spaces#equatorial-gardens": "lounge-equatorial-gardens",
    },
  },

  "/experiences": {
    eyebrow: "Experiences",
    intro: "The parts of the stay that happen off the key card.",
    viewAllLabel: "View all experiences",
    descriptions: {
      "/experiences/airport-transfer": "Chauffeurs who watch your flight, not the clock.",
      "/experiences/cg-shop": "Authentic art pieces and décor, from Uganda.",
    },
    assetIds: {
      "/experiences/airport-transfer": "experiences-airport-transfer",
      "/experiences/cg-shop": "experiences-cg-shop",
    },
  },

  "/our-story": {
    eyebrow: "Our Story",
    intro: "Why we carry this name, and the house that carries it.",
    viewAllLabel: "Read our story",
    descriptions: {
      "/our-story/the-hotel": "A garden estate in the heart of Nakasero.",
      "/our-story/emin-pasha": "Doctor, naturalist, linguist — an African at heart.",
      "/our-story/message-from-the-general-manager": "A word of welcome.",
    },
    assetIds: {
      "/our-story/the-hotel": "story-the-hotel",
      "/our-story/emin-pasha": "story-emin-pasha-portrait",
      "/our-story/message-from-the-general-manager": "story-gm-photo",
    },
  },
};

export const navPanelCopy: Record<string, NavPanelCopy> = Object.fromEntries(
  Object.entries(raw).map(([href, copy]) => [href, navPanelCopySchema.parse(copy)]),
);
