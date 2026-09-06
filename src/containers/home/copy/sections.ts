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

export interface BenefitCopy {
  title: string;
  description: string;
}

/**
 * The book-direct argument. Standard practice for an independent property
 * competing against OTA listings of itself: state the advantage explicitly
 * rather than assuming a guest infers it.
 */
export const bookDirect = {
  eyebrow: "§ BOOK DIRECT",
  heading: "Better to book with us than about us",
  description:
    "We are independently owned. Booking direct means you're talking to the people who will actually meet you at the door.",
  benefits: [
    {
      title: "The real rate",
      description:
        "Rates published in UGX, breakfast included, with no commission built in on your behalf.",
    },
    {
      title: "A person, not a portal",
      description:
        "Reservations answer by phone, WhatsApp and email — and can hold a room while you confirm your dates.",
    },
    {
      title: "Requests that survive",
      description:
        "Early arrival, a quiet wing, a garden view, a dietary need: tell us once and it reaches housekeeping and the kitchen.",
    },
    {
      title: "Flexible on the details",
      description:
        "Extended stays, late checkout and airport transfer are arranged directly rather than through a third party's rules.",
    },
  ] satisfies BenefitCopy[],
};

export const roomsSection = {
  eyebrow: "§ ROOMS & RATES",
  heading: "Four ways to stay",
  description:
    "Every room and suite opens onto the gardens and comes with fibre, 24/7 room service and an à la carte breakfast. Rates are per night, in Ugandan shillings, with nothing hidden behind a final step.",
  action: { label: "View Rooms & Rates", href: "/accommodation" },
  /** Per-room one-liners, keyed to `content/rooms.ts` ids. */
  taglines: {
    "superior-room": "Our largest standard room — the corporate and diplomatic default.",
    "garden-room": "Doors onto the landscaped grounds. The one guests ask for again.",
    "garden-suites": "A separate living space, for families and stays measured in weeks.",
    "superior-suites": "A private lounge area for executives who work where they sleep.",
  } as Record<string, string>,
  rateNote: "per night",
  fromLabel: "from",
  /** Matches the approved `rooms-reserve` CTA label in `content/ctas.ts`. */
  reserveLabel: "Reserve This Room",
};

export const offersSection = {
  /** Per-offer CTA, keyed by `content/offers.ts` id, with a shared fallback. */
  offerCtas: {
    "friday-band-night": "Reserve a table",
    "equatorial-sunset-happy-hour": "Plan your evening",
  } as Record<string, string>,
  offerCtaFallback: "Enquire",
  offerCtaHref: "/contact",
  description:
    "Standing invitations, open to guests and to the city alike. No booking fee, no minimum spend — just turn up, or tell us you're coming.",
  action: { label: "See all offers", href: "/offers" },
};

export const socialProofSection = {
  eyebrow: "§ IN THEIR WORDS",
  heading: "What guests actually say",
  description:
    "Unedited, attributed, and dated. Three of them — because three real reviews are worth more than a wall of stars.",
};

export const featureSection = {
  eyebrow: "§ THE ESTATE",
  heading: "Six reasons people come back",
  description:
    "Rooms, restaurants, a spa, a pool, event spaces and a story worth the detour — all inside one walled garden in the middle of the capital.",
};

export const locationSection = {
  description:
    "Five minutes from the business district, and completely out of earshot of it. Enclosed, gardened and quiet — a genuine buffer from the city rather than a hotel that simply sits inside it.",
};

export const closingSection = {
  eyebrow: "§ THE LAST STEP",
  supporting:
    "Call, message or send us your dates. Reservations reply the same working day — and if you'd rather see it first, the gate is open.",
  whatsappLabel: "Message on WhatsApp",
  callLabel: "Call reservations",
};
