import { z } from "zod";

import { wellnessCopy } from "@/content/wellness-copy";

const { errors } = wellnessCopy.enquiry;

/**
 * Lead capture for the spa, gym and pool.
 *
 * The published site has no online booking engine for wellness, so this form
 * is how a visitor makes the enquiry they would otherwise make by phone. A
 * person confirms every treatment, session and day pass.
 *
 * `interest` is a closed enum rather than free text so the enquiry routes
 * itself; `"any"` is the hub's "not sure yet". `phone` and `preferredDate`
 * are optional additions so a higher-intent lead can hand over enough to be
 * called back without a round trip; `message` stays optional because
 * requiring one loses leads.
 */
export const wellnessInterestSchema = z.enum(["any", "spa", "gym", "pool"]);
export type WellnessInterest = z.infer<typeof wellnessInterestSchema>;

export const wellnessEnquirySchema = z.object({
  name: z.string().trim().min(2, { error: errors.name }),
  email: z.email({ error: errors.email }),
  phone: z.string().trim().max(40).optional(),
  interest: wellnessInterestSchema,
  preferredDate: z.string().trim().max(40).optional(),
  message: z.string().trim().max(1000).optional(),
  consent: z.boolean().refine((value) => value, { error: errors.consent }),
});

export type WellnessEnquiry = z.infer<typeof wellnessEnquirySchema>;
