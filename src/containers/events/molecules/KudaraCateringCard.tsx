import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { ENQUIRE_ANCHOR_ID } from "@/containers/events/anchors";
import type { KudaraCateringPackage } from "@/containers/events/copy";
import { formatUgx } from "@/utils/currency";

/**
 * One Kudara Hall catering package: who it is for, what is on it, an indicative
 * per-delegate rate and a CTA into the proposal request. The rate is a
 * placeholder and is flagged here and in the section note.
 */
export function KudaraCateringCard({ pkg }: { pkg: KudaraCateringPackage }) {
  return (
    <Box component="article" sx={[cardSurface(), { gap: 3 }]}>
      <Chip label={pkg.forWhom} size="small" sx={{ alignSelf: "flex-start" }} />

      <Text variant="h4" component="h3">
        {pkg.label}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {pkg.description}
      </Text>

      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 1.5 }}>
        {pkg.includes.map((item) => (
          <Box key={item} component="li" sx={{ display: "flex", gap: 1.5 }}>
            <Icon
              name="check-circle"
              aria-hidden
              fontSize="small"
              sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }}
            />
            <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {item}
            </Text>
          </Box>
        ))}
      </Box>

      <Text variant="caption" component="p" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {pkg.kitchens}
      </Text>

      <Box sx={{ mt: "auto", display: "grid", gap: 2 }}>
        <Text component="p" sx={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
          {formatUgx(pkg.perDelegateUgx)}{" "}
          <Text component="span" variant="body2" color="text.secondary">
            per delegate · indicative
          </Text>
        </Text>
        <Button href={`#${ENQUIRE_ANCHOR_ID}`} variant="ghost" sx={{ alignSelf: "flex-start" }}>
          Add to my proposal
        </Button>
      </Box>
    </Box>
  );
}
