/**
 * The rules that decide what the viewport does when a route commits.
 *
 * These live here, as pure functions over plain values, because the thing they
 * replace is a heuristic inside the framework that this site cannot rely on.
 * Next's App Router walks the DOM of the segment that changed, skips anything
 * zero-sized or `position: fixed`, and scrolls only if what it lands on is
 * off-screen (`next/dist/client/components/layout-router.js`). On this site
 * that walk bails out on any cross-route anchor link — `/accommodation#compare`
 * from a room page, `/lounges-and-spaces#acropole-lounge` from the header
 * mega-menu, `/accommodation/<room>#book` from a `RoomCard` — and once it has
 * bailed, `focusAndScrollRef` is left dirty and **every subsequent navigation
 * in that session stops scrolling at all**. Measured, not inferred: a guest
 * reading the bottom of the Deluxe Room page who taps through to the Apartment
 * Room stayed at y=6893 and was shown the new page's identical-looking
 * "Other rooms" band, with no signal that anything had happened.
 *
 * So the site decides for itself, from three facts it can state plainly, and
 * the decision is unit-tested rather than discovered in the browser.
 */

/** Which browser gesture produced the navigation that is committing. */
export type NavigationKind = "push" | "pop";

/** What the viewport should do once the new route has committed. */
export type ScrollIntent = "top" | "none";

/**
 * `top` for any forward move to a different path; `none` otherwise.
 *
 * Three cases earn the `none`:
 *
 *   1. **First commit.** The document has just loaded. The browser has already
 *      put the viewport where it belongs — at the top, or on the fragment of a
 *      shared deep link — and overriding that would break every `#book` URL a
 *      guest has ever been sent.
 *   2. **Back and forward.** Restoring the previous scroll position is the one
 *      behaviour users genuinely expect from the back button, and both the
 *      browser and the router already do it correctly.
 *   3. **Same path.** An in-page anchor (`#book`, `#compare`, the FAQ deep
 *      links) is a move *within* the page the guest is reading. Yanking them
 *      to the hero would destroy the intent they just expressed.
 *
 * Note what is deliberately *not* a case: a cross-route link that carries a
 * fragment. `/accommodation/apartment-room#book` changes the path, so it lands
 * at the top of the Apartment Room page rather than mid-way down it. That is a
 * product decision, not a technical limit — landing a guest deep inside a page
 * they have never seen is precisely the "did anything happen?" moment this
 * module exists to remove.
 */
export function resolveScrollIntent(
  previousPath: string | null,
  nextPath: string,
  kind: NavigationKind,
): ScrollIntent {
  if (previousPath === null || kind === "pop" || previousPath === nextPath) {
    return "none";
  }
  return "top";
}

/** The parts of a click on an `<a>` that decide whether the router will handle it. */
export interface LinkActivation {
  href: string | null;
  target: string | null;
  hasDownload: boolean;
  /** A modifier key or non-primary button — the guest is opening a new tab. */
  modified: boolean;
}

function parseUrl(href: string, base: string): URL | null {
  try {
    return new URL(href, base);
  } catch {
    return null;
  }
}

/** Rules out the activations the browser handles itself rather than the router. */
function isPlainActivation(activation: LinkActivation): boolean {
  if (activation.modified || activation.hasDownload) {
    return false;
  }
  const windowTarget = activation.target;
  return windowTarget === null || windowTarget === "" || windowTarget === "_self";
}

/**
 * True when clicking this link will swap the page under the guest — which is
 * the only case the progress bar should react to.
 *
 * Everything else is excluded on purpose. A new tab (`target`, a modifier key,
 * the middle button) leaves this page alone. A `download`, a `mailto:`, a
 * `tel:` and the booking engine on its own origin all hand off to the OS or to
 * another document, and a bar that creeps and never finishes is worse than no
 * bar. A same-path fragment is a scroll, not a navigation: starting a bar for
 * it would mean starting one that nothing ever completes.
 */
export function isClientRouteChange(activation: LinkActivation, currentHref: string): boolean {
  const { href } = activation;
  if (href === null || !isPlainActivation(activation)) {
    return false;
  }
  const next = parseUrl(href, currentHref);
  const current = parseUrl(currentHref, currentHref);
  if (next === null || current === null) {
    return false;
  }
  return next.origin === current.origin && next.pathname !== current.pathname;
}
