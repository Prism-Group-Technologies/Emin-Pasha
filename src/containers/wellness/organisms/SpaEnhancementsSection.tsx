"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Link } from "@/components/atoms/Link";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { ENQUIRE_ANCHOR_ID } from "@/containers/wellness/anchors";
// Leaf imports: this is a client island, so it must not pull the `copy`
// barrel (which re-exports the Zod-validated media modules) into the bundle
// (DECISIONS.md D25).
import { spaEnhancements } from "@/containers/wellness/copy/enhancements";
import { spaSections } from "@/containers/wellness/copy/spaSections";
import { useAddOnEstimator } from "@/containers/wellness/hooks/useAddOnEstimator";
import { EnhancementRow } from "@/containers/wellness/molecules/EnhancementRow";
import { WhatsAppCta } from "@/containers/wellness/molecules/WhatsAppCta";
import type { RevealDirection } from "@/theme/motion";
import { formatUgx } from "@/utils/currency";

/**
 * The add-on menu, as a shortlist builder. 'use client' justification: the
 * running selection and indicative total are interactive state, all of it in
 * `useAddOnEstimator`. The rows stay presentational; nothing is priced here.
 */
export function SpaEnhancementsSection({ motion = "up" }: { motion?: RevealDirection }) {
  const estimator = useAddOnEstimator(spaEnhancements);

  return (
    <SectionShell
      motion={motion}
      eyebrow={spaSections.enhancements.eyebrow}
      heading={spaSections.enhancements.heading}
      description={spaSections.enhancements.description}
    >
      <Stack spacing={4}>
        <Box sx={{ display: "grid", gap: 3 }}>
          {spaEnhancements.map((item) => (
            <EnhancementRow
              key={item.id}
              name={item.name}
              description={item.description}
              duration={item.duration}
              price={formatUgx(item.priceUgx)}
              selected={estimator.isSelected(item.id)}
              onToggle={() => estimator.toggle(item.id)}
            />
          ))}
        </Box>

        <Box
          aria-live="polite"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 3,
            p: { xs: 4, md: 5 },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Text variant="subtitle2" component="p" sx={{ flex: 1, minWidth: "22ch" }}>
            {estimator.count > 0
              ? `${estimator.count} shortlisted · around ${estimator.totalLabel} on top, indicative`
              : "Tap the add-ons you want, then send the shortlist to the wellness desk."}
          </Text>
          <WhatsAppCta label="Send my shortlist" variant="ghost" />
          <Link href={`#${ENQUIRE_ANCHOR_ID}`} variant="body2" underline="hover">
            or add them to an enquiry
          </Link>
          {estimator.count > 0 && (
            <Button variant="link" size="small" onClick={estimator.clear}>
              Clear
            </Button>
          )}
        </Box>

        <Text variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
          Indicative prices — the current add-on list and exact prices are confirmed when you book.
        </Text>
      </Stack>
    </SectionShell>
  );
}
