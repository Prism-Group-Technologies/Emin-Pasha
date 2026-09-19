/** ⚠️ INVENTED COPY — on-site features are placeholders to verify on the property. */
import { accessibilitySections } from "@/containers/legal/copy/accessibility/body";
import { LEGAL_ENTITY } from "@/containers/legal/copy/entity";
import type { LegalBand, LegalDocument } from "@/containers/legal/types";

const summary: LegalBand = {
  eyebrow: "§ AT A GLANCE",
  heading: "Built to be used by everyone",
  description: "How this website and the estate aim to welcome every guest.",
  items: [
    {
      icon: "verified",
      title: "WCAG 2.2 AA target",
      body: "The site is built and tested against the international standard for accessible websites.",
    },
    {
      icon: "keyboard",
      title: "Keyboard friendly",
      body: "Every link, menu and form works without a mouse, with a visible focus outline and a skip link.",
    },
    {
      icon: "contrast",
      title: "Light, dark and calm",
      body: "Contrast-checked colours in both themes, and animation that stops if your device asks for less motion.",
    },
    {
      icon: "support-agent",
      title: "Help, in person",
      body: "Tell us what you need before you arrive and the team will have it ready.",
    },
  ],
};

const highlights: LegalBand = {
  eyebrow: "§ AT THE ESTATE",
  heading: "Accessibility beyond the screen",
  description:
    "Tell us what would make your stay easier. These features are available on request — please confirm when you book.",
  items: [
    {
      icon: "accessible",
      title: "Step-free arrival",
      body: "A ramped entrance from the drive to reception, and step-free routes to the restaurant and gardens.",
    },
    {
      icon: "elevator",
      title: "Accessible rooms",
      body: "Ground-floor rooms with wider doors, grab rails and a walk-in shower.",
      request: "assistance",
    },
    {
      icon: "hearing",
      title: "Hearing support",
      body: "Visual door and alarm alerts, and written or WhatsApp communication at the desk.",
      request: "assistance",
    },
    {
      icon: "parking",
      title: "Reserved parking",
      body: "Accessible bays close to the entrance, held for you on request.",
    },
  ],
  cta: { label: "Explore the rooms", href: "/accommodation" },
};

export const accessibilityDocument: LegalDocument = {
  id: "accessibility",
  navLabel: "Accessibility",
  teaser: "How the website and the estate are made for every guest — and how to ask for more.",
  icon: "accessible",
  hero: {
    eyebrow: "§ ACCESSIBILITY STATEMENT",
    headline: "A welcome that works for every guest",
    lede: "Our commitment to an accessible website and an accessible stay — what already works, what we are still improving, and how to tell us what you need.",
  },
  updated: LEGAL_ENTITY.updated,
  version: "1.0",
  summary,
  sections: accessibilitySections,
  highlights,
};
