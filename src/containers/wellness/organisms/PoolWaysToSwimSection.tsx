import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { TREATMENTS_ANCHOR_ID } from "@/containers/wellness/anchors";
import { poolAccessOptions } from "@/containers/wellness/copy/poolAccess";
import { poolSections } from "@/containers/wellness/copy/poolSections";
import { PoolAccessCard } from "@/containers/wellness/molecules/PoolAccessCard";
import type { RevealDirection } from "@/theme/motion";

const { ways } = poolSections;

/**
 * The pool's day-rate menu — day pass, sunrise lane, family day, cabana,
 * aqua-fitness and learn-to-swim — as a card grid. No membership required;
 * every price is flagged indicative on the card.
 */
export function PoolWaysToSwimSection({
  motion = "up",
  variant = "raised",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      id={TREATMENTS_ANCHOR_ID}
      motion={motion}
      eyebrow={ways.eyebrow}
      heading={ways.heading}
      description={ways.description}
      variant={variant}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
        }}
      >
        {poolAccessOptions.map((option, index) => (
          <Reveal key={option.id} index={index} fill>
            <PoolAccessCard option={option} />
          </Reveal>
        ))}
      </Box>
      <Text
        variant="body2"
        color="text.secondary"
        sx={{ mt: 6, maxWidth: "70ch", fontStyle: "italic" }}
      >
        Indicative rates — the wellness desk confirms the current price and holds your place when
        you book.
      </Text>
    </SectionShell>
  );
}
