/**
 * Every indexable route, with the keyword cluster it targets.
 *
 * One list, used by `sitemap.ts`, the internal-link audit and the
 * keyword→URL map — so a new page cannot be added to the site without
 * appearing in the sitemap, and an orphan page fails `yarn check:seo`.
 *
 * `cluster` values come from the §13 keyword table; each cluster belongs to
 * exactly one route, which is how cannibalisation is prevented by
 * construction rather than spotted afterwards.
 */
export interface RouteEntry {
  path: string;
  cluster: string;
  priority: number;
  /** Routes this page must link to — the internal-linking contract. */
  linksTo: string[];
}

export const routes: RouteEntry[] = [
  {
    path: "/",
    cluster: "boutique hotel Kampala · luxury hotel Kampala · hotels in Nakasero",
    priority: 1,
    linksTo: [
      "/accommodation",
      "/dining",
      "/spa-and-wellness",
      "/meetings-and-events",
      "/our-story",
      "/offers",
      "/gallery",
      "/faq",
      "/contact",
      "/experiences/cg-shop",
      "/experiences/airport-transfer",
    ],
  },
  {
    path: "/accommodation",
    cluster: "hotels in Kampala · rooms Kampala",
    priority: 0.9,
    linksTo: [
      "/accommodation/superior-room",
      "/accommodation/deluxe-room",
      "/accommodation/deluxe-suites",
      "/accommodation/superior-suites",
      "/dining",
      "/spa-and-wellness",
      "/offers",
    ],
  },
  {
    path: "/accommodation/superior-room",
    cluster: "hotel room Nakasero · corporate hotel Kampala",
    priority: 0.8,
    linksTo: ["/spa-and-wellness", "/experiences/airport-transfer", "/dining"],
  },
  {
    path: "/accommodation/deluxe-room",
    cluster: "deluxe room Kampala · best value hotel Nakasero",
    priority: 0.8,
    linksTo: ["/spa-and-wellness", "/experiences/airport-transfer", "/dining"],
  },
  {
    path: "/accommodation/deluxe-suites",
    cluster: "family suite Kampala",
    priority: 0.8,
    linksTo: ["/spa-and-wellness", "/experiences/airport-transfer", "/dining"],
  },
  {
    path: "/accommodation/superior-suites",
    cluster: "long-stay hotel Kampala",
    priority: 0.8,
    linksTo: ["/spa-and-wellness", "/experiences/airport-transfer", "/dining"],
  },
  {
    path: "/dining",
    cluster: "restaurants Kampala · fine dining Kampala",
    priority: 0.9,
    linksTo: [
      "/dining/hakki-pasha-restaurant-bar",
      "/dining/sir-samuel-baker-fine-dining",
      "/dining/rooftop-terrace",
      "/dining/manutea-wine-whisky-lounge",
      "/dining/in-room-dining",
      "/accommodation",
      "/meetings-and-events",
      "/offers",
      "/lounges-and-spaces",
    ],
  },
  {
    path: "/dining/hakki-pasha-restaurant-bar",
    cluster: "restaurant Nakasero",
    priority: 0.7,
    linksTo: ["/accommodation", "/meetings-and-events", "/offers"],
  },
  {
    path: "/dining/sir-samuel-baker-fine-dining",
    cluster: "fine dining Kampala",
    priority: 0.7,
    linksTo: ["/accommodation", "/meetings-and-events", "/offers"],
  },
  {
    path: "/dining/rooftop-terrace",
    cluster: "rooftop bar Kampala",
    priority: 0.7,
    linksTo: ["/accommodation", "/meetings-and-events", "/offers"],
  },
  {
    path: "/dining/manutea-wine-whisky-lounge",
    cluster: "whisky bar Kampala",
    priority: 0.7,
    linksTo: ["/accommodation", "/meetings-and-events", "/offers"],
  },
  {
    path: "/dining/in-room-dining",
    cluster: "room service hotel Kampala",
    priority: 0.6,
    linksTo: ["/accommodation", "/meetings-and-events", "/offers"],
  },
  {
    path: "/lounges-and-spaces",
    cluster: "lounge Nakasero · garden lounge Kampala · hotel with gardens in Kampala",
    priority: 0.7,
    linksTo: ["/dining", "/meetings-and-events", "/accommodation", "/offers"],
  },
  {
    path: "/spa-and-wellness",
    cluster: "spa hotel Kampala",
    priority: 0.9,
    linksTo: ["/spa", "/gym", "/swimming-pool", "/spa-etiquette", "/accommodation", "/dining"],
  },
  {
    path: "/spa",
    cluster: "best spa in Kampala · Turkish bath Kampala",
    priority: 0.9,
    linksTo: ["/spa-etiquette", "/swimming-pool", "/gym", "/accommodation"],
  },
  {
    path: "/gym",
    cluster: "gym membership Nakasero",
    priority: 0.8,
    linksTo: ["/spa", "/swimming-pool", "/spa-etiquette", "/accommodation"],
  },
  {
    path: "/swimming-pool",
    cluster: "swimming pool open to public Kampala",
    priority: 0.8,
    linksTo: ["/spa", "/gym", "/spa-etiquette", "/accommodation"],
  },
  {
    path: "/spa-etiquette",
    cluster: "spa policies Kampala",
    priority: 0.5,
    linksTo: ["/spa", "/gym", "/swimming-pool"],
  },
  {
    path: "/meetings-and-events",
    cluster: "conference venue Kampala",
    priority: 0.9,
    linksTo: [
      "/kudara-hall",
      "/meeting-rooms",
      "/business-centre",
      "/weddings",
      "/accommodation",
      "/dining",
    ],
  },
  {
    path: "/kudara-hall",
    cluster: "conference venue Kampala · event hall Kampala",
    priority: 0.8,
    linksTo: ["/meeting-rooms", "/business-centre", "/weddings", "/accommodation"],
  },
  {
    path: "/meeting-rooms",
    cluster: "meeting room Kampala",
    priority: 0.7,
    linksTo: ["/kudara-hall", "/business-centre", "/accommodation", "/dining"],
  },
  {
    path: "/business-centre",
    cluster: "business centre with meeting rooms Kampala",
    priority: 0.7,
    linksTo: ["/meeting-rooms", "/kudara-hall", "/accommodation"],
  },
  {
    path: "/weddings",
    cluster: "wedding venue Kampala · wedding venue Uganda",
    priority: 0.9,
    linksTo: ["/kudara-hall", "/lounges-and-spaces", "/accommodation", "/dining"],
  },
  {
    path: "/experiences/airport-transfer",
    cluster: "hotel near Entebbe airport transfer",
    priority: 0.7,
    linksTo: ["/accommodation", "/contact", "/offers"],
  },
  {
    path: "/experiences/cg-shop",
    cluster: "art shop Kampala",
    priority: 0.5,
    linksTo: ["/our-story", "/lounges-and-spaces", "/accommodation"],
  },
  {
    path: "/offers",
    cluster: "Friday Band Night Kampala · happy hour Kampala",
    priority: 0.8,
    linksTo: ["/dining", "/accommodation", "/spa-and-wellness"],
  },
  {
    path: "/our-story",
    cluster: "who was Emin Pasha · Emin Pasha Uganda",
    priority: 0.9,
    linksTo: [
      "/our-story/emin-pasha",
      "/our-story/the-hotel",
      "/our-story/message-from-the-general-manager",
      "/dining/hakki-pasha-restaurant-bar",
      "/dining/sir-samuel-baker-fine-dining",
      "/lounges-and-spaces",
      "/accommodation",
    ],
  },
  {
    path: "/our-story/emin-pasha",
    cluster: "Emin Pasha history · Emin Pasha Relief Expedition",
    priority: 0.7,
    linksTo: [
      "/our-story",
      "/our-story/the-hotel",
      "/our-story/message-from-the-general-manager",
      "/dining/hakki-pasha-restaurant-bar",
      "/dining/sir-samuel-baker-fine-dining",
      "/lounges-and-spaces",
      "/accommodation",
    ],
  },
  {
    path: "/our-story/the-hotel",
    cluster: "heritage hotel Kampala · historic hotel Nakasero",
    priority: 0.7,
    linksTo: [
      "/our-story",
      "/our-story/emin-pasha",
      "/our-story/message-from-the-general-manager",
      "/accommodation",
      "/lounges-and-spaces",
      "/spa-and-wellness",
      "/dining",
      "/experiences/airport-transfer",
    ],
  },
  {
    path: "/our-story/message-from-the-general-manager",
    cluster: "Emin Pasha Hotel general manager welcome",
    priority: 0.5,
    linksTo: [
      "/our-story",
      "/our-story/emin-pasha",
      "/our-story/the-hotel",
      "/accommodation",
      "/spa-and-wellness",
      "/dining",
      "/contact",
    ],
  },
  {
    path: "/gallery",
    cluster: "hotel photos Nakasero",
    priority: 0.6,
    linksTo: [
      "/accommodation",
      "/dining",
      "/spa-and-wellness",
      "/weddings",
      "/gallery/romance-and-honeymoons",
      "/gallery/business-in-nakasero",
      "/gallery/spa-weekend",
      "/gallery/garden-weddings",
      "/gallery/family-escapes",
      "/gallery/after-dark",
    ],
  },
  // Gallery mood collections — invented copy (containers/gallery/copy), each
  // linking back to the hub and to its siblings via OtherCollectionsSection.
  {
    path: "/gallery/romance-and-honeymoons",
    cluster: "honeymoon hotel Kampala",
    priority: 0.5,
    linksTo: ["/gallery", "/accommodation/deluxe-suites", "/spa", "/gallery/spa-weekend"],
  },
  {
    path: "/gallery/business-in-nakasero",
    cluster: "business hotel photos Nakasero",
    priority: 0.5,
    linksTo: [
      "/gallery",
      "/accommodation/superior-room",
      "/business-centre",
      "/gallery/after-dark",
    ],
  },
  {
    path: "/gallery/spa-weekend",
    cluster: "spa weekend Kampala",
    priority: 0.5,
    linksTo: ["/gallery", "/spa", "/swimming-pool", "/gallery/romance-and-honeymoons"],
  },
  {
    path: "/gallery/garden-weddings",
    cluster: "garden wedding photos Kampala",
    priority: 0.5,
    linksTo: ["/gallery", "/weddings", "/lounges-and-spaces", "/gallery/after-dark"],
  },
  {
    path: "/gallery/family-escapes",
    cluster: "family hotel with pool Kampala",
    priority: 0.5,
    linksTo: ["/gallery", "/accommodation/deluxe-suites", "/swimming-pool", "/gallery/spa-weekend"],
  },
  {
    path: "/gallery/after-dark",
    cluster: "evening dining and cocktails Kampala",
    priority: 0.5,
    linksTo: ["/gallery", "/dining", "/offers", "/gallery/garden-weddings"],
  },
  {
    path: "/faq",
    cluster: "Emin Pasha hotel questions",
    priority: 0.6,
    linksTo: ["/accommodation", "/contact", "/spa-and-wellness"],
  },
  {
    path: "/contact",
    cluster: "contact Emin Pasha Hotel · hotel Nakasero address",
    priority: 0.8,
    linksTo: [
      "/accommodation",
      "/meetings-and-events",
      "/spa-and-wellness",
      "/dining",
      "/experiences/airport-transfer",
    ],
  },
  // Legal pages — invented copy (containers/legal/copy), linked from the
  // footer legal bar on every page and cross-linked to one another.
  {
    path: "/privacy-policy",
    cluster: "Emin Pasha Hotel privacy policy",
    priority: 0.3,
    linksTo: ["/cookie-policy", "/cookie-settings", "/terms", "/accessibility", "/contact"],
  },
  {
    path: "/cookie-policy",
    cluster: "Emin Pasha Hotel cookie policy",
    priority: 0.3,
    linksTo: ["/cookie-settings", "/privacy-policy", "/terms", "/accessibility"],
  },
  {
    path: "/cookie-settings",
    cluster: "manage cookie preferences",
    priority: 0.2,
    linksTo: ["/cookie-policy", "/privacy-policy", "/terms", "/accessibility"],
  },
  {
    path: "/terms",
    cluster: "Emin Pasha Hotel booking terms and conditions",
    priority: 0.3,
    linksTo: ["/privacy-policy", "/cookie-policy", "/accessibility", "/offers", "/contact"],
  },
  {
    path: "/accessibility",
    cluster: "accessible hotel Kampala",
    priority: 0.4,
    linksTo: ["/privacy-policy", "/terms", "/accommodation", "/contact", "/faq"],
  },
];

export const routePaths = routes.map((route) => route.path);
