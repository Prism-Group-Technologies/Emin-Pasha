"use client";

import dynamic from "next/dynamic";

import { Box } from "@/components/atoms/Box";
import { NewsletterFields } from "@/components/organisms/Footer/NewsletterFields";
import type { FooterData } from "@/components/organisms/Footer/footerData";
import { useDeferredHydration } from "@/hooks/useDeferredHydration";

/**
 * Only reached once `hydrated` is true, so the chunk is requested at the
 * moment of intent (or at browser idle) rather than in the load burst.
 * `ssr: false` is accurate here rather than lossy: this branch genuinely
 * never renders on the server, and the branch that does — `NewsletterFields`
 * below — produces the same markup.
 */
const NewsletterForm = dynamic(
  () => import("@/components/organisms/Footer/NewsletterForm").then((m) => m.NewsletterForm),
  { ssr: false },
);

/**
 * Holds the newsletter's two states apart: server-rendered fields now, the
 * validated form when the visitor reaches for it.
 *
 * This replaces the old `next/dynamic({ ssr: false })` wrapper, which
 * rendered a bare 320px `<Box>` into the server HTML — invisible to crawlers,
 * blank on first paint, and then fetched the form chunk immediately after
 * hydration anyway. See `useDeferredHydration` for why idle is the safety net
 * rather than the mechanism.
 *
 * 'use client' justification: owns the hydration decision and the
 * `next/dynamic` call, which is a client-only API.
 */
export function NewsletterFormMount({
  copy,
  idPrefix,
}: {
  copy: FooterData["newsletter"];
  /** Field-id prefix, for a second newsletter on the same page. */
  idPrefix?: string;
}) {
  const { hydrated, restoreFocus, carriedValue, placeholderRef, triggerProps } =
    useDeferredHydration();

  if (hydrated) {
    return (
      <NewsletterForm
        copy={copy}
        defaultEmail={carriedValue}
        autoFocusEmail={restoreFocus}
        idPrefix={idPrefix}
      />
    );
  }

  return (
    <Box ref={placeholderRef} {...triggerProps}>
      <NewsletterFields copy={copy} idPrefix={idPrefix} />
    </Box>
  );
}
