/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface Therapist {
  id: string;
  /** Placeholder name — no real staff member is identified (cf. copy/voices.ts). */
  name: string;
  role: string;
  /** Two or three areas guests can ask for by name. */
  specialisms: string[];
  bio: string;
  /** Portrait placeholder id — resolves against copy/spaMedia.ts. */
  assetId: string;
}

/**
 * The treatment team as four profiles. Names are **placeholders** — the
 * approved content deck names no spa staff, so nothing here is attributed to
 * a real person. Roles and specialisms restate approved §6 offerings
 * (massage, facials, deep sea-salt, the Turkish bath). Promote into
 * `src/content` once real staff bios are collected and signed off.
 */
export const therapists: Therapist[] = [
  {
    id: "lead-therapist",
    name: "A. — placeholder",
    role: "Lead therapist",
    specialisms: ["Deep tissue", "Sports & recovery", "Prenatal"],
    bio: "Fifteen years across Nairobi and Kampala spas. Ask for her when something specific hurts.",
    assetId: "spa-therapist-1",
  },
  {
    id: "hammam-specialist",
    name: "M. — placeholder",
    role: "Hammam specialist",
    specialisms: ["Turkish bath", "Body scrubs", "Foam massage"],
    bio: "Runs the marble slab. Trained in Istanbul and does the ritual the way it is meant to run.",
    assetId: "spa-therapist-2",
  },
  {
    id: "skin-therapist",
    name: "N. — placeholder",
    role: "Skin therapist",
    specialisms: ["Tailored facials", "Pigmentation", "Men's skin"],
    bio: "Analyses first, prescribes second. Straight about what a facial can and cannot do.",
    assetId: "spa-therapist-3",
  },
  {
    id: "bodywork-therapist",
    name: "K. — placeholder",
    role: "Massage & bodywork",
    specialisms: ["Aromatherapy", "Lymphatic", "Sea-salt rituals"],
    bio: "The lightest hands on the team, and the one to book for a first-ever massage.",
    assetId: "spa-therapist-4",
  },
];
