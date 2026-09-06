import { z } from "zod";

import { wellnessCopy } from "@/content/wellness-copy";

const { errors } = wellnessCopy.enquiry;

/**
 * Lead capture for the spa, gym and pool.
 *
 * There is no treatment menu, no gym membership tier and no pool day-pass
 * price anywhere in the source (§0.7 forbids inventing all three), so this
 * form exists in place of a price list — it captures the enquiry a visitor
 * would otherwise have to make by phone.
 *
 * `interest` is a closed enum rather than free text so the enquiry routes
 * itself; `message` stays optional because requiring one loses leads.
 */
export const wellnessInterestSchema = z.enum(["spa", "gym", "pool"]);
export type WellnessInterest = z.infer<typeof wellnessInterestSchema>;

export const wellnessEnquirySchema = z.object({
  name: z.string().trim().min(2, { error: errors.name }),
  email: z.email({ error: errors.email }),
  interest: wellnessInterestSchema,
  message: z.string().trim().max(1000).optional(),
  consent: z.boolean().refine((value) => value, { error: errors.consent }),
});

export type WellnessEnquiry = z.infer<typeof wellnessEnquirySchema>;
