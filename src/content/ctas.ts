import { type Cta, ctaSchema } from "@/schemas/content/cta";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §12.7 — the approved CTA library.
 * Contexts with two approved labels get two entries. `href` values are the
 * enquiry/internal-route fallback per context; real booking-engine deep
 * links are TODO(EMIN-Q49)/TODO(EMIN-Q50).
 */
const raw: Cta[] = [
  {
    id: "primary-booking-book-your-stay",
    context: "Primary booking",
    label: "Book Your Stay",
    href: "/contact",
  },
  {
    id: "primary-booking-check-availability",
    context: "Primary booking",
    label: "Check Availability",
    href: "/contact",
  },
  { id: "rooms-view", context: "Rooms", label: "View Rooms & Rates", href: "/accommodation" },
  { id: "rooms-reserve", context: "Rooms", label: "Reserve This Room", href: "/contact" },
  { id: "dining-reserve", context: "Dining", label: "Reserve a Table", href: "/contact" },
  { id: "dining-menu", context: "Dining", label: "View the Menu" },
  { id: "spa-treatment", context: "Spa", label: "Book a Treatment", href: "/contact" },
  { id: "spa-day", context: "Spa", label: "Plan Your Spa Day", href: "/contact" },
  { id: "gym-membership", context: "Gym", label: "Enquire About Membership", href: "/contact" },
  { id: "events-proposal", context: "Events", label: "Request a Proposal", href: "/contact" },
  { id: "events-plan", context: "Events", label: "Plan Your Event", href: "/contact" },
  {
    id: "weddings-site-visit",
    context: "Weddings",
    label: "Arrange a Site Visit",
    href: "/contact",
  },
  { id: "transfer-arrange", context: "Transfer", label: "Arrange Your Transfer", href: "/contact" },
  { id: "story-read", context: "Story", label: "Read Our History", href: "/our-story/emin-pasha" },
  // TODO(EMIN-Q14): newsletter platform/mechanism not confirmed — label is
  // approved copy, but this CTA has no working destination yet.
  { id: "newsletter-join", context: "Newsletter", label: "Join the Emin Pasha List" },
];

export const ctas: Cta[] = raw.map((cta) => ctaSchema.parse(cta));

export const ctaRule =
  "One primary CTA per page, at most one secondary. The booking button is persistent and sticky sitewide.";
