import { create } from "zustand";

import type { BookingSearch } from "@/schemas/booking";

/** Which widget is presenting the search — drives layout, not behaviour. */
export type BookingWidgetVariant = "hero" | "sticky" | "inline" | "sheet";

interface BookingState {
  /** What the guest is editing now. Partial — a half-filled form is normal. */
  current: Partial<BookingSearch>;
  /** The last search actually submitted, so a second widget opens pre-filled. */
  last: BookingSearch | null;
  variant: BookingWidgetVariant;
  sheetOpen: boolean;
  /**
   * Latches on the first open. The sheet's chunk — react-hook-form, the field
   * molecules, MUI's Modal — is not requested at all in a session that never
   * taps Book, and stays mounted afterwards so a second tap is instant.
   */
  sheetOpenedOnce: boolean;
  /**
   * Every full booking widget currently mounted, by instance id, mapped to
   * whether it is on screen. The sticky bar reads this to decide when to take
   * over, so it and a full widget are never on screen together — the bar used
   * to key off the header's 64px condense threshold while the hero is a full
   * `100svh`, which put two copies of the same form in view at once.
   *
   * A map rather than a count: the styleguide mounts a hero widget and an
   * inline widget on one page, and an increment/decrement pair cannot survive
   * a widget reporting the same state twice.
   */
  widgets: Record<string, boolean>;
  setCurrent: (patch: Partial<BookingSearch>) => void;
  commit: (search: BookingSearch) => void;
  setVariant: (variant: BookingWidgetVariant) => void;
  openSheet: () => void;
  closeSheet: () => void;
  setWidgetVisible: (id: string, visible: boolean) => void;
  unregisterWidget: (id: string) => void;
}

/**
 * UI state only (CLAUDE.md §4: "never for server data"). No availability, no
 * rates, no room lists ever land here — those are request-scoped results that
 * belong to the component that asked for them, and caching them in a store is
 * how a guest ends up looking at yesterday's prices.
 *
 * Not persisted either: a stale check-in date restored from localStorage days
 * later is worse than an empty form.
 */
export const useBookingStore = create<BookingState>((set) => ({
  current: {},
  last: null,
  variant: "hero",
  sheetOpen: false,
  sheetOpenedOnce: false,
  widgets: {},
  setCurrent: (patch) => set((state) => ({ current: { ...state.current, ...patch } })),
  commit: (search) => set({ last: search, current: search }),
  setVariant: (variant) => set({ variant }),
  openSheet: () => set({ sheetOpen: true, sheetOpenedOnce: true }),
  closeSheet: () => set({ sheetOpen: false }),
  setWidgetVisible: (id, visible) =>
    set((state) => ({ widgets: { ...state.widgets, [id]: visible } })),
  unregisterWidget: (id) =>
    set((state) => ({
      widgets: Object.fromEntries(Object.entries(state.widgets).filter(([key]) => key !== id)),
    })),
}));

/**
 * Selectors, exported so call sites subscribe to one slice instead of the
 * whole store (CLAUDE.md §5.4) — a guest typing in the promo field should not
 * re-render the sticky bar.
 */
export const selectCurrent = (state: BookingState) => state.current;
export const selectLast = (state: BookingState) => state.last;
export const selectVariant = (state: BookingState) => state.variant;
export const selectSheetOpen = (state: BookingState) => state.sheetOpen;
export const selectSheetMounted = (state: BookingState) => state.sheetOpenedOnce;
/**
 * What the sticky bar needs to know, collapsed to a primitive so zustand's
 * `Object.is` comparison stops a re-render on every unrelated store write —
 * `setCurrent` fires on each keystroke, and the `widgets` object itself has a
 * fresh identity every time.
 */
export type BookingWidgetPresence = "none" | "visible" | "hidden";

export const selectWidgetPresence = (state: BookingState): BookingWidgetPresence => {
  const states = Object.values(state.widgets);
  if (states.length === 0) {
    return "none";
  }
  return states.some(Boolean) ? "visible" : "hidden";
};
