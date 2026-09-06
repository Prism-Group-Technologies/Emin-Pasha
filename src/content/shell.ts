import { type ShellContent, shellContentSchema } from "@/schemas/content/shell";

/**
 * Site-chrome copy. **Not sourced from 02_CONTENT_SOURCE_OF_TRUTH.md** —
 * that document supplies page copy and facts, not interface labels or
 * route-state copy, and CLAUDE.md §11.6 forbids ordinary pages from
 * inventing facts, not the shell from having buttons. Every string here is
 * interface copy written to the §2 tone of voice (warm, evocative,
 * confident, grounded in place) and carries **no** factual claim: no hours,
 * rates, capacities, distances, awards or superlatives.
 *
 * Status: TODO(EMIN-Q68) — needs client sign-off (DECISIONS.md D24).
 * Facts referenced by the shell (NAP, spa/gym hours, happy-hour schedule,
 * social URLs, CTA labels, nav labels) are **read from their own content
 * modules**, never restated here.
 */
const raw: ShellContent = {
  skipLink: { label: "Skip to content", targetId: "main-content" },

  header: {
    // The tail of the approved name (§1: "The Emin Pasha Hotel & Spa"), set
    // under `identity.shortName` in the lock-up. Not a new name form.
    wordmarkSuffix: "Hotel & Spa",
    openMenuLabel: "Open menu",
    closeMenuLabel: "Close menu",
    primaryNavLabel: "Primary",
    utilityNavLabel: "Contact and booking",
    submenuHint: "Show submenu",
    // The homepage is the only route with the full-bleed hero video
    // (DESIGN_DIRECTION.md §C). Every other route starts solid.
    heroRoutes: ["/"],
  },

  footer: {
    columns: [
      {
        id: "stay",
        title: "Stay",
        hrefs: ["/accommodation", "/offers", "/experiences/airport-transfer"],
      },
      {
        id: "eat-drink",
        title: "Eat & drink",
        hrefs: ["/dining", "/lounges-and-spaces"],
      },
      {
        id: "unwind",
        title: "Unwind",
        hrefs: ["/spa-and-wellness", "/gym", "/swimming-pool"],
      },
      {
        id: "gather",
        title: "Gather",
        hrefs: ["/meetings-and-events", "/weddings", "/business-centre"],
      },
      {
        id: "discover",
        title: "Discover",
        hrefs: ["/our-story", "/gallery", "/faq", "/contact"],
      },
    ],
    // Interface copy in the §2 voice, carrying no factual claim — no rating,
    // no superlative, no count. "Gardens" and "Nakasero" are both already
    // approved in the §1 identity table.
    brandStatement: "A garden estate in the heart of Nakasero, Kampala.",
    napTitle: "Find us",
    hoursTitle: "Hours",
    // Restaurant and bar opening hours are forbidden to invent
    // (02_CONTENT_SOURCE_OF_TRUTH.md §0.7) and unresolved as TODO(EMIN-Q12).
    hoursPendingNote:
      "Restaurant and bar hours vary — call or message us and we will confirm the day you are coming.",
    socialTitle: "Follow the estate",
    legalLinks: [
      { label: "Privacy policy", href: "/legal/privacy-policy" },
      { label: "Cookie policy", href: "/legal/cookie-policy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Accessibility", href: "/legal/accessibility-statement" },
    ],
    legalNavLabel: "Legal",
    copyrightSuffix: "All rights reserved.",
  },

  newsletter: {
    title: "Join the Emin Pasha List",
    description:
      "Occasional letters from the gardens — what is on at the hotel, and what is worth coming back for. No noise.",
    emailLabel: "Email address",
    consentLabel: "Yes, send me occasional emails from The Emin Pasha Hotel & Spa.",
    errors: {
      email: "Please enter a valid email address.",
      consent: "Please confirm you would like to hear from us.",
    },
    messages: {
      subscribed: "Thank you — you are on the list.",
      // TODO(EMIN-Q14): the service is stubbed until a newsletter platform is
      // confirmed, so this is the honest live message, not a fake success.
      pending:
        "Thank you. Our list is not open for sign-up online just yet — please email or message us and we will add you by hand.",
      failed: "Something went wrong at our end. Please try again, or email us directly.",
    },
  },

  consent: {
    bannerLabel: "Cookie preferences",
    title: "A word about cookies",
    body: "We use necessary cookies to make this site work. With your permission we would also like to use analytics and marketing cookies to understand what visitors look for and to reach people planning a stay. Nothing optional is loaded until you choose.",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
    manage: "Manage preferences",
    save: "Save preferences",
    reopenLabel: "Cookie settings",
    preferencesTitle: "Manage cookie preferences",
    alwaysOnLabel: "Always on",
    categories: [
      {
        id: "necessary",
        title: "Necessary",
        description:
          "Required for the site to function — page navigation, your theme choice and this cookie preference itself. These cannot be switched off.",
      },
      {
        id: "analytics",
        title: "Analytics",
        description:
          "Helps us understand which pages people read and where they leave, so we can make the site more useful. Nothing is loaded unless you allow it.",
      },
      {
        id: "marketing",
        title: "Marketing",
        description:
          "Lets us show relevant messages to people planning a trip to Kampala, and measure whether they were useful. Nothing is loaded unless you allow it.",
      },
    ],
  },

  stickyBar: {
    label: "Quick actions",
    call: "Call",
    whatsapp: "WhatsApp",
    directions: "Directions",
  },

  // Accessible names for two icon-only controls — no factual claim, and no
  // promise about reply times, which is exactly the kind of invented fact
  // 02_CONTENT_SOURCE_OF_TRUTH.md §0.7 forbids. The message the WhatsApp
  // button pre-fills is not here: it is shared with the other seven WhatsApp
  // links on the site and lives in `content/whatsapp.ts`.
  floatingActions: {
    whatsappLabel: "Chat with us on WhatsApp",
    backToTopLabel: "Back to top",
  },

  routeStates: {
    loading: {
      eyebrow: "§ ONE MOMENT",
      heading: "Just gathering this for you",
      body: "The page is on its way.",
    },
    error: {
      eyebrow: "§ SOMETHING WENT WRONG",
      heading: "This page did not load",
      body: "The fault is ours, not yours. Try again — and if it keeps happening, call or message us and we will help directly.",
      retryLabel: "Try again",
    },
    notFound: {
      eyebrow: "§ NOT FOUND",
      heading: "This path does not lead anywhere",
      body: "The page you were looking for has moved or never existed. The gardens are still where you left them — start again from the front door.",
      homeLabel: "Return home",
    },
  },
};

export const shell: ShellContent = shellContentSchema.parse(raw);
