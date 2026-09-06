import { z } from "zod";

import { contactCopy } from "@/content/contact-copy";

const { errors } = contactCopy.form;

/**
 * The general contact form. Shares the honeypot (`website`) and optional
 * `spamToken` convention with every other enquiry schema, so one route
 * pipeline handles them all identically.
 */
export const contactSubjects = ["general", "reservations", "events", "spa", "other"] as const;

export const contactSchema = z.object({
  subject: z.enum(contactSubjects),
  name: z.string().trim().min(2, { error: errors.name }),
  email: z.email({ error: errors.email }),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(10, { error: errors.message }).max(2000),
  consent: z.boolean().refine((value) => value, { error: errors.consent }),
  website: z.string().max(0).optional(),
  spamToken: z.string().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
