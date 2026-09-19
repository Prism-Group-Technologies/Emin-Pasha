"use client";

import { RESERVE_ANCHOR_ID } from "@/containers/spaces/anchors";
import { scrollToAnchor } from "@/containers/spaces/scrollToAnchor";
import { type SpacesEnquirySeed, useSpacesEnquiryStore } from "@/stores/spacesEnquiryStore";

/**
 * Returns a handler that pre-fills the reservation form and scrolls to it —
 * the one hand-off every "reserve this" control on the page shares.
 */
export function useSeedEnquiry() {
  const seedEnquiry = useSpacesEnquiryStore((state) => state.seedEnquiry);

  return (seed: SpacesEnquirySeed) => {
    seedEnquiry(seed);
    scrollToAnchor(RESERVE_ANCHOR_ID);
  };
}
