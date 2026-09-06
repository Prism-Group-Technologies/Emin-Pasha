import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { env } from "@/config/env";
import { StyleguideContainer } from "@/containers/styleguide";

/**
 * Internal design-system QA route.
 *
 * Kept rather than deleted — it is the only place the component library is
 * exercised in isolation, and it will be needed again when the real
 * photography lands. It is gated three ways: `notFound()` unless
 * `ENABLE_STYLEGUIDE=true`, `noindex` metadata, and a `Disallow` in
 * robots.ts. Off by default, so production serves a 404.
 */
/**
 * Rendered per request, not prerendered: a statically generated page that
 * calls notFound() at build time still serves its HTML with a 200. Forcing
 * dynamic rendering makes the gate return a real 404 — verified, after the
 * static version did not.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Styleguide (internal)",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  if (!env.ENABLE_STYLEGUIDE) {
    notFound();
  }
  return <StyleguideContainer />;
}
