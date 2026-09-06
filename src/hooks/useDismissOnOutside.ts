"use client";

import { type RefObject, useEffect } from "react";

/**
 * Escape-to-close plus click-outside-to-close for a transient panel that is
 * *not* a modal — the sticky bar's expanded search, for one.
 *
 * `pointerdown` rather than `click`: a `click` listener fires after the
 * browser has already moved focus, so a guest tabbing to a control inside the
 * panel and then clicking elsewhere would see the panel close underneath the
 * element they were aiming at. `pointerdown` also covers touch and pen with
 * one listener instead of three.
 *
 * Deliberately not a focus trap. The panel is a lightweight disclosure over
 * the page, not a dialog: trapping focus in it would strand a keyboard user
 * who only wanted to glance at the calendar, and WAI-ARIA reserves trapping
 * for elements that genuinely block the rest of the interface.
 */
export function useDismissOnOutside(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onDismiss: () => void,
): void {
  useEffect(() => {
    if (!active) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onDismiss();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !ref.current?.contains(target)) {
        onDismiss();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [active, onDismiss, ref]);
}
