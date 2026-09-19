/** ⚠️ INVENTED COPY — see ./index.ts. */
import { LEGAL_ENTITY as E } from "@/containers/legal/copy/entity";
import type { LegalSection } from "@/containers/legal/types";

export const accessibilitySections: LegalSection[] = [
  {
    id: "our-commitment",
    title: "Our commitment",
    blocks: [
      {
        kind: "p",
        text: `${E.tradingName} wants everyone to be able to plan and enjoy a stay, whatever their abilities. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA, and to reflect the spirit of Uganda's Persons with Disabilities Act 2020 on the property itself.`,
      },
    ],
  },
  {
    id: "conformance-status",
    title: "Conformance status",
    blocks: [
      {
        kind: "p",
        text: "This website is partially conformant with WCAG 2.2 AA: most content meets the standard, and the exceptions below are being worked on.",
      },
    ],
  },
  {
    id: "what-works-well",
    title: "What works well",
    blocks: [
      {
        kind: "list",
        items: [
          "A skip-to-content link and a logical heading order on every page.",
          "Full keyboard operation, with a visible focus indicator.",
          "Text and interface colours checked against AA contrast in light and dark themes.",
          "Motion that is reduced or removed when your device requests it.",
          "Descriptive alternative text for meaningful images.",
          "Touch targets sized for fingers on phones and tablets.",
          "Forms with labelled fields and clear error messages.",
        ],
      },
    ],
  },
  {
    id: "known-limitations",
    title: "Known limitations",
    blocks: [
      {
        kind: "table",
        caption: "Known issues and what we are doing about them",
        columns: ["Area", "Issue", "Plan"],
        rows: [
          [
            "Photography",
            "Some images are placeholders awaiting final descriptions",
            "Final alt text with new photography",
          ],
          [
            "Maps",
            "The embedded Google map is hard to use with a screen reader",
            "Written directions sit beside every map",
          ],
          [
            "Menus (PDF)",
            "Some downloadable menus are not tagged PDFs",
            "Accessible versions on request",
          ],
          [
            "WhatsApp",
            "A third-party service outside our control",
            "Phone and email offered alongside",
          ],
        ],
      },
    ],
  },
  {
    id: "assistive-technology",
    title: "Tested with",
    blocks: [
      {
        kind: "p",
        text: "We test with recent versions of Chrome, Safari, Firefox and Edge, VoiceOver on macOS and iOS, TalkBack on Android and NVDA on Windows, plus automated Lighthouse and axe checks.",
      },
    ],
  },
  {
    id: "feedback",
    title: "Feedback and assistance",
    blocks: [
      {
        kind: "p",
        text: `If something on this site is hard to use, or you need information in another format, contact us on WhatsApp, at ${E.email} or on ${E.telephone}. We aim to reply within two working days.`,
      },
      {
        kind: "callout",
        tone: "info",
        title: "Planning a visit?",
        text: "Share any access needs when you book and we will confirm exactly what is in place for your dates.",
      },
    ],
  },
];
