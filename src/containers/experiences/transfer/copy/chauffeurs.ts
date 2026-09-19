/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface ChauffeurStandard {
  value: string;
  label: string;
}

export interface Chauffeur {
  id: string;
  /** First name and initial only — placeholders, not real staff. */
  name: string;
  role: string;
  years: number;
  languages: readonly string[];
  bio: string;
  assetId: string;
}

/**
 * "Your chauffeur" — four standards and three placeholder profiles. The
 * approved §8 copy supports "well-trained", "professional and courteous" and
 * "safety and security"; the figures and every name are invented
 * (TODO(EMIN-COPY)) and must be replaced with real, consenting staff.
 */
export const chauffeurStandards: ChauffeurStandard[] = [
  { value: "11 yrs", label: "average experience" },
  { value: "100%", label: "background-checked" },
  { value: "First aid", label: "certified every year" },
  { value: "Defensive", label: "driving trained" },
];

export const chauffeurs: Chauffeur[] = [
  {
    id: "moses",
    name: "Moses K.",
    role: "Senior chauffeur",
    years: 14,
    languages: ["English", "Luganda", "Swahili"],
    bio: "Knows every shortcut between Entebbe and Nakasero, and which ones flood in April.",
    assetId: "transfer-chauffeur-moses",
  },
  {
    id: "grace",
    name: "Grace N.",
    role: "VIP & protocol lead",
    years: 9,
    languages: ["English", "French", "Luganda"],
    bio: "Handles diplomatic and delegation arrivals, from airbridge to motorcade.",
    assetId: "transfer-chauffeur-grace",
  },
  {
    id: "ibrahim",
    name: "Ibrahim S.",
    role: "Group & coach driver",
    years: 11,
    languages: ["English", "Swahili", "Arabic"],
    bio: "Moves conference delegations and wedding parties without losing a single suitcase.",
    assetId: "transfer-chauffeur-ibrahim",
  },
];
