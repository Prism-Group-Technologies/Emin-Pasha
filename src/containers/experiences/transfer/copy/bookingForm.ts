/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * Interface copy for the transfer booking form and its quote panel. Import-
 * free — the client island, the schema and the API route all read it (D25).
 * Chrome, not facts: nothing here promises availability, and every total is
 * labelled indicative. TODO(EMIN-Q34) covers the pending-provider message.
 */
export const bookingFormCopy = {
  steps: {
    journey: "Your journey",
    vehicle: "Your car",
    party: "Who's travelling",
    extras: "Extras (optional)",
    details: "Your details",
  },
  fields: {
    service: "What do you need?",
    vehicle: "Choose a car",
    date: "Date",
    time: "Landing or pickup time",
    flightNumber: "Flight number",
    flightHint: "e.g. KQ 414 — we track it, so a delay costs you nothing",
    hours: "Hours with the chauffeur",
    passengers: "Passengers",
    bags: "Large cases",
    nights: "Nights with us",
    nightsHint: "Staying 8 nights or more? The airport fare is on us.",
    name: "Full name (as on the name board)",
    email: "Email address",
    phone: "Phone or WhatsApp",
    notes: "Anything we should know? (optional)",
    consent: "Yes, the hotel may contact me about this booking.",
  },
  panel: {
    eyebrow: "Your transfer",
    empty: "Choose a service and a car to see your indicative fare.",
    total: "indicative total",
    complimentary: "Airport fare complimentary — you're staying 8+ nights",
    reassurance: "No card, no deposit. Reservations confirms by email or WhatsApp.",
    submit: "Request this transfer",
    submitting: "Sending…",
    whatsapp: "Prefer WhatsApp? Send it there",
  },
  errors: {
    name: "Please tell us the name for the board.",
    email: "Please enter a valid email address.",
    date: "Please choose a date.",
    flightNumber: "Please add your flight number so we can track it.",
    flightFormat: "That doesn't look like a flight number — e.g. KQ 414.",
    consent: "Please confirm we may reply to you.",
  },
  messages: {
    // TODO(EMIN-Q34): no email provider is wired — the honest live message.
    pending:
      "Thank you — we have your request. Our inbox isn't connected online just yet, so please also WhatsApp or call reservations and we'll confirm straight away.",
    success:
      "Thank you — your transfer request is with reservations. We'll confirm the car, the chauffeur's name and the fare, usually within the hour.",
    failed: "Something went wrong at our end. Please try again, or WhatsApp reservations directly.",
  },
  nextSteps: [
    "You send this — your flight, your car and who's travelling. Nothing is charged.",
    "Reservations confirms the fare and sends your chauffeur's name, photo and number plate.",
    "Your chauffeur tracks the flight and is waiting in arrivals with your name on the board.",
  ],
} as const;
