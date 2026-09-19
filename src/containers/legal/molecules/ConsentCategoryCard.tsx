"use client";

import { Box } from "@/components/atoms/Box";
import { Chip } from "@/components/atoms/Chip";
import { Text } from "@/components/atoms/Text";
import { SwitchField } from "@/components/molecules/SwitchField";
import { radiusTokens } from "@/theme/tokens";

export interface ConsentCategoryCardProps {
  id: string;
  title: string;
  description: string;
  locked: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
  examples: string[];
  includesLabel: string;
  alwaysOnLabel: string;
}

/**
 * One consent category on /cookie-settings: the shared `SwitchField`, an
 * "Always on" chip where the visitor has no choice, and example services so
 * "analytics" means something concrete. The border turns gold when on.
 */
export function ConsentCategoryCard(props: ConsentCategoryCardProps) {
  const {
    id,
    title,
    description,
    locked,
    checked,
    onChange,
    examples,
    includesLabel,
    alwaysOnLabel,
  } = props;

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        p: { xs: 4, md: 5 },
        border: "1px solid",
        borderColor: checked ? "primary.main" : "divider",
        borderRadius: `${radiusTokens.lg}px`,
        bgcolor: "background.default",
        transition: "border-color 200ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <SwitchField
          id={`settings-${id}`}
          label={title}
          checked={checked}
          disabled={locked}
          onChange={onChange}
        />
        {locked && <Chip label={alwaysOnLabel} size="small" color="primary" variant="outlined" />}
      </Box>
      <Text
        id={`settings-${id}-description`}
        variant="body2"
        color="text.secondary"
        sx={{ textWrap: "pretty" }}
      >
        {description}
      </Text>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
        <Text variant="caption" color="text.secondary" sx={{ mr: 1 }}>
          {includesLabel}
        </Text>
        {examples.map((example) => (
          <Chip key={example} label={example} size="small" variant="outlined" />
        ))}
      </Box>
    </Box>
  );
}
