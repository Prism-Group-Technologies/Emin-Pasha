"use client";

import dynamic from "next/dynamic";

import { Box } from "@/components/atoms/Box";
import type { BookingWidgetData } from "@/containers/booking/types";
import { DESKTOP_QUERY, useMediaBreakpoint } from "@/hooks/useMediaBreakpoint";
import { selectSheetMounted, useBookingStore } from "@/stores/bookingStore";

/**
 * Below-the-fold booking widgets, loaded after hydration.
 *
 * react-hook-form plus the field molecules is the single largest client cost
 * on the room, spa and accommodation pages, and none of it is needed to read
 * the page. Deferring it takes that weight off the critical path — which on
 * mobile is what LCP was waiting for, since LCP tracked hydration (Q70).
 *
 * The placeholder reserves the widget's rendered height, so the swap-in
 * cannot move anything (CLS stays 0).
 */
const InlineBookingWidget = dynamic(
  () =>
    import("@/containers/booking/organisms/InlineBookingWidget").then((m) => m.InlineBookingWidget),
  { ssr: false, loading: () => <Box sx={{ minHeight: 520 }} /> },
);

const StickyBookingBar = dynamic(
  () => import("@/containers/booking/organisms/StickyBookingBar").then((m) => m.StickyBookingBar),
  { ssr: false },
);

const MobileBookingSheet = dynamic(
  () =>
    import("@/containers/booking/organisms/MobileBookingSheet").then((m) => m.MobileBookingSheet),
  { ssr: false },
);

export function DeferredInlineBookingWidget(props: {
  data: BookingWidgetData;
  roomTypeId?: string;
  heading?: string;
}) {
  return <InlineBookingWidget {...props} />;
}

/**
 * Gated on the media query rather than only on the bar's own `display: none`,
 * so a phone never pays for a react-hook-form instance and an
 * IntersectionObserver it can't see. Below `md` the mobile sheet is the
 * booking surface instead.
 */
export function DeferredStickyBookingBar(props: {
  data: BookingWidgetData;
  heroRoutes: readonly string[];
}) {
  const isDesktop = useMediaBreakpoint(DESKTOP_QUERY);
  return isDesktop ? <StickyBookingBar {...props} /> : null;
}

/**
 * The sheet's chunk is not even requested until a guest first taps Book — the
 * same `openedOnce` latch the mobile nav uses. Once opened it stays mounted,
 * so a second tap is instant and the guest's half-finished search survives.
 */
export function DeferredMobileBookingSheet({ data }: { data: BookingWidgetData }) {
  const mounted = useBookingStore(selectSheetMounted);
  return mounted ? <MobileBookingSheet data={data} /> : null;
}
