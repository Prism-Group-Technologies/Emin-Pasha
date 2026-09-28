/**
 * Hands the guest off to the booking engine in a new tab, falling back to the
 * current tab only if the browser genuinely refused to open one.
 *
 * ## Why this is not a one-liner
 *
 * The obvious version is wrong, and wrong in a way that reads as correct:
 *
 * ```ts
 * const opened = window.open(url, "_blank", "noopener,noreferrer");
 * if (!opened) window.location.assign(url); // fires every time
 * ```
 *
 * Passing `noopener` in the **feature string** makes `window.open` return
 * `null` on success, because severing the opener relationship leaves no window
 * handle to give back. So the null check cannot distinguish "blocked" from
 * "worked", the fallback runs unconditionally, and the guest gets the engine
 * in a new tab *and* loses the page they were reading in the old one — which
 * is worse than either behaviour on its own.
 *
 * Opening without the feature string returns a real handle, so `null` means
 * what the fallback needs it to mean: blocked.
 *
 * ## The opener is severed afterwards instead
 *
 * `opened.opener = null` is the programmatic equivalent of `rel="noopener"`,
 * and it is what stops the engine's page reaching back through
 * `window.opener` to navigate the tab the guest left behind (reverse
 * tabnabbing). The setter is cross-origin accessible but browsers may refuse
 * it, so it is guarded — a failed hardening step is not worth throwing away a
 * booking that is already open in front of the guest.
 *
 * `noreferrer` is deliberately **not** replicated. It would strip the
 * `Referer` header, and the engine reading that header is how the property
 * sees its own site as the traffic source. UTM parameters are forwarded
 * explicitly by `buildDeepLink`; the referrer is the part that would silently
 * go missing.
 */
export function openHandoff(url: string): "new-tab" | "same-tab" {
  const opened = window.open(url, "_blank");

  if (opened === null) {
    // Genuinely blocked, or a browser that refuses `window.open` outright.
    // Losing the back button costs less than losing the booking.
    window.location.assign(url);
    return "same-tab";
  }

  try {
    opened.opener = null;
  } catch {
    // Cross-origin setter refused. The tab is open and correct; this was
    // hardening, not a precondition.
  }

  return "new-tab";
}
