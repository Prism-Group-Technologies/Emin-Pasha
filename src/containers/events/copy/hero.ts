/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { ENQUIRE_ANCHOR_ID, VENUES_ANCHOR_ID } from "@/containers/events/anchors";

/**
 * The above-the-fold pitch for the Meetings & Events hub.
 *
 * Traceability: "one address" for venue + catering + rooms + parking is the
 * approved §7 argument (`meetingsPageIntro`); Kudara Hall, the private
 * meeting rooms, the business centre and the Equatorial Gardens are all
 * approved §5/§7 spaces; "three restaurants" and "secure parking" are
 * approved §7 amenities. The figures on the rail restate those — the "500",
 * the "5 venues" split and the delegate rate are invented (TODO(EMIN-Q12))
 * and never rendered as a hard promise.
 */
export const heroCopy = {
  eyebrow: "§ MEETINGS & EVENTS",
  headline: "One address for the whole event",
  lede: "Kudara Hall for the conference, private rooms for the board, the Equatorial Gardens for the reception — with three restaurants for catering, secure parking and rooms upstairs when the day runs long. Nakasero, ten minutes from the CBD.",
  primaryCta: { label: "Request a proposal", href: `#${ENQUIRE_ANCHOR_ID}` },
  secondaryCta: { label: "See the venues", href: `#${VENUES_ANCHOR_ID}` },
  stats: [
    { value: "5", label: "venues, one estate" },
    { value: "500", label: "guests, theatre-style" },
    { value: "20", label: "on-site rooms & suites" },
    { value: "One team", label: "from brief to breakdown" },
  ],
};
