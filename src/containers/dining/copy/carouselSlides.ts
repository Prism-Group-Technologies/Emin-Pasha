/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * The carousel frames for each outlet, as `[slotId, altText]` pairs.
 *
 * A tuple rather than an object per frame because every field but these two is
 * identical across all twenty-six slots — same page, same kind, same 3:2 box,
 * same priority — and twenty-six copies of that boilerplate would bury the one
 * thing a reviewer actually needs to read. `carousels.ts` expands them.
 *
 * `subject` is not carried separately: for a delivered frame the shooting
 * brief and the description of what is in it are the same sentence, and
 * keeping two would let them drift.
 *
 * Order is display order, and it is composed rather than arbitrary — each list
 * opens on the widest view of the room, moves through the detail, and ends
 * somewhere that implies the next part of the evening.
 */
export type SlideSeed = readonly [id: string, altText: string];

export const equatoriaSlides: SlideSeed[] = [
  [
    "dining-equatoria-slide-room",
    "Equatoria's vaulted dining room, white linen and dark-red chairs",
  ],
  [
    "dining-equatoria-slide-length",
    "The full length of Equatoria's dining room, service counter at the far end",
  ],
  [
    "dining-equatoria-slide-open-side",
    "Equatoria's tables along the open side, under the tree canopy",
  ],
  ["dining-equatoria-slide-pergola", "Tables under Equatoria's pergola, the garden beyond"],
  [
    "dining-equatoria-slide-garden-edge",
    "A laid four-top at Equatoria's garden edge, flagstone terrace beyond",
  ],
  ["dining-equatoria-slide-colonnade", "Through Equatoria's open colonnade to the garden terrace"],
  ["dining-equatoria-slide-rockery", "Across Equatoria's dining room to the planted rockery"],
  ["dining-equatoria-slide-kitchen", "Down Equatoria's dining room to the lit kitchen counter"],
  [
    "dining-equatoria-slide-corner",
    "Equatoria's dining room from the far corner, planting to one side",
  ],
  ["dining-equatoria-slide-star-fruit", "Equatoria's tables beneath the star-fruit tree"],
  ["dining-equatoria-slide-bar", "Equatoria's dining room with the bar and raised stage beyond"],
];

export const manuteaSlides: SlideSeed[] = [
  ["dining-manutea-slide-bar", "The Manutea bar head-on, its bottle wall lit behind"],
  [
    "dining-manutea-slide-shelves",
    "Manutea's back bar: whisky, gin and wine beneath hanging glassware",
  ],
  ["dining-manutea-slide-service", "A bartender at Manutea's back bar among the spirits"],
  [
    "dining-manutea-slide-side",
    "Manutea's bar from the side, a bartender reaching to the top shelf",
  ],
];

export const rooftopSlides: SlideSeed[] = [
  ["dining-rooftop-slide-night", "The Rooftop Terrace at night, a parasol and a lamplit table"],
  ["dining-rooftop-slide-day", "The Rooftop Terrace by day, tables under the balustrade"],
  ["dining-rooftop-slide-veranda", "The terrace veranda laid with white-linen tables"],
  ["dining-rooftop-slide-setting", "A table setting on the terrace, glassware and folded linen"],
  ["dining-rooftop-slide-cocktails", "Cocktails on a timber table, the garden behind"],
];

export const inRoomSlides: SlideSeed[] = [
  ["dining-in-room-slide-tray", "An in-room dining tray set on the desk, the bed beyond"],
  ["dining-in-room-slide-detail", "Close on an in-room tray: cutlery, linen and a covered plate"],
];
