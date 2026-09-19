/**
 * In-page anchor ids and the event-type union for the Meetings & Events pages
 * — deliberately **import-free**, the same split `containers/dining/anchors.ts`
 * and `containers/wellness/anchors.ts` make. The events client islands (the
 * venue filter, the sticky CTA bar) need these values, and pulling in the
 * Zod-validated content layer to get them would drag it into a client bundle
 * (DECISIONS.md D25).
 */

/** Lead-capture surface — every on-page "enquire" / "request a proposal" CTA points here. */
export const ENQUIRE_ANCHOR_ID = "enquire";

/** The venue directory / filterable capacity grid. */
export const VENUES_ANCHOR_ID = "venues";

/** The delegate-package band. */
export const PACKAGES_ANCHOR_ID = "packages";

/** The "how planning works" band. */
export const PROCESS_ANCHOR_ID = "how-it-works";

/**
 * The five event types as named literals, so the invented `copy/` layer can
 * key its type cards, venue tags and package fits against a typed union. The
 * values match the `rfpEventTypes` enum in `schemas/rfp.ts`.
 */
export const EVENT_TYPE = {
  wedding: "wedding",
  conference: "conference",
  meeting: "meeting",
  launch: "launch",
  social: "social",
} as const;

export type EventTypeId = (typeof EVENT_TYPE)[keyof typeof EVENT_TYPE];

/** Display / scroll order for the event-type selector, so cross-links stay in sync. */
export const EVENT_TYPE_ORDER: EventTypeId[] = [
  EVENT_TYPE.conference,
  EVENT_TYPE.meeting,
  EVENT_TYPE.wedding,
  EVENT_TYPE.launch,
  EVENT_TYPE.social,
];
