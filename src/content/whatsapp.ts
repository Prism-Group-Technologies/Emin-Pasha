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
};

export const whatsappOpenings = whatsappOpeningsSchema.parse(raw);
