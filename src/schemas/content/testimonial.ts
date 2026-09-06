import { z } from "zod";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §12.6 — exactly three approved
 * testimonials exist. check:content asserts no fourth is ever added and that
 * the forbidden "Nice Place"/Ina Aldrich testimonial never appears.
 */
export const testimonialSchema = z.object({
  id: z.string().min(1),
  heading: z.string().min(1),
  quote: z.string().min(1),
  author: z.string().min(1),
  location: z.string().min(1),
  stayDate: z.string().optional(),
  placement: z.enum(["homepage", "spa", "accommodation"]),
});

export type Testimonial = z.infer<typeof testimonialSchema>;
