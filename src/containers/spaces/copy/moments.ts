/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface Moment {
  id: string;
  title: string;
  where: string;
  detail: string;
  assetId: string;
  /** The lead tile spans two rows on the bento grid. */
  lead?: boolean;
}

/** The "moments we host" bento — occasions, not packages. */
export const moments: Moment[] = [
  {
    id: "proposals",
    title: "Proposals",
    where: "A fireside alcove",
    detail: "Rose petals, a ring on the tray and a photographer hidden by the fountain.",
    assetId: "spaces-moment-proposal",
    lead: true,
  },
  {
    id: "launches",
    title: "Book & brand launches",
    where: "Acropole Lounge",
    detail: "Readings by the fire and a cocktail named for the launch.",
    assetId: "spaces-moment-launch",
  },
  {
    id: "receptions",
    title: "Diplomatic receptions",
    where: "Equatorial Gardens",
    detail: "Nakasero's embassy quarter is minutes away; the lawn is ready for flags.",
    assetId: "spaces-moment-reception",
  },
  {
    id: "birthdays",
    title: "Milestone birthdays",
    where: "Mehmed Pasha Lounge",
    detail: "Long tables on the terrace and a cake that arrives with the band.",
    assetId: "spaces-moment-birthday",
  },
  {
    id: "pre-wedding",
    title: "Pre-wedding shoots",
    where: "The picture walk",
    detail: "Golden hour on the city's best outdoor picture spot.",
    assetId: "spaces-moment-prewedding",
  },
];
