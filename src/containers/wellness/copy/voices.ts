/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface WellnessVoice {
  id: string;
  heading: string;
  quote: string;
  author: string;
  location?: string;
  date?: string;
}

/**
 * Three placeholder visitor notes. The approved testimonials in
 * `content/testimonials.ts` are about the hotel as a whole; these stand in
 * until spa, gym and pool reviews are collected and signed off, at which
 * point they move into the content layer and this file goes. Nothing is
 * attributed to a real, named person.
 */
export const wellnessVoices: WellnessVoice[] = [
  {
    id: "placeholder-massage",
    heading: "The signature massage",
    quote:
      "I asked for firm and got exactly that. Walked in with a week of desk in my shoulders and walked out without it. The lounge afterwards is worth staying for.",
    author: "Spa guest — placeholder",
    location: "Kampala, Uganda",
    date: "Visit, placeholder date",
  },
  {
    id: "placeholder-gym",
    heading: "Joined as a neighbour",
    quote:
      "Live five minutes away and train here four mornings a week. Never a queue for a rack, the trainers actually coach you, and the pool after a session is the whole point.",
    author: "Gym member — placeholder",
    location: "Nakasero, Kampala",
    date: "Member, placeholder date",
  },
  {
    id: "placeholder-pool",
    heading: "A Sunday at the pool",
    quote:
      "Brought the kids on a day pass. Gardens are gorgeous, water was spotless, and we stayed until they closed. Booked again the next weekend.",
    author: "Day guest — placeholder",
    location: "Entebbe, Uganda",
    date: "Visit, placeholder date",
  },
];
