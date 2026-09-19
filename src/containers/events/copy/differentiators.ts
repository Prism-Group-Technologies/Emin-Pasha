/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export interface Differentiator {
  id: string;
  icon: IconName;
  title: string;
  body: string;
}

/**
 * Why organisers rebook. Each point ties back to an approved §7 fact — one
 * estate for venue, catering and rooms; three restaurants; the Equatorial
 * Gardens; secure parking; Nakasero location; a dedicated F&B team — framed
 * as a buying reason rather than a feature list.
 */
export const differentiators: Differentiator[] = [
  {
    id: "one-address",
    icon: "location",
    title: "One address, every part of the event",
    body: "Venue, catering, rooms, parking and the after-party on a single contract. Nothing is sub-contracted, so nothing falls between two suppliers.",
  },
  {
    id: "kitchens",
    icon: "restaurant",
    title: "Three kitchens, no external caterer",
    body: "Asian, European and African menus from the hotel's own restaurants — tastings on site, dietary requirements handled, no caterer's mark-up on top.",
  },
  {
    id: "one-planner",
    icon: "verified",
    title: "One planner, brief to breakdown",
    body: "The person who quotes your event runs it on the day. You are never handed to an 'operations team' after signing.",
  },
  {
    id: "gardens",
    icon: "celebration",
    title: "Gardens in the middle of the city",
    body: "The Equatorial Gardens — lawned, private, and the best outdoor picture spot in Kampala — ten minutes from the CBD, not an hour down a marram road.",
  },
  {
    id: "stay-over",
    icon: "king-bed",
    title: "Rooms upstairs when the day runs long",
    body: "Delegate blocks, a bridal suite and late checkout on the same estate — speakers and the top table are not driving across town at midnight.",
  },
  {
    id: "parking",
    icon: "directions",
    title: "Secure parking and a discreet arrival",
    body: "Gated parking, a separate event entrance and a green room off the hall — for a minister, a keynote or a nervous bride.",
  },
];
