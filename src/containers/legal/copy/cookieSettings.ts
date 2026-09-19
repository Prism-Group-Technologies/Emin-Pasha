/** ⚠️ INVENTED COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * Strings for /cookie-settings. Import-free plain data, so the client settings
 * panel can import it directly. Category titles and descriptions come from
 * `content/shell.ts` (`consent.categories`) — the same ones the dialog uses —
 * and only the extra detail lives here.
 */
export const cookieSettingsCopy = {
  hero: {
    eyebrow: "§ COOKIE SETTINGS",
    headline: "Your browser, your choice",
    lede: "Switch analytics and marketing cookies on or off at any time. Nothing optional loads until you say so — and your choice applies the moment you save.",
    primaryCta: "Manage my choices",
    secondaryCta: "Read the cookie policy",
    stats: [
      { value: "3", label: "Cookie categories" },
      { value: "0", label: "Optional cookies before you choose" },
      { value: "1 tap", label: "To change your mind" },
    ],
  },
  panel: {
    eyebrow: "§ YOUR CHOICES",
    heading: "Choose what runs",
    description:
      "Necessary cookies keep the site working. Everything else is off until you switch it on.",
    statusHeading: "Your current choice",
    statusUndecided: "You have not chosen yet — only necessary cookies are active.",
    statusDecided: "Saved on {date}.",
    activeCount: "{count} of 3 categories on",
    acceptAll: "Allow all",
    rejectAll: "Necessary only",
    save: "Save my choices",
    saved: "Your cookie choices have been saved.",
    unsaved: "You have unsaved changes.",
    alwaysOn: "Always on",
    includes: "Includes",
  },
  examples: {
    necessary: ["Your cookie choice", "Light or dark theme", "Security"],
    analytics: ["Google Analytics", "Page performance"],
    marketing: ["Meta Pixel", "Google Ads"],
  },
  steps: {
    eyebrow: "§ HOW IT WORKS",
    heading: "Three steps, no small print",
    items: [
      { title: "Choose", body: "Switch each optional category on or off above." },
      { title: "Save", body: "Your choice is stored in this browser only — never on our servers." },
      { title: "Change any time", body: "Come back from the footer link whenever you like." },
    ],
  },
  faq: {
    eyebrow: "§ QUICK ANSWERS",
    heading: "Cookie questions",
    items: [
      {
        id: "cookie-faq-device",
        question: "Does my choice follow me to other devices?",
        answer:
          "No. It is stored in this browser, so a phone and a laptop each keep their own choice.",
      },
      {
        id: "cookie-faq-booking",
        question: "Will switching cookies off affect my booking?",
        answer: "No. Enquiries, WhatsApp and booking all work with necessary cookies only.",
      },
      {
        id: "cookie-faq-clear",
        question: "What happens if I clear my browser data?",
        answer: "Your choice is cleared too, and we will ask again on your next visit.",
      },
      {
        id: "cookie-faq-identify",
        question: "Can analytics identify me?",
        answer:
          "No. Analytics counts visits anonymously and is never linked to your booking or name.",
      },
    ],
  },
};
