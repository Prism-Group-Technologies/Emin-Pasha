/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export interface TravelTime {
  from: string;
  time: string;
  note: string;
}

export interface ArrivalNote {
  id: string;
  icon: IconName;
  title: string;
  body: string;
  /** Optional internal route — the airport-transfer card cross-sells. */
  href?: string;
  cta?: string;
}

/**
 * Indicative drive times from the places guests actually arrive from.
 * Rounded, off-peak estimates — Kampala traffic moves them, and the copy says
 * so rather than promising a minute. TODO(EMIN-COPY): confirm with the desk.
 */
export const travelTimes: TravelTime[] = [
  { from: "Entebbe International Airport", time: "≈ 60 min", note: "via the Entebbe Expressway" },
  { from: "Kampala Central Business District", time: "≈ 10 min", note: "down Nakasero Hill" },
  { from: "Kololo embassies & diplomatic quarter", time: "≈ 10 min", note: "across Kitante Road" },
  { from: "Uganda Museum & Kampala Golf Club", time: "≈ 15 min", note: "via Kira Road" },
];

export const arrivalNotes: ArrivalNote[] = [
  {
    id: "transfer",
    icon: "flight",
    title: "Met at arrivals",
    body: "Send your flight number and a driver will be waiting with your name — no queue for a taxi after a long flight.",
    href: "/experiences/airport-transfer",
    cta: "Book an airport transfer",
  },
  {
    id: "parking",
    icon: "parking",
    title: "Secure parking",
    body: "Gated, guarded parking on site for guests, diners and event visitors, with drivers' waiting space.",
  },
  {
    id: "late",
    icon: "bedtime",
    title: "Arriving late",
    body: "The desk never closes. Tell us your arrival time and your room will be ready and the kitchen told.",
  },
  {
    id: "access",
    icon: "accessible",
    title: "Step-free help",
    body: "Ask ahead and we will arrange a ground-floor room, a ramp and a hand with luggage.",
  },
];
