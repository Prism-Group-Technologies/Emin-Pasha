/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";
import { ENQUIRE_ANCHOR_ID, EVENT_TYPE, type EventTypeId } from "@/containers/events/anchors";

export interface EventTypeCard {
  id: EventTypeId;
  /** The `eventType` value pre-selected on the RFP form when this card is used. */
  rfpValue: "wedding" | "conference" | "meeting" | "launch" | "other";
  icon: IconName;
  title: string;
  /** One-line hook. */
  blurb: string;
  /** Two or three concrete draws for this occasion. */
  points: string[];
  /** Where the card routes — the RFP anchor, occasion carried in the query is TODO. */
  ctaHref: string;
  ctaLabel: string;
}

/**
 * The five occasions the events desk plans most. Every draw maps onto an
 * approved §5/§7 space or amenity (Kudara Hall, the meeting rooms, the
 * gardens, three restaurants, secure parking, on-site rooms); the numbers
 * that appear are the invented indicative capacities from `venues.ts` and are
 * labelled as such wherever they render.
 */
export const eventTypeCards: EventTypeCard[] = [
  {
    id: EVENT_TYPE.conference,
    rfpValue: "conference",
    icon: "groups",
    title: "Conferences & AGMs",
    blurb: "Kudara Hall, pillar-free, up to 500 theatre-style with a stage and full AV.",
    points: [
      "Plenary in Kudara Hall, breakouts in the meeting rooms",
      "In-house AV, stage set and a technician on the day",
      "Catering from three kitchens — no external caterer markup",
    ],
    ctaHref: `#${ENQUIRE_ANCHOR_ID}`,
    ctaLabel: "Brief us on the conference",
  },
  {
    id: EVENT_TYPE.meeting,
    rfpValue: "meeting",
    icon: "verified",
    title: "Board & private meetings",
    blurb: "Newly designed private rooms for 8–40, cutting-edge tech, a dedicated F&B team.",
    points: [
      "Boardroom, U-shape or cabaret, reset between sessions",
      "Video-conference kit with waiting-room control",
      "A private dinner in one of the restaurants to close the day",
    ],
    ctaHref: `#${ENQUIRE_ANCHOR_ID}`,
    ctaLabel: "Brief us on the meeting",
  },
  {
    id: EVENT_TYPE.wedding,
    rfpValue: "wedding",
    icon: "celebration",
    title: "Weddings & receptions",
    blurb: "Ceremony in the Equatorial Gardens, dinner in the hall, the after-party poolside.",
    points: [
      "The best outdoor picture spot in the city",
      "One wedding a day — the estate is yours",
      "Bridal suite and room block for guests on site",
    ],
    ctaHref: `#${ENQUIRE_ANCHOR_ID}`,
    ctaLabel: "Start the wedding enquiry",
  },
  {
    id: EVENT_TYPE.launch,
    rfpValue: "launch",
    icon: "auto-awesome",
    title: "Launches & corporate functions",
    blurb: "Product reveals, press briefings and award nights across hall, rooftop and gardens.",
    points: [
      "Branded arrival, roaming canapés, a stage moment",
      "Rooftop over Kampala for the drinks reception",
      "Secure parking and a discreet green room",
    ],
    ctaHref: `#${ENQUIRE_ANCHOR_ID}`,
    ctaLabel: "Brief us on the launch",
  },
  {
    id: EVENT_TYPE.social,
    rfpValue: "other",
    icon: "gift",
    title: "Private celebrations",
    blurb: "Milestone birthdays, anniversaries, christenings and family gatherings.",
    points: [
      "Private dining rooms for 10–60",
      "Poolside lawn for a garden party",
      "A menu built around the occasion with the chef",
    ],
    ctaHref: `#${ENQUIRE_ANCHOR_ID}`,
    ctaLabel: "Tell us about the occasion",
  },
];
