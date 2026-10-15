import { bookingCopy } from "@/content/booking";
import { contactCopy } from "@/content/contact-copy";
import type { EnquirySpec } from "@/lib/enquiry/types";
import type { BookingSearch } from "@/schemas/booking";

/**
 * The booking **enquiry** — the fallback path when the engine cannot be
 * reached or is not yet configured (Q49). Distinct from
 * `/api/booking/availability`, which queries YCS; this one routes a guest's
 * dates to reservations@ so a stay can still be booked by hand.
 */
export const spec: EnquirySpec<BookingSearch> = {
  kind: "booking",
  subject: "Availability enquiry",
  toFields: (values) => [
    { label: "Check-in", value: values.checkIn },
    { label: "Check-out", value: values.checkOut },
    { label: "Adults", value: String(values.adults) },
    { label: "Children", value: String(values.children) },
    { label: "Rooms", value: String(values.rooms) },
    { label: "Room type", value: values.roomTypeId ?? "—" },
    { label: "Promo code", value: values.promoCode ?? "—" },
  ],
  messages: {
    success: "Thank you — we have your dates and will confirm by hand.",
    failure: bookingCopy.errors.generic,
    rateLimited: contactCopy.messages.rateLimited,
  },
};
