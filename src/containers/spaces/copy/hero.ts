/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export const heroCopy = {
  eyebrow: "§ LOUNGES & SPACES",
  headline: "Three rooms to slow Kampala down",
  lede: "A fireside lounge with a mixologist's bar, a garden-view lounge built for thinking, and the city's best outdoor picture spot — open to guests and non-residents alike, from the first coffee to the last nightcap.",
  primaryCtaLabel: "Find your space",
  secondaryCtaLabel: "Reserve on WhatsApp",
};

export interface AssuranceItem {
  icon: IconName;
  label: string;
  detail: string;
}

/** The strip under the hero: the practical answers a first-time visitor needs. */
export const assuranceItems: AssuranceItem[] = [
  { icon: "check-circle", label: "Walk-ins welcome", detail: "Non-residents too — no room key." },
  { icon: "cocktail", label: "Skilled mixologists", detail: "Artisanal cocktails at the bar." },
  { icon: "fireplace", label: "Fireside seating", detail: "Armchairs, couches, a fountain." },
  { icon: "laptop", label: "Discreet alcoves", detail: "Quiet corners for business talk." },
  { icon: "garden", label: "Garden views", detail: "Indoor and outdoor tables." },
  { icon: "parking", label: "Secure parking", detail: "On the estate in Nakasero." },
];
