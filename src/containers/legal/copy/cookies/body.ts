/** ⚠️ INVENTED LEGAL COPY — NOT LEGAL ADVICE. Cookie names are placeholders to confirm. */
import { LEGAL_ENTITY as E } from "@/containers/legal/copy/entity";
import type { LegalSection } from "@/containers/legal/types";

export const cookieSections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What cookies are",
    blocks: [
      {
        kind: "p",
        text: "Cookies are small text files a website stores in your browser. Similar technologies — local storage, pixels and tags — work the same way, and this policy covers them all.",
      },
    ],
  },
  {
    id: "cookies-we-use",
    title: "The cookies we use",
    blocks: [
      {
        kind: "table",
        caption: "Cookies and similar technologies on this website",
        columns: ["Name", "Category", "Purpose", "Lasts"],
        rows: [
          [
            "emin-pasha-consent",
            "Necessary",
            "Remembers your cookie choice",
            "Until you change it",
          ],
          ["Theme preference", "Necessary", "Remembers light or dark mode", "Until cleared"],
          [
            "_ga, _ga_*",
            "Analytics",
            "Google Analytics — anonymous visit counts",
            "Up to 13 months",
          ],
          ["_fbp", "Marketing", "Meta — measures and targets adverts", "3 months"],
          ["_gcl_au", "Marketing", "Google Ads — measures bookings from adverts", "3 months"],
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Nothing optional before you choose",
        text: "Analytics and marketing tags are not loaded at all until you allow them — not merely hidden.",
      },
    ],
  },
  {
    id: "third-party-services",
    title: "Third-party services",
    blocks: [
      {
        kind: "list",
        items: [
          "Google Maps, on the Contact page, may set its own cookies when the map loads.",
          "WhatsApp links open WhatsApp, which applies Meta's own privacy policy.",
          "Embedded videos may set cookies when you press play.",
        ],
      },
    ],
  },
  {
    id: "managing-cookies",
    title: "Managing and deleting cookies",
    blocks: [
      {
        kind: "p",
        text: "Use the Cookie settings page to change your choice at any time. You can also block or delete cookies in your browser settings — blocking necessary cookies may stop parts of the site from working.",
      },
    ],
  },
  {
    id: "cookie-changes",
    title: "Changes and contact",
    blocks: [
      {
        kind: "p",
        text: `If we add a new category, we will ask for your choice again. Last updated ${E.updated}. Questions: ${E.dpoEmail} or WhatsApp.`,
      },
    ],
  },
];
