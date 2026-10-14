/**
 * Copy for the room reservation request — the dialog behind "Reserve This
 * Room" on every `RoomCard`.
 *
 * **Not sourced from 02_CONTENT_SOURCE_OF_TRUTH.md.** Like the shell and the
 * dining reservation form, this is interface copy written to the §2 tone, and
 * it carries **no** factual claim: no rates, no availability, no response
 * time, no promise about what the desk will do. The rate shown in the dialog
 * header is read from the approved §4 rate card at render time, never restated
 * here. Status: needs client sign-off alongside the other route-state copy.
 */
export const roomReservationCopy = {
  /** The dialog's accessible name; the room name is appended at render. */
  title: "Reserve",
  eyebrow: "§ RESERVATION REQUEST",
  lead: "Tell us when you would like to arrive and we will take it from there. A person on the reservations desk reads every one of these.",
  /** The quiet second path, for a guest who would rather not wait on a reply. */
  engine: {
    lead: "Would rather not wait?",
    label: "Book instantly online",
  },
  fields: {
    name: "Your name",
    email: "Email",
    phone: "Phone or WhatsApp (optional)",
    checkIn: "Check-in",
    checkOut: "Check-out",
    adults: "Adults",
    children: "Children",
    message: "Anything we should know? (optional)",
    consent: "I agree to The Emin Pasha Hotel & Spa contacting me about this request.",
  },
  submit: "Send reservation request",
  submitting: "Sending…",
  cancel: "Cancel",
  messages: {
    failed: "We could not send that just now. Please try again, or call the reservations desk.",
    pending: "Thank you — we have your request and the reservations desk will be in touch.",
  },
  errors: {
    name: "Please tell us your name.",
    email: "Please enter an email we can reply to.",
    checkIn: "Please choose your arrival date.",
    checkInPast: "That date has already passed.",
    checkOut: "Please choose your departure date.",
    checkOutNotAfter: "Check-out needs to be after check-in.",
    adults: "A reservation needs at least one adult.",
    children: "Please enter a number of children.",
    consent: "Please tick this so we can reply to you.",
  },
} as const;
