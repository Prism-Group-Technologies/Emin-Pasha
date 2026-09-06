"use client";

import { FloatingActionButton } from "@/components/atoms/FloatingActionButton";
import { Icon } from "@/components/atoms/Icon";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import { floatingSlotSx } from "./floatingDockStyles";

export interface ScrollToTopFabProps {
  label: string;
  /** Id of the `<main>` landmark that receives focus after the scroll. */
  focusTargetId: string;
}

/**
 * The bottom-right member of the dock, and the dock's only client leaf — it
 * is the one part that has to watch the scroll position.
 *
 * Both props arrive as plain strings from the server parent rather than being
 * read from `content/shell` here, which is what keeps Zod and the content
 * layer out of the always-loaded client bundle (DECISIONS.md D25) — the same
 * arrangement `BookNowAction` has inside `StickyActionBar`.
 *
 * All the behaviour lives in `useScrollToTop`; this component only decides
 * what it looks like.
 */
export function ScrollToTopFab({ label, focusTargetId }: ScrollToTopFabProps) {
  const { visible, scrollToTop } = useScrollToTop(focusTargetId);

  return (
    <FloatingActionButton
      aria-label={label}
      tone="brand"
      visible={visible}
      onClick={scrollToTop}
      sx={floatingSlotSx("right")}
    >
      <Icon name="arrow-upward" />
    </FloatingActionButton>
  );
}
