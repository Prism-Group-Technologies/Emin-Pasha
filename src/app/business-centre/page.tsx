import type { Metadata } from "next";

import { BusinessCentreContainer } from "@/containers/events/businessCentre";

export const metadata: Metadata = {
  title: "Business Centre Kampala | Emin Pasha Hotel",
  description:
    "A business centre in Nakasero equipped for virtual sessions, with collaboration displays, conference bars, projectors and dedicated staff.",
  alternates: { canonical: "/business-centre" },
};

export default function BusinessCentrePage() {
  return <BusinessCentreContainer />;
}
