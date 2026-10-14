/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { ReceptionGroup } from "@/containers/reception/types";

/**
 * The filter axis for the services index, in the order a stay actually uses
 * them: you arrive, you ask what to do, you need something practical, you
 * leave. Ordering them by frequency instead would put "practical" first and
 * open the section on laundry, which is true and sells nothing.
 */
export const receptionGroups: ReceptionGroup[] = [
  {
    id: "arrival",
    label: "Arrival & departure",
    blurb: "Check-in, check-out, and the hours either side of both.",
    icon: "key",
  },
  {
    id: "concierge",
    label: "Concierge",
    blurb: "Tables, treatments, excursions and what is worth your afternoon.",
    icon: "support-agent",
  },
  {
    id: "practical",
    label: "Practical",
    blurb: "The small things that would otherwise cost you half a morning.",
    icon: "receipt",
  },
  {
    id: "transport",
    label: "Transport",
    blurb: "Getting you from the airport, into the city, and back again.",
    icon: "car",
  },
];
