"use client";

import { useCallback, useEffect, useId, useRef } from "react";

import { useBookingStore } from "@/stores/bookingStore";

export interface BookingWidgetVisibility {
  /** Ref callback for the widget's root element. */
  ref: (node: HTMLElement | null) => void;
  /** Whether this widget is currently on screen. */
  visible: boolean;
}

/**
 * Lets a full booking widget report whether it is on screen, so the sticky bar
 * can take over the moment it leaves rather than at an unrelated scroll
 * distance — and so the two are never in view together. Used by the hero
 * widget and by every in-page widget; the bar reads the aggregate.
 *
 * An IntersectionObserver rather than a scroll handler: it costs nothing per
 * frame, it is correct regardless of the widget's height or position, and it
 * needs no measurement of the DOM on the main thread.
 *
 * `useId` keys the report, so two widgets on one page (as the styleguide has)
 * cannot overwrite each other's answer.
 */
export function useBookingWidgetVisibility(): BookingWidgetVisibility {
  const id = useId();
  const setWidgetVisible = useBookingStore((state) => state.setWidgetVisible);
  const unregisterWidget = useBookingStore((state) => state.unregisterWidget);
  const visible = useBookingStore((state) => state.widgets[id] ?? false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(
    () => () => {
      observerRef.current?.disconnect();
      unregisterWidget(id);
    },
    [id, unregisterWidget],
  );

  const ref = useCallback(
    (node: HTMLElement | null) => {
      observerRef.current?.disconnect();
      if (!node) {
        unregisterWidget(id);
        return;
      }
      // A 25% threshold, not 0: a sliver of the widget still clinging to the
      // edge of the viewport is not a usable form, and waiting until it is
      // fully gone leaves a stretch of scroll with no booking affordance.
      //
      // No optimistic "visible" here — an IntersectionObserver always delivers
      // the initial state on `observe()`, and guessing made the bar flash out
      // of view on a restored scroll position, where a widget can mount
      // already off screen.
      const observer = new IntersectionObserver(
        ([entry]) => setWidgetVisible(id, Boolean(entry?.isIntersecting)),
        { threshold: 0.25 },
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [id, setWidgetVisible, unregisterWidget],
  );

  return { ref, visible };
}
