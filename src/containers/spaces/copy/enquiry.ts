/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * Interface copy and closed option lists for the Lounges & Spaces reservation
 * form. The option arrays are the single source for both the Zod enums
 * (`schemas/spacesEnquiry.ts`) and the rendered selects, so the two cannot
 * drift — the same pattern as `containers/story/copy/enquiry.ts`.
 *
 * Import-free on purpose: the schema is shared with the client form.
 */
export const requestTypeOptions = [
  { value: "table", label: "Reserve a table or alcove" },
  { value: "experience", label: "Book a signature experience" },
  { value: "private-hire", label: "Private hire or an event" },
  { value: "photoshoot", label: "A garden photoshoot" },
  { value: "circle", label: "Join the Lounge Circle" },
] as const;

export const timeOptions = [
  { value: "morning", label: "Morning (07:00 – 12:00)" },
  { value: "afternoon", label: "Afternoon (12:00 – 17:00)" },
  { value: "evening", label: "Evening (17:00 – 21:00)" },
  { value: "late", label: "Late (21:00 – late)" },
] as const;

/** Request types that route to the events team rather than reservations. */
export const EVENTS_REQUEST_TYPES: readonly string[] = ["private-hire"];

/** Request types a planner calls back about, so a phone number is required. */
export const PHONE_REQUIRED_TYPES: readonly string[] = ["private-hire", "photoshoot"];

export const GUESTS_MAX = 250;

export const enquiryCopy = {
  heading: "Request your table or space",
  lead: "Nothing is charged at this step. A member of the lounge team confirms availability personally.",
  fields: {
    requestType: "What would you like?",
    space: "Which space?",
    anySpace: "Not sure — recommend one",
    experience: "Signature experience (optional)",
    noExperience: "None for now",
    guests: "Guests",
    date: "Preferred date",
    time: "Time of day",
    name: "Your name",
    email: "Email address",
    phone: "Phone or WhatsApp",
    message: "Anything we should know? (optional)",
    consent: "Yes, the hotel may contact me about this request.",
  },
  submit: "Send request",
  submitting: "Sending…",
  errors: {
    name: "Please tell us your name.",
    email: "Please enter a valid email address.",
    guests: `Between 1 and ${GUESTS_MAX} guests, please.`,
    capacity: "That is more than this space holds standing — try the gardens, or another space.",
    phone: "A planner will call about this — please add a phone or WhatsApp number.",
    consent: "Please confirm we may reply to you.",
  },
  messages: {
    // TODO(EMIN-Q34): no email provider is wired — the honest live message.
    pending:
      "Thank you — we have your request. Our inbox is not connected online just yet, so please also WhatsApp or call reservations and we will confirm straight away.",
    success:
      "Thank you — your request is with the team. We will confirm by email or phone, usually the same working day.",
    failed: "Something went wrong at our end. Please try again, or contact reservations directly.",
  },
  seededNote: "We've filled this in from your match — adjust anything before sending.",
  nextSteps: [
    "Send the request — a space, a moment and roughly how many.",
    "A host replies personally, usually the same day, to confirm or suggest a better fit.",
    "For private hire, a planner follows with a written proposal and minimum spend.",
  ],
};

export type RequestType = (typeof requestTypeOptions)[number]["value"];
export type TimeOfDay = (typeof timeOptions)[number]["value"];
