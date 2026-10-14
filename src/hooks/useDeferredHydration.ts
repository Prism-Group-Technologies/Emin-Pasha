"use client";

import { type RefObject, useCallback, useRef, useState } from "react";

import { useWhenIdle } from "@/hooks/useWhenIdle";

interface HydrationState {
  hydrated: boolean;
  restoreFocus: boolean;
  carriedValue: string;
}

const INITIAL: HydrationState = { hydrated: false, restoreFocus: false, carriedValue: "" };

export interface DeferredHydration extends HydrationState {
  /** Put on the placeholder wrapper — its `<input>` value survives the swap. */
  placeholderRef: RefObject<HTMLDivElement | null>;
  /** Spread on the same wrapper; any of these promotes the placeholder. */
  triggerProps: {
    onFocus: () => void;
    onPointerEnter: () => void;
    onPointerDown: () => void;
  };
}

/**
 * "Show server-rendered markup now; load the interactive version when the
 * visitor reaches for it, or when the browser is idle — whichever is first."
 *
 * This is what replaces `next/dynamic({ ssr: false })` for the footer
 * newsletter. That approach kept ~30 KB out of the first-load bundle
 * (DECISIONS.md D25) but paid for it twice: the form was absent from the
 * server HTML entirely — so crawlers and no-JS visitors saw a 320px empty
 * box — and the chunk was fetched immediately after hydration anyway, which
 * is the one moment the main thread is busiest.
 *
 * Idle is the safety net, not the mechanism: without it a visitor whose
 * pointer never enters the block would sit on inert markup forever, so the
 * swap always happens, just never during the load burst that produces LCP —
 * the same discipline `useCookieConsent` applies to the consent banner. The
 * idle request itself is `useWhenIdle`, shared with the image modal.
 *
 * The two returned flags are what make the swap invisible. `carriedValue`
 * lifts whatever was typed into the placeholder before the real control
 * mounted, so keystrokes in the gap are not dropped; `restoreFocus` is true
 * only when a person's own focus caused the promotion, so the real control
 * takes focus in that case and never steals it during an idle swap.
 */
export function useDeferredHydration(): DeferredHydration {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<HydrationState>(INITIAL);

  const activate = useCallback((restoreFocus: boolean) => {
    const carriedValue = placeholderRef.current?.querySelector("input")?.value ?? "";
    setState((current) =>
      current.hydrated ? current : { hydrated: true, restoreFocus, carriedValue },
    );
  }, []);

  const onIdle = useCallback(() => activate(false), [activate]);
  useWhenIdle(onIdle, state.hydrated);

  return {
    ...state,
    placeholderRef,
    triggerProps: {
      // Focus and tap both mean "I am about to use this", so the real control
      // should end up focused. Hover does not — on desktop it fires well
      // before the click, and stealing focus there would be a jump.
      onFocus: () => activate(true),
      onPointerDown: () => activate(true),
      onPointerEnter: () => activate(false),
    },
  };
}
