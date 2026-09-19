/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface EventVoice {
  id: string;
  heading: string;
  quote: string;
  author: string;
  context?: string;
}

/**
 * Placeholder planner notes. The approved testimonials in
 * `content/testimonials.ts` are about the hotel as a whole; these stand in
 * until meetings-and-events references are collected and signed off, at which
 * point they move into the content layer and this file goes. Nothing is
 * attributed to a real, named person or organisation.
 */
export const eventVoices: EventVoice[] = [
  {
    id: "placeholder-conference",
    heading: "Annual conference, 400 delegates",
    quote:
      "We moved off a convention centre and did not lose a beat. Registration, plenary and eight breakouts ran on one site, lunch was out in fifteen minutes, and our account manager was in the room the whole day.",
    author: "Head of events — placeholder",
    context: "Financial services · placeholder date",
  },
  {
    id: "placeholder-board",
    heading: "Two-day board offsite",
    quote:
      "Boardroom by day, private dinner by night, everyone slept upstairs. The video kit actually worked for the directors who dialled in. We have booked the next two here.",
    author: "Company secretary — placeholder",
    context: "Listed company · placeholder date",
  },
  {
    id: "placeholder-wedding",
    heading: "Garden ceremony, 180 guests",
    quote:
      "One wedding that day meant the gardens were ours from morning. The photos in that light are unreal, dinner in the hall was seamless, and the after-party by the pool went until we called it.",
    author: "Bride — placeholder",
    context: "Kampala · placeholder date",
  },
];
