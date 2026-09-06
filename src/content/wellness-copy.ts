import { z } from "zod";

/**
 * Interface copy for the wellness pages — the enquiry form and the
 * "no menu yet" states. Like `shell.ts` and `booking.ts`, this is chrome, not
 * facts: nothing here names a treatment, a duration, a membership tier or a
 * price, because none exists in the source (§0.7). Registered with the rest
 * of the chrome copy as TODO(EMIN-Q68).
 */
const schema = z.object({
  pending: z.object({
    spa: z.string().min(1),
    gym: z.string().min(1),
    pool: z.string().min(1),
  }),
  enquiry: z.object({
    heading: z.string().min(1),
    lead: z.string().min(1),
    name: z.string().min(1),
    email: z.string().min(1),
    interest: z.string().min(1),
    message: z.string().min(1),
    consent: z.string().min(1),
    submit: z.string().min(1),
    submitting: z.string().min(1),
    options: z.object({ spa: z.string().min(1), gym: z.string().min(1), pool: z.string().min(1) }),
    errors: z.object({
      name: z.string().min(1),
      email: z.string().min(1),
      consent: z.string().min(1),
    }),
    messages: z.object({ pending: z.string().min(1), failed: z.string().min(1) }),
  }),
});

export const wellnessCopy = schema.parse({
  pending: {
    spa: "Our treatment menu, with durations and prices, is not published online yet. Tell us what you are after and we will send it to you with our recommendations.",
    gym: "Membership options and rates are not published online yet. Tell us how you would like to use the gym and we will come back with what fits.",
    pool: "Day-pass rates for non-resident swimmers are not published online yet. Send us a note and we will confirm them.",
  },
  enquiry: {
    heading: "Ask us",
    lead: "One of our team will come back to you personally — usually the same day.",
    name: "Your name",
    email: "Email address",
    interest: "What are you interested in?",
    message: "Anything you would like us to know (optional)",
    consent: "Yes, you may contact me about this enquiry.",
    submit: "Send enquiry",
    submitting: "Sending…",
    options: { spa: "Spa treatments", gym: "Gym membership", pool: "Swimming pool" },
    errors: {
      name: "Please tell us your name.",
      email: "Please enter a valid email address.",
      consent: "Please confirm we may reply to you.",
    },
    messages: {
      // TODO(EMIN-Q34): no email provider is confirmed, so the service is
      // stubbed. This is the honest live message, not a fake success.
      pending:
        "Thank you. Our enquiry form is not connected to our inbox just yet — please email or call us and we will pick this up straight away.",
      failed: "Something went wrong at our end. Please try again, or call us directly.",
    },
  },
});

export type WellnessCopy = z.infer<typeof schema>;
