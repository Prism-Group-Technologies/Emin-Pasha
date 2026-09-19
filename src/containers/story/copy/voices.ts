/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface StoryVoice {
  id: string;
  heading: string;
  quote: string;
  author: string;
  location?: string;
  date?: string;
}

/**
 * Three placeholder visitor notes about the sense of place. The approved
 * testimonials in `content/testimonials.ts` are about the hotel as a whole
 * and are reused elsewhere; these stand in until reviews specifically about
 * the building and its history are collected and signed off. Nothing is
 * attributed to a real, named person.
 */
export const storyVoices: StoryVoice[] = [
  {
    id: "placeholder-history",
    heading: "You feel the age of it",
    quote:
      "We read the story on the site before we came and then found it everywhere — in the names on the doors, the maps on the walls. It is a hotel that has clearly thought about why it is called what it is called.",
    author: "Hotel guest — placeholder",
    location: "London, United Kingdom",
    date: "Stay, placeholder date",
  },
  {
    id: "placeholder-gardens",
    heading: "The garden does the work",
    quote:
      "Kampala is loud and then you are through the gate and it is not. We came for two nights and moved a work trip around to stay a third.",
    author: "Business guest — placeholder",
    location: "Nairobi, Kenya",
    date: "Stay, placeholder date",
  },
  {
    id: "placeholder-welcome",
    heading: "Treated the same as everyone",
    quote:
      "No fuss at the desk, no hierarchy to it. The staff talked to us about the man the place is named after like they were proud of him. That stuck with me.",
    author: "Weekend guest — placeholder",
    location: "Kampala, Uganda",
    date: "Stay, placeholder date",
  },
];
