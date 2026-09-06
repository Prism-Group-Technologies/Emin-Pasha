"use client";

import { Box } from "@/components/atoms/Box";
import { HEADER_HEIGHT_CONDENSED } from "@/components/organisms/Header/constants";
import { useBookingForm } from "@/containers/booking/hooks/useBookingForm";
import { useBookingSummary } from "@/containers/booking/hooks/useBookingSummary";
import { useStickyBookingBar } from "@/containers/booking/hooks/useStickyBookingBar";
import { StayStatus } from "@/containers/booking/molecules/StayStatus";
import { StickySummaryRow } from "@/containers/booking/molecules/StickySummaryRow";
import { StickyBookingPanel } from "@/containers/booking/organisms/StickyBookingPanel";
import type { BookingWidgetData } from "@/containers/booking/types";
import { easingTokens, motionTokens, zIndexTokens } from "@/theme/tokens";

const PANEL_ID = "sticky-booking-panel";

export interface StickyBookingBarProps {
  data: BookingWidgetData;
  heroRoutes: readonly string[];
}

/**
 * The bar that takes over once the hero widget scrolls away. Collapsed it is a
 * ~60px restatement of the search plus one button; expanded it drops a panel
 * with the full controls over the page. It used to render the entire form at
 * all times, which cost roughly 250px of every viewport and put a second copy
 * of the hero's own form on screen while the hero was still visible.
 *
 * One `<form>` wraps both halves, so the collapsed CTA submits directly — a
 * guest happy with the dates already showing books in one click.
 *
 * Hidden with `visibility: hidden`, not opacity alone: the previous version
 * was `aria-hidden` while its buttons stayed in the tab order, which is both
 * an axe failure (`aria-hidden-focus`) and a real keyboard trap.
 */
export function StickyBookingBar({ data, heroRoutes }: StickyBookingBarProps) {
  const booking = useBookingForm({ data });
  const { shown, expanded, toggle, collapse, panelRef } = useStickyBookingBar(
    booking.form,
    heroRoutes,
  );
  const summary = useBookingSummary(
    { ...booking.form.getValues(), nights: booking.nights },
    data.copy,
  );

  return (
    <Box
      component="section"
      aria-label={data.copy.heading}
      aria-hidden={!shown}
      sx={{
        position: "fixed",
        top: HEADER_HEIGHT_CONDENSED.md,
        left: 0,
        right: 0,
        zIndex: zIndexTokens.appBar - 1,
        display: { xs: "none", md: "block" },
        bgcolor: "background.default",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        transform: shown ? "translateY(0)" : "translateY(-100%)",
        opacity: shown ? 1 : 0,
        visibility: shown ? "visible" : "hidden",
        transition: [
          `transform ${motionTokens.navFade}ms ${easingTokens.emin}`,
          `opacity ${motionTokens.navFade}ms ${easingTokens.emin}`,
          `visibility 0s linear ${shown ? "0ms" : `${motionTokens.navFade}ms`}`,
        ].join(", "),
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
      }}
    >
      <Box
        ref={panelRef}
        component="form"
        onSubmit={booking.onSubmit}
        noValidate
        sx={{ position: "relative", maxWidth: 1280, mx: "auto", px: { md: 5, lg: 6 }, py: 2 }}
      >
        <StickySummaryRow
          copy={data.copy}
          summary={summary}
          expanded={expanded}
          panelId={PANEL_ID}
          submitting={booking.status === "submitting"}
          onToggle={toggle}
        />

        <StayStatus
          data={data}
          status={booking.status}
          message={booking.message}
          fallbackHref={booking.fallbackHref}
          dense
        />

        {expanded && (
          <StickyBookingPanel id={PANEL_ID} data={data} booking={booking} onClose={collapse} />
        )}
      </Box>
    </Box>
  );
}
