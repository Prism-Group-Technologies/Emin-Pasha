/** ⚠️ INVENTED LEGAL COPY — NOT LEGAL ADVICE. See ../index.ts. */
import { cookieSections } from "@/containers/legal/copy/cookies/body";
import { LEGAL_ENTITY } from "@/containers/legal/copy/entity";
import type { LegalBand, LegalDocument } from "@/containers/legal/types";

const summary: LegalBand = {
  eyebrow: "§ AT A GLANCE",
  heading: "Cookies, in four lines",
  description: "What a cookie is doing on a hotel website, and what is — and is not — switched on.",
  items: [
    {
      icon: "lock",
      title: "Necessary only, by default",
      body: "Until you choose, the site sets only what it needs to work and to remember your choice.",
    },
    {
      icon: "tune",
      title: "Three clear categories",
      body: "Necessary, analytics and marketing — each explained, each switchable on its own.",
    },
    {
      icon: "block",
      title: "Nothing sold",
      body: "Cookie data is never sold, and never used to identify you by name.",
    },
    {
      icon: "toggle",
      title: "Change your mind any time",
      body: "The Cookie settings page and the footer link are always one tap away.",
    },
  ],
};

const highlights: LegalBand = {
  eyebrow: "§ YOUR CHOICES",
  heading: "You decide what runs in your browser",
  description:
    "Adjust each category on the Cookie settings page — the change applies the moment you save.",
  items: [
    {
      icon: "lock",
      title: "Necessary",
      body: "Always on. Page navigation, security, your light or dark theme and this cookie choice itself.",
    },
    {
      icon: "visibility",
      title: "Analytics",
      body: "Off until allowed. Anonymous counts of which pages help guests plan a stay.",
    },
    {
      icon: "public",
      title: "Marketing",
      body: "Off until allowed. Lets us reach people planning a trip to Kampala and measure the results.",
    },
  ],
  cta: { label: "Open cookie settings", href: "/cookie-settings" },
};

export const cookieDocument: LegalDocument = {
  id: "cookies",
  navLabel: "Cookie policy",
  teaser: "Every cookie category explained, and how to switch each one off.",
  icon: "cookie",
  hero: {
    eyebrow: "§ COOKIE POLICY",
    headline: "Cookies, explained without the small print",
    lede: "Which cookies this website uses, why, how long they last — and how to switch off everything that is not strictly needed, in one click.",
  },
  updated: LEGAL_ENTITY.updated,
  version: "1.0",
  summary,
  sections: cookieSections,
  highlights,
};
