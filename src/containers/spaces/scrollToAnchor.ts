/**
 * Scrolls an in-page anchor into view, honouring `prefers-reduced-motion`.
 * Browser-only — call it from an event handler, never during render.
 */
export function scrollToAnchor(id: string): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
