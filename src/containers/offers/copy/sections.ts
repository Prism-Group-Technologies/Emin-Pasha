/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts.
 *
 * The hero, band headings and small interface strings for the Offers funnel.
 * Import-free, so the client islands (filter, sticky bar) can read it without
 * crossing the content boundary (DECISIONS.md D25).
 */

export const heroCopy = {
  eyebrow: "§ PRIVATE RATES & PACKAGES",
  headline: "Offers worth coming back for",
  lede: "Suites, spa days, long Sunday brunches and festive stays — packaged, priced and held for guests who book with us directly.",
  primaryCta: "Browse this season's offers",
  secondaryCta: "Claim on WhatsApp",
  /** Label for the live-package figure, whose value is counted from the catalogue. */
  liveCountLabel: "Packages live now",
  stats: [
    { value: "Up to 25%", label: "Off when you book direct" },
    { value: "Best rate", label: "Guaranteed, or we match it" },
    { value: "Within the hour", label: "WhatsApp reply, 7am–11pm" },
  ],
};

export const sections = {
  featured: {
    claimLabel: "Claim this offer",
    browseLabel: "See every offer",
    savingPrefix: "Save",
  },
  grid: {
    eyebrow: "§ THIS SEASON",
    heading: "Every offer, one place",
    description:
      "Filter by what you are planning. Every package is claimed in one WhatsApp message — tell us your dates and we hold it for you.",
    claimLabel: "Claim on WhatsApp",
    filterLabel: "Filter offers by category",
    disclaimer:
      "Prices are indicative and per the unit shown. Availability, exact dates and the final rate are confirmed by our team when you claim.",
  },
  perks: {
    eyebrow: "§ BOOK DIRECT",
    heading: "Every offer comes with more when you book with us",
    description:
      "Online travel sites sell the room. We look after the stay — so the perks below are added to every offer claimed directly.",
  },
  calendar: {
    eyebrow: "§ THE YEAR AHEAD",
    heading: "The seasonal calendar",
    description:
      "The dates Kampala plans around — and the packages we build for each. Claim what is open now, or ask to be told the moment the next one opens.",
    openLabel: "Claim now",
    soonLabel: "Notify me",
  },
  faq: {
    eyebrow: "§ GOOD TO KNOW",
    heading: "Offer questions, answered",
    description: "The things guests ask before they claim. Anything else is one message away.",
  },
  closing: {
    eyebrow: "§ YOUR OFFER IS WAITING",
    heading: "One message and it is held for you",
    supporting:
      "Send us the offer and your dates on WhatsApp. A real person checks availability, confirms the rate and holds it while you decide.",
    whatsapp: "Claim on WhatsApp",
    call: "Or call",
  },
  related: { eyebrow: "§ ALSO AT EMIN PASHA", heading: "Plan the rest of your visit" },
  sticky: {
    lead: "Offers change every season —",
    claim: "Claim on WhatsApp",
    browse: "browse offers",
  },
};
