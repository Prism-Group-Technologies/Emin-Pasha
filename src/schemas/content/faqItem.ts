import { z } from "zod";

/** docs/02_CONTENT_SOURCE_OF_TRUTH.md §15 — publish as written, mirrors FAQPage schema. */
export const faqItemSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
});

export type FaqItem = z.infer<typeof faqItemSchema>;
