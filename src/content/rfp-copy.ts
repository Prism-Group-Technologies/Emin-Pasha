import { z } from "zod";

/**
 * Copy for the RFP form. Interface copy, not facts — no capacity, package or
 * price is named anywhere here, because none exists in the source (§0.7).
 * Registered with the rest of the chrome copy as TODO(EMIN-Q68).
 */
const schema = z.object({
  heading: z.string().min(1),
  lead: z.string().min(1),
  steps: z.array(z.object({ id: z.string().min(1), title: z.string().min(1) })).min(1),
  fields: z.object({
    eventType: z.string().min(1),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
    guests: z.string().min(1),
    spaces: z.string().min(1),
    accommodation: z.string().min(1),
    catering: z.string().min(1),
    budget: z.string().min(1),
    company: z.string().min(1),
    name: z.string().min(1),
    email: z.string().min(1),
    phone: z.string().min(1),
    message: z.string().min(1),
    consent: z.string().min(1),
  }),
  eventTypes: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).min(1),
  budgetBands: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).min(1),
  actions: z.object({
    next: z.string().min(1),
    back: z.string().min(1),
    submit: z.string().min(1),
    submitting: z.string().min(1),
  }),
  errors: z.object({
    eventType: z.string().min(1),
    startDate: z.string().min(1),
    guests: z.string().min(1),
    name: z.string().min(1),
    email: z.string().min(1),
    consent: z.string().min(1),
  }),
  success: z.object({
    heading: z.string().min(1),
    body: z.string().min(1),
    sla: z.string().min(1),
  }),
  failure: z.string().min(1),
  capacities: z.object({ heading: z.string().min(1), pending: z.string().min(1) }),
});

export const rfpCopy = schema.parse({
  heading: "Tell us about your event",
  lead: "The more you can tell us, the more useful our first reply will be. Nothing here is binding.",
  steps: [
    { id: "event", title: "Your event" },
    { id: "needs", title: "What you need" },
    { id: "contact", title: "How to reach you" },
  ],
  fields: {
    eventType: "Type of event",
    startDate: "Preferred date",
    endDate: "End date (if more than one day)",
    guests: "Approximate number of guests",
    spaces: "Spaces you are interested in",
    accommodation: "Will you need rooms for guests?",
    catering: "Catering requirements",
    budget: "Budget range (optional)",
    company: "Company or organisation (optional)",
    name: "Your name",
    email: "Email address",
    phone: "Phone number (optional)",
    message: "Anything else we should know",
    consent: "Yes, you may contact me about this enquiry.",
  },
  eventTypes: [
    { value: "wedding", label: "Wedding or celebration" },
    { value: "conference", label: "Conference" },
    { value: "meeting", label: "Board or private meeting" },
    { value: "launch", label: "Launch or corporate function" },
    { value: "other", label: "Something else" },
  ],
  budgetBands: [
    { value: "unsure", label: "Not sure yet" },
    { value: "discuss", label: "Prefer to discuss" },
  ],
  actions: {
    next: "Next",
    back: "Back",
    submit: "Send enquiry",
    submitting: "Sending…",
  },
  errors: {
    eventType: "Please choose the type of event.",
    startDate: "Please give us a date, even an approximate one.",
    guests: "Roughly how many guests are you expecting?",
    name: "Please tell us your name.",
    email: "Please enter a valid email address.",
    consent: "Please confirm we may reply to you.",
  },
  success: {
    heading: "Thank you — we have your enquiry",
    body: "One of our events team will read this personally and come back to you with what is possible.",
    // TODO(EMIN-Q10): no response-time SLA has been confirmed, so none is
    // promised. A specific "within 24 hours" here would be a commitment the
    // hotel has not made.
    sla: "We have not yet published a guaranteed response time — if your date is tight, call us on the number below and we will pick it up straight away.",
  },
  failure: "We could not send that. Please try again, or email us directly and we will pick it up.",
  capacities: {
    heading: "Capacities",
    pending:
      "Capacities by layout are available on request — tell us your numbers and we will confirm what works.",
  },
});

export type RfpCopy = z.infer<typeof schema>;
