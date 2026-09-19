/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export interface TrustPromise {
  icon: IconName;
  title: string;
  body: string;
}

/** The three promises beside the guest reviews — service wording to confirm. */
export const trustPromises: TrustPromise[] = [
  {
    icon: "support-agent",
    title: "A person, never a bot",
    body: "Every WhatsApp message and call is answered by the front desk in Nakasero.",
  },
  {
    icon: "verified",
    title: "Best rate when you book direct",
    body: "Never more than a booking site — and the only way to ask for a specific room.",
  },
  {
    icon: "auto-awesome",
    title: "Plans shaped around you",
    body: "Late arrivals, dietary needs, a surprise in the room — tell us once and it's arranged.",
  },
];
