/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { ReceptionService } from "@/containers/reception/types";

/**
 * Arrival, departure and concierge.
 *
 * Every `approvedSource: true` entry restates a fact that already exists in
 * `@/content/policies` or `@/content/faq` — the times, the early/late terms.
 * Those sentences are paraphrases of approved copy and must move if the
 * approved copy moves; the rest of this file is invented and may be rewritten
 * freely. The split is marked per entry rather than per file because the two
 * kinds genuinely interleave inside one group.
 */
export const stayServices: ReceptionService[] = [
  {
    id: "check-in-out",
    group: "arrival",
    title: "Check-in & check-out",
    description:
      "Check-in from 14h00, check-out strictly by 10h00. You are greeted at the desk on arrival, and an email reaches you before you travel.",
    icon: "key",
    href: "/faq#check-in-check-out-times",
    linkLabel: "Arrival details",
    approvedSource: true,
  },
  {
    id: "early-check-in",
    group: "arrival",
    title: "Early check-in",
    description:
      "On request, and not guaranteed when the hotel is full. To hold it outright, book the room from the night before at the full daily rate.",
    icon: "schedule",
    approvedSource: true,
  },
  {
    id: "late-check-out",
    group: "arrival",
    title: "Late check-out",
    description:
      "Booked at the desk on the morning you leave: half the daily rate until 18h00, the full rate beyond it, always subject to availability.",
    icon: "check-out",
    approvedSource: true,
  },
  {
    id: "luggage",
    group: "arrival",
    title: "Luggage storage",
    description:
      "Bags held before your room is ready and after you check out, so a late flight does not cost you the day.",
    icon: "luggage",
  },
  {
    id: "tables-treatments",
    group: "concierge",
    title: "Tables & treatments",
    description:
      "A table at Equatoria or the Rooftop Terrace, a treatment at the spa, a lounge held for the evening — booked without you making a second call.",
    icon: "restaurant",
    href: "/dining",
    linkLabel: "See the restaurants",
  },
  {
    id: "excursions",
    group: "concierge",
    title: "Tours & excursions",
    description:
      "Day trips and upcountry excursions arranged through the desk, timed around your meetings rather than around a tour schedule.",
    icon: "tour",
    href: "/experiences",
    linkLabel: "Browse experiences",
  },
  {
    id: "city-guidance",
    group: "concierge",
    title: "Kampala, explained",
    description:
      "Where to eat, what is worth the traffic, and how long Nakasero to anywhere actually takes at that hour of the day.",
    icon: "city-map",
  },
  {
    id: "event-enquiries",
    group: "concierge",
    title: "Meetings & events",
    description:
      "A boardroom for the morning or the Kudara Hall for two hundred — the desk takes the first enquiry and hands it to the events team.",
    icon: "groups",
    href: "/meetings-and-events",
    linkLabel: "Plan an event",
  },
];
