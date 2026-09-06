import type { Metadata } from "next";

import { EtiquetteContainer } from "@/containers/wellness/etiquette";

export const metadata: Metadata = {
  title: "Spa Etiquette | Emin Pasha Hotel & Spa Kampala",
  description:
    "What to know before your treatment at the Swanky Spa: arrival times, health disclosure, minimum ages, pool safety and our liability policy.",
  alternates: { canonical: "/spa-etiquette" },
};

export default function SpaEtiquettePage() {
  return <EtiquetteContainer />;
}
