"use client";

import { useState } from "react";

import Box from "@mui/material/Box";

import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/molecules/Modal";
import { SwitchField } from "@/components/molecules/SwitchField";
import { shell } from "@/content/shell";
import type { OptionalConsentCategory, ConsentPreferences as Preferences } from "@/types/consent";

export interface ConsentPreferencesProps {
  open: boolean;
  preferences: Preferences;
  onClose: () => void;
  onSave: (choices: Record<OptionalConsentCategory, boolean>) => void;
}

const { consent } = shell;

/**
 * Granular per-category control. Necessary is rendered as a disabled switch
 * with an "Always on" note rather than omitted, so the visitor can see what
 * is being set on their device even where they have no choice about it.
 *
 * Each row is the shared `SwitchField` molecule — the same control the full
 * /cookie-settings page renders, so the dialog and the page cannot drift.
 * Focus trapping, Escape-to-close and focus restoration to the trigger come
 * from the shared `Modal` molecule (MUI `Dialog`).
 */
export function ConsentPreferences({
  open,
  preferences,
  onClose,
  onSave,
}: ConsentPreferencesProps) {
  const [draft, setDraft] = useState<Record<OptionalConsentCategory, boolean>>({
    analytics: preferences.analytics,
    marketing: preferences.marketing,
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={consent.preferencesTitle}
      actions={<Button onClick={() => onSave(draft)}>{consent.save}</Button>}
    >
      <Box sx={{ display: "grid", gap: 5 }}>
        {consent.categories.map((category) => {
          const locked = category.id === "necessary";
          return (
            <SwitchField
              key={category.id}
              id={`consent-${category.id}`}
              label={locked ? `${category.title} — ${consent.alwaysOnLabel}` : category.title}
              description={category.description}
              checked={locked ? true : draft[category.id as OptionalConsentCategory]}
              disabled={locked}
              onChange={(checked) =>
                setDraft((current) => ({ ...current, [category.id]: checked }))
              }
            />
          );
        })}
      </Box>
    </Modal>
  );
}
