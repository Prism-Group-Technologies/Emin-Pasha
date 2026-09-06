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
    id: "private-meeting-rooms",
    name: "Private Meeting Rooms",
    description:
      "Newly designed, equipped with cutting-edge technology and a dedicated F&B support team.",
  },
  {
    id: "business-centre",
    name: "The Business Centre",
    description:
      "Full office amenities, bookable by individuals and companies; fully equipped for virtual sessions including waiting-room functionality. Equipment includes, but is not limited to: Bluetooth speakerphones, conference bars, collaboration displays, projectors. Provided as standard: internet, bottled water, projectors and notebooks. Dedicated staff are assigned to business centre guests.",
  },
];

export const meetingSpaces: Space[] = raw.map((space) => spaceSchema.parse(space));

export const eventsAndWeddingsOverview =
  "Weddings and receptions in the gardens and across the estate; poolside parties and events; corporate functions, launches and conferences in Kudara Hall; outdoor events and photography in the Equatorial Gardens; private dining and intimate celebrations across the restaurants and lounges.";

export const meetingsPageIntro =
  "Kudara Hall for the conference. Private meeting rooms with cutting-edge technology and a dedicated F&B support team for the board session. The Equatorial Gardens for the reception, the launch, the wedding — and the photographs. Secure parking, three restaurants and rooms upstairs when the day runs long. One address, every part of the event.";

export const businessCentrePageIntro =
  "Book space to work, or space to meet. The Emin Pasha Business Centre is fully equipped for virtual sessions, including waiting-room functionality, with Bluetooth speakerphones, conference bars and collaboration displays. Internet, bottled water, projectors and notebooks come as standard, and dedicated staff are assigned to make sure nothing interrupts your day.";
