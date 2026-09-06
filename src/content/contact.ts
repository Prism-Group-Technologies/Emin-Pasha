import { type ContactChannel, contactChannelSchema } from "@/schemas/content/contactChannel";

import { identity } from "./identity";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §1, §9. The source gives exactly two
 * channels — it does not list separate addresses for Events/Spa/Concierge,
 * so none are invented here; all of reservations, transfers and concierge
 * route through the one address. responseSlaHours is TODO(EMIN-Q10).
 */
const raw: ContactChannel[] = [
  {
    id: "general",
    department: "General enquiries",
    email: identity.email,
    telephone: identity.telephone,
    purpose: "General enquiries.",
  },
  {
    id: "reservations",
    department: "Reservations, transfers & concierge",
    email: identity.reservationsEmail,
    purpose: "Reservations, airport transfers and concierge requests.",
  },
];

export const contactChannels: ContactChannel[] = raw.map((channel) =>
  contactChannelSchema.parse(channel),
);
