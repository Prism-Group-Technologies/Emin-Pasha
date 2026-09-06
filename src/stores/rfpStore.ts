import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { RfpInput } from "@/schemas/rfp";

interface RfpState {
  draft: Partial<RfpInput>;
  step: number;
  setDraft: (patch: Partial<RfpInput>) => void;
  setStep: (step: number) => void;
  clear: () => void;
}

/**
 * The RFP draft, persisted to `sessionStorage`.
 *
 * An event enquiry is a long form that people genuinely do abandon and come
 * back to, so losing it to a refresh loses the lead. `sessionStorage` rather
 * than `localStorage` is deliberate: the draft survives a reload and a
 * back-button, but does not sit on a shared or public machine indefinitely —
 * it carries a name, email and phone number.
 *
 * `consent` and the honeypot are stripped before persisting. Consent must be
 * given deliberately in the session that submits, not restored from an
 * earlier one.
 */
export const useRfpStore = create<RfpState>()(
  persist(
    (set) => ({
      draft: {},
      step: 0,
      setDraft: (patch) => set((state) => ({ draft: { ...state.draft, ...patch } })),
      setStep: (step) => set({ step }),
      clear: () => set({ draft: {}, step: 0 }),
    }),
    {
      name: "emin-pasha-rfp-draft",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => {
        const { consent, website, ...rest } = state.draft;
        void consent;
        void website;
        return { draft: rest, step: state.step };
      },
    },
  ),
);

export const selectRfpDraft = (state: RfpState) => state.draft;
export const selectRfpStep = (state: RfpState) => state.step;
