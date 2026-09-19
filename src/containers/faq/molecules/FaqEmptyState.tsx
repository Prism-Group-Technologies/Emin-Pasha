"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { sections } from "@/containers/faq/copy/sections";
import { ClaimOnWhatsApp } from "@/containers/offers/molecules/ClaimOnWhatsApp";
import { radiusTokens } from "@/theme/tokens";

const { questions, aside } = sections;

export interface FaqEmptyStateProps {
  whatsappHref: string;
  onReset: () => void;
}

/**
 * A search with no match is a lead, not a dead end: the panel turns straight
 * into a WhatsApp hand-off, with a way back to every answer beside it.
 */
export function FaqEmptyState({ whatsappHref, onReset }: FaqEmptyStateProps) {
  return (
    <Box
      sx={{
        display: "grid",
        justifyItems: "center",
        textAlign: "center",
        gap: 3,
        p: { xs: 5, md: 7 },
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: `${radiusTokens.lg}px`,
        bgcolor: "background.default",
      }}
    >
      <IconBadge name="help" size={56} />
      <Text variant="h4" component="p">
        {questions.emptyHeading}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ maxWidth: "46ch", textWrap: "pretty" }}>
        {questions.emptyBody}
      </Text>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2, mt: 1 }}>
        <ClaimOnWhatsApp href={whatsappHref} label={aside.askWhatsapp} />
        <Button variant="ghost" onClick={onReset}>
          {questions.emptyReset}
        </Button>
      </Box>
    </Box>
  );
}
