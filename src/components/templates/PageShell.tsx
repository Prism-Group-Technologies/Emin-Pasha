import type { ReactNode } from "react";

import Box from "@mui/material/Box";

import { SkipLink } from "@/components/atoms/SkipLink";
import { CookieConsent } from "@/components/organisms/CookieConsent";
import { FloatingActionDock } from "@/components/organisms/FloatingActionDock";
import { Footer } from "@/components/organisms/Footer";
import { Header, HeaderSpacer, STICKY_BAR_HEIGHT, headerData } from "@/components/organisms/Header";
import { StickyActionBar } from "@/components/organisms/StickyActionBar";
import { WebVitals } from "@/components/organisms/WebVitals";
import { shell } from "@/content/shell";

/**
 * The chrome every route gets, mounted once from the root layout so the
 * header keeps its state across client-side navigations.
 *
 * A Server Component, and deliberately the only place the header's content
 * is read: `headerData` is assembled here and handed across the boundary as
 * plain serializable data, which is what keeps Zod and the content layer out
 * of the always-loaded client bundle (DECISIONS.md D25). `children` passes
 * straight through, so page content is never pulled into a client tree by
 * the shell wrapping it.
 *
 * The two spacers reserve room for the two `position: fixed` bars. Both are
 * constant, server-rendered heights that never change after first paint —
 * that is what keeps CLS at 0 while the header condenses and the consent
 * banner appears.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header data={headerData} />
      <HeaderSpacer heroRoutes={headerData.labels.heroRoutes} />
      {/* `tabIndex={-1}` makes the landmark a *programmatic* focus target
          without putting it in the tab order. Two things depend on it: the
          skip link (a fragment jump to a non-focusable element moves the
          viewport but not focus, so the very next Tab used to drop back into
          the header it just skipped) and the back-to-top control, which hands
          focus here after scrolling. The outline is suppressed because this
          is a whole-page container — a focus ring around the entire document
          body communicates nothing, and the element is never reachable by
          Tab, so no keyboard user can land here without having asked to. */}
      <Box
        component="main"
        id={shell.skipLink.targetId}
        tabIndex={-1}
        sx={{ minHeight: "60vh", outline: "none" }}
      >
        {children}
      </Box>
      <Footer />
      <Box aria-hidden sx={{ height: { xs: `${STICKY_BAR_HEIGHT}px`, md: 0 } }} />
      <StickyActionBar />
      {/* `md` and up only, and unlike the two bars it reserves no space:
          `position: fixed` in the corners, out of flow, zero CLS. */}
      <FloatingActionDock />
      <CookieConsent />
      <WebVitals />
    </>
  );
}
