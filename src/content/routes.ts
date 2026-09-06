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
      "/accommodation/garden-room",
      "/accommodation/garden-suites",
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
    path: "/accommodation/garden-room",
    cluster: "hotel with gardens in Kampala",
    priority: 0.8,
    linksTo: ["/spa-and-wellness", "/experiences/airport-transfer", "/dining"],
  },
  {
    path: "/accommodation/garden-suites",
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
    cluster: "lounge Nakasero · garden lounge Kampala",
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
      "/dining/hakki-pasha-restaurant-bar",
      "/dining/sir-samuel-baker-fine-dining",
      "/lounges-and-spaces",
      "/accommodation",
    ],
  },
  {
    path: "/gallery",
    cluster: "hotel photos Nakasero",
    priority: 0.6,
    linksTo: ["/accommodation", "/dining", "/spa-and-wellness"],
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
    linksTo: ["/accommodation", "/meetings-and-events", "/spa-and-wellness"],
  },
];

export const routePaths = routes.map((route) => route.path);
