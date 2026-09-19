import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { contrastMutedSx } from "@/components/templates/sectionShellStyles";
import { PRIVATE_HIRE_ANCHOR_ID } from "@/containers/spaces/anchors";
import { hireInclusions, hireTiers } from "@/containers/spaces/copy/privateHire";
import { sections } from "@/containers/spaces/copy/sections";
import { HireTierCard } from "@/containers/spaces/molecules/HireTierCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * Private hire on the dark `contrast` band — the page's "after hours" tonal
 * break. Four minimum-spend tiers, then what every booking includes.
 */
export function PrivateHireSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={PRIVATE_HIRE_ANCHOR_ID}
      motion={motion}
      variant="contrast"
      eyebrow={sections.privateHire.eyebrow}
      heading={sections.privateHire.heading}
      description={sections.privateHire.description}
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 4, md: 4 },
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        {hireTiers.map((tier, index) => (
          <Reveal key={tier.id} index={index} fill>
            <HireTierCard tier={tier} />
          </Reveal>
        ))}
      </Box>
      <Box
        component="ul"
        aria-label="Included with every private hire"
        sx={{
          listStyle: "none",
          m: 0,
          mt: { xs: 6, md: 7 },
          p: 0,
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
        }}
      >
        {hireInclusions.map((item) => (
          <Box component="li" key={item} sx={{ display: "flex", gap: 2 }}>
            <Icon
              name="check-circle"
              fontSize="small"
              aria-hidden
              sx={{ color: "primary.main", mt: "2px" }}
            />
            <Text variant="body2" sx={contrastMutedSx}>
              {item}
            </Text>
          </Box>
        ))}
      </Box>
    </SectionShell>
  );
}
