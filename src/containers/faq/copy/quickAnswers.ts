/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";
import { identity } from "@/content/identity";

export interface QuickAnswer {
  id: string;
  icon: IconName;
  label: string;
  value: string;
  /** The catalogue id whose full answer the card jumps to. */
  target: string;
}

/**
 * The at-a-glance strip. Each value is a short paraphrase of an approved
 * answer, which the card links to in full; the two times render from
 * `content/identity.ts` so they can never drift from the NAP.
 */
export const quickAnswers: QuickAnswer[] = [
  {
    id: "check-in",
    icon: "key",
    label: "Check-in",
    value: `From ${identity.checkInTime}`,
    target: "check-in-check-out-times",
  },
  {
    id: "check-out",
    icon: "check-out",
    label: "Check-out",
    value: `By ${identity.checkOutTime}`,
    target: "check-in-check-out-times",
  },
  {
    id: "breakfast",
    icon: "breakfast",
    label: "Breakfast",
    value: "Included, à la carte",
    target: "breakfast-included",
  },
  { id: "wifi", icon: "wifi", label: "Wi-Fi", value: "Fast & unlimited", target: "wifi" },
  { id: "parking", icon: "parking", label: "Parking", value: "Secure, on site", target: "parking" },
  {
    id: "transfer",
    icon: "flight",
    label: "Airport transfer",
    value: "Flight-monitored",
    target: "airport-transfers",
  },
];
