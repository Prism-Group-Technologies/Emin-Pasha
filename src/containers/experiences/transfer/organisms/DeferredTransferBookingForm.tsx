"use client";

import dynamic from "next/dynamic";

import { Box } from "@/components/atoms/Box";

/**
 * The booking form after hydration — the same deferral pattern as
 * `DeferredPoolPlannerForm`: react-hook-form, Zod and the pickers stay out
 * of the page's initial JavaScript, and a reserved-height placeholder keeps
 * the layout from shifting when the island arrives.
 */
const TransferBookingForm = dynamic(
  () =>
    import("@/containers/experiences/transfer/organisms/TransferBookingForm").then(
      (m) => m.TransferBookingForm,
    ),
  { ssr: false, loading: () => <Box sx={{ minHeight: { xs: 1900, lg: 1300 } }} /> },
);

export function DeferredTransferBookingForm({ whatsappHref }: { whatsappHref: string }) {
  return <TransferBookingForm whatsappHref={whatsappHref} />;
}
