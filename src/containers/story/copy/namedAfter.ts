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
 * `containers/story/constants.ts` `TIMELINE_LINKS` map — Ismail Hakki Pasha
 * (the Albania chapter), the name "Mehemet Emin" taken in Khartoum, and
 * Equatoria itself. Only `blurb` is invented, and it promises nothing.
 */
export const namedAfter: NamedAfterLink[] = [
  {
    id: "hakki-pasha",
    name: "Hakki Pasha Restaurant & Bar",
    href: "/dining/hakki-pasha-restaurant-bar",
    from: "Ismail Hakki Pasha, whom Emin served in northern Albania",
    blurb: "The all-day room — breakfast to a nightcap, with the bar the locals actually use.",
  },
  {
    id: "sir-samuel-baker",
    name: "Sir Samuel Baker Fine Dining",
    href: "/dining/sir-samuel-baker-fine-dining",
    from: "the explorer whose path through Equatoria preceded Emin's",
    blurb: "The tasting room — a set menu, low light, and the kitchen at its most deliberate.",
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
