/** ⚠️ INVENTED LEGAL COPY — NOT LEGAL ADVICE. See ../index.ts. */
import { LEGAL_ENTITY as E } from "@/containers/legal/copy/entity";
import type { LegalSection } from "@/containers/legal/types";
import { identity } from "@/content/identity";

export const termsSectionsStay: LegalSection[] = [
  {
    id: "during-your-stay",
    title: "During your stay",
    blocks: [
      {
        kind: "list",
        items: [
          `Rooms are ready from ${identity.checkInTime} and should be vacated by ${identity.checkOutTime}.`,
          "All rooms and indoor areas are non-smoking; a cleaning charge applies if this is ignored.",
          "Visitors to rooms must be registered at reception, for everyone's security.",
          "Pets are not permitted, with the exception of assistance animals.",
          "Please respect quiet in the gardens and corridors after 22:00.",
        ],
      },
    ],
  },
  {
    id: "spa-pool-and-gym",
    title: "Spa, pool and gym",
    blocks: [
      {
        kind: "p",
        text: "Wellness facilities are used at your own risk and subject to the Spa etiquette page. Please share any health conditions before a treatment. Children must be supervised by an adult at the pool at all times.",
      },
    ],
  },
  {
    id: "liability",
    title: "Our liability, and yours",
    blocks: [
      {
        kind: "p",
        text: "We take reasonable care of guests and their belongings, and in-room safes are provided for valuables. We are not liable for loss of items left unsecured, or for indirect losses, except where the law does not allow this to be limited. You are responsible for damage caused by you or your guests.",
      },
    ],
  },
  {
    id: "circumstances-beyond-control",
    title: "Circumstances beyond our control",
    blocks: [
      {
        kind: "p",
        text: "If events outside our reasonable control — severe weather, civil unrest, utility failure or public-health restrictions — stop us providing a service, we will offer alternative dates or a refund of amounts paid for services not provided.",
      },
    ],
  },
  {
    id: "website-use",
    title: "Using this website",
    blocks: [
      {
        kind: "p",
        text: "Content and photography on this site belong to the hotel or its licensors and may not be reused without permission. We aim to keep information accurate, but prices and availability are confirmed only at booking.",
      },
    ],
  },
  {
    id: "law-and-complaints",
    title: "Governing law and complaints",
    blocks: [
      {
        kind: "p",
        text: `Please raise any concern with the duty manager during your stay so we can put it right. Otherwise write to ${E.email}. These terms are governed by the laws of Uganda and the courts of Kampala have jurisdiction.`,
      },
    ],
  },
];
