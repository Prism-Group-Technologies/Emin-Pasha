import { z } from "zod";

/**
 * Contact-page and shared-form interface copy. Chrome, not facts — no hours,
 * departments or addresses are invented here; those come from
 * `content/identity.ts` and `content/contact.ts`. TODO(EMIN-Q68).
 */
const str = z.string().min(1);

const schema = z.object({
  intro: str,
  napTitle: str,
  departmentsTitle: str,
  hoursTitle: str,
  mapTitle: str,
  mapLoad: str,
  form: z.object({
    heading: str,
    lead: str,
    subject: str,
    name: str,
    email: str,
    phone: str,
    message: str,
    consent: str,
    submit: str,
    submitting: str,
    subjects: z.array(z.object({ value: str, label: str })).min(1),
    errors: z.object({ name: str, email: str, message: str, consent: str }),
  }),
  messages: z.object({ success: str, pending: str, failure: str, rateLimited: str }),
});

export const contactCopy = schema.parse({
  intro:
    "Call, message or write — every enquiry here is read by a person, not a queue. We are on Akii Bua Road in Nakasero, a few minutes from the business district.",
  napTitle: "Find us",
  departmentsTitle: "Who to contact",
  hoursTitle: "Hours",
  mapTitle: "Plot 27 Akii Bua Road, Nakasero",
  mapLoad: "Get directions",
  form: {
    heading: "Send us a message",
    lead: "Tell us what you need and we will point it at the right person.",
    subject: "What is this about?",
    name: "Your name",
    email: "Email address",
    phone: "Phone number (optional)",
    message: "Your message",
    consent: "Yes, you may contact me about this enquiry.",
    submit: "Send message",
    submitting: "Sending…",
    subjects: [
      { value: "general", label: "General enquiry" },
      { value: "reservations", label: "Reservations" },
      { value: "events", label: "Events, weddings or conferences" },
      { value: "spa", label: "Spa, gym or pool" },
      { value: "other", label: "Something else" },
    ],
    errors: {
      name: "Please tell us your name.",
      email: "Please enter a valid email address.",
      message: "Please tell us how we can help.",
      consent: "Please confirm we may reply to you.",
    },
  },
  messages: {
    success: "Thank you — we have your message and will come back to you.",
    // TODO(EMIN-Q34): no provider is configured, so the UI says so rather
    // than claiming an email was sent.
    pending:
      "Thank you — we have your message. Our contact form is not connected to our inbox just yet, so if it is urgent please call or email us directly.",
    failure: "We could not send that. Please try again, or call us directly.",
    rateLimited:
      "That went through already, or very recently. Give it a moment before sending again.",
  },
});

export type ContactCopy = z.infer<typeof schema>;
