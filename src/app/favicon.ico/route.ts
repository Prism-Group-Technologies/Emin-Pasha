import { permanentRedirect } from "next/navigation";

import { faviconSrc } from "@/config/icons";

/**
 * `/favicon.ico` — the path no `<link>` tag points at.
 *
 * Every modern browser reads `rel="icon"` from the document head and never
 * asks for this URL. Plenty of other clients still do: feed readers,
 * link-preview bots and older crawlers request `/favicon.ico` blind, and a
 * 404 there is what this route exists to prevent.
 *
 * It is a redirect rather than a second copy of the file. The master lives at
 * `src/assets/images/favicon.ico` and reaches the browser content-hashed via
 * `@/config/icons`; serving these bytes again from a fixed path would put a
 * duplicate back into the repo — exactly what this route's own existence is
 * meant to make unnecessary.
 *
 * A *directory* named `favicon.ico` is not the `app/favicon.ico` file
 * convention, so Next does not try to read this as an icon; it registers an
 * ordinary route at the same URL. That distinction is the whole trick —
 * `@/config/icons` owns the URL either way.
 */
export function GET(): never {
  permanentRedirect(faviconSrc);
}

export const dynamic = "force-static";
