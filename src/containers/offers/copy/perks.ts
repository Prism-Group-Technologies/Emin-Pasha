/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export interface BookDirectPerk {
  icon: IconName;
  title: string;
  detail: string;
}

/**
 * What a direct booking adds on top of any offer. The 2pm check-out is set
 * against the approved 10:00 check-out; the rest is invented service wording
 * to confirm with the hotel — TODO(EMIN-COPY).
 */
export const bookDirectPerks: BookDirectPerk[] = [
  {
    icon: "verified",
    title: "Best-rate guarantee",
    detail: "Find the same stay cheaper online and we match it — then add breakfast.",
  },
  {
    icon: "bedtime",
    title: "Late check-out",
    detail: "Keep the room until 2pm, subject to the day's arrivals.",
  },
  {
    icon: "gift",
    title: "A welcome in the room",
    detail: "Seasonal fruit and Ugandan coffee waiting when you arrive.",
  },
  {
    icon: "event",
    title: "Flexible dates",
    detail: "Change your dates free of charge up to 48 hours before arrival.",
  },
  {
    icon: "spa",
    title: "Priority spa booking",
    detail: "First pick of treatment times before the day's slots open.",
  },
  {
    icon: "flight",
    title: "Airport transfer rate",
    detail: "A preferential rate on the Entebbe transfer, booked in the same chat.",
  },
];

export const guaranteeCopy = {
  eyebrow: "Our promise",
  heading: "Found it cheaper? We match it.",
  body: "If the same room, dates and inclusions are cheaper on a public booking site, send us a screenshot before you arrive. We match the price and add breakfast for two.",
  cta: "Send us the link",
  footnote: "Applies to publicly bookable rates for identical stays.",
};
