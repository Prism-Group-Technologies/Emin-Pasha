import { type Space, spaceSchema } from "@/schemas/content/space";

/** docs/02_CONTENT_SOURCE_OF_TRUTH.md §7. Capacities are TODO(EMIN-Q12). */
const raw: Space[] = [
  {
    id: "kudara-hall",
    name: "Kudara Hall",
    description:
      "A state-of-the-art facility, ideal for corporate events, meetings and conferences, with modern amenities and personalised service.",
  },
  {
    /**
     * Named "Private Meeting Rooms" in the §7 source deck. The 2026 photography
     * delivery shows one fitted boardroom — a single fixed table, one screen,
     * no second room and no reconfiguration — so the plural name and every
     * claim built on it (three rooms, theatre/cabaret layouts, 8–40 guests)
     * described a space that does not exist. The name is corrected here to
     * match what was photographed; the description below is the §7 wording
     * verbatim, which was already singular-compatible and accurate.
     *
     * Syndicate breakouts, which the old plural copy promised here, are run in
     * Kudara Hall — see `containers/events/copy/kudaraLayouts.ts`.
     *
     * TODO(EMIN-COPY): confirm the corrected name on the next content pass.
     */
    id: "boardroom",
    name: "The Boardroom",
    description:
      "Newly designed, equipped with cutting-edge technology and a dedicated F&B support team.",
  },
];

export const meetingSpaces: Space[] = raw.map((space) => spaceSchema.parse(space));

export const eventsAndWeddingsOverview =
  "Weddings and receptions in the gardens and across the estate; poolside parties and events; corporate functions, launches and conferences in Kudara Hall; outdoor events and photography in the Equatorial Gardens; private dining and intimate celebrations across the restaurants and lounges.";

export const meetingsPageIntro =
  "Kudara Hall for the conference. The Boardroom, with its interactive display and a dedicated F&B support team, for the board session. The Equatorial Gardens for the reception, the launch, the wedding — and the photographs. Secure parking, two restaurants and rooms upstairs when the day runs long. One address, every part of the event.";
