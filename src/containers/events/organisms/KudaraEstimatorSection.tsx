import { Box } from "@/components/atoms/Box";
import { SectionShell } from "@/components/templates/SectionShell";
import { kudaraSections } from "@/containers/events/copy";
import { DeferredKudaraEstimator } from "@/containers/events/organisms/DeferredKudaraEstimator";
import type { RevealDirection } from "@/theme/motion";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

const panelSx = {
  p: { xs: 4, md: 6 },
  border: "1px solid",
  borderColor: "divider",
  borderRadius: `${radiusTokens.lg}px`,
  borderTop: "2px solid",
  borderTopColor: "primary.main",
  bgcolor: "background.default",
  boxShadow: shadowTokens.sm,
} as const;

const { estimator } = kudaraSections;

/**
 * The interactive estimator band. A server shell around the deferred client
 * island so the copy and the panel frame render immediately and the estimator
 * itself is code-split. The hand-off scrolls down to the shared RFP form.
 */
export function KudaraEstimatorSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      variant="raised"
      eyebrow={estimator.eyebrow}
      heading={estimator.heading}
      description={estimator.description}
    >
      <Box sx={panelSx}>
        <DeferredKudaraEstimator />
      </Box>
    </SectionShell>
  );
}
