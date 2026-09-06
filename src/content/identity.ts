import { identitySchema } from "@/schemas/identity";

/**
 * Source: docs/02_CONTENT_SOURCE_OF_TRUTH.md §1 "IDENTITY & NAP". Do not edit
 * a value here without updating that table first — see CLAUDE.md §3.
 */
export const identity = identitySchema.parse({
  name: "The Emin Pasha Hotel & Spa",
  shortName: "Emin Pasha",
  category: "Luxury boutique hotel, spa and lifestyle destination",
  address: "Plot 27 Akii Bua Road, Nakasero, P.O. Box 74764, Kampala, Uganda",
  neighbourhood: "Nakasero — Kampala's diplomatic, business and embassy quarter",
  telephone: "+256 312 264 712",
  email: "info@eminpasha.com",
  reservationsEmail: "reservations@eminpasha.com",
  whatsapp: {
    display: "+256 764 042 543",
    url: "https://wa.me/256764042543",
  },
  social: {
    facebook: "https://www.facebook.com/eminpashahotelandspa/",
    x: "https://x.com/theeminpasha",
    instagram: "https://www.instagram.com/eminpashahotelandspa",
  },
  checkInTime: "14:00",
  checkOutTime: "10:00",
  currency: "UGX",
});
