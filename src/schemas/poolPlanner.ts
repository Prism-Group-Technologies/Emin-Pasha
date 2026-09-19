import { z } from "zod";

import { wellnessCopy } from "@/content/wellness-copy";

const { errors } = wellnessCopy.enquiry;

/**
 * Client-side validation for the pool visit planner's contact block.
 *
 * The planner is not a new endpoint. Its priced choices (visit type, party
 * size, add-ons) are turned into a one-line summary by `poolQuote.ts` and
 * folded into the `message` of a normal `wellnessEnquirySchema` payload with
 * `interest: "pool"`, then posted to `/api/enquiry/spa` — so the API, the
 * mail seam and the "no provider wired" pending contract are all untouched
 * (TODO(EMIN-Q34)). This schema only guards the fields the guest types.
 */
export const poolPlannerSchema = z.object({
  name: z.string().trim().min(2, { error: errors.name }),
  email: z.email({ error: errors.email }),
  phone: z.string().trim().max(40).optional(),
  preferredDate: z.string().trim().max(40).optional(),
  notes: z.string().trim().max(600).optional(),
  consent: z.boolean().refine((value) => value, { error: errors.consent }),
});

export type PoolPlannerContact = z.infer<typeof poolPlannerSchema>;
