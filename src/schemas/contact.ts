import { z } from "zod";

import { contactTimeOptions, formCopy, replyChannelOptions } from "@/containers/contact/copy/form";
import { contactIntents } from "@/containers/contact/copy/intents";

const { errors } = formCopy;

/**
 * The adaptive Contact enquiry. One schema for all five intents: the fields a
 * given intent does not show simply stay empty, and the route only mails the
 * ones that intent renders.
 *
 * Every closed list — `intent`, `replyChannel`, `contactTime` — is built from
 * the same option arrays the form renders (`containers/contact/copy`), so the
 * controls and the validator cannot drift.
 *
 * Dates are ISO `yyyy-MM-dd` strings (or empty): they compare correctly as
 * strings, serialise without timezone drift, and keep `Date` objects out of
 * the JSON body. `guests` is a string because an empty number input is `NaN`,
 * not "not given". Shares the `website` honeypot and optional `spamToken`
 * convention with every other enquiry schema.
 *
 * Cross-field rules, in `superRefine` so each error lands on the field the
 * visitor has to fix:
 *   - a phone number is required when they ask for a call or WhatsApp reply
 *   - "Something else" needs a message, since there is nothing else to go on
 *   - departure must fall after arrival
 */
const tupleOf = <T extends readonly { value: string }[]>(options: T) =>
  options.map((option) => option.value) as unknown as [T[number]["value"], ...T[number]["value"][]];

export const contactIntentEnum = z.enum(tupleOf(contactIntents));
export const replyChannelEnum = z.enum(tupleOf(replyChannelOptions));
export const contactTimeEnum = z.enum(tupleOf(contactTimeOptions));

export type ContactIntent = z.infer<typeof contactIntentEnum>;
export type ReplyChannel = z.infer<typeof replyChannelEnum>;

const isoDate = z.union([z.literal(""), z.iso.date()]).optional();

const guestCount = z
  .string()
  .trim()
  .refine((value) => value === "" || (/^\d+$/.test(value) && +value >= 1 && +value <= 2000), {
    error: errors.guests,
  })
  .optional();

export const contactSchema = z
  .object({
    intent: contactIntentEnum,
    arrival: isoDate,
    departure: isoDate,
    eventDate: isoDate,
    guests: guestCount,
    name: z.string().trim().min(2, { error: errors.name }),
    email: z.email({ error: errors.email }),
    phone: z.string().trim().max(40).optional(),
    country: z.string().trim().max(60).optional(),
    replyChannel: replyChannelEnum,
    contactTime: contactTimeEnum,
    message: z.string().trim().max(2000).optional(),
    consent: z.boolean().refine((value) => value, { error: errors.consent }),
    website: z.string().max(0).optional(),
    spamToken: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.replyChannel !== "email" && (values.phone ?? "").length < 6) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: errors.phone });
    }
    if (values.intent === "general" && (values.message ?? "").length < 10) {
      ctx.addIssue({ code: "custom", path: ["message"], message: errors.message });
    }
    if (values.arrival && values.departure && values.departure <= values.arrival) {
      ctx.addIssue({ code: "custom", path: ["departure"], message: errors.departure });
    }
  });

export type ContactValues = z.infer<typeof contactSchema>;
