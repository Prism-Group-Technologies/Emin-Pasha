import { z } from "zod";

import { enquiryCopy, storyFocusOptions } from "@/containers/story/copy/enquiry";

const { errors } = enquiryCopy;

/**
 * Lead capture for the Our Story page's "Stay in the story" surface.
 *
 * The published site has no online booking engine, so this form is how a
 * visitor makes the enquiry they would otherwise make by phone — a person on
 * the reservations desk confirms every room. `focus` is a closed enum built
 * from the same option list the form renders
 * (`containers/story/copy/enquiry.ts`), so the select and the validator
 * cannot drift; `"any"` is the page's "not sure yet". `preferredDate` stays
 * free-form and optional, and `message` is optional because requiring one
 * loses leads. `website` is the honeypot the shared route pipeline checks.
 */
const tupleOf = <T extends readonly { value: string }[]>(options: T) =>
  options.map((option) => option.value) as unknown as [T[number]["value"], ...T[number]["value"][]];

export const storyFocusEnum = z.enum(tupleOf(storyFocusOptions));
export type StoryFocus = z.infer<typeof storyFocusEnum>;

export const storyEnquirySchema = z.object({
  name: z.string().trim().min(2, { error: errors.name }),
  email: z.email({ error: errors.email }),
  phone: z.string().trim().max(40).optional(),
  focus: storyFocusEnum,
  preferredDate: z.string().trim().max(80).optional(),
  message: z.string().trim().max(1000).optional(),
  consent: z.boolean().refine((value) => value, { error: errors.consent }),
  website: z.string().max(0).optional(),
});

export type StoryEnquiry = z.infer<typeof storyEnquirySchema>;
