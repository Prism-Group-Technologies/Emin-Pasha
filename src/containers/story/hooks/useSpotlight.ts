"use client";

import { useCallback, useMemo, useState } from "react";

export interface SpotlightApi {
  /** Index whose media the shared panel is showing. */
  activeIndex: number;
  /**
   * True once a pointer or keyboard focus has entered the list, and false
   * again when it leaves. Siblings dim only while this holds: an untouched
   * list should read as a plain, evenly-weighted index, not as one live row
   * and two faded ones the reader never asked to de-emphasise.
   */
  engaged: boolean;
  /** Spread on the list element. */
  listProps: { onMouseLeave: () => void };
  /** Spread on each row's interactive element. */
  itemProps: (index: number) => { onMouseEnter: () => void; onFocus: () => void };
}

/**
 * Which row of an index list owns the shared media panel.
 *
 * Separated from the markup so the band's one piece of state is testable on
 * its own and the row/panel components stay pure — they receive `active` and
 * `dimmed` as booleans and decide nothing.
 *
 * **`onFocus`, not only `onMouseEnter`.** A spotlight driven by hover alone is
 * invisible to anyone tabbing the list, which is the standard failure of this
 * pattern; binding focus as well means the panel tracks keyboard navigation
 * for free. Touch needs no handler at all — the rows carry their own
 * thumbnails below `md`, where the panel is not rendered.
 *
 * **Leaving does not reset the index.** Snapping the panel back to the first
 * entry on `mouseleave` animates a change the reader did not ask for and
 * draws the eye back to a band they have just finished with. Disengaging
 * lifts the dimming and leaves the last image in place.
 */
export function useSpotlight(initialIndex = 0): SpotlightApi {
  const [state, setState] = useState({ index: initialIndex, engaged: false });

  const release = useCallback(() => {
    setState((current) => ({ ...current, engaged: false }));
  }, []);

  const itemProps = useCallback((index: number) => {
    const engage = () => setState({ index, engaged: true });
    return { onMouseEnter: engage, onFocus: engage };
  }, []);

  return useMemo(
    () => ({
      activeIndex: state.index,
      engaged: state.engaged,
      listProps: { onMouseLeave: release },
      itemProps,
    }),
    [state.index, state.engaged, release, itemProps],
  );
}
