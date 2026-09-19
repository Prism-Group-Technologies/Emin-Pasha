import { Box } from "@/components/atoms/Box";
import type { IconName } from "@/components/atoms/Icon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";

/**
 * One clause of the spa etiquette policy as a card: a tinted icon badge, a
 * plain-language heading, and the approved §14 wording underneath, rendered
 * verbatim. The heading and icon are editorial framing (`copy/etiquette.ts`);
 * the body text is the policy and is not paraphrased.
 */
export function EtiquetteRuleCard({
  icon,
  title,
  text,
}: {
  icon: IconName;
  title: string;
  text: string;
}) {
  return (
    <Box component="article" sx={[cardSurface(), { gap: 3 }]}>
      <IconBadge name={icon} size={44} />
      <Text variant="h5" component="h3">
        {title}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {text}
      </Text>
    </Box>
  );
}
