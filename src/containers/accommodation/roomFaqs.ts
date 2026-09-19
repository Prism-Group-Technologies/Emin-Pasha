import { faqItems } from "@/content/faq";

/**
 * The subset of the approved §15 FAQ that a room booker actually asks —
 * check-in and check-out, breakfast, Wi-Fi, children and cancellation.
 *
 * One list, two call sites: the hub's `FaqSection` and the room page's
 * `RoomPolicies`. It lived in the hub organism until the room page needed it
 * too, and two hand-maintained copies of "which questions matter here" is how
 * the two pages end up quietly answering different ones.
 *
 * Filtered from the governed content layer rather than transcribed, so a
 * question edited or withdrawn in `content/faq.ts` is edited or withdrawn on
 * both pages — and an id that disappears simply drops out instead of
 * rendering an empty accordion row.
 */
const ROOM_FAQ_IDS = [
  "check-in-check-out-times",
  "breakfast-included",
  "wifi",
  "children-welcome",
  "cancellation-policy",
];

export const roomFaqs = faqItems.filter((item) => ROOM_FAQ_IDS.includes(item.id));
