import type { Metadata } from "next";

import { CgShopContainer } from "@/containers/experiences/cgShop";

export const metadata: Metadata = {
  title: "Ugandan Art & Gift Shop | Emin Pasha Kampala",
  description:
    "Authentic Ugandan art pieces and décor at the Emin Pasha CG Shop in Nakasero, Kampala. We believe art speaks a language that cuts across all cultures.",
  alternates: { canonical: "/experiences/cg-shop" },
};

export default function CgShopPage() {
  return <CgShopContainer />;
}
