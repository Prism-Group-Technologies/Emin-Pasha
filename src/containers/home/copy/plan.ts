/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Every other string on this site comes from `src/content/*`, which is a
 * verbatim transcription of docs/02_CONTENT_SOURCE_OF_TRUTH.md and is guarded
 * by `yarn check:content`. Nothing in this folder is from that source: it was
 * written to give the homepage the conversion surfaces the approved copy deck
 * never supplied (a trust strip, segmented lead paths, a book-direct argument,
 * section ledes and CTAs).
 *
 * It lives here — colocated with the homepage, outside `src/content` — on
 * purpose. `check:content` only scans the governed content layer, so this
 * cannot masquerade as approved copy, and promoting any of it later is a
 * deliberate move into `src/content/site.ts` after sign-off, not an accident.
 *
 * Every factual claim is traceable to already-approved content: rates from
 * `content/rooms.ts`, the pool/outlet counts and spa hours from
 * `site.positioning.elevatorPitch` and `site.homepage.featureTiles`, the
 * Nakasero positioning from `site.setting`, fibre/room-service/breakfast from
 * `rooms.commonInclusions`. Nothing here invents a fact — only the framing.
 *
 * TODO(EMIN-COPY): client sign-off, then migrate approved items into
 * `src/content/site.ts` under `homepage`.
 */

export interface PlanPathCopy {
  id: "stay" | "celebrate" | "in-the-city";
  /** Tab label. Short — it has to survive a 360px viewport. */
  tab: string;
  eyebrow: string;
  headline: string;
  body: string;
  /** Three concrete reasons to act, not adjectives. */
  points: string[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

/**
 * The homepage's conversion centrepiece. Three lead paths, one panel at a
 * time, because the three audiences this property sells to want completely
 * different things and a single blended CTA serves none of them well:
 * the overnight guest (booking), the event buyer (a proposal), and the
 * Kampala local (a table, a treatment, a Friday night).
 */
export const planPaths: PlanPathCopy[] = [
  {
    id: "stay",
    tab: "Stay the night",
    eyebrow: "§ FOR THE TRAVELLER",
    headline: "A garden estate, minutes from every meeting you came for",
    body: "Four room and suite categories set around landscaped grounds in Nakasero — close enough to the business district to walk to a breakfast meeting, quiet enough that you'll forget the city is there.",
    points: [
      "Rates from UGX 250,000 per night, breakfast included",
      "Unlimited fibre on a secure cabled and Wi-Fi network",
      "24/7 room service and airport transfer on request",
    ],
    primary: { label: "Check Availability", href: "/contact" },
    secondary: { label: "View Rooms & Rates", href: "/accommodation" },
  },
  {
    id: "celebrate",
    tab: "Host an event",
    eyebrow: "§ FOR THE ORGANISER",
    headline: "Kudara Hall, the Equatorial Gardens, and rooms for everyone who stays late",
    body: "Conferences, launches, board meetings and weddings in spaces that photograph as well as they function — with a dedicated F&B team and accommodation on the same grounds.",
    points: [
      "Indoor hall and garden ceremony space on one estate",
      "Dedicated events and food-and-beverage team",
      "Group room blocks and LPO billing for corporates",
    ],
    primary: { label: "Request a Proposal", href: "/contact" },
    secondary: { label: "Plan Your Event", href: "/meetings-and-events" },
  },
  {
    id: "in-the-city",
    tab: "Spend the day",
    eyebrow: "§ FOR KAMPALA",
    headline: "You don't have to check in to spend the day here",
    body: "The pool, the spa, the gym, the restaurants and Friday Band Night are open to the city — a standing invitation to the quietest garden on Nakasero hill.",
    points: [
      "300ft pool and gardens, open to the public",
      "Turkish bath, tailored massage and sea-salt treatments daily",
      "Three restaurants, two bars and a rooftop terrace",
    ],
    primary: { label: "Book a Treatment", href: "/contact" },
    secondary: { label: "See What's On", href: "/offers" },
  },
];

export const planSection = {
  eyebrow: "§ PLAN YOUR VISIT",
  heading: "Three ways in",
  description:
    "Tell us which one you are and we'll get out of your way. Every path below ends in a real person, usually within the working day.",
};
