import { Box } from "@/components/atoms/Box";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { formatUsd } from "@/containers/experiences/transfer/currency";
import type { SpaceProfile } from "@/containers/spaces/copy/profiles";

const factsFor = (profile: SpaceProfile): { icon: IconName; label: string; value: string }[] => [
  {
    icon: "groups",
    label: "Capacity",
    value: `${profile.seated} seated · ${profile.standing} standing`,
  },
  { icon: "schedule", label: "Hours", value: profile.hours },
  { icon: "location", label: "Setting", value: profile.setting },
  { icon: "auto-awesome", label: "Dress code", value: profile.dressCode },
  { icon: "cocktail", label: "Signature", value: profile.signature },
  {
    icon: "payments",
    label: "Private hire",
    value: `from ${formatUsd(profile.hireFromUsd)} min. spend`,
  },
];

/**
 * A space's practical facts as a two-column `<dl>` with icons — the answers
 * a planner looks for before reading any prose. Figures are indicative.
 */
export function SpaceFacts({ profile }: { profile: SpaceProfile }) {
  return (
    <Box
      component="dl"
      sx={{
        m: 0,
        display: "grid",
        gap: 3,
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
      }}
    >
      {factsFor(profile).map((fact) => (
        <Box
          key={fact.label}
          sx={{ display: "flex", gap: 2, alignItems: "flex-start", minWidth: 0 }}
        >
          <Icon
            name={fact.icon}
            fontSize="small"
            aria-hidden
            sx={{ color: "primary.main", mt: "2px" }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Text component="dt" variant="overline" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {fact.label}
            </Text>
            <Text component="dd" variant="body2" sx={{ m: 0, textWrap: "pretty" }}>
              {fact.value}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
