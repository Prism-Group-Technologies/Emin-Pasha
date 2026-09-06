import { z } from "zod";

import { rfpCopy } from "@/content/rfp-copy";

const { errors } = rfpCopy;

/**
 * The site's highest-value lead. Validated with the **same schema on both
 * sides** — the form and the route handler import this file, so a client that
 * skips validation cannot post a shape the server accepts.
 *
 * Nothing here asks for or asserts a capacity or a price: the guest states
 * their own numbers, and the hotel replies. That is the whole design, given
 * no capacity or package data exists (§0.7).
 */
export const rfpEventTypes = ["wedding", "conference", "meeting", "launch", "other"] as const;

export const rfpSchema = z.object({
  eventType: z.enum(rfpEventTypes, { error: errors.eventType }),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { error: errors.startDate }),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .or(z.literal("")),
  guests: z.coerce
    .number({ error: errors.guests })
    .int()
    .min(1, { error: errors.guests })
    .max(5000),
  spaces: z.array(z.string().min(1)).default([]),
  accommodation: z.boolean().default(false),
  catering: z.string().trim().max(500).optional(),
  budget: z.string().trim().max(80).optional(),
  company: z.string().trim().max(160).optional(),
  name: z.string().trim().min(2, { error: errors.name }),
  email: z.email({ error: errors.email }),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z.boolean().refine((value) => value, { error: errors.consent }),
  /**
   * Honeypot. A real visitor never sees this field, so anything in it is a
   * bot. Named plausibly (`website`) rather than `honeypot`, or the bots that
   * read field names would skip it.
   */
  website: z.string().max(0).optional(),
});

export type RfpValues = z.infer<typeof rfpSchema>;
export type RfpInput = z.input<typeof rfpSchema>;
