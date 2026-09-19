/** ⚠️ INVENTED LEGAL COPY — NOT LEGAL ADVICE. See ../index.ts. */
import type { LegalBand } from "@/containers/legal/types";

export const privacySummary: LegalBand = {
  eyebrow: "§ AT A GLANCE",
  heading: "The short version",
  description: "Six things worth knowing before you read the full policy.",
  items: [
    {
      icon: "fact-check",
      title: "Only what a stay needs",
      body: "Names, contact details, dates and preferences — collected to book, welcome and look after you.",
    },
    {
      icon: "block",
      title: "Never sold",
      body: "We do not sell or rent personal data. Partners receive only what they need to deliver a service.",
    },
    {
      icon: "cookie",
      title: "Cookies are your call",
      body: "Nothing beyond the necessary loads until you choose. Change your mind any time.",
    },
    {
      icon: "lock",
      title: "Kept secure",
      body: "Access is limited to the team that needs it, and card data is handled by certified payment processors.",
    },
    {
      icon: "history",
      title: "Not kept forever",
      body: "Each record has a retention period, after which it is deleted or anonymised.",
    },
    {
      icon: "shield",
      title: "Your rights, one message away",
      body: "See, correct, delete or move your data — or withdraw consent — by WhatsApp, email or at the desk.",
    },
  ],
};

export const privacyHighlights: LegalBand = {
  eyebrow: "§ YOUR RIGHTS",
  heading: "Six rights, and how to use each one",
  description:
    "Under Uganda's Data Protection and Privacy Act 2019 — and the GDPR if you live in the EU or UK. Tap a card and the message is already written for you.",
  items: [
    {
      icon: "visibility",
      title: "See your data",
      body: "Ask for a copy of the personal data we hold about you and how it is used.",
      request: "access",
    },
    {
      icon: "edit",
      title: "Correct it",
      body: "Changed your email, or spelled your name differently on arrival? We will update our records.",
      request: "correct",
    },
    {
      icon: "delete",
      title: "Delete it",
      body: "Ask us to erase your data where we no longer need it or have no legal reason to keep it.",
      request: "erase",
    },
    {
      icon: "block",
      title: "Object to marketing",
      body: "Stop marketing emails and any profiling for offers — immediately and for good.",
      request: "object",
    },
    {
      icon: "download",
      title: "Take it with you",
      body: "Receive the data you gave us in a common, machine-readable format.",
      request: "portability",
    },
    {
      icon: "toggle",
      title: "Withdraw consent",
      body: "Where we rely on your consent, you can withdraw it at any time without affecting past processing.",
      request: "withdraw",
    },
  ],
};
