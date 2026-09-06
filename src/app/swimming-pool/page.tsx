import type { Metadata } from "next";

import { PoolContainer } from "@/containers/wellness/pool";

export const metadata: Metadata = {
  title: "Swimming Pool Open to the Public | Emin Pasha Kampala",
  // Not `seoMeta.pool`: that approved §13 string carries the unresolved
  // "300ft" figure (Q17), and the brief is explicit that the number is
  // omitted until DECISIONS.md resolves it. Every other claim here is
  // verified §6 copy. See DECISIONS.md D45.
  description:
    "An ultra-modern pool in lush tropical gardens in Nakasero, Kampala. Open to hotel guests and the general public. Maximum depth 1.60m; no lifeguard on duty.",
  alternates: { canonical: "/swimming-pool" },
};

export default function SwimmingPoolPage() {
  return <PoolContainer />;
}
