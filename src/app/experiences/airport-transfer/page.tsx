import type { Metadata } from "next";

import { AirportTransferContainer } from "@/containers/experiences/airportTransfer";

export const metadata: Metadata = {
  title: "Entebbe Airport Transfer | Emin Pasha Hotel Kampala",
  description:
    "Private transfers to and from Entebbe International Airport. Professional chauffeurs, flight monitoring and personalised assistance. Complimentary on stays of more than one week.",
  alternates: { canonical: "/experiences/airport-transfer" },
};

export default function AirportTransferPage() {
  return <AirportTransferContainer />;
}
