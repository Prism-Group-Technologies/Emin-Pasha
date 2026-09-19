/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export type ChannelId = "call" | "whatsapp" | "email" | "visit";

/**
 * The wrapper around each real channel. The address a card links to is never
 * written here — `ChannelsSection` resolves it from `content/identity.ts` and
 * `lib/directions` by `id`, so a card cannot point anywhere unapproved.
 * Availability and reply times are TODO(EMIN-Q10).
 */
export const channelCopy: {
  id: ChannelId;
  icon: IconName;
  title: string;
  pitch: string;
  availability: string;
  reply: string;
  cta: string;
  live: boolean;
}[] = [
  {
    id: "whatsapp",
    icon: "whatsapp",
    title: "WhatsApp",
    pitch: "The quickest way to a yes — dates, rooms, a table tonight.",
    availability: "Answered 7am – 11pm",
    reply: "Usually under an hour",
    cta: "Start a chat",
    live: true,
  },
  {
    id: "call",
    icon: "phone",
    title: "Call the desk",
    pitch: "Speak to the front office directly, day or night.",
    availability: "Open 24 hours",
    reply: "Picked up in person",
    cta: "Call now",
    live: true,
  },
  {
    id: "email",
    icon: "mail",
    title: "Email",
    pitch: "Best for itineraries, group stays and anything with attachments.",
    availability: "Read 7 days a week",
    reply: "Same working day",
    cta: "Write to us",
    live: false,
  },
  {
    id: "visit",
    icon: "location",
    title: "Visit",
    pitch: "Drop by for coffee on the terrace or a look at the rooms.",
    availability: "Walk-ins welcome",
    reply: "Nakasero, Kampala",
    cta: "Get directions",
    live: false,
  },
];

/** The three promises under the channel cards — what a visitor is buying by writing in. */
export const replyPromises: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "verified",
    title: "Read by a person",
    body: "No ticket numbers and no bots — a named member of the team replies.",
  },
  {
    icon: "schedule",
    title: "Answered the same day",
    body: "Enquiries in before 5pm EAT get a reply before the desk hands over.",
  },
  {
    icon: "check-circle",
    title: "Best rate, booked direct",
    body: "Talking to us directly is never more expensive than a booking site.",
  },
];
