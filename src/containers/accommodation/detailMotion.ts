import { type RevealDirection, alternatingDirection } from "@/theme/motion";

/**
 * The room-detail page's scroll choreography, in scroll order — the same
 * lookup-table pattern as `motion.ts` for the hub.
 *
 * Section organisms do not choose their own reveal direction: which side a
 * band enters from is a fact about where it sits on the page, so the order
 * lives here once and the container hands each section its direction. The
 * hero is absent on purpose — it is above the fold, so a reveal keyed to
 * entering the viewport has nothing to animate.
 */
const SCROLL_ORDER = [
  "gallery",
  "body",
  "inclusions",
  "policies",
  "packages",
  "guestVoices",
  "otherRooms",
  "related",
  "closing",
] as const;

export type RoomDetailSectionId = (typeof SCROLL_ORDER)[number];

export const roomDetailMotion = Object.fromEntries(
  SCROLL_ORDER.map((id, index) => [id, alternatingDirection(index)]),
) as Record<RoomDetailSectionId, RevealDirection>;
