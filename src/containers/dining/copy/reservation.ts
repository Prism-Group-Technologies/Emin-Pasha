/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { OUTLET_ID } from "@/containers/dining/anchors";

/**
 * Interface copy for the table-reservation enquiry form. This is chrome, not
 * facts — it names no menu, price or guaranteed table. Registered with the
 * other pending-provider copy as TODO(EMIN-Q34): the form captures the
 * enquiry, a person confirms it.
 *
 * `outletOptions` and `occasionOptions` are the single source for both the
 * Zod enum (`schemas/diningReservation.ts`) and the rendered `<select>`s.
 */
export const outletOptions = [
  { value: "any", label: "Any outlet / not sure yet" },
  { value: OUTLET_ID.hakkiPasha, label: "Hakki Pasha Restaurant & Bar" },
  { value: OUTLET_ID.sirSamuelBaker, label: "Sir Samuel Baker Fine Dining" },
  { value: OUTLET_ID.rooftopTerrace, label: "The Rooftop Terrace" },
  { value: OUTLET_ID.manutea, label: "Manutea Wine & Whisky Lounge" },
  { value: OUTLET_ID.inRoom, label: "In-Room Dining" },
] as const;

export const occasionOptions = [
  { value: "dining", label: "Just dinner" },
  { value: "celebration", label: "A celebration" },
  { value: "business", label: "A business meal" },
  { value: "private-hire", label: "Private hire / a group" },
  { value: "other", label: "Something else" },
] as const;

export const reservationCopy = {
  heading: "Request a table",
  lead: "The reservations desk confirms by email or phone the same working day. No card details, no deposit at this step.",
  fields: {
    name: "Your name",
    email: "Email address",
    phone: "Phone or WhatsApp (optional)",
    outlet: "Which outlet?",
    date: "Preferred date (optional)",
    time: "Preferred time (optional)",
    partySize: "Number of guests",
    occasion: "What's the occasion?",
    message: "Anything we should know? Dietary needs, seating, a birthday… (optional)",
    consent: "Yes, the hotel may contact me about this reservation enquiry.",
  },
  submit: "Send reservation request",
  submitting: "Sending…",
  errors: {
    name: "Please tell us your name.",
    email: "Please enter a valid email address.",
    partySize: "Please enter a party size between 1 and 20.",
    consent: "Please confirm we may reply to you.",
  },
  messages: {
    // TODO(EMIN-Q34): no email provider is wired, so this is the honest live
    // message — never a fake "we've emailed you".
    pending:
      "Thank you — we have your request. Our booking inbox is not connected online just yet, so please also call or WhatsApp the reservations desk and we will lock the table in straight away.",
    success:
      "Thank you — your request is with the reservations desk. We will confirm by email or phone the same working day.",
    failed:
      "Something went wrong at our end. Please try again, or call the reservations desk directly.",
  },
};
