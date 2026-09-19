/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";
import type { TransferServiceId } from "@/containers/experiences/transfer/copy/services";

export interface Inclusion {
  icon: IconName;
  title: string;
  detail: string;
}

/**
 * "Always included" — what every fare covers. The first four trace to the
 * approved §8 copy (flight monitoring, luggage help, modern amenities,
 * safety); the rest are invented service standards (TODO(EMIN-Q09)).
 */
export const transferInclusions: Inclusion[] = [
  { icon: "flight", title: "Live flight tracking", detail: "Pickup time moves with your flight." },
  { icon: "luggage", title: "Luggage handled", detail: "From the trolley to your room door." },
  { icon: "wifi", title: "Wi-Fi & charging", detail: "Online from the moment you sit down." },
  { icon: "verified", title: "Safety-checked cars", detail: "Serviced to the hotel's schedule." },
  { icon: "schedule", title: "60 minutes' waiting", detail: "Free, counted from touchdown." },
  { icon: "payments", title: "Tolls & parking", detail: "Already in the fare — no top-ups." },
  {
    icon: "translate",
    title: "Multilingual chauffeurs",
    detail: "English, plus French or Swahili.",
  },
  { icon: "support-agent", title: "24/7 dispatch", detail: "A person answers, whatever the hour." },
];

export interface PremiumService {
  id: string;
  /** The booking-form service this card pre-selects. */
  service: TransferServiceId;
  eyebrow: string;
  title: string;
  description: string;
  includes: readonly string[];
  priceFrom: number;
  priceUnit: string;
  ctaLabel: string;
  assetId: string;
}

/** The two upgrades sold beside the standard transfer. Prices indicative. */
export const premiumServices: PremiumService[] = [
  {
    id: "vip-meet-assist",
    service: "arrival",
    eyebrow: "Arrive like a head of delegation",
    title: "VIP meet & assist",
    description:
      "A protocol officer meets you at the aircraft door and walks you through a fast-track immigration and customs lane while a porter collects your bags. Your chauffeur has the engine running by the time you reach the kerb.",
    includes: [
      "Greeted at the aircraft door or airbridge",
      "Fast-track immigration & customs lane",
      "Help with e-visa and yellow-fever checks",
      "Porter for every bag",
    ],
    priceFrom: 60,
    priceUnit: "per person, per leg — added to any transfer",
    ctaLabel: "Add VIP to my transfer",
    assetId: "transfer-vip-assist",
  },
  {
    id: "chauffeur-hourly",
    service: "hourly",
    eyebrow: "For a day of meetings",
    title: "Chauffeur by the hour",
    description:
      "Keep a car and chauffeur for embassy appointments, site visits or a day around Kampala. They know the city's traffic, wait outside every stop, and have you back at the hotel for dinner.",
    includes: [
      "From 3 hours, up to 12",
      "Waiting time between stops included",
      "Fuel and city parking included",
      "Same chauffeur for the whole booking",
    ],
    priceFrom: 25,
    priceUnit: "per hour, Executive Saloon",
    ctaLabel: "Book a chauffeur",
    assetId: "transfer-chauffeur-hourly",
  },
];
