import { type WhatsAppOpenings, whatsappOpeningsSchema } from "@/schemas/content/whatsapp";

/**
 * **Not sourced from 02_CONTENT_SOURCE_OF_TRUTH.md** — that document supplies
 * page copy and facts, and these are neither. They are the guest's own words,
 * pre-typed as a courtesy.
 *
 * Which means they are written in the *guest's* register, not the §2 brand
 * voice: plain, unadorned, the way a person actually opens a message. Brand
 * voice in a message the guest appears to have sent themselves reads as a
 * bot, and the guest is free to delete every word before sending — the point
 * is only to spare them a blank box.
 *
 * Two intents, not seven. The surfaces that link out differ in *placement*,
 * not in what the guest wants to say: five of them are chrome or a NAP row
 * where nothing about the intent is known, and two sit directly beside a
 * booking CTA. Minting a variant per call site would be seven strings to sign
 * off where two distinctions exist.
 */
const raw: WhatsAppOpenings = {
  general: "Hello Emin Pasha — I'd like to ask about a stay.",
  booking: "Hello Emin Pasha — I'd like to book direct. Could you help me with dates?",
  wellness:
    "Hello Emin Pasha — I'd like to book a spa, gym or pool visit. Could you help me with what's available?",
  events:
    "Hello Emin Pasha — I'm planning a meeting or event and would like to speak with the events team.",
  offers: "Hello Emin Pasha — I'd like to ask about your current offers.",
  transfer:
    "Hello Emin Pasha — I'd like to arrange an airport transfer. Could you help me with the details?",
  lounges:
    "Hello Emin Pasha — I'd like to reserve a table in one of your lounges or ask about the gardens.",
  offerClaim:
    "Hello Emin Pasha — I'd like to claim the “{offer}” offer. Could you check availability for my dates?",
  gallery:
    "Hello Emin Pasha — I've been looking through your gallery and would like to plan a visit.",
  galleryView:
    "Hello Emin Pasha — I saw “{view}” in your gallery and would like to plan something like it. Could you help?",
  faq: "Hello Emin Pasha — I have a question that isn't on your FAQ page.",
  faqTopic: "Hello Emin Pasha — I have a question about {topic}.",
  legal:
    "Hello Emin Pasha — I have a question about your privacy, cookie, terms or accessibility policies.",
  legalTopic: "Hello Emin Pasha — I have a question about {topic}.",
};

export const whatsappOpenings = whatsappOpeningsSchema.parse(raw);
