import { type PolicySection, policySectionSchema } from "@/schemas/content/policySection";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §14 — "publish as written." The
 * pre-arrival lead time is deliberately absent from "Special check-in
 * instructions" below (as in the source) — TODO(EMIN-Q16), 5 days vs 24
 * hours is unresolved; the bracketed editorial note itself is forbidden
 * content (CLAUDE.md §0.3) and must never be transcribed.
 */
const raw: PolicySection[] = [
  {
    id: "booking-payments-guarantees",
    title: "Booking, payments & guarantees",
    items: [
      "All group bookings must be confirmed 14 days prior to arrival, and full payment of group bookings is required 14 days prior to arrival.",
      "All final changes and rooming lists must be received in writing 7 days prior to arrival for all groups. Any changes made thereafter will be charged in full.",
      "Bookings not confirmed in writing within the above timeframes will be released.",
      "Groups of over 10 rooms must be guaranteed with a 50% deposit at the time of booking.",
      "All rates are non-commissionable and non-negotiable.",
      "All non-guaranteed bookings are released at 18h00 daily if not guaranteed by company LPO, credit card or prepayment.",
      "Bookings settled by a local company require an LPO (Local Purchase Order) before guest arrival; alternatively, full payment is required before check-in.",
      "Credit cards accepted: Visa, MasterCard and American Express only.",
      "Electronic funds transfer must be completed one week prior to check-in, with proof of payment sent to the hotel for verification.",
    ],
  },
  {
    id: "check-in-check-out",
    title: "Check-in / check-out",
    items: [
      "Check-out: strictly 10h00. Check-in: 14h00.",
      "Early check-in on request; not guaranteed during high occupancy. To guarantee it, reserve the room from the night before arrival, charged at 100% of the daily rate including taxes.",
      "Late check-out, bookable at the front desk on the morning of departure: 10h00–18h00 at 50% of the daily rate; 18h00 onwards at 100%. Strictly subject to availability.",
    ],
  },
  {
    id: "cancellations",
    title: "Cancellations",
    items: [
      "A no-show / cancellation fee applies if bookings are not cancelled in writing at least 48 hours prior to arrival.",
      "No-shows and late cancellations are charged at one night's full accommodation including taxes, on the rate booked.",
      "If hotel occupancy is high at the time of a no-show or late cancellation, the full number of nights will be charged.",
    ],
  },
  {
    id: "special-check-in-instructions",
    title: "Special check-in instructions",
    items: [
      "Guests will receive an email before arrival with check-in instructions, and front desk staff will greet guests on arrival. For further detail, contact the property using the information on your booking confirmation.",
    ],
  },
  {
    id: "spa-etiquette",
    title: "Spa etiquette",
    items: [
      "Arrival — please arrive 15 minutes before your scheduled treatment and enjoy the calm and serenity of the Spa atmosphere. Arriving late makes it necessary to curtail the time of your treatment.",
      "Mobile phones — kindly refrain from using your mobile phone anywhere on the Spa premises, and keep it on silent mode at all times.",
      "Personal items — we provide a secure place for personal items inside the Spa complex; however, we do not accept liability for loss or damage. We recommend that valuables are stored in the safe located in your room or suite.",
      "Health — please communicate any health conditions, including high blood pressure, allergies, pregnancy or any other health-related concern, when making your appointment. We do not recommend consuming alcohol before or directly after spa treatments, or before using any facility in the Spa and Health Club.",
      "Age — minimum age for entry to the Spa, the Health Club and the hydrothermal facilities is 16 years. Children under 16 may use the hotel pool if accompanied by a parent or adult.",
      "Pool safety — maximum depth 1.60m. There is no lifeguard at the pool. Children may use the pool only when accompanied by an adult, parent or guardian.",
      "Smoking — not permitted in the Spa, the Health Club or the sauna area.",
    ],
  },
];

export const policies: PolicySection[] = raw.map((section) => policySectionSchema.parse(section));
