import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { circlePerks } from "@/containers/spaces/copy/circle";
import { sections } from "@/containers/spaces/copy/sections";
import { CircleInviteCard } from "@/containers/spaces/molecules/CircleInviteCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * The Lounge Circle: an invitation card (price, qualifier, join hand-off) beside
 * a grid of six perks. Stacks to one column on a phone, invitation first.
 */
export function LoungeCircleSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      bodyMotion={motion}
      variant="raised"
      eyebrow={sections.circle.eyebrow}
      heading={sections.circle.heading}
      description={sections.circle.description}
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 6, md: 8 },
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.8fr) minmax(0, 1.2fr)" },
          alignItems: "start",
        }}
      >
        <CircleInviteCard />
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            m: 0,
            p: 0,
            display: "grid",
            gap: { xs: 4, md: 5 },
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          }}
        >
          {circlePerks.map((perk) => (
            <Box
              component="li"
              key={perk.title}
              sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}
            >
              <IconBadge name={perk.icon} size={44} />
              <Box>
                <Text variant="subtitle1" component="h3" sx={{ fontWeight: 600 }}>
                  {perk.title}
                </Text>
                <Text variant="body2" color="text.secondary">
                  {perk.detail}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </SectionShell>
  );
}
