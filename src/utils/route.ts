/**
 * Active-route test for `aria-current` (CLAUDE.md §10). "/" only matches
 * itself — a `startsWith` test would mark the homepage current on every
 * page — while a section href matches its own detail routes, so
 * `/accommodation/superior-room` correctly marks Accommodation as current.
 */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
