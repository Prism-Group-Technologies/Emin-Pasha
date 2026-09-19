import { create } from "zustand";

import type { SpacesEnquiry } from "@/schemas/spacesEnquiry";

/** The fields an outside surface may pre-fill — never contact details or consent. */
export type SpacesEnquirySeed = Partial<
  Pick<SpacesEnquiry, "requestType" | "space" | "experience" | "guests" | "time">
>;

interface SpacesEnquiryState {
  seed: SpacesEnquirySeed;
  /**
   * Bumped on every hand-off (the space matcher, a spotlight's "reserve"
   * button, a priced experience card). `useSpacesEnquiry` watches it and
   * resets the live form onto the seed — a plain setter cannot, because
   * react-hook-form has already taken its defaults. Same idea as
   * `rfpStore.seedNonce`.
   */
  nonce: number;
  seedEnquiry: (patch: SpacesEnquirySeed) => void;
}

/**
 * The Lounges & Spaces reservation hand-off. In memory only, unlike the RFP
 * draft: a lounge request is a short form, and a seed that survived a reload
 * would pre-fill choices the visitor no longer remembers making.
 */
export const useSpacesEnquiryStore = create<SpacesEnquiryState>()((set) => ({
  seed: {},
  nonce: 0,
  seedEnquiry: (patch) => set((state) => ({ seed: patch, nonce: state.nonce + 1 })),
}));
