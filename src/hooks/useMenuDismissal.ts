"use client";

import { type FocusEvent, type KeyboardEvent, useCallback, useMemo } from "react";

export interface MenuDismissal {
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
}

/**
 * The two ways an open menu must be dismissable without a pointer.
 *
 * Both handlers go on the nav wrapper rather than on each trigger, so one
 * listener covers the triggers *and* the panels focus can move into. A large
 * overlay with no Escape route is the failure the accessibility guidance calls
 * a "digital cage" for keyboard users — so Escape closes and, critically,
 * returns focus to the trigger that opened the panel, rather than dropping it
 * at the top of the document.
 */
export function useMenuDismissal(openKey: string | null, close: () => void): MenuDismissal {
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key !== "Escape" || openKey === null) {
        return;
      }
      // Stopped so an Escape aimed at the menu does not also dismiss whatever
      // else on the page listens for it.
      event.stopPropagation();
      close();
      event.currentTarget.querySelector<HTMLElement>(`[data-menu-trigger="${openKey}"]`)?.focus();
    },
    [close, openKey],
  );

  /** Closes when focus leaves the nav entirely — tabbing past the last link. */
  const onBlur = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        close();
      }
    },
    [close],
  );

  return useMemo(() => ({ onKeyDown, onBlur }), [onKeyDown, onBlur]);
}
