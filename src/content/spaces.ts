import { type Space, spaceSchema } from "@/schemas/content/space";

/** Lounges & signature spaces — docs/02_CONTENT_SOURCE_OF_TRUTH.md §5. */
const raw: Space[] = [
  {
    id: "acropole-lounge",
    name: "Acropole Lounge",
    description:
      "An oasis of elegance nestled within the heart of the hotel; modern design merged with timeless charm; soft lighting over plush furnishings; a harmonious blend of contemporary elements and classic accents. Retrofitted to exude a collage of vintage rustic and modern contemporary experiences, with seating for every mood: by the fireplace (sumptuous armchairs and cosy couches, intimate conversation, a glass of fine wine, the astounding fountain); at the bar (skilled mixologists, artisanal cocktails); in the alcoves (secluded, for solitude or discreet business discussion).",
  },
  {
    id: "mehmed-pasha-lounge",
    name: "Mehmed Pasha Lounge",
    description:
      "Spectacularly located, with a scenic view directly onto the lustrous gardens and their diverse flora; the ultimate destination for the individual who wants to close out clutter and be in sync with their mind and thoughts; outdoor and indoor seating.",
    namedForNote: 'Named for "Mehemet Emin" — the name Emin Pasha took in Khartoum.',
  },
  {
    id: "equatorial-gardens",
    name: "Equatorial Gardens",
    description:
      "Lush greenery, a haven of tranquillity amidst the bustling city; picturesque landscapes, fresh air, inner peace; the perfect outdoor event space — and the best outdoor picture spot in the city.",
  },
];

export const spaces: Space[] = raw.map((space) => spaceSchema.parse(space));
