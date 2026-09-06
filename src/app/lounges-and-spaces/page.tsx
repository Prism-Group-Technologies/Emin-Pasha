import type { Metadata } from "next";

import { SpacesContainer } from "@/containers/spaces";

export const metadata: Metadata = {
  title: "Lounges & Spaces | Emin Pasha Hotel Kampala",
  description:
    "The Acropole Lounge, the Mehmed Pasha Lounge and the Equatorial Gardens — the quieter corners of the Emin Pasha estate in Nakasero, Kampala.",
  alternates: { canonical: "/lounges-and-spaces" },
};

export default function LoungesAndSpacesPage() {
  return <SpacesContainer />;
}
