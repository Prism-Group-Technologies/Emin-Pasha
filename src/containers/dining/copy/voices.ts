/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface DiningVoice {
  id: string;
  heading: string;
  quote: string;
  author: string;
  location?: string;
  date?: string;
}

/**
 * Three placeholder diner notes. The three approved testimonials in
 * `content/testimonials.ts` are about the hotel and the spa, not a specific
 * dinner, so these stand in until dining reviews are collected and signed
 * off — at which point they move into the content layer and this file goes.
 */
export const diningVoices: DiningVoice[] = [
  {
    id: "placeholder-rooftop",
    heading: "The rooftop at sunset",
    quote:
      "We came up for a drink and stayed for three hours. The small plates kept coming, the negroni was properly made, and you forget you are in the middle of Kampala.",
    author: "Diner — placeholder",
    location: "Kampala, Uganda",
    date: "Dinner, placeholder date",
  },
  {
    id: "placeholder-tasting",
    heading: "Sir Samuel Baker tasting menu",
    quote:
      "Five courses, paced perfectly, and the short rib was the best thing I have eaten this year. The pairing was worth every glass.",
    author: "Diner — placeholder",
    location: "Nairobi, Kenya",
    date: "Dinner, placeholder date",
  },
  {
    id: "placeholder-inroom",
    heading: "In-room, after a late flight",
    quote:
      "Landed at midnight, ordered the club and a soup from the overnight menu, and it was at the door in twenty minutes. Exactly what you want.",
    author: "Guest — placeholder",
    location: "London, United Kingdom",
    date: "Stay, placeholder date",
  },
];
