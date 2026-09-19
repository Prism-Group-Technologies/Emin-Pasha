/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export type CalendarStatus = "open" | "soon";

export interface CalendarEntry {
  id: string;
  /** Short month marker, e.g. "OCT 2026". */
  month: string;
  /** The date or window, e.g. "9 October". */
  when: string;
  title: string;
  description: string;
  icon: IconName;
  /** `open` links to a WhatsApp claim; `soon` links to the alerts sign-up. */
  status: CalendarStatus;
  /** Status pill copy, e.g. "Booking now" or "Opens 1 Jan". */
  statusLabel: string;
}

/**
 * The seasonal calendar. The public holidays are real Ugandan dates
 * (Independence Day 9 Oct, Christmas, New Year, Easter 28 Mar 2027,
 * Martyrs' Day 3 Jun and Heroes' Day 9 Jun); the packages and their opening
 * dates are invented placeholders — TODO(EMIN-COPY).
 */
export const seasonalCalendar: CalendarEntry[] = [
  {
    id: "independence-weekend",
    month: "OCT 2026",
    when: "9 – 11 October",
    title: "Independence Long Weekend",
    description: "Three nights for the price of two, with a garden barbecue on the 9th.",
    icon: "celebration",
    status: "open",
    statusLabel: "Booking now",
  },
  {
    id: "christmas",
    month: "DEC 2026",
    when: "24 – 26 December",
    title: "Christmas in the Gardens",
    description: "Candlelit Christmas Eve dinner, carols and a long family lunch.",
    icon: "gift",
    status: "open",
    statusLabel: "Booking now",
  },
  {
    id: "new-year",
    month: "DEC 2026",
    when: "31 December",
    title: "New Year's Eve Garden Gala",
    description: "Gala dinner, a live band and the countdown under the stars.",
    icon: "auto-awesome",
    status: "open",
    statusLabel: "Early-bird",
  },
  {
    id: "valentines",
    month: "FEB 2027",
    when: "12 – 14 February",
    title: "Valentine's on the Equator",
    description: "A suite, a couples ritual at the spa and a private dinner in the garden.",
    icon: "spa",
    status: "soon",
    statusLabel: "Opens 1 Jan",
  },
  {
    id: "easter",
    month: "MAR 2027",
    when: "26 – 29 March",
    title: "Easter Family Weekend",
    description: "Family rooms, an egg hunt in the gardens and Easter Sunday brunch.",
    icon: "groups",
    status: "soon",
    statusLabel: "Opens 1 Feb",
  },
  {
    id: "june-heroes",
    month: "JUN 2027",
    when: "3 – 9 June",
    title: "Martyrs' & Heroes' Week",
    description: "Midweek stay-and-spa rates across both June public holidays.",
    icon: "king-bed",
    status: "soon",
    statusLabel: "Opens 1 Apr",
  },
];
