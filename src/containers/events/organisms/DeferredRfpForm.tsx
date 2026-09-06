"use client";

import dynamic from "next/dynamic";

import { Box } from "@/components/atoms/Box";

/**
 * The RFP form after hydration. It is the biggest client component on the
 * events pages and nobody needs it to read about the venue; the placeholder
 * reserves its height so the swap-in moves nothing.
 */
const RfpForm = dynamic(
  () => import("@/containers/events/organisms/RfpForm").then((m) => m.RfpForm),
  { ssr: false, loading: () => <Box sx={{ minHeight: 640 }} /> },
);

export function DeferredRfpForm() {
  return <RfpForm />;
}
