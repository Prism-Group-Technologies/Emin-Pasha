import { type NavItem, navItemSchema } from "@/schemas/content/navItem";

/**
 * Site architecture — docs/02_CONTENT_SOURCE_OF_TRUTH.md §12.1, with slugs
 * and the /weddings, /faq additions approved in docs/PLAN.md §2.3 (Q57, Q59).
 */
const raw: NavItem[] = [
  {
    label: "Accommodation",
    href: "/accommodation",
    children: [
      { label: "Superior Room", href: "/accommodation/superior-room" },
      { label: "Deluxe Room", href: "/accommodation/deluxe-room" },
      { label: "Deluxe Suites", href: "/accommodation/deluxe-suites" },
      { label: "Superior Suites", href: "/accommodation/superior-suites" },
    ],
  },
  {
    label: "Dining",
    href: "/dining",
    children: [
      { label: "Hakki Pasha Restaurant & Bar", href: "/dining/hakki-pasha-restaurant-bar" },
      { label: "Sir Samuel Baker Fine Dining", href: "/dining/sir-samuel-baker-fine-dining" },
      { label: "The Rooftop Terrace", href: "/dining/rooftop-terrace" },
      { label: "Manutea Wine & Whisky Lounge", href: "/dining/manutea-wine-whisky-lounge" },
      { label: "In-Room Dining", href: "/dining/in-room-dining" },
    ],
  },
  {
    // Route name per the Step 10 brief; the three spaces are anchors on the
    // one page rather than routes, since each has a single approved
    // paragraph and nothing route-worthy of its own.
    label: "Lounges & Spaces",
    href: "/lounges-and-spaces",
    children: [
      { label: "Acropole Lounge", href: "/lounges-and-spaces#acropole-lounge" },
      { label: "Mehmed Pasha Lounge", href: "/lounges-and-spaces#mehmed-pasha-lounge" },
      { label: "Equatorial Gardens", href: "/lounges-and-spaces#equatorial-gardens" },
    ],
  },
  {
    // Routes per the Step 11 brief: a hub at /spa-and-wellness with the
    // three facilities as top-level slugs, each carrying its own search
    // intent ("best spa in Kampala", "gym membership Nakasero", "swimming
    // pool open to public Kampala").
    label: "Spa & Wellness",
    href: "/spa-and-wellness",
    children: [
      { label: "Swanky Spa", href: "/spa" },
      { label: "Emin Pasha Gym", href: "/gym" },
      { label: "Swimming Pool", href: "/swimming-pool" },
      { label: "Spa Etiquette", href: "/spa-etiquette" },
    ],
  },
  {
    label: "Meetings & Events",
    // Routes per the Step 12 brief — top-level slugs rather than nested,
    // matching how each is actually searched for.
    href: "/meetings-and-events",
    children: [
      { label: "Kudara Hall", href: "/kudara-hall" },
      { label: "Private Meeting Rooms", href: "/meeting-rooms" },
      { label: "Business Centre", href: "/business-centre" },
      { label: "Weddings & Celebrations", href: "/weddings" },
    ],
  },
  {
    label: "Experiences",
    href: "/experiences",
    children: [
      { label: "Airport Transfer", href: "/experiences/airport-transfer" },
      { label: "Emin Pasha CG Shop", href: "/experiences/cg-shop" },
    ],
  },
  { label: "Offers", href: "/offers" },
  {
    label: "Our Story",
    href: "/our-story",
    children: [
      { label: "The Hotel", href: "/our-story/the-hotel" },
      { label: "Emin Pasha — Our Namesake", href: "/our-story/emin-pasha" },
      // Q65: standalone route vs. merged section — pending; kept as its own
      // link until that's decided.
      {
        label: "Message from the General Manager",
        href: "/our-story/message-from-the-general-manager",
      },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const navigation: NavItem[] = raw.map((item) => navItemSchema.parse(item));

/**
 * The desktop header shows six entries, not all eleven — this is the exact
 * set drawn in the approved DESIGN_DIRECTION.md §C home wireframe
 * ("logo · Rooms · Dining · Spa · Events · Story · Contact"). Eleven
 * top-level links would not fit alongside the utility row and the BOOK NOW
 * CTA without wrapping. Everything omitted here is still reachable: from a
 * mega-menu panel, from the footer columns, and in full from the mobile
 * drawer, which renders `navigation` unabridged. Derived by href rather than
 * re-listed, so a label exists in exactly one place (CLAUDE.md §5.4).
 */
const HEADER_NAV_HREFS = [
  "/accommodation",
  "/dining",
  "/spa-and-wellness",
  "/meetings-and-events",
  "/our-story",
  "/contact",
] as const;

export const headerNavigation: NavItem[] = HEADER_NAV_HREFS.map((href) => {
  const item = navigation.find((navItem) => navItem.href === href);
  if (!item) {
    throw new Error(`headerNavigation: no navigation entry for "${href}"`);
  }
  return item;
});

/*
 * There was a hand-listed `megaMenuHrefs` here — the three sections that got a
 * desktop panel. It has been removed rather than derived, because it encoded a
 * fact that is already stated by the tree itself: a section has a panel when it
 * has children. As a separate list it silently drifted, and Spa & Wellness and
 * Our Story ended up with children the desktop bar could not reach at all.
 * `Header/headerData.ts` now builds a panel for every section with children,
 * and the bar shows a disclosure wherever it finds one (CLAUDE.md §5.4 — one
 * source per fact).
 */

/**
 * Resolves a label for an href — top-level entries first, then children — so
 * the footer and any other consumer can reference a route by href alone and
 * never restate its label.
 */
export function findNavItem(href: string): NavItem | undefined {
  const topLevel = navigation.find((item) => item.href === href);
  if (topLevel) {
    return topLevel;
  }
  for (const item of navigation) {
    const child = item.children?.find((candidate) => candidate.href === href);
    if (child) {
      return child;
    }
  }
  return undefined;
}

// TODO(EMIN-Q49): points at the enquiry-form fallback until the real YCS
// booking-engine deep link is captured — CLAUDE.md's confirmed decision is
// "enquiry fallback always present," so this is a working default, not a gap.
export const bookNowCta: NavItem = navItemSchema.parse({
  label: "Book Now",
  href: "/contact",
  isPersistentCta: true,
});
