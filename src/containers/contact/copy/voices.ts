/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface ContactVoice {
  id: string;
  heading: string;
  quote: string;
  author: string;
  location?: string;
  date?: string;
}

/**
 * Three placeholder notes about how the hotel answers. The approved
 * testimonials in `content/testimonials.ts` are reused elsewhere; these stand
 * in until reviews specifically about the desk are collected. Nothing is
 * attributed to a real, named person.
 */
export const contactVoices: ContactVoice[] = [
  {
    id: "placeholder-whatsapp",
    heading: "Answered before we landed",
    quote:
      "I sent a WhatsApp from the departure lounge in Dubai asking about a late check-in. By the time we landed at Entebbe there was a reply, a driver and a room waiting.",
    author: "Business guest — placeholder",
    location: "Dubai, UAE",
    date: "Stay, placeholder date",
  },
  {
    id: "placeholder-events",
    heading: "One person, start to finish",
    quote:
      "We planned a forty-person workshop entirely by email and two phone calls. Same coordinator the whole way, and every question came back the same day.",
    author: "Event organiser — placeholder",
    location: "Nairobi, Kenya",
    date: "Event, placeholder date",
  },
  {
    id: "placeholder-dinner",
    heading: "A table, sorted in minutes",
    quote:
      "Called at six asking for a quiet table for an anniversary. They had candles on it and remembered the date when we came back a year later.",
    author: "Dinner guest — placeholder",
    location: "Kampala, Uganda",
    date: "Visit, placeholder date",
  },
];
