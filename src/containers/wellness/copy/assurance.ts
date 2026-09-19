/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";
import { FACILITY_ID, type FacilityId } from "@/containers/wellness/anchors";

export interface AssuranceItem {
  icon: IconName;
  label: string;
  /** One short clause of reassurance under the label. */
  detail: string;
}

/**
 * The credibility strip that sits directly under each facility hero. Every
 * line restates an approved §6 / §14 fact in plain terms — certified staff,
 * the spa's 16+ etiquette rule, public access, the pool's no-lifeguard
 * notice — or a hygiene practice that is ordinary professional standard, not
 * a claim about this property. Nothing here asserts a figure the source does
 * not carry.
 */
export const assuranceItems: Record<FacilityId, AssuranceItem[]> = {
  [FACILITY_ID.spa]: [
    { icon: "verified", label: "Certified therapists", detail: "Senior, and here every day." },
    { icon: "spa", label: "Fresh linens every time", detail: "Laundered or single-use." },
    { icon: "check-circle", label: "Private suites", detail: "Your own room, robe and slippers." },
    { icon: "info", label: "Aged 16 and over", detail: "The spa etiquette policy, kept simple." },
    { icon: "auto-awesome", label: "Skin-tested products", detail: "Allergen-safe, patch-tested." },
    { icon: "whatsapp", label: "Same-day reply", detail: "A person, usually within hours." },
  ],
  [FACILITY_ID.gym]: [
    { icon: "verified", label: "Certified trainers", detail: "Every membership starts with one." },
    { icon: "auto-awesome", label: "Newly renovated", detail: "Cutting-edge cardio and strength." },
    { icon: "check-circle", label: "Open to neighbours", detail: "Not only hotel guests." },
    { icon: "pool", label: "Pool included", detail: "Every tier covers pool and gardens." },
    { icon: "whatsapp", label: "No joining fee", detail: "Month to month, cancel anytime." },
  ],
  [FACILITY_ID.pool]: [
    { icon: "check-circle", label: "Open to the public", detail: "Day passes for non-residents." },
    { icon: "info", label: "Max depth 1.60m", detail: "Shallow enough for the family." },
    { icon: "warning", label: "No lifeguard", detail: "An adult must supervise at all times." },
    { icon: "spa", label: "Set in the gardens", detail: "Stone finishing, loungers, shade." },
    { icon: "celebration", label: "Private hire", detail: "The pool books for poolside parties." },
  ],
};
