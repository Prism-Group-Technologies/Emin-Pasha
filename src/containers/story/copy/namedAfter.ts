/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface NamedAfterLink {
  id: string;
  /** The space at the hotel. */
  name: string;
  href: string;
  /** Who or what in the account it takes its name from — drawn from the record. */
  from: string;
  /** Invented one-line nudge to visit it. */
  blurb: string;
}

/**
 * The internal-linking spine, as a card band. The names and the "from"
 * attributions come straight from `content/story.ts` and the existing
 * `containers/story/constants.ts` `TIMELINE_LINKS` map. Only `blurb` is
 * invented, and it promises nothing.
 */
export const namedAfter: NamedAfterLink[] = [
  {
    id: "equatoria",
    name: "Equatoria",
    href: "/dining/equatoria-restaurant-bar",
    from: "the historic province Emin served and later governed",
    blurb: "A contemporary table inspired by Uganda's place in the wider Equatorial region.",
  },
  {
    id: "mehmed-pasha-lounge",
    name: "Mehmed Pasha Lounge",
    href: "/lounges-and-spaces#mehmed-pasha-lounge",
    from: "the name Emin took in Khartoum — Mehemet Emin",
    blurb: "The sitting room of the house: coffee in the afternoon, a quiet corner to work.",
  },
  {
    id: "equatorial-gardens",
    name: "Equatorial Gardens",
    href: "/lounges-and-spaces#equatorial-gardens",
    from: "Equatoria, the province Emin governed",
    blurb: "The green heart of the plot — where the pool, the shade and the long lunches are.",
  },
];
