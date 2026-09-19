/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * Interface copy for the adaptive contact form. Chrome, not facts — no rate,
 * no availability and no guaranteed reply is promised by a field label.
 * `replyChannelOptions` / `contactTimeOptions` are the single source for both
 * the Zod enums and the rendered controls.
 */
export const replyChannelOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export const contactTimeOptions = [
  { value: "any", label: "Any time" },
  { value: "morning", label: "Morning (8am – 12pm EAT)" },
  { value: "afternoon", label: "Afternoon (12pm – 5pm EAT)" },
  { value: "evening", label: "Evening (5pm – 9pm EAT)" },
] as const;

export const formCopy = {
  eyebrow: "Step 1 of 2",
  heading: "What can we help with?",
  lead: "Pick one and the form shapes itself around it. Nothing is booked and no card details are taken.",
  detailsEyebrow: "Step 2 of 2",
  detailsHeading: "Your details",
  routedTo: "Goes straight to the",
  fields: {
    arrival: "Arrival",
    departure: "Departure",
    name: "Your name",
    email: "Email address",
    phone: "Phone or WhatsApp number",
    phoneOptional: "Phone or WhatsApp (optional)",
    country: "Country of residence (optional)",
    replyChannel: "How should we reply?",
    contactTime: "Best time to reach you",
    consent: "Yes, the hotel may contact me about this enquiry.",
  },
  submit: "Send enquiry",
  submitting: "Sending…",
  privacy: "We use your details only to answer this enquiry. Never shared, never sold.",
  errors: {
    name: "Please tell us your name.",
    email: "Please enter a valid email address.",
    phone: "Add a number so we can call or message you back.",
    message: "A line or two helps us point this at the right person.",
    departure: "Departure must be after arrival.",
    guests: "Enter a number between 1 and 2000.",
    consent: "Please confirm we may reply to you.",
  },
  messages: {
    success:
      "Thank you — your enquiry is with the team. A person will reply, usually within the same working day.",
    // TODO(EMIN-Q34): no provider is wired, so the live message says so.
    pending:
      "Thank you — we have your enquiry. Our inbox is not connected online just yet, so for anything urgent please call or WhatsApp us and we will pick it up straight away.",
    failed: "Something went wrong at our end. Please try again, or call us directly.",
  },
  success: {
    heading: "Your enquiry is in",
    whatsapp: "Faster on WhatsApp",
    again: "Send another enquiry",
  },
};
