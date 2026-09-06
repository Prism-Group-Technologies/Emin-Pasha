"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";

export interface DelayedAction {
  /** Replaces any pending action with this one. */
  schedule: (action: () => void, delayMs: number) => void;
  /** Drops the pending action, if any. */
  cancel: () => void;
}

/**
 * A single pending timeout, cancelled on unmount.
 *
 * Extracted from `useMegaMenu` because the menu needs exactly one timer shared
 * between open and close — scheduling a close has to cancel a pending open and
 * vice versa, or a pointer moving quickly along the bar can land in a state
 * where a stale open fires after the visitor has already left. Keeping it in
 * one ref, behind one interface, makes that mutual exclusion structural rather
 * than something each call site has to remember.
 */
export function useDelayedAction(): DelayedAction {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
  }, []);

  const schedule = useCallback(
    (action: () => void, delayMs: number) => {
      cancel();
      timer.current = setTimeout(action, delayMs);
    },
    [cancel],
  );

  useEffect(() => cancel, [cancel]);

  return useMemo(() => ({ schedule, cancel }), [schedule, cancel]);
}
