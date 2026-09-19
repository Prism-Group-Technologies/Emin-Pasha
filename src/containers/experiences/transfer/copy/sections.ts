/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * Eyebrow / heading / lede for every band on the Airport Transfer page, in
 * scroll order — the same shape as `wellness/copy/poolSections.ts`.
 * Import-free, so the client FAQ island can read it (D25).
 */
export const transferSections = {
  hero: {
    eyebrow: "§ ENTEBBE ⇄ NAKASERO",
    headline: "Entebbe Airport Transfers",
    lede: "Land, clear immigration, and find your name on a board in arrivals. A private chauffeur who has watched your flight since take-off drives you straight to Nakasero — at a fixed fare you agreed before you flew.",
    primaryCtaLabel: "Book your transfer",
    secondaryCtaLabel: "Chat on WhatsApp",
  },
  assurance: {
    eyebrow: "§ WHY BOOK WITH THE HOTEL",
    heading: "The first hour in Uganda, handled",
  },
  howItWorks: {
    eyebrow: "§ HOW IT WORKS",
    heading: "Four steps from the aircraft to your room",
    description:
      "Book in two minutes. From there, the flight tracking, the waiting and the luggage are our problem, not yours.",
  },
  fleet: {
    eyebrow: "§ THE FLEET",
    heading: "Choose the car that fits the trip",
    description:
      "Four classes, each kept to the hotel's own maintenance schedule and driven only by our chauffeurs. Fares are fixed, per vehicle not per person, and include the Expressway toll.",
  },
  inclusions: {
    eyebrow: "§ ALWAYS INCLUDED",
    heading: "Everything a good arrival needs, at no extra cost",
    description:
      "No surcharges for a delayed flight, a late-night landing or a heavy case. Every transfer, in every car, comes with all of this.",
  },
  premium: {
    eyebrow: "§ GO FURTHER",
    heading: "Two ways to upgrade the journey",
    description:
      "For the traveller who wants to skip the queues entirely, and for the one who needs a car and driver for the whole day.",
  },
  route: {
    eyebrow: "§ THE ROUTE",
    heading: "Entebbe to Nakasero, via the Expressway",
    description:
      "Around 40 km, most of it on the Entebbe–Kampala Expressway. Here's how long it really takes — and what we plan around.",
  },
  standards: {
    eyebrow: "§ YOUR CHAUFFEUR",
    heading: "Chosen, trained and known by name",
    description:
      "Every chauffeur is employed by the hotel, not subcontracted — vetted, trained in defensive driving and first aid, and fluent in English plus at least one more language.",
  },
  booking: {
    eyebrow: "§ BOOK YOUR TRANSFER",
    heading: "Build your transfer and get a fare in seconds",
    description:
      "Pick a service and a car, tell us who's travelling, and watch the indicative fare update. Send it and reservations confirms personally — no card, no deposit.",
  },
  voices: {
    eyebrow: "§ FROM THE BACK SEAT",
    heading: "What travellers say after the drive",
    description: "Notes from recent arrivals — business travellers, families and delegations.",
  },
  benefit: {
    eyebrow: "§ LONG-STAY BENEFIT",
    heading: "Staying more than a week? Your airport transfers are on us.",
    supporting:
      "Book eight nights or more and the airport run is complimentary in any car that fits your party — arrival and departure. Just tell us your nights in the booking form.",
    primaryCtaLabel: "Claim a complimentary transfer",
    secondaryCtaLabel: "See rooms & suites",
  },
  faq: {
    eyebrow: "§ GOOD TO KNOW",
    heading: "Before you fly",
    description:
      "Delays, waiting time, payment, child seats and cancellations — the questions reservations answers most about transfers.",
  },
  closing: {
    eyebrow: "§ READY WHEN YOU LAND",
    heading: "Tell us your flight. We'll take it from there.",
    supporting:
      "Book online in two minutes, or reach reservations directly — whichever is easier from where you are.",
    ctaLabel: "Book on WhatsApp",
    whatsappLabel: "WhatsApp reservations",
    callLabel: "Call reservations",
    emailLabel: "Email reservations",
  },
  related: {
    eyebrow: "§ ALSO AT THE HOTEL",
    heading: "Plan the rest of the stay",
  },
} as const;
