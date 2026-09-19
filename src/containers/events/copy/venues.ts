/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { EVENT_TYPE, type EventTypeId } from "@/containers/events/anchors";

export type LayoutKey = "theatre" | "classroom" | "banquet" | "uShape" | "cabaret" | "reception";

export interface VenueEntry {
  id: string;
  name: string;
  /** Placeholder photo slot — resolved from `./media.ts`. */
  assetId: string;
  /** Internal deep link to the venue's own page, or `undefined` for the lawn. */
  href?: string;
  /** One-line hook. */
  blurb: string;
  /** Standout feature shown as a chip. */
  feature: string;
  /** Which occasions this room suits — drives the hub filter. */
  suits: EventTypeId[];
  /**
   * Indicative maximum by layout. **Invented** (TODO(EMIN-Q12)) — the source
   * has no capacity figure; every surface that renders these labels them
   * "indicative, confirmed on proposal".
   */
  capacities: Partial<Record<LayoutKey, number>>;
}

const { conference, meeting, wedding, launch, social } = EVENT_TYPE;

export const venues: VenueEntry[] = [
  {
    id: "kudara-hall",
    name: "Kudara Hall",
    assetId: "meetings-kudara-hall",
    href: "/kudara-hall",
    blurb: "The pillar-free main hall — plenary conferences by day, gala dinners by night.",
    feature: "Stage + full in-house AV",
    suits: [conference, launch, wedding, social],
    capacities: { theatre: 500, classroom: 260, banquet: 320, cabaret: 240, reception: 600 },
  },
  {
    id: "private-meeting-rooms",
    name: "Private Meeting Rooms",
    assetId: "meetings-private-rooms",
    href: "/meeting-rooms",
    blurb: "Three newly designed rooms for board sessions, breakouts and interviews.",
    feature: "Video-conference ready",
    suits: [meeting, conference, launch],
    capacities: { theatre: 60, classroom: 36, uShape: 28, banquet: 40, cabaret: 32 },
  },
  {
    id: "business-centre",
    name: "The Business Centre",
    assetId: "meetings-business-centre",
    href: "/business-centre",
    blurb: "Bookable office space and small meeting pods with dedicated staff.",
    feature: "Waiting-room video control",
    suits: [meeting],
    capacities: { uShape: 12, banquet: 14, theatre: 20 },
  },
  {
    id: "equatorial-gardens",
    name: "Equatorial Gardens",
    assetId: "weddings-equatorial-gardens",
    href: "/weddings",
    blurb: "Lawned gardens for ceremonies, outdoor launches and the city's best photographs.",
    feature: "Best outdoor picture spot in Kampala",
    suits: [wedding, launch, social],
    capacities: { theatre: 300, banquet: 220, reception: 400 },
  },
  {
    id: "poolside-lawn",
    name: "The Poolside Lawn",
    assetId: "meetings-poolside-lawn",
    blurb: "The pool terrace and lawn for after-parties, garden receptions and family days.",
    feature: "Licensed bar until late",
    suits: [wedding, social, launch],
    capacities: { banquet: 120, reception: 250, cabaret: 90 },
  },
];

export const LAYOUT_LABELS: Record<LayoutKey, string> = {
  theatre: "Theatre",
  classroom: "Classroom",
  banquet: "Banquet",
  uShape: "U-shape",
  cabaret: "Cabaret",
  reception: "Reception",
};

/** Column order for the capacity table. */
export const LAYOUT_ORDER: LayoutKey[] = [
  "theatre",
  "classroom",
  "banquet",
  "uShape",
  "cabaret",
  "reception",
];

export const capacitiesNote =
  "Capacities are indicative maximums and vary with staging, dance floors and AV. Exact figures for your layout are confirmed on proposal.";
