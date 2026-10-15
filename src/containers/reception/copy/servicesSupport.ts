/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { ReceptionService } from "@/containers/reception/types";

/**
 * The practical and transport halves of the catalogue.
 *
 * `airport-transfer` is the only entry here that points at a product page
 * rather than at the desk: it is a priced service with its own quote flow, and
 * sending that enquiry to "ask at reception" would be a downgrade.
 */
export const supportServices: ReceptionService[] = [
  {
    id: "currency",
    group: "practical",
    title: "Currency exchange",
    description:
      "Shillings at the desk, so you are not hunting a bureau de change on your first morning in the city.",
    icon: "exchange",
  },
  {
    id: "laundry",
    group: "practical",
    title: "Laundry & pressing",
    description:
      "Handed in at the desk, back the same day where the schedule allows — the one that matters most is the shirt for tomorrow's meeting.",
    icon: "laundry",
  },
  {
    id: "printing",
    group: "practical",
    title: "Printing & business support",
    description:
      "Boarding passes, contracts, a deck for the morning session: printed, scanned or copied at the desk.",
    icon: "print",
  },
  {
    id: "messages",
    group: "practical",
    title: "Messages & deliveries",
    description:
      "Couriers received, packages held and messages passed on while you are out — the desk is staffed when you are not there.",
    icon: "bell",
  },
  {
    id: "airport-transfer",
    group: "transport",
    title: "Airport transfer",
    description:
      "Entebbe to Nakasero in a chauffeured car, met in arrivals and quoted up front. Book it before you fly or ask on the night.",
    icon: "flight",
    href: "/experiences/airport-transfer",
    linkLabel: "Get a transfer quote",
  },
  {
    id: "city-transfers",
    group: "transport",
    title: "Taxis & city transfers",
    description:
      "A vetted driver to your meeting across town, called when you want it rather than hailed at the gate.",
    icon: "taxi",
  },
  {
    id: "car-hire",
    group: "transport",
    title: "Car hire & drivers",
    description:
      "A car for the day or a driver for the week, arranged through the desk and billed to your room.",
    icon: "car",
  },
  {
    id: "directions",
    group: "transport",
    title: "Directions & timing",
    description:
      "The route that avoids the roundabout at five, and an honest answer about when you should leave.",
    icon: "route",
    href: "/contact#getting-here",
    linkLabel: "Getting here",
  },
];
