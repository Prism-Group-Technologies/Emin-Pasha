import { z } from "zod";

/**
 * NAP (name, address, phone) shape. Values must stay byte-identical with
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §1 everywhere they're used — site, JSON-LD,
 * llms.txt, Google Business Profile, OTAs.
 */
export const identitySchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  category: z.string().min(1),
  address: z.string().min(1),
  neighbourhood: z.string().min(1),
  telephone: z.string().min(1),
  email: z.email(),
  reservationsEmail: z.email(),
  whatsapp: z.object({
    display: z.string().min(1),
    url: z.url(),
  }),
  social: z.object({
    facebook: z.url(),
    x: z.url(),
    instagram: z.url(),
  }),
  checkInTime: z.string().min(1),
  checkOutTime: z.string().min(1),
  currency: z.literal("UGX"),
});

export type Identity = z.infer<typeof identitySchema>;
