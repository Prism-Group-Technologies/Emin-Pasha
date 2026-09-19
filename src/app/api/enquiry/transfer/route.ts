import { bookingFormCopy } from "@/containers/experiences/transfer/copy/bookingForm";
import { buildTransferQuote } from "@/containers/experiences/transfer/transferQuote";
import { contactCopy } from "@/content/contact-copy";
import { handleEnquiry } from "@/lib/api/envelope";
import { type TransferBooking, transferBookingSchema } from "@/schemas/transferBooking";

export const dynamic = "force-dynamic";

const orDash = (value: string | undefined) => value || "—";

/** Date and time on one line, flight or hours on the next — what dispatch reads first. */
function journeyFields(values: TransferBooking) {
  const quote = buildTransferQuote(values);
  const timing =
    values.service === "hourly" ? `${values.hours} hours` : orDash(values.flightNumber);
  return [
    { label: "Service", value: quote.service?.label ?? values.service },
    { label: "When", value: `${values.date} ${values.time ?? ""}`.trim() },
    { label: values.service === "hourly" ? "Hire" : "Flight", value: timing },
    { label: "Car", value: quote.vehicle?.className ?? values.vehicle },
    { label: "Party", value: `${values.passengers} passengers, ${values.bags} cases` },
    { label: "Nights staying", value: String(values.nights) },
    { label: "Indicative fare", value: quote.summary },
    { label: "Capacity", value: quote.capacityWarning ?? "Fits" },
  ];
}

/**
 * Airport transfer and chauffeur-hire requests. Same shared pipeline as every
 * other enquiry route (rate limit → honeypot → schema → spam → deliver); the
 * `transfer` kind routes to reservations, per the approved §8 copy.
 *
 * The fare in the email is **recomputed here** from the validated choices via
 * `buildTransferQuote`, never taken from the browser, so the desk always sees
 * the catalogue price for what was actually requested.
 */
export function POST(request: Request) {
  return handleEnquiry(request, {
    kind: "transfer",
    schema: transferBookingSchema,
    subject: (values) => `Airport transfer request — ${values.date}`,
    replyTo: (values) => values.email,
    toFields: (values) => [
      ...journeyFields(values),
      { label: "Name", value: values.name },
      { label: "Email", value: values.email },
      { label: "Phone", value: orDash(values.phone) },
      { label: "Notes", value: orDash(values.notes) },
    ],
    messages: {
      success: bookingFormCopy.messages.success,
      failure: bookingFormCopy.messages.failed,
      rateLimited: contactCopy.messages.rateLimited,
    },
  });
}
