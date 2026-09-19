/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export interface AmenityCopy {
  icon: IconName;
  title: string;
  description: string;
}

/**
 * The four common inclusions from `content/rooms.ts`, plus the two facts the
 * approved intro line and `site.setting` already state about every room — the
 * garden outlook and the quiet. Framed, not invented.
 *
 * Each carries its own glyph rather than six copies of the same tick. A grid
 * of identical checks is a bulleted list that has been made harder to scan:
 * the icon column costs the same space either way, so it may as well be the
 * thing that tells wifi from breakfast at a glance.
 */
export const inRoomAmenities: AmenityCopy[] = [
  {
    icon: "wifi",
    title: "Fast unlimited fibre",
    description:
      "A secure cabled and Wi-Fi network in every room — no caps, no vouchers, no daily fee.",
  },
  {
    icon: "support-agent",
    title: "24/7 room service",
    description: "Round-the-clock, from a Special-Select In-Room Dining Menu.",
  },
  {
    icon: "breakfast",
    title: "À la carte breakfast",
    description:
      "Cooked to order with a bespoke service offering — the way you like it, not a buffet tray.",
  },
  {
    icon: "key",
    title: "In-room safe",
    description: "For a laptop, a passport and anything else you would rather not carry.",
  },
  {
    icon: "garden",
    title: "A window onto the gardens",
    description: "The landscaped grounds outside the glass, and birdsong instead of traffic.",
  },
  {
    icon: "bedtime",
    title: "The quiet of Nakasero",
    description:
      "The greenest, calmest of Kampala's central hills — a genuine buffer from the city.",
  },
];

/** The wider property, from `content/site.ts` feature tiles and `content/faq.ts`. */
export const estateAmenities: AmenityCopy[] = [
  {
    icon: "spa",
    title: "Swanky Spa",
    description:
      "Turkish bath, tailored massage and deep sea-salt treatments, daily 7am–9pm. Adults 16+.",
  },
  {
    icon: "pool",
    title: "300ft garden pool",
    description: "An ultra-modern pool in lush tropical gardens, open to guests and the public.",
  },
  {
    icon: "restaurant",
    title: "Three restaurants, two bars",
    description: "Asian, European and African influences, plus a rooftop terrace over the gardens.",
  },
  {
    icon: "celebration",
    title: "Kudara Hall & Equatorial Gardens",
    description:
      "Conferences, board meetings, weddings and celebrations, with an F&B team on site.",
  },
  {
    icon: "directions",
    title: "Chauffeured airport transfer",
    description: "Flight-monitored both ways, and complimentary on stays of more than one week.",
  },
  {
    icon: "auto-stories",
    title: "The Emin Pasha CG Shop",
    description: "Authentic Ugandan art and décor, in the hotel named for a naturalist.",
  },
];
