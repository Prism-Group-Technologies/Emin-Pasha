import { type SocialLink, socialLinkSchema } from "@/schemas/content/socialLink";

import { identity } from "./identity";

/** docs/02_CONTENT_SOURCE_OF_TRUTH.md §12.8 — approved social bios. */
const raw: SocialLink[] = [
  {
    platform: "instagram",
    url: identity.social.instagram,
    bioText:
      "A collage of history, culture & nature in the heart of Nakasero. Kampala's boutique hotel, spa & garden estate. 📍 Plot 27 Akii Bua Rd 📞 +256 312 264 712",
    charLimit: 150,
  },
  {
    platform: "facebook",
    url: identity.social.facebook,
    bioText:
      "A collage of history, culture & nature in the heart of Nakasero. Kampala's boutique hotel, spa & garden estate. 📍 Plot 27 Akii Bua Rd 📞 +256 312 264 712",
    charLimit: 150,
  },
  {
    platform: "x",
    url: identity.social.x,
    bioText:
      "Kampala's boutique landmark. Gardens, spa, three restaurants, a 300ft pool — and the story of the physician who refused to be rescued. Nakasero, Uganda.",
    charLimit: 160,
  },
  {
    // TODO(EMIN-Q67): LinkedIn URL not in the §1 NAP table — url left undefined.
    platform: "linkedin",
    bioText:
      "The Emin Pasha Hotel & Spa is one of Kampala's most distinguished boutique hotels — a garden estate in Nakasero offering elegant accommodation, three restaurants, a full spa and wellness centre, a state-of-the-art business centre and Kudara Hall for conferences and corporate events. Independent, characterful and built for guests who want more than a room.",
  },
];

export const socialLinks: SocialLink[] = raw.map((link) => socialLinkSchema.parse(link));
