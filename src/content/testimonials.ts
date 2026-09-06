import { type Testimonial, testimonialSchema } from "@/schemas/content/testimonial";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §12.6 — "the only three approved."
 * The forbidden "Nice Place"/Ina Aldrich/Castro-monastery testimonial
 * (CLAUDE.md §0.2) must never be added here or anywhere else in the repo.
 * check:content asserts exactly these three exist and that string never
 * appears.
 */
const raw: Testimonial[] = [
  {
    id: "jacqui-fairness",
    heading: "A Hidden Gem in Nakasero",
    quote:
      "For the longest time I used to just bypass The Emin Pasha Hotel without ever stepping inside — until a friend recently invited me. I am so incredibly glad they did, because what I discovered completely blew me away.",
    author: "Jacqui Fairness",
    location: "Kampala, Uganda",
    stayDate: "Stayed March 2026",
    placement: "homepage",
  },
  {
    id: "executive-serenity-spa",
    heading: "The service is top notch",
    quote: "Good customer service. Will be back soon.",
    author: "Executive Serenity Spa & Mobile Massage",
    location: "Kampala, Uganda",
    stayDate: "Stayed June 2026",
    placement: "spa",
  },
  {
    id: "william-w",
    heading: "Good Choice",
    quote:
      "Extremely nice environment, the room was great, the service was awesome — really helpful and great service. I'll visit them again in the near future.",
    author: "William W.",
    location: "Lisbon, Portugal",
    placement: "accommodation",
  },
];

export const testimonials: Testimonial[] = raw.map((testimonial) =>
  testimonialSchema.parse(testimonial),
);
