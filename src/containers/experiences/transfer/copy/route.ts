/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

export interface RouteStop {
  label: string;
  detail: string;
}

export interface TravelWindow {
  label: string;
  hours: string;
  time: string;
  /** The typical daytime figure — the one `contact/copy/arrival.ts` quotes. */
  typical?: boolean;
}

export interface RouteTip {
  icon: IconName;
  title: string;
  detail: string;
}

/**
 * The route band. The ≈ 60 min daytime figure matches the Contact page; the
 * off-peak and rush-hour windows, the 40 km distance and the departure lead
 * times are invented planning guidance (TODO(EMIN-Q09)).
 */
export const routeStops: RouteStop[] = [
  { label: "Entebbe International Airport", detail: "Met in arrivals with your name" },
  { label: "Entebbe–Kampala Expressway", detail: "The fast road — toll included" },
  { label: "Kampala city centre", detail: "Up through the business district" },
  { label: "The Emin Pasha, Nakasero", detail: "Your key ready at the front desk" },
];

export const travelWindows: TravelWindow[] = [
  { label: "Late night & early morning", hours: "9pm – 6am", time: "≈ 45 min" },
  { label: "Daytime", hours: "9am – 4pm", time: "≈ 60 min", typical: true },
  { label: "Weekday rush hour", hours: "7–9am · 5–8pm", time: "≈ 90 min" },
];

export const routeTips: RouteTip[] = [
  {
    icon: "flight-takeoff",
    title: "Flying out?",
    detail:
      "For international departures we collect you 3½ hours before take-off — 4 hours on weekday evenings.",
  },
  {
    icon: "bedtime",
    title: "Landing late?",
    detail:
      "Most long-haul flights land after 10pm. Your chauffeur waits inside the arrivals hall, not the car park.",
  },
  {
    icon: "whatsapp",
    title: "Know who to look for",
    detail:
      "The evening before, you get your chauffeur's name, photo and number plate on WhatsApp.",
  },
];
