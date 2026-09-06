"use client";

import { useState } from "react";

import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/molecules/Modal";
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
            <Box key={category.id}>
              <FormControlLabel
                control={
                  <Switch
                    checked={locked ? true : draft[category.id as OptionalConsentCategory]}
                    disabled={locked}
                    inputProps={{ "aria-describedby": `consent-${category.id}-description` }}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        [category.id]: event.target.checked,
                      }))
                    }
                  />
                }
                label={
                  <Typography variant="subtitle2">
                    {locked ? `${category.title} — ${consent.alwaysOnLabel}` : category.title}
                  </Typography>
                }
              />
              <Typography
                id={`consent-${category.id}-description`}
                variant="body2"
                color="text.secondary"
              >
                {category.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Modal>
  );
}
