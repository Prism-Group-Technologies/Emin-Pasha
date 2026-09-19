/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * Interface copy for the "Stay in the story" enquiry form. This is chrome,
 * not facts — it names no rate, no room and no guaranteed availability.
 * Registered with the other pending-provider copy as TODO(EMIN-Q34): the
 * form captures the enquiry, a person on the reservations desk confirms it.
 *
 * `storyFocusOptions` is the single source for both the Zod enum
 * (`schemas/storyEnquiry.ts`) and the rendered `<select>`, so the two cannot
 * drift — the same pattern as `containers/dining/copy/reservation.ts`.
 */
export const storyFocusOptions = [
  { value: "any", label: "Not sure yet — help me plan" },
  { value: "stay", label: "A stay at the hotel" },
  { value: "celebration", label: "A private celebration or event" },
  { value: "heritage", label: "A visit built around the history" },
] as const;

export type StoryFocusOption = (typeof storyFocusOptions)[number]["value"];

export const enquiryCopy = {
  heading: "Tell us what you have in mind",
  lead: "A name, a rough date, and the shape of the trip. Nothing is booked at this step and no card details are taken.",
  fields: {
    name: "Your name",
    email: "Email address",
    phone: "Phone or WhatsApp (optional)",
    focus: "What is the visit about?",
    preferredDate: "Rough dates (optional)",
    message: "Anything you would like us to know (optional)",
    consent: "Yes, the hotel may contact me about this enquiry.",
  },
  submit: "Send enquiry",
  submitting: "Sending…",
  errors: {
    name: "Please tell us your name.",
    email: "Please enter a valid email address.",
    consent: "Please confirm we may reply to you.",
  },
  messages: {
    // TODO(EMIN-Q34): no email provider is wired, so this is the honest live
    // message — never a fake "we've emailed you".
    pending:
      "Thank you — we have your enquiry. Our inbox is not connected online just yet, so please also call or WhatsApp reservations and we will pick this up straight away.",
    success:
      "Thank you — your enquiry is with the reservations desk. We will reply by email or phone, usually the same working day.",
    failed: "Something went wrong at our end. Please try again, or contact reservations directly.",
  },
  nextSteps: [
    "You send this — a name, rough dates, and what the visit is about. Nothing is held yet.",
    "A member of the team replies personally, usually the same day, with rooms and options that fit.",
    "We hold a room for your dates. No deposit and no card details at this step.",
  ],
};
