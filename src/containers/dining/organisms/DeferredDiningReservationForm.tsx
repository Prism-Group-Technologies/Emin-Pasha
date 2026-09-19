"use client";

import dynamic from "next/dynamic";

import { Box } from "@/components/atoms/Box";
import type { ReservationOutlet } from "@/schemas/diningReservation";

/**
 * The reservation form after hydration — same reasoning as the wellness and
 * RFP forms: react-hook-form and the Zod resolver are pulled in only once the
 * visitor is on the page, not on first load. The placeholder holds the form's
 * height so the swap is CLS-neutral.
 */
const DiningReservationForm = dynamic(
  () =>
    import("@/containers/dining/organisms/DiningReservationForm").then(
      (m) => m.DiningReservationForm,
    ),
  { ssr: false, loading: () => <Box sx={{ minHeight: 620 }} /> },
);

export function DeferredDiningReservationForm({ outlet }: { outlet?: ReservationOutlet }) {
  return <DiningReservationForm outlet={outlet} />;
}
